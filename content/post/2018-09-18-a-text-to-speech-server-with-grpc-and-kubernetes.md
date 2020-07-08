---
title: '一步一步迭代实践用 gRPC 和 Kubernetes 构建一个 TTS Server'
keywords: golang, protobuf, gRPC, kubernetes, tts
date: 2018-09-18T09:00:00+08:00
lastmod: 2018-09-18T09:00:00+08:00
draft: false
description: '一步一步迭代实践用 gRPC 和 Kubernetes 构建一个 TTS Server'
categories: [golang]
tags: [golang, protobuf, gRPC, kubernetes, tts]
comments: true
author: mai
---

## 背景

在 Mac 上 `say hello` ，你应该能听到 `hello` 的朗读音。那如果我们要在 Linux 服务器上提供类似的服务，我们可以怎么做呢？

>CMU Flite：一个小型的快速运行时间合成引擎。

## 实战一

```dockerfile
FROM alpine

RUN apk update && apk add flite
```

执行命令 `$ docker build -t say .` 控制台日志：

```sh
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM alpine
 ---> 11cd0b38bc3c
Step 2/2 : RUN apk update && apk add flite
 ---> Running in c576fa1f9d01
fetch http://dl-cdn.alpinelinux.org/alpine/v3.8/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.8/community/x86_64/APKINDEX.tar.gz
v3.8.1-1-g91d49cb572 [http://dl-cdn.alpinelinux.org/alpine/v3.8/main]
v3.8.1-1-g91d49cb572 [http://dl-cdn.alpinelinux.org/alpine/v3.8/community]
OK: 9543 distinct packages available
(1/1) Installing flite (2.1-r0)
Executing busybox-1.28.4-r0.trigger
OK: 30 MiB in 14 packages
Removing intermediate container c576fa1f9d01
 ---> 8c697cbdb1a6
Successfully built 8c697cbdb1a6
Successfully tagged say:latest
```

使用 Docker 运行一下构建的 say 服务的 flite 是否可用。

```sh
docker run --rm say flite -h
```

如果正常显示 flite 的一些帮助说明，即表示正常。

然后我们再来试一下 flite 朗读词汇。

```sh
docker run --rm -v $(pwd)/data:/data -w /data say flite -o output.wav -t hello
```

这里要注意以下几个参数：

- --rm 表示容器退出时，会自动清理容器内部的文件系统；
- $(pwd) 表示当前运行路径；
- -v 表示挂载宿主机文件夹和容器文件夹；
- -w The default working directory for running binaries within a container is the root directory (/), but the developer can set a different default with the Dockerfile WORKDIR command. The operator can override this with: `-w="": Working directory inside the container`
- -o flite 的输出指令
- -t flite 的输入文本指令

通过 Docker 调用 flite 产生的音频文件 `output.wav`，我们可以使用 afplay 来播放。

```sh
afplay data/output.wav
```

>afplay 是 Mac 上自带的一款命令行播放音频文件的工具。

## 实战二

我们已经可以使用 flite 来将文本转换为音频了。

那接下来，我来讲 flite 跟 Go 整合试试看。

```golang
package main

import (
	"log"
	"os"
	"os/exec"
)

func main() {
	cmd := exec.Command("flite", "-t", os.Args[1], "-o", "output.wav")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Fatal(err)
	}
}
```

虽然说这样很简单，但是也算是跟 Go 整合了，不是吗。

但是我运行 `go run main.go`，会报错：

```sh
2018/09/18 09:53:42 exec: "flite": executable file not found in $PATH
exit status 1
```

怎么办呢？

有几种办法来解决，第一个当然就是你可以在你本地安装一个 flite，它也是支持 Mac OSX 的。

这个就非常简单了，我这里就不跟大家演示了。

前面实战一，我们已经可以在 Linux 服务器上安装了 flite 了，那我们可以将这个 go 程序构建到这个服务器上，不就可以运行了吗。

要将 go 程序构建到服务器上有几种办法：

- 直接将源码拉入有 Go 编译环境的服务器，然后编译源码为可执行文件即可。
- 直接将程序构建为一个 Linux 上可执行的程序，然后将程序传到 Linux 服务器上。

在这里，很显然是第二种方法更简单一些。

修改 Dockerfile，只需要将 say 拷贝到 linux 可执行路径下（默认是 `/` 根目录），然后将 `/say` 提供服务。

```sh
FROM alpine

RUN apk update && apk add flite
ADD say /say

ENTRYPOINT ["/say"]
```

创建一个 `Makefile` 文件来构建 go 程序：

```sh
build:
	GOOS=linux go build -o say
	docker build -t say .
```

然后我们直接执行 `docker run --rm -v $(pwd)/data:/data -w /data say "hello there you are a good man."`

然后通过 `afplay output.wav` 就能播放声音了。

## 实战三

>gRPC 服务，首先得有一个 Server 端，然后再写一个 Client 端，就可以正常调用了，因为这里涉及到对于 flite 的调用，所以我们还是将 Server 端的程序部署到有 flite 的 Docker 服务器上。

首先先重写 `server.go`

```golang
package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"os/exec"

	pb "github.com/yangwenmai/examples/tts-grpc-k8s/api"
	grpc "google.golang.org/grpc"
)

func main() {
	port := flag.Int("p", 8080, "port to listen to")
	flag.Parse()

	log.Printf("listening to port: %v\n", *port)
	// 监听 TCP:8080
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("listen failed :%v", err)
	}

	// 创建一个 gRPC Server
	s := grpc.NewServer()
	// 给 gRPC Server 注册一个服务
	pb.RegisterTextToSpeechServer(s, &server{})

	// 根据 listen 为 gRPC Server 启动一个 Serve 来服务。
	err = s.Serve(lis)
	if err != nil {
		log.Fatalf("could not to serve:%v", err)
	}
}

type server struct{}

func (s *server) Say(ctx context.Context, in *pb.Text) (*pb.Speech, error) {
	file, err := ioutil.TempFile("", "")
	if err != nil {
		return nil, fmt.Errorf("could not create tmp file: %v", err)
	}
	if err := file.Close(); err != nil {
		return nil, fmt.Errorf("could not close :%v", err)
	}

	cmd := exec.Command("flite", "-t", in.Text, "-o", file.Name())
	// 得到 cmd 执行后的标准输出和标准错误
	if data, err := cmd.CombinedOutput(); err != nil {
		return nil, fmt.Errorf("flite failed %s", data)
	}
	// 将文件内容读出来
	data, err := ioutil.ReadFile(file.Name())
	if err != nil {
		return nil, fmt.Errorf("could not read temp file:%v", err)
	}
	return &pb.Speech{Audio: data}, nil
}
```

执行以下代码，将 Server 端打包到 Docker 中。

```sh
build:
	GOOS=linux go build -o say
	docker build -t say .
```

然后写 `client.go`

```golang
package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	pb "github.com/yangwenmai/examples/tts-grpc-k8s/pb"
	grpc "google.golang.org/grpc"
)

func main() {
	server := flag.String("b", "localhost:8080", "address of say backend")
	output := flag.String("o", "output.wav", "wav file where the output will be written")
	flag.Parse()

	if flag.NArg() < 1 {
		fmt.Printf("usage:\n\t%s \"text to speech\"\n", os.Args[0])
		os.Exit(1)
	}

	con, err := grpc.Dial(*server, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("dial err:%v", err)
	}
	defer con.Close()

	client := pb.NewTextToSpeechClient(con)
	text := &pb.Text{Text: flag.Arg(0)}
	res, err := client.Say(context.Background(), text)
	if err != nil {
		log.Fatalf("could to say %s: %v", text.Text, err)
	}
	if err := ioutil.WriteFile(*output, res.Audio, 0666); err != nil {
		log.Fatalf("write file err:%v", err)
	}
}
```

启动 Docker 服务，`docker run --rm -v $(pwd)/data:/data -w /data -p 8080:8080 --name say say`，然后进入到 client 目录下执行：`go run client.go -o data/output.wav "hello man!"`

通过 `afplay data/output.wav` 播放你所录入的文本音频，是不是非常的简单，并且又很强大呢！！！

## 实战四

>将 gRPC 服务部署到 kubernetes 集群中，并且做多节点，客户端调用的时候，可以校验其负载均衡。

因为 kubernetes 这里的镜像跟你使用 Docker 去 run 镜像是不一样的，所以你最好将镜像 push 到远端，比方说 Docker hub。

```sh
docker build x.x.x.x:5000/say .
docker push x.x.x.x:5000/say
```

kubernetes 的 Deployment 和 Service 配置：

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: say-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: say
    spec:
      containers:
      - name: say
        image: xxxxxx/say
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: say-service
spec:
  selector:
    app: say
  ports:
    - protocol: TCP
      port: 8080
  type: LoadBalancer
```

## 涉及源码包

- context
	- context.Background()
- flag
	- flag.String()
	- flag.Int()
	- flag.Parse()
	- flag.NArg()
	- flag.Arg(0)
- fmt
	- fmt.Println()
	- fmt.Printf()
- io/ioutil
	- ioutil.ReadFile()
	- ioutil.WriteFile()
	- ioutil.TempFile()
- log
	- log.Fatalf()
	- log.Println()
- net
	- net.Listen()
- [os/exec](https://golang.org/pkg/os/exec/)
	- exec.Command()
- gRPC
	- ...

## 参考资料

1. [CMU Flite](http://www.festvox.org/flite/)
2. [Docker run parameters](https://docs.docker.com/engine/reference/run/#workdir)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



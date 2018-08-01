---
title: '利用 minikube 在 macOS 上部署一个 Go 程序'
keywords: kubernetes, Go, macOS
date: 2018-07-31T09:11:23+08:00
lastmod: 2018-07-31T09:11:23+08:00
draft: false
description: '利用 minikube 在 macOS 上部署一个 Go 程序'
categories: [kubernetes]
tags: [kubernetes, Go, macOS]
comments: true
author: mai
---

本教程的目标是将一个简单的 Go 程序转换为在 Kubernetes 上运行的程序。

本教程将向你展示如何获取在计算机上开发的代码，将其转换为 Docker 容器映像，然后在 Minikube 上运行该映像。

Minikube 提供了一种在本地计算机上免费运行 Kubernetes 的简单方法。

----

## 目标

- 运行一个 hello world Go 应用程序。
- 部署应用程序到 minikube。Deploy the application to Minikube.
- 查看应用程序日志。View application logs.
- 更新应用程序镜像。Update the application image.

## 准备工作

macOS 用户，你可以用 [Homebrew](https://brew.sh/) 来安装 minikube.

>注意：如果在将计算机更新到 macOS 10.13 后运行 brew update 时看到以下 Homebrew 错误：
```
  Error: /usr/local is not writable. You should change the ownership
  and permissions of /usr/local back to your user account:
  sudo chown -R $(whoami) /usr/local
```

你能够通过重装 Homebrew 来解决这个问题:

```
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- 需要 Go 来运行这个简单的应用程序。

- 安装 Docker。在 macOS 上，我们推荐 [Docker for Mac](https://docs.docker.com/engine/installation/mac/).

## 创建一个 minikube 集群

本教程使用Minikube创建本地群集，本教程还假设你在 macOS 上使用 Docker for Mac。
如果你使用的是 Linux 之类的其他平台，或使用 VirtualBox 而不是 Docker for Mac，则安装 Minikube 的说明可能略有不同，有关 Minikube 的一般安装说明，请参阅 Minikube 安装指南。

使用 Homebrew 安装最新的 Minikube 版本：

```
brew cask install minikube
```

安装 HyperKit 驱动, 按照这里所描述的 [Minikube driver installation guide](https://github.com/kubernetes/minikube/blob/master/docs/drivers.md#hyperkit-driver)

使用 Homebrew 下载 kubectl 命令行工具，你可以使用该工具与 Kubernetes 集群进行交互：

```
brew install kubernetes-cli
```

确定你是否可以在没有代理的情况下直接访问 [https://cloud.google.com/container-registry/](https://cloud.google.com/container-registry/) 等网站，方法是打开新终端并使用：

```
curl --proxy "" https://cloud.google.com/container-registry/
```

确保已启动 Docker 守护程序，你可以使用以下命令确定 docker 是否正在运行：

```
docker images
```

如果不需要代理，请启动 Minikube 集群：

```
minikube start --vm-driver=hyperkit
```

如果需要代理服务器，请使用以下方法启动具有代理设置的 Minikube 集群：

```
minikube start --vm-driver=hyperkit --docker-env HTTP_PROXY=http://your-http-proxy-host:your-http-proxy-port  --docker-env HTTPS_PROXY=http(s)://your-https-proxy-host:your-https-proxy-port
```

但是可能这样设置之后，并不是很好用，那么你参照以下文章中所提到的方法去调试，应该就能解决了。

[Kubernetes 墙内使用技巧](http://blog.samemoment.com/articles/kubernetes/)

>如果你遇到墙的问题了，可能会有以下表象：

- minikube dashboard 长时间无响应；
- kubectl run xxx 长时间处于 ContainerCreating 等；

`--vm-driver=hyperkit` 标志指定你使用的是 Docker for Mac，
默认的 VM 驱动程序是 VirtualBox，需要你额外安装它。

现在设置 Minikube context，
context 决定了哪个集群的 kubectl 与之交互。
你可以在 `~/.kube/config` 文件中查看所有可用的 context。

```
kubectl config use-context minikube
```

验证 kubectl 是否与已配置的集群通信：

```
kubectl cluster-info
```

在浏览器中打开 Kubernetes dashboard：

```
minikube dashboard
```

## 创建你的 Go 应用程序

下一步是编写应用程序。
将此代码保存在名为 hellonode 的文件夹中，文件名为 `server.go` ：

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to minikube server!")
	})

	http.ListenAndServe(":8080", nil)
}
```

运行你的程序：

```shell
go run server.go
```

你应该能通过浏览器访问 `http://localhost:8080/` 看到 `Welcome to minikube server!` 消息。 

通过 Ctrl-C 来结束运行的 Go 服务器。

下一步是将你的应用程序打包到 Docker 容器中。

## 创建一个 Docker 容器镜像

在 `hellonode` 文件夹中创建一个文件 `Dockerfile`。 用 Dockerfile 文件来描述你想构建的这个镜像。你可以基于一个已经存在的镜像来构建一个 Docker 容器镜像。 在这个向导中，我们依赖 Go 镜像。

```Dockerfile
FROM golang:1.10.3

EXPOSE 8080

WORKDIR /go/src/server
COPY . .

RUN go install -v ./...

CMD [ "server" ]
```

这个 Docker 镜像的配方从 Docker 官方仓库中拉取 golang:1.10.3 镜像，公开端口 8080，将当前文件复制到镜像中的 `/go/src/server/` 文件夹中，然后运行 `go install` 进行安装，然后启动服务器。

因为本教程使用 Minikube ，而不是将 Docker 镜像推送到仓库，所以你可以使用与 Minikube VM 相同的 Docker 主机来构建镜像，以便自动显示镜像，为此，请确保使用 Minikube Docker 守护程序：

```shell
eval $(minikube docker-env)
```

>注意：稍后，当你不再希望使用 Minikube 主机时，可以通过运行 `eval $(minikube docker-env -u)` 撤消此更改。

使用 Minikube Docker 守护进程构建 Docker 镜像（注意最后这个 .）：

```shell
docker build -t hello-go:v1 .
```

```
$ docker images
 ➭ docker images
REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
hello-go                                  v1                  f9a6fbe2045d        13 minutes ago        801MB
```

现在，Minikube VM 可以运行你构建的映像。


## 创建一个 Deployment

Kubernetes [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/) 是一个由一个或多个容器组成的组合，用于管理和联网。
本教程中的 Pod 只有一个 Container。
Kubernetes [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) 会检查 Pod 的运行状况，并在 Pod 终止时重新启动 Pod 的容器。
Deployments 是管理 Pod 的创建和扩容的推荐方法。

使用 `kubectl run` 命令创建管理 Pod 的 Deployment。
Pod 根据你的 `hello-go:v1` Docker 镜像运行一个 Container。
将 `--image-pull-policy` 标志设置为 Never 以永远使用本地映像，而不是从 Docker 仓库中提取它（因为你没有将其推送到那里）：

```shell
kubectl run hello-go --image=hello-go:v1 --port=8080 --image-pull-policy=Never
```

查看 Deployment：

```shell
$ kubectl get deployments
NAME       DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
hello-go   1         1         1            1           40s
```

查看 Pod：

```shell
$ kubectl get pods
NAME                        READY     STATUS    RESTARTS   AGE
hello-go-648b9c5f5f-zdlnc   1/1       Running   0          1m
```

查看集群事件：

```shell
$ kubectl get events
 kubectl get events
LAST SEEN   FIRST SEEN   COUNT     NAME                                           KIND         SUBOBJECT                     TYPE      REASON                  SOURCE                  MESSAGE
2m          2m           1         hello-go-648b9c5f5f-zdlnc.15468316fd9704a1     Pod                                        Normal    Scheduled               default-scheduler       Successfully assigned hello-go-648b9c5f5f-zdlnc to minikube
2m          2m           1         hello-go-648b9c5f5f.15468316fd36e46d           ReplicaSet                                 Normal    SuccessfulCreate        replicaset-controller   Created pod: hello-go-648b9c5f5f-zdlnc
2m          2m           1         hello-go.15468316fc5d32bd                      Deployment                                 Normal    ScalingReplicaSet       deployment-controller   Scaled up replica set hello-go-648b9c5f5f to 1
2m          2m           1         hello-go-648b9c5f5f-zdlnc.1546831710495581     Pod                                        Normal    SuccessfulMountVolume   kubelet, minikube       MountVolume.SetUp succeeded for volume "default-token-5nndf"
2m          2m           1         hello-go-648b9c5f5f-zdlnc.1546831734d69b39     Pod          spec.containers{hello-go}     Normal    Pulled                  kubelet, minikube       Container image "hello-go:v1" already present on machine
2m          2m           1         hello-go-648b9c5f5f-zdlnc.1546831737b6f001     Pod          spec.containers{hello-go}     Normal    Created                 kubelet, minikube       Created container
2m          2m           1         hello-go-648b9c5f5f-zdlnc.154683173df5a719     Pod          spec.containers{hello-go}     Normal    Started                 kubelet, minikube       Started container
```

查看kubectl配置：

```shell
$ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /Users/xxxx/.minikube/ca.crt
    server: https://192.168.64.3:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: /Users/xxxx/.minikube/client.crt
    client-key: /Users/xxxx/.minikube/client.key
```

有关 kubectl 命令的更多信息，请参阅 [kubectl 概述](https://kubernetes.io/docs/user-guide/kubectl-overview/)。

## 创建一个 Service

默认情况下，Pod 只能通过 Kubernetes 集群中的内部 IP 地址访问。要使 Kubernetes 虚拟网络外部可以访问 hello-go Container，你必须将 Pod 公开为 Kubernetes [Service](https://kubernetes.io/docs/concepts/services-networking/service/)。

在你的开发机器上，你可以使用 `kubectl expose` 命令将 Pod 公开到公共网络：

```shell
kubectl expose deployment hello-go --type=LoadBalancer
```

查看你刚刚创建的 Service：

```shell
$ kubectl get svc
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
hello-go     LoadBalancer   10.107.111.2   <pending>     8080:32056/TCP   1s
kubernetes   ClusterIP      10.96.0.1      <none>        443/TCP          12h
```

`--type=LoadBalancer` 标志表示你要在集群外部公开服务。在支持负载均衡的云提供商上，将配置外部 IP 地址以访问服务。
在 Minikube 上，`LoadBalancer` 类型通过 `minikube service` 命令使服务可访问。

```shell
minikube service hello-go
```

这将使用为你的应用程序提供服务的本地 IP 地址自动打开浏览器窗口，并显示 `Welcome to minikube server!` 消息。

```shell
$ minikube service hello-go
Opening kubernetes service default/hello-go in default browser...
```

假设你已使用浏览器或 curl 向新 Web 服务发送请求，你现在应该能够看到一些日志：

```shell
$ kubectl logs -f <pod-name>
```

## 更新你的应用程序

编辑 `server.go` 文件以返回新消息：

```go
	fmt.Fprintf(w, "Welcome to minikube go server v2!")
```

构建新版本的镜像（注意最后的 .）：

```shell
docker build -t hello-go:v2 .
```

```shell
$ docker images
REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
hello-go                                  v2                  f37ea6b3ca9b        15 hours ago        801MB
hello-go                                  v1                  41e419790e7d        15 hours ago        801MB
```

更新 Deployment 的镜像：

```shell
kubectl set image deployment/hello-go hello-go=hello-go:v2
```

或者直接修改 deployment/hello-go 的文件：

```shell
kubectl edit deployment/hello-go
```

使用浏览器或者 curl 查看运行结果，发现显示内容也已经更新了。

或者你也可以使用 `minikube service hello-node` ，他会自动打开浏览器并加载网址显示信息。

## 启用插件

Minikube 有一组内置插件，可以在本地 Kubernetes 环境中启用，禁用和打开。

首先列出当前支持的插件：

```shell
$ minikube addons list
- addon-manager: enabled
- coredns: disabled
- dashboard: enabled
- default-storageclass: enabled
- efk: disabled
- freshpod: disabled
- heapster: enabled
- ingress: disabled
- kube-dns: enabled
- metrics-server: disabled
- nvidia-driver-installer: disabled
- nvidia-gpu-device-plugin: disabled
- registry: disabled
- registry-creds: disabled
- storage-provisioner: enabled
```

必须运行 Minikube 才能使这些命令生效。
要启用 heapster 插件，例如：

```shell
$ minikube addons enable heapster
heapster was successfully enabled
```

查看刚刚创建的 Pod 和 Service：

```
$ kubectl get po,svc -n kube-system
NAME                                        READY     STATUS    RESTARTS   AGE
pod/heapster-gb7jj                          1/1       Running   0          10h
pod/influxdb-grafana-m5ltj                  2/2       Running   0          10h
pod/kube-addon-manager-minikube             1/1       Running   0          13h
pod/kube-dns-6dcb57bcc8-g6q9w               3/3       Running   0          10h
pod/kubernetes-dashboard-5498ccf677-p92sz   1/1       Running   0          10h
pod/storage-provisioner                     1/1       Running   0          10h

NAME                           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
service/heapster               ClusterIP   10.101.28.158   <none>        80/TCP              10h
service/kube-dns               ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP       10h
service/kubernetes-dashboard   NodePort    10.107.13.248   <none>        80:30000/TCP        10h
service/monitoring-grafana     NodePort    10.110.220.73   <none>        80:30002/TCP        10h
service/monitoring-influxdb    ClusterIP   10.107.27.163   <none>        8083/TCP,8086/TCP   10h
```

打开端点以在浏览器中与 heapster 进行交互：

```shell
$ minikube addons open heapster
Opening kubernetes service kube-system/monitoring-grafana in default browser...
```

可能你打开查看监控是没有数据的，你可以模拟访问请求，然后再查看监控的 dashboard。

```shell
while sleep 0.1; do curl http://192.168.64.3:32056/; done
```

如果你要关闭 heapster：

```shell
$ minikube addons disable heapster
heapster was successfully disabled
```

heapster 的完全关闭需要等一段时间。


## 清理

现在，你可以清理在群集中创建的资源：

```shell
$ kubectl delete service hello-go
service "hello-go" deleted
$ kubectl delete deployment hello-go
deployment.extensions "hello-go" deleted
```

（可选）强制删除创建的 Docker 镜像：

```shell
$ docker rmi hello-go:v1 hello-go:v2 -f
docker rmi hello-go:v1 hello-go:v2 -f
Untagged: hello-go:v1
Deleted: sha256:41e419790e7da55ac34456c09e921f2d9dfa336aab6a47a67079746a8428ae4e
...
Untagged: hello-go:v2
Deleted: sha256:f37ea6b3ca9bb06496751be9e93e50456a49363707606625b85b3811a663c364
...
```

（可选）停止 Minikube VM：

```shell
minikube stop
eval $(minikube docker-env -u)
```

`eval $(minikube docker-env -u)` 这个非常重要，如果你没有执行这个的话，你本地的 docker 运行会执行到 minikube 上的 vm ；

（可选）删除 Minikube VM：

```shell
minikube delete
```

## 参考资料

1. [Hello Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)
2. [Kubernetes 墙内使用技巧](http://blog.samemoment.com/articles/kubernetes/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

---
layout: post
title: '使用 kubeadm 搭建 kubernetes 1.10.2 集群'
keywords: Golang, k8s, kubernetes, kubeadm
date: 2018-05-15 14:30:00
description: '使用 kubeadm 搭建 kubernetes 1.10.2 集群'
categories: [k8s]
tags: [Golang, k8s, kubernetes, kubeadm]
comments: true
author: mai
---

    这是一篇使用 kubeadm 搭建 k8s 1.10.2 集群的实践篇。

----

>kubeadm 是 Kubernetes 官方提供的用于快速安装 Kubernetes 集群的工具，通过将集群的各个组件进行容器化安装管理，通过 kubeadm 的方式安装集群比纯手工二进制的安装方式要方便很多，但是目录 kubeadm 还处于 beta 状态，还不能用于生产环境。

[Using kubeadm to Create a Cluster](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/) 文档中已经说明 kubeadm 将很快能够用于生产环境了。

## 准备工作

### 环境

我们这里准备三台 Centos7 的主机用于安装，后续可以根据需要添加节点：

```
$ cat /etc/hosts
192.168.0.21 master
192.168.0.22 client1
192.168.0.23 client2
```

### 主机参数调整

禁用防火墙：

```
$ systemctl stop firewalld
$ systemctl disable firewalld
```

禁用SELINUX：

```
$ setenforce 0
$ cat /etc/selinux/config
SELINUX=disabled
```
创建/etc/sysctl.d/k8s.conf文件，添加如下内容：

```
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
```

执行如下命令使修改生效：

```
$ modprobe br_netfilter
$ sysctl -p /etc/sysctl.d/k8s.conf
```

### 安装 Docker

见后文的参考资料。

### 安装 etcd 集群

#### 方法一：外部构建 etcd 集群

默认情况下 kubeadm 只安装了单节点的 etcd 在 master 节点上，
如果我们我们要使用 etcd 集群的话，则需要我们自己来构建了。

在以前的 kubeadm 版本中有 `--external-etcd-endpoints` ，现在该参数已经没有了，所以要使用 `–config` 参数外挂配置文件 `kubeadm-config.yml`

```
apiVersion: kubeadm.k8s.io/v1alpha1
kind: MasterConfiguration
networking:
  podSubnet: 10.244.0.0/16
apiServerCertSANs:
- master01
- 192.168.0.21
etcd:
  endpoints:
  - http://192.168.0.21:2379
  - http://192.168.0.22:2379
  - http://192.168.0.23:2379
token: xxx
kubernetesVersion: v1.10.2
```
其中：token 是使用指令 `kubeadm token generate` 生成的。

初始化指令：

`kubeadm init --config kubeadm-config.yml`

>说明：如果打算使用 flannel 网络，请去掉 networking 注释。如果有多网卡的，请根据实际情况配置 `--api-advertise-addresses=<ip-address>`，单网卡情况可以省略。


接下来我们使用了 docker-compose 安装，当然，如果觉得麻烦，也可以直接 docker run。

Master01 节点的 ETCD 的 `docker-compose.yml`：

```
etcd:
  image: quay.io/coreos/etcd:v3.2.18
  command: etcd --name etcd-srv1 --data-dir=/var/etcd/calico-data --listen-client-urls http://0.0.0.0:2379 --advertise-client-urls http://192.168.0.21:2379,http://192.168.0.21:2380 --initial-advertise-peer-urls http://192.168.0.21:2380 --listen-peer-urls http://0.0.0.0:2380 -initial-cluster-token etcd-cluster -initial-cluster "etcd-srv1=http://192.168.0.21:2380,etcd-srv2=http://192.168.0.22:2380,etcd-srv3=http://192.168.0.23:2380" -initial-cluster-state new
  net: "bridge"
  ports:
  - "2379:2379"
  - "2380:2380"
  restart: always
  stdin_open: true
  tty: true
  volumes:
  - /store/etcd:/var/etcd
```

Master02 节点的 ETCD 的 `docker-compose.yml`：

```
etcd:
  image: quay.io/coreos/etcd:v3.2.18
  command: etcd --name etcd-srv2 --data-dir=/var/etcd/calico-data --listen-client-urls http://0.0.0.0:2379 --advertise-client-urls http://192.168.0.22:2379,http://192.168.0.22:2380 --initial-advertise-peer-urls http://192.168.0.22:2380 --listen-peer-urls http://0.0.0.0:2380 -initial-cluster-token etcd-cluster -initial-cluster "etcd-srv1=http://192.168.0.21:2380,etcd-srv2=http://192.168.0.22:2380,etcd-srv3=http://192.168.0.23:2380" -initial-cluster-state new
  net: "bridge"
  ports:
  - "2379:2379"
  - "2380:2380"
  restart: always
  stdin_open: true
  tty: true
  volumes:
  - /store/etcd:/var/etcd
```

Master03 节点的 ETCD 的 `docker-compose.yml`：

```
etcd:
  image: quay.io/coreos/etcd:v3.2.18
  command: etcd --name etcd-srv3 --data-dir=/var/etcd/calico-data --listen-client-urls http://0.0.0.0:2379 --advertise-client-urls http://192.168.0.23:2379,http://192.168.0.23:2380 --initial-advertise-peer-urls http://192.168.0.23:2380 --listen-peer-urls http://0.0.0.0:2380 -initial-cluster-token etcd-cluster -initial-cluster "etcd-srv1=http://192.168.0.21:2380,etcd-srv2=http://192.168.0.22:2380,etcd-srv3=http://192.168.0.23:2380" -initial-cluster-state new
  net: "bridge"
  ports:
  - "2379:2379"
  - "2380:2380"
  restart: always
  stdin_open: true
  tty: true
  volumes:
  - /store/etcd:/var/etcd
```

创建好docker-compose.yml文件后，使用命令 `docker-compose up -d`部署。

关于 docker-compose 的使用，可以参考：[docker-compose安装文档](https://docs.docker.com/compose/install/#alternative-install-options)。

```
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
docker-compose up -d
```

#### 方法二：在已知 etcd 上配置 etcd 高可用

- 新建一个 2 节点的 etcd cluster
- 查看 etcd 的状态
- 迁移原来 master 节点上的 etcd 数据到上面新建的 etcd cluster 中
- 切换 kube-apiserver 使用新的 etcd endpoint 地址
- 清理掉原来的单节点 etcd 服务
- 重建一个 etcd 服务，加入新集群
- 部署新的 etcd 节点
- 更新另外2个节点的 etcd.yaml 配置

##### 1. 新建一个 2 节点的 etcd cluster

```
### 基于当前 master 节点 etcd-0 的 etcd 配置来修改：
k8s-master$ scp /etc/kubernetes/manifests/etcd.yaml username@192.168.0.22:/tmp/
k8s-master$ scp /etc/kubernetes/manifests/etcd.yaml username@192.168.0.23:/tmp/
```

```
### 修改 etcd 配置，设置成一个全新的 cluster
k8s-client1$ vim /tmp/etcd.yaml
...
spec:
  containers:
  - command:
    - etcd
    - --name=etcd-01
    - --client-cert-auth=true
    - --peer-client-cert-auth=true
    - --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --listen-client-urls=http://127.0.0.1:2379,http://192.168.0.22:2379
    - --advertise-client-urls=http://192.168.0.22:2379
    - --initial-advertise-peer-urls=http://192.168.0.22:2380
    - --listen-peer-urls=http://192.168.0.22:2380
    - --initial-cluster-token=etcd-cluster
    - --initial-cluster=etcd-01=http://192.168.0.22:2380,etcd-02=http://192.168.0.23:2380
    - --initial-cluster-state=new
    - --data-dir=/var/lib/etcd
    - --key-file=/etc/kubernetes/pki/etcd/server.key
    - --cert-file=/etc/kubernetes/pki/etcd/server.crt
    - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
    - --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
    - --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    image: k8s.gcr.io/etcd-amd64:3.2.18
... # 略过部分是没有修改的内容
```

```
k8s-client2$ vim /tmp/etcd.yaml
...
spec:
  containers:
  - command:
    - etcd
    - --name=etcd-02
    - --client-cert-auth=true
    - --peer-client-cert-auth=true
    - --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --listen-client-urls=http://127.0.0.1:2379,http://192.168.0.23:2379
    - --advertise-client-urls=http://192.168.0.23:2379
    - --initial-advertise-peer-urls=http://192.168.0.23:2380
    - --listen-peer-urls=http://192.168.0.23:2380
    - --initial-cluster-token=etcd-cluster
    - --initial-cluster=etcd-01=http://192.168.0.22:2380,etcd-02=http://192.168.0.23:2380
    - --initial-cluster-state=new
    - --data-dir=/var/lib/etcd
    - --key-file=/etc/kubernetes/pki/etcd/server.key
    - --cert-file=/etc/kubernetes/pki/etcd/server.crt
    - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
    - --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
    - --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    image: k8s.gcr.io/etcd-amd64:3.2.18
... # 略过部分是没有修改的内容
```

怎么查看镜像当前的最新版本？

浏览器中输入：`http://gcr.io/google_containers/etcd-amd64`，就可以看到最新的版本了。

```
### 启动 etcd cluster
### 配置文件同步到 manifests 后将会被 kubelet 检测到然后自动将 pod 启动
k8s-client1$ rm -rf /var/lib/etcd
k8s-client1$ cp -a /tmp/etcd.yaml /etc/kubernetes/manifests/

k8s-client2$ rm -rf /var/lib/etcd
k8s-client2$ cp -a /tmp/etcd.yaml /etc/kubernetes/manifests/

k8s-master$ kubectl get pods --all-namespaces
NAMESPACE     NAME                                 READY     STATUS             RESTARTS   AGE
kube-system   etcd-k8s-client1                     0/1       CrashLoopBackOff   2          51s
kube-system   etcd-k8s-client2                     0/1       CrashLoopBackOff   2          48s
kube-system   etcd-k8s-master                      1/1       Running            0          1h
```
从上面我们可以看到，k8s 集群重启了两个etcd，但是他们的状态是： CrashLoopBackOff 。

通过 kubectl describe 和 kubectl logs 查看：

```
k8s-client1$ kubectl describe etcd-k8s-client1 -n kube-system
...
k8s-client1$ kubectl logs etcd-k8s-client1 -n kube-system
...
2018-05-15 11:13:36.178330 I | etcdmain: etcd Version: 3.2.18
2018-05-15 11:13:36.178391 I | etcdmain: Git SHA: eddf599c6
2018-05-15 11:13:36.178395 I | etcdmain: Go Version: go1.8.7
2018-05-15 11:13:36.178398 I | etcdmain: Go OS/Arch: linux/amd64
2018-05-15 11:13:36.178403 I | etcdmain: setting maximum number of CPUs to 1, total number of available CPUs is 1
2018-05-15 11:13:36.178451 N | etcdmain: the server is already initialized as member before, starting as etcd member...
2018-05-15 11:13:36.178477 I | embed: peerTLS: cert = /etc/kubernetes/pki/etcd/peer.crt, key = /etc/kubernetes/pki/etcd/peer.key, ca = , trusted-ca = /etc/kubernetes/pki/etcd/ca.crt, client-cert-auth = true
2018-05-15 11:13:36.178481 W | embed: The scheme of peer url http://192.168.0.22:2380 is HTTP while peer key/cert files are presented. Ignored peer key/cert files.
2018-05-15 11:13:36.178485 W | embed: The scheme of peer url http://192.168.0.22:2380 is HTTP while client cert auth (--peer-client-cert-auth) is enabled. Ignored client cert auth for this url.
2018-05-15 11:13:36.178536 I | embed: listening for peers on http://192.168.0.22:2380
2018-05-15 11:13:36.178557 W | embed: The scheme of client url http://127.0.0.1:2379 is HTTP while peer key/cert files are presented. Ignored key/cert files.
2018-05-15 11:13:36.178560 W | embed: The scheme of client url http://127.0.0.1:2379 is HTTP while client cert auth (--client-cert-auth) is enabled. Ignored client cert auth for this url.
2018-05-15 11:13:36.178574 I | embed: listening for client requests on 127.0.0.1:2379
2018-05-15 11:13:36.178583 W | embed: The scheme of client url http://192.168.0.22:2379 is HTTP while peer key/cert files are presented. Ignored key/cert files.
2018-05-15 11:13:36.178586 W | embed: The scheme of client url http://192.168.0.22:2379 is HTTP while client cert auth (--client-cert-auth) is enabled. Ignored client cert auth for this url.
2018-05-15 11:13:36.178599 I | embed: listening for client requests on 192.168.0.22:2379
2018-05-15 11:13:36.189717 C | etcdmain: open /etc/kubernetes/pki/etcd/peer.crt: no such file or directory
```

将认证文件拷贝到对应目录 `/etc/kubernetes/pki/etcd/*` 下，然后 `kubectl delete pod etcd-k8s-client1 -n kube-system` 即可。

```
### 下载一个 etcdctl 工具来管理集群：
k8s-master$ cd /usr/local/bin/
k8s-master$ wget https://github.com/coreos/etcd/releases/download/v3.2.18/etcd-v3.2.18-linux-amd64.tar.gz
k8s-master$ tar zxf etcd-v3.2.18-linux-amd64.tar.gz
k8s-master$ mv etcd-v3.2.18-linux-amd64/etcd* .
k8s-master$ ETCDCTL_API=3 ./etcdctl --endpoints "http://192.168.0.22:2379,http://192.168.0.23:2379" endpoint status
http://192.168.0.22:2379, 64113736f52b426f, 3.2.18, 25 kB, false, 3, 9
http://192.168.0.23:2379, 165583720ecd010, 3.2.18, 25 kB, true, 3, 9
```

...

### 镜像

如果你的节点上面有科学上网的工具或者可以直接访问墙外镜像的话，可以忽略这一步，否则我们需要提前将所需的 `gcr.io` 上面的镜像下载到节点上面，当然前提条件是你已经成功安装了 `docker` 。

有关如何处理无法拉取 `gcr.io` 的问题，可以参考后文参考资料。

镜像主要都是使用：`https://github.com/anjia0532/gcr.io_mirror` ，但是 `flannel:v0.10.0-amd64` 在anjia0532上没有，所以使用另外一个镜像：`cnych/flannel:v0.10.0-amd64`

`master` 节点需要用到以下镜像，一定要提前下载下来。

`$ sh docker_pull_tag_master.sh`

```
#!/bin/sh

docker pull anjia0532/kube-apiserver-amd64:v1.10.2
docker pull anjia0532/kube-scheduler-amd64:v1.10.2
docker pull anjia0532/kube-controller-manager-amd64:v1.10.2
docker pull anjia0532/kube-proxy-amd64:v1.10.2
docker pull anjia0532/k8s-dns-kube-dns-amd64:1.14.10
docker pull anjia0532/k8s-dns-dnsmasq-nanny-amd64:1.14.10
docker pull anjia0532/k8s-dns-sidecar-amd64:1.14.10
docker pull anjia0532/etcd-amd64:3.2.18
docker pull cnych/flannel:v0.10.0-amd64
docker pull anjia0532/pause-amd64:3.1

docker tag anjia0532/kube-apiserver-amd64:v1.10.2 k8s.gcr.io/kube-apiserver-amd64:v1.10.2
docker tag anjia0532/kube-scheduler-amd64:v1.10.2 k8s.gcr.io/kube-scheduler-amd64:v1.10.2
docker tag anjia0532/kube-controller-manager-amd64:v1.10.2 k8s.gcr.io/kube-controller-manager-amd64:v1.10.2
docker tag anjia0532/kube-proxy-amd64:v1.10.2 k8s.gcr.io/kube-proxy-amd64:v1.10.2
docker tag anjia0532/k8s-dns-kube-dns-amd64:1.14.10 k8s.gcr.io/k8s-dns-kube-dns-amd64:1.14.10
docker tag anjia0532/k8s-dns-dnsmasq-nanny-amd64:1.14.10 k8s.gcr.io/k8s-dns-dnsmasq-nanny-amd64:1.14.10
docker tag anjia0532/k8s-dns-sidecar-amd64:1.14.10 k8s.gcr.io/k8s-dns-sidecar-amd64:1.14.10
docker tag anjia0532/etcd-amd64:3.2.18 k8s.gcr.io/etcd-amd64:3.2.18
docker tag cnych/flannel:v0.10.0-amd64 quay.io/coreos/flannel:v0.10.0-amd64
docker tag anjia0532/pause-amd64:3.1 k8s.gcr.io/pause-amd64:3.1
```

在其他 `Node` 节点上需要用到的镜像，在 join 节点之前也需要先下载到节点上面：

`$ sh docker_pull_tag_client.sh`

```
#!/bin/sh

docker pull anjia0532/kube-proxy-amd64:v1.10.2
docker pull cnych/flannel:v0.10.0-amd64
docker pull anjia0532/pause-amd64:3.1
docker pull anjia0532/kubernetes-dashboard-amd64:v1.8.3
docker pull anjia0532/heapster-influxdb-amd64:v1.3.3
docker pull anjia0532/heapster-grafana-amd64:v4.4.3
docker pull anjia0532/heapster-amd64:v1.5.3

docker tag anjia0532/kube-proxy-amd64:v1.10.2 k8s.gcr.io/kube-proxy-amd64:v1.10.2
docker tag cnych/flannel:v0.10.0-amd64 quay.io/coreos/flannel:v0.10.0-amd64
docker tag anjia0532/pause-amd64:3.1 k8s.gcr.io/pause-amd64:3.1
docker tag anjia0532/kubernetes-dashboard-amd64:v1.8.3 k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.3
docker tag anjia0532/heapster-influxdb-amd64:v1.3.3 k8s.gcr.io/heapster-influxdb-amd64:v1.3.3
docker tag anjia0532/heapster-grafana-amd64:v4.4.3 k8s.gcr.io/heapster-grafana-amd64:v4.4.3
docker tag anjia0532/heapster-amd64:v1.5.3 k8s.gcr.io/heapster-amd64:v1.5.3
```

当然我们也可以把以上 shell 脚本做一下优化：

```
#!/bin/bash
images=(kube-proxy-amd64:v1.7.6 kube-scheduler-amd64:v1.7.6 kube-controller-manager-amd64:v1.7.6 kube-apiserver-amd64:v1.7.6 etcd-amd64:3.0.17 pause-amd64:3.0 kubernetes-dashboard-amd64:v1.6.1 k8s-dns-sidecar-amd64:1.14.4 k8s-dns-kube-dns-amd64:1.14.4 k8s-dns-dnsmasq-nanny-amd64:1.14.4)
for imageName in ${images[@]} ; do
  docker pull anjia0532/$imageName
done
```

你可以查看拉取日志，或者直接使用 `docker images` 来查看镜像是否拉取完成。

### 安装 kubeadm、kubelet、kubectl

我们要确保 `docker` 已经安装完成，并且上面的相关环境配置也完成了，我们所需要的镜像也拉取完成(如果你可以科学上网则可以跳过这一步)
以上步骤都完成了的话，我们就可以来安装 `kubeadm` 了，我们这里是通过指定 `yum` 源的方式来进行安装的：

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
        https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
```
当然了，上面的 `yum` 源也是需要科学上网的，如果不能科学上网的话，我们可以使用阿里云的源进行安装：

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

目前阿里云的源最新版本已经是 1.10 版本，所以可以直接安装。yum 源配置完成后，执行安装命令即可：

```
$ yum makecache fast && yum install -y kubelet kubeadm kubectl
```
正常情况我们可以都能顺利安装完成上面的文件。

### 配置 kubelet

安装完成后，我们还需要对 `kubelet` 进行配置，因为用 `yum` 源的方式安装的 `kubelet` 生成的配置文件将参数 `--cgroup-driver` 改成了 `systemd`，而 `docker` 的 `cgroup-driver` 是 `cgroupfs` ，这二者必须一致才行。

否则，当我们第一次运行 `kubeadm init ...` 命令会卡住：

```
...
[apiclient] Created API client, waiting for the control plane to become ready
```

通过查看 `/var/log/message` 发现如下日志：

```
error: failed to run Kubelet: failed to create kubelet: 
misconfiguration: kubelet cgroup driver: "systemd" is different from docker cgroup driver: "cgroupfs"
```

我们可以通过 `docker info` 命令查看 Docker 的 Cgroup ：

```
$ docker info|grep Cgroup
Cgroup Driver: systemd
```

我们可以将 `docker` 和 `kubelet` 的 `Cgroup` 改为一致的 `cgroupfs`。

修改 `kubelet` 的配置文件: `/etc/systemd/system/kubelet.service.d/10-kubeadm.conf`，将其中的 `KUBELET_CGROUP_ARGS` 参数更改成 `cgroupfs`。

如果要修改 `docker` 的 `Cgroup` 参数，则按照如下命令执行：

```
vim /usr/lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd --exec-opt native.cgroupdriver=cgroupfs
```

然后执行以下命令，让其生效：

```
$ systemctl daemon-reload
$ systemctl restart docker
```
执行 `docker info|grep Cgroup` 查看结果。

另外还有一个问题是关于交换分区的，`Kubernetes` 从 1.8 开始要求关闭系统的 Swap ，如果不关闭，默认配置的 `kubelet` 将无法启动，我们可以通过 kubelet 的启动参数 `--fail-swap-on=false` 更改这个限制，所以我们需要在上面的配置文件中增加一项配置(在 ExecStart 之前)：`Environment="KUBELET_EXTRA_ARGS=--fail-swap-on=false"`

当然最好的还是将 swap 给关掉，这样能提高 kubelet 的性能。修改完成后，重新加载我们的配置文件即可：

```
$ systemctl daemon-reload
```

到这里我们的准备工作就完成了，接下来我们就可以在 `master` 节点上用 `kubeadm` 命令来初始化安装我们的集群了。

## 安装 k8s 集群

### 初始化

命令非常简单，就是 `kubeadm init` ，后面的参数是需要安装的集群版本，因为我们这里选择 flannel 作为 Pod 的网络插件，所以需要指定 `–pod-network-cidr=10.244.0.0/16`，然后是 apiserver 的通信地址，这里就是我们 master 节点的IP 地址。

```
$ kubeadm init --kubernetes-version=v1.10.2 \
    --pod-network-cidr=10.244.0.0/16 \
    --apiserver-advertise-address=192.168.0.21
```

执行以上命令，如果出现 `running with swap on is not supported. Please disable swap` 之类的错误，则我们还需要增加一个参数 `--ignore-preflight-errors=Swap` 来忽略 swap 的错误提示信息。

执行 `kubeadm init` 命令，产生的日志信息记录了 `kubeadm` 初始化整个集群的过程，生成相关的各种证书、kubeconfig 文件、bootstraptoken 等等，里面还包括了教我们如何配置使用 `kubectl` 访问集群的方式： 

	mkdir -p $HOME/.kube 
	sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config sudo chown $(id -u):$(id -g) $HOME/.kube/config 

最后还有一个教我们如何使用 `kubeadm join` 往集群中添加节点的命令。

```
[init] Using Kubernetes version: v1.10.2
[init] Using Authorization modes: [Node RBAC]
[preflight] Running pre-flight checks.
	[WARNING SystemVerification]: docker version is greater than the most recently validated version. Docker version: 18.04.0-ce. Max validated version: 17.03
	[WARNING Hostname]: hostname "k8s-master" could not be reached
	[WARNING Hostname]: hostname "k8s-master" lookup k8s-master on 100.100.2.138:53: no such host
	[WARNING FileExisting-crictl]: crictl not found in system path
Suggestion: go get github.com/kubernetes-incubator/cri-tools/cmd/crictl
[preflight] Starting the kubelet service
[certificates] Generated ca certificate and key.
[certificates] Generated apiserver certificate and key.
[certificates] apiserver serving cert is signed for DNS names [k8s-master kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 192.168.0.21]
[certificates] Generated apiserver-kubelet-client certificate and key.
[certificates] Generated etcd/ca certificate and key.
[certificates] Generated etcd/server certificate and key.
[certificates] etcd/server serving cert is signed for DNS names [localhost] and IPs [127.0.0.1]
[certificates] Generated etcd/peer certificate and key.
[certificates] etcd/peer serving cert is signed for DNS names [k8s-master] and IPs [192.168.0.21]
[certificates] Generated etcd/healthcheck-client certificate and key.
[certificates] Generated apiserver-etcd-client certificate and key.
[certificates] Generated sa key and public key.
[certificates] Generated front-proxy-ca certificate and key.
[certificates] Generated front-proxy-client certificate and key.
[certificates] Valid certificates and keys now exist in "/etc/kubernetes/pki"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/admin.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/kubelet.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/controller-manager.conf"
[kubeconfig] Wrote KubeConfig file to disk: "/etc/kubernetes/scheduler.conf"
[controlplane] Wrote Static Pod manifest for component kube-apiserver to "/etc/kubernetes/manifests/kube-apiserver.yaml"
[controlplane] Wrote Static Pod manifest for component kube-controller-manager to "/etc/kubernetes/manifests/kube-controller-manager.yaml"
[controlplane] Wrote Static Pod manifest for component kube-scheduler to "/etc/kubernetes/manifests/kube-scheduler.yaml"
[etcd] Wrote Static Pod manifest for a local etcd instance to "/etc/kubernetes/manifests/etcd.yaml"
[init] Waiting for the kubelet to boot up the control plane as Static Pods from directory "/etc/kubernetes/manifests".
[init] This might take a minute or longer if the control plane images have to be pulled.
[apiclient] All control plane components are healthy after 31.501768 seconds
[uploadconfig] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[markmaster] Will mark node k8s-master as master by adding a label and a taint
[markmaster] Master k8s-master tainted and labelled with key/value: node-role.kubernetes.io/master=""
[bootstraptoken] Using token: g6d8n7.gn1fpyjjp6n9b4r7
[bootstraptoken] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstraptoken] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstraptoken] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstraptoken] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[addons] Applied essential addon: kube-dns
[addons] Applied essential addon: kube-proxy

Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join 192.168.0.21:6443 --token c2c2ol.h7nv5wh6tnntprxp --discovery-token-ca-cert-hash sha256:dc581d061593b9c169c3d57c17be2bebeb2f8b67805530283b72081b21d8f291
```

我们根据上面的提示配置好 `kubectl` 后，就可以使用 `kubectl` 来查看集群的信息了。

```
$ kubectl get cs
NAME                 STATUS    MESSAGE              ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-0               Healthy   {"health": "true"}

$ kubectl get csr
NAME        AGE       REQUESTOR                CONDITION
csr-lhmjq   13m       system:node:k8s-master   Approved,Issued

$ kubectl get nodes
NAME         STATUS     ROLES     AGE       VERSION
k8s-master   NotReady   master    13m       v1.10.2
```

如果你的集群安装过程中遇到了其他问题，我们可以使用下面的命令来进行重置：

```
$ kubeadm reset
$ ifconfig cni0 down && ip link delete cni0
$ ifconfig flannel.1 down && ip link delete flannel.1
$ rm -rf /var/lib/cni/
```

### 安装 flannel 网络插件

接下来我们来安装 flannel 网络插件，很简单，和安装普通的 POD 没什么两样：

```
$ wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

$ kubectl apply -f kube-flannel.yml
clusterrole.rbac.authorization.k8s.io "flannel" created
clusterrolebinding.rbac.authorization.k8s.io "flannel" created
serviceaccount "flannel" created
configmap "kube-flannel-cfg" created
daemonset.extensions "kube-flannel-ds" created
```

另外需要注意的是如果你的节点有多个网卡的话，需要在 `kube-flannel.yml` 中使用 `--iface` 参数指定集群主机内网网卡的名称，否则可能会出现 dns 无法解析。flanneld 启动参数加上 `--iface=<iface-name>`

```
args:
- --ip-masq
- --kube-subnet-mgr
- --iface=eth0
```

安装完成后使用 `kubectl get nodes` 命令可以查看到我们集群中的节点运行状态，都从 NotReady 变为 Ready 了。
使用 `kubectl get pods` 命令可以查看到我们集群中的组件运行状态，如果都是 Running 状态的话，那么恭喜你，你的 master 节点安装成功了。

```
$ kubectl get pods --all-namespaces
NAMESPACE     NAME                                 READY     STATUS    RESTARTS   AGE
kube-system   etcd-k8s-master                      1/1       Running   0          6m
kube-system   kube-apiserver-k8s-master            1/1       Running   0          6m
kube-system   kube-controller-manager-k8s-master   1/1       Running   0          6m
kube-system   kube-dns-86f4d74b45-l4w5p            3/3       Running   0          7m
kube-system   kube-flannel-ds-gcgpw                1/1       Running   0          2m
kube-system   kube-flannel-ds-qnkl4                1/1       Running   0          2m
kube-system   kube-flannel-ds-vtjdv                1/1       Running   0          2m
kube-system   kube-proxy-6ctt9                     1/1       Running   0          7m
kube-system   kube-proxy-n4t8l                     1/1       Running   0          3m
kube-system   kube-proxy-vwcbs                     1/1       Running   0          3m
kube-system   kube-scheduler-k8s-master            1/1       Running   0          6m
```

如果上面的 STATUS 不是 Running，我们可以在 master 节点上用 kubectl describe pod kube-dns-86f4d74b45-l4w5p -n kube-system 查看详细日志。

>说明：kube-dns 需要等 flannel 配置完成后才是 Running 状态。

### 添加节点

kubeadm 初始化完成后，默认情况下 Pod 是不会被调度到 master 节点上的，所以现在还不能直接测试普通的 Pod，需要添加一个工作节点后才可以。

同样的上面的环境配置、docker 安装、kubeadm、kubelet、kubectl 这些都在 (192.168.0.22, 192.168.0.23) 两个 Node 节点上安装配置好，然后我们就可以直接在 Node 节点上执行 `kubeadm join` 命令了（需要使用 `kubeadm init` 输出的指令），同样加上参数 `--ignore-preflight-errors=Swap`：

```
[preflight] Running pre-flight checks.
	[WARNING SystemVerification]: docker version is greater than the most recently validated version. Docker version: 18.04.0-ce. Max validated version: 17.03
	[WARNING Hostname]: hostname "k8s-client1" could not be reached
	[WARNING Hostname]: hostname "k8s-client1" lookup k8s-client1 on 100.100.2.138:53: no such host
	[WARNING FileExisting-crictl]: crictl not found in system path
Suggestion: go get github.com/kubernetes-incubator/cri-tools/cmd/crictl
[preflight] Starting the kubelet service
[discovery] Trying to connect to API Server "192.168.0.21:6443"
[discovery] Created cluster-info discovery client, requesting info from "https://192.168.0.21:6443"
[discovery] Requesting info from "https://192.168.0.21:6443" again to validate TLS against the pinned public key
[discovery] Cluster info signature and contents are valid and TLS certificate validates against pinned roots, will use API Server "192.168.0.21:6443"
[discovery] Successfully established connection with API Server "192.168.0.21:6443"

This node has joined the cluster:
* Certificate signing request was sent to master and a response
  was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the master to see this node join the cluster.
```

然后在两个 Node 节点上执行：

```
$ kubectl get nodes
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

但是我们在 Master 上执行，可以得到正确的结果：

```
$ kubectl get nodes
NAME          STATUS    ROLES     AGE       VERSION
k8s-client1   Ready     <none>    3m        v1.10.2
k8s-client2   Ready     <none>    3m        v1.10.2
k8s-master    Ready     master    7m        v1.10.2
```

很明显我们的节点已经成功加入到集群了，但是为什么提示无法连接呢？

其实是因为我们的连接都是需要认证的，所以我们把 master 节点的 `~/.kube/config` 文件拷贝到两个 Node 节点对应的位置，然后再执行 `kubectl` 就可以了。

到这里就算我们的集群部署成功了，接下来就可以根据我们的需要安装一些附加的插件，比如 Dashboard、Heapster、Ingress-Controller 等等。

## 安装插件

https://github.com/rootsongjc/kubernetes-handbook/tree/master/manifests

heapter
grafana
influxdb

## 参考资料

1. [Using kubeadm to Create a Cluster](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/)
2. [k8s镜像：安装kubernetes，访问不了gcr.io怎么办？](https://ieevee.com/tech/2017/04/07/k8s-mirror.html)
3. [Docker 的安装方式](https://www.ilanni.com/?p=13426)
4. [用 kubeadm 部署 k8s HA 集群](http://cloudnil.com/2017/11/10/Deploy-kubernetes-HA-with-kubeadm/)
5. [Kubeadm HA 1.9 高可用 集群 本地离线部署](https://www.kubernetes.org.cn/3536.html)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



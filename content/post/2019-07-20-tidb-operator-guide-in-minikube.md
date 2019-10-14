---
title: '在 minikube 上使用 TiDB Operator 构建 TiDB 集群（持续更新中）'
keywords: tidb, operator, kubernetes, k8s, minikube, guide,
date: 2019-07-20T10:00:00+08:00
lastmod: 2019-10-15T10:00:00+08:00
draft: false
description: 'TiDB-Operator 在 minikube 上的实践'
categories: [tidb]
tags: [tidb, operator, kubernetes, k8s, minikube, guide]
comments: true
author: mai
---

## TiDB-Operator

## 准备

1. minikube
2. kubectl
3. helm
4. tidb-operator

## 开始

如果你的本地环境和文档所用的兼容，那么你按照文档进行操作，应该都没有任何问题的（一句废话，😁），但是默认值启动的话，你很大概率会在执行到 helm install pingcap/tidb-cluster 的时候出现了错误：`Unable to connect to the server: net/http: TLS handshake timeout`

然后执行 `minikube status`

```
minikube status
host: Running
kubelet: Running
apiserver: Error
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.105
```

kubernetes 的 API Server 显示：`Error`，已经挂掉了...

其实在操作文档手册中 FAQ，已经跟我们提到了 “Minikube 上的 TiDB 集群不响应或者响应非常慢”

Minikube 虚拟机默认配置为 2048 MB 内存和 2 个 CPU。可以在  `minikube start`  时通过  `--memory`  和  `--cpus`  选项为其分配更多资源。注意，为了使配置修改生效，你需要重新创建 Minikube 虚拟机。

```
minikube delete && \
minikube start --cpus 4 --memory 4096 ...
```

所以，我们只能修改配置后再来走一遍操作手册了。

如果你在重新来一遍时，像我这样“手贱”，把 minikube 和 kubernetes 都升级了的话，那可能就会有悲剧发生。

执行到 `helm init` 的时候，始终会报错：`Error: error installing: the server could not find the requested resource`

产生这个问题是因为我们的 kubernetes 太新了，helm 跟其有兼容问题（helm v2.14.3 不兼容 Kubernetes 1.16.0 的 apiVersion ），咱们需要做一些配置修改：

解决方案的操作步骤：

```
$ helm init --output yaml > tiller.yaml
```

更新 tiller.yaml 两处：

* apiVersion 版本
* 增加选择器

```
apiVersion: apps/v1
kind: Deployment
...
spec:
  replicas: 1
  strategy: {}
  selector:
    matchLabels:
      app: helm
      name: tiller
```

创建 tiller

```
$ kubectl create -f tiller.yaml
```

## 参考文档

1. [ 在 Minikube 集群上部署 TiDB 集群](https://pingcap.com/docs-cn/v3.0/tidb-in-kubernetes/get-started/deploy-tidb-from-kubernetes-minikube/)
2. [ Kubernetes 1.6.0 安装问题汇总](https://www.chenshaowen.com/blog/summary-of-installation-problems-for-kubernetes-1.6.0.html)
3. [helm v2.14.3 不兼容 Kubernetes 1.16.0 的 apiVersion ](https://github.com/helm/helm/issues/6374)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

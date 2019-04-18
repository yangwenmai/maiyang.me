---
title: 'minikube 本地安装调试'
keywords: kubernetes, k8s, minikube, golang
date: 2019-04-02T15:26:00+08:00
lastmod: 2019-04-02T15:26:00+08:00
draft: false
description: 'minikube 本地安装调试'
categories: [kubernetes]
tags: [kubernetes, k8s, minikube, golang]
comments: true
author: mai
---

## minikube
### 安装

`brew cask install minikube`

### minikube 升级

```sh
$ brew cask reinstall minikube

==> Satisfying dependencies
All Formula dependencies satisfied.
==> Downloading https://storage.googleapis.com/minikube/releases/v1.0.0/minikube-darwin-amd64
######################################################################## 100.0%
==> Verifying SHA-256 checksum for Cask 'minikube'.
==> Uninstalling Cask minikube
==> Unlinking Binary '/usr/local/bin/minikube'.
==> Purging files for version 0.28.2 of Cask minikube
==> Installing Cask minikube
==> Linking Binary 'minikube-darwin-amd64' to '/usr/local/bin/minikube'.
🍺  minikube was successfully installed!
```

## kube-ctl

### 安装

`brew install kubernetes-cli`

### 升级

`brew upgrade kubernetes-cli`

## minikube start

```sh
$ minikube start
minikube start
😄  minikube v1.0.0 on darwin (amd64)
🤹  Downloading Kubernetes v1.14.0 images in the background ...
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
💿  Downloading Minikube ISO ...
 142.88 MB / 142.88 MB [============================================] 100.00% 0s
📶  "minikube" IP address is 192.168.99.100
🐳  Configuring Docker as the container runtime ...
🐳  Version of container runtime is 18.06.2-ce
⌛  Waiting for image downloads to complete ...
✨  Preparing Kubernetes environment ...
💾  Downloading kubelet v1.14.0
💾  Downloading kubeadm v1.14.0
🚜  Pulling images required by Kubernetes v1.14.0 ...
🚀  Launching Kubernetes v1.14.0 using kubeadm ...
⌛  Waiting for pods: apiserver proxy etcd scheduler controller dns
🔑  Configuring cluster permissions ...
🤔  Verifying component health .....
💗  kubectl is now configured to use "minikube"
🏄  Done! Thank you for using minikube!
```

## 扩展阅读

1. [2018-07-31-minikube-guide-in-mac.md](https://maiyang.me/post/2018-07-31-minikube-guide-in-mac/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

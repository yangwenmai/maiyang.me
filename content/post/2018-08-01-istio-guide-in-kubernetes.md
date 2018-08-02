---
title: '在 kubernetes 中运行 istio'
keywords: kubernetes, istio, microservice, servicemesh
date: 2018-08-01T20:14:23+08:00
lastmod: 2018-08-01T20:14:23+08:00
draft: false
description: '在 kubernetes 中运行 istio'
categories: [kubernetes]
tags: [kubernetes, istio, servicemesh, microservice]
comments: true
author: mai
---

这是一篇 istio 实践。

----

## 准备工作

- 参照官方文档就能够入门 `minikube` 了：[https://kubernetes.io/docs/tutorials/hello-minikube/](https://kubernetes.io/docs/tutorials/hello-minikube/)
- 也可以参照我之前的 [minikube 入门文章](https://maiyang.me/post/2018-07-31-minikube-guide-in-mac/)
- 下载 istio

## 下载 istio

```shell
curl -L https://git.io/getLatestIstio | sh -
```

注意，这里可能又有墙的问题（我们需要给命令行设置代理）。

然后将以下文件加入运行环境变量 `~/.zshrc` 中。

```shell
export PATH="/Users/xxx/istio-1.0.0/bin:$PATH"
```



## 参考资料

1. [从零搭建一个基于 istio 的服务网格](http://emacoo.cn/devops/istio-tutorial/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

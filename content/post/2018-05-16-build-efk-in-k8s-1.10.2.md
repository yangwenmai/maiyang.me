---
layout: post
title: '在 k8s 1.10.2 集群上搭建 EFK'
keywords: k8s, kubernetes, efk, elasticsearch, Kibana, Fluentd
date: 2018-05-16 22:30:00
description: '在 k8s 1.10.2 集群上搭建 EFK'
categories: [k8s]
tags: [k8s, kubernetes, efk, elasticsearch, Kibana, Fluentd]
comments: true
author: mai
---

    这是一篇在 k8s 1.10.2 集群上搭建 EFK 的实践篇。

----

## 参考资料

0. [kubernetes-- kubernetes 的日志解决方案](https://zhangchenchen.github.io/2017/11/23/kubernetes-logging-solution/)
1. [](https://github.com/rootsongjc/kubernetes-handbook/tree/master/manifests)
2. [EFK收集Kubernetes应用日志](https://jkzhao.github.io/2017/10/12/EFK收集Kubernetes应用日志/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

---
layout: post
title: '基于 Docker 进行 Golang 开发'
keywords: Golang, Docker
date: 2018-03-15 23:50:00
description: '基于 Docker 进行 Golang 开发'
categories: [Golang]
tags: [Golang, Docker]
comments: true
author: mai
---

    本文将介绍如何基于 Docker 进行 Golang 的开发。

----

## 前言

Docker 一般被用来部署服务，作为容器在使用，但是也可以用于开发容器的。

### 为什么要在开发中使用 Docker ？

- 一致的开发环境
    - 使用Docker，可以保证整个研发团队使用一致的开发环境。
- 开发环境与最终的生产环境保持一致
    - 这减少了部署出错的可能性。
- 简化了编译和构建的复杂性
    - 对于一些动辄数小时的编译和构建工作，可以用Docker来简化。
- 在开发时只需Docker
    - 无需在自己的开发主机上搭建各种编程语言环境。
- 可以使用同一编程语言的多个版本
    - 可以使用同一编程语言（如python, python, ruby, ruby, java, node）等的多个版本，无需解决多版本冲突的问题。
- 部署很简单
    - 应用程序在容器中运行，和在生产环境中部署运行是一样的。只需打包你的代码并部署到带有同样- 镜像的服务器上，或者是把代码连同原镜像建立一个新Docker镜像再直接运行新镜像。
- 使用自己喜欢的开发IDE
    - 仍然可以继续使用自己喜欢的开发IDE，无需运行VirtualBox虚拟机或SSH。


## 实战


### 其他


## 扩展阅读

1. https://www.jianshu.com/p/08144d4866de
2. [docker 私有仓库构建](https://www.jianshu.com/p/9cf9d1c8b00c)
3. [装在 Docker 里面的 Beego](https://github.com/lei-cao/beego-in-action/blob/master/zh/beego-in-docker.md)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

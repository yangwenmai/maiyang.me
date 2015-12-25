---
layout: post
title: 'Golang 技术分享'
keywords: Golang, 分享
date: 2015-12-23 15:33
description: '团队内Golang技术分享'
categories: [Golang, 分享]
tags: [Golang, 分享]
comments: true
group: archive
icon: file-o
---

....
----

经过一段时间的沉淀，我们团队已经从Ruby转到Golang上了，并且还开发了一整套开发框架。感谢我们的架构师dworld。	

在Golang开发上，已经有前人给我们整理了很多资料，详细见[这里](https://github.com/ty4z2008/Qix/blob/master/golang.md)，我就重点提以下几个：1. 项目代码依赖问题。 2.json 解析struct问题。 3.golint 代码规范

<!-- more -->

### 代码依赖 ###

我们可以使用[GoWalker](https://gowalker.org/)，也可以使用[GoDoc](https://godoc.org/)

搜索的项目支持Github，googlecode，golang等线上代码服务。搜索之后能够显示该项目的完整doc以及他的依赖情况（导入哪些包，被哪些包导入，以及[依赖图](https://godoc.org/github.com/xiaoenai/xingyun?import-graph&hide=1)）。

还有我们肯定还想在本地查看golang文档，怎么办呢？

安装godoc

> go get code.google.com/p/go.tools/cmd/godoc
> godoc -http=:6060

浏览器输入
	
	http://localhost:6060

> godoc fmt Println （查看fmt的Println方法）
> ...

知识补充：[go doc与godoc](https://github.com/hyper-carrot/go_command_tutorial/blob/master/0.5.md)

### json 解析成struct ###

这一块还没有深入了解，大家可以参考[json_encoding](https://golang.org/pkg/encoding/json/)。

我这里只简单说说我的理解，当我们的json数据存储到memcache或者redis之后，读取到之后，我们通过json.Unmarshal来解析成struct。struct定义了基本数据类型，但是json中没有，则会被解析初始化成基本数据类型的零值。这里struct如果有定义指针类型，则要特别小心，避免出现nil pointer问题。

### golint 代码规范 ###

安装[golint]

> go get -u github.com/golang/lint/golint

[golint 配置](https://github.com/golang/lint)

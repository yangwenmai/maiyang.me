---
layout: post
title: 'Golang 开发技术分享'
keywords: Golang, 分享, share
date: 2015-12-25 15:33
description: 'Golang 开发技术分享'
categories: Golang
tags: [Golang, 分享, share]
comments: true
group: archive
icon: file-o
---

概要说明
....
----

经过一段时间的沉淀，我们团队已经从Ruby转到Golang上了，并没有严格算过这为我们节省了多少成本（业务增长还是太快了，服务器资源看不太出来），但是我们的开发效率，以及开发的效果是显而易见的，这一定要好好感谢dworld。

虽然在Golang开发上，我们得到了很多好处与便利，但是他还是有很多问题的。
详细见[这里](https://github.com/ty4z2008/Qix/blob/master/golang.md)

我简单提一下以下几个方面：
	
	1. 项目依赖问题。 
	2. json 解析struct问题。

<!--more-->

### 代码依赖 ###

很多人会推荐godep,gom等等。

大家可以先看看[GoWalker](https://gowalker.org/)，或者[GoDoc](https://godoc.org/)

他们的功能基本类似，支持Github，googlecode，golang等线上代码服务的搜索。搜索之后能够显示该项目的完整doc以及他的依赖情况（导入哪些包，被哪些包导入，以及[依赖图](https://godoc.org/github.com/xiaoenai/xingyun?import-graph&hide=1)）。

除此之外，我们应该还想在本地查看golang文档吧？

**安装godoc**

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

----

顺便提一下：

### Golang开发工具 ###

> [liteide](https://github.com/visualfc/liteide)

> sublime text2 ，golang插件
> 
> vim，golang插件 vim-go
> 
> intellij idea，[golang插件](https://plugins.jetbrains.com/plugin/5047?pr=idea&showAllUpdates=true)
> 
> webstorm，[golang插件](https://plugins.jetbrains.com/plugin/5047?pr=idea&showAllUpdates=true)
> 
> atom

以上开发工具，我都使用过，目前一直在用的vim和WebStorm。

### golint 代码规范 ###

安装[golint](https://github.com/golang/lint)

> go get -u github.com/golang/lint/golint



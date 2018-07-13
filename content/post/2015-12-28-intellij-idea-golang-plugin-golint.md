---
layout: post
title: '代码规范之golint'
keywords: Golang, 工具, IDE, IntelliJ IDEA, golint
date: 2015-12-28 19:00:00
description: 'Intellij IDEA 15 搭配 golint'
categories: [golang]
tags: [Golang, 工具, 工具, IntelliJ IDEA, golint]
comments: true
group: archive
icon: file-o
---
....
----

昨天的文章主要分享的是Golang 必备开发工具，并且重点介绍了vim和IntelliJ IDEA(WebStorm)，文中提到了golint（go 代码检查工具）。

<!--more-->

那我就先来做一个统计，看看大家平常怎么做好代码规范的呢？
1. 哪些方法来做代码规范呢？
	
	1. 从来没有考虑过 2. CodeReview 3. 代码检查工具 4. 其他

2. 在Golang语言中你使用 golint 或其他类似的代码检查工具吗？

接下来，我就把我的一些实践分享给大家，我将展开来讲一讲它的使用，重点是在IntelliJ IDEA上的配置使用。

golint 代码检查，官方提供了vim和emacs的配置使用说明，上一篇文章已经介绍。

安装[golint](https://github.com/golang/lint)

> go get -u github.com/golang/lint/golint

### 实战讲解 ###

#### vim golint demo ####

在配置好GOPATH之后，golint命令就可以在Terminal中运行了，例子如下：
$GOPATH/server/demo/demo.go

```go
	package main
	
	import "fmt"
	
	var tt string = "fdsalf"
	
	const (
		DEMO_TT = 1
	)
	
	func main() {
		fmt.Println(tt)
		fmt.Println(DEMO_TT)
	}
```

$GOPATH/server/demo> golint .
$GOPATH/server/demo> golint demo.go

	demo.go:5:8: should omit type string from declaration of var tt; it will be inferred from the right-hand side
	demo.go:8:2: don't use ALL_CAPS in Go names; use CamelCase
	demo.go:8:2: exported const DEMO_TT should have comment (or a comment on this block) or be unexported

以上是在Terminal中的效果，怎么样在IntelliJ IDEA中使用golint呢？

#### IntelliJ IDEA golint demo ####

IDE工具和Golang开发环境的配置，可以参考上一篇文章，这里不再敖述。

golang-idea-plugin 已经有issue介绍了golint 在插件上的讨论，[golang-idea-plugin issue](https://github.com/go-lang-plugin-org/go-lang-idea-plugin/pull/1554)、[golang-idea-plugin issue](https://github.com/go-lang-plugin-org/go-lang-idea-plugin/issues/342)，内部还有一个+1引起作者的不满。

下面我就把操作配置列一下：

	1. 点击Edit Configuration, 添加一个 `Go Application`，设置Before launch: External tool
	2. 点击+，选择`Run External tool`,再点击+，create tool
	3. 设置好Name: golint, 选择运行的Progam: $GOPATH/bin/golint,设置Parameters: ., 设置Working directory: $FileDir$, 勾选上显示信息在console

然后重新运行demo.go，就可以看到Run结果窗口中，会多一个golint, 切换过去同样可以看到golint的检查结果。

![golint_pic]()

（嗨，大家好！欢迎关注我的公众号“茶歇驿站”，微信号“tech_tea”，原创不易，还请大家多多支持和爱护，欢迎大家分享转载，但转载时请注明出处~）
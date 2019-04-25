---
title: 'Go 语言中 `init()` 函数的初始化顺序'
keywords: golang, go, init, order, func
date: 2019-01-03T08:40:00+08:00
lastmod: 2019-01-03T08:40:00+08:00
draft: false
description: 'Go 语言中 `init()` 函数的初始化顺序'
categories: [golang]
tags: [golang, go, init, order, func]
comments: true
author: mai
---

## 背景介绍

如果你的项目中有一些需要初始化，而这些初始化又是通过 `init()` 来执行的，但是 `init()` 里面有一些相互依赖，你如何保证你的执行是可行的呢？

### 可能出现的问题

你在 `init()` 使用时，可能会有一些值是需要提前初始化的，否则会出现 nil 报错的问题。

### init 初始化的规则是怎样的呢？

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/init.png)

### 怎么解决呢？

可以使用 `_ "github.com/xxx/xxx"` 引入包，但是不使用来解决

## 附翻译

init相关注意如下：

- 一个包可以出线多个init函数,一个源文件也可以包含多个init函数(Multiple such functions may be defined, even within a single source file. )。
- init函数在代码中不能被显示调用、不能被引用（赋值给函数变量），否则出现编译错误（The init identifier is not declared and thus init functions cannot be referred to from anywhere in a program.
）。
- 如果当前包包含多个依赖包(import),则先初始化依赖包（If a package has imports, the imported packages are initialized before initializing the package itself. ）。
- 如果当前包有多个init函数，首先按照源文件名的字典序从前往后执行，若一个文件中出现多个init，则按照出现顺序从前往后执行（initialized by assigning initial values to all its package-level variables followed by calling all init functions in the order they appear in the source, possibly in multiple files, as presented to the compiler.）。
- 一个包被引用多次，如 A import B,C import B,A import C,B被引用多次，但B包只会初始化一次（ If multiple packages import a package, the imported package will be initialized only once. ）。
- 引入包，不可出现死循坏。即A import B,B import A,这种情况编译失败（ The importing of packages, by construction, guarantees that there can be no cyclic initialization dependencies.
）。
- 包级别的变量初始化、init函数的执行，这两个操作会在goruntine 自己调用，且顺序调用，一次一个包（Package initialization—variable initialization and the invocation of init functions—happens in a single goroutine, sequentially, one package at a time.）。
- 一个init函数里可能会启动其它goroutine,即在初始化的同时启动新的goroutine。然而，初始化依旧是顺序的，即只有上一个init执行完毕，下一个才会开始（ An init function may launch other goroutines, which can run concurrently with the initialization code. However, initialization always sequences the init functions: it will not invoke the next one until the previous one has returned.）。


## 参考资料

1. [go spec Package_initialization](https://golang.org/ref/spec#Package_initialization)
>[[译]Go的初始化及运行（Program initialization and execution））](http://andremouche.github.io/golang/go-init.html)
2. [When is the init() function run?](https://stackoverflow.com/questions/24790175/when-is-the-init-function-run)
3. [The init function](https://golang.org/doc/effective_go.html#init)
4. [init functions in Go](https://medium.com/golangspec/init-functions-in-go-eac191b3860a)
5. [go语言的初始化顺序，包，变量，init](https://studygolang.com/articles/6464) - 这一篇文章写的很不错。
6. [The Go init Function](https://tutorialedge.net/golang/the-go-init-function/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

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

## 参考资料

1. [go spec Package_initialization](https://golang.org/ref/spec#Package_initialization)
2. [When is the init() function run?](https://stackoverflow.com/questions/24790175/when-is-the-init-function-run)
3. [The init function](https://golang.org/doc/effective_go.html#init)
4. [init functions in Go](https://medium.com/golangspec/init-functions-in-go-eac191b3860a)
5. [go语言的初始化顺序，包，变量，init](https://studygolang.com/articles/6464) - 这一篇文章写的很不错。
6. [The Go init Function](https://tutorialedge.net/golang/the-go-init-function/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

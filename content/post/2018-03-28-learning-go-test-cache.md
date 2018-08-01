---
layout: post
title: '了解 Go 语言新版中的缓存处理'
keywords: Golang, test, go cache
date: 2018-03-28 06:00:00
description: '了解 Go 语言新版中的缓存处理'
categories: [Golang]
tags: [Golang, test, go cache]
comments: true
author: mai
---

    这篇文章是我对 Go test 和编译时的 cache 的学习小总结。

----

## 介绍

我相信大家在执行 `go test ...` 的时候，都看到过 (cached) 字样吧。

## 测试

要禁用测试缓存，请使用可缓存标志以外的任何测试标志或参数。

指定 `-count=1` 不用缓存执行。
`go test -v -count=1 workshop_test.go workshop.go`

## 参考资料

1. https://github.com/golang/go/issues/22593
2. https://github.com/golang/go/issues/22583
3. https://golang.org/doc/go1.10 (search cache)
4. https://stackoverflow.com/questions/48882691/force-retesting-or-disable-test-caching
5. https://golang.org/cmd/go/#hdr-Testing_flags
6. https://groups.google.com/forum/#!topic/golang-dev/qfa3mHN4ZPA

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

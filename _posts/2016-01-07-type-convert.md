---
layout: post
title: 'Golang开发之类型转换'
keywords: Golang, 类型转换
date: 2016-01-07 09:00
description: 'Golang 类型转换'
categories: [dev, golang]
tags: [类型, 转换, Golang]
comments: true
group: archive
icon: file-o
---

相信大家对于开发过程中的类型转换都不陌生吧，今天主要讲一下不同语言的类型转换，主要是Java，Ruby，Golang。

<!-- more -->

常见的类型转换，应该是 string（字符串） 转换成 int（整型），或者 int （整型）转换成 string (字符串)。

Ruby

	"123".to_i
	123.to_s

Golang

	i, err := strconv.Atoi("123")
	s := strconv.Itoa(123)

Java

	int i = Integer.parseInt("123")
	String s = Integer.toString(123)

以上都很简单，更深的用法，我也不再多说了，比方说int32 int64等等。

接下来重点把在实际开发中遇到的一个问题讲一下，

Golang

`
	var temp int64 = 5201314
	fmt.Printf("string=%s", string(temp))
`

我们的初衷是想得到 `string=5201314`，实际得到的结果是 `string=�`

demo改为

`
	var temp int64 = 97
	fmt.Printf("string=%s", string(temp))
`

得到的结果是 `string=a`，相信大家应该知道string的用法了吧。

[原因参见](https://golang.org/ref/spec#String_types)

在Golang语言中，有几个需要大家注意的，type assertion
[Assignability](https://golang.org/ref/spec#Assignability)

[golang: 类型转换和类型断言](http://my.oschina.net/goal/blog/194308)

上面文中，重点提一下Comma-ok断言

### Comma-ok断言 ###

>Comma-ok断言的语法是：`value, ok := element.(T)`。element必须是接口类型的变量，T是普通类型。如果断言失败，ok为false，否则ok为true并且value为变量的值

Comma-ok断言还支持另一种简化使用的方式：`value:=element.(T)`，但是不推荐这样做，因为一旦element.(T)断言失败，则会产生运行时错误。

所以，大家在字符串和数字相互转换时要注意正确的用法。
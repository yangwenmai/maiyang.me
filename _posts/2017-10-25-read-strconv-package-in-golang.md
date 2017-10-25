---
layout: post
title: 'Golang strconv 包源码剖析'
keywords: go, golang, source, strconv, float
date: 2017-10-25 23:50
description: 'Go 源码分析之 strconv ，主要是对于 float 的处理： ParseFloat'
categories: [go]
tags: [go, strconv, float]
comments: true
group: archive
icon: file-o
---

    本文是对 Go strconv 包部分源码剖析，我自己收获很多，希望我这篇博文让你也能有收获。

----

## 准备工作 ##

*基本工作*

- Mac OSX
- VSCode
- go_1.9.1

## 阅读源码方法 ##

1. 选定要阅读的源码包 `strconv`
2. 从上往下顺序阅读，见下图
3. 从可导出函数到非导出函数（根据逻辑代码来跳转）
4. 有需要时也要读 `_test.go`

<!-- more -->
----

## 源码清单 ##

![strconv_package](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv.png)

## 1. atob.go ##

![strconv_package](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atob.png)

`atob.go` 的代码真简单。

源码剖析：

**ParseBool**

>使用 switch 来进行判断转换 `true/false` 。

>可转换为 bool 值 `true/false`的有哪些？

>支持：0,1,true,false,t,f,T,F,True,False,TRUE,FALSE，不支持就返回 "invalid syntax"。

**FormatBool**

>使用 if 直接判断，直接 `return true/false` 。

**AppendBool**

>在指定的字符后添加 bool 值。

----

## 2. atof.go ##

![atof.go](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atof.png)

`atof.go` 一共有 539 行代码，却只有一个可导出函数 `func ParseFloat(s string, bitSize int) (float64, error)`，可想而知，代码逻辑应该不简单。

**- ParseFloat**

`func ParseFloat(s string, bitSize int) (float64, error)` 把字符串按照指定的位数转换成 float64 。

> 32 位单独处理，其他都当做 64 位来处理，32 位和 64 位的处理流程和方法基本上完全一样，只是对应的类型不同而已。

接下来直接来看代码：
![重点代码](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atof_atof32.png)

源码剖析：

1. 校验给定的字符串是否为特殊值（空，正无穷，负无穷，NaN）
2. optimize 用于优化处理科学计数法
3. 字符串转换成 `decimal` 类型
4. 由 `decimal` 类型转换成float64

----

## 3. atoi.go ##

**ParseUint**

`func ParseUint(s string, base int, bitSize int) (uint64, error)` 解析字符串为指定进制和位数的正整型。

> 1.通过 switch 来判断或处理 `ParseUint` 支持的 base 进制问题（支持从 2 到 36 进制（10+26个字母））；

![switch](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atoi_parseuint32.png)

> 2.cutoff （非常关键，非常重要）：cutoff*base > maxUint64 的最小的值（意思就是 `cutoff>maxUint64/base` ==> `cutoff = maxUint64/base+1`）,通常情况是使用编译时常量(`const maxUint64 = (1<<64 - 1)`)。

![cutoff](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atoi_cutoff.png)

> 3.判断单个字符对应的 byte 值是否溢出。

![cutoff](http://oqos7hrvp.bkt.clouddn.com/blog/go_1.9.1_strconv_atoi_exception.png)

源码剖析：

- for 循环中， n 经过 （`n*=uint64(base)`）变化后， 如果比隔断的最小值还大的话就会溢出。
- 如果在解析了字符后，`n1 := n + uint64(v)`，如果 n1 < n 则表示有溢出，因为有可能 n 在上一次循环中已经达到了可以支持的最大值，再＋一个数值就会溢出。
- goto 用法，不需要单独定义一个函数，也不需要每个地方都调用一长串 return 内容。

## 结论：干货 ##

1. 阅读源码（特别是 Go 标准包）非常有收获：小技巧和逻辑处理；
2. 每一个注释你都必须要认真仔细的去分析；

未完待续...

## 参考资料 ##

1. https://golang.org/pkg/strconv/

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

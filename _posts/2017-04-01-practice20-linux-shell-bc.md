---
layout: post
title: 'Linux Shell 算术运算 bc'
keywords: 
date: 2017-04-01 23:39
description: ''
categories: Linux
tags: [学习]
comments: true
group: archive
icon: file-o
---

	本文耗时60分钟，阅读需要5分钟。

<!--more-->

bc是一种任意精度的计算语言，注意是一种语言。它提供了一些语法结构，比如条件判断、循环等，可以说是很强大的。还用来进行进制转换。

	ibase：比如ibase=8，表示你输入的数是8进制。
	scale：小数保留位数，默认保留0位。

ibase，obase 用于进制转换，ibase是输入的进制，obase是输出的进制，默认是十进制；

有两种运行方式：

1. 交互模式：在shell命令行直接输入bc及能进入bc语言的交互模式。
2. 非交互模式：与echo一起使用。


例子：

[mai]# echo "2.5*3.4" |bc
8.5
[mai]# echo "5/3; 5/3.1" |bc
1
1
[mai]# echo "scale=3; 5/3" |bc
1.666
[mai]# echo "ibase=10;obase=2; 4*6"|bc
11000
[mai]# echo "ibase=2; 110*101; obase=10" |bc
30
[mai]# echo "ibase=2; 11110; obase=2" |bc
30

### 总结 ###

1. Linux 很强大，命令很多。
2. shell 脚本也有非常多强大的命令。

----

### 拓展 ###

1. http://www.cnblogs.com/snowsolf/p/3325235.html
2. http://evanlinux.blog.51cto.com/7247558/1376534

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)

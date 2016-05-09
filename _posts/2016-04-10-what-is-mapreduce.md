---
layout: post
title: '什么是MapReduce'
keywords: map, reduce, MapReduce, Hadoop
date: 2016-04-10 11:34
description: '什么是MapReduce'
categories: [data]
tags: [data]
comments: true
group: archive
icon: file-o
---

作为程序员的我们，肯定看到过“MapReduce”吧，那么什么是MapReduce呢？

我简单介绍一下：

<!-- more -->

### 引子 ###

海量数据的处理是最大的难题，即便是现在计算机硬件日新月异，但个人计算机运算能力还是很有限的。

### MapReduce 分布式计算、云计算 ###

MapReduce是Google提出的一个软件架构，用于大规模数据集（大于1TB）的并行运算。主要思想来源于函数式编程。

从词上理解，我们就知道MapReduce就分为两个步骤：一个Map，一个Reduce。

Map是什么？中文直译就是映射，Map就是把一个输入映射为一组全新的数据，而不去改变原始数据。Reduce，直译就是化简，就是把通过Map得到的一组数据经过某些方法归一成输出值。

简单理解，就是：Map是一个“分”的过程，它把海量数据分割成若干小块以分给若干处理器去处理，而Reduce是一个“合”的过程，它把各台处理器处理的结果进行汇总，然后操作成一个最终结果。

一个典型的MapReduce计算往往由几千台机器组成、处理以TB计算的数据。

例子：

1. 计算一个大的文档集合中每个单词出现的次数
2. 计算URL访问频率：Map函数处理日志中web页面请求的记录，然后输出(URL,1)。Reduce函数把相同URL的value值都累加起来，产生(URL,记录总数)结果。

MapReduce最成功的应用就是重写了Google网络搜索服务所使用到的index系统。

### Hadoop ###

Hadoop是根据Google公司发表的MapReduce和Google文件系统的论文自行实现而成。

### 延伸阅读 ###

1. [MapReduce Wiki](https://zh.wikipedia.org/wiki/MapReduce)
2. [MapReduce 论文](http://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf)
3. [MapReduce 论文(中文)](http://blog.bizcloudsoft.com/wp-content/uploads/Google-MapReduce%E4%B8%AD%E6%96%87%E7%89%88_1.0.pdf)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)


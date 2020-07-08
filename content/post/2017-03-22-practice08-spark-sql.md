---
layout: post
title: '习惯养成记之08-图解spark'
keywords: 习惯, 时间管理, spark, spark sql, 运行架构
date: 2017-03-22 06:32:00
description: '习惯养成记之08'
categories: [manage]
tags: [习惯]
comments: true
group: archive
icon: file-o
---

昨天是习惯养成记的第七天，也是开始习惯养成打卡的第9天。

<!--more-->

下面是一些笔记：

1. spark 运行架构（文中详细介绍了本地运行模式，伪分布运行模式，独立运行模式，YARN运行模式，Mesos运行模式，）

	- Spark 应用程序一般有三部分，包括SparkContext、ClusterManager和Executor。
	- SparkContext用于负责和ClusterManager通信，进行资源的申请、任务的分配和监控等，负责作业执行的全生命周期管理。
	- ClusterManager提供了资源的分配和管理，在不同的运行模式下所担任的角色有所不同。

2. Spark SQL（核心就是DataFrame）

	- Spark SQL，是一个用于处理结构化数据的 Spark 组件，强调的是“结构化数据”，而非“SQL”
	- Spark SQL 对 SQL 语句的处理和关系型数据库采用的方式类似，首先会将 SQL 语句进行解析形成一个 Tree，然后使用 Rule 对 Tree 先进性绑定、优化等处理过程，通过模式匹配对不同类型的节点采用不同的操作。
	- Spark SQL 由Core、Catalyst、Hive和Hive-ThriftServer 4个部分组成。

###总结###

1. 读书不一定细读就好（昨天早上的阅读效率很高，主要原因是我昨天读的速度比以往都快，下地铁了之后还想继续阅读）。
2. 针对不同的文章类型和章节，应该采取不同的阅读方式。

### 延伸阅读 ###

1. [如何在超忙工作之余年读书180本？]
2. [作为一个开源软件的作者是一种什么样的感受？]

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

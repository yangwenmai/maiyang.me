---
layout: post
title: '习惯养成记之09-图解spark'
keywords: 习惯, 时间管理, spark, spark sql, spark streaming
date: 2017-03-23 06:45
description: '习惯养成记之09'
categories: [习惯]
tags: [习惯]
comments: true
group: archive
icon: file-o
---

昨天是习惯养成记的第八天，也是开始习惯养成打卡的第10天。

<!-- more -->

Spark SQL 和 Spark Streaming倒还能看的懂一点点，Spark MLlib则有点吃力了，毕竟之前没有接触过，一点认知都没有，所以我是略读。

下面是一些笔记：

1. Spark SQL（核心就是DataFrame）

	- 主要是Hive-Console，SQLConsole的使用介绍。
	- 读取JSON格式数据，Parquet格式数据。
	- 实战：销售数据分类、网店销售数据统计。

2. Spark Streaming（Discretized Stream，简称:DStream）
	
	- DStream输入源
	- 流处理引擎
	- 接收机存储流数据

3. Spark MLlib

	- Spark 机器学习库，它的目标是让机器学习更加容易和可伸缩性。
	- MLBase分为：MLlib、MLI、ML Optimizer 和 MLRuntime。
	- MLlib 提供了常用机器学习算法的实现，包括分类、回归、聚集、协同过滤和降维等。
	- MLlib 包括两部分：底层基础和算法库。
	
	- Spark MLlib 算法分类：
		- 二元分类（线性支持向量机、逻辑回归、决策树、随机森林、梯度提升决策树、朴素贝叶斯）
		- 多类分类（逻辑回归、决策树、随机森林、朴素贝叶斯）
		- 回归（线性最小二乘法、Lasso、岭回归、决策树、随机森林、梯度提升决策树、保序回归）

###总结###

1. 遇到自己毫无认知，技术门槛很高的知识，可采用略读。
2. 对于技术门槛高的，在后续专项深入学习。
3. 纸质阅读，不太适合地铁上看。纸质书拿起来不方便，特别是比较大比较重的。做笔记也不太方便。

### 延伸阅读 ###

Andrew NG 百度首席科学家，昨天宣布离职，即将开始自己新的事业。在微信朋友圈以及各大技术社区刷爆了。

为什么会成为这么大的影响力？
我认为主要是两方面：

1. 吴恩达是当前人工智能及机器学习领域顶尖的人物。
2. 他是从百度离职的。

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)

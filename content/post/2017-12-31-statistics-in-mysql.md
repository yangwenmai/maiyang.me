---
layout: post
title: '在MySQL PROCESSLIST中的 statistics 是什么？'
keywords: MySQL
date: 2017-12-30 12:00:00
description: '本文是线上MySQL数据库问题的排查总结。'
categories: [MySQL]
tags: [MySQL]
comments: true
author: mai
---

    本文是线上MySQL数据库问题的排查总结，希望能够对大家有所帮助。

----

statistics

线上服务出现大量的服务告警，怀疑是 MySQL 数据库的问题，查看监控发现有大量SQL慢查询，查询processlist，发现很多状态是 statistics。

processlist里面有好几个长时间处于 statistics 状态的线程，表示正在计算统计数据，以制定一个查询执行计划。 如果一个线程处于这种状态很长一段时间，可能是磁盘IO性能很差，或者磁盘在执行其他工作。

<!--more-->

## 参考资料 ##

1. 没有参考资料；

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

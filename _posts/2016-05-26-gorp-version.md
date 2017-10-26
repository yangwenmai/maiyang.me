---
layout: post
title: '乐观锁'
keywords: version, mysql, golang
date: 2016-05-26 20:00
description: '结合gorp的实现，分析乐观锁'
categories: 技术
tags: [version, mysql, golang]
comments: true
group: archive
icon: file-o
---



<!--more-->

## 乐观锁 ##
在关系数据库管理系统里，乐观并发控制，又名“乐观锁”，Optimistic Concurrency Control，缩写“OCC”，是一种并发控制的方法。
不要把乐观并发控制和悲观并发控制狭义的理解为DBMS中的概念，在memcache、hibernate、tair等都有类似的概念，不要把他们和数据中提供的锁机制（行锁、表锁、排他锁、共享锁）混为一谈。
![乐观锁提交过程](http://dl.iteye.com/upload/picture/pic/125402/22a9518f-e355-315f-8d66-d91af4fda723.jpg)
## 悲观锁 ##
在关系数据库管理系统里，悲观并发控制（又名“悲观锁”，Pessimistic Concurrency Control，缩写“PCC”）是一种并发控制的方法。











### 延伸阅读 ###

1. [乐观锁](https://zh.wikipedia.org/wiki/%E4%B9%90%E8%A7%82%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6)
2. [悲观锁]()
http://www.hollischuang.com/archives/934
http://www.cnblogs.com/Bob-FD/p/3352216.html

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)


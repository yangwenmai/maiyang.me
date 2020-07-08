---
layout: post
title: 'TiDB 和 MySQL 的索引实践'
keywords: MySQL, index, TiDB
date: 2018-01-06 00:25:00
description: '本文是我在比对 MySQL 和 TiDB 使用索引以及执行计划的一些总结。'
categories: [git]
tags: [Git, Github]
comments: true
author: mai
---

    本文是我在比对 MySQL 和 TiDB 使用索引以及执行计划的一些总结，希望能够给大家带来帮助。

----

## 提前准备 ##

上文 [MySQL 的索引优化实践](http://maiyang.me/2018/01/03/index-in-mysql/) 中，我对 MySQL 的索引优化有了一定的概述，今天再针对 TiDB 的索引进行一些实战。

**pt 表：**

```sql
CREATE TABLE `pt` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` longtext COMMENT '内容',
  `next_at` bigint(20) DEFAULT NULL COMMENT '下次时间',
  `update_at` int(11) NOT NULL COMMENT '更新时间',
  `created_at` int(11) NOT NULL COMMENT '创建时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0未删除 1已删除',
  `invalid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0正常 1作废',
  PRIMARY KEY (`id`),
  KEY `idx_next_at` (`next_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='pt表';
```

MySQL 和 TiDB 的 `pt` 表有 35 万行数据。

MySQL 的执行计划如下：

```sql
explain select * from pt where deleted=0 and invalid=0 and next_at<=15100004 ;
```

结果如图：

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/explain_sql_pic.png)

TiDB 的执行计划结果如图：

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/explain_sql_pic_tidb.png)

从上面的执行计划结果来看，两者的方式是不一样的。

至于到底是什么不一样呢？我猜想是因为他们对于索引的实现是完全不一样的，这个比较复杂，今天就不做阐述了，后面有时间再来探究吧。

<!--more-->

>在 MySQL 中，通过 `explain sql` 之后，再用 `show warnings` 可以查看到 MySQL 最终会执行的 SQL 语句，我们可以基于此创建我们的索引，也可以写我们的业务 SQL 语句了。

但是我在用 TiDB 进行相同的操作的流程之后

```
tidb> show warnings;
Empty set (0.00 sec)
```

按理说，这个两者的结果是一样的，所以带着这样的疑问就去问了 TiDB 团队是否有什么考虑才没有做？

结果原因也很简单：

>没有注意到 explain 之后会有 warning ，所以就没有实现，目前 TiDB 只会在执行的时候产生 warning。

### show warnings 对我们有什么帮助呢？ ###

我们可以基于 warning 的结果优化我们所创建的索引，并且还可以提前预判 SQL 执行效率，避免在线上操作时影响数据库性能。

TiDB 团队还说到，他们现在已经在调研针对用户的 query 语句直接给出索引是否合理的建议，我们期待后续的完善吧。

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

---
layout: post
title: '如何在MySQL里面执行表碎片优化？'
keywords: MySQL, Optimize, ALTER TABLE ENGINE
date: 2017-12-30 12:00
description: '本文给大家介绍当你的表有大量DELETE的时候，产生的表锁片如何清理。'
categories: [MySQL]
tags: [MySQL, Optimize, ALTER TABLE ENGINE]
comments: true
author: mai
---

* content
{:toc}

    本文给大家介绍当你的表有大量DELETE的时候，产生的表锁片如何清理，希望能够对大家有所帮助。

----

当我们在执行了 delete from table_name 之后会有大量的碎片空间占用，那我们应该怎么去释放呢？ 

如果你的 MySQL 存储引擎是 MyISAM ，那么直接执行 optimize table table_name；即可。 

如果你的存储引擎是 InnoDB ，执行 optimize table table_name ，会有可能出现两行结果：
第一行：
`Table does not support optimize, doing recreate + analyze instead`
第二行 `OK`

那到底有没有成功呢？其实是成功释放了表碎片空间的。

但是有提示 `Table 不支持 optimize` 怎么办呢？

其实对于 InnoDB 来说，要释放表锁片空间，我们可以采用 `alter table table_name ENGINE=InnoDB`。

不管是 optimize 还是 alter table 都是会锁表的，我们在操作的时候要特别注意，要选择在表变更/使用的低峰期进行操作，否则会导致大量的锁表。 

解释：`ALTER table table_name` 其实是一个空操作，类似于重建表，可以把旧的缓存以及表的碎片空间都释放掉。 

虽然 `optimize table table_name` 也能够释放表锁片空间，但是我们还是建议使用 `ALTER TABLE table_name ENGINE=InnoDB;`

<!--more-->

## 参考资料 ##

1. 没有参考资料；

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

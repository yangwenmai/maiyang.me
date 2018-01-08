---
layout: post
title: 'MySQL 的索引优化实践'
keywords: MySQL, index, Optimize
date: 2018-01-03 00:25
description: '本文是我在使用 MySQL 过程中遇到的 SQL 查询导致的大量慢查询语句的索引优化实践总结。'
categories: [git]
tags: [Git, Github]
comments: true
author: mai
---

* content
{:toc}

    本文是我在使用 MySQL 过程中遇到的 SQL 查询导致的大量慢查询语句的索引优化实践总结，希望能够给大家带来帮助。

----

>多数情况下，我们知道索引能够提高查询效率，但应该如何建立索引？索引的顺序如何？许多人却只知道大概。其实要理解这些概念并不难，而且索引的原理远没有想象的那么复杂。

## 提前准备 ##

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

假如 `pt` 表有数据量 800 万，查询 SQL 语句及执行计划如下：

```sql
explain SELECT id FROM pt WHERE next_at <= 1514822400 AND deleted=0 AND invalid=0
1  SIMPLE  pt   NULL    ALL idx_next_at NULL    NULL    NULL    7843117 0.00    Using where
```

从上面的 SQL 执行计划可以很明显看出来是用到了索引，但是扫描的数据行有 784 万之多，基本上是全表扫描了，但是其实 SQL 语句本身的查询结果数据只有 3 万多行的。

<!--more-->

## 面对这个问题，我们应该怎么办呢？ ##

首先想到的肯定还是在索引上下功夫。

尝试给 deleted 和 invalid 也加上索引。

```sql
# 注意 pt 表是大表，在执行 ALTER TABLE 的时候会锁表，所以如果你的表是线上业务的话，请选择在业务低峰期执行，避免对线上业务造成大面积影响；
ALTER TABLE `pt` ADD INDEX `idx_query` (`next_at`, `deleted`, `invalid`);
```

执行完成之后，然后再执行 `explain sql`：

```sql
explain SELECT id FROM pt WHERE next_at <= 1514822400 AND deleted=0 AND invalid=0
1  SIMPLE  pt   NULL    range   idx_query   idx_query   13  NULL    3474220 0.01    Using where; Using index
```

从上面的执行计划来看，扫描的数据量相比之前少了一半多，执行时间开销也少了一些。

## 难道 MySQL 索引这么弱？ ##

目标数据只有 3 万，但是却要扫描 347 万！！！我不能接受啊！！！

后面就各种想办法，最终是在 UCloud 的协助分析下，优化了创建索引语句：

```sql
ALTER TABLE `pt` ADD INDEX `idx_query` (`deleted`, `invalid`, `next_at`);
```

执行成功之后，然后再执行 `explain sql`:

```sql
explain SELECT id FROM pt WHERE next_at <= 1514822400 AND deleted=0 AND invalid=0;
1   SIMPLE  push_task   NULL    range   idx_query   idx_query   11  NULL    110448  100.00  Using where; Using index
```

从执行计划中，很明显看到扫描的数据量从之前的 3474220 降为 110448 了，实际查询开销也降下来了。

## 为什么呢？ ##

把 delete 和 invalid 放在前面，next_at 放在后面性能是最好的，原因是因为 MySQL 在查询优化阶段，会强制先按等值查询（比如 deleted=0 AND invalid=0）去检索，然后再按范围查询（next_at<=...）去检索；

对于 `SELECT * FROM pt WHERE next_at<= 1514822400 AND deleted=0 AND invalid=0 limit 1` 会卡住的问题，很可能是因为没有充分利用到索引，所以 MySQL 会先扫描到 36 万多行，然后才去匹配 deleted=0 和 invalid=0 这2个条件的数据，再 limit 1。

怎么得到MySQL建议呢？

>通过 `explain sql` 之后，再用 `show warnings` 可以查看到 MySQL 最终会执行的 SQL 语句。

## 建索引的几个原则 ##

1. 最左前缀匹配原则，非常重要的原则，MySQL 会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配。
2. =和in可以乱序
3. 尽量选择区分度高的列作为索引,区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少，唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0，那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段我们都要求是0.1以上，即平均1条扫描10条记录。
4. 索引列不能参与计算，保持列“干净”，比如from_unixtime(create_time) = ’2014-05-29’就不能使用到索引，原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’);
5. 尽量的扩展索引，不要新建索引。比如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可

## 慢查询优化基本步骤 ##

0. 先运行看看是否真的很慢，注意设置SQL_NO_CACHE
1. where条件单表查，锁定最小返回记录表。这句话的意思是把查询语句的where都应用到表中返回的记录数最小的表开始查起，单表每个字段分别查询，看哪个字段的区分度最高
2. explain 查看执行计划，是否与1预期一致（从锁定记录较少的表开始查询）
3. order by limit 形式的sql语句让排序的表优先查
4. 了解业务方使用场景
5. 加索引时参照建索引的几个原则
6. 观察结果，不符合预期继续从0分析

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

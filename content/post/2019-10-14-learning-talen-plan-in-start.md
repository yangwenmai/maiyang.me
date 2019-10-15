---
title: 'PingCAP Talent Plan 第四期公开课笔记'
keywords: pingcap, tidb, Talent plan, rust, go
date: 2019-10-14T10:00:00+08:00
lastmod: 2019-10-14T10:00:00+08:00
draft: false
description: 'PingCAP Talent Plan 第四期公开课笔记'
categories: [tidb]
tags: [pingcap, tidb, Talent plan, rust, go]
comments: true
author: mai
---

## 广州 Talent Plan 公开课

很感谢 PingCAP 能将如此优秀的课程以公开课的形式开放给社区，不仅让更多的人了解，也让我从另一个维度了解到了这些优秀开发者们。
>这一群小伙子的能力水平真不错。

### 活动信息

时间：北京时间 | 2019 年 10 月 14 日周一 10:00\~21:00

地点：广州市海珠区暄悦东街 23 号保利中悦广场 3702

活动流程具体安排如下：

9:45 签到

10:00-11:00  TiDB 开源社区现状 by 姚维

13:45 签到

14:00-15:00  Deep Dive into TiDB by 谢海滨
实际上持续到（15：45）

15:00-16:00  Deep Dive into TiKV by 唐刘
实际上持续到（17：20）

19:00-21:00  "Being Rust: A guide for new Rust programmers to become great Rust programmers" by Brian Anderson

远程直播地址：https://pingcap.zoom.us/j/5232255427

## TiDB 开源社区现状 by 姚维

首先是给我们介绍了 TiDB，以及 TiDB 在市场和融资方面的情况，包括 TiKV 加入 CNCF 等。

然后介绍了 TiDB Community ，主要分享了 PingCAP 参与的国内外大会和媒体报道渠道。
![tidb_community|666x499](upload://wW3mJHJOjBbeMRUZJB5BcrmWM9K.jpeg) 

包括国外数据库相关大会：**vldb, fosdem, coscup, rust conf，媒体：hack news，国内大会：Infra meetup，TiDB devcon，hackathon，TechDay**。

TiDB tutorial 包罗万象，数据库生态的各种参与角色都有专门的培训课程体系来保证大家的学习和使用。

- talent plan (for student or for interest tidb)
- pingcap university（for user/devwlopers）
- tidb academy（for dba）

TiDB 开源组织架构，非常专业和完整（**此处应该有架构图**），重点 share 了 maintainer 是社区中的最高权限。
>可以合并代码。

要想深入探索，重点基础知识：数据库、存储、网络等是必不可少的。所以，小伙伴们赶紧补补这些基础吧。

## Deep Dive into TiDB by 谢海滨

分别从以下方面来深入 TiDB ：

1. 概览
2. Query
- query parsing
- query optimization（logic，physical optimizer）
- query exection（root exector，distsql，coprocessor exector）
>其中 query optimization，plan SQL 结果中有 id 列：一棵树，task列：root和cop（推到tikv计算的）

3. Rule example：Outer join Elimination
4. 统计：范围查询主要是用直方图📊（equi-depth histogram），CM-Sketch
5. query execution：chunk
6. 事务：隔离级别，snapshot，timestamp（occ）
>[分布式事务：Google Percolator 论文](https://ai.google/research/pubs/pub36726.pdf)
7. [Online ,asynchronous schema change in f1 论文](https://research.google.com/pubs/archive/41376.pdf)

TiDB 学习视频（B站可点击 https://space.bilibili.com/326749661 搜索 TiDB）：

- [TiDB 源码概览](https://github.com/developer-learning/night-reading-go/issues/401) [YouTube](https://youtu.be/mK6BOquvQhE)；
- [执行引擎](https://github.com/developer-learning/night-reading-go/issues/404) [YouTube](https://youtu.be/Rcrm4w7sqbM)；
- [优化器](https://github.com/developer-learning/night-reading-go/issues/413) [YouTube](https://youtu.be/4mgx8bq_fcQ)；
- [事务](https://github.com/developer-learning/night-reading-go/issues/421) [YouTube](https://youtu.be/A46VE3aUTKo)；
- [failpoint 设计与实现](https://github.com/developer-learning/night-reading-go/issues/372) [YouTube](https://youtu.be/ke7zzny9dxU)

### TiDB 重要的技术分享资料

1. [三篇文章了解 TiDB 技术内幕——说计算](https://zhuanlan.zhihu.com/p/27108657)
2. [三篇文章了解 TiDB 技术内幕——说存储](https://zhuanlan.zhihu.com/p/26967545)
3. [三篇文章了解 TiDB 技术内幕 —— 谈调度](https://zhuanlan.zhihu.com/p/27275483)


## Deep Dive into TiKV by 唐刘

1. Store Data，data consistency，acid，管理集群
2. storage：B+树（MySQL InnoDB），LSM Tree（强烈推荐：[LSM Tree 综述(paper)](https://www.cs.umb.edu/~poneil/lsmtree.pdf), [ 【PingCAP Infra Meetup】No.93 A Study of LSM-Tree](https://www.bilibili.com/video/av47654581/)）
3. CAP（TiDB 是一个 CP ，HA 系统）
4. Data Replication
![](https://upload-images.jianshu.io/upload_images/2224-c27d02389cfb7a12.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)
*图片来源于网络*
5. sacle out（config change）
6. isolation levels：anomalies：dirty write，dirty read，fuzzy read，phantom 幻读，lost update，cursor lost，read skew（a5a），write skew（a5b）
![](http://loopjump.com/wp-content/uploads/2015/06/full_isolation.png)

7. percolator：data、lock、wite

## "Being Rust: A guide for new Rust programmers to become great Rust programmers" by Brian Anderson

![rust_beginner|666x500](upload://tglz3vb8K0PXRqaiOPEV4Kk6GZA.jpeg) 

分享的 PPT [Intro to Rust talk](https://github.com/brson/being-rust)

全程英文，要想学好 Rust，你de英文比较好的话，也算是有一个不错的起点了。

Brian 还有非常多，非常好的 Rust 教程和项目。

- [PingCAP training courses](https://github.com/pingcap/talent-plan)
- [rust-anthology](https://github.com/brson/rust-anthology)
- [basic-http-server](https://github.com/brson/basic-http-server)
- [rust-cookbook](https://rust-lang-nursery.github.io/rust-cookbook/)
- [Slides about the Rust in the blockchain industry](https://github.com/brson/rust-is-for-blockchain)
- [Rust api-guidelines](https://rust-lang-nursery.github.io/api-guidelines/)

## 参考资料

0. [TiDB by dbdb.io](https://dbdb.io/db/tidb)
1. [Percolator 论文笔记](http://int64.me/2018/Percolator%20%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0.html)
2. [【Paper 笔记】The Log structured Merge-Tree（LSM-Tree）](https://kernelmaker.github.io/lsm-tree)
3. [自动调优 RocksDB](https://www.jianshu.com/p/0fdeed70b36a)
4. [浅谈数据库隔离级别](http://loopjump.com/db_isolation_level/)
5. [从零开始写分布式数据库](https://github.com/ngaut/builddatabase)
6. [Awesome materials about database development.](https://github.com/huachaohuang/awesome-dbdev)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

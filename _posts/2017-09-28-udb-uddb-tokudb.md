---
layout: post
title: 'UDB、UDDB 以及 TokuDB 的使用分析总结'
keywords: UDB, UDDB, InnoDB, TokuDB
date: 2017-09-24 08:10
description: '本文是对 UDB、UDDB（Percona、TokuDB） 的使用过程中的问题总结。
'
categories: [数据库]
tags: [MySQL, UDB, UDDB, Percona, TokuDB]
comments: true
group: archive
icon: file-o
---

* content
{:toc}

	本文是我对 UDB, UDDB, TokuDB 的使用分析，以及一些问题总结，希望可以帮助到大家。

----

*[TokuDB](https://www.percona.com/software/mysql-database/percona-tokudb) 非常不错，你值得拥有。*

----

## 自建数据库和云端数据库 ##

几年前，一般企业可能都是自建数据库吧（至少得配一个 DBA），随着云服务（AWS, AliYun, UCloud）的蓬勃发展，云主机和云数据库都是他们的标配。我们用上云数据库也就顺理成章，也算是明智的选择吧。

不然常规的各种维护都会让你疲于奔命，哪还有人力去做产品，做迭代啊。

一般自建的数据库都存在这么几个问题：

1. 单点
2. 物理机故障
3. 数据库故障
4. 维护成本不低

鉴于我个人经验，我对 AWS,Aliyun 的产品没有怎么广泛使用，所以也没有什么发言权，今天就只说说我们正在使用的吧。

<!--more-->

## 云数据库MySQL UDB ##

>云数据库 UDB-MySQL 是基于成熟云计算技术的高可用、高性能的数据库服务，完全兼容 MySQL 5.1、MySQL 5.5、MySQL 5.6、Percona 5.5、Percona 5.6、Percona 5.7协议；除支持双主热备架构及高性能 SSD 磁盘外，还提供灾备、备份、数据回档、监控、数据库审计等全套解决方案。

更多介绍，直接看[文档](https://www.ucloud.cn/site/product/udb.html)吧。

## 分布式数据库 UDDB ##

>分布式数据库 UDDB（UCloud Distributed DataBase）是一种稳定、可靠、容量和服务能力可弹性伸缩的分布式关系型数据库服务。UDDB 高度兼容 MySQL 协议和语法，支持自动化水平拆分，在线平滑扩缩容，服务能力线性扩展，透明读写分离，具备数据库全生命周期运维管控能力。 

----

UDDB 的容灾，分两块：

  + 一个是存储节点的容灾，容灾方案是直接复用udb的容灾方案，即一主一备；
  + 另一个是上层中间件节点的容灾，这块采用的是多活部署。

UDDB 如果我按uid hash分，初始3个节点，后面我要扩容，可以吗？

  - 可以的。 扩容的时候，会把数据迁移到新的节点。扩容操作是自动进行的，期间不会影响业务访问。

UDB 支持的 TokuDB 与官方的一致吗？

  - UCloud 的 TokuDB 引擎和官方是一致的。
  - 基于 UCloud 平台，在 TokuDB 的基础上可以做更多事情，比如高可用，跨机房容灾， 数据的水平拆分，自动化备份等。

UDDB 存储容量是怎样的？

  - UDDB 存储容量 = 节点数 * 节点容量

UDDB 的中间件规格是否可以动态扩容？

  - 可以动态扩容。

UDDB 怎么使用？

  - 直接当做一个单机去使用就好了。Percona 5.7 支持存储引擎 TokuDB。

注：目前支持的按照时间分区的方式有 date、datetime、timestamp,用 int(11) 字段来做时间分区，目前还不行，MySQL 标准语法也是不行的。

----

## TokuDB 简介 ##

TokuDB是一个支持事务的“新”引擎，有着出色的数据压缩功能，由美国TokuTek公司(http://www.tokutek.com/) 研发，该公司于2015年4月份被Percona收购。

## TokuDB 引擎有什么优点 ##

出色的数据压缩功能，较低的IOPS消耗，如果您的数据量比较大，强烈建议您使用TokuDB，以节省空间成本，而且有着与InnoDB相当的性能。

TokuDB 适合于写多读少的场景，以前我们都是自建 TokuDB 引擎的 MySQL 数据库的。

## 使用TokuDB引擎有什么注意点 ##

不支持外键(foreign key)功能，如果您的表有外键，切换到TokuDB引擎后，此约束将被忽略!!!

## tokudb 的压缩算法 ##

|压缩算法|特性|
|----|----|
|tokudb_zlib|    压缩比和CPU消耗持中(默认压缩算法)|
|tokudb_lzma|    压缩比高，CPU消耗也高|
|tokudb_quicklz|    压缩比低，CPU消耗低|
|tokudb_uncompressed|无压缩|

>TokuDB 默认压缩算法为 zlib ，建议您不要做修改，因为 zlib 压缩的性价比非常高。

如果一个表创建的时候压缩算法是 tokudb_quicklz，我可以通过 ALERT TABLE 改成其他算法吗？答案是：可以的！

TokuDB 在底层实现上，用 1byte 来标记当前 block 的压缩算法，并持久化到磁盘，当压缩算法改变后，从磁盘读取数据然后解压缩的。

**我们线上的一个业务，使用 TokuDB 引擎，压缩比能够保证在 3：1 左右。**

## 其他（摘自网络） ##

**TokuDB 存储引擎的背景知识**

- TokuDB引擎是有 Tokutek 开发的一个数据库存储引擎，在设计之初便引入了独特的索引算法，在其官网测试的文章中看到 TokuDB 性能比 InnoDB 高出很多。

- MySQL是一个插件式的数据库，在MySQL5.5版本之前MyISAM是MySQL的默认存储引擎，在之后的版本中默认的存储引擎变成了InnoDB。其特点是它支持事务，具有完善的崩溃恢复机制，具体的特点这里不说明，可以自行的寻找资料。这里介绍的TokuDB和InnoDB有很多相似之处：一个高性能，支持事务、MVCC、聚簇索引等。最大的不同在于TokuDB采用了一种叫做Fractal Tree的索引结构，使其在随机写数据的处理上有很大提升。一般来说数据库的索引结构都采用B+Tree或则类似的数据结构，InnoDB也是如此。InnoDB是以主键组织的B+Tree结构，数据按照主键顺序排列。对于顺序的自增主键有很好的性能，但是不适合随机写入，大量的随机I/O会使数据页分裂产生碎片，索引维护开销很多大。而TokuDB的Fractal Tree的索引结构很好的解决了这个问题。

- TokuDB解决随机写入的问题得益于其索引结构，Fractal Tree 和 B-Tree的差别主要在于索引树的内部节点上，B-Tree索引的内部结构只有指向父节点和子节点的指针，而Fractal Tree的内部节点不仅有指向父节点和子节点的指针，还有一块Buffer区。当数据写入时会先落到这个Buffer区上，该区是一个FIFO结构，写是一个顺序的过程，和其他缓冲区一样，满了就一次性刷写数据。所以TokuDB上插入数据基本上变成了一个顺序添加的过程。

- TokuDB另一个特点是压缩性能和低CPU消耗，TokuDB存储引擎默认的块大小是4M，这使其有更好的压缩效率。默认支持压缩功能，不需要配置其他的东西。压缩选项有：TokuDB_Quicklz、TokuDB_Lzma、TokuDB_Zlib，同时也支持非压缩选项。TokuDB_Zlib支持的默认压缩格式。一般压缩都需要消耗更多的CPU。但TukuDB消耗的CPU资源较少。

## 参考资料 ##

1. https://www.google.com/search?client=safari&rls=en&q=tokudb+site:http://mysql.taobao.org/monthly/&ie=UTF-8&oe=UTF-8【Google 地址栏输入：tokudb site:http://mysql.taobao.org/monthly/）】
2. http://dbaplus.cn/news-21-418-1.html
3. https://mariadb.atlassian.net/browse/MDEV-7652
4. http://www.cnblogs.com/zhoujinyi/p/4494472.html

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

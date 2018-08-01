---
layout: post
title: 'UDDB 入坑指南'
keywords: UDDB, UDB, MySQL, Kingshard
date: 2017-12-13 14:36
description: '本文给大家还原一下我们在UDDB入坑的完整指南'
categories: [MySQL]
tags: [UDDB, UDB, MySQL]
comments: true
author: mai
draft: true
---

    本文是我们在使用 UDDB 的过程中的踩过的一些坑，以及一些经验总结，希望能够对大家有所帮助。

----

# UDDB 概述 #

## UDDB 是什么？ ##

[UDDB](https://docs.ucloud.cn/database/uddb/index) 的核心还是一个 MySQL 数据库中间件（类似 kingshard），只是产品本身是基于 UDB 的，而 UDDB 复用了 UDB 的强悍特性（安全、高可用、备份、监控、自动化运维等）。

## UDDB 怎么用？ ##

使用很简单的，只需要按照 UDDB 的产品文档上的 SQL 指南所述，然后用 upartition 语法创建好数据库表，就可以像使用普通表一样使用 UDDB 数据库了， UDDB 的容量是可水平扩展的。

注意：我们在使用的时候是有条件的：查询时， WHERE 子句里面需要带上分区的字段信息，不然查询就是扫描全部的子表了。

## UDDB 有什么好处？ ##

UDDB 只要在初始化时创建好表之后，只需要不断扩展这个表就好了，这样的好处非常多：

- 一个是你可以根据数据量， 逐渐增加节点数。

>比如一开始只需要存3个月的，可以只买3个节点，3个月后，等这3个节点写满，再购买3个新的节点，供后面3个月使用。而不需要一次性购买一年的节点。

- 假如我们的数据只需要存6个月，那么可以把过期的子表给删除掉，然后腾出空间给后面月份的数据使用。

<!--more-->

----

## UDDB 实操过程中的问题 ##

Q1：如果我的表分区是时间分区的或者表分区后续要调整的话，应该如何变更呢？

初始表语句：

```
CREATE TABLE `gmsg` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'ID',
  `gid` bigint(20) NOT NULL COMMENT 'GID',
  `sid` bigint(20) NOT NULL COMMENT 'SID',
  `data` longtext COMMENT 'data',
  `nts` bigint(20) DEFAULT NULL COMMENT '纳秒时间戳',
  PRIMARY KEY (`id`,`gid`)
) ENGINE=TokuDB DEFAULT CHARSET=utf8mb4 COMMENT='消息表'
upartition by range(unix_timestamp(nts)) 
usubpartition by hash(id)
usubpartitions 2
(
upartition m1 values less than (unix_timestamp('2017-02-01')), 
upartition m2 values less than (unix_timestamp('2017-03-01')), 
upartition m3 values less than (unix_timestamp('2017-04-01'))
);
```

以上表分区只能支持到4月1日，所以在此之后我们需要通过 SQL 来更新表分区：

`Alter table gmsg add upartition(upartition m4 values less than (unix_timestamp('2017-05-01')));`

- 对 upartition by range(unix_timestamp(nts)) 解释一下：根据 nts 这个字段做分区。 

由以下的 SQL 语句来分的。
```
(
upartition m1 values less than (unix_timestamp('2017-11-01')), 
upartition m2 values less than (unix_timestamp('2017-12-01')), 
upartition m3 values less than (unix_timestamp('2018-01-01'))
) 
```

- 对 `usubpartition by hash(id) usubpartitions 2` 解释一下：

在月分区的情况下再进行分区：根据 id 又划分为两张子表，hash 只支持一个字段 id。

如果分区指定的是 `upartition d4 values less than (120000000)`，那么超过 120000000 就会被拒绝，数据无法插入。

还有一种情况是如果忘记创建分区，那数据都在一个 UDB 节点上，后面要再加节点，就要非标操作了。

**注意：分区操作一定要规划好。**

备注：这个语法和 mysql 标准的水平分区表语法是完全一样的。只是在 partition 前面加了一个 U 而 MySQL 标准的水平分区表语法，只能在单机上做分区，而 UDDB 是在 MySQL 集群的所有节点上面做分区。

Q2: 新增存储节点，有没有什么影响？

>不会。新增存储节点，不会将老的子表的数据进行迁移，所以不会有任何影响。

Q3：UDDB 的数据节点数有没有限制？

>理论上没有限制，但是目前系统规定是最多 256 个节点。

Q4: 查询性能如何得到保证？

>首先是索引以及查询条件要带上分表字段，另外我们的每个子表记录量最好控制在1000w左右。

Q5: UDDB 一创建好，就显示有 70 多个连接被创建，正常吗？

>有一个连接池（64个+一些管理连接，大概 70 个左右），后面不管多少客户端连接 都是使用 64 个。

Q6: 目前 UDDB 不支持哪些操作呢？

>不支持 explain
不支持 union all(union all 性能不好，建议使用 or)
UDDB 支持 ON DUPLICATE KEY UPDATE

Q7: 另外一个报错

```
INSERT INTO `xxx` (`id1`,`id2`, `gid`,created_at,updated_at)VALUES(999999,29999999,12,1512634733,1512634733) ON DUPLICATE KEY UPDATE `id1`=999999,`id2`=29999999,`gid`=12,`updated_at`=1512634744

routing key in update expression。
```

>在 update 子句里面不能出现用来做分区的字段： `id1=999999,id2=29999999,`，一旦出现， 这个 update 会导致其落到另外一个子表。？为什么会落到另外一个子表呢？？？

改造后的 SQL：

```sql
INSERT INTO `xxx` (`id1`,`id2,`gid`,created_at,updated_at)VALUES(999999,29999999,12,1512634733,1512634733) ON DUPLICATE KEY UPDATE group_id`=12,`updated_at`=1512634744
```

Q8: 不同业务是否建议不要放在同一个 UDDB 上？(
小恩爱案例：ufs和gmsg是否建议放一个UDDB呢)

>放在一起没问题，分开也有分开的好处但是好处也不大。放在一起要解决的问题，是某个表数据量突增，水平扩展如何不影响其他表。

>目前来看，如果第一次分区就合理，后面都不需要非标操作和数据迁移了，直接加节点就可以把新的分区建到新的节点上了。这样 m 表的扩容，对 f 表是没有影响的。

>如果后面需要做数据迁移，我们也可以只迁m，不迁f的。但是如果存储引擎不一样，那就必须使用不同的 UDDB 了。

>UDDB的配置如何选择呢？内存怎么分配？主要是看业务压力怎么样？也就是看最大QPS是多少。

Q9：我新建了一个 Percona 和一个 MySQL 的 UDDB ，一个有 ucloudbackup 账号，一个没有 ucloudbackup 账号呢？

>ucloudbackup 用户的问题，是因为咱们使用的是 MySQL 5.7 。 我们对 MySQL 5.7 的内核做过优化，屏蔽了 ucloudbackup 这个用户，但其实这个用户还是存在的，可以登陆。

Q10: 对于分布式插入问题如何解决？

>multi insert 有一个开关控制，默认是关闭的，主要是因为会有分布式事务的问题。
>但是如果只是 insert 的话，其实是可以把 multi insert 改成 multi replace（如果遇到主键冲突则直接替换），前提是咱们业务没有 delete，update。

例：

```sql
INSERT INTO table_name (id, name, deleted) VALUES(...),(...),(...),(...);
```

应该改为：

```sql
REPLACE INTO table_name (id, name, deleted) VALUES(...),(...),(...),(...);
```

## UDDB 日常运维 ##

- 如何查看 UDDB 分区信息？

>`show create table gmsg`

- 如何查看 UDDB 后端实际的数据库分布呢？

>`show udb_nodes`

- 如何查看 UDDB 磁盘使用情况呢？

>`show data_size`

- UDDB 是否可以做告警监控呢？

>可以到 umonitor 这个产品取设置。

## UDDB bug 记录 ##

bug1: 字段为 xxx_id，如果 xxx_id=-1 查询不到数据

>原因是：xxx_id = -1  是我们对负数取模，没有考虑到。

bug2：使用SequelPro执行表重命名报错

```
An error occurred while retrieving the information for table 'xxx_bak'. Please try again.

MySQL said: Table 'xxxx.xxxx_d1_0000' doesn't exist
```

>原因：重命名的问题是表重命名成功后，没有对应修改路由信息中的表名，导致后面执行：SHOW FULL COLUMNS FROM 出错了。

bug3：UDDB 创建之后，无法使用 SequelPro 创建用户？

报错信息如下：

`An error occurred while trying to get the list of users. Please make sure you have the necessary privileges to perform user management, including access to the mysql.user table.`

>原因：主要是因为对管理工具支持不够好，把这些系统 SQL 加上支持就好了。

bug4: 对 `from` 关键字字段不支持？

>You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'from , group_id , deleted_uid , deleted_content , created_at , updated_at , dele' at line 1

INSERT INTO `xxx` (`id`, `from`, `created_at`, `updated_at`, `deleted`) VALUES ('1', '1','1512635087', '1512635087', '0');

>UDDB 是支持的，这个跟 uddb 和 kingshard 的解析器没啥关系。

>原因：之前在改造代码时，为了支持 insert into t values(1, current_time) 语句，改出来 bug。

## UDDB 数据迁移流程 ##

整个流程是这样的：

1. 在控制台上加udb节点；
2. 通过 `launch trans_data_task`， 把老节点的部分数据，迁移到新的节点；
3. 通过 `show trans_data_task` 或 `show trans_data_task all` 查看迁移进度；

不需要执行表结构更新的，只需要一条迁移命令。

这个流程的本质就是将 DBA 使用数据库中间件时要做的扩容操作给自动化了。

比如，当你在使用 kingshard 时，一开始分8个表，8个子表都在一个mysql上，数据增长后， 这个mysql扛不住8个子表的容量了，此时可以加一个节点， 把4个子表，迁移到新的节点，迁移完成后再修改kingshard配置文件中的路由信息，把后4个子表指向新的节点，我们的launch trans_data_task命令， 只是把这些操作全部给自动化了，同时不影响业务，不停服。

### 具体案例分析 ###

UDDB 时间戳分区（时间类型）之前是只能支持到秒级的，但是我们有需求一需要到纳秒级，所以 UCloud 很快就从秒->毫秒->纳秒了（几行代码就搞定支持了，响应非常迅速）。

时间字段类型是 bigint(20)，而不是timestamp了。

以下是一些分区的案例分析：

例1：

```
UPARTITION BY RANGE(id)
(
UPARTITION d1 VALUES LESS THAN (10000000),
UPARTITION d2 VALUES LESS THAN (20000000)
```

如果我想在d1和d2中间拆分可以吗？

一开始 range 范围划分得大了（比如1000w一个range）， 后面想再变小，是否有办法?

这个得看情况：

- 如果 range 没有产生数据， 那么是可以变小的（通过我们后台的非标操作，直接修改分区信息）。
- 如果 range 产生的数据，那么可以加节点，做数据迁移。比如一开始 1-2000w 都在一个 UDB 节点上，做了二级分区，分成了 2*10 =20份。如果数据量大，可以加新的节点，然后做数据迁移，把20份数据均匀分散到新老节点上，此后再加新的 range 分区时，则可以缩小规模，比如 100w 一个 range。

这个数据迁移是标准操作，可以通过 SQL 命令发起迁移，迁移不会影响业务，稳定性绝对有保证。

例2：

分区1：uid1(按照范围来分),分区2：uid2(hash/10)，但是我uid1的分区可能之前分大了，想分小，这种操作就需要非标操作了

可以把你说的这个问题，分解为两种可能：

1. uid1的分区之前分大了， 但用户插入的数据，只涉及到range的小部分（比如你range是按照1000w来划分的， 但用户插入的uid1，都是在1-500w的范围内，500w以上的uid1还没有出现）。  这种情况下， 通过非标操作，调整分区
2.uid1的分区之前分大了， 且用户插入的数据，涵盖了1-2000w整个区间，导致现有的udb节点装不下。 这个时候， 就需要使用uddb的数据迁移功能了。  

具体的用法： 
1. 增加新的udb节点
2. 把集中在老udb节点上的数据，再均匀打散到新老节点上。

迁移的 SQL 可以自己执行，也可以 UCloud 来执行。

sql的语法类似这样：

```sql
launch trans_data_task(
 action:"add_udb",
 udb_ids:"udb-ysbl42"
);
```

## 其他 ##

- 如何评价kingshard？

>kingshard是非常优秀的，kingshard基本功能其实是很稳定的，一些底层的模块，写的是想当成熟的，但也有不少坑，在group by， order by，集函数上，我们踩了很多，后来干脆全部重写。

其中有关于 UCloud 改造 kingshard 的介绍分享：《快与稳的平衡-公有云分布式数据库研发运营.pdf》

- 为何选择kingshard？

>当时分析了一堆中间件 果断选择了 Go。

- UCloud 对 Go 是什么姿态？

>UCloud 对 Go 是全力投入，现在新的项目基本上都转 Go 了，开发效率高，还特稳定。
并且你会有一个感觉就是：以前写代码都没有什么感觉，现在感觉很舒服，很想写代码，很喜欢去造轮子了，感觉 Go 就是你的一把利器，随时有想法随时都可以帮助你去实现它。

以前用 c++/Java 写代码碰到需求都是要推一推的，现在用 Go 都是毫不犹豫地马上动手。

- UDDB 是用Go开发的吗？

UDDB 的所有代码：中间件和管理系统，都是用 Go 来开发。

- UDDB 现在做到了 CI/CD 吗？

>CI有，测试用例还不够完善，经过一年多，也有好几万条了，都是拿客户测试或线上的 SQL。

- UDDB 是从什么时候开始的？

>UDDB 是从 2016年5月份基于 kingshard 开发，然后在2016年11月份上线，到现在运营1年多了。

- UDB 最大支持多大存储空间？

>非标操作可以扩大到 2TB，正常是 500GB。

- UDDB 跟 TiDB 比较过吗？

>公有云数据库有自己的发展逻辑，跟 TiDB 还不太一样。
UDB 和 UDDB 对齐的目标是 aws 的 aurora，redshift 以及阿里云的 polardb，hybrid MySQL。

>分布式数据库的发展应该分三层：存储分布化（用分布式文件系统代替单机系统），事务引擎分布式化， sql执行分布式化。

>利用公有云，结合最新的硬件（比如高速网卡，原子钟等），可以从存储层开始做起，一步步将存储、事务、sql执行分布式化。

>UDDB 现在做的其实就是最终的步骤：sql 执行分布式化。

>但是我们存储分布式化和事务分布式化现在还没有做。而aws，阿里云已经做了存储分布式化，Google 完成了存储和事务分布式化。

>这三步完成后，公有云的分布式数据库，将带来和传统数据库和传统分布式数据库（比如 TiDB，OceanBase）更好的体验和价值。比如，秒级扩容，按需付费，自动化运维等。

>TiDB 是 UCloud 的一个战略，就是和业内做基础软件的创业公司，进行联盟， 一起把影响力做大，但就做公有云的数据库而言，aws和阿里云才是正确的道路。

- 怎么进行数据库的选择呢？

>首先要考虑的是稳定和 MySQL 完全兼容（公有云数据库是租用模式，如果需要让客户改造业务，那么客户还是会犹豫的）。其次就是看数据库产品对业务场景的支持程度了，比如性价比，免运维，可管理性等。

**稳定 MySQL完全兼容 门槛低  - 公有云数据库的核心三要素。**

----

### Percona 5.7 与 TokuDB ###

**UDDB 是支持 Percona 5.7（Percona 5.7才支持 [TokuDB](https://www.percona.com/software/mysql-database/percona-tokudb) *非常不错，你值得拥有。*） ）**

>实测 UDB 中的 Percona 5.7 TokuDB 和 MySQL 5.7 InnoDB的压缩比在3:1左右。

## 参考资料 ##

1. [MySQL 实战 or、in 与 union all 的查询效率](http://xianglp.iteye.com/blog/869892)
2. [阿里业务研发经典案例：另类解法，分布式一致](https://yq.aliyun.com/articles/280741)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

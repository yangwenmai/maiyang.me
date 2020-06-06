---
title: 'TiDB DevCon 2020 参会回顾笔记'
keywords: TiDB, DevCon, Conf, 参会, 回顾, 笔记, PingCAP
date: 2020-06-06T13:34:00+08:00
lastmod: 2020-06-06T13:34:00+08:00
draft: false
description: 'TiDB DevCon 2020 参会回顾笔记'
categories: [learn]
tags: [TiDB, DevCon, Conf, 参会, 回顾, 笔记, PingCAP]
comments: true
author: mai
---

上午的 topic 总结的几个关键词：**全球化**，**安全**，**生态**，**展望**

收看于 Biliibili 直播：

![tidb_devcon_2020_bilibili|690x73](upload://6qgaLUdoDDBeuw6p4r7ZdDZmNN4.png) 

## 刘奇（CEO） Opening Keynote

正式开始之前，发生了一点点小意外，本地语音接入出现了问题，大概12分钟就恢复了。

4.0 发布

## 唐刘（首席架构师，TiDB 4.0 负责人）（产品内核和功能方面）

性能提升（zhihu 已读集群，单独集群达到 500TB，整个集群容量超过 1PB）

### 生态工具的改进

- tiup
- br(backup/restore)
- CDC: Change Data Capture
- Dashboard - Observability is coming!
  - slow log  → 性能优化
- 排查问题（日志定位）→日志聚合
- key visualizier tool : 实时收集不同区域，不同表的数据读写。

### Feature

1. SQL Plan Management（SPM）：越跑越慢，索引走不上。它可以保证不会用错索引（或者说选择更差的索引）。
2. 10GB Large Transaction:金融行业的夜间跑批操作（TiDB 4.0 以前不支持大事务），4.0 就很好支持了。
3. Sequence: 发号器；
4. Flashback：领导再也不担心运维删库跑路了。（drop 一张表，可以快速将表恢复到原状）
5. Spill data to the disk: 大查询会导致 oom，中间结果集非常大，撑爆 TiDB 内存。保证千万不会挂掉。
6. AutoRandom Key: 之前是 range partition 架构，顺序写入。让写入的时候可以分散压力。
7. Cascading Placement Rules：两地三中心，（sql 就可以进行操作）
8. Add/Drop Primary key:
9. Case-Insensitive Collation: 支持 utf8mb4 utf8mb4_general_ci；
10. Expression Index: 对于函数（表达式）添加索引。

## Hello TiDB 5.0 !!!

预计 2021 2，3月份发布。

主要点：

- 主要会关注稳定性和性能。
- 降低 tidb 成本（混部，SATA 盘）
- 易用（工具易用，迁移数据易用，cloudnative 方面 k8s 化）
- 支持阿里云、UCloud
- 智能调度（弹性调度更加智能），通过dashboard 更好的发现问题

## 刘寅（TiDB as a service: TiDB cloud） DBaaS

到底 tidb cloud 是什么？

tidb 部署：pd → tikv → tidb → tiflash （部署步骤）

生产环境（还需要些什么呢？）我们来看看整个生态链：

es  kibana prometheus grafana   alert manager
lightning  br cdc 
lb: haproxy
LVS

### TiDB Cloud Service 怎么帮大家解决这些问题？

tidb cloud 产品这个月就可以试用。（10分钟完成账号注册，服务的生产级的部署）

现在支持 aws, Google Cloud ，简单的点点鼠标就可以构建一套 TiDB 集群。

支持的国家和地区：美国（🇺🇸）、日本（🇯🇵）、东南亚（新加坡🇸🇬）

### 三类套餐

- t1.tiny,  tidb(2 vCPU, 2GB Mem), tikv(2 vCPU, 4GB Mem，50GB NVMe SSD)
- t1.standard, tidb(2 vCPU, 2GB Mem), tikv(2 vCPU, 4GB Mem，50GB NVMe SSD)
- t1.highcpu,

其他：

- h1.highcpu, tidb(8 vCPU, 16GB Mem), tikv(16 vCPU, 122GB Mem，？ SSD)

### 计算规则

- 按集群及其节点收费。（按照分钟级片段计费）
- 数据传输
- 备份
- 计算周期（按月）

### 云数据库的安全性如何保证？

- VPC 绝对的隔离。（租户之间不共享网络）
  - 快速连接：通过 SQL Shell 连接
- 认证机制：开启 TLS 1.2 特性
- 数据传输会进行加密，TDE 
- 兼容MySQL 体系；

### 自动备份

全备、增备，后续会做到可持续备份(恢复某时点的数据快照)。

### 支付行为

使用第三方支付体系。

### 合规安全

SOC 2 - type 1（WIP）， SOC 2 - type 2( 2021)，GDPR, HIPAA, mtcs? PCI...

### 开源框架

k8s 去管理 k8s（？）

现在注册，可以有14天的免费集群

### Cloud Ecosystem

- Amazon EMR 
- confluent cloud
- snowflake
- S3
- DATADOG

### 云支持服务商

- Azure
- Aliyun
- UCloud

#### 国内的云，为什么要先在国外的云上呢？

因为海外很多用户都是在云上，所以把 TiDB 上云（aws, gcp）也就是很强的诉求了。

# 申砾（工程团队技术VP，海外业务负责人）：海外进展

## TiDB's Scale-out at Global Scope

2015.9 第一个 commit，开源

5年时间过去。。。（从中国走向全球）

## Product for Global

TiDB 4.0 + DBaaS  : Cloud Native 

云的能力帮我们做到了以前做不到的能力。（EC2 按需购买）

VLDB 2020 Accepted : TiDB: A Raft-based HTAP Database

## TiDB Community

- 开发者（slack）
- 每月 sig meeting

两个 CNCF 项目
- TiKV (cncf incubating project)
- Chaos-Mesh(cncf 捐献流程中)

- 开源社区

### Lighthouse

- 手机支付：Paypay zaloPay Top U.S Payment Company
- 在线视频：U-NEXT dailymotion hulu
- 电子商务：Shopee Top Online Travel Agent

NDA 的原因不能透露。

NDA: [https://zh.wikipedia.org/zh-hans/保密协议](https://zh.wikipedia.org/zh-hans/%E4%BF%9D%E5%AF%86%E5%8D%8F%E8%AE%AE)

## PingCAP University 4.0

包含英文版本。

什么时候开始的全球化？（从开源的第一天）

tidb 与闭源的关系，或者怎么看待？

tidb 是有一个有社区，有生态，在大家身边的数据库。（tiup 一分钟就玩起来）

看代码实现，修复自己遇到的各种问题。

一句话回答：TiDB 是大家的数据库。

# 崔秋：Empower Yourself in TiDB Community

聊一聊社区、产品。

>玩在一起，聊在一起，吐槽它，让它更好。

TiDB 是由开发者来创造的。（1017 contributors， 9 commiter 7 reviewer 76 active contributors all over the world）

TiDB 4.0 GA（TiDB+TiKV）

![tidb_devcon_2020_company|689x386](upload://7aXTC8q8IKc6KGJVFKlMSqaT2lK.png) 

### 怎么比较好的从零到一的参与呢？

- 15 Special Interest Group
- 21 Working Group

>进阶路线：Contributor → Active Contributor → Reviewer → Commiter → Maintainer

## Talent Plan

初衷：帮助大学生了解分布式数据库。

学习：680+， 覆盖高校：15+，结业人数：55+

### Talent Plan 解决了什么问题？
 
- 系统地学习分布式系统
- 从零到一实现一个分布式数据库

直接点击前往：https://university.pingcap.com/talent-plan/

TiDB 内核专家=talent plan + tidb 源码解析系列 +？

## 2019年的社区组织

User Group 区分出来 Leader , co-leader , ambassador

连接用户 共建社区（2019.06.23）：
- TUG 2019：北京/上海/杭州/西南/华南
- TUG 2020：金融 TUG/东南亚 TUG/ 北美 TUG（进行中）

更好的服务所有想要参与 tidb 的社区开发者。

### 社区驱动

**TiDB In Action base 4.0**：
- 48 hours
- 102 作者
- 199 pull request

### 帮助  TiDB 4.0 版本测试

- 用户：转转
- 个人：manuel rigger/ wluckdog

https://asktug.com
https://university.pingcap.com/

### TiDB DBAs are wanted

查看 拉勾网(Slides 上一个笔误哦~)

![tidb_devcon_2020_lagou|689x386](upload://6HXocbJ5WSJeya6DFhPMgJvEW3E.png) 

TIDB 服务专家=asktug + pingcap university + ?


# 黄东旭（CTO）：TiDB 下一步技术 Roadmap 展望

本次分享主要是围绕着”玄学“展开。

自称是一个文艺青年，但是想要把复杂、抽象的东西跟艺术和美融合在一起。

## 喜讯

本科毕业的民间科学家提交了 VLDB 2020 .

评价：the paper is going to start a new line of research and products.

![tidb_devcon_2020_vldb2020_paper|689x388](upload://d0S1FtoHuEfOEvTuCP1M4bJvATO.png) 

## 模仿

欧几里得《几何原本》，《三体》

### 几条公理

1. 数据是无穷无尽的，但是人的精力是有限的
2. 几乎任何数据都是有价值的（Google 是不删数据的）
3. 数据的拥有成本终会小于数据本身的价值
4. 摩尔定律失效了（分布式系统一定是未来）
5. 快优于慢

### 推论① - 分布式系统是唯一的出路

oceanbese tpcc 连续两次打破世界纪录

### 推论② - 数据处理栈碎片化局面会结束

### 推论③ - 计算资源的交付将会标准化

- 云是对标准化计算资源集合的提供者（并不是狭隘的公有云、私有化、混合云）
- 云会是计算资源交付唯一渠道
- 云上服务的交付也会标准化

### 推论④ - 业务对于实时性的要求会越来越高

## 未来 workload 会是什么样子？

- HyperScale!
- 数据之间的关联会被充分探索
- Workload 的边界开始越来越模糊
    - oltp 越来越复杂
    - olap 越来越需要实时

## 未来的数据库怎么应对？

### 两个未来基本的数据库设计方向

1. 系统适应 workload，而不是反之
    1. 可变型的数据库，自动根据负载重塑自身（电影：「终结者」）
    2. Self-Tuning ← Level 1
    3. Smart Data Placement ← Level 2
    4. Learned data structure, learned index ← Level 3
2. 基于服务的系统设计
    1. 主流服务 API 逐步标准化
        1. S3
        2. SQL DB(RDS)
        3. Filesystem(EBS, EFS)
        4. KV
    2. 新一代的数据库是否能将这些

调度粒度决定了系统的灵活性

真正核心的是调度器。

kubernetes 会将基础能力标准化。

## 未来

支持全文检索（ES 作为 tidb 的外部索引？）

----

整个直播时长：3小时~

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

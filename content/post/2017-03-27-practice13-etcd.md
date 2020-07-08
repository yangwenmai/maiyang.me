---
layout: post
title: '搭建 etcd 集群'
keywords: etcd 入门，以及搭建 etcd 集群
date: 2017-03-27 08:08:00
description: '搭建 etcd 集群'
categories: [Golang]
tags: [golang]
comments: true
group: archive
icon: file-o
---

	本文耗时100分钟，阅读需要10分钟。

昨天不是习惯养成记的“时间”，不过我已开始打卡第14天了。

<!--more-->

### etcd 是什么 ###

etcd是一个高可用的键值存储系统，主要用于共享配置和服务发现。

etcd是由CoreOS开发并维护的，灵感来自于 ZooKeeper 和 Doozer，它使用Go语言编写，并通过Raft一致性算法处理日志复制以保证强一致性。

etcd 集群的工作原理基于 raft 共识算法 ([The Raft Consensus Algorithm](https://raft.github.io))。

### raft 是什么 ###

Raft 是一个来自 Stanford 的新的一致性算法，适用于分布式系统的日志复制，Raft 通过选举的方式来实现一致性，在 Raft 中，任何一个节点都可能成为 Leader。

Google 的容器集群管理系统 Kubernetes、开源 PaaS 平台 Cloud Foundry 和 CoreOS 的 Fleet 都广泛使用了 etcd。

raft 共识算法的优点在于可以在高效的解决分布式系统中各个节点日志内容一致性问题的同时，也使得集群具备一定的容错能力。即使集群中出现部分节点故障、网络故障等问题，仍可保证其余大多数节点正确的步进。甚至当更多的节点（一般来说超过集群节点总数的一半）出现故障而导致集群不可用时，依然可以保证节点中的数据不会出现错误的结果。

### etcd 集群 ###

集群的大小指集群节点的个数。

根据 etcd 的分布式数据冗余策略，集群节点越多，容错能力越强，同时写性能也会越差。
所以关于集群大小的优化，其实就是容错和写性能的一个平衡。

etcd 推荐使用奇数作为集群节点个数。
因为奇数节点与和其配对的偶数个节点相比(比如 3 节点和 4 节点相比)，容错能力相同，却可以少一个节点。

综合考虑性能和容错能力，etcd 官方文档推荐的 etcd 集群大小是 3, 5, 7。
至于我们怎么选择？是 3, 5 还是 7，你可根据需要的容错能力而定。

| 集群节点个数 | 最大容错 |
| ------------ | -------- |
| 1            | 0        |
| 3            | 1        |
| 4            | 1        |
| 5            | 2        |
| 6            | 2        |
| 7            | 3        |
| 8            | 3        |
| 9            | 4        |

### 搭建 etcd 集群 ###

etcd 集群的搭建有三种方式，包括：static 方式，etcd discovery 方式 和 DNS discovery。

我以 static 方式来进行实际演练。
	
	static 方式是最简单的一种搭建 etcd 的方式。

首先我们要准备 3 台机器，对应的名字和IP如下：

| 名字  | IP         |
| ----- | ---------- |
| node0 | 10.10.0.10 |
| node1 | 10.10.0.11 |
| node2 | 10.10.0.12 |

etcd 启动参数，可以以命令行参数的方式附加，也可以以环境变量的方式。

其中一个节点的 shell 脚本如下，其他两个节点类似，只需要修改对应的 `name`, `ip`, `data-dir` 即可。


	#!/bin/bash
	./bin/etcd --name node0 \
    --listen-peer-urls http://10.10.0.10:2380,http://10.10.0.10:7001 \
    --listen-client-urls http://0.0.0.0:2379 \
    --advertise-client-urls http://10.10.0.10:2379 \
    --initial-advertise-peer-urls http://10.10.0.10:2380 \
    --initial-cluster-token etcd-cluster-1 \
    --initial-cluster node0=http://10.10.0.10:2380,node1=http://10.10.0.11:2380,node2=http://10.10.0.12:2380 \
    --data-dir /data/etcd/data/node0.etcd \
    --initial-cluster-state new \
    >> /data/etcd/log/etcd.log 2>&1 &


注意：在以上三个节点要开放对应的端口2379，2380。

命令：
	
	iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 2379 -j ACCEPT
	iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 2380 -j ACCEPT
	
命令行参数介绍：

| 参数                          | 描述                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| -—name                        | 节点名称                                                                                                              |
| -—listen-peer-urls            | 监听URL，用于与其他节点通讯                                                                                           |
| -—listen-client-urls          |                                                                                                                       |
| —-advertise-client-urls       | 告知客户端url, 也就是服务的url                                                                                        |
| -—initial-advertise-peer-urls | 告知集群其他节点url.                                                                                                  |
| —-initial-cluster-token       | 集群的ID                                                                                                              |
| —-initial-cluster             | 集群中所有节点                                                                                                        |
| -—data-dir                    | 指定节点的数据存储目录，这些数据包括节点ID，集群ID，集群初始化配置，Snapshot文件，若未指定—wal-dir，还会存储WAL文件； |
| -—wal-dir                     | 指定节点的was文件的存储目录，若指定了该参数，wal文件会和其他数据文件分开存储。                                        |

常用配置的参数和它们的解释，方便理解：

--name：方便理解的节点名称，默认为 default，在集群中应该保持唯一，可以使用 hostname
--data-dir：服务运行数据保存的路径，默认为 ${name}.etcd
--snapshot-count：指定有多少事务（transaction）被提交时，触发截取快照保存到磁盘
--heartbeat-interval：leader 多久发送一次心跳到 followers。默认值是 100ms
--eletion-timeout：重新投票的超时时间，如果 follow 在该时间间隔没有收到心跳包，会触发重新投票，默认为 1000 ms
--listen-peer-urls：和同伴通信的地址，比如 http://ip:2380，如果有多个，使用逗号分隔。需要所有节点都能够访问，所以不要使用 localhost！
--listen-client-urls：对外提供服务的地址：比如 http://ip:2379,http://127.0.0.1:2379，客户端会连接到这里和 etcd 交互
--advertise-client-urls：对外公告的该节点客户端监听地址，这个值会告诉集群中其他节点
--initial-advertise-peer-urls：该节点同伴监听地址，这个值会告诉集群中其他节点
--initial-cluster：集群中所有节点的信息，格式为 node1=http://ip1:2380,node2=http://ip2:2380,…。注意：这里的 node1 是节点的 --name 指定的名字；后面的 ip1:2380 是 --initial-advertise-peer-urls 指定的值
--initial-cluster-state：新建集群的时候，这个值为 new；假如已经存在的集群，这个值为 existing
--initial-cluster-token：创建集群的 token，这个值每个集群保持唯一。这样的话，如果你要重新创建集群，即使配置和之前一样，也会再次生成新的集群和节点 uuid；否则会导致多个集群之间的冲突，造成未知的错误


### 检查etcd服务运行状态 ###

curl http://10.10.0.14:2379/v2/members

### etcd 备份 ###

备份脚本：

	#!/bin/bash
	date_time=`date +%Y%m%d`
	./bin/etcdctl backup --data-dir /data/etcd/data/node0.etcd --backup-dir /data/etcd_backup/${date_time}
	find /data/etcd_backup/ -ctime +7 -exec rm -r {} \;


### etcdctl 操作 ###

| etcdctl命令                                      | 描述                                                |
| ------------------------------------------------ | --------------------------------------------------- |
| >etcdctl member list                             | 列出所有节点                                        |
| >etcdctl member update ID http://10.10.0.12:2380 | 更新 ID 的节点的 peerURLs 为：http://10.0.1.10:2380 |
| >etcdctl member remove ID                        | 删除 ID 的节点                                      |
| >etcdctl member add node2 http://10.10.0.13:2380 | 添加新节点                                          |

备注：

1. etcdctl member remove ID 执行完后，目标节点会自动停止服务，并且打印一行日志：`etcd: this member has been permanently removed from the cluster. Exiting.`
如果删除的是 leader 节点，则需要耗费额外的时间重新选举 leader。
2. etcdctl 在注册完新节点后，会返回一段提示，包含3个环境变量。然后在启动新节点的时候，带上这3个环境变量即可。主要是：`--initial-cluster-state`参数为`existing`.

### 总结 ###

1. etcd 至少要搭建3个节点的集群。
2. etcd 集群搭建其实是很简单的，难的是你理解它的工作原理和出现问题后怎么解决。

----

### 拓展 ###

1. [raft 动画演示](http://thesecretlivesofdata.com/raft/)
2. [CoreOS 实战：剖析 etcd](http://www.infoq.com/cn/articles/coreos-analyse-etcd/)
3. [基于 Raft 构建弹性伸缩的存储系统的一些实践](https://mp.weixin.qq.com/s/K9_pOlnhU9FROfEwFP8Mgg)
4. [TiKV 源码解析系列——如何使用 Raft](https://mp.weixin.qq.com/s/DiLnuq4AKQzJiQV19eFZMQ)
5. [搭建 etcd 集群](https://segmentfault.com/a/1190000003852735)
6. [etcd集群部署与遇到的坑](http://www.cnblogs.com/breg/p/5728237.html)
7. [Etcd 架构与实现解析](http://jolestar.com/etcd-architecture/)
8. [etcd 使用入门](http://cizixs.com/2016/08/02/intro-to-etcd)
9. [etcd：从应用场景到实现原理的全方位解读](http://www.infoq.com/cn/articles/etcd-interpretation-application-scenario-implement-principle)
10. [raft 一致性算法](http://cizixs.com/2017/12/04/raft-consensus-algorithm)

**强烈推荐大家关注 PingCAP 公众号。**

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

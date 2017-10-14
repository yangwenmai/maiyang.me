---
layout: post
title: 'TiDB 集群的入门与实战'
keywords: TiDB, TiKV, MySQL, PingCAP
date: 2017-09-15 08:20
description: 'TiDB 集群搭建，问题总结，使用帮助，简单操作介绍。'
categories: [mysql, tidb]
tags: [mysql, tidb, tikv]
comments: true
group: archive
icon: file-o
---

    本文耗时较长，包括实战演练以及经验总结。

----

我很早就接触了 TiDB ，不过一直都是单机版，最近对于大数据存储以及性能、可扩展性方面有所要求，所以对 TiDB 有了更深的投入，首先就是搭建一个测试集群环境，实打实的试用一段时间才知道是什么感觉。

本文是我对搭建 TiDB 集群的入门和实践过程的纪要，希望对大家有所帮助。

本文分为以下几个方面来进行介绍：

- 准备工作
- 安装、配置调试
- 监控
- 总结
- 参考资料

<!-- more -->

## 准备工作 ##

### 服务器配置 ###

官方建议的 TiDB 集群最低配置为 6 台机器。

- 2 个 TiDB 实例，第一台 TiDB 机器同时用作监控机；（与 PD 实例公用）
- 3 个 PD 实例；（公用）
- 3 个 TiKV 实例；（单独使用）

所需服务器的配置要求：

| Name | CPU | 内存 | 磁盘 | 数量 | 总价 |
| ---- | ------- | -------- | -------- |
| tikv | 16核 | 32GB | 500GB SSD | 3 | 2,040.85 * 3|
| tidb/pd | 16核 | 32GB | 200GB SSD | 3 | 1,785.85 * 3|
| monitor | 8核 | 32GB | 120GB SSD | 1 | 1,267.35 * 1|

按照当前云服务商提供的价格预估总费用是：`1267.35+2040.85*3+1785.85*3=12747.45`

monitor 可以部署到 tidb 或者 pd 机器上，但是最好还是分开，因为 monitor 比较耗资源。

TiDB 集群de拓扑如下：

| Name | Host IP | Services |
| ---- | ------- | -------- |
| node1 | 172.16.10.1 | PD1, TiDB1, （monitor） |
| node2 | 172.16.10.2 | PD2, TiDB2 |
| node3 | 172.16.10.3 | PD3 |
| node4 | 172.16.10.4 | TiKV1 |
| node5 | 172.16.10.5 | TiKV2 |
| node6 | 172.16.10.6 | TiKV3 |

如果你是测试的话，PD 和 TiDB 可以只有一台，TiKV 3台，一共至少4台。但即便如此，如果按照官方建议的配置，一个测试环境也要近 8000 元，成本偏大，所以我的实际配置比官方建议要低很多。

| Name | CPU | 内存 | 磁盘 | 数量 | 总价 |
| ---- | ------- | -------- | -------- |
| tikv | 1核 | 1GB | 20GB | 3 | 34 * 3|
| tidb/pd | 1核 | 1GB | 20GB | 3 | 34 * 3|
| monitor | 1核 | 1GB | 20GB | 1 | 34 * 1|

一共 6 台，一个月是 `6*34=204`

如果你的目的就只是想试用/搭建 TiDB 集群（玩一玩，测一测[非性能]），从最终搭建好的集群运行情况来看，以上配置完全没问题的，但是这个集群的运行性能是完全无法得到保障的，请谨慎选择。

## 安装、配置调试 ##

简单概述一下我们要做的准备，[详细内容可参看 ansible 部署文档](https://github.com/pingcap/docs-cn/blob/master/op-guide/ansible-deployment.md)[文档非常的完善，一定点一个赞👍]：
1. 中控机器一台（中控机器也可以直接使用某一台业务机器，需要能访问外网）；
2. 集群机器6台，监控机器1台；
3. 将操作系统、环境依赖按照部署文档要求准备好；

具体的安装过程和脚本，我就不再赘述了，接下来主要是罗列一下我在整个安装部署的过程中遇到的问题（犯过的错误）以及相应的解决办法/解决思路（在这里我要非常感谢 PingCAP 团队的鼎力协助）：

1. 脚本运行报错 `ansible-playbook bootstrap.yml`：

`failed: [ip] (item={u'name': u'net.ipv4.tcp_syncookies', u'value': 0}) => {"failed": true, "item": {"name": "net.ipv4.tcp_syncookies", "value": 0}, "msg": "Failed to reload sysctl: kernel.unknown_nmi_panic = 0\nkernel.sysrq = 1\nfs.file-max = 1000000\nvm.swappiness = 0\nfs.inotify.max_user_watches = 10000000\nnet.core.wmem_max = 327679\nnet.core.rmem_max = 327679\nnet.ipv4.conf.all.send_redirects = 0\nnet.ipv4.conf.default.send_redirects = 0\nnet.ipv4.conf.all.secure_redirects = 0\nnet.ipv4.conf.default.secure_redirects = 0\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.conf.default.accept_redirects = 0\nfs.inotify.max_queued_events = 327679\nkernel.msgmnb = 65536\nkernel.msgmax = 65536\nkernel.shmmax = 68719476736\nkernel.shmall = 4294967296\nnet.ipv4.neigh.default.gc_thresh1 = 2048\nnet.ipv4.neigh.default.gc_thresh2 = 4096\nnet.ipv4.neigh.default.gc_thresh3 = 8192\nnet.ipv6.conf.all.disable_ipv6 = 1\nnet.core.somaxconn = 32768\nnet.ipv4.tcp_syncookies = 0\nsysctl: cannot stat /proc/sys/net/netfilter/nf_conntrack_max: No such file or directory\n"}`

尝试的解决办法：

`Try
net.netfilter.nf_conntrack_max = xxxx
and
net.nf_conntrack_max = xxxxx
instead.
Or maybe ip_conntrack is not loaded. Try:
lsmod |grep conntrack
If this is empty, load it with:
modprobe ip_conntrack`

确认以上模块是否安装（CentOS 7.3 nf_contrack 模块默认是加载的。），以上问题出现的原因是因为 TiDB-Ansible 会添加

```
net.core.somaxconn=32768
vm.swappiness=0
net.ipv4.tcp_syncookies=0
fs.file-max=1000000
```

查看配置信息`cat /etc/sysctl.conf`。

另外：可以用root用户把 `/etc/sysctl.conf` 里的 `net.netfilter.nf_conntrack_max=1000000`  添加 # 号注释，手工执行 `sysctlp -p` 看下是否会报错。（未尝试）

我的解决办法是：重新执行了一次 `ansible-playbook bootstrap.yml` -> 成功了。

如果有报错，可以按照上面的方法试下，先手工确认一下定制的参数有没有报错。

2. 磁盘性能告警

`dd: the write speed of tikv deploy_dir disk is too slow: 9.6MB/s < 15 MB/s`

解决办法：

升级磁盘或者修改 `tidb-ansible/inventory.ini` 改为 `machine_benchmark = True` 改为 `False`，不过上面的提示表明比单块 SAS 盘跑的还低，如果投入使用的话会遇到磁盘性能瓶颈。

3. 执行 `ansible-playbook bootstrap.yml` 报错： `sudo: a password is required`

这里所指的密码是指`ansible_user`的密码。

解决办法：

`ansible-playbook bootstrap.yml --extra-vars "ansible_sudo_pass=tidbpasswd" `
，文档中也提到了另外一个办法就是带上`-k`或`-k -K`参数。

4. 目前 ansible 默认安装配置是包括`spark`的

pre-ga 版本是包括的

5. 部署时提示：Timeout 告警

`fatal: [172.16.0.1]: FAILED! => {"changed": false, "elapsed": 300, "failed": true, "msg": "Timeout when waiting for search string 200 OK in 172.16.0.1:9100"}`

出现这个问题是因为我在部署第一次时，脚本里面配置的监控机器是`172.16.0.3`，后面改为`172.16.0.1`，需要将每个节点都重新再运行一次就好了。

6. Grafana 上 Test-Cluster Overview 上没有数据

出现这个的问题还是因为我在部署的过程中变更了目标监控机器，导致其他节点上报的服务器节点是
`172.16.0.3`，修改对应配置重启即可正常。

可以到 tikv tidb pd 的每个节点上查看运行的配置，`conf/pd.toml` `conf/tidb.toml` `conf/tikv.toml`。

我们可以在监控机器上查看上报数据：http://172.16.0.1:9091/

7. MySQL 客户端连接上进行测试，然后查看监控平台的图表展示

Mac 上推荐使用`Sequel Pro`

8. 因为之前部署了错误的监控节点，导致部署到错误的监控节点的机器在运行一段时间后出现内存告警（95-100%），并且还出现高磁盘读取。

查看相应节点上还运行了`grafana`，`prometheus`，停掉之后内存、磁盘等都正常了。

但是监控节点在运行一段时间后，也出现了内存和磁盘告警（可以装 iostat 或者 iotop 查看是谁在大量读写数据）。

主要问题是 grafana 和 prometheus 比较耗资源。

## 监控 ##

TiDB 集群的所有监控是基于 Prometheus + Pushgateway + Grafana 来构建的，展示监控界面非常美观和直观。

监控地址 http://172.16.0.1:3000/
节点上报状态 http://172.16.0.1:9091/

![overview](http://oqos7hrvp.bkt.clouddn.com/blog/overview.jpg)
![tidb](http://oqos7hrvp.bkt.clouddn.com/blog/tidb.jpg)
![tidb_qps](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_qps.jpg)
![tikv](http://oqos7hrvp.bkt.clouddn.com/blog/tikv.jpg)
![disk_performance](http://oqos7hrvp.bkt.clouddn.com/blog/disk_performance.jpg)

Prometheus 在运行后期挺占资源的，这个在早期搭建的时候要考虑资源以及调优。

## 总结 ##

1. TiKV 集群是高可用的（挂一个节点是不会影响使用的，也不会丢数据的），不过有一个点需要大家注意的是你的集群容量只是 500GB * 数量/3[副本数量]；
2. 扩容很方便，直接加机器或者增大磁盘就好了；

## 参考资料 ##

1. https://github.com/prometheus/prometheus
2. https://github.com/prometheus/pushgateway
3. https://github.com/prometheus/node_exporter
4. https://github.com/pingcap/docs-cn/blob/master/op-guide/ansible-deployment.md
5. https://github.com/pingcap/tidb

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

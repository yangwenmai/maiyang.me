---
title: 'TiDB Hackathon 2018 之天真贝叶斯学习机'
keywords: TiDB, Hackathon, go, rust, beijing, guangzhou, DSG
date: 2018-12-03T09:20:00+08:00
lastmod: 2018-12-03T09:20:00+08:00
draft: false
description: 'TiDB Hackathon 2018 之天真贝叶斯学习机'
categories: [hackathon]
tags: [TiDB, Hackathon, go, rust, beijing, guangzhou, DSG]
comments: true
author: mai
---

>TiDB Hackathon 2018 学习到不少东西，希望明年再来。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/cs229-machine-learning.jpg)

>注：待补充内容我将会补充到博客中。

## 一、Hackathon 回顾

首先，介绍一下我们团队（DSG），分别来自：丹麦、北京（山西）、广州。

D 先生是在比赛前一天早上到达北京的，我是比赛前一天晚上从广州出发，于比赛当日早上 6:38 才抵达北京的。

>说实话，时差和疲惫对于参赛还是有一点影响的。

废话不多说，我就来回顾一下我的整个参赛过程。

- 比赛前一日 20:05 从广州南站出发，次日 6:38 抵达北京西站。
- 7:58 抵达地铁西小口

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-01.jpg)

- 8:06 经过转转

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-zhuanzhuan.jpg)

- 8:12 抵达比赛所在大厦：东升科技园 C-1 楼

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-c1.jpg)

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-pingcap.jpg)

- 8:16 签到，逛 PingCAP

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-sign.jpg)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-my-card.jpg)

- 8:40 跟 D 先生汇合，了解贝叶斯模型
- 9:20 DSG 团队成员全部集结完毕

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-dsg.jpg)

- 10:00 比赛正式开始
10:00 Hacking Time: Trello 构建整个比赛分工、准备工作、需求分析
- 搭建 TiDB 集群（2套）
- 熟悉 TiDB 集群，实操 PD-CTL
- 12:17 午餐
- 13:00 Hacking Time: 熟悉 PD Command，贝叶斯模型，导师指导，本地 TiDB - 环境构建（坑），分析 PD 热点调度，剖析调度流程，模拟热点数据
- 18:20 外出用餐（芦月轩羊蝎子(西三旗店)）【沾 D 先生的光去蹭吃蹭喝】
- 20:40 回到东升科技园
- 20:50 ~ 次日 1:10 Hacking Time: 模拟热点数据，实测调度上报和获取模型返回结果，本地测通调度参数上报和得到模型返回值
- 次日 1:10 ~ 5:50 会议室休息（在此期间，我的队友 D 先生，调好了模型，并将此模型通过 Docker 构建部署到 PD 机器上）
- 次日 5:50 Hacking Time: 将修改过的 PD 构建部署到线上服务器，并与 rust-nb-server 联调，实时上报和获取模型返回结果
- 次日 7:30 早餐
- 次日 8:00 正式联调
- 次日 9:00 抽签确定 Demo 时间
- 次日 9:00 ~ 12:00 Hacking Time: 联调，调优
- 次日 12:00 ~ 12:30 午餐时间

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-my-team-desktop.jpg)

- 次日 12:30 ~ 14:00 Hacking Time: PPT，调优
- 次日 14:30 ~ 18:30 Demo Time（B 站直播）

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-daddies.jpg)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-demo-show.jpg)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-ppt-1.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-ppt-2.png)

- 次日 18:30 ~ 19:00 颁奖（B 站直播）

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-prize-dsg.jpg)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/hackathon-2018-special-prize.jpg)

## 二、Hackathon 实操

### 1. 搭建 TiDB 集群

完全参考[文档](https://github.com/pingcap/docs-cn/blob/master/op-guide/ansible-deployment.md)

测试 TiDB 集群，可能遇到的坑（MySQL 8 client On MacOSX）：

- mysql client connect : Unknown charset 255 (MySQL 8 Client 不支持字符集，需要指定默认字符集为 UTF8) 

	`mysql -hx.x.x.x --default-character-set utf8`

### 2. 天真贝叶斯的服务接口

- `/model/service1` PUT 上报数据：

```json
{
  "updates": [
    [
      "transfer leader from store 7 to store 2",
      [
        {
          "feature_type": "Category",
          "name": "hotRegionsCount1",
          "value": "true"
        },
        {
          "feature_type": "Category",
          "name": "minRegionsCount1",
          "value": "true"
        },
        {
          "feature_type": "Category",
          "name": "hotRegionsCount2",
          "value": "true"
        },
        {
          "feature_type": "Category",
          "name": "minRegionsCount2",
          "value": "true"
        },
        {
          "feature_type": "Category",
          "name": "srcRegion",
          "value": "7"
        }
      ]
    ],
    [
      "transfer leader from store 7 to store 1",
      [
        {
          "feature_type": "Category",
          "name": "hotRegionsCount1",
          "value": "true"
        },
        {
          "feature_type": "Category",
          "name": "hotRegionsCount2",
          "value": "true"
        }
      ]
    ]
  ]
}
```

- `/model/service1` POST 获取模型结果：

输入参数：上报的参数

```json
{
  "predictions": [
    {
      "transfer leader from store 1 to store 2": 0.27432775221072137,
      "transfer leader from store 1 to store 7": 0.6209064350448428,
      "transfer leader from store 2 to store 1": 0.024587894827775753,
      "transfer leader from store 2 to store 7": 0.01862719305134528,
      "transfer leader from store 7 to store 1": 0.02591609468013258,
      "transfer leader from store 7 to store 2": 0.03563463018518229
    }
  ]
}
```

待补充...

### 3. PD 集群部署

首先将 pd-server 替换到集群所在 `ansible/resources/bin` 目录下，那如何让集群上的 PD 更新生效呢？

**更新：**

```sh
$ ansible-playbook rolling_update.yml --tags=pd
```

在实操过程中， 如果你在更新到一半的时候就关门了，可能会导致整个 PD 挂掉（非集群环境），可能是因为逻辑不严谨所导致的问题

直接停止了 ansible，导致 PD 集群机器节点有停止的情况，这个时候你可以通过以下命令启动它。

**启动：**

```sh
$ ansible-playbook start.yml --tags=pd
```

### 4. PD 调度

#### 4.1 PD 之热点 Region 调度源码浅析

待补充...

#### 4.2 取消热点数据调度

大家都以为可以通过配置来解决：(调度开关方法: 用 config set xxx 0 来关闭调度)

配置如下：（虽然找的地方错误了，但是错打错着，我们来到了 Demo Time：

```sh
config set leader-schedule-limit 0
config set region-schedule-limit 0
scheduler add hot-region-scheduler
config show
config set leader-schedule-limit 4
config set region-schedule-limit 8
```

实测发现，根本不生效，必须要改源代码。

```golang
func (h *balanceHotRegionsScheduler) dispatch(typ BalanceType, cluster schedule.Cluster) []*schedule.Operator {
	h.Lock()
	defer h.Unlock()
	switch typ {
	case hotReadRegionBalance:
		h.stats.readStatAsLeader = h.calcScore(cluster.RegionReadStats(), cluster, core.LeaderKind)
		// return h.balanceHotReadRegions(cluster) // 将这一行注释
	case hotWriteRegionBalance:
		h.stats.writeStatAsLeader = h.calcScore(cluster.RegionWriteStats(), cluster, core.LeaderKind)
		h.stats.writeStatAsPeer = h.calcScore(cluster.RegionWriteStats(), cluster, core.RegionKind)
		// return h.balanceHotWriteRegions(cluster) // 将这一行注释
	}
	return nil
}
```

但是，我们要的是不调度，但是需要记录调度结果，所以我们的改动是这样的：

```golang
func (h *balanceHotRegionsScheduler) balanceHotReadRegions(cluster schedule.Cluster) []*schedule.Operator {
	// balance by leader
	srcRegion, newLeader := h.balanceByLeader(cluster, h.stats.readStatAsLeader)
	if srcRegion != nil {
		schedulerCounter.WithLabelValues(h.GetName(), "move_leader").Inc()
		// step := schedule.TransferLeader{FromStore: srcRegion.GetLeader().GetStoreId(), ToStore: newLeader.GetStoreId()} // 修改为不返回值或者返回 _
		_ = schedule.TransferLeader{FromStore: srcRegion.GetLeader().GetStoreId(), ToStore: newLeader.GetStoreId()}
		// return []*schedule.Operator{schedule.NewOperator("transferHotReadLeader", srcRegion.GetID(), srcRegion.GetRegionEpoch(), schedule.OpHotRegion|schedule.OpLeader, step)} // 注释这一行，并 return nil
		return nil
	}

	// balance by peer
	srcRegion, srcPeer, destPeer := h.balanceByPeer(cluster, h.stats.readStatAsLeader)
	if srcRegion != nil {
		schedulerCounter.WithLabelValues(h.GetName(), "move_peer").Inc()
		return []*schedule.Operator{schedule.CreateMovePeerOperator("moveHotReadRegion", cluster, srcRegion, schedule.OpHotRegion, srcPeer.GetStoreId(), destPeer.GetStoreId(), destPeer.GetId())}
	}
	schedulerCounter.WithLabelValues(h.GetName(), "skip").Inc()
	return nil
}

......

func (h *balanceHotRegionsScheduler) balanceHotWriteRegions(cluster schedule.Cluster) []*schedule.Operator {
	for i := 0; i < balanceHotRetryLimit; i++ {
		switch h.r.Int() % 2 {
		case 0:
			// balance by peer
			srcRegion, srcPeer, destPeer := h.balanceByPeer(cluster, h.stats.writeStatAsPeer)
			if srcRegion != nil {
				schedulerCounter.WithLabelValues(h.GetName(), "move_peer").Inc()
				fmt.Println(srcRegion, srcPeer, destPeer)
				// return []*schedule.Operator{schedule.CreateMovePeerOperator("moveHotWriteRegion", cluster, srcRegion, schedule.OpHotRegion, srcPeer.GetStoreId(), destPeer.GetStoreId(), destPeer.GetId())} // 注释这一行，并 return nil
				return nil
			}
		case 1:
			// balance by leader
			srcRegion, newLeader := h.balanceByLeader(cluster, h.stats.writeStatAsLeader)
			if srcRegion != nil {
				schedulerCounter.WithLabelValues(h.GetName(), "move_leader").Inc()
				// step := schedule.TransferLeader{FromStore: srcRegion.GetLeader().GetStoreId(), ToStore: newLeader.GetStoreId()} // 修改为不返回值或者返回 _
				_ = schedule.TransferLeader{FromStore: srcRegion.GetLeader().GetStoreId(), ToStore: newLeader.GetStoreId()}

				// return []*schedule.Operator{schedule.NewOperator("transferHotWriteLeader", srcRegion.GetID(), srcRegion.GetRegionEpoch(), schedule.OpHotRegion|schedule.OpLeader, step)} // 注释这一行，并 return nil
				return nil
			}
		}
	}

	schedulerCounter.WithLabelValues(h.GetName(), "skip").Inc()
	return nil
}
```

当修改了 PD 再重新编译得到 pd-server，将其放到 `tidb-ansible/resources/bin/pd-server` 并替换原来的文件，然后执行 `ansible-playbook rolling_update.yml --tags=pd`，即可重启 pd-server 服务。

在调优的过程中发现，当前 `hot-region-scheduler` 的调度时对于目标机器的选择，存在不是最优的情况，代码如下：

https://github.com/pingcap/pd/blob/master/server/schedulers/hot_region.go#L374

执行循环 candidateStoreIDs 的时候，如果存在多台，那么最后一个总会覆盖前面已经存储到 storeID 里面的满足条件的一台，从而拿到的 storeID 不是最优的机器。

```golang
// selectDestStore selects a target store to hold the region of the source region.
// We choose a target store based on the hot region number and flow bytes of this store.
func (h *balanceHotRegionsScheduler) selectDestStore(candidateStoreIDs []uint64, regionFlowBytes uint64, srcStoreID uint64, storesStat core.StoreHotRegionsStat) (destStoreID uint64) {
	sr := storesStat[srcStoreID]
	srcFlowBytes := sr.TotalFlowBytes
	srcHotRegionsCount := sr.RegionsStat.Len()

	var (
		minFlowBytes    uint64 = math.MaxUint64
		minRegionsCount        = int(math.MaxInt32)
	)
	for _, storeID := range candidateStoreIDs {
		if s, ok := storesStat[storeID]; ok {
			if srcHotRegionsCount-s.RegionsStat.Len() > 1 && minRegionsCount > s.RegionsStat.Len() {
				destStoreID = storeID
				minFlowBytes = s.TotalFlowBytes
				minRegionsCount = s.RegionsStat.Len()
				continue // 这里
			}
			if minRegionsCount == s.RegionsStat.Len() && minFlowBytes > s.TotalFlowBytes &&
				uint64(float64(srcFlowBytes)*hotRegionScheduleFactor) > s.TotalFlowBytes+2*regionFlowBytes {
				minFlowBytes = s.TotalFlowBytes
				destStoreID = storeID
			}
		} else {
			destStoreID = storeID
			return
		}
	}
	return
}
```

#### 4.3 PD 重要监控指标详解之 **HotRegion：**

+ Hot write Region's leader distribution：每个 TiKV 实例上是写入热点的 leader 的数量
+ Hot write Region's peer distribution：每个 TiKV 实例上是写入热点的 peer 的数量
+ Hot write Region's leader written bytes：每个 TiKV 实例上热点的 leader 的写入大小
+ Hot write Region's peer written bytes：每个 TiKV 实例上热点的 peer 的写入大小
+ Hot read Region's leader distribution：每个 TiKV 实例上是读取热点的 leader 的数量
+ Hot read Region's peer distribution：每个 TiKV 实例上是读取热点的 peer 的数量
+ Hot read Region's leader read bytes：每个 TiKV 实例上热点的 leader 的读取大小
+ Hot read Region's peer read bytes：每个 TiKV 实例上热点的 peer 的读取大小

本次我们只抽取了 Write Region Leader 这部分进行，所以我们重点关注一下监控和问题：

+ Hot write Region's leader distribution

### 5. 模拟热点数据

- 本地往服务器 load 数据：

修改 `tidb-bench` 的 `Makefile#load` 模块对应的主机地址，然后执行 `make tbl`, `make load` 即可往服务器 load 数据了。

>注意，这里你也需要进行一些配置修改：`--default-character-set utf8`

- 线上服务器上：

```sh
$ ./go-ycsb run mysql -p mysql.host=10.9.x.x -p mysql.port=4000 -p mysql.db=test1 -P workloads/workloada
```

注：我们可以根据自己的需要，调整 `workloada#recordcount` 和 `workloada#operationcount` 参数。

`go-ycsb` 支持 insert，也支持 update，你可以根据你的需要进行相对应的调整。

### 6. 本地构建 rust-nb-server

rust 速成...

环境都可以把你给弄死。

```sh
rustup install nightly-2018-11-19
cargo run
...
```

Mac 本地打包 Linux，失败：缺少 std 库，通过 Dockerfile 搞定。

### 7. 导师指导

从比赛一开始，导师团就非常积极和给力，直接去每个项目组，给予直接指导和建议，我们遇到问题去找导师时，他们也非常的配合。

在 hackathon 期间，导师帮助我们确定课题方向和目标，以及热点数据构建。上多次给予直接指导和解决实际问题（包括两次代码级别的调整），非常感谢他们，对照之下，我们的主动性和准备真的很不足，值得反思。

## 三、Hackathon Demo show

整个 Demo show 还是进行的非常顺畅的，时不时还有尖叫，可想而知大家的作品是多么的酷炫和牛逼，印象中只有一个小组在 Demo 环境出现了程序崩溃，需要重启再开始演示的（印象中那个项目是用 Netty 基于 TiKV 做的 memcache（实现了大部分的协议））。

## 四、Hackathon 颁奖

因为我要赶着去火车站坐车，所以在周日下午6点的时候，我就跟大家道别，然后去火车站了，没有参加其他小组的 Demo Show 非常遗憾和抱歉，并且我们 DSG 团队荣获三等奖+最佳创意奖，我也很遗憾未能跟团队一起分享。

谢谢评委老师和组委会对我们的认可，也谢谢 PingCAP 给大家筹备这么好的一次技术活动。

## 五、TiDB Hackathon 2018 总结

>如果非要说一下本次活动不太满意的地方，那就是网络了。

0. 环境（一定要提前准备）；
1. 配置文档中有一些注意事项，大家一定要认真阅读：ext4 必须要每台机器都更新；
2. [10.9.97.254]: Ansible FAILED! => playbook: bootstrap.yml; TASK: check_system_optional : Preflight check - Check TiDB server's RAM; message: {"changed": false, "msg": "This machine does not have sufficient RAM to run TiDB, at least 16000 MB."}，内存不足的问题
	- 可以在执行的时候增加参数来避免
	- `ansible-playbook bootstrap.yml --extra-vars "dev_mode=True"`
3. 如果磁盘挂载有问题，可以重新清除数据后再重新启动；
	- `ansible-playbook unsafe_cleanup_data.yml` （https://github.com/pingcap/docs/blob/master/op-guide/ansible-operation.md）

## 六、参考资料

1. [https://github.com/pingcap/pd](https://github.com/pingcap/pd)
2. [tidb-bench tpch](https://github.com/pingcap/tidb-bench/tree/master/tpch)
3. [https://github.com/pingcap/go-ycsb](https://github.com/pingcap/go-ycsb)
4. [Ansible 部署](https://github.com/pingcap/docs-cn/blob/master/op-guide/ansible-deployment.md)
5. [PD 重要监控指标详解](https://github.com/pingcap/docs-cn/blob/master/op-guide/dashboard-pd-info.md)
6. [使用 TiDB-Ansible 升级 TiDB](https://pingcap.github.io/docs/op-guide/ansible-deployment-rolling-update/)
7. [在线代码格式化](http://tool.oschina.net/codeformat/json)
8. [rust-nb-server](https://github.com/liufuyang/rust-nb-server)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

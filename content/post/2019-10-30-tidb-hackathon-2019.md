---
title: 'TiDB Hackathon 2019 之 Manage many as one with SQL'
keywords: pingcap, tidb, pd, tikv, go, rust, hackathon, beijing, shanghai, guangzhou
date: 2019-10-30T22:20:00+08:00
lastmod: 2019-10-30T22:20:00+08:00
draft: true
description: '用 SQL 查询集群所有节点的信息；用 SQL 修改集群所有节点的配置。'
categories: [hackathon]
tags: [pingcap, tidb, pd, tikv, go, rust, hackathon, beijing, shanghai, guangzhou]
comments: true
author: 杨文, 陈霜, 邓力铭, 唐伟志
---

去年参加[TiDB Hackathon 2018 之天真贝叶斯学习机](https://maiyang.me/post/2018-12-03-the-road-hackathon-in-tidb/)，很幸运获得了三等奖，今年跟着几位大佬再次中奖，非常开心。

这一次相较上一次，很不一样的地方就是更深入 TiDB 了，比方说 TiDB、PD、TiKV 全部都有涉及，并且还会全部进行改造。还有深入了解了 PingCAP 研发同学的工作模式。
>Hackathon 真的非常不错，明年能否再给一个抱大腿的机会呀？

## 简述

本次 Hackathon 的主题是 “TiDB Improve” ，我们小组都不是事先组队的，而是在国庆后报名，由组委会分配的

缘分啊！！！

组名：“做个人吧”，其实我到现在也不知道为什么取这个名字。

在10月11日小组正式成立，但是我们并没有确定搞什么主题，所以小组也只是名义上成立了而已，实际上什么都没有做。

## 准备工作

我们小组的题目是在10月14日我去 PingCAP 公司参加 Talent Plan 公开课，跟小组的2个组员见面，然后跟几位导师沟通之后确定的。
>再次感谢导师给我们的议题建议，以及后续整个过程中给予的帮助。

说来也巧，东旭在10月17日发表了一篇文章：[Hands on! 如何给 TiDB 添加新系统表](https://mp.weixin.qq.com/s/CsCPeqXj6V9Bd6h3pMeI8w)
>对我们帮助还蛮大的。

### hackathon 比赛项目规划

这个工作主要是由我们的小组组长陈霜负责的。

### 小组线上讨论

10月16日，伟志在群内询问到我们项目要如何开展？然后我们乘机就召开了线上第一次小组讨论。

圈重点：

>tidb 之间的 rpc 框架的功能是可以把 executor 算子推给别的 TiDB 一起执行，
但是框架搭好后，就需要展示使用这个框架的作用，我目前能想到的2个点就是：
从性能方面：弄一个分布式的计算，比如多个表的 join, 或者两个大表的 join, 我们可以把 join 并行推到 各个 TiDB 上面去并行的做，但是这个可能比较难做，
从易用性方面，TiDB 的一些状态信息可能是存在内存表里面的，以前访问一台 TiDB 查询该 TiDB 的信息时，只能查当前 TiDB 的状态信息，有 了 rpc 框架后，可以直接查所有 tidb 的状态信息，生成相同的算子发给所有的 TiDB ，然后上面用一个 Union all 算子即可。 这个比较好做，但是目前 TiDB 自身状态信息相关的 内存表很少，我们可以自己去加，比如 TiDB 的 cpu 使用率，内存，连接数等等， 我们可以自己加种内存表，这个也易于分工，每个人分1，2 个内存表去实现， 具体哪些内存表，我也还没想好，大家一起想想吧，可以参考 mysql, orcal 等， mysql 有一个 perfomance db 里面维护了一些 内存表，可以参考下 ， 这个做起来比较简单
**TiDB 自己的状态统计做成一个内存表就好了，信息就在内存里面，只是汇总集群里面所有 TiDB 的统计信息就要走 rpc 框架。**

其他就不多贴了，反正就是话题经过一番折腾，差不多算是定下来了。

----

过了 5 天，我们小组召开了第一次 zoom 在线视频会议。

### 小组第一次会议（唯一一次）

10月21日20点30分举行了小组成立以来的第一次正式会议，也是唯一的一次正式会议。

会议主要是确定了我们要做的项目具体是什么，以及大概的分工，彼此也在 zoom 会议上进行了相互的认识。

----

## 目标

用 SQL 获取集群类所有节点的相关信息，将相关信息映射成一张系统表，帮助更快的定位问题。

node_info （各个节点维护各自的信息）
 
|cpu | net | memory | disk | node_type | ip | id |
|xx | xx| xx| xx| tidb| xx| tidb_1|

...

cluster_node_infos （ TiDB 汇总所有节点的信息形成系统表）

|cpu | net | memory | disk | node_type | ip | id |
|xx| xx| xx| xx| tidb| xx| tidb_1|
|xx| xx| xx| xx| tikv| xx| tikv_1|
|xx| xx| xx| xx| tikv| xx| pd_1|

## 问题

- Slow_query, Statement, ProcessList 内存表目前都是单机的。
	如何连上一台 TiDB 后，执行 `Select * from slow_query;` 可以获取所有 TiDB 节点里内存表的数据?
- 如何用 SQL 获取所有节点的 CPU, memory, heap 等信息?

## 解决方案

1. 获取所有 TiDB 节点的信息：RPC 框架，类似 coprocessor；
2. 获取 TiKV 节点的信息，新增 MemTableScan 算子，TiKV 节点自己维护一份类似内存表的数据，用 MemTableScan 来获取内存表数据的内容；
3. 获取 PD 节点的信息：用 PD Client 暴露出一个接口? 

## 分工

- TiDB 之间 RPC 框架的实现 @陈霜
- 新增 MemTableScan 算子，访问 TiKV 节点的数据 @邓力铭
- 新增 PD client 接口，访问 PD 节点的数据 @杨文
- 新增更多 TiDB 的内存表，参考: Hands-on! 如何给 TiDB 添加新系统表 @唐伟志

>会议之后，其实我们整个规划还算比较完整了，大家基本上也都各司其职开始研究和熟悉。

## 开赛

小组成员陆陆续续，在9点30分都赶到了赛场，我因为一些原因迟到了，差不多9点50分才赶到。

9点30分开始的 hackathon 开场会也只听了一部分。

不过，我们小组每个人在10点钟也都全部快速进入状态了，把之前定下来的计划又重新明确了一遍，并且我们还将要收集的信息定义好数据结构了。

## 调研

- https://github.com/shirou/gopsutil 好像有一些 CPU、内存信息的采集。
- prometheus-go-client 如何收集 CPU，内存信息，可以参考其源码实现，我们进行借鉴。
- https://github.com/zcalusic/sysinfo/ 参赛当天进行的实际调研和调试。

因为我们小组成员，都没有使用过以上组件，所以这部分的调研主要是我和唐伟志负责。

经过测试，我们基本上确定的方案是：

- https://github.com/zcalusic/sysinfo/ 负责静态数据的采集；
- https://github.com/shirou/gopsutil/ 负责动态数据的采集；

## 上报数据方式

1. TiDB 内使用内存表；
2. TiDB 与 TiKV 使用原有的 RPC；
3. TiDB 与 PD 使用 HTTP API；（调研发现 PD Client RPC 比较重和麻烦）

## hackathon 第一天

上午：
进入状态比较慢，编码不多，主要是熟悉环境，了解比赛主题和实际细化的分工，然后进行技术方案的调研。

午餐：
中午12点，组委会的小伙伴们服务非常周到，订的午餐到了，大家都准点去吃饭了。（肯定要吃饱了才能干活的。）
>大家相互认识熟悉，面基 party；

下午：

吃饭后，一开始干劲十足，不过随着这个饭晕逐步起效，到13点30多实在扛不住，我就趴在桌子上午休了30来分钟，然后起来之后活动活动，继续 hackathon ，很快就打通了本地采集项的单元测试，随后部署到 Linux 上进行实际采集测试，看起来数据项各方面都正常。

想办法进行本地集群测试，然后到线上预分配机器安装集群，然后进行测试。

也不知道干了多少事，又叫大家吃饭了。。。。
>时间不经用啊~~~

晚上：
晚餐真的是异常丰富，有各种口味的小龙虾。
>事实证明，我们的战斗力不怎么强，小龙虾居然还过夜了，到第二天颁奖结束时，都还有一盒小龙虾。

主要是 TiDB 内存表的调试，以及和 PD 的联调测试。

联调也没有遇到什么大问题，但是开发的程序还是有不少可优化的，所以一直持续在改进。

我一直被一个 etcd 访问总是返回 leader 节点的采集数据的问题卡住，调试到凌晨4点多也没有解决。（找到问题点，但是一直没想到自认为比较好的解决方案）
>我尝试解决，一直持续到4点多，实在是扛不住了，我就去睡了，我们组长陈霜大神，居然在我睡后帮我把卡住的问题给解决了。（送个 👍）【解决方法也比较 hack 哦】

`newRedirector.ServeHTTP` 中会对访问节点是否是 Leader 进行校验，如果不是会去遍历节点，直到找到 Leader 节点，这也就解释了为什么我们访问 member ip，返回的依然是 Leader 的数据。

我们本来是想参考 Oracle AWR 对参赛项目进行加码的，但是因为联调的问题，耽误了不少时间，所以这部分的强力优化，只能期待以后了。

## hackathon 第二天

我和唐伟志，其实在第一天的时候基本上已经把分工的任务都完成的差不多了。
所以第二天，主要是测试，以及构建本地 TiDB 集群测试。

我也尝试着去阅读了更多的源代码，去寻找问题的根源。（终于找到了问题的根源）----不抛弃不放弃，终会明白。

## 问题

1. Mac 上基本上无法获取到 CPU, MEMORY, DISK 等信息；（库对 Linux 才支持比较好）；
2. https://github.com/zcalusic/sysinfo/ 在 Mac 上编译报错：无法识别 syscall.Utsname ；
3. TiDB 本地集群联调（需要编译可用的 TiDB, PD, TiKV binary）；
4. TiDB 与 TiKV 联调（@邓力铭 补充）；
5. 其他问题补充（@陈霜、@邓力铭、@唐伟志）；

### 问题六

API 访问 member 的 node_info 时，返回了 Leader 的数据。
虽然一开始我都定位到了产生问题的地方，但是我一根筋的在思考的解决方案是：重新定义路由根节点，以区分开 `/pd` ，比方说 `/pd_cluster` ，以使得这次调整可以更具有可扩展性。

我的想法是：

给 mux 增加一个新的 prefix ，但是查阅了各种设置 router 的 prefix 文档之后，测试可以，但是在 PD 中就是一直不能生效，总是报错：404 Not Found，当时头脑发热的就一直揪着这个 404 不放。
>尝试过去调取整个定义的配置路由表。我一直想方设法去找为什么 404，其实这个思路是不对的。

第二天，头脑清醒时，发现原来 etcd 只定义了 `/pd`

```golang
	etcdCfg.UserHandlers = map[string]http.Handler{
		pdAPIPrefix: apiRegister(s),
	}
```

所以我设置 prefix 的 router 是无法生效的。


## 参考资料

1. [Hackathon TiDB/TiKV 参考文档资料汇总](https://github.com/pingcap/presentations/blob/master/hackathon-2019/reference-document-of-hackathon-2019.md)
2. [TiDB Hackathon 2019 完整参赛项目展示](https://github.com/pingcap/presentations/blob/master/hackathon-2019/hackathon-2019-projects.md)
3. [Manage many as one with SQL Slides](https://docs.google.com/presentation/d/1sWG4LYnW-LHAPgDa1HoT6uvFwCfKDCYR47mCjOoLSf4/edit#slide=id.g6f8409298b_0_149)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

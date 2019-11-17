---
title: '如何判断一些数据是否造假呢？本福特定律'
keywords: 本福特, benford's law, 本福特定律, go 夜读, 造假, YouTube, Bilibili
date: 2019-11-16T14:22:00+08:00
lastmod: 2019-11-17T17:50:00+08:00
draft: true
description: '如何判断一些数据是否造假呢？本福特定律'
categories: [学习]
tags: [本福特, benford's law, 本福特定律, go 夜读, 造假, YouTube, Bilibili]
comments: true
author: mai
---

## 如何判断一些数据是否造假呢？

>有一个有趣的方法叫做本福特定律。

在自然生活中有许多数据，例如各个国家的人口、GDP、国土面积，甚至是视频网站的播放量、元素的半衰期等，这些数据的首位数可能是 1、2、3、4、5、6、7、8、9，通常人们会以为每个数字打头的概率都相同，都是1\~9，但实际上，科学家本福特等人发现：数字 1 打头的概率超过 30%。

如果一组数据不满足本福特定律，那很有可能是因为**人为修改**而得来的~假数据~。

例如有人曾经对 XX 公司的财报进行统计，发现不满足本福特定律。

自然界为什么会有这么神奇的定律呢？接下来我们就来看一看吧。

## 什么叫本福特定律？

本福特定律（Benford's law），说明一堆从实际生活得出的数据中，以 1 为首位数字的数的出现概率约为总数的三成，接近直觉得出之期望值 1/9 的 3 倍。推广来说，越大的数，以它为首几位的数出现的概率就越低。它可用于检查各种数据是否有造假。

>（摘录自维基百科）

### 数学上的定义

本福特定律说明在b进位制中，以数n起头的数出现的概率为
logb(n+1)−logb(n)。本福特定律不但适用于个位数字，连多位的数也可用。

## 应用

1972 年，Hal Varian 提出这个定律来用作检查支持某些公共计划的经济数据有否欺瞒之处。1992 年，Mark J. Nigrini 便在其博士论文 "The Detection of Income Tax Evasion Through an Analysis of Digital Frequencies."（Ph.D. thesis. Cincinnati, OH: University of Cincinnati, 1992.）提出以它检查是否有伪帐。

推而广之，它能用于在会计、金融甚至选举中出现的数据。该定律被华盛顿邮报上的一篇文章引用，该文章以此为基础声称 2009 年伊朗总统大选中有造假。

### 数据

1. 李永乐老师的视频播放量：78/266=29.3%
2. 国家地区人口：67/235=28.5%
3. GDP ：60/197=30.5%
4. 国土面积：59/216=27.3%
5. 斐波那契数列（前）：45/154=29.2%
6. 放射性元素的半衰期。

## 证明

本福特定律，不是严格的定律。

1. 增长量正比于存量。

----

## Go 夜读数据 - 实践分析

接下来，我们就以 Go 夜读每一期在 YouTube 和 Bilibili 还是那个的播放量为例来分析一下吧。
>数据来自于 2019-11-17 17:00:00 左右。

| 期数 | 名称 | YouTube 播放量 | Bilibili 播放量 |
|----|----|----|----|
| 67 | SQL 连接池分析 | 84  |   450  |
| 66 | #Paper Reading CSP 理解顺序进程间通信 |	134 |	467 |
| 65 | Go 原生网络模型 vs 异步 Reactor 模型 | 143 |	564 |
| 64 | 深入浅出 Golang Runtime |	393 |	1163 |
| 63 | Go 编码风格阅读与讨论 |	232 |	619 |
| 62 | Go-Micro 微服务框架 Part 1 |	391 |	1366 |
| 61 | Go Modules、Go Module Proxy 和 goproxy.cn  |	395 |	1384 |
| 60 | IPFS 星际文件系统	144 |	716 |
| 59 | #Paper Reading Real-world Go Concurrency Bugs |	168 |	519 |
| 58 | What’s new in Go 1.13？ |	444 |	893 |
| 57 | sync/semaphore 源码浅析 |	113 |	449 |
| 56 | channel & select 源码分析 |	435 |	1651 |
| 55 | Go&WebAssembly 简介 |	158 |	686 |
| 54 | TiDB SQL 兼容性测试工具简介 |	82  |	287  |
| 53 | delete from map in go |	115 |	315 |
| 52 | httprouter 简介 |	183 |	808 |
| 51 | sync/errgroup  |	160 |	481 |
| 50 | GoLand Tips & Tricks  |	775 |	1449 |
| 49 | TiDB Transaction |	126 |	376 |
| 48 | TiDB Compiler |	276 |	379 |
| 47 | TiDB Executor |	149 |	475 |
| 46 | TiDB Source Code Overview |	753 |	941 |
| 45 | goim 架构设计与源码分析 |	428 |	985 |
| 44 | Go map 源码阅读分析 |	289 |	940 |
| 43 | gomonkey 框架设计与应用实践 |	193 |	660 |
| 42 | An Introduction to Failpoint Design |	257 |	366 |
| 41 | golint 及 golangci-lint 的介绍和使用 |	292 |	329 |
| 40 | atomic.Value 的使用和源码分析 |	165 |	372 |
| 39 | init function 使用分析 |	175 |	429 |
| 38 | kubernetes scheduler 源码阅读 |	211 |	641 |
| 37 | 从 serverless 的一个设计说起 |	338 |	693 |
| 36 | k8s context 实践源码阅读 |	207 |	544 |
| 35 | context 包源码阅读 |	455 |	1294 |
| 34 | plan9 汇编入门，带你打通应用和底层 by Xargin |	1124 |	1668 |
| 33 | Go defer 和逃逸分析 |	328 |	468 |
| 32 | etcd raft 源码阅读 |	1065 |	1534 |
| 31 | flag 包源码阅读 |	140 |	338 |
| 30 | go mod 源码阅读 part 4 |	70 |	351 |
| 29 | Go opentracing jaeger 集成及源码分析 |	243 |	436 |
| 28 | go mod 源码阅读 part 3 |	75 |	206 |
| 27 | go mod 源码阅读 part 2 |	98 |	349 |
| 26 | 手把手教你基于 Github+Netlify 构建自动化持续集成的技术团队博客 |	225 |	998 |
| 25 | TSDB 引擎介绍，对比及存储细节 |	166 |	663 |
| 24 | go mod 源码阅读 part 1 |	292 |	683 |
| 23 | Drone 简单介绍和部分源码分析 |	319 | 	347 |
| 22 | Go 开发工具讨论 | 	529 | 	861 |
| 21 | Go errors 处理及 zap 源码分析 | 	275 | 	492 |
| 20 | go test 及测试覆盖率 | 	161 | 	459 |
| 19 | 如何开发一个简单高性能的http router及gorouter源码分析 | 	314 | 	571 |
| 18 | 去中心化加密通信框架 CovenantSQL/DH-RPC的设计 |	198 | 	231 |
| 17 | grpc 开发及 grpcp 的源码分析 | 	1381 | 	3822|
| 16 | OpenFaas 介绍及源码分析 | 	258 | 	224 |
| 15 | 多路复用资源池组件剖析 |	370 | 	465 |
| 14 | sync.Pool 源码分析及适用场景 |	517 | 	417 |
| 13 | Kubernetes 入门指南 |	4297 | 	1311|
| 12 | golang 中 goroutine 的调度 |	1342 | 	1027|
| 11 | Golang 代码质量持续检测实践 |	714 | 	679 |
| 10 | http 包源码阅读 part3 |	246 | 	999 |
| 8	 | http 包源码阅读 part2 | 295 | 1002 |
| 7	 | http 包源码阅读 part1 | 1615 | 568 |

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/youtube%E5%92%8Cbilibili%E6%92%AD%E6%94%BE%E9%87%8F%E6%9B%B2%E7%BA%BF%E5%9B%BE.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/youtube%E6%92%AD%E6%94%BE%E9%87%8F.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/bilibili%E6%92%AD%E6%94%BE%E9%87%8F.png)

YouTube 总播放量：25520，平均播放量：425，播放量最多的是：《Kubernetes 入门指南》，4297，播放量最少的是：《go mod 源码阅读 part 4 》，70。
Bilibili 总播放量：44860，平均播放量：747，播放量最多的是：《grpc 开发及 grpcp 的源码分析》，3822，播放量最少的是：《go mod 源码阅读 part 3》，206。

数据总期数为 60 期，其中：

| 数字开头 | YouTube 有多少期 | 占比 |  Bilibili 有多少期 | 占比 |
|----|----|----|----|----|
| 1	|   23  | 38.3% | 	12		| 	20%		|
| 2 | 	14	| 23.3% | 	4		| 	6.7%	|
| 3 |	8	| 13.3% | 	11		| 	18.3	|
| 4 | 	5	| 8.3%  | 	12		| 	20%		|
| 5 |	2	| 3.3%  | 	5		| 	8.3%	|
| 6 |	0   | 0%    | 	8		| 	13.3%	|
| 7 |	5	| 8.3%  | 	1		| 	1.67%	|
| 8 |	2	| 3.3%  | 	3		| 	5%		|
| 9 |	1 	| 1.67% | 	4		| 	6.67%	|

表格看起来不直观，我将其转换为柱状图：

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/go%E5%A4%9C%E8%AF%BB%E6%92%AD%E6%94%BE%E9%87%8F%E6%95%B0%E5%AD%97%E5%BC%80%E5%A4%B4%E7%9A%84%E5%8D%A0%E6%AF%94%E5%9B%BE.png)

从表格看出，在 Bilibili 上的播放量是不满足本福特定律的，从而我们是否也可以得知 Bilibili 存在数据造假呢？（纯粹的定律猜测，实际情况无法验证。）

## 参考资料

1. [淘宝“双11”2684亿销售额造假了吗？用本福特定律检验一下](https://www.youtube.com/watch?v=CCo4k9Ax7cM)
2. [本福特定律 - 维基百科](https://zh.wikipedia.org/zh-cn/本福特定律)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

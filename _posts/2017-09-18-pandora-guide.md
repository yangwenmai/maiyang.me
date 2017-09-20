---
layout: post
title: 'Pandora 大数据平台的入门与实战'
keywords: Pandora, bigdata, tsdb, qiniu, grafana, logkit
date: 2017-09-18 06:10
description: '心动不如行动，轻轻松松带你玩转大数据，Pandora 大数据平台的入门与实战，包括基本介绍，操作指引，问题总结等'
categories: [pandora, bigdata]
tags: [pandora, bigdata, tsdb, logkit, grafana]
comments: true
group: archive
icon: file-o
---

	本文耗时较长，更多是对于使用过程中遇到的一个一个问题的总结，希望对大家有帮助。

----

>心动不如行动，轻轻松松带你玩转大数据。

## 入门 ##

### 基本介绍 ###

[Pandora 潘多拉](https://qiniu.github.io/pandora-docs/)是一套面向海量数据，以及基础技术人员的，管理大数据传输、计算、存储和分析的大数据平台。

Pandora 共包含五个组件级服务：

| 组件服务| 概述 |
|----|-----|
|大数据工作流引擎|数据接收，（实时/离线）计算和导出(支持多种数据格式:HTTP,日志检索服务，时序数据库，对象存储)；|
|时序数据库|时间序列数据库（高速存储，聚合和检索）；|
|日志检索服务|海量日志存储和检索;|
|报表工作室|基于数据快速制作动态/静态报表，生成气象观测台;|
|XSpark|基于 Spark 和容器云，快速进行海量数据分析与可视化;|

![Pandora Arch](http://oqos7hrvp.bkt.clouddn.com/blog/arch.png)

### 入门指南 ###

#### 如何从零开始 ####

>目前 Pandora 平台产品处于有限开放、免费试用阶段，可以联系七牛的销售或客服申请开通试用，也可以发送邮件给 pandora[AT]qiniu.com 注明您的公司名称及联系方式，申请试用。他们在收到申请后一个工作日内为您审核。

- 申请注册七牛账号；

登录之后的界面如下：

![七牛控制台](http://oqos7hrvp.bkt.clouddn.com/blog/qiniu_console.jpg)

- 申请 Pandora 大数据平台的相关权限；

由于 Pandora 大数据平台还处于内测阶段，所以你要单独向七牛申请权限。

申请通过之后登录界面如下：

![七牛控制台-大数据平台](http://oqos7hrvp.bkt.clouddn.com/blog/qiniu_console_bigdata.jpg)

从图中，我们可以看出，侧边栏多了大数据工作流引擎、时序数据库、日志检索，容器应用市场，这些都是 Pandora 包含的 5 个组件的入口。

#### 准备工作 ####

了解以下大数据平台的组件服务：

1. 实时工作流、离线工作流（实时的数据源和消息队列的数据存储时间是2天）；
2. 时序数据库：创建仓库（类比：数据库）、序列（类比：表）[最大的数据存储时限是30天]；
3. 日志检索：创建仓库[数据存储时限：最大可设置为永久]
4. 容器应用市场：目前官方应用提供有Grafana，Kibana，XSpark；（这 3 个默认是没有开通的，还需要再申请开通），第三方应用暂无；

我们可以通过控制台创建，也可以通过 API（SDK）操作，一般正式用之后都通过 SDK 来进行操作，控制台用于管理。

Pandora 大数据平台的基本流程如下：

- 通过（LogKit/SDK/API ）打数据到工作流（workflow）；
- 在 workflow 中，进行数据计算和导出 (可导出到 TSDB/LogDB/HTTP/对象存储)；
- 然后在 TSDB/LogDB 中查询数据，或通过 Grafana 进行图表绘制。

#### 构建实时和离线工作流 ####

导出数据到对象存储，需要注意：

1. 如果我创建导出到对象存储的时候选择最早的话，工作流会追溯所有的数据，一直追到最新的数据（全量数据）；
2. 如果我创建导出到对象存储的时候选择最新的话，工作流只从此时开始导数据（从此时开始的所有数据）；
3. 全量数据也只追溯到2天前，因为实时数据源和消息队列的数据存储时间只有2天。

**通过（LogKit/SDK/API ）打数据到工作流（workflow），我们在调用的时候要进行数据包封装，最好不要一次触发一次上报。**

#### 服务器性能监控 ####

>参考此文档-[服务器性能监控](https://qiniu.github.io/pandora-docs/#/demo/monitoring)进行构建的。

问题：

Q1: 运行 telegraf 报错：`create series diskio for repo monitor fail pandora error: StatusCode=404, ErrorMessage=E7100: Repo does not exist!`

A1: 我们可以提前创建好对应的 Repo ，也可以让程序在第一次使用的时候自动创建资源，如果存在以后就不会创建了。

#### 日志检索，构建容器应用 Kibana ####

>参考此文档-[运维日志分析 -- Nginx 日志分析搭建案例](https://qiniu.github.io/pandora-docs/#/demo/nginxlog)进行构建的。

问题：

Q0: LogKit 日志多久上报一次？

    查看[Runner之数据采集配置](https://github.com/qiniu/logkit/wiki/Runner之数据采集配置)。

Q1: `[ERROR][github.com/qiniu/logkit/mgr] runner.go:389: Runner[nginx_runner] parser nginx_parser error : NginxParser fail to parse log`

    Nginx log format 不匹配导致的（nginx-parser,grok-parser）。

Q2: CDN 日志延时多少？

    日志延迟 8 小时，不能做实时监控，只能用离线工作流来做。

Q3: LogKit 上报是什么规则？

    查看[Runner之数据采集配置](https://github.com/qiniu/logkit/wiki/Runner之数据采集配置)。

Q4: 一次请求最大支持多少？

    配置文件中可以配置，最大支持 2 MB，尽量将文件合并后上传，减少调用次数，查看[Runner之数据采集配置](https://github.com/qiniu/logkit/wiki/Runner之数据采集配置)。。

Q5: 上报到日志检索服务上怎么查看日志来源？

    LogKit 有一个可支持配置的日志来源的选项`datasource_tag`，更多请看[文档](https://github.com/qiniu/logkit/wiki/File-Reader)

Q6: 日志检索搜索结果只有最近几天的数据？

    需要配置参数 `retention`，创建之后默认保留 3 天。

*LogKit 非常强大，一定要抽时间阅读一下源码。*

#### 时序数据库，构建容器应用 Grafana ####

基本步骤：
进入时序数据库，创建仓库，创建仓库完成后，再进入仓库创建序列。

问题（感谢我的小伙伴整理了以下问题清单）：

Q0: 你们的时序数据库 TSDB+Grafana 和自建的 InfluxDB+Grafana 相比有什么优势？

- 减少运维成本
- 资源开销更少
- 自建的 InfluxDB 是单机版的，而我们的 TSDB 是可以水平扩容的；
- 我们的时序数据库 TSDB 还可以和我们的 workflow 结合，做各种各样的数据转换等功能。

Q1: 通过 API 创建仓库时出现 region 错误提示。

    TSDB 目前只支持华东区域资源服务器，代号为 nb ，需要指定。

Q2: 创建仓库、序列、数据查询过程中出现 bad token 提示。

    鉴权不通过，token 过期，检查 ak/sk 以及 token 。

Q3: 创建过工程中出现ak/sk错误。

- ak/sk 错误；
- 账号并没有添加 pandora 应用。

Q4: 插入数据时提示数据类型错误。
    
    通过 API 请求插入数据时，需要注意类型对应的问题，在请求封装时很有可能会因为 map[][]而忽略这个问题。

Q5: 使用 distinct 去重查询时，并且做 count 计算，数量不符。

    需要注意空字段的情况，字段为空时也占用一个量。

Q6: 使用 select tag 查询时出现错误  

- 首先需要检查字段是否错误。
- 在 TSDB 中，time 是一个默认的 tag ，在序列中也会自建 tag ，需要注意 tag 并不能作为查询主体，tag 只能作为分组以及查询条件。

Q7: TSDB 中 limit 与 offset 的使用。

    limit 使用时与 MySQL 一致，需要注意的是空数据的存在。

Q8: group by 与 order by

    group by 只能够对 timestamp 以及 tag 使用，order by 可以用来对 timestamp 使用，做时间聚合。

Q9: TSDB 时间类型

    RFC3339 YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ   使用时间作为查询条件时，可以采用如下运算符：
	
	= 等于  
	<> 不等于  
	!= 不等于  
	> 大于  
	>= 大于等于  
	< 小于  
	<= 小于等于 

    使用 TSDB 的 SDK 进行数据查询时，可使用 `time>'2017-09-18'` 的格式，
也可采用 InfluxDB 的时间格式 `now() - 1d`，
    需要注意的是在‘-’号左右都需要有空格，不然会提示语句出错:`E7200: Invalid sql: Invalid time condition, out of time range.`。  

    Query 语句不支持`select count(1) from stat_info where time >= '2017-09-19'`，
    报错：`E7200: Invalid sql, expected field argument in count()`，field 必须指定。

Q10: 在初始化创建 Client 时，是否还要通过 SDK 函数生成配置？

    需要通过 `sdk.NewConfig()` 生成配置，将其置于配置文件当中，否则就会出错。

Q11: 错误定义是怎样的？

    在 TSDB 中，在 `tsdb/error.go` 里面定义了错误类型，在开发时，可以进行引用，也可以通过 `logger.Error()` 进行输出，通过对照编码表查找错误原因。

Q12: API 建立仓库、序列。

    创建 Client 后，可以通过内置函数 `CreateRepo()` 以及 `CreateSeries()` 进行创建，参数定义在 `tsdb/model.go` 中，
    包含了需要传入的参数以及返回数据类型结构。
  
Q13: API 数据查询。

    可以通过 `client.QueryPoints()` 进行查询，参数为 query 语句，
    定义 query 语句传入即可进行数据查询，语法与 MySQL 以及 InfluxDB 大同小异。  

    返回类型包括：

	QueryOutput{}  
	Result{}  
	Serie{}  

    在这里常用的只需要返回 Serie 即可，通过 index 访问数据，
    在这里需要注意 index out of range ，所以需要进行非空判断，以免造成程序出错。

Q14: API 数据写入  

    可以通过 `client.WritePoints` 写入数据，需要注意区分 tags 与 fields ，
    通过参数 point 进行参数配置，包括 SeriesName（序列名）、tags、fields 。
  
Q15: 序列的字段类型定义。

    字段类型在创建序列时并不需要定义，在第一次传入数据时，根据传入数据的类型即定义了序列的字段类型，
    需要注意的是序列不支持复合类型，之后进行数据写入时，如果数据类型不一致，则会提示类型错误。
  
Q16: TSDB 存储期限

    目前最大支持 30 天，在自定义存储期限时，也只允许定义在 30 天之内。
  
Q17: 数据查询经常出现偏差(统计时较为明显)

- 确定语句是否按照标准，有一些语法与其他数据库不一致；
- 字段名称是否是 tsdb 关键字，如果是，需要通过双引号；
- 如果使用了 distinct ，需要考虑字段为空的情况；
- 如果使用了 order by 语句，需要考虑字段是否是 tag。

Q18: 有数据，但是查询语句没有结果。

    Where field 查询的时候要注意存储的类型和你查询的类型是否一致。

Q19: 在 Grafana 里面 where 语句不能智能提示？

    where 语句的下拉列表默认只智能提示 tag ，field 智能手动输入。

Q20: Grafana 的Dashboard支持分配给不同的组织吗？

    不支持，智能导出某个Dashboard，然后在其他角色下重新导入。

Q21: Grafana 的数据源支持导出吗？

    不支持，只能手动录入，同一个组织下可以共享数据源。

Q22: 统计指标多对页面加载有影响吗？
    
    一个页面的指标项太多会影响到整体的加载性能的。

#### 七牛 APM ####

iOS  https://github.com/pre-dem/pre-dem-objc

android https://github.com/pre-dem/pre-dem-android

bugly 偏向于崩溃收集，七牛 APM 偏向于移动性能分析。

### 其他 ###

1. 工作流即将支持状态，可以启动和停止；
2. 工作流即将增加行为日志；
3. 七牛是支持子账号的，有需要的可以申请开通；
4. 容器应用 Grafana 有自己的登录账号系统，Kibana 是用的七牛统一的账号鉴权体系；
5. Safari 可能默认是阻止弹窗的，记得允许弹窗；

## 总结 ##

1. 简单
2. 方便
3. 好用
4. 强大

## 扩展知识 ##

可能会涉及到的知识点或开源组件，项目：

1. InfluxDB
2. OpenTSDB
3. Grafana
4. Kibana
5. ElasticSearch
6. LogKit
7. Nginx
8. ...

## 参考资料 ##

1. https://qiniu.github.io/pandora-docs/
2. https://github.com/qiniu/logkit/wiki

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

---
layout: post
title: 'Timeout while executing shell script'
keywords: Zabbix, Timeout, monitor
date: 2018-01-21 08:15
description: '本文是我在使用zabbix时遇到的一个问题的一个总结。'
categories: [monitor]
tags: [Zabbix, Timeout]
comments: true
author: mai
---

* content
{:toc}

    本文是我在使用zabbix时遇到的一个问题的一个总结。

----

## 背景 ##

用 zabbix 的图表功能(Graphs)来展示了一个统计需求--同时在线用户数。

![all_established_connections.png](http://oqos7hrvp.bkt.clouddn.com/blog/all_established_connections.png)

## 操作步骤 ##

在 zabbix 上增加一个监控项：

1. 进入 zabbix-agent 机器；
2. 修改 zabbix 配置（`/etc/zabbix/zabbix_agentd.conf`）;
3. 增加 `UserParameter=monitor_name, <shell command>`;
4. 重启 zabbix-agent（`/etc/init.d/zabbix-agent restart`）;
5. 进入到 zabbix Dashboard 系统；
6. 找到 Configuration---> Hosts —>create host
7. 找到 Configuration---> Hosts —>create item
8. 找到 Configuration---> Hosts —>create trigger（{monitor_name.last(1m)}>500）(用于告警的触发器配置)
9. 找到 Configuration---> Hosts —>create graph
10. 全部配置好之后就可以查看到监控图了

如果你的UserParameter的 shell command 执行时间过长的话，就有可能出现无数据的情况。

查看 zabbix dashboard 的时候可以看到你对应的机器的指标会提示：`Timeout while executing shell script`。

解决办法有两个：
1. 优化 shell command 的执行时间开销。
2. 配置 zabbix-agent timeout的设置（默认是3s）。

```conf
### Option: Timeout
# Spend no more than Timeout seconds on processing
#
# Mandatory: no
# Range: 1-30
# Default:
# Timeout=3
Timeout=30
```


----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

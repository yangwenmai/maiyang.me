---
title: 'MySQL 连接数增长的命令详解'
keywords: MySQL, connection, increase, 排查, 过程
date: 2018-12-05T12:55:00+08:00
lastmod: 2018-12-05T12:55:00+08:00
draft: false
description: 'MySQL 连接数增长的命令详解'
categories: [MySQL]
tags: [MySQL, connection, increase, 排查, 过程]
comments: true
author: mai
---

## MySQL 命令查看

```sh
show full processlist;

# `show processlist` 命令查询了当前操作 MySQL 数据库的所有运行着的线程，发现 `xxxx` 数据库的好多连接线程都处于 *Sleep* 状态，这种状态表示等待客户端发送操作请求，并且随着时间的推移，*Time* 一栏的数值会越来越大，重启连接数据库的应用后这种情况消失，随着访问的增多又逐渐出现了这种现象。*Time* 一栏的时间数值也呈降序排列，此时的访问量并不高，说明每次访问数据库建立的连接可能没有被关闭，导致连接池饱和，出现连接请求超时的问题，也就是说有连接泄露的问题。

# 由于客户没有正确关闭连接已经死掉，已经放弃的连接数量。 
show status like '%Aborted_clients%'
Aborted_clients	107812

# 尝试已经失败的MySQL服务器的连接的次数。 
show status like '%Aborted_connects%'
Aborted_connects	42

show status like '%Connections%'
Connection_errors_max_connections	0
Connections	3689200 #试图连接MySQL服务器的次数。
Max_used_connections	3089
Max_used_connections_time	2018-11-15 08:57:14

show status like 'Threads%';
Threads_cached	78
Threads_connected	2968
Threads_created	19936 #Threads_created表示创建过的线程数，如果发现Threads_created值过大的话，表明MySQL服务器一直在创建线程，这也是比较耗资源，可以适当增加配置文件中thread_cache_size值，查询服务器
Threads_running	3 #Threads_connected 跟 show processlist 结果相同，表示当前连接数。准确的来说，Threads_running 是代表当前并发数

show variables like '%max_connections%';
max_connections	4532

show variables like 'thread_cache_size';
```

## 造成 *Sleep* 连接过多的原因？

1. 程序中可能存在没有及时关闭 MySQL 连接的情况；
2. 数据库查询不够优化，查询比较耗时；
3. 使用了太多持久连接；

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



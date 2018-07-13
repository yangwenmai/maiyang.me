---
layout: post
title: '任务调度浅析'
keywords: cron, task, schedule
date: 2016-02-24 09:00:00
description: 'golang 任务调度'
categories: [Golang]
tags: [cron, task]
comments: true
group: archive
icon: file-o
---

>在大型系统中，任务调度是一项基础性的需求。对于一些需要重复、定时执行或者耗时比较长的任务经常会被剥离出来单独处理，而随着任务规模与复杂性的上升，任务调度系统也就随需而生。设计良好的任务调度系统具备可靠性及伸缩性，它可以管理并监控任务的执行流程，以保证任务的正确执行。

<!--more-->

### Java ###

#### 原生支持 ####
1. java.util.Timer.scheduleAtFixedRate
2. java.util.concurrent.ScheduledThreadPoolExecutor

#### 第三方框架 ####

QuartZ，一句话来形容它。
>Java领域最强大、最丰富的任务调度框架。

很多开源的任务调度框架，都是基于QuartZ的。

>Elastic-Job是ddframe中dd-job的作业模块中分离出来的分布式弹性作业框架，基于成熟的开源产品Quartz和Zookeeper及其客户端Curator进行二次开发

### Ruby ###

rufus-scheduler，Ruby的scheduler，支持at, in, cron 和 every jobs。
>很强大，用法也很简单

### Golang ###
#### 原生支持 ####
time，结合ticker

#### 第三方框架 ####

1. kingtask，是一个由Go开发的异步任务系统，由kingshard的作者flike贡献。

2. machinery，基于分布式消息的异步队列/任务系统。
3. cron，基本是linux crontab的Go实现，做了一些优化，但是并不会等待执行结果再执行下一次，而是到时间就继续执行。
4. scheduler，基于cron，借鉴python库的scheduler实现的任务调度系统，且他的任务执行是根据上一次执行结束再开始下一次执行的。
类似于java.util.Timer.schedule.

后面将会进行源码分析，尽请期待😄。

### 延伸阅读 ###

1. [Quartz教程一：使用quartz](http://ifeve.com/quartz-tutorial-using-quartz/)
2. [rufus-scheduler](https://github.com/jmettraux/rufus-scheduler)
3. [当当网分布式任务调度框架](https://github.com/dangdangdotcom/elastic-job)
4. [awesome-go](https://github.com/avelino/awesome-go)
5. [kingtask](https://github.com/kingsoft-wps/kingtask)
6. [scheduler](https://github.com/carlescere/scheduler)
7. [cron](https://github.com/robfig/cron)
8. [machinery](https://github.com/RichardKnop/machinery)
9. [轻量级分布式任务调度框架](https://github.com/qq254963746/light-task-scheduler)
10. [当当网分布式任务调度框架](https://github.com/dangdangdotcom/elastic-job)

本文是“茶歇驿站”原创，多谢大家支持。
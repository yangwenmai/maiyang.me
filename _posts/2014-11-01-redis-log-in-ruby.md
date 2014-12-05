---
layout: post
title: '在ruby中redis客户端在log上的使用'
keywords: redis, log, ruby
date: 2014-11-01 10:30
description: '在ruby中redis客户端在log上的使用'
categories: [redis, log, ruby]
tags: [redis, log, ruby]
comments: true
group: archive
icon: file-o
---

如何跟进ruby项目中redis使用的时间开销？

方法：google ruby redis logger/github redis logger, 进而找到了好一些demo可用，然后从我实际测试来看，有以下两个gem还不错，目前在我们的线上环境使用。
Gemfile添加
> 
gem sidekiq-redis-logger

gem 'redis_logger', :git => "git://github.com/hellolucky/redis_logger.git"

<!-- more -->

sidekiq-redis-logger适用于ruby sinatra
打印log如下：
>


redis_logger适用于ruby on rails
打印log如下：
>
Redis >> GET user:1
Redis >> 22.45ms
Redis >> GET user:noti:1
Redis >> 8.64ms

增加此redis的logger监控后，可用很方便的排查出redis操作中最慢的key是什么，然后对此进行业务逻辑分析，找到性能瓶颈。
非常方便和好用。

后续有时间将对这两个redis logger的实现做一下深入分析。
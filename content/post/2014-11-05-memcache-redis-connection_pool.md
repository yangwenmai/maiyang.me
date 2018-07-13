---
layout: post
title: 'memcache和redis的连接池connection_pool使用'
keywords: memcache, redis, connection_pool, 连接池
date: 2014-11-05 10:30
description: 'memcache和redis在ruby中的客户端dalli和hiredis在高并发下连接池的使用'
categories: [ruby]
tags: [memcache, redis, ruby, 连接池]
comments: true
group: archive
icon: file-o
---

memcache 的Ruby客户端比较常用的是(DalliCache)[https://github.com/mperham/dalli]。
连接池项目(connection_pool)[https://github.com/mperham/connection_pool]。

<!--more-->
实战分析：

在application.rb 中添加

*redis*
> 
case ENV["RACK_ENV"]
when "production"
  REDIS = ConnectionPool::Wrapper.new(size: 10, timeout: 5) { 
  	Redis.new(:driver => :synchrony, :host => "10.1.1.1", :port => 6379)
  }
when "development"
  REDIS = ConnectionPool::Wrapper.new(size: 10, timeout: 5) { 
  	Redis.new(:driver => :synchrony, :host => "192.168.1.2", :port => 6379)
  }
end

*memcache*
> 
case ENV["RACK_ENV"]
when "production"
  Dalli.logger = logger
  DALLI_CACHE = ConnectionPool::Wrapper.new(size: 10, timeout: 5) { 
  	Dalli::Client.new("10.1.1.2:11211",
                {:threadsafe => true, :failover => true, :expires_in => 1.day, :compress => true})
	}
when "development"
  DALLI_CACHE = ConnectionPool::Wrapper.new(size: 10, timeout: 5) { 
  	Dalli::Client.new("192.168.1.2:11211",
                {:threadsafe => true, :failover => true, :expires_in => 1.day, :compress => true})
	}
end

需要使用到redis或者memcache的时候，直接使用即可，并发支持最大量为配置的size的个数，每个连接的超市时间是5秒。

但是DalliCache不支持text协议的memcache集群。

如果需要集群，则只能根据文档来解决。

[issues](https://github.com/mperham/dalli/issues/454)

dalli作者的官方答复：

> 
twemproxy does not support the memcached binary protocol.

[Use an SSH tunnel instead.](https://help.ubuntu.com/community/SSH/OpenSSH/PortForwarding#Local_Port_Forwarding)

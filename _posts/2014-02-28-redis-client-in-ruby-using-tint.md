---
layout: post
title: 'redis在Ruby上客户端使用疑云'
date: 2014-02-28 03:24
comments: true
categories: [ruby, rails, redis, hiredis, synchrony]
---
ruby中使用redis客户端
1. 首先在Gemfile里面添加
	gem 'hiredis'
  gem 'redis'
2. 然后在主目录下的application.rb文件里面添加
	
	case ENV["RACK_ENV"]
	when "production"
	  REDIS = Redis.new(:driver => :hiredis, :host => "10.6.4.179", :port => 6379)
	when "development"
	  REDIS = Redis.new(:driver => :hiredis, :host => "192.168.1.70", :port => 7000)
	end

3. 然后在各自的controller里面就可以直接使用REDIS的各种命令了

疑云：
    如果使driver的值为synchrony时，
    在并发的情况下REDIS.incr(key)得到的值有时候返回0,
    在并发的情况下REDIS.smembers(key)得到字符'ok',或者数字1,或者incr的自增数字，但是我程序里面是不可能是数字，而是类似"11123:1381120202",至少有一个":"。
    这个异常情况很是让我捉急啊，后面我将driver替换成hiredis之后，在并发的时候就无上述问题了。
  （备注：并发数很低，只是手工触发请求）
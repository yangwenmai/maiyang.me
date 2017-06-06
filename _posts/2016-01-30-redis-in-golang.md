---
layout: post
title: 'Golang redis.v3源代码分析'
keywords: redis, golang
date: 2016-01-30 00:00
description: 'redis golang客户端源代码分析'
categories: [golang]
tags: [redis]
comments: true
group: archive
icon: file-o
---

今天要跟大家剖析的是redis.v3，一个在Golang上的redis客户端库。

redis本身的内容，我就不多说了，有很多书籍可以查阅。

<!-- more -->

比方说：
[《Redis实战-译本》](http://redisinaction.com/)、[《Redis设计与实现-第一版》](http://origin.redisbook.com/)、[《Redis设计与实现-第二版》](http://redisbook.com/)，这三本书都是跟黄健宏有关。

如果想深入了解和学习Redis，那以上两本书（三本书）都值得拥有。

今天我不是来推荐书的，所以不再多说，直接来干货部分。

## redis.v3 ##

重点介绍以下几个文件`redis.go`,`command.go`,`commands.go`,`pool.go`。

redis初始化：

>redisClient := redis.NewClient(redis.Options{})

在NewClient中重要的是Options,在源代码`redis.go`中的L92有定义。

初始化之后，就可以开始使用`redisClient`了。

举例说明，SortedSet（有序集合）

我今天要说的是，在一系列设置之后，我们允许会有以下的log输出。

>ZADD one: 0 [redis.go L52]

跟踪源码，我们发现L52的内容是`c.opt.Logger(cmd.String())`

就这一行就隐含着多个信息。

1. redisClient的Optins配置的Logger
2. redisClient cmd字符串表达

通过源码，可以很明显的知道cmd是`Cmder`类型。

	type Cmder interface {
	args() []string
	parseReply(*bufio.Reader) error
	setErr(error)
	reset()

	writeTimeout() *time.Duration
	readTimeout() *time.Duration
	clusterKey() string

	Err() error
	String() string
}

所以直接看String的方法实现是什么，就能得知，log中输出的内容是从何而来。

	return cmdString(cmd, cmd.val)

cmdString的实现

	s := strings.Join(cmd.args(), " ")
	if err := cmd.Err(); err != nil {
		return s + ": " + err.Error()
	}
	if val != nil {
		return s + ": " + fmt.Sprint(val)
	}
	return s


看到这里，我相信大家应该知道 ZADD one: 0 的来源了吧。

查看`commands.go`中ZADD函数，


	args := make([]string, 2+2*len(members))
	args[0] = "ZADD"
	args[1] = key
	for i, m := range members {
		args[2+2*i] = formatFloat(m.Score)
		args[2+2*i+1] = m.Member
	}
	cmd := NewIntCmd(args...)
	c.Process(cmd)


这段代码，需要特别关注`cmd := NewIntCmd(args...)`, 它的核心方法`parseReply`,解析之后，我们可以看到会把结果值赋值给cmd.val,疑惑出现了，刚刚打印的为什么是0呢？

我们再回过头来看`redis.go`中的process方法L42,L52,

`cmd.reset()`紧接着就是`cmd.String()`,那串打印，大家是否明白了呢！？

还不明白么？

请看`command.go`L246,L247,`cmd.val=0`。

追根溯源，终于知道那一串打印是从何而来了，对redis.v3的客户端内部实现也更熟悉了，其他cmd都类似，还想了解更多就仔细阅读源代码吧。

不知道算不算是干货呢，反正我明白了其中的原因，希望能对大家有所帮助。
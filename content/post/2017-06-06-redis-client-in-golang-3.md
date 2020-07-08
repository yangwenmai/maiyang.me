---
layout: post
title: 'gopkg.in/redis.v3 源码分析'
keywords: redis, golang
date: 2017-06-06 23:45:00
description: 'redis golang 客户端源码分析之3'
categories: [Golang]
tags: [redis,golang]
comments: true
group: archive
icon: file-o
---

	本文耗时60分钟，阅读需要10分钟。

----

今天要跟大家剖析的是 redis client in golang `gopkg.in/redis.v3`

### 前文回顾

其实在此之前，我已经对这个库的源码进行过初步介绍和分析了。

[Golang redis.v3源代码分析](http://maiyang.github.io/golang/2016/01/30/redis-in-golang)
[Golang redis.v3 源代码再分析](http://maiyang.github.io/golang/2016/01/31/redis-in-golang2)

### 为什么还要来分析呢？

主要是最近我们线上环境使用到redis的一个服务出现了这样的错误信息:

```
redis: connection pool timeout
...
redis: you open connections too fast (last error: xxx)
```

错误信息提示的很清楚，超时之后又是打开连接太快了。

应该不难理解，其实就是当连接池里面的连接超时不可用了之后，再重新创建，但是因为业务量对于redis连接数的诉求比较大，所以短时间内就出现了超过设定的连接池大小了，而这个错误是超过其预设连接池的2倍就会触发。

为什么是2倍呢？带着这样的问题，我就开始查看错误信息的来源[源码 gopkg.in/redis.v3/pool.go#L199]

注意我这里提供的源码项目版本是:
```yaml
{
			"ImportPath": "gopkg.in/redis.v3",
			"Comment": "v3.1.4-1-g5f975ec",
			"Rev": "5f975ec92c05174cbde7254f204219ab6966c15e"
}
```

备注:GitHub 上已经没有3.1.4.1的分支了，那我直接给大家贴源码吧。

<!--more-->

````go
// 来源于:pool.go
// Establish a new connection
func (p *connPool) new() (*conn, error) {
	if p.rl.Limit() {
		err := fmt.Errorf(
			"redis: you open connections too fast (last error: %v)",
			p.lastDialErr,
		)
		return nil, err
	}

	cn, err := p.dialer()
	if err != nil {
		p.lastDialErr = err
		return nil, err
	}

	return cn, nil
}
```

注意`p.rl.Limit()`，通过[ratelimit](https://github.com/bsm/ratelimit)源码，就很清楚的知道，这里是被限速了。

接下来再来看看这个限速是在什么地方预设的:
````go
func newConnPool(opt *Options) *connPool {
	p := &connPool{
		dialer: newConnDialer(opt),

		rl:        ratelimit.New(2*opt.getPoolSize(), time.Second),// 限速: 每秒创建连接不超过配置连接池的2倍
		opt:       opt,
		conns:     newConnList(opt.getPoolSize()),
		freeConns: make(chan *conn, opt.getPoolSize()),
	}
	if p.opt.getIdleTimeout() > 0 {
		go p.reaper()
	}
	return p
}

// ...

func NewClient(opt *Options) *Client {
	pool := newConnPool(opt)
	return newClient(opt, pool)
}
```

## 参考资料 ##

1. [go-redis(gopkg.in/redis.v3)](https://github.com/go-redis/redis/tree/v3.6.4)
2. [ratelimit](https://github.com/bsm/ratelimit)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

---
layout: post
title: 'Golang redis.v3 源代码再分析'
keywords: redis, golang
date: 2016-01-31 09:30
description: 'redis golang客户端源代码再分析'
categories: [Golang]
tags: [redis]
comments: true
group: archive
icon: file-o
---

今天继续跟大家来剖析Golang redis.v3，一个在Golang redis client。

昨天的文章发出之后，有读者反馈
>你是明白了，你还要让所有用户都打开源码才知道你说的啥么... 还是在手机上..... 建议把涉及的关键源码也贴出来 手机就无障碍理解你的意思了。

再次感谢这位朋友，是你让我重新审视昨天发的文章。在手机上无法看到关键代码，很难理解文中的源码分析，所以今天再进行分析，希望今天的部分可以让大家无障碍的阅读和学习，且在文章内容上也做了进一步的深入。

<!--more-->

还是继续推荐[黄健宏](http://huangz.me/)de书籍：
>[《Redis实战-译本》](http://redisinaction.com/)
>
>[《Redis设计与实现-第一版》](http://origin.redisbook.com/)，注：虽然是基于2.6的，但是完全不影响我们对redis基本数据结构的学习，暂时不想买书的朋友，可以看这本。而且还有[基于2.6的源代码注释](https://github.com/huangz1990/annotated_redis_source)
>
>[《Redis设计与实现-第二版》](http://redisbook.com/),[基于3.0的源代码注释](https://github.com/huangz1990/redis-3.0-annotated)


以上两本书，你都值得拥有。

说到这里，大家以为我是软文了，其实真不是的。能专注做一件事很不简单，何况作者专注了这么长时间，作者是90后哦，看过作者的简介，我相信没人不佩服他。

## redis client初始化 ##

该redis客户端支持连接池的，基本的redis初始化代码如下图：
![NewClient](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5cy4zj5JPKZmCMib5BWJplUbscXibr7MyLT5Lsle3wfNsYwD8l8mvPia4bQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

### 初始化配置选项 ###

NewClient的参数是redis.Options，

参数说明如下图：
![Options](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5cYAFMajAXd0FDolJqciaYJfUrP8f8xvBFl5752SyMwKz5EiaGE82xwQ5A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

### 例子分析 ###

今天换一个例子来说明，String（字符串）

当我们在初始化redis client的时候，配置了Logger之后，在进行redis操作的时候就会按照其logger格式化输出。

代码如下图：
![redis_logger](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5csmSzz1U2cxcv1cxorCTtib9GTDEHDusElELAyyicfEt8pBATN7zk0vIg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

通过logger输出，会打印

>SET one:  [redis.go 52]

昨天例子中:之后输出的是0，今天:之后是""，这是为什么呢？

因为不管是什么类型的cmd，都会调用reset(), 基本默认值是nil

![redis_cmd](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5cJiaqDIj05agTlGBw5yFriccKeI2WUCEtmiay3b8Z7XQ8UCrzYukZJ9vJQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

不同的cmd有不同的默认值：0, false, "", nil,

## 补充 ##
接下来详细分析一下`command.go`

按照Java的编程思想，有以下这些cmd的实现：
`IntCmd`, `StatusCmd`,`SliceCmd`,`DurationCmd`,`BoolCmd`,`StringCmd`,`FloatCmd`,`StringSliceCmd`,`BoolSliceCmd`,`StringStringMapCmd`,`StringIntMapCmd`,`ZSliceCmd`,`ScanCmd`,`ClusterSlotCmd`,

他们都有`baseCmd` struct 属性。

大家应该会很纳闷，为什么会有这么多呢？特别的`StatusCmd`和`StringCmd`感觉没什么差别。

根据我的初步分析，Status很明显是跟状态有关，具体的查看下面两个代码，应该可以很容易看出来。【这个为什么这么用，暂时不知道】

详细对比cmd对应实现了的方法，其实StringCmd比StatusCmd多以下方法`Int64()`,`Uint64()`,`Float64()`,他们只是将String转换成对应的类型而已。

![redis_get](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5cbs2yswUtMLoiaNmkibrVY7ThHiaJSKF0ibGCezyt3LFWr0qsLl2fXbWdOQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)
![redis_status](http://mmbiz.qpic.cn/mmbiz/2jnWxKdgFb9k6QJiamAcT39l64bJe1N5cKuRswaHfFr8r02BCDnRJzhtI5bfZsYFUHyibTk07qIxicd4C5mjCEHvg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

当然，你觉得对你有帮助，也可以给我打赏。
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/wxpay.png)
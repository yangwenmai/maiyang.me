---
layout: post
title: 'Golang 调度器原理分析'
keywords: golang, scheduler
date: 2018-02-09 11:00:00
description: 'Golang 调度器原理分析'
categories: [Golang]
tags: [Golang, scheduler]
comments: true
author: mai
---

    本文是 Golang 调度器原理分析。

----

## 参考资料

1. http://tonybai.com/2017/06/23/an-intro-about-goroutine-scheduler/
2. https://www.zhihu.com/question/20862617?rf=45525005

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

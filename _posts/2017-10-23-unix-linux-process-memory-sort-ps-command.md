---
layout: post
title: 'Linux 怎么用 ps 命令对内存使用量排序？'
keywords: linux, unix, ps, sort, memory
date: 2017-10-23 15:30
description: 'Linux 怎么用 ps 命令对内存使用量排序？'
categories: [Linux]
tags: [linux, ps, memory]
comments: true
group: archive
icon: file-o
---

    本文是介绍 Linux 怎么用 ps 命令对内存使用量排序？

----

<!--more-->

Linux CentOS 下执行：
>ps aux --sort -rss

--sort 排序子命令
-rss 是指对rss列进行排序（降序）
rss 则是指对rss列进行排序（升序）

## 参考资料 ##

1. https://alvinalexander.com/linux/unix-linux-process-memory-sort-ps-command-cpu

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

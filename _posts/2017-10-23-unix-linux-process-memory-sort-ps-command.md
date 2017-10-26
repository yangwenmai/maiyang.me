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

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

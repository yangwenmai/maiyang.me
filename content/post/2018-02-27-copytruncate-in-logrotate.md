---
layout: post
title: '日志切割 logrotate 之 copytruncate'
keywords: logrotate, copytruncate
date: 2018-02-22 22:00:00
description: '日志切割 logrotate 之 copytruncate'
categories: [log]
tags: [logrotate, copytruncate]
comments: true
author: mai
---

    本文是对于 logrotate 日志切割的一点点小总结。

----

我们在使用 logkit 上报 Nginx 日志数据的时候，发现被切割之后，无法正常上传了。

我们的 logrotate 配置使用的是 copytruncate，它不会导致文件 inode 变化，但是 logkit 又是根据文件的 inode 来设置 offset 的，所以 inode 没变我们的 logkit 读取的 offset 还是在老的 Offset，所以新文件的新数据在没有超过 offset 之前是上传不了数据的。

紧接着我们就重新配置 logratete ，然后再执行 `kill -USR1 pid`，log 并没有重新执行切割。
因为没有 move 掉老的 log，nginx 检测到文件还在，这个 USR1 的 signal 没有生效。

一般情况下，nginx的配置是不用 copytruncate 的。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/logrotate_copytruncate.jpg)

## 扩展阅读

1. https://www.digitalocean.com/community/tutorials/how-to-configure-logging-and-log-rotation-in-nginx-on-an-ubuntu-vps

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

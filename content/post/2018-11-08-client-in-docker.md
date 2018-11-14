---
title: 'Docker 客户端（MySQL、Redis）工具'
keywords: Docker, MySQL, Redis, Client
date: 2018-11-08T10:27:00+08:00
lastmod: 2018-11-08T10:27:00+08:00
draft: false
description: 'Docker 客户端（MySQL、Redis）工具'
categories: [Docker]
tags: [Docker, MySQL, Redis, Client]
comments: true
author: mai
---

## MySQL

通过 docker 来启动一个 MySQL client:

```sh
$ docker run -it --rm jbergknoff/mysql-client mysql -h 192.168.0.10 -p 3306
```

## Redis

通过 docker 来启动一个 Redis client:

```sh
$ docker run -it --rm redis:4-alpine redis-cli -h 192.168.0.10 -p 6379
```

## 参考资料

1. [https://hub.docker.com/r/jbergknoff/mysql-client/](https://hub.docker.com/r/jbergknoff/mysql-client/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

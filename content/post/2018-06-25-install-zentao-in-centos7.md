---
layout: post
title: '在 CentOS 7 中安装禅道'
keywords: CentOS, zentao, 禅道
date: 2018-06-25 07:40:00
description: '在 CentOS 7 中安装禅道'
categories: [linux]
tags: [linux, CentOS, zentao, 禅道]
comments: true
author: mai
---

    这是一篇禅道的安装说明文章。

----

运行前请安装docker环境。

```shell
mkdir -p /data/zbox && docker run -d -p 80:80 -p 3306:3306 \
        -e USER="root" -e PASSWD="password" \
        -e BIND_ADDRESS="false" \
        -v /data/zbox/:/opt/zbox/ \
        --name zentao-server \
        idoop/zentao:latest
```

注意: 运行前请确认容器要暴露的端口，如示例中的 **"80"** 和 **"3306"** 端口没有被宿主机的其他程序占用.

容器环境变量参数说明:

- USER : 设置参数为禅道数据库管理 Admin 的账号名，必填项.
- PASSWD : 设置参数为禅道数据库管理 Admin 的账号密码，必填项.
- BIND_ADDRESS : 若设置参数为 `"false"` ，禅道数据库启动后允许远程访问,选填。因为挂载出来后也可手动修改 `"zbox/etc/mysql/my.cnf"` 配置文件.


DockerHub地址: [https://hub.docker.com/r/idoop/zentao/](https://hub.docker.com/r/idoop/zentao/)

GitHub仓库地址: [https://github.com/idoop/zentao](https://github.com/idoop/zentao)

## 参考资料

1. [使用docker镜像运行禅道](http://www.zentao.net/thread/87209.html)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

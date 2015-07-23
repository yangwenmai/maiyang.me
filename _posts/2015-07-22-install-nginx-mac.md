---
layout: post
title: '在Mac上安装nginx'
keywords: Mac, nginx, install
date: 2015-07-22 20:46
description: '在Mac上安装nginx'
categories: [Mac, nginx, install]
tags: [Mac, nginx, install]
comments: true
group: archive
icon: file-o
---

首先，你得安装好`homebrew`.

然后在命令行终端执行：

`brew install nginx`
....
----

通过homebrew，nginx默认被安装在`/usr/local/Cellar/nginx/1.6.2`, conf文件默认被安装在`/usr/local/etc/nginx/nginx.conf`

然后再浏览器中键入`http://localhost:8080`,即可访问到nginx的欢迎界面。

在开发过程中，我们可能还期望将端口去掉，绑定域名提供测试。

<!-- more -->

解决办法：

1. 创建新的目录conf.d，`/usr/local/etc/nginx/conf.d`
2. 创建单个服务所需的conf文件`default.conf`，`/usr/local/etc/nginx/conf.d/default.conf`
3. 然后将nginx的主文件`nginx.conf`中的server{}删除，替换成 `include /usr/local/etc/nginx/conf.d/*.conf`, nginx将可以加载存放在conf.d目录下的所有conf文件了。

sudo重启nginx。

如果遇到不能访问的情况，请前往nginx log目录：`/usr/local/var/log/nginx/*.log`，查看原因。

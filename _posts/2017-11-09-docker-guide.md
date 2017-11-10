---
layout: post
title: 'Docker-Compose 管理多个 Docker 容器构建自己的 Wordpress'
keywords: Docker, Docker-Compose, Wordpress
date: 2017-11-10 23:33
description: 'Docker-Compose 管理多个 Docker 容器构建自己的 Wordpress'
categories: [docker]
tags: [Docker-Compose, Docker, Wordpress]
comments: true
author: mai
---

* content
{:toc}

    本文是一篇Docker-Compose管理多个Docker容器的一个构建 Wordpress 的入门级指南。

----

Docker的安装和使用，以及 Docker 基本使用命令，都可以参考官网，我这里只是简单介绍一下：

## 安装 ##

>见官网。

## 拉取镜像 ##

安装好之后，执行拉取镜像。

>docker pull mysql

>docker pull wordpress

## 编辑 docker-compose.yml ##

在你确定的目录下开始管理docker-wordpress服务，比方说`~/docker_wordpress/`

```yml
version: '2' # 注意这里不能为1
services:
    web:
        image: wordpress:latest ## 使用wordpress最新的镜像
        depends_on: # 依赖db服务
            - db
        links: # 链接到的服务
            - db
        ports: # 端口主机映射，在外面用8002访问，80是docker服务里面的端口。
            - "8002:80"
        environment: # 环境变量
            WORDPRESS_DB_HOST: db:3306 # 因为上面已经links，所以会自动寻址。
            WORDPRESS_DB_PASSWORD: 123456
        volumes:
            - ./data:/var/www/html # 挂载卷，拉镜像会把wordpress下载到./data目录下，然后再把它挂载到容器上的/var/www/html目录下，这样如果有需要的话，我们可以直接在./data本地目录下进行修改即可。
    db:
        image: mysql
        ports:
            - "8003:3306" # 映射8003位数据库的对外端口，你如果使用 MySQL 客户端连接的话，就需要使用 8003.
        environment:环境
            - MYSQL_ROOT_PASSWORD=123456
        volumes:
            - ./mysql/data:/var/lib/mysql # MySQL 的数据存储位置
            - ./mysql/conf:/etc/mysql/conf.d # MySQL 的配置存储位置
```

## MySQL 数据库配置 ##

给 MySQL 和 wordpress 存储创建目录，

```
mkdir -p ./mysql/conf
mkdir -p ./mysql/data
mkdir -p ./data
```

然后再配置 MySQL 的基本配置：`vim ./mysql/conf/my.cnf`

```conf
[mysqld]
max_connections = 20000
max_connect_errors = 4000
open_files_limit = 65535
table_open_cache = 1000
skip-name-resolve
```

## 启动 ##

后台启动 docker 服务:`docker-compose up -d`。

![](http://oqos7hrvp.bkt.clouddn.com/blog/docker-compose-up-d.png)

浏览器访问 [http://127.0.0.1:8002/](http://127.0.0.1:8002/) ，有可能出现转菊花的情况，这个是因为 wordpress 正在后台运行创建数据库等初始化操作。

加载完全之后显示如下：

![](http://oqos7hrvp.bkt.clouddn.com/blog/docker_wordpress.png)

数据库访问：root:123456 端口 8003

![](http://oqos7hrvp.bkt.clouddn.com/blog/docker_mysql.png)

## 其他指令 ##

查看当前正在运行的 docker 有哪些：`docker ps`，可以加一个`-a`参数，用于查看所有 docker（包括未运行的）,查看运行的 docker 服务有哪些？

![docker-compose-ps](http://oqos7hrvp.bkt.clouddn.com/blog/docker-compose-ps.png)

查看服务器运行日志：`docker-compose logs -f`

![docker-compose logs -f](http://oqos7hrvp.bkt.clouddn.com/blog/docker-compose-logs.png)

如果要删除某个docker服务的话，可以执行`docker-compose stop`，`docker-compose rm`

![](http://oqos7hrvp.bkt.clouddn.com/blog/docker-compose-stop-rm.png)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

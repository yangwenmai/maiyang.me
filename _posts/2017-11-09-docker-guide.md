---
layout: post
title: '基于 Docker 构建 Wordpress'
keywords: Docker, Docker-Compose, Wordpress
date: 2017-11-10 23:33
description: '基于 Docker 构建 Wordpress'
categories: [docker]
tags: [Docker-Compose, Docker, Wordpress]
comments: true
author: mai
---

* content
{:toc}

    本文是一篇基于 Docker 构建 Wordpress 的入门级指南。

----

Docker 的安装以及 Docker 基本命令，都可以参考官网了解和学习，我这里只是简单介绍一下如何构建 Wordpress：

## 基本准备之一安装 Docker ##

>见官网。

常用的命令：

- `docker --version`
- `docker-compose --version`
- `docker-machine --version`
- `docker ps`
- `docker ps -a`
- `docker run hello-world` # 如果能显示：“”，则表示docker安装成功了。
    - Hello from Docker! This message shows that your installation appears to be working correctly.
- `docker run -it -rm ubuntu:latest bash` # 启动一个ubuntu，并且进入bash命令行
- `docker run -d -p 80:80 --name webserver nginx` # 启动一个Nginx

## 基本准备之二 ##

拉取镜像：

>docker pull mysql

>docker pull wordpress

<!--more-->

## 配置所需 ##

在你确定的目录下开始安装 wordpress，比方说`~/docker_wordpress/`

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

```yml
version: '2' #Docker Compose 发展至今，有 Version 1、Version 2、Version 3 三个大版本。如果不声明版本，默认为 Version 1。Version 1 不能使用 volumes,、networks、 build参数。Version 2，必须在版本中申明，所有的服务，都必须申明在 service 关键字下。Version 3 删除了 volume_driver、volumes_from、cpu_shares、cpu_quota、cpuset、mem_limit、memswap_limit、extends、group_add关键字，新增了 deploy，全面支持 Swarm mode。更详细的比较可以查看参考链接
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

##启动docker某个image（镜像）的container（容器）##

如果想再次打开这个container，运行：

`docker start goofy_almeida`

其中“goofy_almeida”是容器的名称。

##进入container（容器）##

使用“docker attach”命令进入

>使用“docker attach”命令进入container（容器）有一个缺点，那就是每次从container中退出到前台时，container也跟着退出了。

使用“docker exec -it”命令进入

>要想退出container时，让container仍然在后台运行着，可以使用“docker exec -it”命令。每次使用这个命令进入container，当退出container后，container仍然在后台运行，命令使用方法如下：

`docker exec -it goofy_almeida /bin/bash`

Container crashes with code 137 when given high load
》
https://github.com/moby/moby/issues/22211


## 参考资料 ##

1. https://www.centos.bz/2017/09/从零开始使用-docker-打包-django-开发环境-3-docker-compose/


----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

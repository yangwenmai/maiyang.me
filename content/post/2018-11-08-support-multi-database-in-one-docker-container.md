---
title: '如何在一个 Docker 容器中支持多个数据库？'
keywords: Docker, Database, Container
date: 2018-11-08T11:27:00+08:00
lastmod: 2018-11-08T11:27:00+08:00
draft: false
description: '如何在一个 Docker 容器中支持多个数据库？'
categories: [docker]
tags: [Docker, Database, Container]
comments: true
author: mai
---

## MySQL 镜像

`init.sql`:

```sql
CREATE USER 'drone'@'%' IDENTIFIED BY 'drone_123456';
GRANT ALL ON drone.* TO 'drone'@'%';
FLUSH privileges;
CREATE DATABASE IF NOT EXISTS `drone`;
```

`docker-compose.yaml`:

```yaml
services
  mysql-server:
    image: mysql:5.7.23
    restart: always
    #    command: --init-file /sql/init.sql
    volumes:
      - ./mysql/data/:/var/lib/mysql
      - ./mysql/logs:/logs
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
```

可以用两种方式： volumes:`/docker-entrypoint-initdb.d/init.sql` 和 command: `--init-file`

## 探讨

为什么不在 mysql image 中直接给予支持呢？比方说这样：

```
services
  mysql-server:
    image: mysql:5.7.23
    environment:
      - MYSQL_ROOT_PASSWORD=xxx
      MYSQL_DATABASE:
        - D1
        - D2
```

详细讨论如下：

Support multiple databases creation：
- https://github.com/docker-library/mariadb/issues/15
- https://github.com/docker-library/postgres/pull/332

Creation multiple users and databases：
- https://github.com/docker-library/postgres/pull/240

解决方案：

https://github.com/laradock/laradock/issues/616
https://gist.github.com/MKagesawa/a03892b8c44c015cd991c2c5311f1768
https://github.com/docker-library/mysql/pull/18#issuecomment-188373946

具体的脚本如下：

```sh
command:
	sh -c "
      echo 'CREATE DATABASE IF NOT EXISTS firstDB; CREATE DATABASE IF NOT EXISTS secondDB;' > /docker-entrypoint-initdb.d/init.sql;
      /usr/local/bin/docker-entrypoint.sh --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    "
```

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

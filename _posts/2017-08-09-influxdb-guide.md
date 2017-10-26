---
layout: post
title: 'InfluxDB 入门指南'
keywords: influxdb, centos, install
date: 2017-08-09 06:10
description: 'InfluxDB 入门指南，一步一步的带你构建一个你自己的 InfluxDB 时间序列数据库。'
categories: [influxdb]
tags: [influxdb, CentOS, guide, install]
comments: true
group: archive
icon: file-o
---

* content
{:toc}

    本文耗时 1小时10分钟，预计阅读/实战时长 1 小时（要多练习）。

----

InfluxDB 用 Go 语言编写的一个开源分布式时序、事件和指标数据库，和传统是数据库相比有不少不同的地方。
类似的数据库有 Elasticsearch、Graphite 等。

一般用来储存实时数据，配合一套 UI 界面（Grafana）来展示统计信息。

## 安装使用 ##

下载链接

https://portal.influxdata.com/downloads#influxdb

选择 InfluxDB (Time-Series Data Storage) V1.3.2(最新版)

根据不同的操作系统，这里提供了不同的下载安装指引。

注意：InfluxDB 的安装是需要 root 账号或者有管理员账号权限的账户。

<!--more-->

### 各种平台的各种下载安装方式 ###

OS X (via Homebrew)

```
brew update
brew install influxdb
```

Docker Image

```
docker pull influxdb
```

Ubuntu & Debian

```
wget https://dl.influxdata.com/influxdb/releases/influxdb_1.3.2_amd64.deb
sudo dpkg -i influxdb_1.3.2_amd64.deb
```

RedHat & CentOS

```
wget https://dl.influxdata.com/influxdb/releases/influxdb-1.3.2.x86_64.rpm
sudo yum localinstall influxdb-1.3.2.x86_64.rpm
````

Windows Binaries (64-bit)

```
wget https://dl.influxdata.com/influxdb/releases/influxdb-1.3.2_windows_amd64.zip
unzip influxdb-1.3.2_windows_amd64.zip
```

Linux Binaries (64-bit)

```
wget https://dl.influxdata.com/influxdb/releases/influxdb-1.3.2_linux_amd64.tar.gz
tar xvfz influxdb-1.3.2_linux_amd64.tar.gz
```

Linux Binaries (32-bit)

```
wget https://dl.influxdata.com/influxdb/releases/influxdb-1.3.2_linux_i386.tar.gz
tar xvfz influxdb-1.3.2_linux_i386.tar.gz
```

Linux Binaries (ARM) MD5: 2eee010e6e86f26a81f23dba5e52b8f4

```
wget https://dl.influxdata.com/influxdb/releases/influxdb-1.3.2_linux_armhf.tar.gz
tar xvfz influxdb-1.3.2_linux_armhf.tar.gz
```

执行完以上的命令之后，即可安装完成。

### 网络 ###

默认情况下，InfluxDB 以下网络端口是必须的：

- TCP 8086 用于 InfluxDB HTTP API 客户端连接器的端口。
- TCP 8088 用于 备份和恢复的 RPC 服务。

以下端口默认是关闭的：

- TCP 2003 运行 Graphite 服务的默认端口
- TCP 4242 运行 OpenTSDB 服务的默认端口
- TCP 8089 运行 UDP 服务的默认端口
- TCP 25826 运行 Collected 服务的默认端口

另外，InfluxDB 还附带提供了其他很多插件，也需要一些端口（自定义端口）。
所有的端口映射都可以在配置文件中进行配置，默认安装的配置文件路径是：`/etc/influxdb/influxdb.conf`


### 配置 ###

默认的配置文件在`/etc/influxdb/influxdb.conf`

The system has internal defaults for every configuration file setting. View the default configuration settings with the influxd config command.

系统为每一个配置设置都有一个内部默认值。 
查看默认配置的命令是：`influxd config`。

在`/etc/influxdb/influxdb.conf`默认文件中，很多配置都是注释掉的，所有注释掉的配置项都会选用系统默认的内部配置。任何配置文件里面没有注释的配置都会覆盖内部配置。并且本地配置不需要覆盖每一个配置项。

有两种方法运行指定配置文件：

1. 启动时指定配置文件。

`influxd -config /etc/influxdb/influxdb.conf`

2. 设置 INFLUXDB_CONFIG_PATH 环境变量。

`
echo $INFLUXDB_CONFIG_PATH /etc/influxdb/influxdb.conf

influxd
`

他们两者的优先级：influx启动时首先会去检查的，然后才是去查看环境变量参数。

更多的配置信息：https://docs.influxdata.com/influxdb/v1.3/administration/config


### 运行 ###

如果你的系统是`CentOS 6`,则：

```
sudo yum install influxdb
sudo service influxdb start
sudo service influxdb restart
sudo service influxdb stop
```

如果你的系统是`CentOS 7+, RHEL 7+`,则：

```
sudo yum install influxdb
sudo systemctl start influxdb
```

## 在 AWS 怎么构建？ ##

推荐使用两个 SSD 磁盘，一个给 `influxdb/wal`,一个给 `influxdb/data`.

根据你系统的负载每个磁盘应该有 1k-3k 的 IOPS。
`influxdb/data` 磁盘应该有更大的磁盘空间，相对低一些的 IOPS，`influxdb/wal` 磁盘应该有更高的 IOPS 相对较少的磁盘空间。

每台机器至少 8GB 内存。

在 AWS 上，使用 R4 比 C3/C4/M4 提供更多的内存。

### 配置 ###

```
...

[meta]
  dir = "/mnt/db/meta"
  ...

...

[data]
  dir = "/mnt/db/data"
  ...
wal-dir = "/mnt/influx/wal"
  ...

...

[hinted-handoff]
    ...
dir = "/mnt/db/hh"
    ...
```

### 权限 ###

当我们在使用非标准的 InfluxDB 数据目录和配置时，你要确保设置了正确的系统权限。

```
chown influxdb:influxdb /mnt/influx
chown influxdb:influxdb /mnt/db
```

接下来将简单介绍一下 InfluxDB 的使用。

![InfluxDB 基础关系](http://upload-images.jianshu.io/upload_images/1508430-d932d8d72f4e41e7.png)

## InfluxDB 使用 ##

InfluxDB 启动成功后，在命令行中运行`influx`即可进入命令行模式。

```
[mai@centos ~]$ influx
Connected to http://localhost:8086 version 1.3.2
InfluxDB shell version: 1.3.2
> show databases;
name: databases
name
----
mydb
_internal
>
```

### 创建一个数据库 ###

```
> CREATE DATABASE "test_db"
```

### 使用数据库 ###

```
> use test_db
Using database test_db
>
```

#### 增删改查 ####

*增*

通过InfluxDB 提供的 HTTP API 接口增加数据。

```
curl -i -XPOST 'http://localhost:8086/write?db=test_db' --data-binary 'weather,altitude=1000,area=北 temperature=11,humidity=-4'
curl -i -XPOST 'http://localhost:8086/write?db=test_db' --data-binary 'weather,altitude=1002,area=南 temperature=21,humidity=-5'
curl -i -XPOST 'http://localhost:8086/write?db=test_db' --data-binary 'weather,altitude=1003,area=南 temperature=24,humidity=-3'
```

*删、修改*

在InfluxDB中并没有提供数据的删除与修改方法，它是通过数据保存策略（Retention Policies）来实现删除。

Retention Policies 主要用于指定数据的保留时间：当数据超过了指定的时间之后，就会被删除。

`SHOW RETENTION POLICIES ON "test_db"` 查看当前数据库的 Retention Policies。
`CREATE RETENTION POLICY "rp_name" ON "db_name" DURATION 30d REPLICATION 1 DEFAULT` 给db_name数据库创建一个rp_name的有30天时长的1个副本的默认数据保存策略。
`ALTER RETENTION POLICY "rp_name" ON db_name" DURATION 3w DEFAULT` 修改数据保存策略。
`DROP RETENTION POLICY "rp_name" ON "db_name"` 删除数据保存策略。

*查*

```
use test_db
SELECT * FROM weather ORDER BY time DESC LIMIT 3
```

还可以通过 HTTP API 来查询：

`curl -G 'http://localhost:8086/query?pretty=true' --data-urlencode "db=testDB" --data-urlencode "q=SELECT * FROM weather ORDER BY time DESC LIMIT 3"`

InfluxDB 是支持类 SQL 语句的，所以查询语法支持非常丰富，跟 SQL 也是差不多的用法，更多的查询自己去尝试吧。


## 参考资料 ##

1. https://docs.influxdata.com/influxdb/v1.3/introduction/installation/
2. https://docs.influxdata.com/influxdb/v1.3/introduction/getting_started/
3. https://www.gitbook.com/book/xtutu/influxdb-handbook/details

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

---
layout: post
title: 'MySQL 数据库索引列长度限制'
keywords: MySQL, index, length
date: 2017-08-09 07:30:00
description: '数据库 SQL 语句在不同环境执行报错的一次知识补充。'
categories: [数据库]
tags: [mysql, index]
comments: true
group: archive
icon: file-o
---

    本文耗时 60 分钟。

----

本文是基于 MySQL `#1071 - Specified key was too long; max key length is xxx bytes`展开的实战和分析讨论。

## 演示错误 ##

MySQL 当前主要的运行版本是 5.5 5.6 5.7，下面的实战主要以 5.5 和 5.7 为例进行演示和分析。

### 基于 InnoDB utf8mb4 ##

以下三种 SQL 语句都会报错：`Specified key was too long; max key length is 3072 bytes`

```sql
# 主键
CREATE TABLE `test_key_len` (
  `name` varchar(769) NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# 索引
CREATE TABLE `test_key_len` (
  `name` varchar(769) NOT NULL DEFAULT '',
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# 唯一索引
CREATE TABLE `test_key_len` (
  `name` varchar(769) NOT NULL DEFAULT '',
  UNIQUE KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

结论：在 MySQL 5.7.17 上，一个表的字段 column 作为主键、唯一索引、索引时都是会被限制 key 长度为 3072 bytes。

```sql
# 主键
CREATE TABLE `test_key_len` (
  `name` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# 索引
CREATE TABLE `test_key_len` (
  `name` varchar(10000) NOT NULL DEFAULT '',
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# 唯一索引
CREATE TABLE `test_key_len` (
  `name` varchar(200) NOT NULL DEFAULT '',
  UNIQUE KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

结论：在 MySQL 5.5.24 上，一个表的字段 column 作为主键、唯一索引时都是会被限制 key 长度为 767 bytes，但是作为索引时，却没有限制，key 的长度只跟 column 类型的长度有关。


另外：
1. 注意错误信息的长度单位是 bytes ，所以 column 能支持的长度跟你创建的字符集也有关系。
utf8mb4 支持4字节，utf8 支持3字节（区分范围就是 769 和 1025 ）
2. 如果是其他存储引擎的话，这个长度也是不一样的。

如果是 MyISAM 的 `Specified key was too long; max key length is 1000 bytes`，区分范围就是 1000/4 或者 1000/3。

对于 MyISAM 表，组合索引的长度跟各个列总和长度有关。
对于 InnoDB 表，组合索引的长度跟各列的长度和无关，跟单列的长度有关，且能创建成功。

坑爹的是：阿里云 RDS 的 `innodb_large_prefix` 默认是关闭。

## 参考资料

1. https://dev.mysql.com/doc/refman/5.7/en/create-index.html
2. https://dev.mysql.com/doc/refman/5.7/en/innodb-parameters.html#sysvar_innodb_large_prefix

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

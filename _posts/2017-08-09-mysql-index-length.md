---
layout: post
title: 'MySQL 数据库索引列长度限制'
keywords: MySQL, index, length
date: 2017-08-09 07:30
description: '数据库 SQL 语句在不同环境执行报错的一次知识补充。'
categories: [mysql]
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

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

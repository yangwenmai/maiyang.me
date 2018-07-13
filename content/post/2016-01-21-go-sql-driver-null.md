---
layout: post
title: 'go-sql-driver null问题'
keywords: go-sql-driver
date: 2016-01-21 00:00:00
description: 'go-sql-driver null问题'
categories: [golang]
tags: [go-sql-driver, null]
comments: true
group: archive
icon: file-o
---

Golang 标准库自带了[database/sql](https://godoc.org/database/sql)，对于不同DB来说，就有不同的驱动程序。

列表见：https://github.com/golang/go/wiki/SQLDrivers

<!--more-->

数据库使用最多的，无非是MySQL---https://github.com/go-sql-driver/mysql

Golang官方wiki上对SQL接口有做一些[samples](https://github.com/golang/go/wiki/SQLInterface)。

重点说一下*Dealing with NULL*

>If a database column is nullable, one of the types supporting null values should be passed to Scan.

如果你定义的type struct中属性count类型是int32,但是在数据库设计中是int(11)但是DEFAULT NULL，那么就会存在一种可能性。

>DB表数据中column为NULL，当我们使用程序初始化的时候，count被默认为0，但是如果我们不小心使用DB客户端连接工具，那么count很可能被设置成为了NULL。

可能会报错：

>sql: Scan error on column index %d: %v

这个错误信息是在sql.sql.go中Scan函数中触发的。

另外，MySQL官方文档有做说明，下面这里值得大家认真学习。

>http://dev.mysql.com/doc/refman/5.7/en/column-count-limit.html

附带一篇解释说明。[MySQL中NULL和空值的区别](http://blog.163.com/magicc_love/blog/static/18585366220158851730817/)

最后，给大家的建议是DB设计中，不要给DEFAULT NULL，本来这个数据也是无意义的，我们要给每个column设置有意义的值，整型就是0，字符串就是''，日期就是当前时间或者1970时间。
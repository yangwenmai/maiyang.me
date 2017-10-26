---
layout: post
title: '不合理使用SQL语句带来的坑'
keywords: sql, mysql, golang
date: 2016-04-01 9:00
description: '记自己在实际使用中不合理使用SQL语句带来的维护成本和错误跟进的坑'
categories: [Golang]
tags: [golang, database]
comments: true
group: archive
icon: file-o
---

发生的错误信息如下：

>sql: Scan error on column index %d: time.Time->*RawTypes

该错误信息在Golang标准库database.sql.sql.go文件中，函数func (rs *Rows) Scan(dest ...interface{}) error 中。

<!--more-->

还有常见的一种错误：

>unsupported driver -> Scan pair: <nil> -> *string

一般，我们习惯这样写SQL语句

>SELECT * FROM table_name

这个SQL语法方式，一般用于自己平常查询，既简单，又方便。
但是，如果应用于程序代码时，这种用法就要被坑了。而且这也是不被建议这么使用的。


我们使用的ORM框架是gorp。

该框架其实对于表结构变更和使用SELECT * 时做了一次校验处理。
在gorp.gorp.go中，

>func columnToFieldIndex(m *DbMap, t reflect.Type, cols []string) ([][]int, error) 

定义了一个字符串数组 missingColNames，当从数据库中查询出来的字段，在我们给定的结构中，找不到时，会添加到missingColNames中。


### 特别说明 ###

无论如何，都不推荐使用 SELECT * FROM xxx

（1）SELECT *，需要数据库先 Query Table Metadata For Columns，一定程度上为数据库增加了负担。但是实际上，两者效率差别不大。

（2）考虑到今后的扩展性。
因为程序里面你需要使用到的列毕竟是确定的， SELECT * 只是减少了一句 SQL String 的长度，并不能减少其他地方的代码。

![SQL Cook对于*的说明](https://pic1.zhimg.com/f80e4012cde5f06d569fc7bc0e4a3964_r.jpg)

性能上的比较说明：

当我们的目标表中有大字段时，但是该字段可能又没有用时，这时SELECT * 的查询就会在传输上耗费一定的时间。

### 延伸阅读 ###

https://github.com/go-gorp/gorp/issues/281

https://www.zhihu.com/question/20237725

http://stackoverflow.com/questions/65512/which-is-faster-best-select-or-select-column1-colum2-column3-etc

mysql的select执行过程分析，直接阅读源码吧

### 写在最后 ###

茶歇驿站，一直在坚持，一直也在提高博文的质量，谢谢大家一直以来的关注和建议。现在你们可以直接给我提意见了，我也会保证每天都上去看看的，不然遗漏了大家的消息，就愧对这来之不易的原创、留言功能了。

---
layout: post
title: 'MySQL 怎么写定时存储过程'
keywords: MySQL, 存储过程
date: 2016-08-09 09:00
description: 'MySQL 怎么写定时存储过程'
categories: [MySQL, produce, event]
tags: [MySQL]
comments: true
group: archive
icon: file-o
---

当我们遇到需要定期处理数据库数据怎么办？

1. 自己写程序处理（Java,Ruby,Golang,Python,Shell等等）
2. 数据自身提供的触发器、存储过程、定时器

<!-- more -->

MySQL 怎么来写定时的存储过程呢？我简单讲讲，算是入门吧。

### 开始之前 ###

MySQL 从5.1开始就支持定时器(event)了，所以在使用之前也要确定自己的 MySQL 版本。

查看 MySQL 版本的最简单的方法：
	
	SELECT version();
	5.7.13

### 创建测试表 ###

	DROP TABLE IF EXISTS `test`;
	CREATE TABLE `test` (
  		`id` int(11) NOT NULL AUTO_INCREMENT,
  		`time` datetime NOT NULL,
  		PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;

### 存储过程 ###

#### 1. 插入数据 ####

	delimiter //
	DROP procedure IF EXISTS test_procedure//
	CREATE procedure test_procedure()
	BEGIN
		INSERT INTO `test`(time) values(now());
	END//
	delimiter ;

#### 2. 删除日期分表数据 ####

	delimiter //
	DROP procedure IF EXISTS drop_table_proce//
	CREATE procedure drop_table_proce()
	BEGIN
    	DECLARE DROP_TABLE_DATE DATE;
    	DECLARE DROP_TABLE_NAME VARCHAR(50);
    	DECLARE DROP_SQL VARCHAR(100);

    	SET DROP_TABLE_DATE=DATE_SUB(curdate(), interval 10 day);
    	SET DROP_TABLE_NAME=CONCAT('test_', DROP_TABLE_DATE);

    	SET @DROP_SQL = CONCAT('DROP TABLE `', DROP_TABLE_NAME, '`');

    	PREPARE stmt FROM @DROP_SQL;
    	EXECUTE stmt;
    	DEALLOCATE PREPARE stmt;
	END//
	delimiter ;

#### 注意 ####

在MySQL存储过程中，不支持表名做为变量。

	CREATE PROCEDURE test_procedure()
	BEGIN
		SET @t = 'test';
		SELECT * FROM @t;
	END;

这样执行是会报错的，你需要把SQL用字符串来写，然后通过
	PREPARE
	EXECUTE
	DEALLOCATE PREPARE
来实现。

另外存储过程是支持输入输出参数的，具体的用法可以参考延伸阅读。

### 定时器 ###

#### event的设置 ####
使用event的时候，要注意具备权限，最好使用root创建和维护。

1. 查看event是否打开
	
	SHOW VARIABLES like '%event_scheduler%';
	Value:ON/OFF

如果是OFF的话，可以通过下面的命令来打开
	
	SET GLOBAL event_scheduler = 1;

2. 创建定时器

	CREATE EVENT `test_event` ON SCHEDULE EVERY 1 DAY STARTS '2016-08-09 00:00:00' ON COMPLETION PRESERVE ENABLE DO CALL test_procedure();
	
	CREATE EVENT `test_event` ON SCHEDULE EVERY 1 DAY STARTS '2016-08-09 00:00:00' ON COMPLETION PRESERVE ENABLE DO CALL drop_table_proce();

EVERY 后面的是时间间隔，可以选 1 second，3 minute，5 hour，9 day，1 month，1 quarter（季度），1 year。

3. 查看当前数据库的所有定时器
	
	SELECT * FROM  `mysql`.`event`;

### 延伸阅读 ###

1. [proceduce](http://dev.mysql.com/doc/refman/5.7/en/create-procedure.html)
2. [proceduce in out inout](http://dev.mysql.com/doc/refman/5.7/en/call.html)
2. [event scheduler](https://dev.mysql.com/doc/refman/5.7/en/event-scheduler.html)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)

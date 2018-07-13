---
layout: post
title: 'Golang sqlx'
keywords: sqlx
date: 2016-02-05 15:50:00
description: 'golang sqlx 分析'
categories: [Golang]
tags: [sql]
comments: true
group: archive
icon: file-o
---

服务器开发，对SQL中的IN语句不会陌生吧！

一般来说in的参数都是很难确定的，SQL语句为了提升执行效率，都会进行预编译的。那么就有一个问题了，参数未定怎么预编译呢？无法确定完整完整SQL，无法确定占位符?个数。

<!--more-->

一般来说我们可以通过自己解析参数来确定个数，拼接SQL语句的。

字符串和整型都可以实现。

如果in子句中是整型的话，那么我们可以根据参数的个数拼接?的个数，并且对参数进行验证，可以过滤处理SQL注入问题。

在stackoverflowGolang上已经有相关问题被提出来了，并且给了多种解决方案。

详见：
http://stackoverflow.com/questions/20271123/how-to-execute-an-in-lookup-in-sql-using-golang

在答案中有一个最优的通用方法，database/sql扩展库：https://github.com/jmoiron/sqlx

想要更深的理解和了解他怎么实现的，阅读sqlx的源码吧。

源码中使用了reflect包，在开始阅读之前一定要先去恶补一下。
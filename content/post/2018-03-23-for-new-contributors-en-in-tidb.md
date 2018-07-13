---
layout: post
title: '萌新如何成为 TiDB Contributor'
keywords: Golang, TiDB
date: 2018-03-23 19:00:00
description: '给你一次成为 TiDB Contributor 的机会'
categories: [Golang]
tags: [Golang, TiDB]
comments: true
author: mai
---

    This article is an opportunity for me to give you TiDB Contributor, depending on whether you want it or not.

----

## Intro

This article was written under the leadership of Liu boss. I also hope that more people will be involved through such small activities. Although these tasks are very simple, these small tasks can reflect our TiDB team's perfect pursuit of code quality. This is what we should learn. This is an opportunity for you to improve/improve your code level. You shouldn't give up easily.

## Overview of the problem

Some of the `%` in TiDB's test cases enclose the statement with double quotes `""`, but Github escaping it when displayed, so it will be marked with `%` red, and we are doing a review of It doesn't look beautiful at the moment, so we need to change this and recommend replacing it with the Go language.

For examples: [PR #5697](https://github.com/pingcap/tidb/pull/5697/files)

## How to decide?

I can give you a reference note. If you use the Go syntax highlighting plug-in, then you can see that the unhighlighted part is escaping. It may be problematic. Then we need to make changes. [eg, 100%500, %W %r].

<img width="814" alt="github_tidb_review_3" src="https://user-images.githubusercontent.com/1710912/37811378-d18fb8b6-2e94-11e8-9d69-991577141357.png">

<!--more-->

## How to test and verify?

1. First you have to fork TiDB (so that you can edit the file on GitHub).
2. Open a suspicious file (For examples: [util/stringutil/string_util_test.go](https://github.com/yangwenmai/tidb/edit/master/util/stringutil/string_util_test.go)）.
3. Find the code statement for the problem overview description.
4. Modify the 3 corresponding code statement.
5. Click `Preview changes`.
6. Check and verify that your changes are correct.

Let me give you an example. It will be clear to see.

<img width="1224" alt="github_tidb_review_1" src="https://user-images.githubusercontent.com/1710912/37811361-ac8d4416-2e94-11e8-8e45-c11edb4774e8.png">
<img width="1003" alt="github_tidb_review_2" src="https://user-images.githubusercontent.com/1710912/37811798-0f2413be-2e97-11e8-89f8-f7ef1686ce76.png">

## to add on

The above content is the original intention that we should change, but in fact we can do more.

> Wrap all testkit's pending SQL statements with `` .

Therefore, we should modify the SQL statements of the following methods by the way when we modify them.

- `Exec`
- `MustExec`
- `MustQuery`

## Todo List


- [x] executor/aggregate_test.go @yangwenmai #6130 
- [x] executor/grant_test.go @kangxiaoning #6137 
- [x] executor/show_test.go @chenyang8094 #6138 
- [x] expression/bench_test.go @chenyang8094 #6138
- [x] expression/builtin_string_test.go @chenyang8094 #6138
- [x] expression/builtin_time_test.go @chenyang8094 #6138
- [x] expression/evaluator_test.go @kangxiaoning #6137 
- [x] expression/expr_to_pb_test.go @kangxiaoning #6137 
- [x] expression/integration_test.go @kangxiaoning #6137 
- [x] expression/typeinfer_test.go @kangxiaoning #6137 
- [x] parser/parser_test.go @kangxiaoning #6137 
- [x] plan/physical_plan_test.go @kangxiaoning #6137 
- [x] privilege/privileges/privileges_test.go @yangwenmai #6176 
- [x] session/bootstrap_test.go @kangxiaoning #6137 
- [x] session/session_test.go @kangxiaoning #6137 
- [x] session/tidb_test.go @kangxiaoning #6137 
- [x] types/format_test.go @kangxiaoning #6137 
- [x] util/prefix_helper_test.go @kangxiaoning #6137 
- [x] util/stringutil/string_util_test.go @yangwenmai #6177
- [x] util/ranger/ranger_test.go @hechen0 #6144

The entire repair process took about 10 days.

## Reference

1. https://golang.org/ref/spec#String_literals

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

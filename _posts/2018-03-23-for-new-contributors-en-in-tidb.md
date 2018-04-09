---
layout: post
title: '给你一次成为 TiDB Contributor 的机会'
keywords: Golang, TiDB
date: 2018-03-23 19:00
description: '给你一次成为 TiDB Contributor 的机会'
categories: [Golang]
tags: [Golang, TiDB]
comments: true
author: mai
---

* content
{:toc}

    本文是我给你一次成为 TiDB Contributor 的机会，就看你要不要了。

----

>点击 [issue #6129](https://github.com/pingcap/tidb/issues/6129) 即可参加。

## 由来

​本文来源于一次跟刘老大在 TiDB Contributor Club 的交流，最终成文也得到了刘老大的很多帮助和点拨，在这里表示一下感谢。我也希望可以通过这样的小活动让更多的人参与进来，让社区更加的活跃，也让你有更多的收获。

​虽然这些任务很简单，但这些小任务是可以折射出咱们 TiDB 团队对于代码质量的完美追求。这就是我们作为开发者应该追寻和要去学习的，其实这就是给你提高代码水平的机会，你不把握要轻易放弃，我也没办法了。

## 问题概述说明

在 TiDB 的测试用例里面的 % 有一些是用双引号 "" 把整个 SQL 语句括起来的，但是 Github 在显示时会进行转义，所以我们会看到 % 被标红了，当我们在做 code review 的时候看起来是极其不美观的，程序员追求的是完美，所以咱们肯定要想办法进行修改，这里推荐的就是 Go 语言里面的 `。

比方说这个 PR https://github.com/pingcap/tidb/pull/5697/files

## 如何判定呢？

我可以给大家一个参考说明，如果你使用了 Go 语法高亮插件的话，那么你就可以看到无法高亮的部分就说明转义了，可能是有问题的，那么就需要我们进行修改。【比如 100%500，%W %r】

![](github_tidb_review_3.png)

<!-- more -->

## 如何测试验证呢？

1. 首先你得 fork TiDB（这样你才可以在GitHub上对文件进行编辑）
2. 打开某个疑似的文件（比方说：https://github.com/yangwenmai/tidb/edit/master/util/stringutil/string_util_test.go）
3. 找到问题概述说明的代码语句
4. 修改3所对应的代码语句
5. 点击 `Preview changes`
6. 查看并验证你的修改是否正确

我给大家一个例子，看一下就清楚了。

![github_review_1](github_review_1.png)
![github_review_2](github_review_2.png)

## 补充内容

以上所说的内容是我们应该要去修改的初衷，但其实我们还可以做的更多。

>将所有 testkit 的待执行 SQL 语句的都用 `` 来包起来。

所以我们在修改的时候，应该顺便把以下方法的 SQL 语句也一并修改了。

- `Exec`
- `MustExec`
- `MustQuery`

## 任务清单


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

整个修复过程耗时约 10 天。

## 参考资料

1. https://golang.org/ref/spec#String_literals

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

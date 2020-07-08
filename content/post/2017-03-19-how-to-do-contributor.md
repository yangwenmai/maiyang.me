---
layout: post
title: '如何成为开源项目的Contributor'
keywords: 开源, Pull Request, github, TiDB, Contributor
date: 2017-03-19 23:00:00
description: '为开源项目提交PR'
categories: [开源]
tags: [习惯, github, TiDB, Contributor]
comments: true
group: archive
icon: file-o
---

今天的主题，要从前两天 PingCAP 发起的一次活动说起，`“十分钟成为 TiDB Contributor 系列 | 添加內建函数”`。

我之前一直有在阅读他们的技术博客（微信公众号），也参加过几次他们的线下活动，质量非常高。

<!--more-->

他们正在做的开源项目是 TiDB(Golang), TiKV(Rust)。

- TiDB is a distributed NewSQL database compatible with MySQL protocol.
- Distributed transactional key value database powered by Rust and Raft.

他们发起的活动，是一次很好的学习机会。这个活动邀请是在星期三(2017.3.14)的时候由申砾发布的，我是在星期四晚上开始构建项目，随后发现了一个 bug ，修复提交之后成为了TiDB 的 Contributor。

构建项目的时候遇到了一个 GOPATH 的问题：执行make（ build 和 install ），在 build 阶段就出现了错误:

`import cycle not allowed`，此错误主要是因为在你的 GOPATH 下出现了循环引用所导致。

我一直觉得是 GOPATH 的问题，但是确实一直又没有解决。后面求助了申砾，他给我仔细解答，给我提解决办法。最终，我为 TiDB 项目重建了一个 GOPATH ，然后把 TiDB 的依赖安装好，问题就解决了，当时心情还是非常激动的。

	从这一次实战项目来说，我对 GOPATH 的理解还是不够的。并且在公司项目里面我们对于 GOPATH 的运用也是不好的。后面我会将更优的应用于实践。

项目跑起来了，自然是觉得兴奋的。

我还没有参照“十分钟成为 TiDB Contributor 系列 | 添加內建函数”的参与方法，我就自己发现了一个内建函数的 bug。

	[fix UNIX_TIMESTAMP NULL](https://github.com/pingcap/tidb/pull/2852)

为什么是这个函数呢，因为我结合自己的经验，猜想很可能他们在实现转换的时候会遗漏对于时间字段为 NULL 的处理。

所以项目一跑起来，我就创建表，插入数据，然后执行 SQL。结果就报错了，当时的心情我不知道谁能懂--O(∩_∩)O哈哈~。

建表语句

`sql
CREATE TABLE `t_date` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`

插入语句：

`sql
INSERT INTO `t_date` (`id`, `created_at`)
VALUES
	(1, NULL),
	(2, '2017-03-16 23:59:59');
`

执行语句：

`sql
SELECT id, unix_timestamp(created_at) FROM t_date;
`

执行之后就报错了：`Unkonwn args type for unix_timestamp 0`，当时第一反应是难道我的参数有问题？所以我在 MySQL 那边进行了相同的操作，结果可以正常运行，所以我猜测是 TiDB 在实现 unix_timestamp 函数的时候有 bug。

直接在项目中全文检索`unix_timestamp`，即可定位到相关代码实现处。

阅读代码发现，在获取类型的时候，默认情况是输出以上错误信息的，所以很可能是拿到的数据类型，我们在实现的时候没有处理。

当时处理的数据类型有：`KindString`，`KindInt64`，`KindUInt64`，`KindMysqlTime`。没有`KindNull`，所以当数据值为 NULL 的时候，就无法处理，从而出现报错提示了。

知道了产生的原因，要去修复它，就是很简单的事情了。

解决的代码如下：

`
case types.KindNull:
	return
`

如果你是现在获取 TiDB master 分支代码的话，`git log`应该能看到以下信息：

`
...
946f90b fix UNIX_TIMESTAMP NULL (#2852)
...
`

修复之后，就是提交 bug 了。

整个流程是这样的：

1. 先 fork TiDB 项目到自己的 Github Repository。
2. 本地拉取自己 fork 的 TiDB 项目。
3. 用 `builtin_time.go`、`builtin_time_test.go` 替换自己账号的 TiDB 对应文件。
4. 提交 fork 项目代码到 Github 上。
5. 在 Github 网页端提交 `Pull Request`，就会同步代码给源项目。
6. 提交 fix 描述。
7. 坐等 merge （还有一系列的流程要走-不过活跃的项目速度比你想象的要快）。

我在这个过程中学到的：
1. 对项目要足够理解，不理解不要紧，至少有多人review
2. 代码实现，特别是 bugfix，更应该有 test case。
3. CLA

Github 有一套代码 merge 流程，以下是我对它的简单理解：

1. 首先你提交的PR是`Merging is blocked`的
2. `All checks have passed`，必须要经过所有的检查（这里有：`continuous-integration/travis-ci/pr — The Travis CI build passed`和`licence/cla — Contributor License Agreement is signed.`、`Review required`）-详细的内容，大家可参见延伸阅读。
3. `Review required`，单单这一项就要过几轮。我的这个 bugfix 经过了3个人。
	At least one approved review is required by reviewers with write access.

另外，我还看到了这样的词语`LGTM`,`PTAL`。
LGTM: looks-good-to-me，表示你的代码审查通过了。

###总结###

1. 了解开源项目的合作/运作模式
2. 知道怎么样提交PR
3. 变量命名规范，代码注释，单元测试（特别是这个）
4. CI 自动化构建检查
5. 开源项目的 Contributor 授权（CLA）

### 延伸阅读 ###

1. [十分钟成为 TiDB Contributor 系列 | 添加內建函数](http://www.pingcap.com/blog-add-a-built-in-function-zh.html)
2. [cla](https://cla-assistant.io/pingcap/tidb?pullRequest=2852)
3. [travis-ci](https://travis-ci.org/pingcap/tidb/builds/212052412)
4. [about-pull-request-reviews](https://help.github.com/articles/about-pull-request-reviews/)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。


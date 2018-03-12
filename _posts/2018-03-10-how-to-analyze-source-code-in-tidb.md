---
layout: post
title: '小白是怎么对 TiDB 进行源码分析的？'
keywords: Golang, TiDB
date: 2018-03-10 23:50
description: '小白是怎么对 TiDB 进行源码分析的？'
categories: [Golang]
tags: [Golang, TiDB]
comments: true
author: mai
---

* content
{:toc}

    本文我将拿一个很简单的例子来讲解小白是怎么对 TiDB 进行源码分析和修复问题的过程的，还有我对于如何成为 TiDB Contributor 的一些简单总结。

----

## 题外话

1. 最近 TiDB 又推出了一个[十分钟成为 TiDB Contributor 系列 | 从所有的执行器中删除 Next() 函数](https://github.com/pingcap/tidb/issues/5985)，不到两天时间全部认领完成，并且都很快都提交了 PR。
2. 最近 TiDB 还推出了[TiDB 源码阅读](https://www.pingcap.com/blog-cn/#源码阅读)，我相信对每一个想学习 Go 语言，以及想了解如何构建数据库系统的人，都算是一个非常好的课程，不亚于。

>从上面两个题外话，我们不难看出社区的力量好强大，并且这也彰显了 PingCAP 的社区正向引导力也好厉害，点赞！！！

希望未来有更多的企业、组织能够关注社区正向引导力，有更多的人参与和输出。

## 实战

### 问题是什么？

今天讲的例子其实是很简单的，咱们先来看一下是什么问题吧？

![tidb_issue#5946](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_issue_5946.png)

执行 SQL 语句： `select password("123456");`

在 MySQL 中的结果是:

```
MySQL(localhost) > select password("123456");
+-------------------------------------------+
| password("123456")                        |
+-------------------------------------------+
| *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 |
+-------------------------------------------+
1 row in set, 1 warning (0.01 sec)

MySQL(localhost) > show warnings;
+---------+------+-------------------------------------------------------------------+
| Level   | Code | Message                                                           |
+---------+------+-------------------------------------------------------------------+
| Warning | 1681 | 'PASSWORD' is deprecated and will be removed in a future release. |
+---------+------+-------------------------------------------------------------------+
1 row in set (0.01 sec)
```

在 TiDB 中的结果是:

```
TiDB(localhost) > select password("123456");
+-------------------------------------------+
| password("123456")                        |
+-------------------------------------------+
| *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9 |
+-------------------------------------------+

TiDB(localhost) > show warnings;
Empty set (0.00 sec)
```

很明显，TiDB 没有实现对 `select password("123456")` 的警告处理。

虽然我们从 `'PASSWORD' is deprecated and will be removed in a future release.` 中知道，`password` 内置函数将在将来的 MySQL 发布版本中移除，但是现在的版本都还是支持的，所以咱们 TiDB 还是需要兼容的。

## 那怎么兼容呢？

首先，我们先看一下 [MySQL 官方文档-function_password](https://dev.mysql.com/doc/refman/5.7/en/encryption-functions.html#function_password)

我们从字面意思上理解：

A. 肯定是执行'PASSWORD'函数的时候才会触发；

B. 他是一个警告（肯定是什么条件不满足才触发的）；

### 对 A 的进一步思考和分析

因为我是小白嘛，所以肯定不知道 `select password("123456")` 是怎么执行的，但是我知道 `password` 是一个内置函数，所以我全局检索 `password` ，结果： `1242 matches across 61 files`，这也太吓人了，对于小白来说，肯定卡壳，无法向前了。

再进一步想想：`password` 是一个内置函数，很可能跟关键字 `function` 有关，我就继续在之前的结果基础上搜索，但是还是有很多的结果。

*怎么办呢？*

发呆了好一会儿，后面又去看了一下 [MySQL 官方文档-function_password](https://dev.mysql.com/doc/refman/5.7/en/encryption-functions.html#function_password) 从它的链接上我想可以再试试关键字 `function_password`。

哇哦！！！

![tidb_pr#6000_code_search_function_password](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_pr_6000_code_search_function_password.png)

所以最终大家应该可以看到如下图的内容：

![tidb_pr#6000_code_search](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_pr_6000_code_search.png)

### 对 B 的进一步思考和分析

#### 警告是怎么添加的吧？

又是一轮搜索。。。

思路就是去全局搜索 `show warnings` => `39 matches across 8 files` 和 `warning` => `943 matches across 74 files`。

有很多的实战测试用例，所以我们找一个然后对应核心逻辑去查看。

![tidb_pr#6000_code_search_warnings](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_pr_6000_code_search_warnings.png)

我们大概知道了 `GetWarnings()` 、`AppendWarning()`、`SetWarnings(...)`

接下来的就是根据这些基本接口，然后去熟悉代码，以及项目里面其他有类似警告的信息是如何添加构造的。

#### 警告是如何构建的呢？

我们知道警告的内容是：`'PASSWORD' is deprecated and will be removed in a future release`，理所当然的我们的搜索关键词就是它，但是搜索没有匹配的结果，那我们要优化一下搜索内容：`is deprecated and will be removed in a future release`。

看到搜索的结果，心情还不错，看图：

![tidb_pr#6000_code_search_warnings_text](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_pr_6000_code_search_warnings_text.png)

至此我把小白如何进行源码分析和修复过程进行了简单的介绍，希望对你有所帮助。

根据搜索，我们已经知道对于 A 所对应的源代码在哪里了，我们直接进入相关的代码：

```go
type passwordFunctionClass struct {
    baseFunctionClass
}

func (c *passwordFunctionClass) getFunction(ctx sessionctx.Context, args []Expression) (builtinFunc, error) {
    if err := c.verifyArgs(args); err != nil {
        return nil, errors.Trace(err)
    }
    bf := newBaseBuiltinFuncWithTp(ctx, args, types.ETString, types.ETString)
    bf.tp.Flen = mysql.PWDHashLen + 1
    sig := &builtinPasswordSig{bf}
    return sig, nil
}

type builtinPasswordSig struct {
    baseBuiltinFunc
}

// evalString evals a builtinPasswordSig.
// See https://dev.mysql.com/doc/refman/5.7/en/encryption-functions.html#function_password
func (b *builtinPasswordSig) evalString(row types.Row) (d string, isNull bool, err error) {
    pass, isNull, err := b.args[0].EvalString(b.ctx, row)
    if isNull || err != nil {
        return "", err != nil, errors.Trace(err)
    }

    if len(pass) == 0 {
        return "", false, nil
    }

    return auth.EncodePassword(pass), false, nil
}
```

核心逻辑是 `func (*) evalString(...)` 函数，我们只需要增加一行警告信息即可。

```go
func (b *builtinPasswordSig) evalString(row types.Row) (d string, isNull bool, err error) {
    pass, isNull, err := b.args[0].EvalString(b.ctx, row)
    if isNull || err != nil {
        return "", err != nil, errors.Trace(err)
    }

    if len(pass) == 0 {
        return "", false, nil
    }

    b.ctx.GetSessionVars().StmtCtx.AppendWarning(errDeprecatedSyntaxNoReplacement.GenByArgs("PASSWORD"))
    
    return auth.EncodePassword(pass), false, nil
}
```

最终修复代码，请参看：[TiDB Pull Request #6000](https://github.com/pingcap/tidb/pull/6000)

### 其他

虽然这次的 PR 最终不是我提交的，但我把整个过程理清楚了，并且修复并验证了此问题，只是还没来得及完善测试用例，正准备开始时我收到了来自 TiDB 的邮件提醒。

![tidb_pr_6000_email](http://oqos7hrvp.bkt.clouddn.com/blog/tidb_pr_6000_email.png)

自己正在做的事，别人已经解决好了，你此时是什么心情？

>对于学习本身来说，接不接受其实并不是最重要的。但是还是尽量让社区知道跟进的进展是最好的。

所以当你对某个问题有兴趣，你可以在对应的 issue 下进行注释，如果你还在进行代码修复，可以标记 WIP（work in process）。

因为一般来说，PR 的受理原则是按照 PR 的提交时间来决定的。

### 开源项目的参与方法和学习方法

#### 如何成为一个开源项目的 Contributor？

这一部分，大家可以去看我去年的一篇[文章](http://maiyang.me/2017/03/19/how-to-do-contributor/)，我在这里就不再多说了。

只补充几点小感触（小建议）：

1. 不要怕从 0 开始；
2. 不要怕从简单开始；
3. 不要怕犯错（特别是不要怕犯低级错误）；
4. 不要怕开口（不懂就问，社区的人都非常的nice）；

#### 怎么参与开源项目（TiDB）呢?

+ 可以查看 issue，帮助解答用户的问题；
+ 可以搜索 issue 的标签：*for-new-contributors*, *help wanted*
+ 可以为增加测试代码，提升代码模块的测试覆盖率；
+ 可以关注 GoReportCard 对于 TiDB 的评分（主要是应用 Go 官方最佳实践的检测）；
+ 可以增加或修复一些文档；
+ 可以给复杂逻辑添加注释；

#### 怎么学习开源项目（TiDB）呢？

+ 查看项目的每一份文档和博文介绍；【易】
+ Github 的 PR 中去学习某些新特性或者 bugfix；【中】
+ 根据每一次release去查看他们的 commit 记录；（最终看完所有 commit 历史记录）【难】

## 扩展阅读

1. [如何从零开始参与大型开源项目](https://www.pingcap.com/blog-cn/how-to-contribute/)
2. [TiDB 源码阅读](https://www.pingcap.com/blog-cn/#源码阅读)
3. [十分钟成为 TiDB Contributor 系列 | 添加內建函数](https://www.pingcap.com/blog-cn/add-a-built-in-function/)
4. [十分钟成为 Contributor 系列 | 为 TiDB 重构 built-in 函数](https://www.pingcap.com/blog-cn/reconstruct-built-in-function/)
5. [强烈推荐！！！PingCAP 中文博客](https://www.pingcap.com/blog-cn/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

---
layout: post
title: '透彻理解 git'
keywords: git
date: 2018-03-09 22:00:00
description: '透彻理解git'
categories: [git]
tags: [git]
comments: true
author: mai
---

    本文是对于 git 的一些使用备忘总结。

----

Git 撤销已经 push 到远端的 commit

### 本地需要回退

先在本地回退到需要的版本

>git reset --hard <需要回退到的版本号（只需输入前几位）>

版本号可用如下指令查看

>git log remotes/origin/分支名

提交到远端

>git push origin <分支名> --force

![](http://oqos7hrvp.bkt.clouddn.com/blog/logrotate_copytruncate.jpg)

我们可以参考这个TiDB的最佳实践（https://github.com/pingcap/tidb/blob/master/CONTRIBUTING.md#workflow）

https://www.cnblogs.com/chercher/p/5587979.html
https://sheltonliu.github.io/2017/12/04/git-fork-knowledge/
https://juejin.im/entry/59f681fef265da430405e50f

Commit message 指南
好的 Commit message 可以提供更多的历史信息，方便 快速浏览和查找，还可以直接生成 Change log，一般至少包含 type 和 subject

type：commit 的类别

- feat：添加新功能
- fix：修补缺陷
- docs：修改文档
- style： 修改格式
- refactor：重构
- perf：优化
- test：增加测试
- chore：构建过程或辅助工具的变动
- revert：回滚到上一个版本
subject：commit 的简短描述

除此之外，有兴趣的同学还可以添加 gitmoji 和 validate-commit-msg 等更多内容

## 扩展阅读

1. [花20分钟写的-大白话讲解如何给github上项目贡献代码](https://site.douban.com/196781/widget/notes/12161495/note/269163206/)
2. [5.1 代码合并：Merge、Rebase 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9)
3. [Git-fork分支整理](https://sheltonliu.github.io/2017/12/04/git-fork-knowledge/)
4. https://github.com/pingcap/tidb/blob/master/CONTRIBUTING.md#workflow

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

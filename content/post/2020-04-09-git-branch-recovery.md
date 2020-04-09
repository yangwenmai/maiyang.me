---
title: 'git local branch 删除后如何恢复？'
keywords: git, branch, delete, recovery
date: 2020-04-09T11:58:00+08:00
lastmod: 2020-04-09T11:58:00+08:00
draft: false
description: 'git branch 删除后如何恢复？'
categories: [go]
tags: [git, branch, recovery]
comments: true
author: mai
---

## 背景

以为不需要的 local branch 被自己删除了 `git branch -D <branch_name>`，但是你意识到这个分支代码还没有提交远端。。。

是不是崩溃的心。。。

## 解决办法

Google 搜索：`git branch delete recovery`

第一个结果即可解救你。

https://stackoverflow.com/questions/3640764/can-i-recover-a-branch-after-its-deletion-in-git


```
git reflog
git checkout -b <branch> <sha>
```
### 参考资料

- https://stackoverflow.com/questions/3640764/can-i-recover-a-branch-after-its-deletion-in-git

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

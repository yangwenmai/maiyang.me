---
layout: post
title: 'git reset, revert, checkout介绍及区别'
keywords: git, reset, revert, checkout
date: 2016-04-21 21:40
description: 'git reset, git revert, git checkout介绍及区别'
categories: [git]
tags: [git, reset, revert, checkout]
comments: true
group: archive
icon: file-o
---

不知道大家对于git reset, revert, checkout几个命令了解不？

在我们日常使用git时，时常被用到，我结合我自己的经验简单介绍一下，如果有说的不对，请及时纠正。

首先，其实这3个命令的主要功能就是撤销(undo)。

<!-- more -->

### 基本概念 ###

**仓库**

git 仓库有三个组成（components），分别是：working directory(代码仓库)，staged snapshot(快照:add的缓存库)，commit history(commit历史)。

**git checkout**

git checkout hotfix 切换到hotfix分支，仅仅是将HEAD移到一个新的分支（hotfix）上，然后更新工作目录。

>因为这可能覆盖你本地修改，所以git强制你提交或缓存工作目录的所有更改，不然checkout的时候这些更改都会丢失。

git checkout HEAD~3 快速查看项目HEAD之前的第3个版本，这个对于我们查看之前的变更很有帮助的。

"git checkout -- <file>..." to discard changes in working directory

>作用于working directory

**git reset**

git reset 是撤销某次提交，但是此次之后的修改都会被退回到暂存区。

1. git reset HEAD 回退所有内容到上一个版本
2. git reset 057d 回退到某个版本

**git revert**

Revert撤销一个提交的同时会创建一个新的提交。这是一个安全的方法，因为它不会重写提交历史。比如，下面的命令会找出倒数第二个提交，然后创建一个新的提交来撤销这些更改，然后把这个提交加入项目中。

git revert HEAD~3：丢弃最近的三个commit，把状态恢复到最近的第四个commit，并且提交一个新的commit来记录这次改变。

### git reset 和git revert的区别 ###

1. git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。
2. git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进
3. 在回滚这一操作上看，虽然效果差不多，但是日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。

### 使用场景 ###

下表来源于延伸阅读（1）

|命令|作用域|常用情景|
|:--------|:--------|:--------|
|git reset|提交层面|在私有分支上舍弃一些没有提交的更改|
|git reset|文件层面|将文件从缓存区中移除|
|git checkout|提交层面|切换分支或查看旧版本|
|git checkout|文件层面|舍弃工作目录中的更改|
|git revert|提交层面|在公共分支上回滚更改|
|git revert|文件层面|（然而并没有）|

### githug(git游戏) ###

非常值得每个程序员花时间去学习和巩固git的“游戏”。

### 延伸阅读 ###

1. [代码回滚：Reset、Checkout、Revert的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert的选择)
2. [「软件匠艺小组」社区 git](https://codingstyle.cn/topics/node27)
3. [githug](https://github.com/Gazler/githug)、[githug通关笔记](https://github.com/buyi/githug-)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://ww4.sinaimg.cn/large/824dcde4gw1f358o5j022j20by0bywf8.jpg)


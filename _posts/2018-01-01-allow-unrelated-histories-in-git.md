---
layout: post
title: '解决Git fatal错误提示'
keywords: Git, Github
date: 2018-01-01 15:00
description: '本文是在git push数据时遇到的一个问题解决方法。'
categories: [git]
tags: [Git, Github]
comments: true
author: mai
---

* content
{:toc}

    本文是在 git push 数据时遇到的一个问题解决方法。

----

## 情景再现 ##

错误信息：`fatal: refusing to merge unrelated histories`

我给大家还原一下以上错误，并且再来介绍一下如何解决并成功提交数据的。

1. 你在本地新建一个项目**jaeger-opentracing-examples**；
2. 给这个项目添加一些数据；
3. 执行 `git add .`, `git commit -m "init"`；
4. 在执行 `git push origin master` 之前，还需要执行`git remote add origin https://github.com/yangwenmai/jaeger-opentracing-examples.git`；
5. 执行 `git pull origin master`
6. `fatal: refusing to merge unrelated histories`

这个问题，其实我以前也遇到过，但是以前是怎么解决的呢？

直接本地文件重命名，然后再从 GitHub 拉取项目，然后把本地项目的所有文件拷贝到拉取到的项目文件中，然后再提交数据并推上去。

这虽然是一种解决办法，也不无伤大雅，但是这个办法终归不是正统的解决之道，本着学习和专研的精神，不应该逃避问题的方式来达到解决问题，所以我 Google 了。

<!--more-->

## 那究竟我如何解决以上错误的呢？ ##

你可以在 `git pull origin master` 添加 `--allow-unrelated-histories` 强制合并.

>"git merge" used to allow merging two branches that have no common base by default, which led to a brand new history of an existing project created and then get pulled by an unsuspecting maintainer, which allowed an unnecessary parallel history merged into the existing project. The command has been taught not to allow this by default, with an escape hatch --allow-unrelated-histories option to be used in a rare event that merges histories of two projects that started their lives independently.

## 参考资料 ##

1. https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

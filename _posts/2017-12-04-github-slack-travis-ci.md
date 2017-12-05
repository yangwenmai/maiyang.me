---
layout: post
title: '一步一步教你用 GitHub+Slack+TravisCI 构建 Go 的自动化持续集成'
keywords: Golang, Go, Github, Slack, TravisCI
date: 2017-12-04 06:36
description: '一步一步教你用 GitHub+slack+travisci 构建 Go 的自动化持续集成'
categories: [golang]
tags: [Golang, Go, Github, Slack, Travis, CI]
comments: true
author: mai
---

* content
{:toc}

    本文是基于 **[gitfeed](https://github.com/yangwenmai/gitfeed)** 项目来教你如何一步一步的用 Github+Slack+TravisCI 构建自动化持续集成。

----

欢迎大家使用 [gitfeed](https://github.com/yangwenmai/gitfeed) 项目，有什么意见或想法都可以提 Issue 给我，更欢迎大家提 PR。

## 什么是持续集成？ ##

>持续集成（英语：Continuous integration，缩写为 CI），一种软件工程流程，将所有工程师对于软件的工作复本，每天集成数次到共用主线（mainline）上。 摘自维基百科。

![](http://oqos7hrvp.bkt.clouddn.com/blog/continuous-integration.png)
（图片来源于网络）

持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。

持续集成的好处主要有两个：

（1）快速发现错误。每完成一些更新，就可以集成到主干，可以快速发现错误，定位错误也比较容易。

（2）防止分支大幅偏离主干。如果不是经常集成，主干又在不断更新，会导致以后集成的难度变大，甚至难以集成。

>Martin Fowler 说过，"持续集成并不能消除 Bug，而是让它们非常容易发现和改正。"与持续集成相关的，还有两个概念，分别是持续交付和持续部署，本文暂未涉及，以后有机会再进行探讨和实践。

<!--more-->

----

## 开始实战 ##

废话不多说，下面我就一步一步教你用 GitHub+Slack+TravisCI 来构建自动化持续集成。

### 准备工作 ###

首先，你必须得有以下账号：

1. Github 账号
2. Slack 账号
3. TravisCI 账号

### Github 上创建项目 ###

创建一个项目：(当然你也可以直接 Fork 我的 [gitfeed](https://github.com/yangwenmai/gitfeed) 项目。)

- 项目名称：取一个名字；
- 项目描述：添加一些描述，让大家知道你这个项目是干什么的；
- 项目权限：公开或私有（私有项目是付费用户才可以创建的，$7/month）；
- 初始化仓库：可以选择 `.gitignore`、`license`。

![](http://oqos7hrvp.bkt.clouddn.com/blog/github-new-repo.png)

当然你还得为你的项目添加一些测试代码。

### Slack: 创建你的工作空间 ###

给你的 Slack 工作空间取一个名字并进行创建。

![](http://oqos7hrvp.bkt.clouddn.com/blog/create_new_workspace_in_slack.png)

然后你填写一些你的个人信息或者团队信息，点击下一步即可。

### TravisCI: 构建项目 ##

前提是你已经创建好了 Github 项目，并且你给项目添加了 `.travis.yml` 文件，更多详细内容可以参考我的另一篇文章[怎么给你的GitHub README添加徽章](https://github.com/yangwenmai/how-to-add-badge-in-github-readme)。

----

## 开始集成 ##

### Slack 的登录 ###

它提供了 Web，客户端，移动客户端等多种方式登录，我们可以选择适合自己的方式登录，配置管理最好是 Web。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-signin.png)

登录之后，你就进入了你的工作空间。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-gitfeed-dashboard.png)

你还可以邀请你的小伙伴参与到你的工作空间中来，这就是开源协作模式了。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-invite-people.png)

Slack 有类似于 QQ/钉钉 的讨论组，叫做 Channel ，它使用起来非常方便。

### Slack 管理 Apps ###

要让项目可以自动化持续集成，咱们先得给 Slack 添加 Github 和 TravisCI App。

**怎么添加呢？**

你可以在主面板上的 Apps 进行添加

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-dashboard-apps.png)

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-browse-apps.png)

### Slack 上管理 Github 配置 ###

搜索 Github 后，点击 VIEW 进入：

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-add-app-github.png)

点击 **Install**，然后再点击 **Add Github Integration**，即可对 Github 集成进行授权。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-github-add.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-github-add-auth.png)

授权通过之后，你就可以选择项目进行 Slack 集成了。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-github-chose-repo.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-github-repo-events.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-github-post-config.png)

当你所选择的项目有 Commit，Issues，Pull Request，Branch or tag created or deleted 等事件时，你的 Slack channel #github 将会收到来自 Github 推送。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-notification-info.png)

### Slack 上管理 TravisCI 配置 ###

搜索 Travis 后点击 VIEW 进入

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-add-app-travisci.png)

点击 **Install**，然后再点击 **Add Travis Integration**，即可对 Travis 集成进行授权。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-travis-add.png)

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-travis-add-auth-00.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-travis-add-auth-01.png)

需要你将上面的 notifications 配置到你项目中的 `.travis.yml` 文件中 。

你可以点击 `create a new channel` 创建一个 channel 用于推送消息的接收通道。

配置这些之后，点击 **Save Settings** 即可。

当你的 Github 项目构建完成之后，可以在 https://travis-ci.org 上查看到构建情况。

![](http://oqos7hrvp.bkt.clouddn.com/blog/travis-00.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/travis-01.png)
![](http://oqos7hrvp.bkt.clouddn.com/blog/travis-02.png)

与此同时它也会把构建结果同步到你的 Slack channel 上。

![](http://oqos7hrvp.bkt.clouddn.com/blog/slack-notification-info.png)

至此整个 Github+Slack+TravisCI 构建的自动化持续集成环境就配置完成了。

## 实际测试 ##

如果你只想体验如何构建自动化持续集成，你可以直接加入进来就好了。

[Join Slack](https://join.slack.com/t/gitfeed/shared_invite/enQtMjgwNTU5MTE5NjgxLTA5NDQwYzE4NGNhNDI3N2E0ZmYwOGM2MWNjMDUyNjczY2I0OThiNzA5ZTk0MTc1MGYyYzk0NTA0MjM4OTZhYWE)

## 参考资料 ##

1. **特别感谢 Cui YingJie** 在 Gopher 深圳 Meetup 给我们带来的分享：《[Go 持续集成开发环境搭建示例](https://github.com/nihuo/go_meetup_sz1)》，本文就是参考它而完成的。

2. [怎么给你的GitHub README添加徽章](https://github.com/yangwenmai/how-to-add-badge-in-github-readme)

## 附录 ##

## 什么是 Github ？ ##

>GitHub 是一个通过 Git 进行版本控制的软件源代码托管服务，由 GitHub 公司（曾称Logical Awesome）的开发者 Chris Wanstrath、PJ Hyett 和 Tom Preston-Werner 使用 Ruby on Rails 编写而成。 摘自维基百科。

## 什么是 Slack ？ ##

>Slack 是聊天群组 + 大规模工具集成 + 文件整合 + 统一搜索。Slack 整合了电子邮件、短信、Google Drives、Twitter、Trello、Asana、GitHub 等多种工具和服务，可以把各种碎片化的企业沟通、协作集中到一起。

**Slack 致力于在整个团队中创造了一致性和共同的理解，使你更有效率，更少压力，更快乐一点。**

## 什么是 Travis-CI ？ ##

>Travis CI 是在软件开发领域中的一个在线的，分布式的持续集成服务，用来构建及测试在 GitHub 托管的代码。这个软件的代码同时也是开源的，放在 GitHub上，尽管开发者当前并不推荐在闭源项目中单独使用它。
它提供了多种编程语言的支持，包括Ruby，JavaScript，Java，Scala，PHP，Haskell，Go 和 Erlang 在内的多种语言。许多知名的开源项目都使用它在每次提交的时候进行构建测试。

## 什么是自动化？ ##

这个应该不用我过多解释吧,反正意思就是不需要人为干预咯。

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/money.jpg)

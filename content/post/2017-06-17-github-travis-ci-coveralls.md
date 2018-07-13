---
layout: post
title: '给你的Github项目增加持续集成，基于travis-ci和Coveralls'
keywords: Github, Golang, Travis-ci, Coveralls
date: 2017-06-17 07:00:00
description: '给你的Github项目增加持续集成，基于travis-ci和Coveralls'
categories: [Golang]
tags: [github,golang,ci]
comments: true
group: archive
icon: file-o
---

	本文耗时120分钟，建议实战。

----

## 简介

[Travis-CI](https://travis-ci.org) 是国外的开源持续集成构建项目，支持 Github 项目，通过 yml 配置来驱动执行相对应的持续集成脚本。对于 Github 的项目支持起来非常简单，开通 Travis 后只需要你在自己的项目根目录下增加`.travis.yml`就好了。

[Coveralls](https://coveralls.io) 是一个自动化测试覆盖率的服务，它能提供代码覆盖率并且给以友好的展现。

![tidb-travis-ci](https://travis-ci.org/pingcap/tidb.svg?branch=master) 
![tidb-coveralls](https://coveralls.io/repos/github/pingcap/tidb/badge.svg?branch=master)

如果你的项目是私有仓库的话，比方说 Gitlab，并且你的Gitlab 版本是 8.0 以上的，在Gitlab 搭建好之后就是支持 [gitlab-ci](https://about.gitlab.com/features/gitlab-ci-cd/) 的，用法跟 Travis 类似，在项目里面根目录下增加`.gitlab-ci.yml`,然后你可能需要单独增加 gitlab-runner，即可进行持续集成。

更多详情，请大家看我写的另外一篇[文章]()。

## 持续集成Travis-ci

### 开通Travis

打开 travis 官网:https://travis-ci.org/

![travis-ci 官网首页截屏](http://oqos7hrvp.bkt.clouddn.com/blog/travis-ci-index.png)

使用github账号授权登录。

添加项目，这里使用我的 Golang 示例项目 ratelimit。

![项目选择](http://oqos7hrvp.bkt.clouddn.com/blog/travis-ci-step.png)

整个 ci 的过程有以下几步:
1. 在 travis-ci 你的 profile 页面，勾选上你要持续集成的项目
2. 在你的 Github 项目根目录下添加`.travis.yml`，Travis-CI会按照`.travis.yml`里的内容进行构建
3. 提交`.travis.yml`到 Github，自动触发持续集成，
4. 你可以到[travis-ci-status](https://travis-ci.org/yangwenmai/ratelimit) 查看结果

<!--more-->

下面给一个我的`.travis.yml`例子:

```yaml
language: go # 声明构建语言环境
sudo: false # 开启基于容器的Travis CI任务，让编译效率更高。

notifications: # 每次构建的时候是否通知，如果不想收到通知，那就设置false吧(email: false,也可以是Slack)
  slack: xxxx:xxxxxxxxxx
  on_success: change
  on_failure: always

go:
  - 1.9.2

install:#依赖安装
  - go get github.com/go-playground/overalls #overalls能够支持到各级子目录
  - go get github.com/mattn/goveralls #goveralls是coveralls对golang的测试覆盖率支持命令
  - go get github.com/smartystreets/goconvey#很好用的测试工具
  - mkdir -p $GOPATH/src/github.com/yangwenmai
  - cd $GOPATH/src/github.com/yangwenmai/ratelimit

script:# 集成脚本
    - overalls -project=github.com/yangwenmai/ratelimit -covermode=count -ignore='.git,_vendor'
    - goveralls -coverprofile=overalls.coverprofile -service=travis-ci -repotoken $COVERALLS_TOKEN
    - go test -race -coverprofile=coverage.txt -covermode=atomic
    - go test ./...

after_success:
  - bash <(curl -s https://codecov.io/bash)

env:#env环境变量设置，travis提供的repo_token安全方式
  global:
    secure: "xxxx"
```

更多配置，可以参考:https://docs.travis-ci.com/user/customizing-the-build/

## 测试覆盖率Coveralls

### 开通Coveralls

![Coveralls官网截图](http://oqos7hrvp.bkt.clouddn.com/blog/coveralls-index.png)

#### 授权登录

在[Coveralls](https://coveralls.io)官方网站使用github账号登录授权。

#### 添加项目

![add repo截图](http://oqos7hrvp.bkt.clouddn.com/blog/coveralls-add-repo.png)
![add repo截图](http://oqos7hrvp.bkt.clouddn.com/blog/coveralls-add-repos.png)

#### 查看repo_token

![repo_token截图](http://oqos7hrvp.bkt.clouddn.com/blog/coveralls-repo-token.png)

repo_token涉及安全不应该提交到`.travis.yml`，coveralls提供了非对称加密repo_token的方法。

对于密码等敏感信息，Travis CI提供了2种解决方案：

- 对密码等敏感信息进行加密，然后再构建环境时解密。
- 在Travis CI控制台设置环境变量，然后使用System.getenv()获取值。

![配置环境变量](http://oqos7hrvp.bkt.clouddn.com/blog/travis-ci-env-params-setting)

对于文件加密，Travis CI提供了一个基于ruby的CLI命令行工具，可以直接使用gem安装：

`gem install travis`

注意:gem安装依赖于ruby以及ruby版本。
还有众所周知的原因，你最好切换一个gem源。

`gem sources -l #查看gem源`

对你的token加密:

`travis encrypt COVERALLS_TOKEN=your_token`

将得到的值填写到`.travis.yml`的secure中即可。

# 添加 Codecov

[Codecov](http://codecov.io/) 的功能：

**加强开发工作流程，提高代码质量**。

- 一行脚本即可上传报告，非常简单。

```yaml
# .travis.yml

after_success:
  - bash <(curl -s https://codecov.io/bash)
```

- 报告合并，完美无缺。
- 审核报告，无缝连接。
- 从现在开始覆盖你的代码，免费。
- 全世界有上百万开发者用 Codecov 覆盖他们的代码。

以下是一些截图，大家可以看看

![codecov](http://oqos7hrvp.bkt.clouddn.com/blog/codecov-01.png)
![codecov](http://oqos7hrvp.bkt.clouddn.com/blog/codecov-02.png)
![codecov](http://oqos7hrvp.bkt.clouddn.com/blog/codecov-03.png)

大家仔细看的话，应该会发现，怎么机器人名称是coveralls，而不是 codecov 呢？

因为我们在 `.travis.yml` 里面没有加下面这行脚本。

`- go test -race -coverprofile=coverage.txt -covermode=atomic`

![codecov](http://oqos7hrvp.bkt.clouddn.com/blog/codecov-04.png)

## 最后:如何在自己的项目中显示Status Image?

操作起来很简单，只需要在你的README.md中增加badge链接即可。

travis页面复制图标标签
![coveralls](http://oqos7hrvp.bkt.clouddn.com/blog/travis-build-status-badge.png)

coveralls复制图标标签
![coveralls](http://oqos7hrvp.bkt.clouddn.com/blog/coveralls-status-badge.png)

然后将代码全部提交到 Github，你就可以看到build status和coveralls了。

## 问题总结

首先，如果你遇到了问题，你可以直接到`travis-ci/issues`里找，或者 Google / StackOverflow 。

## 参考资料
1. https://github.com/nukc/how-to-use-travis-ci
2. https://www.jerrylou.me/工具/howto-github-travisci-coveralls-20170120.html

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

当然，你觉得对你有帮助，也可以给我打赏。
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/wxpay.png)
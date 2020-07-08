---
layout: post
title: 'go get 提示 io timeout 的解决之法'
keywords: Golang, go get, timeout
date: 2017-11-07 00:48:00
description: 'go get 提示 io timeout 的解决之法'
categories: [Golang]
tags: [Golang, go get, timeout]
comments: true
author: mai
---

    本文是一篇对go get不能方便拉取到代码的问题的解决方案总结。

----

`go get -v golang.org/x/text`，有一部分 google 的服务器被ZF q了，所以导致无法`go get`， `-v` 是可以打印执行的过程。

失败的原因就是遇到zf q 的问题了，即便是你设置了全局代理，也是不行的。因为全局代理对命令行不生效。

我们只能对 `git` 进行单独设置。

```shell
git config —global http.proxy http://127.0.0.1:7777
git config —global https.proxy http://127.0.0.1:7777
```

可以参考：[http://www.cnblogs.com/ghj1976/p/5087049.html](http://www.cnblogs.com/ghj1976/p/5087049.html)
网络请求的 http_proxy 和 git 的 代理 都需要设置才可以。

解决 go get 的问题（写一篇总结的文章）还可以参考另外[一篇文章](http://colobu.com/2017/01/26/how-to-go-get-behind-GFW/)

还需要安装一个 [cow](https://github.com/cyfdecyf/cow/) 代理软件，然后再配置好 `~/.cow/rc` 

```shell
listen = http://127.0.0.1:7777
proxy = socks5://127.0.0.1:1080
```

然后启动 cow（go get 安装到 gobin 目录下，可以直接运行的）
在运行 go get 之前，记得执行：

```shell
export http_proxy=http://127.0.0.1:7777
export https_proxy=http://127.0.0.1:7777
```

<!--more-->

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



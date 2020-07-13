---
title: 'Go Modules 踩坑记'
keywords: go, modules, go mod, mod
date: 2020-07-13T23:28:00+08:00
lastmod: 2020-07-13T23:28:00+08:00
draft: false
description: '很久时间没有更新的库出现了结构性变化所带来的一些问题（我也因此踩坑了）。'
categories: [golang]
tags: [go, modules, go mod, mod]
comments: true
author: mai
---

## Go Modules

Go 推出的包管理工具，但是它不是 Go 一经推出就有，所以带来了不少的兼容问题。

## 踩坑记录

我们用了七牛的 API SDK，而我们第一次使用的时间比较早，采用的版本是 https://github.com/qiniu/api.v7/tree/v7.2.4
所以在项目中使用的 import 方式是：`import "github.com/qiniu/api.v7/auth/qbox"`

仓库一直采用的兼容模式，所以在长期开发的机器上并未发生什么问题，但是当我们有新同事，或者更换电脑的时候，下载仓库项目，再想执行的时候发生了错误。


```sh
go: github.com/qiniu/x@v7.0.8+incompatible: reading github.com/qiniu/x/go.mod at revision v7.0.8: unknown revision v7.0.8 
```

这可咋整？

从这里理解到的是 `github.com/qiniu/x@v7.0.8` 仓库代码上没有此 tag 了，但是为什么我本地却可以执行了，后面发现我电脑的 mod 目录下有此仓库代码。

所以想到的一个办法是将我这个文件拷贝到新电脑上，结果还是不行。
>是因为你即便是把文件拷贝过去了，但是 go mod 会进行 sum 值校验，还是会从远端进行拉取，但是因为不存在，所以就报错了。

### 产生的原因

1. 项目使用了比较旧的 API，导致依赖的包也比较旧。
2. 依赖项目的兼容分支代码被服务商从 tag 中删掉了。

#### qiniu GO SDK v7.3.0 引入 go mod

https://github.com/qiniu/api.v7/tree/v7.3.0

#### qiniu tags

https://github.com/qiniu/x/tags?after=v1.8.0

v1.10.0 创建于 Mar 30
v1.10.2 创建于 May 2

从日期也能够看出，有一部分的 tag 是被重新创建过的。

### 解决办法

删除 qiniu go sdk 在 go.mod 中的相关内容，然后使用 `go mod tidy`，重新整理。

可能这个过程会失败，因为 qiniu go sdk 升级，可能会有 API 不兼容的情况。这个时候就需要你进行相关的 API 兼容修改，以便通过正常的代码逻辑调用。

### aofei 提供

`go list -m -json -versions github.com/qiniu/x@latest` 使用这个命令来查看有的版本。

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

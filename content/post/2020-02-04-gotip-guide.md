---
title: 'gotip 工具介绍'
keywords: go, gotip, tools
date: 2020-02-04T08:20:00+08:00
lastmod: 2020-02-04T08:20:00+08:00
draft: false
description: 'Go 使用最新代码工具：gotip'
categories: [go]
tags: [go, gotip, tools]
comments: true
author: mai
---

## gotip

>gotip 最简单的使用 Go 最新开发分支的方法。

gotip 是从开发分支上编译并运行 go 的命令。

### 安装

```shell
$ go get golang.org/dl/gotip
$ gotip download
gotip download
Cloning into '/xxx/sdk/gotip'...
remote: Counting objects: 9692, done
remote: Finding sources: 100% (9692/9692)
remote: Total 9692 (delta 1032), reused 5737 (delta 1032)
Receiving objects: 100% (9692/9692), 22.97 MiB | 2.69 MiB/s, done.
Resolving deltas: 100% (1032/1032), done.
Checking out files: 100% (8833/8833), done.
HEAD is now at 753d56d syscall: release a js.Func object in fsCall
Building Go cmd/dist using /xxx/develop/go1.13.6. (go1.13.6 darwin/amd64)
Building Go toolchain1 using /xxx/develop/go1.13.6.
Building Go bootstrap cmd/go (go_bootstrap) using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands for darwin/amd64.
---
Installed Go for darwin/amd64 in /xxx/sdk/gotip
Installed commands in /xxx/sdk/gotip/bin
Success. You may now run 'gotip'!
```

会在用户目录下生成文件：`~/sdk/gotip`，简单来说就是 Clone Github go 的所有源代码，然后执行构建，生成 gotip 命令。


### 更新

```shell
$ gotip download
```

### 使用

跟平常使用 go 命令一样。

## 参考资料

1. https://pkg.go.dev/golang.org/dl/gotip?tab=doc

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



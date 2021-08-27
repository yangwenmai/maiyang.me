---
title: 'gotip 实践 golang-design/go2generics'
keywords: go, golang, gotip, go2generics, golang-design
date: 2021-08-23T08:30:00+08:00
lastmod: 2021-08-23T08:30:00+08:00
draft: false
description: 'gotip 实践 golang-design/go2generics'
categories: [golang]
tags: [go, golang, gotip, go2generics, golang-design]
comments: true
author: mai
---

## go 1.17 发布

不久前，Go 1.17 正式发布，发布内容可以参见[上篇文章](https://mp.weixin.qq.com/s?__biz=MzAwNTc3OTE5Mg==&mid=2657445236&idx=1&sn=f710d7acada66be15cc48961d198d3ad&chksm=8086bee3b7f137f5a3abaf5be48f61712f9264ee6a3057cfade52b70aee2399b9829c0424ee4&scene=21#wechat_redirect)。

其实在 Go 1.17 源码中，Go 团队已经实现了 Go: Type Parameters Proposal ，并且使用类似 GO11MODULE 开关的方式提供 Go 泛型的支持，默认为关闭（`-gcflags=-G=0`），但是我们可以打开，具体方法如下：

`go build -gcflags=-G=3`

就在刚刚 `-gcflags=-G=3` 默认打开的开关被合入 master，相关的 CL: [343732: cmd/compile: enable -G=3 by default | https://go-review.googlesource.com/c/go/+/343732 ](https://go-review.googlesource.com/c/go/+/343732 "343732: cmd/compile: enable -G=3 by default | https://go-review.googlesource.com/c/go/+/343732 ") 。

这意味着什么呢？master 构建的 go 默认就支持泛型了，那我们怎么方便的使用呢？答案就是 gotip 。

## 支持泛型的 Go 编译器 gotip

[安装 gotip](https://pkg.go.dev/golang.org/dl/gotip "安装 gotip") 之前，必须先安装 go，本文就不详述了，安装有问题可以自行搜索，或者私信我。

1. gotip 工具安装

```
$ go get golang.org/dl/gotip
```

2. 构建安装 master 代码

```
$ gotip download
Updating the go development tree...
remote: Finding sources: 100% (19158/19158)
remote: Total 19158 (delta 10570), reused 16946 (delta 10570)
Receiving objects: 100% (19158/19158), 32.20 MiB | 1.24 MiB/s, done.
Resolving deltas: 100% (10570/10570), completed with 414 local objects.
From https://go.googlesource.com/go
 * branch                  master     -> FETCH_HEAD
   8f676144ad..6e50991d2a  master     -> origin/master
Updating files: 100% (2868/2868), done.
Previous HEAD position was 8f676144ad crypto/rsa: fix salt length calculation with PSSSaltLengthAuto
HEAD is now at 6e50991d2a strconv: reject surrogate halves in Unquote
Building Go cmd/dist using /Users/maiyang/develop/go1.16.6. (go1.16.6 darwin/amd64)
Building Go toolchain1 using /Users/maiyang/develop/go1.16.6.
Building Go bootstrap cmd/go (go_bootstrap) using Go toolchain1.
Building Go toolchain2 using go_bootstrap and Go toolchain1.
Building Go toolchain3 using go_bootstrap and Go toolchain2.
Building packages and commands for darwin/amd64.
---
Installed Go for darwin/amd64 in /Users/maiyang/sdk/gotip
Installed commands in /Users/maiyang/sdk/gotip/bin
Success. You may now run 'gotip'!
```

3. 检查 gotip 版本

```
$ gotip version
go version devel go1.18-6e50991d2a Sat Aug 21 18:23:58 2021 +0000 darwin/amd64
```

## golang-design/go2generics

Go 语言泛型的代码示例（基于类型参数和类型集）

## 实践一：简单的 Go 泛型代码

```golang
package main

import (
 "fmt"
)

func Print[T any](s []T) {
 for _, v := range s {
  fmt.Print(v)
 }
 fmt.Println()
}

func main() {
 Print([]string{"Hello, ", "Go generics"})
 Print([]int{0, 1, 42})
 Print([]int{0, 1, 42})
}
```

使用 go1.17 并附带编译参数 `-gcflags=-G=3`，或者使用 gotip 执行结果如下：

```shell
$ go run -gcflags=-G=3 main.go
# command-line-arguments
./printer.go:7:6: internal compiler error: Cannot export a generic function (yet): Print

Please file a bug report including a short program that triggers the error.
https://golang.org/issue/new

$ gotip run main.go
Hello, Go generics
0142
0142
```
两者结果并不一致，这就说明 go 1.17 的泛型跟当前 master 的泛型支持相差还是很大的，不推荐大家字啊 go 1.17 就开始试用 Go 泛型。

## 实践二：golang-design/go2generics

1. 下载 [golang-design/go2generics](https://github.com/golang-design/go2generics "golang-design/go2generics")

```shell
$ go get golang.design/x/go2generics
go: downloading golang.design/x/go2generics v0.0.0-20210310100031-75b5322c9fb9
```

2. 进入 go2generics 目录

```shell
$ gotip run demo/ex1-sort.go
sorted: [1 2 3]
sorted: [1 2 3]
$ gotip run demo/ex2-mapreduce.go
ret: [2 4 6 8 10 12 14 16 18 20]
ret: 55
$ gotip run demo/ex3-stack.go
$ gotip run demo/ex4-map.go
OK
$ cd errors      && gotip test
PASS
ok  	golang.design/x/go2generics/errors	0.275s
$ cd fmt         && gotip test
1
2
3
PASS
ok  	golang.design/x/go2generics/fmt	0.284s
$ cd future      && gotip test
PASS
ok  	golang.design/x/go2generics/future	1.365s
$ cd linalg      && gotip test
PASS
ok  	golang.design/x/go2generics/linalg	0.273s
$ cd list        && gotip test
PASS
ok  	golang.design/x/go2generics/list	0.264s
$ cd math        && gotip test
PASS
ok  	golang.design/x/go2generics/math	0.264s
$ cd metrics     && gotip test
PASS
ok  	golang.design/x/go2generics/metrics	0.265s
$ cd ring        && gotip test
PASS
ok  	golang.design/x/go2generics/ring	0.261s
$ cd stack       && gotip test
PASS
ok  	golang.design/x/go2generics/stack	0.319s
$ cd strings     && gotip test
PASS
ok  	golang.design/x/go2generics/strings	0.267s
$ cd sync/atomic && gotip test
PASS
ok  	golang.design/x/go2generics/sync/atomic	0.658s
$ cd tree        && gotip test
?   	golang.design/x/go2generics/tree	[no test files]
```

### 已知问题

由于当前 Go 的编译器实现上不完整，目前（2021.08.22）已知这些问题：

- 泛型切片表达式尚未实现
- 公开函数的导出和包的导入还需要完善
- 更多类型检查相关的完善
- 更多满足语言规范的代码（暂时）还不能正常编译执行。

例如这些目录下的代码：

+ chans
+ demo/ex5-loadbalance.go
+ graph
+ maps
+ sched
+ slices
+ sync

## 进一步阅读（有关 Go 泛型的 Slide，视频）

- [Go 泛型：Constrained Type Parameters](https://changkun.de/s/go2generics/ "Go 泛型：Constrained Type Parameters")
- [Go 泛型：预览](https://docs.google.com/presentation/d/1EG7e68ySeyOzkAmNy-G-h4ks632XZq3BNT7OyHoFpOk/edit?usp=sharing "go 泛型：预览")
- [Go 泛型研究](https://github.com/golang-design/go2generics/blob/master/generics.md "Go 泛型研究")
- [Go 夜读第 80 期：带你提前玩 Go 2 新特性：泛型](https://www.bilibili.com/video/BV1k7411R7ya/ "Go 夜读第 80 期：带你提前玩 Go 2 新特性：泛型")

# 参考资料

[1] 343732: cmd/compile: enable -G=3 by default | https://go-review.googlesource.com/c/go/+/343732 : https://go-review.googlesource.com/c/go/+/343732
[2] 安装 gotip: https://pkg.go.dev/golang.org/dl/gotip
[3] golang-design/go2generics: https://github.com/golang-design/go2generics
[4] Go 泛型：Constrained Type Parameters: https://changkun.de/s/go2generics/
[5] go 泛型：预览: https://docs.google.com/presentation/d/1EG7e68ySeyOzkAmNy-G-h4ks632XZq3BNT7OyHoFpOk/edit?usp=sharing
[6] Go 泛型研究: https://github.com/golang-design/go2generics/blob/master/generics.md
[7] Go 夜读第 80 期：带你提前玩 Go 2 新特性：泛型: https://www.bilibili.com/video/BV1k7411R7ya/

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


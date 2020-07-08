---
title: '[读论文]理解 Go 在实际使用中的 Bugs'
keywords: golang, bugs, concurrency, paper, Go, Concurrency Bug, Bug Study
date: 2019-03-06T07:00:00+08:00
lastmod: 2019-03-06T07:00:00+08:00
draft: false
description: '[Read Paper]Understanding Real-World Concurrency Bugs in Go（[读论文]理解 Go 在实际使用中的 Bugs）'
categories: [golang]
tags: [golang, bugs, concurrency, paper]
comments: true
author: mai
---

## 《Understanding Real-World Concurrency Bugs in Go》作者

Tengfei Tu∗
BUPT, Pennsylvania State University(BUPT,宾夕法尼亚州立大学)
tutengfei.kevin@bupt.edu.cn

Xiaoyu Liu†
Purdue University(普渡大学)
liu1962@purdue.edu

Linhai Song
Pennsylvania State University(宾夕法尼亚州立大学)
songlh@ist.psu.edu

Yiying Zhang
Purdue University(普渡大学)
yiying@purdue.edu

## 摘要

在这篇论文中，我们首先对实际 Go 程序中的并发 bug 进行了系统的研究。

我们研究了 6 个流行的 Go 软件，包括 Docker, Kubernetes, gRPC, etcd, CockroachDB, BoltDB。

我们一共分析了 171 个并发 bug，其中超过一半以上是由非传统/惯例所导致，Go 特定问题。

除了这些错误的根本原因，我们还研究了它们的修复，执行实验来重现它们，并使用两个公开可用的 Go 错误检测器对它们进行评估。

总的来说，我们的研究提供了一种更好理解的 Go 并发模型，并能指导未来的研究人员和实践者写出更好、更可靠的 Go 软件。在开发调试和诊断 Go 工具。

## 简介

错误分类：bug 的原因和行为。

bug 的原因：
- 用共享内存引起的错误
- 误用消息传递引起的错误

行为：
- 阻塞错误(那些涉及(任意数量)不能继续的goroutines)
- 非阻塞错误(那些不涉及任何阻塞的goroutines)

！！！看思维导图的分类。

令人惊讶的是，我们的研究表明，消息传递并发性错误与共享内存并发性错误一样容易，有时甚至更容易。
例如，大约58%的阻塞错误是由消息传递引起的。

除了违反 Go 的 channel 使用规则外（在一个没有人发送数据或关闭的 channel 上等待），许多并发错误是由消息传递和Go中的其他新语义和新库的混合使用造成的，这些混合使用很容易被忽略，但是很难检测到。

为了演示消息传递中的错误，我们使用图1中 Kubernetes 的一个阻塞错误。

```golang
1 func finishReq(timeout time.Duration) r ob {
2	- ch := make(chan ob)
3	+ ch := make(chan ob, 1)
4	go func() {
5		result := fn()
6		ch <- result // block
7	}
8	select {
9		case result = <- ch:
10 		return result
11 		case <- time.After(timeout):
12 		return nil
13 	}
14}
```

`finishReq` 函数在第4行使用匿名函数创建一个子 goroutine 来处理请求——这是服务器程序的常见做法。

子 goroutine 执行 `fn()` 并通过第 6 行通道 `ch` 将结果发送回父 goroutine。

子进程将会被阻塞在第 6 行，直到父进程从第 9 行获取结果。

与此同时，父进程也会阻塞，直到子进程将结果发送到 ch 时为止（第 9 行）或超时发生时（第 11 行）。

如果超时发生得更早，或者如果 go runtime（非确定性）在两种情况都有效的情况下选择第 11 行的情况，那么父进程将在第 12 行从 `finishReq()` 返回，并且没有其他人可以从 `ch` 中获取结果，从而导致子进程永远被阻塞。
>注意：现在 kubernetes 的最新代码中函数名叫：`func finishRequest(timeout time.Duration, fn resultFunc)`

解决方案是将 ch 从一个无缓冲通道更改为一个缓冲通道，这样即使父通道已经退出，子通道 goroutine 也可以始终发送结果。

Github: https://github.com/system-pclub/go-concurrency-bugs

## 背景和应用

1. Goroutine
2. 用共享内存同步

支持各种传统的同步原语：lock/unlock (Mutex), read/write lock
(RWMutex), condition variable (Cond), and atomic read/write
(atomic). 

Go 的 RWMutex 实现跟 C 的 pthread_rwlock_t 有所不同。在Go 中 写锁请求比读锁请求更优先。

Once 是一个由 Go 设计的新的原语。

WaitGroup

Chan

select
>When more than one cases in a select are valid, Go will randomly choose one to execute. 

...

## 结论

我们的研究提供了许多有趣的发现和启示。
我们希望我们的研究能够加深对Go并发漏洞的理解，引起更多对Go并发漏洞的关注。

## 参考资料

1. [Understanding Real-World Concurrency Bugs in Go](https://songlh.github.io/paper/go-study.pdf)
2. [理解真实世界的并发 Bug](https://learnku.com/articles/24850)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



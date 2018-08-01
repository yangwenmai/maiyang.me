---
layout: post
title: 'Golang 如何进行 cpu 和内存开销分析？'
keywords: Golang, CPU, Memory, Profiling, pprof
date: 2017-12-13 14:36:00
description: '本文给大家还原一下我们在UDDB入坑的完整指南'
categories: [Golang]
tags: [Golang, CPU, Memory, Profiling, pprof]
comments: true
author: mai
---

    本文是我们在分析CPU和内存开销的过程中踩过的一些坑，还有一些经验总结，希望能够对大家有所帮助。

----

前言

作为DevOps，我们在日常搞的项目,从开发到测试然后上线，我们基本都局限在功能的单元测试，对一些性能上的细节很多人包括我自己，往往都选择视而不见， 后果往往让工具应用产生不可预测的灾难（it’s true）。有些人说底层的东西，或者代码层面的性能调优太深入了，性能提升可以用硬件来补，但我觉得这只是自欺欺人的想法，提升硬件配置这种土豪方法不能一直长存的，更何况 现在我们的工具哪个不是分布式的，哪个不是集群上跑的，为了冗余也好，为了易于横向扩展也罢，不可能保证所有的服务器都具备高性能的，我们不能让某些低配的服务器运行我们有性能缺陷的代码产生短板，成为瓶颈。
我记得2016年参与了一些通用服务agent的开发，由于要运行于公司全网几乎所有服务器中，生产上的环境复杂程度超乎我们想象。
一个问题到达很深入的时候，就已经是共同的问题
更何况Go语言已经为开发者内置配套了很多性能调优监控的好工具和方法，这大大提升了我们profile分析的效率，除了编码技巧，不断在实战项目中磨炼自己 对性能问题分析的能力，对日后我们在项目的把控力和一些功能布局都是很有帮助。

Golang的性能调优手段

Go语言内置的CPU和Heap profiler

Go强大之处是它已经在语言层面集成了profile采样工具,并且允许我们在程序的运行时使用它们，
使用Go的profiler我们能获取以下的样本信息：
* CPU profiles
* Heap profiles
* block profile、traces等
Go语言常见的profiling使用场景

<!--more-->

* 基准测试文件：例如使用命令go test . -bench . -cpuprofile prof.cpu 生成采样文件后，再通过命令 go tool pprof [binary] prof.cpu 来进行分析。
* import _ net/http/pprof：如果我们的应用是一个web服务，我们可以在http服务启动的代码文件(eg: main.go)添加 import _ net/http/pprof，这样我们的服务 便能自动开启profile功能，有助于我们直接分析采样结果。
* 通过在代码里面调用 runtime.StartCPUProfile或者runtime.WriteHeapProfile
更多调试的使用，建议可以阅读The Go Blog的 Profiling Go Programs
go-torch

在没有使用go-torch之前，我们要分析一分profile文件的时候，遇到结构简单的还好，但遇到一些调用关系复杂的，我相信大部分程序员都觉得无从下手，如下图：

这样的结构，带给我们的是晦涩难懂的感觉，我们需要寻求更直观，更简单的分析工具。
go-torch是Uber公司开源的一款针对Go语言程序的火焰图生成工具，能收集 stack traces,并把它们整理成火焰图，直观地程序给开发人员。
go-torch是基于使用BrendanGregg创建的火焰图工具生成直观的图像，很方便地分析Go的各个方法所占用的CPU的时间， 火焰图是一个新的方法来可视化CPU的使用情况，本文中我会展示如何使用它辅助我们排查问题。

...

## 参考资料 ##



----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

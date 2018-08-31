---
title: '选型 gRPC 的思考 - gRPC 与 HTTP 性能测试分析'
keywords: golang, gRPC
date: 2018-08-29T06:00:00+08:00
lastmod: 2018-08-29T06:00:00+08:00
draft: false
description: '选型 gRPC 的思考 - gRPC 与 HTTP 性能测试分析'
categories: [golang]
tags: [golang, gRPC, http]
comments: true
author: mai
---

----

## 为什么 gRPC 性能不好，但是很多大厂或者知名开源项目都采用它呢？

性能不是唯一的衡量标准，社区、生态、标准化等都是重要的考虑因素。

----

## 参考资料

1. https://github.com/rpcx-ecosystem/rpcx-benchmark
2. https://github.com/chrislee87/rpc_benchmark
3. https://github.com/bojand/ghz
4. https://github.com/plutov/benchmark-grpc-protobuf-vs-http-json(测试结果与这个 https://github.com/stuartjbrown/grpc_bench 测试结果不符，根源在于？)
5. https://github.com/NoodlesMoMo/grpc_benchmark

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

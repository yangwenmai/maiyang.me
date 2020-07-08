---
title: '为什么 proto3 移除了 required 和 optional？'
keywords: protobuf, required, optional
date: 2018-09-17T06:00:00+08:00
lastmod: 2018-09-17T06:00:00+08:00
draft: false
description: '为什么 proto3 移除了 required 和 optional？'
categories: [protobuf]
tags: [protobuf, required, optional]
comments: true
author: mai
---

我们删除了 proto3 中的 required 字段，因为 required 字段通常被认为是有害的并且违反了 protobuf 的兼容性语义。

使用 protobuf 的整个想法是，它允许您添加/删除协议定义中的字段，同时仍然完全向前/向后兼容较新/较旧的二进制文件。
>required 字段打破了这一点。

您永远不能安全地向 `.proto` 定义添加 required 字段，也不能安全地删除现有的 required 字段，因为这两个操作都会破坏 wire 兼容性。

例如，如果向 `.proto` 定义添加 required 字段，则使用旧定义构建的二进制文件将无法解析使用旧定义序列化的数据，因为旧数据中不存在 required 字段。

在一个复杂的系统中，`.proto` 定义在系统的许多不同组件中广泛共享，添加/删除 required 字段可以轻松地降低系统的多个部分。

我们已经多次看到由此造成的生产问题，并且 Google 内部几乎禁止任何人添加/删除 required 字段。
>出于这个原因，我们完全删除了 proto3 中的 required 字段。

## 参考资料

1. [why messge type remove 'required,optional'?](https://github.com/protocolbuffers/protobuf/issues/2497)
2. [Why required and optional is removed in Protocol Buffers 3](https://stackoverflow.com/questions/31801257/why-required-and-optional-is-removed-in-protocol-buffers-3)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



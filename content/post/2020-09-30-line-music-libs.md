---
title: 'LINE Music Team 使用了那些第三方库？'
keywords: golang, line, music team, 第三方库, lib
date: 2020-09-30T11:15:00+08:00
lastmod: 2020-10-11T06:32:00+08:00
draft: false
description: 'LINE Music Team 使用到的那些第三方库'
categories: [golang]
tags: [golang, line, music team, 第三方库, lib]
comments: true
author: mai
---

## LINE 是什么？

LINE 是由 Naver 集团旗下 LINE 株式会社所开发的即时通信平台，于 2011 年 6 月发布。用户通过互联网免费与其他用户发送信息、观看直播，还可以通过 LINE 进行购物、移动支付及获取新闻信息等功能。

你可以将它比作国内的微信（WeChat）。

## LINE Music Team 又是什么？

LINE 上的音乐服务，【LINE MUSIC】可以独家去原唱跟唱：歌神由你来当！

## LINE Music 服务架构

微服务系统框架：

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/line_micro_service_system.png)

服务架构：
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/line_system_arch.png)

## LINE Music Team 使用了那些第三方库

介绍团队使用的每個工具是如何选择和应用于当前的微服务，在这张架构图中清楚的展示了使用 golang 的微服务中，每個服务是通过哪些流程达到互相沟通的。

### 外部部分

分 Web、APP、External Resource（第三方資源）：

- Web: 由于界面上比 App 复杂，因此在大部分的情況下会选用 GraphQL 增加弹性提供界面让前端开发者可以有较多的选项去获取数据。
  - 推荐组件：[99designs/gqlgen](https://github.com/99designs/gqlgen)，并且很快地整合到 [Gin](https://github.com/gin-gonic/gin) 当中
- App：因为界面大小受限，因此大部分情況下是提供 RESTful API 让 App 开发者去对接。
- External Resource: 当合作厂商更新了资源（比如: 音乐、歌手）时，为了确保资源的及时性，选择通过 WebSocket 让客户端和 Server 通信。

### 内部部分

- 使用 [Gin](https://github.com/gin-gonic/gin) 框架来作为 API Gateway 对接前端的需求。
  - 在 Routing 可以很快速的划分 Group 和 Controller 共用
  - 定制 Middleware 很方便
- 使用 gRPC 作为内部服务，降低 Response time（[grpc-go](https://github.com/grpc/grpc-go)）
- 因为是为微服务，因此连通 API 是很有必要的，分享者推荐使用：[resty](https://github.com/go-resty/resty)，可以定制化 Before & After 的 Middleware
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/line_resty_guide.png)
- DataBase 使用 [GORM](https://github.com/go-gorm/gorm) 来连接 MySQL 加速开发效率，在使用 Preload、hook、Auto Migration 方面都很方便
- Redis 部分会处理 cookie、Session、Cache 的部分，推荐使用 [go-redis](https://github.com/go-redis/redis)
- Kafka 大多处理 Event log ，因为 Log 的使用场景是不需要非常即时的，所以使用 Queue 当做 Middleware 降低数据库的负担，推荐使用 [Shopify/sarama](https://github.com/Shopify/sarama)，使用场景的流程图如下：

- 前面提到使用 WebSocket 来对接前端，而 Server 端则是使用 [melody](https://github.com/olahol/melody) 来启服务
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/line_kafka_event_log.png)
- LINE Music Team 的微服务目录，参考的是 [golang-standards/project-layout](https://github.com/golang-standards/project-layout) 结构来建立所有的目录，借用集众人贡献的 project ，也可以看出 LINE 是很重视参与开源

- 每段程序中会有生命周期，当开发者在使用特定程序做依赖注入（Dependency Injection），让代码可以处理事件前后所需要做的相关功能（比如：显示错误日志时可以发送到 [Sentry](https://sentry.io/welcome/)）

以下两个组件可以参考：

- dig: [https://github.com/uber-go/dig](https://github.com/uber-go/dig)
- fix: [https://github.com/uber-go/fx](https://github.com/uber-go/fx)

上面介绍了很多在开发上使用的工具组件，最后一定要写测试来确保自己的程序是具有可靠性的，推荐 [testify](https://github.com/stretchr/testify) 和 [goconvey](https://github.com/smartystreets/goconvey) 来做测试相关的操作

## 参考资料

1. [LINE 開發社群計畫: Golang #54 場社群小聚心得 - YouTube 视频回看](https://youtu.be/ShZsxFl0Ph4)
2. [LINE 開發社群計畫: Golang #54 場社群小聚心得 - 文字整理稿](https://engineering.linecorp.com/zh-hant/blog/20200923-golangtw/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

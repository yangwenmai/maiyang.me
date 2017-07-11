---
layout: post
title: '一小时入门 golang'
keywords: redis, golang
date: 2017-06-19 22:20
description: '一小时入门 golang'
categories: [golang]
tags: [golang]
comments: true
group: archive
icon: file-o
---

	本文耗时x分钟，阅读需要x分钟。

----

本文是《一小时入门Go语言》的答疑。希望能对一些初学者有帮助。

Q1:@ziksang go语言试用于什么方面，与node.js比价值有什么优势，有什么不如node.js？
A1:Go 语言适用于所有服务器端，特别是在高并发分布式领域，他的并发特可以很容易满足你的需求

TJ 在几年前都已经转Go了。

TJ是谁？
程序员兼艺术家，Koa、Co、Express、jade、mocha、node-canvas、commander.js等知名开源项目的创建和贡献者。

对node npm社区代码贡献截止目前占到整个社区的3.04%

知乎上有这样的回答：（https://www.zhihu.com/question/24373004）

今日头条Go 语言微服务实践 http://mp.weixin.qq.com/s/CJL0Ttexvh7XT1zoNLOJrA

Q2:@Adele 哪些有名的产品或项目用了此语言？
A2:Docker、TiDB、kingshard，nsq,etcd,InfluxDB,open-falcon

https://github.com/trending/go或者（掘金 Chrome 插件，关注Github上Go版块）
http://awesome-go.com

Q3:@咸柠沙士 请教老师您是怎么做包依赖管理的？
A3:godep,govendor,dep
目前我们团队使用govendor，基于go1.5提出来的vendor管理办法。
dep是google官方出的一个解决方案。

govendor拉github上的东西经常拉不动，有什么好的解决方法？
翻墙，或者自己clone下来到相关目录。

有人提到一些代码可以fork到coding，我的建议是直接到GitHub。

Q4：@果冻 PHP可以转型Go吗？多久或如何能精通？
A4:有计算机基础一两天入门没问题，一周上手开发，精通不太好说。开发语言不一定要精通才可以养家，大家不要被精通这个字蒙蔽了双眼，要看清本质。
一个开发人员水平的高低不完全是语言本身是否精通。

Q5：@胡戎 对于依赖管理和go项目的git管理方法比如哪些文件需要放进git，clone下来后需要做什么，您能指导下吗？比如node项目clone下来直接npm install，go有gopath，管理项目应该怎么做呢？所有的的项目只要放在gopath内还是每个项目一个gopath呢？这个系统中，网关、配置中心以及请求跟踪用什么方案？
A5:依赖可以放到vendor里面，也可以放在gopath下。一个项目可以一个gopath，也可以多个项目一个gopath，看你自己的实际情况和需要。

Q6：@崔峥@电视淘宝 请老师推荐一套完善的基于Go语言实现的微服务系统。请老师推荐，Go语言界有哪些完善的微服务系统，满足：组件丰富，开发框架统一，并且有巨头推动？
A6:https://github.com/smallnest/rpcx
核心是etcd,influxdb,统计可以看看go-metrics.

你的服务在有需要的情况下才进行微服务化，不要过度设计，也不要过度依赖框架。

Q7@崔峥@电视淘宝 推荐一个基于Go的MongoDB ORM层库Rails这套开发框架在产品初期，开发效率特别高，辅助方法很多，尤其是ORM层设计的非常易用。特别是Rails+MongoID+Mongo数据库这套配合起来，实现表间的关联关系非常简单，has_many belongs_to等等。我最近用Go开发一个docker集群的API系统，使用Mongo做数据库，但我没有找到一款成熟的Go的Mongo ORM库。我在github上能找到的库一般只有几十或者小几百的star，看起来非常不成熟，请老师推荐一款？go语言的其他NoSQL数据库的ORM层有推荐么？
A7:有几个备选库，你可以看哪个适合你的设计和实现风格，你就选哪一个，这样即便是有问题，你自己也能补上。

不过Go的风格是统一的，所以还好。

Go语言的一些数据库 client推荐。

redis:https://github.com/go-redis/redis
MySQL:gorp,sqlx
Memcache:https://github.com/bradfitz/gomemcache


Q8@张智城 投资go语言值得吗？为什么？学习周期有多长？
A8:非常值得学习，市场需求量大，本身也简单。

早期投资比后期跟进收效好，学习什么语言是你自己的选择和规划，但是Go语言值得你投资。

Q9@灰灰 go做gui的软件开发，有没有优势
A9:https://github.com/jroimartin/go-cui


Q10@不老猫 用go做web开发推荐什么框架组合？ 使用mysql redis mongodb？
A10:beego（https://github.com/astaxie/beego），faygo（https://github.com/henrylee2cn/faygo），xingyun，fasthttp（https://github.com/valyala/fasthttp），echo等等

Q11@Ai~戴斌 go语言的最典型应用是哪些?作为全栈工程师需要掌握吗？
A11:全栈工程师可能用NodeJS是比较好的切入语言。但是Go不失为一个更好的后端开发语言的选择。
我们后台Web开放架构是Go+Vue（Go+React）
Go比较典型的场景是分布式系统和服务器端API

Q12@Geekจุ๊บ Go语言有没有考虑过，用来做监控系统？
A12:小米开源监控系统：http://open-falcon.org/
http://prometheus.io/

Q13@DEMI.W 第一次接触编程语言的，该怎么学？从何下手？
A13:Go向导（https://go-tour-zh.appspot.com/welcome/1）
Go示例（https://gobyexample.com）
Go入门指南（http://github.com/Unknwon/the-way-to-go_ZH_CN）
Go构建Web应用（http://github.com/astaxie/build-web-application-with-golang）
还有无闻的Go语言学习视频。

Q14@KimmyLeo 怎么看待Go的类型系统？以及，有没有合适的替代高阶泛型的Go的工具或者库？
A14:这个不是很了解。

Q15@Ai~戴斌 go语言编译器效率如何？如何优化对性能要求高的场景？
A15:Go语言的编译器很好，性能很好。

Go性能虽然比不上C，但是他对开发人员更友好，所以开发效率更高。

Q16@马博文 go对函数式编程的支持如何？有没有什么推荐的资料学习？
A16：Go语言也支持闭包。

Q17@ziksang 有go语言对人工智能支持和开发有哪些优势？
A17:目前人工智能和机器学习领域，语言方面还是Python更优一些，但是随着Go的入局，很快会有很多很好的库支持的。

Q18@齐涛-道长 有什么比较好的go开源项目推介？
A18:TiDB,etcd,influxdb,nsq

开源项目的学习，我觉得主要还是要找到你自己感兴趣的方向，然后找到对应的一些项目去研究，从一点一点的入手，有针对性的学习，这样收获才最大，吸收才最好。

可以从一些简单的，比如工具类的实现，标准库的一些方法实现，然后慢慢升级到一些组件，框架，底层服务。

比方说：MySQL，redis，memcache等client，fasthttp,

Q19@ go在web开发的最佳实践有哪些？如何结合和php起来？
A19：都在用Go了，为什么还要跟PHP结合呢？直接替换掉它。

Q20:orm怎么看？
A20:适合自己以及团队就好了。

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)
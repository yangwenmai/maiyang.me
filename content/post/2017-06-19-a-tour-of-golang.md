---
layout: post
title: '一小时入门 golang'
keywords: redis, golang
date: 2017-06-19 22:20:00
description: '一小时入门 golang'
categories: [Golang]
tags: [golang]
comments: true
group: archive
icon: file-o
---

	本文耗时x分钟，阅读需要x分钟。

----

# 如何学习一门语言

学习一门新的开发语言最重要的就是做到三点：

1. 基础知识
2. 学习抄代码
3. 学习写代码

## 服务开发语言有哪些？

- C/C++
- Java
- Ruby
- Go
- Rust
- PHP
- Erlang
- Python
- NodeJS

1. C/C++ 是在大学的时候学过，基本没有怎么用于实际开发，写起来很痛苦。（传统行业、腾讯系、游戏服务器等等）
3. Java 使用过 4 年时间，主要是 J2EE 以及游戏后端服务器开发。（金融、保险等行业、阿里巴巴、京东）
4. Ruby 使用过 1 年时间，主要是写应用的 API 接口，了解过 Ruby on Rails。（薄荷科技、其他小公司）
5. Golang 从2015年开始使用，非常好用的一门编程语言，用起来爱不释手。（七牛，360，美图，百度，PingCAP等等）
6. Python 一些简单的日常运维工具，或者统计分析脚本。（运维方向、机器学习/人工智能领域用的比较多）
7. NodeJS 一般被一些前端开发工程师推崇，或者做全栈工程师推崇。
8. Rust，Erlang 基本没怎么了解过。

# C10K 和 C1000K

服务器C10K和C1000K问题

"Go not only solves C10K problem it blows it away with C1000K."


# Why Go？

![Rob pike 的插图]()

- 语法简单，上手快（25个关键保留字）
- 性能高，编译快，开发效率不必Python/Ruby低
- 部署方便，编译包小，几乎无依赖（二进制文件包可直接运行）
- 原生支持并发（goroutine）
- 官方统一规范（gofmt, golint…）
- 丰富的标准库


# Go 语言

Go 是 Google 开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。为了方便搜索和识别，有时会将其称为Golang。 摘自维基百科。

Go 的发展历程
![enter image description here](http://images.gitbook.cn/9014da80-568e-11e7-9c30-ab840daf9283)

## Go 特点

1. Go 是一种新的语言，是一种支持并发、带垃圾回收、可快速编译的静态语言。
2. Go 为并发执行与通信提供了基本的支持，是天生的高性能服务开发语言。
3. Go 结合了解释型语言的游刃有余，动态类型语言的开发效率，以及静态类型的安全性。
4. Go 只需要用几秒钟的时间就可以编译一个大型的 Go 程序，部署也非常容易。
5. Go 具有 Python/Ruby 的开发效率，同时又有 C 语言的运行性能（不过还是有一定差距的）。
6. Go 简单（只有 25 个保留字）
7. Go 有自己的开发规范，还提供工具支持
	gofmt 格式化工具
	golint 代码规范检查
	go vet 可帮我们静态分析我们的源码可能存在的问题

现在也有集成度比较高的，比方说：gometalinter

<!--more-->

一个简单的 Go 程序：

```golang
package main

import "fmt"

func main() {
	fmt.Println("hello, world")
}
```

## Go 安装演示

Go 安装有多种办法：

我这里只给大家演示一种：解压缩包后配置环境变量。

```
export GOROOT=$HOME/go # go 语言的源路径
export GOPATH=$HOME/gopath # gopath 路径
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin # 设置path
```

Go 安装向导：https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/01.1.md

![enter image description here](http://images.gitbook.cn/b7d4c990-568e-11e7-9c30-ab840daf9283)

## Go 开发工具

- vim+vim-go（经常使用）
- vscode+golang plugin（经常使用）
- IntelliJ Idea
- sublime text 3+golang plugin
- Goland
- LiteIDE
- Atom+golang plugin

我比较推荐的是vim、vscode、sublime text 3，不过开发工具一直以来都是“萝卜青菜，各有所爱”，你自己选择吧。

我用了很长时间的 IntelliJ Idea，现在已经转向vim和vscode了，不得不说 Microsoft 出品的 vscode 是一个非常不错的开发工具。

我们公司的前端开发已经从 sublime text 3转到了 vscode 上了，开发前端（vue，react.js）很舒服。

这里有一篇文章([维护一个大型开源项目是怎样的体验？](https://www.zhihu.com/
question/36292298))，大家可以下来慢慢品味。

## Go 命令

### 标准命令详解

	- go build
	- go install
	- go get
	- go clean
	- go doc与godoc
	- go run
	- go test
	- go list
	- go fix与go tool fix
	- go vet与go tool vet
	- go tool pprof
	- go tool cgo
	- go env

详细解释请移步：https://github.com/hyper0x/go_command_tutorial

## Golang 基本介绍

1. 基础
	1. 包、变量和函数。
	2. 流程控制语句：for,if,else,switch,defer。
	3. 复杂类型：struct、slice 和 map。

2. 方法和接口
3. 并发

### 25个保留字

break	default	func	interface	select
case	defer	go	map	struct
chan	else	goto	package	switch
const	fallthrough	if	range	type
continue	for	import	return	var

### 36个预定的标识符

append	bool	byte	cap	close	complex
complex64	complex128	uint16	copy	false	float32
float64	imag	int	int8	int16	uint32
int32	int64	iota	len	make	new
nil	panic	uint64	print	println	real
recover	string	true	uint	uint8	uintprt

### 运算符

优先级 	运算符
 7 		^ !
 6 		* / % << >> & &^
 5 		+ - | ^
 4 		== != < <= >= >
 3 		<-
 2 		&&
 1 		||

### 基本的控制结构

	- if-else 结构
	- switch 结构
	- select 结构，用于 channel 的选择
	- for (range) 结构

### 多返回值

Go 语言的函数经常使用两个返回值来表示执行是否成功：返回某个值以及 true 表示成功；返回零值（或 nil）和 false 表示失败。

当不使用 true 或 false 的时候，也可以使用一个 error 类型的变量来代替作为第二个返回值：成功执行的话，error 的值为 nil，否则就会包含相应的错误信息（Go 语言中的错误类型为 error: var err error）。

这样一来，就很明显需要用一个 if 语句来测试执行结果；由于其符号的原因，这样的形式又称之为 comma,ok 模式（pattern）。

## Golang 基本数据类型

### 基本类型

#### Boolean类型

- 系统为此类型定义了两个常量：true 和 false。
- 初始默认值为：false。
- 格式化输出时的格式字符串为：%t。

#### 整数类型

初始默认值为：0
分为有符号整型和无符号整型

有符号整型：

int8（-128 -> 127）
int16（-32768 -> 32767）
int32（-2,147,483,648 -> 2,147,483,647）
int64（-9,223,372,036,854,775,808 -> 9,223,372,036,854,775,807）
int

无符号整型：

uint8（0 -> 255）
uint16（0 -> 65,535）
uint32（0 -> 4,294,967,295）
uint64（0 -> 18,446,744,073,709,551,615）
uint

#### 浮点型（IEEE-754 标准）：

初始默认值为：0.0
注意：这里没有float的类型，且两个浮点数比较时不能使用== 和 !=

float32（+- 1e-45 -> +- 3.4 * 1e38）
float64（+- 5 * 1e-324 -> 107 * 1e308）

#### 复数类型

complex64：实数与虚数都是32位
complex128： 实数与虚数都是64位
real（c）：获取实数部分
imag（c）：获取虚数部分

#### 字符类型

1. 严格的说，在Go中没有此类型类型，它是特殊的整数类型。
2. 它对应uint8类型，对传统的ASCII码对应，占1byte。
3. 同时也支持Unicode（UTF-8）的编码，所以它可能点多个byte，被称为Unicode code points或runes。此时它对应的int32的数字类型
4. 包含在单引号中

#### 字符串类型

1. 一串UTF-8编码格式的字符（可能占1~4byte）
2. 包含在双引号中，只能在独立的一行内。（Interpreted string）
3. 包含在反引号中，可以跨越多行。（raw string）
注1：Go所有的代码都是UTF-8格式，所以不存在对字符进行编码和解码。
注2：它是不可变的值类型，所以不能直接修改字符串。

#### 指针类型

1. 占4byte大小。
2. 各种数据类型都有对应的指针类型。
3. 声明方法类似于C中对指针的声明： *type

#### 其他

结构化的（复合的），如：struct、array、slice、map、channel；

只描述类型的行为的，如：interface


## Golang 开发规范

这一块内容，我们不需要多说，直接上go官方标准。

- gofmt
- golint
- …
- gometalinter
- goreportcard

## Golang 单元测试与测试覆盖率

- goconvey
- overalls
- goveralls

## Golang 持续集成

在GitHub上做持续集成非常简单，只需要添加`.travis-ci.yml`；
如果是Gitlab 8.0以上也非常简单，只需要添加`.gitlab-ci.yml`。

可以参考我的文章：https://github.com/yangwenmai/how-to-add-badge-in-github-readme

## Golang 标准库/标准包

比较常用的有：

fmt
time
strings
strconv
io/ioutil
encoding/json
net/http
database/sql

Go 标准库中文文档：http://cngolib.com

## Go 哪些源码值得学习？

- golang/go
- pingcap/tidb
- flike/kingshard
- astaxie/beego
- 其他（比如：influxdb,etcd,grafana,promethues)…
- 更多可以去 avelino/awesome-go 这里找自己感兴趣的。


## Go 可能的坑

1. gc 问题(其实一般场景大家遇不到)
2. defer 问题（FILO）
3. nil 与 interface
4. 没有泛型（reflect，代码生成）
5. :=导致的变量覆盖
6. 没有自动类型转换（var i int; var j int32 = 1; i ＝ j; （语法错误））
7. 其他…

[50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs](http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html)
[Golang开发新手常犯的50个错](http://blog.csdn.net/gezhonglei2007/article/details/52237582)

## 自学材料

1. golang示例（https://gobyexample.com）
2. golang向导（https://tour.golang.org/welcome/1）
3. golang向导（https://go-tour-zh.appspot.com/welcome/1）
4. Go 入门指南（http://wiki.jikexueyuan.com/project/the-way-to-go/）
5. Golang 构建Web应用（https://github.com/astaxie/build-web-application-with-golang）
6. go学习笔记：无痕（https://github.com/qyuhen/book）
7. A tour of go (https://youtu.be/ytEkHepK08c)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

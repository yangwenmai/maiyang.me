---
layout: post
title: 'iOS 单元测试 OCUnit 使用帮助'
date: 2013-07-30 10:39
comments: true
categories: iOS
tags: ios OCUnit 帮助
author: maiyang
mathjax: true
---

iOS单元测试OCUnit使用帮助

----------

- 通过xcode创建的包含Unit Test的项目是使用的OCUnit单元测试
OCUnitProjectTests.h代码如下：

`#import <SenTestingKit/SenTestingKit.h>
@interface OCUnitProjectTests : SenTestCase
@end
`

<!--more-->

OCUnitProjectTests.m代码如下：

```
#import "OCUnitProjectTests.h"
@implementation OCUnitProjectTests

- (void)setUp
{
	[super setUp];
	// set-up code here.
}

- (void)tearDown
{
	// Tear-down code here.
	[super tearDown];
}

- (void)testExample
{
	STFail(@"Unit tests are not implemented yet in LogicTest");
}

@end
```

作为OCUnit测试类需要引入<SenTestingKit/SenTestingKit.h>头文件，并继承SenTestCase父类。
	
一般的测试方法方法名必须test开头，测试方法没有个数限制，方法中STFail式OCUnit框架定义的一个宏，是无条件断言失败，实际使用的时候要修改这个方法中的代码。

在m文件中需要重新方法setUp和tearDown，我们自己编写的测试类一样，setUp方法是初始化方法，tearDown方法是释放资源的方法，setUp和tearDown方法在每次调用测试方法之前和之后调用，因此在测试类运行的生命周期中这两个方法可能多次运行，它们的时序图
[时序图](http://iosbook1.com/wp-content/uploads/2013/01/5.jpg)
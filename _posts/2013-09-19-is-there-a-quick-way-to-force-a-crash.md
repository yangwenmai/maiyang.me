---
layout: post
title: '[译]是否有快速强制Crash的方法?'
date: 2013-09-19 08:56
comments: true
categories: 
---
> Forcing a crash is a great way to test out the SDK, but is actually a little more tricky than you might think.

强制crash是很好的一种测试SDK的方式，但实际上是一个比你想象的更棘手一点。

> **How to force a crash**
We've built a convenient API you can use to cause a crash:

###怎样去强制crash
我们构建一个便捷的API你能用于制造一个crash:

`[[Crashlytics sharedInstance] crash];`

> 1. First, make sure you place your test crashing code in a different place than **applicationDidFinishLaunching**. This is only for testing -- Crashlytics will detect crashes in your applicationDidFinishLaunching method. A good place could be a button action.
2. Next, compile, build, and run your app.
3. Then, **make sure that a debugger is not connected**.  By default, Xcode will launch applications and attach a debugger. This will prevent the crash from reporting -- **detach it**!
4. Force the crash by pressing the button you attached the crash code to, and then relaunch the app.

1. 首先，确保你把你的测试crash代码写在不同于**applicationDidFinishLaunching**地方.这仅仅为了测试--Crashlytics将检测crash在你的applicationDidFinishLaunching方法里。好方法是用一个按钮触发。
2. 接下来，编译，构建，运行你的app。
3. 然后， **确保debugger未被连接**。默认情况下，Xcode将运行应用程序且伴随了debugger。这将防止报告crash--隔离它。
4. 伴随着你的crash代码按下按钮强制crash，然后重新运行app。

> Advanced
If you'd like to see other kinds of crashes, you can experiment:

###高级
如果你喜欢看其他种类的crash，你能尝试：
`int *x = NULL; *x = 42;`

> You may also want to raise an exception.  Some common ways to do that are:

你或许也想去制造一个异常。一些通用方法是：
`
[NSObject doesNotRecognizeSelector];
[arrayWithOnlyTwoElements objectAtIndex:3];
`

> Keep in mind that exceptions are not guaranteed to a crash.  (The full code path, including code in system libraries matters here.)

记住那些异常不保证crash。（完整的代码路径，包括系统库中的代码问题在这儿。）

> Fun fact
Divide-by-zero is illegal on i386 and x84-64, but is a valid operation on ARM!  Dividing by zero will cause crashes in the simulator, but not on iOS devices.

###有趣的事实

在i386和x84-64除以0是非法的,但是在ARM上是一个有效的操作！ 在模拟器里除以0将制造crash，但是在iOS设备不会。

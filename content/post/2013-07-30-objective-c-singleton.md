---
layout: post
title: 'Objective-C单例'
date: 2013-07-30 10:44:00 +0800
comments: true
categories: [ios]
tags: [ios oc]
author: maiyang
mathjax: true
---

Objective-C 单例模式

------
- 方法一：
	单例模式是在实际项目开发中用到比较多的一种设计模式，设计原理是整个系统只产生一个对象实例，通过一个统一的方法对外提供这个实例给外部使用。
	
	在Java中，构造单例一般将类的构造函数声明为private类型，然后通过一个静态方法对外提供实例对象，那么，在OC中，如何实现单例的，请看下面完整代码。

<!--more-->

```
@implementation Car
//声明一个静态对象引用并赋为nil
static Car *sharedInstance= nil;
//声明类方法（+为类方法，也就是Java中的静态方法）
+(Car *) sharedInstance
{
     if(!sharedInstance)
     {
          sharedInstance = [[self alloc] init];
     }
     return sharedInstance;
}
@end
//覆盖allocWithZone：方法可以防止任何类创建第二个实例。使用synchronized（）可以防止多个线程同时执行该段代码（线程锁）
+（id）allocWithZone:(NSZone *) zone
{
     @synchronized(self)
     {
          if(sharedInstance == nil)
          {
               sharedInstance = [super allocWithZone:zone];
               return sharedInstance;
          }
     }
     return sharedInstance;
}
```

   好了，到这里，OC中的单例就创建完成了，使用的话，直接类名调用类方法即可。在后续的OC和IOS学习中，我会尽量用结合Java学OC，结合Android学IOS的思路来进行分析和学习，这样有一个对比，有一个相互的概念划分。
	
- 方法二：

	  在之前有一篇学习笔记中，记载了一篇如何在OC中实现单例的文章：《IOS学习笔记4—Objective C—创建单例》自苹果引入了Grand Central Dispatch (GCD)（Mac OS 10.6和iOS4.0）后，创建单例又有了新的方法，那就是使用dispatch_once函数，当然，随着演进的进行，还会有更多的更好的方法出现。今天就来简要介绍下如何利用dispatch_once创建单例。
    在开发中我们会用到NSNotificationCenter、NSFileManager等，获取他们的实例通过[NSNotificationCenter defaultCenter]和[NSFileManager defaultManager]来获取，其实这就是单例。
我们先看下函数void dispatch_once( dispatch_once_t *predicate, dispatch_block_t block);其中第一个参数predicate，该参数是检查后面第二个参数所代表的代码块是否被调用的谓词，第二个参数则是在整个应用程序中只会被调用一次的代码块。dispach_once函数中的代码块只会被执行一次，而且还是线程安全的。
    接下来我们来实现自己的单例，这里有一个SchoolManager类，为这个类实现单例:
       
```
+(SchoolManager *)sharedInstance {
    static SchoolManager *sharedManager;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        sharedManager = [[SchoolManager alloc] init];
    });
    
    return sharedManager;
}
```

到目前为止，我们就实现了一个单例，一切就搞定了，是不是很简单！
使用就按照如下方式获取唯一实例即可：

`SchoolManager *schoolManager = [SchoolManager sharedInstance];`

以上就简单介绍了使用dispatch_once函数实现单例的方法，欢迎大家补充并讨论！

来自于[唐韧CSDN博客](http://blog.csdn.net/tangren03 '唐韧')
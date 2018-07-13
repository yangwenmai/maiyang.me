---
layout: post
title: '[译]Box2D API的改变'
date: 2013-09-15 03:09:00
comments: true
categories: [Libgdx]
---
> We are cleaning up the core a little, and in the process eliminate usage of Java collections and replacing them with our own collections.

我们正在清理核心的一点，并在这个过程中用我们自己的集合去替换和消除使用的Java集合。

> One of our contributors started with box2D, see this [pull request](https://github.com/libgdx/libgdx/pull/588).

从box2D我们的贡献者之一，看pull request.

> In short:
- methods that returned ArrayLists, such as body.getFixtureList(), now return Arrays
- method calls to these objects will need to be change from ArrayList API to Array API, i.e. bodyFixtures.size() –> bodyFixures.size, bodyFixtures.isEmpty() –> (bodyFixtures.size == 0)

简言之：
- 方法返回值ArrayLists,例如`body.getFixtureList()`,现在返回Arrays
- 方法调用这些对象将需要从ArrayList API改变为Array API，例如 `bodyFixtures.size() -> bodyFixtures.size`,`bodyFixtures.isEmpty() -> (bodyFixtures.size == 0)`

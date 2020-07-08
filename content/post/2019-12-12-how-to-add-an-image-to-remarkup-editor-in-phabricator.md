---
title: '如何在 remarkup 编辑器（Phabricator）中显示图片？'
keywords: remarkup, phabricator, tools, wiki, facebook, editor
date: 2019-12-12T18:40:00+08:00
lastmod: 2019-12-12T18:40:00+08:00
draft: false
description: '如何在 remarkup 编辑器（Phabricator）中显示图片？'
categories: [工具]
tags: [remarkup, phabricator, tools, wiki, facebook, editor]
comments: true
author: mai
---

## 如何在 remarkup 编辑器（Phabricator）中显示图片？

因为 phabricator 不是使用的 markdown 来渲染，而是 remarkup，虽然 remakrup 是支持绝大多数的 markdown 语法的，但是今天要说的这个渲染图片链接，貌似就不支持。

遇到问题了，我们不要怕，先看看有没有人遇到过，直接 Google。

## 搜索关键词（中文）

中文关键词： “phabricator 渲染 图片链接” 或其他类似的关键词组。

结果：

- https://phabricator.webfuns.net/book/phabricator/article/remarkup/
- https://www.mediawiki.org/wiki/Help:Images/zh
- https://xbuba.com/questions/41833165
- http://cn.voidcc.com/question/p-fjcgmjwc-bob.html

好像以上文档都没有解决我们的问题，而且我们发现官方参考手册也未提及， StackOverflow 上还有人直接回复说，不支持。

到这里，你是不是就放弃了？
>跟自己或团队说： Phabricator 的 remarkup 不支持图片链接的渲染。

但是我要跟大家说的是，你再努力努力，或许问题会有“柳暗花明又一村”的意外收获。
>使用英文

## 搜索关键词（英文）

remarkup unsupport png url

## 使用语法

Ref [T4190](https://secure.phabricator.com/T4190). Added the remarkup rule to embed images:

Syntax is as follows:

```
{image <IMAGE_URL>}
```

Parameters are also supported, like:

```
{image uri=<IMAGE_URI>, width=500px, height=200px, alt=picture of a moose, href=google.com}
```

URLs without a protocol are not supported.

## 源码解读

核心代码：
```php
public function apply($text) {
	return preg_replace_callback(
      '@{(image|img) ((?:[^}\\\\]+|\\\\.)*)}@m',
      array($this, 'markupImage'),
      $text);
}
```

对源码有兴趣的小伙伴，可以直接点击前往了解：https://secure.phabricator.com/D16597

## 参考资料

1. [Remarkup Reference](https://secure.phabricator.com/book/phabricator/article/remarkup/)
2. [Remarkup 参考](https://phabricator.webfuns.net/book/phabricator/article/remarkup/)
3. [Rebuild remarkup image proxying](https://secure.phabricator.com/T4190)
4. [Phabricator Remarkup rule to embed images
 D16597](https://secure.phabricator.com/D16597)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



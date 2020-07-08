---
title: 'go mod tidy 报错：verifying ...: checksum mismatch'
keywords: tools, google, chrome, modheader, modify, header
date: 2019-01-23T11:00:00+08:00
lastmod: 2019-01-23T11:00:00+08:00
draft: false
description: 'go mod tidy 报错：verifying ...: checksum mismatch'
categories: [tools]
tags: [tools, google, chrome, modheader, modify, header]
comments: true
author: mai
---

## 环境

go 1.11.4

## 执行 go mod tiny 报错

```sh
go: verifying github.com/docker/docker@v1.13.1: checksum mismatch
```

## 解决办法

```sh
$ go clean -modcache
$ cd project && rm go.sum
$ go mod tidy
```

说明：如果你之前用 go 1.11.{3, 4} 之前的版本，现在又升级到 go 1.11.4 的话，你很可能需要重新生成一次你的 mod 缓存，否则就会报错 `checksum mismatch`。

## 参考资料

1. [#29278](https://github.com/golang/go/issues/29278#issuecomment-447537558)
2. [#27093](https://github.com/golang/go/issues/27093)
2. [#29281](https://github.com/golang/go/issues/29281)
3. [#1003](https://github.com/gomods/athens/issues/1003)
4. [#29282](https://github.com/golang/go/issues/29282)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



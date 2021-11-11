---
title: '一行代码搞定 GitHub 访问徽章'
keywords: Go, GitHub, badge, 徽章
date: 2021-10-05T17:30:00+08:00
lastmod: 2021-10-05T17:30:00+08:00
draft: false
description: 'Go, GitHub, badge, 徽章'
categories: [golang]
tags: [Go, GitHub, badge, 徽章]
comments: true
author: mai
---

# 一行代码搞定你的 GitHub 访问徽章

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/go-night-1.jpg)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/go-night-2.jpg)

相信对于使用 GitHub 的小伙伴来说，以上 GitHub 徽章（badge）应该都不怎么陌生吧。如果你想快速用起来，找到你想要的徽章代码 ctrl+c & ctrl+v ，再修改对应的 GitHub username/repo_name 即可。

今天我要跟你分享的是这其中的一个小徽章 - GitHub 访问徽章。

[一行代码搞定!](https://github.com/talkgo/night/commit/3542964480fc3e45600cff40a53abff31249609f "一行代码搞定!")

这么简单就接入了，那它是怎么实现？它还有其他什么特性呢？

## urlstat 简介

`urlstat` 提供了跨网站的 pv/uv 统计。适用于 [blog.changkun.de](https://blog.changkun.de "blog.changkun.de"), [golang.design/research](https://golang.design/research "golang.design/research") 等网站的统计。

### 用法一：普通模式

在页面上添加以下代码：

```html
<script async src="//changkun.de/urlstat/client.js"></script>
```

该脚本将查找 ID 为 `urlstat-page-pv` 和 `urlstat-page-uv` 的元素，并在找到后更新信息。

```html
<span id="urlstat-page-pv"><!-- info will be inserted --></span>
<span id="urlstat-page-uv"><!-- info will be inserted --></span>
```

以下是一个 golang.design/research 例子 [golang.design/research 例子](https://golang.design/research/zero-alloc-call-sched/ "golang.design/research 例子")

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/research.png)

### 用法二：GitHub 模式

用户 query 参数： `mode=github&repo=talkgo/night`，例如：

```
![](https://changkun.de/urlstat?mode=github&repo=talkgo/night)
```

## 源码分析

1. 入口函数 `urlstat.go`

我们可以看到该项目所用到的技术： `net/http`, `embed.FS` , MongoDB 构建了一个使用 MongoDB 存储数据的 HTTP Server。

2. 核心的 API: `handler.go`

- /urlstat: 记录访问数据
- /urlstat/dashboard:  urlstat 的后台管理系统
- /urlstat/client.js: 提供给 html 页面使用的 client.js 代码 
 - 代码的主要逻辑就是去请求数据，然后将其填充到页面的两个 span 中。

2 个结构体：`stat`, `visit` 就囊括了 urlstat 的基本数据结构。

```golang
type stat struct {
	PagePV int64 `json:"page_pv"`
	PageUV int64 `json:"page_uv"`
}

type visit struct {
	Path    string    `json:"path"    bson:"path"`
	IP      string    `json:"ip"      bson:"ip"`
	UA      string    `json:"ua"      bson:"ua"`
	Referer string    `json:"referer" bson:"referer"`
	Time    time.Time `json:"time"    bson:"time"`
}
```

API 还加了 allowOrigin, allowGitHubUser，用于避免不受信的来源创建统计记录。

`/urlstat` 对应的 handler 是 recording

在这个函数里面通过 mode 来判断其使用的是网页版还是 GitHub 徽章版。

函数逻辑也很简单，首先解析数据，然后 saveVisit，然后再 countVisit，并将其结果返回。

### 徽章渲染 drawer

对于我们使用的徽章模式，项目通过 drawer 来渲染出一个 `image/svg+xml` badge，想要了解详细代码实现，可以参考这段代码: [https://github.com/changkun/urlstat/blob/main/renderer.go](https://github.com/changkun/urlstat/blob/main/renderer.go "https://github.com/changkun/urlstat/blob/main/renderer.go")

渲染出来的这个是怎么在 GitHub 上显示的呢？那我们就必须得了解一下 GitHub 匿名 URL：[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls")

文中提到 GitHub 使用 Camo，那 Camo 又是什么呢？Camo 为每个文件生成一个匿名 URL 代理，它对其他用户隐藏您的浏览器详细信息和相关信息。 URL 以 `https://<subdomain>.githubusercontent.com/` 开头，根据你上传图像的方式具有不同的子域。

以  GitHub `talkgo/night` README 为例，我们访问 GitHub 主页，就可以得到 camo 渲染代码：

```
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/142682259b230dd9ed8d7382509ecf5eab5cc54aea56d1ea7c4871292adfff8a/68747470733a2f2f6368616e676b756e2e64652f75726c737461743f6d6f64653d676974687562267265706f3d74616c6b676f2f6e69676874"><img src="https://camo.githubusercontent.com/142682259b230dd9ed8d7382509ecf5eab5cc54aea56d1ea7c4871292adfff8a/68747470733a2f2f6368616e676b756e2e64652f75726c737461743f6d6f64653d676974687562267265706f3d74616c6b676f2f6e69676874" alt="" data-canonical-src="https://changkun.de/urlstat?mode=github&amp;repo=talkgo/night" style="max-width: 100%;"></a>
```

#### 为什么要使用 camo

任何在 GitHub README.md 文件（或其他呈现的 HTML 格式）中呈现的图像都将使用 camo 呈现。

有几个原因：

1. 性能：GitHub 为大量用户提供服务，如果不这样做，页面加载时间会很糟糕。
2. 隐私：让回购所有者嵌入跟踪图像是不可接受的。
3. DDoS 角度：在外部托管图像允许恶意存储库所有者拥有相当流行的存储库，只需加载其中一个图像即可对他们选择的任何站点进行 DDoS 攻击。

更多详细解释，[参见 Github image without camo with Stack Overflow](https://stackoverflow.com/questions/57857193/github-image-without-camo "参见 Github image without camo with Stack Overflow")

至此一个简单的 urlstat 就算是完成了。


----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。


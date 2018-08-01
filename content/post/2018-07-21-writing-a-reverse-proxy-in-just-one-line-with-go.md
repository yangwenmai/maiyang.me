---
title: '[译]用一行 Go 代码实现一个反向代理'
keywords: golang, proxy, reverse-proxy
date: 2018-07-21T11:40:23+08:00
lastmod: 2018-07-21T11:40:23+08:00
draft: false
description: '用一行 Go 代码实现一个反向代理'
categories: [golang]
tags: [golang, proxy, reverse-proxy]
comments: true
author: mai
---

这是一篇翻译文章。

>原文：[Writing a Reverse Proxy in just one line with Go](https://hackernoon.com/writing-a-reverse-proxy-in-just-one-line-with-go-c1edfa78c84b)

----

这是您实际需要的所有代码......
![](https://cdn-images-1.medium.com/max/1600/1*y3GxXdKfZlqa95bl19Rytg.png)

![](https://cdn-images-1.medium.com/max/1600/0*R_W7P1UV4jQEf1j5.gif)

注意 [http-server](https://www.npmjs.com/package/http-server) 是需要你单独 npm install的。

```shell
npm install http-server -g
```

最核心的代码是：

```go
// Serve a reverse proxy for a given url
func serveReverseProxy(target string, res http.ResponseWriter, req *http.Request) {
	// parse the url
	url, _ := url.Parse(target)

	// create the reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(url)

	// Update the headers to allow for SSL redirection
	req.URL.Host = url.Host
	req.URL.Scheme = url.Scheme
	req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
	req.Host = url.Host

	// Note that ServeHttp is non blocking and uses a go routine under the hood
	proxy.ServeHTTP(res, req)
}
```

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

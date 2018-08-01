---
layout: post
title: '为 Github Pages 自定义域名博客开启 HTTPS'
keywords: Github, HTTPS
date: 2018-04-09 23:00:00
description: '为 Github Pages 自定义域名博客开启 HTTPS'
categories: [Github, blog]
tags: [Github, blog, HTTPS]
comments: true
author: mai
---

    这是转载文章。

----

## 为什么要使用 HTTPS 协议呢？

- 在浏览器和网站之间提供更安全的通讯
- HTTPS 比 HTTP 的速度更快
- 能提高搜索引擎的优化排名

>HTTPS 协议的网站在地址栏前会有绿色锁的图标，感觉有点逼格，就冲着这点，果断 HTTPS 走起。

Github Pages 本身支持 HTTPS，但仅支持 `github.io` 域名。如果绑定了自己的域名，就不支持 HTTPS 了。幸运的是，CloudFlare 提供免费的启用 HTTPS 的解决方案。

接下来就开始进入主题。

## 步骤一：配置 Github Pages

>这里就默认大家已经有 Github Pages 仓库了。如果不太清楚怎么创建的，可以先搜索一下教程。

在 Github Pages 仓库的根目录下新建一个 CNAME 文件，文件内容就是我们要绑定的域名，这一步可以直接在设置面板里配置，保存好之后回到仓库主页就能看到刚才添加的 CNAME 文件

![](https://zhouhao.me/img/https_20170721_1.png)
![](https://zhouhao.me/img/https_20170721_2.png)

## 步骤二：注册 [CloudFlare](https://www.cloudflare.com/) 账号，添加我们的域名

注册成功后在返回的页面中添加域名，点击扫描 DNS 记录，等待大约一分钟之后继续下一步。

>注意：输入的域名不需要带 www 前缀。例如：zhouhao.me

![](https://zhouhao.me/img/https_20170721_3.png)

## 步骤三：添加域名解析

CNAME 被称为规范名字，能将域名解析到另一个域名。本例中，我们将自己的域名重定向到 Github Pages URL。

![](https://zhouhao.me/img/https_20170721_4.png)

然后下一步选择免费的 CloudFlare Plan。

接下来，修改域名服务器。因为我用的是万网的 DNS，所以现在要在万网的域名控制台将 DNS 服务器修改至 CloudFlare 提供的域名服务器。

![](https://zhouhao.me/img/https_20170721_5.png)

![](https://zhouhao.me/img/https_20170721_6.png)

## 步骤四：设置 SSL 为 Flexible

![](https://zhouhao.me/img/https_20170721_7.png)

## 步骤五：添加路由重定向规则

使用通配符将路由重定向到 HTTPS 的链接。本例中将路由设置为：http://*zhouhao.me/*，协议设置为：Always Use HTTPS

![](https://zhouhao.me/img/https_20170721_8.png)

![](https://zhouhao.me/img/https_20170721_9.png)

## 总结

至此，Github Pages 绑定的自定义域名启用 HTTPS 协议就完成了，打开自己的 Github Pages 主页就能看到启用 HTTPS 的域名。

## 参考资料

1. https://zhouhao.me/2017/07/21/using-https-with-custom-domain-name-on-github-pages/

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

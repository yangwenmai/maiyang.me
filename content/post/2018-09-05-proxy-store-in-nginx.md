---
title: 'Nginx 中的 proxy_store'
keywords: Nginx
date: 2018-09-05T06:00:00+08:00
lastmod: 2018-09-05T06:00:00+08:00
draft: false
description: 'Nginx 中的 proxy_store'
categories: [nginx]
tags: [Nginx]
comments: true
author: mai
---

## Nginx proxy_store

>使用 nginx 的 proxy_store 缓存文件加速访问速度。

nginx 的 proxy_store 可以将后端服务器的文件暂存在本地。基于此，可以在 nginx 上缓存后端服务器文件，加快访问速度。 比如：

```sh
upstream http_tornado {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
}

server {
    # 省略其他配置
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|js|html|htm|css)$ {
        root /opt/data/product/blog/cache;
        proxy_store on;
        proxy_store_access user:rw group:rw all:rw;
        proxy_temp_path /opt/data/product/blog/cache;
        # 针对 html,js 等静态资源文件，判断本地是否已经缓存。
        # 如果已经缓存，则从本地获取，否则转发给后端服务器。
        if ( !-e $request_filename) {
            proxy_pass  http://http_tornado;
        }
    }
}
```

注意：由于 proxy_store 没有过期机制，因此如果后端文件有更新。需要采用其他方式删除 proxy_store 的缓存文件，以便 proxy_store 刷新文件。

----

## 参考资料

1. [ngx_http_proxy_module#proxy_store](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_store)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

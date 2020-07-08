---
layout: post
title: '记使用proxy_pass时遇到的一个关于路径中传参的一个有趣问题'
keywords: nginx, lua, proxy_pass, openresty
date: 2017-08-06 07:40:00
description: '记使用proxy_pass时遇到的一个关于路径中传参的一个有趣问题'
categories: [Nginx]
tags: [nginx, lua, openresty]
comments: true
group: archive
icon: file-o
---

前几天我们新开发了一个服务，需要将之前的几个接口转发到新服务的新接口上，很自然的我们只需要做一次统一转发处理接口。

我们是基于 Nginx+Lua+Openresty 构建的统一接口网关，所以处理这个问题非常简便，只需要在nginx conf中针对相应接口做一次转发即可，这里使用到 location URL 规则匹配和 proxy_pass 。

但是当我设置 location 匹配规则之后(因为有多个接口，所以匹配规则是前缀匹配)，因为在转发之前，我们还有一个逻辑是处理请求的，所以调用了 lua 插件，但是就因为 lua 插件里面对于 proxy_pass 的处理，导致不能转发完整 URL 以及 URL 后面的 query 参数。

举个例子：

location /old_service/v1/old_api/ {
    rewrite_by_lua_file "rule.lua";
    proxy_pass http://new_server/new_service/v1/module/;
}

接口：
/old_service/v1/old_api/get_info->/new_service/v1/module/get_info;
/old_service/v1/old_api/query_info->/new_service/v1/module/query_info;

有问题的时候：
new_service 接收到的接口是：/new_service/v1/module 报404-找不到相应的接口。

问题就出在：rewrite_by_lua_file "rule.lua";

<!--more-->

搜索查找到这篇文章，知道了其中的缘由了。

来自 openresty 讨论区：[记使用proxy_pass时遇到的一个关于路径中传参的一个有趣问题](https://groups.google.com/forum/#!topic/openresty/5j2cxTl_Cj0)

以下是讨论详细内容：

Tom:
hi，章老师，同学们，大家好

最近在用proxy_pass时，遇到一个比较有趣的事。
1.   
1.1
    
    location /proxy/lua {
        set_by_lua_file $proxy_server /code/lua/server.lua;                                   
        proxy_pass $proxy_server;
    } 

/code/lua/server.lua文件内容：

local url = "tom.test.web.com/proxy/lua"
return url


然后发起请求：http://localhost/proxy/lua?name=tom&age=20
并在远程机器上监控Access日志， 接收到的请求为："GET /proxy/lua HTTP/1.0"，参数没有传过来

然后把lua文件修改为：
1.2.

local url = "tom.test.web.com"
return url

重新发起请求：http://localhost/proxy/lua?name=tom&age=20
并在远程机器上监控Access日志， 接收到的请求为："GET /proxy/lua?name=tom&age=20 HTTP/1.0"，参数传递过来了。

不解，遂继续以下试验，不用lua：
2.   
2.1   
    
    location /proxy/lua {                                                     
        proxy_pass tom.test.web.com;
    } 

发起请求：http://localhost/proxy/lua?name=tom&age=20
远程机器上查看Access日志："GET /proxy/lua?name=tom&age=20 HTTP/1.0"，参数传递过来了。

2.2 

    location /proxy/lua {                                                     
        proxy_pass tom.test.web.com/proxy/lua;
    }

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控日志："GET /proxy/lua?name=tom&age=20 HTTP/1.0"   参数传递过来了。

到这里就开始感到很奇怪了，同一个URL，通过lua传递时，发现参数没有传递过来，而直接写在proxy_pass后面的参数居然传递过来了。

然后觉得可能是变量问题，继续用Nginx变量重新进行试验：

3. 
3.1    

    location /proxy/lua {      
        set $proxy_server "tom.test.web.com/proxy/lua";    
        proxy_pass $proxy_server;
    } 

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控远程机器日志："GET /proxy/lua HTTP/1.0"          参数没有传过来

3.2    

    location /proxy/lua {      
        set $proxy_server "tom.test.web.com";                                                                                 
        proxy_pass $proxy_server;
    }

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控远程机器日志："GET /proxy/lua?name=tom&age=20 HTTP/1.0"       参数传过来了

由以上试验得出，通过变量设置proxy_pass的URL时，如果URL后面除了域名还有路径，则参数传递不过去，
故又进行了如下试验：
加参数进行试验：
4.
4.1.

    location /proxy/lua {      
        set $proxy_server "tom.test.web.com/proxy/lua?name=tom&age=20";                                                                                 
        proxy_pass $proxy_server;
    }

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控远程机器日志："GET /proxy/lua?name=tom&age=20 HTTP/1.0"

4.2.

    location /proxy/lua {      
        set $proxy_server "tom.test.web.com?name=tom&age=20";              
        proxy_pass $proxy_server;
    }

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控远程机器日志："GET /proxy/lua?name=tom&age=20 HTTP/1.0"
4.3

    location /proxy/lua {                                                                                     
        proxy_pass tom.test.web.com?name=tom&age=20;
    }

发起请求：http://localhost/proxy/lua?name=tom&age=20
监控远程机器日志：请求未过来，页面400 Bad Request

总结下上面的试验得到的结论如下：
1.通过变量设置proxy_pass的URL时，如果URL后面除了域名还有路径（"/"也是路径），则参数传递不过去，如果想把参数能传递过去，必须显示接收参数并往后面传递；而不通过变量设置的proxy_pass则没有这个问题，见试验3。
2.直接设置URL时，域名后面不能直接跟“？”，会报400错误

疑惑如下：

1.为什么通过变量设置proxy_pass的URL，且后面跟有路径时，参数会传递不过去？而直接设置proxy_pass，参数就能传递过去？这块章老师或其他同学能给详细解释下么？（见2.2和3.1）
2.直接设置proxy_pass 的URL时，域名后面直接跟“？”，为什么报400错误，而通过变量设置proxy_pass的URL，域名后面直接跟“？”就不会有这个错误？（见4.2和4.3）

麻烦了解的同学详细解释下。

----

刘永明：

proxy_pass是会把$request_uri补上的；4.3 的写法本身是无法通过-t检查的吧 ？  你做了那么多测试，干脆也把post做下吧？

----

Tom:

正常通过检查的，我用的版本号：openresty/1.5.11.1
嗯，但是通过变量设置proxy_pass的URL时，却没有把传过来的参数补上，这块和非变量设置的URL有差异，我查阅了下Nginx的源码，没有发现这块有啥区别，想咨询下深入研究源码的同学，帮解答一下.

----

Zexuan Luo:

关于第一个问题：
这部分代码逻辑，位于 http/modules/ngx_http_proxy_module.c#ngx_http_proxy_create_request

/* the request line */

    b->last = ngx_copy(b->last, method.data, method.len);
    *b->last++ = ' ';

    u->uri.data = b->last;

    // proxy_lengths 这个属性，只会在 proxy_pass 中使用变量的情况下才会设置。
    // 参见同一文件下的 ngx_http_proxy_pass和 ngx_http_proxy_eval 函数。
    // 注意这里的 uri 指端口到参数中的一段，也就是请求首行 /test?blahblah 这一部分
    if (plcf->proxy_lengths && ctx->vars.uri.len) {
        b->last = ngx_copy(b->last, ctx->vars.uri.data, ctx->vars.uri.len);

    } else if (unparsed_uri) {
        // 这部分处理 HTTP 0.9 的
        b->last = ngx_copy(b->last, r->unparsed_uri.data, r->unparsed_uri.len);

    } else {
        // 如果 proxy_pass 用的是字面量，会连同参数一起拷贝进来
        if (r->valid_location) {
            b->last = ngx_copy(b->last, ctx->vars.uri.data, ctx->vars.uri.len);
        }

        if (escape) {
            ngx_escape_uri(b->last, r->uri.data + loc_len,
                           r->uri.len - loc_len, NGX_ESCAPE_URI);
            b->last += r->uri.len - loc_len + escape;

        } else {
            b->last = ngx_copy(b->last, r->uri.data + loc_len,
                               r->uri.len - loc_len);
        }

        if (r->args.len > 0) {
            *b->last++ = '?';
            b->last = ngx_copy(b->last, r->args.data, r->args.len);
        }
    }

不同版本具体内容会有所出入。不过遇到变量就只拷贝变量的展开后的值，看了下提交信息，这个逻辑自从 Nginx 支持 proxy_pass variable 开始就没变过。
文档里面提到，使用变量意味着不再附带原来 uri，看来连同 args 也不会带上。

SO 上有一个相关的讨论：http://stackoverflow.com/questions/8130692/with-nginx-how-to-forward-query-parameters

关于第二个问题：
再看看回答第一个时贴出的代码，你会发现，所谓的拷贝参数，就是把 ?xxx 这部分内容 copy 到 proxy_pass 字面量上去。
所以配置

    location /proxy {                                                          
        proxy_pass http://localhost:8080/test?a=c;                             
    }

然后请求
curl -i "localhost:8080/proxy?a"
在 access.log 里会看到
/test?a=c?a
这么一个玩意儿。

至于为何 400，也许跟这个有关？

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



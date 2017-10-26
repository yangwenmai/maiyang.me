---
layout: post
title: '仿pinterest瀑布流KISSY的Waterfall浏览器兼容问题'
date: 2013-09-10 03:01
comments: true
categories: JavaScript
---
# 瀑布流概述
> 略
# 瀑布流案例
1. pinterest-瀑布流的开山鼻祖
2. Tumblr
3. 花瓣网-国内做的很不错的瀑布流
4. 其他各行各业都有所涉及

# 瀑布流组件
- jQuery组件[masonry](http://masonry.desandro.com/),

官方网站简单介绍了怎么样一步一步的入门，并且还给我们配备了[在线demo](http://desandro.github.io/masonry/demos/images.html)。但是它有个很大的缺陷，就是在网络状况不好的时候，它的布局非常糟糕。

- [KISSY](http://docs.kissyui.com/)是由阿里集团前端工程师们发起创建的一个开源 JS 框架。它具备模块化、高扩展性、组件齐全，接口一致、自主开发、适合多种应用场景等特性。在KISSY内部有提供一个瀑布流组件Waterfall，并且也为我们配备了[demo][1]和它的完整[教程][2]
> 有关它的使用，我在这里不做详细描述，请参照demo和教程去试验。


[1]:http://docs.kissyui.com/docs/html/demo/component/waterfall/index.html#waterfall-demo
[2]:http://docs.kissyui.com/docs/html/tutorials/kissy/component/waterfall/index.html#waterfall-tutorial

- 其他，比方说花瓣网的瀑布流实现就非常牛逼，不仅完成了瀑布流的工作，而且还处理页面上的数据存储，避免因为大数据量时造成页面的卡顿情况的发生。

<!--more-->

# 瀑布流KISSYUI兼容问题

接下来着重说一下，我在使用KISSY的waterfall时，所遇到的浏览器兼容问题或者说注意事项。

如果我们将KISSY上面的demo2.html保存为本地，使用Chrome,FF,IE8,360,都正常可用。

当我把里面的代码逻辑移植到我们自己的项目中时，因为涉及到本地项目的需求，所以我做了部分修改，将请求数据的IO模块的data参数中的format，method,api_key 都注释。
拼接每一页数据的高度也实时从返回数据中获取。script的显示模板也做了部分调整。

然后就是进行本地测试，用Chrome,FF,IE8，都正常显示，但是使用360就是不加载数据。通过各种调试也没发现任何问题，只是知道IO请求没有被调用。

最开始我还以为这个是KISSY的waterfall的浏览器兼容问题，并且还将此问题反馈到了社区中。[waterfall360浏览器不能加载](https://github.com/Exodia/waterfall/issues/2)

但是经过作者的一个提示，我又进行了一次详细测试，并且分多种情况进行测试。

后面终于发现是由于data中的参数format:"json"没有加上所导致，至于为什么没有此参数就无法加载，可能还需要进一步的查看KISSY-waterfall组件以及360浏览器版本差异来查找原因。

希望以上的说明对大家简单了解瀑布流以及KISSY-waterfall的浏览器兼容问题有一个简单认识。

如果以上描述有任何错误或者不足，还请大家给以指正。




---
layout: post
title: '【转】NodeJS工具搭建博客'
date: 2013-08-06 07:11
comments: true
categories: 
---
早之前就听说了Hexo, 也就是Octopress的node.js版本, 不过是源自台湾. setup的话其实中文英文都无妨吧. 尽管阅读起来肯定是较之中文困难, 不过也基本习惯了.

基本上按照官方给出的guide很容易搭建好. 不过还是不准备现在就撤出Octopress奔赴Hexo, 尽管基于node.js的Hexo在generate, deploy的时候有一定的执行速度优势, 不过目前post不太多, so有感觉出差距, 但不大.

因为不熟node, 还是遇上了麻烦, root下的db.json就不太明白. 导致在修改tags的时候死活修改不了, 查了一下github上以前的issue才知道得把db.json这货rm掉. 否则不管怎么generate, 怎么deploy都只会有增无减.

另一个跟Octopress比较不同的是Markdown的解析器. Octopress用的是Liquid, 而Hexo用的是Marked. 大部分情况下都没什么差别. 而之所以发现这个不同是因为刚开始的generate的时候不断报错

<!-- more -->

```
undefined:11
if ((typeof _context !== "undefined" && typeof _context.> posts !== "undefined
                                                        ^
SyntaxError: Unexpected token >
    at Object.Function (unknown source)
    at createRenderFunc (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/swig/lib/swig.js:44:10)
    at createTemplate (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/swig/lib/swig.js:96:14)
    at getTemplate (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/swig/lib/swig.js:124:20)
    at Object.exports.compile (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/swig/lib/swig.js:186:14)
    at file.read.async.waterfall.compiled.replace.options.gutter (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/lib/plugins/processor/index.js:128:27)
    at async.iterator.fn (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/async/lib/async.js:573:34)
    at async.waterfall.wrapIterator (/usr/local/Cellar/node/0.8.20/lib/node_modules/hexo/node_modules/async/lib/async.js:489:34)
    at process.startup.processNextTick.process._tickCallback (node.js:244:9)
```
用尽各种蛋疼的办法才发现原来是有一篇文章里头的一段underscore代码块解析出了问题

{{ > posts}}
吐血啊, 找了我老久. 原来是这个东西忘了套上 
{% raw %} {{> posts}} {% endraw %}
在Octopress(Liquid)里没套上的话则直接无视掉, 而Hexo(Marked)则直接嘣掉.

现阶段的plugins自然还是跟Octopress有些差距的, 不过挺看好的. 虽然暂时不撤往Hexo. 但还是弄了个github pages, 喜欢折腾吧...

另外也顺带把404页面改成扣扣的公益页面了. 尽管知道不太可能起到什么作用...
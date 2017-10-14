---
layout: post
title: '代码规范之esformatter'
keywords: JavaScript, esformatter
date: 2016-01-01 23:55
description: 'esformatter'
categories: [JavaScript, esformatter, vim]
tags: [esformatter, vim]
comments: true
group: archive
icon: file-o
---

最近我们在开始使用react.js来开发全新的后台系统，react主要文件就是js/jsx，习惯了Golang的gofmt，自然而然的想到也应该有类似的js/jsx的代码风格格式化插件吧？

<!-- more -->

找我们最好的老师Google，输入`js format`
排在前面的两个都是JavaScript的在线格式化网站，继续往下看，应该能够看到[JsFormat](https://github.com/jdc0589/JsFormat)。
输入`vim js format`, 应该能得到[vim-autoformat](https://github.com/Chiel92/vim-autoformat)、[vim-jsbeautify](https://github.com/maksimr/vim-jsbeautify)，你选择一个你喜欢的吧。

对于搜索结果，你最好重点关注github,stackoverflow这些网站。

我用的是[esformatter](https://github.com/millermedeiros/esformatter)。哈哈，怎么转变这么大呢，额，淡定。

你可以看到esformatter的项目描述`ECMAScript code beautifier/formatter`。我相信大家知道他的由来了吧。

接下来说一下他的配置，以及使用。

`npm install [-g] esformatter`
`esformatter --help`
`esformatter test.js`

就是如此简单。

如果你是vim使用者，这里有一个vim插件[vim-esformatter](https://github.com/millermedeiros/vim-esformatter)

按照README.md上面的说明，配置好vimrc即可使用了。

我这里就提一点，如果我们想要保存`:w`，就能执行代码格式化，还需要在vimrc中增加以下配置。

### 方法一 ###

`autocmd BufWritePost,FileWritePost *.js execute 'Esformatter' |cwindow`
`autocmd BufWritePost,FileWritePost *.jsx execute 'Esformatter' |cwindow`

如果你看过我之前写的文章介绍golint的话，你对上面这两段代码应该不会陌生。

### 方法二 ###

点击进入[PullRequest 3](https://github.com/millermedeiros/vim-esformatter/pull/3),这里有一个人贡献了一个可以实现保存自动格式化的优化。
不过经过我的实际测试，发现并不会生效，具体原因未跟进，如果有朋友成功了，还请麻烦告诉我一声，谢谢了。

重新打开vim，编辑保存js/jsx文件，就能实现代码格式化了。

从此不管团队有多人，写的js/jsx文件格式都是统一的了，是不是少了很多纠结于烦恼啊。如果团队还有使用MR进行CodeReview的习惯的话，那代码风格统一就更加的有必要了，也会为我们的CR提供更高效的基础支持了。

好了，今天就到这里了。

最后祝大家元旦节快乐！天天好心情！
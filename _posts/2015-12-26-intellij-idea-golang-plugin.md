---
layout: post
title: 'Golang 开发工具'
keywords: Golang, 工具, IDE, IntelliJ idea, WebStorm, vim
date: 2015-12-26 22:43
description: 'Golang 开发工具'
categories: [Golang, 工具]
tags: [Golang, 工具]
comments: true
group: archive
icon: file-o
---
概要说明
....
----
在上一篇文章中我提到了Golang 开发工具有以下这些：

> [liteide](https://github.com/visualfc/liteide)

> sublime text，golang插件

> vim，golang插件 vim-go

> intellij idea, webstorm

> atom

以上开发工具，我都使用过，目前一直在用的vim和WebStorm。

<!-- more -->

接下来，我就详细介绍一下vim和WebStom的安装和使用，希望给新手或者不知道怎么选择的开发者一些参考。

### vim ###

Mac 系统自带了vim，还有更适合Mac用户的[MacVim](https://github.com/b4winckler/macvim), 大家可以尝试，基本上跟vim是一样的。知乎--[MacVim与Vim相比，优势和劣势都有哪些？](https://www.zhihu.com/question/20020306)

大家可能会遇到组件需要 vim 7.3+以上才能支持的提示，这个需要我们将系统默认的vim升级到7.4及其以上，至于怎么升级，这里将不做讲解，不会的自行Google吧，如有必要我将整理一篇文章。

vimrc采用了[Maple大神的vimrc配置](https://github.com/humiaozuzu/dot-vimrc)

我把配色改了一下

	color molokai

增加了hlsearch

	set hlsearch #高亮搜索结果


还有其他的插件配置如下

>golint 配置

	set rtp+=$GOPATH/src/github.com/golang/lint/misc/vim
	autocmd BufWritePost,FileWritePost *.go execute 'Lint' | cwindow

>goimports 配置

	let g:go_fmt_command="goimports"
	let g:go_fmt_autosave=1
	let g:syntastic_go_checkers=['golint', 'govet', 'errcheck']
	let g:syntastic_mode_map={'mode':'active', 'passive_filetypes':['go']}

另外还有一个js自动代码格式化插件 esformatter。

安装：

`npm install -g esformatter`

vimrc 配置如下

	" for EsFormatter
	nnoremap <silent> <leader>es :Esformatter<CR>
	vnoremap <silent> <leader>es :EsformatterVisual<CR>

安装好golang之后，再配置好以上的 vimrc，你就能像用IDE工具一样使用vim编程了。

### WebStorm ###

WebStorm是 jetbrains 公司开发的一款IDE工具，跟大名鼎鼎的Intellij idea类似，都很好用，也都很贵。提供30天的免费试用。

下载安装好后，启动WebStorm,然后开始配置Golang开发插件，详细的安装步骤如下：

1. 下载Golang plugin

	地址：https://github.com/go-lang-plugin-org/go-lang-idea-plugin/releases
	以上的地址下载之后可以安装了并不能正常使用，那么请移步到这个地址：https://plugins.jetbrains.com/plugin/5047?pr=idea&showAllUpdates=true

2. 安装下载好的Golang plugin
	
	Configure -> Plugins,从本地磁盘选择，然后安装重启

3. 设置好Golang SDK, 然后新建一个空项目，写一个main.go，然后再里面写你自己的Golang代码

注意，WebStorm 的Go imports file 功能也是需要goimports被正确安装后才可以使用的。

golint 代码规范，目前还未应用到WebStorm中去。

在Terminal中，可以使用。

安装[golint](https://github.com/golang/lint)

> go get -u github.com/golang/lint/golint


---
layout: post
title: '如何在mac上安装cocos2d-x-2.2'
date: 2013-10-22 16:11:00
comments: true
categories: [cocos2dx]
---
网络上有很多的安装cocos2d-x教程，但是我搜索之后发现，大部分都是关于1.x版本的，而cocos2d-x-2.X版本已经发生了根本的变化，所以导致很多人都无法正常安装和使用。

其实cocos2d-x-2.2的安装在论坛中是由一篇文章有做简单的回复。[how to install cocos2d-x 2.2 on mac](http://www.cocos2d-x.org/forums/21/topics/36419).

简单说明记录一下。

1. 首先到www.cocos2d-x.org官网上下载2.2版本的压缩包
2. 解压文件包
3. 在mac电脑上用terminal，进入到你所解压的文件目录，我本机为：`/Users/admin/Downloads/cocos2d-x-2.2/tools/project-creator`
4. 然后再在命令下输入`./create_project.py -project cocos2dxTest2 -package com.yourcompany.cocos2dxTest2 -language cpp` 以上几个参数很简单，就是指定项目名称，包名称，以及语言类型（目前提供三种c++/cpp,lua,javascript）
5. 当输入回车键后显示以下结果，则表示你创建项目成功
`MarstekiMacBook-Pro:project-creator mars$ ./create_project.py -project cocos2dxTest2 -package com.vancing.cocos2dxTest2 -language cpp`

`proj.ios        : Done!`
`proj.android        : Done!`
`proj.win32        : Done!`
`proj.winrt        : Done!`
`proj.wp8        : Done!`
`proj.mac        : Done!`
`proj.blackberry        : Done!`
`proj.linux        : Done!`
`proj.marmalade        : Done!`
`New project has been created in this path: /Users/mars/Documents/Library/Cocos2d-x/cocos2d-x-2.2/projects/cocos2dxTest2`

`Have Fun!`

然后你进入到cocos2d-x主目录的projects下，点击proj.ios/mac通过xcode打开项目，然后你点击运行即可使用iOS模拟器打开创建的demo项目效果了。

真心很简单。剩下的就是你对产品和cocos2d-x以及c++语言的结合使用了。祝我好运！

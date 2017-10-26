---
layout: post
title: 'mac安装cocoapods不成功解决办法'
date: 2014-03-08 11:02
comments: true
categories: 工具
---
cocoapods的安装办法，请参见[cocoapods官网](http://cocoapods.org/)
`sudo gem install cocoapods`

如果我们安装失败，并提示ruby 1.9.3 类似的错误，那应该就是最新版的cocoapods不能用ruby 1.9.3来支持，而是ruby 2.0.0。

详细的解决方案见[stackoverflow](http://stackoverflow.com/questions/20790994/cocoapods-failing-to-install-with-xcode-5-0-2)

摘录: *Installing new Ruby version helped me. Follow these steps:*
`rvm reinstall ruby-2.0.0-p247 --with-gcc=clang --verify-downloads 1
gem install xcodeproj
gem install cocoapods
`
I found this answer in some old Github issue.
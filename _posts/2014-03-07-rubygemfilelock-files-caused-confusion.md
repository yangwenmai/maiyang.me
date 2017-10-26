---
layout: post
title: '[Ruby]gemfile.lock文件引发的困惑'
date: 2014-03-07 02:28
comments: true
categories: Ruby
tags: [ruby, json, gemfile.lock, JBuilder]
---
Gemfile.lock的英文说明：
    
> When you run bundle install, Bundler will persist the full names and versions of all gems that you used (including dependencies of the gems specified in the Gemfile(5)) into a file called Gemfile.lock.

> Bundler uses this file in all subsequent calls to bundle install, which guarantees that you always use the same exact code, even as your application moves across machines.

> Because of the way dependency resolution works, even a seemingly small change (for instance, an update to a point-release of a dependency of a gem in your Gemfile(5)) can result in radically different gems being needed to satisfy all dependencies.

> As a result, you SHOULD check your Gemfile.lock into version control. If you do not, every machine that checks out your repository (including your production server) will resolve all dependencies again, which will result in different versions of third-party code being used if any of the gems in the Gemfile(5) or any of their dependencies have been updated.

*Gemfile.lock用来记录Application中的依赖Gem包，并详细记录了依赖Gem包的版本。当Application的环境发生变化时，我们可以用Bundle update来更新相关依赖包，也可以保持Gemfile.lock不变.*
  
  Gemfile的管理是由bundle来做的。下面简单介绍bundle的用法。
  > bundle show     #显示所有的依赖包
  > bundle check     #检查系统中缺少那些项目以来的gem包
  > bundle install    #安装项目依赖的所有gem包
  > bundle update  #更新系统中存在的项目依赖包，并同时更新项目Gemfile.lock文件

 接下来说说我遇到的问题，昨天因为性能优化，而加入了dalli cache,要更新gemfile，但是因为直接`gem 'dalli'`是引入的最新版本。这时直接bundle install，就会更新相互间的依赖。刚开始在本地测试一切正常。但是发布到测试环境之后就发生JBuilder解析错误`wrong number of arguments (0 for 1)`，刚开始一直很惆怅，因为本地测试环境OK，正式测试环境就要报以上的错误，真不知道问题出在哪儿，代码都一摸一样。然后我就去取历史版本编译部署测试，从中发现有一次更新Gemfile.lock，通过比较工具发现有版本变更，然后问题也就迎刃而解了。由于我们不小心更新了Gemfile，导致版本依赖发生变化。
 
  经验：在开发者未知情况下，一定不要随意更新Gemfile，如果要更新一定要对自己所使用的gem版本依赖有所了解，避免因为修改而导致不可预计的错误发生。
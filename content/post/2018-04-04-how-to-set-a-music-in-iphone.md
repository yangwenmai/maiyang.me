---
layout: post
title: '不求人！一步一步教你在最新版 iTunes 12.7 上自制 iPhone 手机铃声'
keywords: iPhone, 生活
date: 2018-04-03 23:25:00
description: '不求人！一步一步教你在最新版 iTunes 12.7 上自制 iPhone 手机铃声'
categories: [生活]
tags: [iPhone, iTunes, 生活]
comments: true
author: mai
---

    这是一篇翻译另外加上自己的一些完善而整理的一篇文章，希望能够对自己有实质上指导帮助的同时，也可以给你带来一些帮助。

----

趁苹果发布 iPhone 8 和 iPhone X 之际，他们也更新了 iTunes 12.7。不过，iTunes 12.7 有一个很大的缺陷，就是移除了 App 和铃声页面，用户无法在 iTunes 上下载应用程序以及铃声，并同步到 iOS 设备上了。

虽然不能在 iTunes 上下载铃声，但是 iTunes 仍然能够管理在 iPhone 储存的铃声，通过 iTunes 制作 AAC 文件（m4a 格式）的制作工具没有被移除。因此，我们还是可以利用 iTunes 来制作铃声，但通过 iTunes 同步到 iPhone 的方法有很大的不同。

## 1. 检查输入编码

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_version_01.png)

首先更新 iTunes 到最新版本，并在 iTunes 的「偏好设置」→「通用」分页按「导入设置」，确保「导入时使用」的编码器是「AAC 编码器」。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_setting_01.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_setting_02.png)

<!--more-->

## 2. 进入想制作铃声的歌曲的「歌曲信息」界面

返回 iTunes 并翻到音乐页面，选择想制作铃声的歌曲按右键选择「歌曲信息」或输入快捷键「Command+I」﹐打开「歌曲信息」界面。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_music_01.png)

## 3. 设定时长

打开歌曲内容之后按「选项」，勾选「开始」和「停止」，设定不多于 40 秒的时长，然后按「好」退出，要留意这动作会影响日后播放歌曲的时长，但可在制作铃声完成之后回到这介面还原。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_music_02.png)

## 4. 制作 AAC 版本歌曲

选取要制作铃声的歌曲，然后按上方 iTunes 菜单栏的「文件」，选择「转换」→「创建 AAC 版本」，很快 iTunes 资料库就会多出一首只有 40 秒以内的新的歌曲，该歌曲是以 m4a 格式储存的。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_music_03.png)

## 5. 更改文件名

iOS 设备使用的铃声文件格式是 m4r，所以我们要把 m4a 文件重命名为 .m4r。

## 6. 通过 iTunes 将铃声导入 iPhone

方法很简单：你只要将铃声文件拖入 iTunes 左方菜单的你的 iPhone 设备中，iPhone 就会按文件自动进行分类，如果是铃声，则它就会自动放入铃声，并且在拖入的时候设备还会同步，你手机上就有了这个被拖入的铃声了。

如果你不能拖铃声到 iTunes 并导入到 iPhone，则你需要进入 iTunes ，点击设备，然后进入到你的社保界面的「摘要」页面下方勾选「手动管理音乐和视频」，然后按「完成」，同步之后就可以直接拖拉文件了。

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/itunes_iphone.png)

## 7. 检查铃声是否在 iOS 设备出现

完成之后打开设定 App 的「声音与触感」→「电话铃声」，如果成功的话就会在众多预设铃声上面出现你制作的铃声。

## 参考资料

1. https://www.newmobilelife.com/2017/09/16/how-to-make-iphone-ringtones-in-itunes-12-7/

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)
![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

---
layout: post
title: '[译]更多RoboVM后台更新'
date: 2013-09-19 03:27
comments: true
categories: 
---
> Today i continued working on some RoboVM backend todos. **Multi-touch** is now working properly, the fix was rather simple, once you understand that you have to enable multi-touch on a view in a single line of code on iOS.

今天我继续工作在一些RoboVM后台待办事项上。 **多点触控** 现在完全可用，修复相当简单,你立刻就能理解，你必须启用多点触控，在iOS视图上就简单的一行代码。

> You can now also use the **gdx-freetype extension with the RoboVM backend**. From the nightlies, get the extensions/gdx-freetype/ios/libgdx-freetype.a file, put it in your $ROBOVM_PROJECT/libs/ios folder, then add the following to your robovm.xml file:

你现在也可以用RoboVM后台 的gdx-freetype 扩展。从nightlies获取`extensions/gdx-freetype/ios/libgdx-freetype.a`文件，把它放到你的`$ROBOVM_PROJECT/libs/ios`文件夹里，然后添加如下的robovm.xml文件：

`<libs>
    ...
    <lib>libs/ios/libgdx-freetype.a</lib>
  </libs>`
  
> You also have to link to the gdx-freetype.jar in your RoboVM project (or link to it from your core project, and make sure it’s exported in Eclipse).

你也必须在你的RoboVM工程里链接gdx-freetype.jar（或者从你的核心工程链接它，确保它是用Eclipse导出的）。

> I also managed to finally get the **Bullet physics extension compiling for iOS**. LLVM/Clang previously went into a “i’ll eat all your CPU” infinite loop. Applied a quick fix found on the bullet forums, and things compiled. Our wrapper uses SWIG to generate the JNI bridge, which in turn uses some more or less advanced JNI/VM features RoboVM doesn’t support yet. We’ll have to wait until that gets fixed in RoboVM before we can have our physically correct cloth simulations run on iOS.

我也终于得到为iOS编译的Bullet物理扩展。 LLVM/Clang之前陷入“我会吃你的CPU”的无限循环。在bullet论坛上找到了快速修复办法。我们的包装使用SWIG来产生JNI桥接，这反过来又使用JNI/VM一些或多或少先进功能而RoboVM不支持JNI桥。我们将不得不等直到得到在RoboVM上的修复，才能够有正确的物理凝结模拟器iOS上运行。
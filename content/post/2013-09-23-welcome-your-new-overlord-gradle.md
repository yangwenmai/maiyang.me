---
layout: post
title: '[译]欢迎你的新领地：Gradle'
date: 2013-09-23 04:17:00
comments: true
categories: [android]
---
> I’ve been sick the last few days, and figured i’d learn [Gradle](http://www.gradle.org/). I created a [Gradle based libgdx template](https://github.com/libgdx/libgdx-gradle-template), which you can start using now. It **will eventually replace our current Setup-UI** to make my life more enjoyable. IT will also allow you to build and run your libgdx projects on the CLI, Eclipse, IntelliJ and even Netbeans. And on top of that, you’ll not have to juggle any JARs or native libraries anymore, everthing is taken care off for you. You can update to different version of gdx, and easily include extensions or other 3rd party libraries. So, what is this magical Gradle?

我最近几天一直在生病，设想我学习Gradle.我创建了一个基于libgdx模板的Gradle，你现在能启动。它现在就可以开始使用，它最终将替代我们目前的setup-ui，使我的生活更有趣。它也将允许你构建和允许你的libgdx工程在CLI,Eclipse,IntelliJ和Netbeans.而最重要的是，你将不必在任何JARs或者更多本地库之间周旋，每一件事情将为你小心关闭。你能更新到不同libgdx版本,并且容易包含扩展的或其他第三方库。那么，这个神奇的Gradle是什么呢？

> Gradle is a build and dependency management system, using Groovy and some domain specific language sugar. A build system is responsible for compiling your application and packaging it up. A dependency management system allows you to define which 3rd party libraries you want to use, and the system will automatically pull those libraries in for you. Provided the libraries are available in some sort of repository. The most established type of repository in Java land are Maven repositories, with Maven Central being the global central hub to which almost all things get published to.

Gradle是构建和依赖管理系统，用Groovy和一些特定域的语言sugar.构建系统是负责编译你的应用程序和打包。一个依赖管理系统允许你定义你想用的第三方库，且系统将自动为你放那些库。准备的库是可用的在一些资源库里。历史最悠久的库在Java领地和Maven资源库,Maven中央仓库，几乎所有的事情都发布在全球中央仓库。

> Here’s what defining such dependencies looks like in Gradle for a libgdx project that also uses the FreeType and Bullet extensions (no GWT and iOS yet):

下面是定义了一个libgdx工程在Grdle的许多依赖是什么，也用于FreeType和Bullet扩展（还没有GWT和iOS）。

<!--more-->
> `project(":core") {
    apply plugin: "java"
 
    dependencies {
        compile "com.badlogicgames.gdx:gdx:$gdxVersion"
        compile "com.badlogicgames.gdx:gdx-freetype:$gdxVersion"
        compile "com.badlogicgames.gdx:gdx-bullet:$gdxVersion"
    }
}
 
project(":desktop") {
    apply plugin: "java"
    apply plugin: "application"
 
    dependencies {
        compile project(":core")
        compile "com.badlogicgames.gdx:gdx-backend-lwjgl:$gdxVersion"
        compile "com.badlogicgames.gdx:gdx-platform:$gdxVersion:natives-desktop"
 
        compile "com.badlogicgames.gdx:gdx-freetype-platform:$gdxVersion:natives-desktop"
        compile "com.badlogicgames.gdx:gdx-bullet-platform:$gdxVersion:natives-desktop"
    }
}
 
project(":android") {
    apply plugin: "android"
 
    configurations { natives }
 
    dependencies {
        compile project(":core")
        compile "com.badlogicgames.gdx:gdx-backend-android:$gdxVersion"        
        natives "com.badlogicgames.gdx:gdx-platform:$gdxVersion:natives-armeabi"
        natives "com.badlogicgames.gdx:gdx-platform:$gdxVersion:natives-armeabi-v7a"
 
        compile "com.badlogicgames.gdx:gdx-freetype:$gdxVersion"
        natives "com.badlogicgames.gdx:gdx-freetype-platform:$gdxVersion:natives-armeabi"
        natives "com.badlogicgames.gdx:gdx-freetype-platform:$gdxVersion:natives-armeabi-v7a"
 
        compile "com.badlogicgames.gdx:gdx-bullet:$gdxVersion"
        natives "com.badlogicgames.gdx:gdx-bullet-platform:$gdxVersion:natives-armeabi"
        natives "com.badlogicgames.gdx:gdx-bullet-platform:$gdxVersion:natives-armeabi-v7a"
    }
}`

> The core project references the gdx core API, the FreeType extension and the Bullet extension. The desktop project additionally references the gdx LWJGL backend, and the native libraries for gdx core, FreeType and Bullet in their desktop incarnations. The desktop project also depends on the core project, so it will pull in all the code from the core project, as well as any of the core project’s dependencies!

核心项目引用gdx核心API，FreeType扩展和Bullet扩展。桌面项目附加引用gdx LWJGL后台，为gdx核心的本地库，FreeType和Bullet处在他们的桌面中。桌面项目也依赖核心项目，它也将核心项目所有代码放进去，以及任何核心项目的依赖！

> The Android is a little special due to how things work in Android land. Sadly, we have to reference the FreeType and Bullet extension again even though we also depend on the core project, which should pull in the core project’s dependencies. It’s a long story, and i’m a bit fed up with the mess that is Android’s build system (and no, the new Gradle Android build system isn’t awesome either…). Anyways, that’s how its done in Android land.

Android有点小特殊，归因为Android领地怎么样让事情工作起来。可悲的，我们必须再次引用FreeType和Bullet扩展，即使我们已经依赖于核心项目，应该放核心项目的依赖。这是一个很长的故事，并且我有点厌倦混乱的android构建系统（并没有，这个新的Gradle Android构建系统不令人敬畏的）。不管怎么说，android领地也完成了。

> You’ll also notices those dependencies ending in e.g. natives-armeabi or natives-debug. These just contain native code in form of shared libraries, e.g. your beloved libgdx.so and consorts.

你也要注意哪些依赖结尾例如 natives-armeabi 或 natives-debug.这些仅仅包含本地共享库代码,例如你常用的libgdx.so和consort.

> Adding a new dependency is as simple as finding it on [Maven Central](http://search.maven.org/), then adding it to that Gradle build file. Once to the core project’s dependency, and once again to the Android project’s dependencies, the desktop project gets things from the core project as it should be.

在Maven Central上添加一个新的依赖就像你找它一样简单，然后添加它到Gradle构建文件。一旦有了核心项目的依赖，且再次到Android项目的依赖，桌面项目也能从核心项目获取到。

> Say you want to add Kryo by Nate. First you go to Maven Central and search for Kryo, which will bring up the following:

告诉你想去加Nate的Kryo.首先你去Maven Central搜索Kryo,显示如下结果：

![](http://libgdx.badlogicgames.com/uploads/Screen%20Shot%202013-09-23%20at%2000.12.52-kgbh6a3R0Y.png)

> Just click on the first entries latest Version (2.21). On the next site you’ll see the group id (com.esotericsoftware.kryo), the “artifact id” (kryo) and the version (2.21). To add this as a dependency to your Gradle-based libgdx project, just add the following to the dependency sections of the core and android projects

仅仅点击第一行最新版本(2.21)。在下一页你将看到group id (com.esotericsoftware.kryo), artifact id（kryo)和版本号（2.21）。添加这个依赖到你的基于Gradle的libgdx项目，仅仅加如下依赖核心和android项目部分。

`dependencies {
   ...
   compile "com.esotericsoftware.kryo:kryo:2.21"
}`

> That’s it. Now you can have Gradle regenerate your Eclipse/Idea projects, et voila, you can now use Kryo! Best of all, you have no JAR files in your project directory, for which SVN/Git/Hg will thank you.

就这样，现在你可以用Gradle重新生成你的Eclipse/Idea项目，你现在可以用Kryo!最重要的是，在你的项目目录里没有JAR文件，SVN/Git/Hg都会感谢你。

> You can also change the version of dependencies in the Gradle build file, and it will automatically get the correct libraries for you. No manual copying of things, not chance of messing things up!

你也可以在Gradle构建文件里改变依赖版本，并且它将为你自动获取正确的库。不需要手动拷贝，不会有搞混乱的机会！

> You can find the Gradle template over on Github, with full instructions. Go try it out! I’ll add GWT and RoboVM support in the following days. Please report any issues. Eventually i’ll package this up and add a tiny GUI for initial project creation, just like the old setup UI. However, any updates of dependencies and so on will be done by you in the Gradle build file just as illustrated above. This will make that setup GUI extremely simple. More time will be spent on the Gradle build files. E.g. it’s already possible to create ZIP distributions for desktop projects and APKs for Android projects with the current Gradle system. I’ll likely extend that to allow you to create EXEs and App Bundles for Mac OS X and maybe even DEB files for Debian/Ubuntu.

你能在Github上找到Gradle模板，全部完整的说明。去试试吧！我将在接下来几天里添加GWT和RoboVM支持。请报告任何问题。最后我将打包并加一个微小的初始化项目创建的GUI，就像之前的setup UI. 然而，任何依赖更新都基于你完成的Gradle构建文件。这将使得setup GUI格外的简单。更多时间花费在Gradle构建文件。例如，它已经可以同当前Gradle系统创建ZIP分发到桌面项目和android项目的APK。我将很可能延伸允许你创建EXE和Mac OS X运行文件和或许甚至Debian/Ubuntu的DEB文件。

> One note: IDE integration of Gradle is still a weak point. IntelliJ Idea doesn’t cope well with multi-module projects. The Eclipse Gradle plugin by SpringSource is OKish, and you can actually use the current system with it. But i sense there will be issues cropping up when used for more complex things.

一个注意：Gradle的IDE集成仍然是很弱的。IntelliJ Idea不能很好的配合多模块项目。来自Spring Source 的Eclipse Gradle插件还可以，你实际将它可用于当前系统。但是我感觉会有问题出现用于更多复杂事情。

> Also, the Android project uses the new Android Gradle based build on the command line, but uses the Ant based build in Eclipse/IntelliJ Idea. Until the Eclipse ADT plugin understands Gradle that won’t change. Oh, and the Android Studio/IntellJ Idea plugin doesn’t work properly either. It’s all a bit of a hack at the moment, but here’s hoping for a bright and clean future. If you want to give your eyes cancer, check out the [Android project’s Gradle build file](https://github.com/libgdx/libgdx-gradle-template/blob/master/android/build.gradle) responsible for making it work with the CLI, Eclipse and Android, and fix the non-handling of native libraries with the new Android Gradle build system. Luckily you’ll not have to touch that file, unless you want to add flavors to your Android project.

此外， Android项目采用最新的基于命令行构建Android Gradle，但是用Ant构建在Eclipse/IntelliJ Idea。直到Eclipse ADT插件知道Gradle不会改变。Oh, Android Studio/IntelliJ Idea插件也不能正常工作。它在此刻有点黑客，但是有一个明亮的清洁的未来。如果你想给你的眼睛癌症，检查Android 项目的Gradle构建文件负责使它工作用CLI，Eclipse和Android,修复非处理本地库新的Android Gradle构建系统.幸运的是你将不会接触那些文件，除非你想去加自己的东西到你的Android项目。


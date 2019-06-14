---
title: 'Rust 和 Go 在图像处理上的性能之争'
keywords: go, rust, image
date: 2019-06-14T10:44:00+08:00
lastmod: 2019-06-14T10:44:00+08:00
draft: false
description: 'Rust 和 Go 在图像处理上的性能之争'
categories: [rust]
tags: [go, rust, image]
comments: true
author: mai
---

## 背景

大家都说 Rust 比较擅长系统底层，我猜想图像处理还是很底层的。

至少比较好用的都是 C 语言实现的。

imagemagick

libpng ？ 也是 C 实现的。

那我们是不是可以来测试一下 Rust 和 Go 在图像处理上的性能表现呢？首先从 decode 开始。

### Rust decode 一个图片文件

```rust
let timer = Instant::now();
let tiny = image::open("examples/scaleup/out0.png").unwrap();
println!("cost: {}", Elapsed::from(&timer));
```

耗时：328ms

Rust 指定 Release 模式下运行 Decode 耗时 8 ms

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go.png)

还可以指定 opt-level3

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_level3.png)


### Go decode 一个图片文件

```golang
startTime := time.Now()
data, err := ioutil.ReadFile("out0.png")
if err != nil {
 panic(err)
}
rd := bytes.NewReader(data)
image.Decode(rd)
fmt.Println("cost:", time.Now().Sub(startTime))
```

耗时：695.732µs

当时我就震惊了！！！

## 分析讨论过程

通过看 image 的源码发现 png 这个库 next frame 这个方法比较慢。
go版本一次性读整个图，png要一行一行的读，且每行都要一次内存拷贝
为了更高的抽象层级，有非常多细碎的内存拷贝
找到原因了：每行会创建一个Vec，一次Vec创建的时间在几十微秒左右，一个几百行的图片，主要会花在内存分配上

![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_create_vec.png)

(准确说，单纯创建Vec不会发生堆内存分配，等价于一个栈上变量，代价可以忽略，但随后会对其写入，此时就会导致堆内存分配)

其实怎么存都有问题，抛开内存分配的问题，flatten到一维，行序，列序在处理的时候都对cache不友好

分析2：
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_alloc1.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_alloc2.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_alloc3.png)
![](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/image_decode_rust_go_alloc4.png)

主要不是内存分配的问题，其实在初始化的时候已经通过宏得到了图片大小，一次性分配好了。
主要是内存copy的问题，那里还注释了 TODO 待优化。

内存copy，还有下面那一行into转换，内存会重新分配吧，作者打算留给有缘人优化了。


Rust不保证代码的性能。
>初学者用rust比较难写出高性能的程序吧，但是用go可以好一点。
>应该是 初学者用rust比较难写出程序

写不好rust是我不行，不是rust不行。
很多人误以为，用rust写了代码就性能好了

其实我的印象里，内存拷贝的成本应该比内存分配低？


不过至少可以确定，image这个库的速度确实是慢😂

我还测试了一下jpeg的解码，发现速度也一样糟糕

没法复用，他api设计的时候就断了复用的念头了

关键是后面解码的时候remalloc
读Row是个公开api，返回的是字节序列引用

作者还是有考虑的，可能处理时候有点问题，还没细看

----

*确实 Rust 还是一个新手，所以源代码和实现逻辑还得仔细研究研究再来理解大家的讨论了。*

## 参考资料

1. [https://github.com/image-rs/image](https://github.com/image-rs/image)
2. [https://github.com/golang/go#image](https://github.com/golang/go)
3. [https://github.com/image-rs/image-png/issues/61](https://github.com/image-rs/image-png/issues/61)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

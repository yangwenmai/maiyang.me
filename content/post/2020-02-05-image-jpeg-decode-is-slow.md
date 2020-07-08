---
title: '从 go/issues/24499: image/jpeg: Decode is slow 性能问题说起'
keywords: go, image, jpeg, decode, performance, slow
date: 2020-02-05T13:48:00+08:00
lastmod: 2020-02-05T13:48:00+08:00
draft: false
description: '从 go/issues/24499: image/jpeg: Decode is slow 性能问题说起'
categories: [go]
tags: [go, image, jpeg, decode, performance, slow]
comments: true
author: mai
---

## 背景

go/issues/24499: image/jpeg: Decode is slow

环境变量：
```
Mac OS Sierra
go version go1.10 darwin/amd64
CPU 3,5 GHz Intel Core i7
```

解码 jpeg 大小为 1920x1080 的图像。

测试了 `github.com/pixiv/go-libjpeg/jpeg` 和 libjpeg。

```
go 1.10 jpeg.decode ≈ 30 ms cpu ≈ 15 %
libjpeg jpeg.decode ≈ 7 ms cpu ≈ 4 %
```

go 官方会在接下来对此进行优化吗？

### 优化一

>https://go-review.googlesource.com/c/go/+/125138/

分解扫描循环并预先计算，但是这个优化还没有被 Go Review 通过。

### 来自社区 rbuchell 的“吐槽”

```
Q(agnivade): Could you please run each benchmark in a quiet machine with browsers shutdown with -count=10, and then compare them with benchstat and post the results ?
A(rbuchell): Sorry, no - I don't have any more time to spend on this. I posted the results on the README, but they are quite easy to run yourself. The benchmarks show the same trend as my original (application) numbers - loading using stb_image via cgo takes around half the time.
```

意思就是说，image 库的性能很差，我已经测试了这个结果，但是我却没有更多的时间，通过 benchstat 比较一下。
>不太理解，为什么 rbuchell 如此的不忙？

不过，从 rbuchell 的测试来看，agnivade 发现，C 语言主要是基于 SIMD(SSE2) 做了一些优化。
>禁用 SIMD(SSE2) 后，Go 依然会比 C 慢一些。

agnivade 暂时没有想到什么好的算法还可以对此进行优化。所有的数学运算（如霍夫曼解码，idct 等）都有其快速路径，与 C 版本相同。

### 优化二：减少 idct 和 fdct 的边界检查消除

>https://go-review.googlesource.com/c/go/+/167417/

优化：

```
Before -
$gotip build -gcflags="-d=ssa/check_bce/debug=1" fdct.go idct.go
./fdct.go:89:10: Found IsInBounds
./fdct.go:90:10: Found IsInBounds
./fdct.go:91:10: Found IsInBounds
./fdct.go:92:10: Found IsInBounds
./fdct.go:93:10: Found IsInBounds
./fdct.go:94:10: Found IsInBounds
./fdct.go:95:10: Found IsInBounds
./fdct.go:96:10: Found IsInBounds
./idct.go:77:9: Found IsInBounds
./idct.go:77:27: Found IsInBounds
./idct.go:77:45: Found IsInBounds
./idct.go:78:7: Found IsInBounds
./idct.go:78:25: Found IsInBounds
./idct.go:78:43: Found IsInBounds
./idct.go:78:61: Found IsInBounds
./idct.go:79:13: Found IsInBounds
./idct.go:92:13: Found IsInBounds
./idct.go:93:12: Found IsInBounds
./idct.go:94:12: Found IsInBounds
./idct.go:95:12: Found IsInBounds
./idct.go:97:12: Found IsInBounds
./idct.go:98:12: Found IsInBounds
./idct.go:99:12: Found IsInBounds

After -
$gotip build -gcflags="-d=ssa/check_bce/debug=1" fdct.go idct.go
./fdct.go:90:9: Found IsSliceInBounds
./idct.go:76:11: Found IsSliceInBounds
./idct.go:145:11: Found IsSliceInBounds

name                 old time/op    new time/op    delta
FDCT-4                 1.85µs ± 2%    1.74µs ± 1%  -5.95%  (p=0.000 n=10+10)
IDCT-4                 1.94µs ± 2%    1.89µs ± 1%  -2.67%  (p=0.000 n=10+9)
DecodeBaseline-4       1.45ms ± 2%    1.46ms ± 1%    ~     (p=0.156 n=9+10)
DecodeProgressive-4    2.21ms ± 1%    2.21ms ± 1%    ~     (p=0.796 n=10+10)
EncodeRGBA-4           24.9ms ± 1%    25.0ms ± 1%    ~     (p=0.075 n=10+10)
EncodeYCbCr-4          26.1ms ± 1%    26.2ms ± 1%    ~     (p=0.573 n=8+10)

name                 old speed      new speed      delta
DecodeBaseline-4     42.5MB/s ± 2%  42.4MB/s ± 1%    ~     (p=0.162 n=9+10)
DecodeProgressive-4  27.9MB/s ± 1%  27.9MB/s ± 1%    ~     (p=0.796 n=10+10)
EncodeRGBA-4         49.4MB/s ± 1%  49.1MB/s ± 1%    ~     (p=0.066 n=10+10)
EncodeYCbCr-4        35.3MB/s ± 1%  35.2MB/s ± 1%    ~     (p=0.586 n=8+10)

name                 old alloc/op   new alloc/op   delta
DecodeBaseline-4       63.0kB ± 0%    63.0kB ± 0%    ~     (all equal)
DecodeProgressive-4     260kB ± 0%     260kB ± 0%    ~     (all equal)
EncodeRGBA-4           4.40kB ± 0%    4.40kB ± 0%    ~     (all equal)
EncodeYCbCr-4          4.40kB ± 0%    4.40kB ± 0%    ~     (all equal)

name                 old allocs/op  new allocs/op  delta
DecodeBaseline-4         5.00 ± 0%      5.00 ± 0%    ~     (all equal)
DecodeProgressive-4      13.0 ± 0%      13.0 ± 0%    ~     (all equal)
EncodeRGBA-4             4.00 ± 0%      4.00 ± 0%    ~     (all equal)
EncodeYCbCr-4            4.00 ± 0%      4.00 ± 0%    ~     (all equal)
```

但是这个优化其实对于 jpeg 整体的编解码是没有什么性能提升的。

### 为什么 idct 没有基于 SSE2 做优化？

Go 团队通常都是坚持使用纯 Go 语言来实现，汇编仅限于加密、数学和高度专用的字节和字符串函数。

更多描述：https://github.com/golang/go/wiki/AssemblyPolicy

首先，AssemblyPolicy（适用于整体 Go 包），同样也适用于 `image/**`。
除此之外，学习 Go 的人们通常会阅读标准库代码，因此对于该代码，我们比其他 Go 软件包更喜欢*简单性*和*可读性*，而**不是**原始性能。两种立场都没有错，只是*权衡取舍*。

如果向标准库中添加少量 SIMD 组件使基准测试性能提高 1.5 倍，那么我可能会接受。
如果添加大量 SIMD 组件使基准测试性能提高了 1.05 倍，那么我可能会拒绝它。

“小”和“大”的意思是主观的。如果没有特定的 SIMD 代码清单，就很难说。

还要注意的是，当我说基准测试时，我主要关注的是整体解码/编码的基准测试，而不仅仅是 FDCT/IDCT 基准测试。用户想要的是解码 JPEG 图像，而不是想直接运行 IDCT。

例如，https://go-review.googlesource.com/c/go/+/167417/2//COMMIT_MSG 对 IDCTs 的基准测试进行了 1.03 倍的改进，但是对整个解码基准测试没有显著的变化。如果这个更改是 SIMD 程序集更改，我将拒绝它，因为与支持程序集的成本相比，它带来的好处太少了。
>但是这个 CL 被 merge ，是因为它并没有增加很多的代码，使得程序更复杂。

## 总结

1. Go 团队坚持用纯 Go 实现标准库。
2. 不要为了性能，就牺牲简单和可读性。
3. 

## 参考资料

1. https://github.com/golang/go/issues/24499
2. https://github.com/golang/go/wiki/AssemblyPolicy

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



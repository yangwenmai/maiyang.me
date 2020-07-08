---
title: '矩阵？何为矩阵？'
keywords: matrix
date: 2019-07-03T10:44:00+08:00
lastmod: 2019-07-03T10:44:00+08:00
draft: false
description: '矩阵？何为矩阵？'
categories: [graphics]
tags: [graphics, image, matrix]
comments: true
author: mai
---

大多数人在高中，或者在大学低年级，都上过一门课《线性代数》。
>这门课其实是教矩阵。但是我已经完全忘记了。

矩阵加法就是相同位置的数字加一下即可。
矩阵减法跟加法类似。
矩阵乘以常数呢？所有位置乘以这个数即可。
矩阵乘以矩阵呢？这个就有一点不同了。
>计算规则是，第一个矩阵第一行的每个数字（2和1），各自乘以第二个矩阵第一列对应位置的数字（1和1），然后将乘积相加（ 2 x 1 + 1 x 1），得到结果矩阵左上角的那个值3
>结果矩阵第m行与第n列交叉位置的那个值，等于第一个矩阵第m行与第二个矩阵第n列，对应位置的每个值的乘积之和

矩阵乘法到底是什么东西。关键就是一句话，矩阵的本质就是线性方程式，两者是一一对应关系。如果从线性方程式的角度，理解矩阵乘法就毫无难度。

>以上摘自阮一峰的《理解矩阵》

只有在左矩阵的列数＝右矩阵的行数的情况下，两个矩阵的乘法才有意义，或说乘法运算是可行的。

## Matrix

transform matrix（变换矩阵）：
- Translate-偏移量(平移)
- Scale-缩放
- Rotate-旋转
- Skew-斜切

假定 matrix 的六个参数用字母表示如下：transform(a,b,c,d,e,f)
1. e 和 f 代表着偏移量 translate，x 和 y 轴
2. a 和 d 代表着缩放比例 scale，x 和 y 轴
3. b 和 c 代表着斜切 skew（具体参数和角度关系为, b-->tanθ y 轴 c-->tanθ x 轴 ，我们具体操作的时候还是要使用小数的）
4. abcd 中的 ad 代表缩放(scale)，bc 代表斜切(skew)；abcd 四个参数代表着旋转。
>旋转=规律的缩放+规律的斜切，旋转可以用缩放和斜切一起来得到。两者联系在于这个角度 θ。具体：matrix(cosθ,sinθ,-sinθ,cosθ,0,0)


## 参考资料

1. [理解矩阵 - 阮一峰](http://www.ruanyifeng.com/blog/2015/09/matrix-multiplication.html)
2. [矩阵的运算及其运算规则](http://www2.edu-edu.com.cn/lesson_crs78/self/j_0022/soft/ch0605.html)
3. [线性代数拾遗](http://mengqi92.github.io/tags/%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E6%8B%BE%E9%81%97/)
4. [理解矩阵（一）](https://blog.csdn.net/myan/article/details/647511)
5. [理解矩阵（二）](https://blog.csdn.net/myan/article/details/649018)
6. [理解矩阵（三）](https://blog.csdn.net/myan/article/details/1865397)
7. [机器学习的数学基础：矩阵篇](https://www.hahack.com/math/math-matrix/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



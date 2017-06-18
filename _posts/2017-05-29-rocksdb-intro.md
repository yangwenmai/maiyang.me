---
layout: post
title: 'RocksDB介绍：一个比LevelDB更彪悍的引擎'
keywords: rocksdb, leveldb
date: 2017-05-29 11:20:00
description: 'RocksDB介绍：一个比LevelDB更彪悍的引擎'
categories: [rocksdb]
tags: [rocksdb, leveldb]
comments: true
group: archive
icon: file-o
---

	本文耗时10分钟，阅读需要5分钟。

----

## RocksDB介绍：一个比LevelDB更彪悍的引擎

RocksDB实际上是在LevelDB之上做的改进。本文主要侧重在架构上对RocksDB对LevelDB改进的地方做个简单介绍并添加一些个人的看法，更详细的信息读者可参考其官网：http://rocksdb.org/

RocksDB是在LevelDB原来的代码上进行改进完善的，所以在用法上与LevelDB非常的相似。从继承的角度看，Rocksdb就像是Leveldb的后辈。

RocksDB虽然在代码层面上是在LevelDB原有的代码上进行开发的，但却借鉴了Apache HBase的一些好的idea。在云计算横行的年代，开口不离Hadoop，RocksDB也开始支持HDFS，允许从HDFS读取数据。而LevelDB则是一个比较单一的存储引擎，有点我就是我，除了我依然只有我的感觉。也是因为LevelDB的单一性，在做具体的应用的时候一般需要对其作进一步扩展。

RocksDB支持一次获取多个K-V，还支持Key范围查找。LevelDB只能获取单个Key。

RocksDB除了简单的Put、Delete操作，还提供了一个Merge操作，说是为了对多个Put操作进行合并。
站在引擎实现者的角度来看，相比其带来的价值，其实现的成本要昂贵很多。

个人觉得有时过于追求完美不见得是好事，据笔者所测（包括测试自己编写的引擎），性能的瓶颈其实主要在合并上，多一次少一次Put对性能的影响并无大碍。

RocksDB提供一些方便的工具，这些工具包含解析sst文件中的K-V记录、解析MANIFEST文件的内容等。有了这些工具，就不用再像使用LevelDB那样，只能在程序中才能知道sst文件K-V的具体信息了。

RocksDB支持多线程合并，而LevelDB是单线程合并的。LSM型的数据结构，最大的性能问题就出现在其合并的时间损耗上，在多CPU的环境下，多线程合并那是LevelDB所无法比拟的。不过据其官网上的介绍，似乎多线程合并还只是针对那些与下一层没有Key重叠的文件，只是简单的rename而已，至于在真正数据上的合并方面是否也有用到多线程，就只能看代码了。

RocksDB增加了合并时过滤器，对一些不再符合条件的K-V进行丢弃，如根据K-V的有效期进行过滤。

压缩方面RocksDB可采用多种压缩算法，除了LevelDB用的snappy，还有zlib、bzip2。LevelDB里面按数据的压缩率（压缩后低于75%）判断是否对数据进行压缩存储，而RocksDB典型的做法是Level 0-2不压缩，最后一层使用zlib，而其它各层采用snappy。

在故障方面，RocksDB支持增量备份和全量备份，允许将已删除的数据备份到指定的目录，供后续恢复。

RocksDB支持在单个进程中启用多个实例，而LevelDB只允许单个实例。

RocksDB支持管道式的Memtable，也就说允许根据需要开辟多个Memtable，以解决Put与Compact速度差异的性能瓶颈问题。在LevelDB里面因为只有一个Memtable，如果Memtable满了却还来不及持久化，这个时候LevelDB将会减缓Put操作，导致整体性能下降。

看完上面这些介绍，相比LevelDB是不是觉得RocksDB彪悍的不可思议，很多该有的地方都有，该想的都想到了，简直不像在做引擎库，更像是在做产品。不过虽然RocksDB在性能上提升了不少，但在文件存储格式上跟LevelDB还是没什么变化的， 稍微有点更新的只是RocksDB对原来LevelDB中sst文件预留下来的MetaBlock进行了具体利用。

个人觉得RocksDB尚未解决的地方：

- 依然是完全依赖于MANIFEST，一旦该文件丢失，则整个数据库基本废掉。
- 合并上依然是整个文件载入，一些没用的Value将被多次的读入内存，如果这些Value很大的话，那没必要的内存占用将是一个可观的成本。
- 关于这两个问题，尤其是后面那个问题，笔者已有相应的解决方案，至于结果如何只等日后实现之后再作解说了。

[RocksDB介绍：一个比LevelDB更彪悍的引擎](http://tech.uc.cn/?p=2592)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

当然，你觉得对你有帮助，也可以给我打赏。
![打赏](http://oqos7hrvp.bkt.clouddn.com/blog/wxpay.png)
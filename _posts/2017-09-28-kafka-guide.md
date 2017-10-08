---
layout: post
title: 'Kafka 入门实战'
keywords: Kafka
date: 2017-09-28 08:50
description: 'Kafka 入门'
categories: [kafka]
tags: [Kafka]
comments: true
group: archive
icon: file-o
---

	本文是 Kafka 本地使用方法汇总。

----

*kafka(http://kafka.apache.org/) 非常强大，也是当前日志收集的不二之选*

----

## 基本要求 ##

1. JDK
2. zookeeper

## 单机单点安装测试 ##

第一步：下载解压

>[下载地址](http://kafka.apache.org/downloads.html) http://kafka.apache.org/downloads.html

> tar -xzf kafka_2.11-0.11.0.1.tgz
> cd kafka_2.11-0.11.0.1

第二步：启动 zookeeper-server 和 kafka-server

> bin/zookeeper-server-start.sh config/zookeeper.properties

---

> bin/kafka-server-start.sh config/server.properties

关于 `server.properties` 配置文件请参考后文：《*server.properties配置文件参数说明*》

第三步：新建一个 topic
创建一个名为 “test” 的 Topic，只有一个分区和一个备份：

> bin/kafka-topics.sh --create \
                      --zookeeper localhost:2181 \
                      --replication-factor 1 --partitions 1 \
                      --topic test

创建好之后，可以通过运行以下命令，查看已创建的 topic 信息：

> bin/kafka-topics.sh --list --zookeeper localhost:2181
test

第四步：发送消息

Kafka 提供了一个命令行的工具，可以从输入文件或者命令行中读取消息并发送给Kafka集群。每一行是一条消息。运行 producer（生产者）,然后在控制台输入几条消息到服务器。

> bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test 

```
>This is a message
>This is another message
```

第五步：消费消息

Kafka 也提供了一个消费消息的命令行工具，将存储的信息输出出来。

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning
> 或者
> bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning

  This is a message
  This is another message

如果你有2台不同的终端上运行上述命令，那么当你在运行生产者时，消费者就能消费到生产者发送的消息。
所有的命令行工具有很多的选项，你可以查看文档来了解更多的功能。

<!-- more -->

----

## 单机多点安装 ##

第六步：设置有多个broker的集群（单机）

到目前，我们只是单一的运行一个 broker ，没什么意思。对于 Kafka ,一个 broker 仅仅只是一个集群的大小, 所有让我们多设几个 broker 。注意：broker.id 从 0 开始递增，每个 broker 实例必须唯一。

首先为每个 broker 创建一个配置文件:

> cp config/server.properties config/server-1.properties 
> cp config/server.properties config/server-2.properties

现在编辑这些新建的文件，设置以下属性：

config/server-1.properties:

    broker.id=1
    listeners=PLAINTEXT://:9093
    log.dir=/tmp/kafka-logs-1
 
config/server-2.properties:

    broker.id=2
    listeners=PLAINTEXT://:9094
    log.dir=/tmp/kafka-logs-2


broker.id 是集群中每个节点的唯一永久的名称，我们修改端口和日志分区是因为我们现在在同一台机器上运行，我们要防止 broker 改写同一端口上注册的数据。

我们已经运行了 zookeeper 和刚才的一个 kafka 节点(备注： broker.id=0 也要运行启动。)，所有我们只需要在启动2个新的kafka节点。

> bin/kafka-server-start.sh config/server-1.properties &
... 
> bin/kafka-server-start.sh config/server-2.properties &
...

现在，我们创建一个新 topic ，把备份设置为：3

> bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 1 --topic my-replicated-topic

好了，现在我们已经有了一个集群了，我们怎么知道每个 broker 在做什么呢？
运行命令 `describe topics`

> bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic

Topic:my-replicated-topic PartitionCount:1  ReplicationFactor:3 Configs:
   Topic: my-replicated-topic  Partition: 0  Leader: 0 Replicas: 0,1,2 Isr: 1,2,0

这是一个解释输出，第一行是所有分区的摘要，下面的每行提供一个分区信息，因为我们只有一个分区，所有只有一行。

"leader"：该节点负责所有指定的分区读和写，每个节点都可能领导一个随机选择的分区。
"replicas":备份的节点，无论该节点是否活着,只是显示。
"isr"：备份节点的集合，也就是活着的节点集合。

我们运行这个命令，看看一开始我们创建的那个节点。

> bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic test

Topic:test  PartitionCount:1  ReplicationFactor:1 Configs:
Topic: test Partition: 0  Leader: 0 Replicas: 0 Isr: 0

没有惊喜，原始主题没有 Replicas，所以是 0 。

让我们来发布一些信息在新的 topic 上：

> bin/kafka-console-producer.sh --broker-list localhost:9092 --topic my-replicated-topic
 ...
my test message 1
my test message 2

现在，消费这些消息。

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --from-beginning --topic my-replicated-topic
 ...
my test message 1
my test message 2

我们要测试集群的容错，kill 掉 leader，Leader: 0 表示当前的 leader 是 Broker.id=0 ，也就是 kill 掉 Broker0。

> ps | grep server-1.properties
7564 ttys002    0:15.91 /System/Library/Frameworks/JavaVM.framework/Versions/1.6/Home/bin/java... 
> kill -9 xxx

备份节点之一成为新的 leader ，而 broker0 已经不在同步备份集合里了。

> bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic my-replicated-topic
Topic:my-replicated-topic PartitionCount:1  ReplicationFactor:3 Configs:
Topic: my-replicated-topic  Partition: 0  Leader: 2 Replicas: 1,2,0 Isr: 2,0

但是，消息没仍然没丢：

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --from-beginning --topic my-replicated-topic
...
my test message 1
my test message 2
my test message 3
my test message 4
...

![kafka_replication](http://oqos7hrvp.bkt.clouddn.com/blog/kafka_replication.jpg)

## Kafka Consumer Group ##

如何在Kafka的命令行创建多个消费者？

>./bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning --consumer-property group.id=local

----

## server.properties配置文件参数说明 ##

每个kafka broker中配置文件server.properties默认必须配置的属性如下：

```
broker.id=0
num.network.threads=2
num.io.threads=8
socket.send.buffer.bytes=1048576
socket.receive.buffer.bytes=1048576
socket.request.max.bytes=104857600
log.dirs=/tmp/kafka-logs
num.partitions=2
log.retention.hours=168

log.segment.bytes=536870912
log.retention.check.interval.ms=60000
log.cleaner.enable=false

zookeeper.connect=localhost:2181
zookeeper.connection.timeout.ms=1000000
```

----

**参数说明**

|参数|说明|
|----|----|
|broker.id =0|每一个broker在集群中的唯一表示，要求是正数。当该服务器的IP地址发生改变时，broker.id没有变化，则不会影响consumers的消息情况|
|log.dirs=/data/kafka-logs |kafka数据的存放地址，多个地址的话用逗号分割,多个目录分布在不同磁盘上可以提高读写性能 /data/kafka-logs-1，/data/kafka-logs-2|
|port =9092  |broker server服务端口|
|message.max.bytes =6525000  |表示消息体的最大大小，单位是字节|
|num.network.threads =4  |broker处理消息的最大线程数，一般情况下数量为cpu核数|
|num.io.threads =8 |broker处理磁盘IO的线程数，数值为cpu核数2倍|
|background.threads =4 |一些后台任务处理的线程数，例如过期消息文件的删除等，一般情况下不需要去做修改|
|queued.max.requests =500  |等待IO线程处理的请求队列最大数，若是等待IO的请求超过这个数值，那么会停止接受外部消息，应该是一种自我保护机制。|
|host.name |broker的主机地址，若是设置了，那么会绑定到这个地址上，若是没有，会绑定到所有的接口上，并将其中之一发送到ZK，一般不设置|
|socket.send.buffer.bytes=100*1024|socket的发送缓冲区，socket的调优参数SO_SNDBUFF
|socket.receive.buffer.bytes =100*1024 |socket的接受缓冲区，socket的调优参数SO_RCVBUFF|
|socket.request.max.bytes =10010241024 |socket请求的最大数值，防止serverOOM，message.max.bytes必然要小于socket.request.max.bytes，会被topic创建时的指定参数覆盖|
|log.segment.bytes =102410241024 |topic的分区是以一堆segment文件存储的，这个控制每个segment的大小，会被topic创建时的指定参数覆盖|
|log.roll.hours =24*7  |这个参数会在日志segment没有达到log.segment.bytes设置的大小，也会强制新建一个segment会被 topic创建时的指定参数覆盖|
|log.cleanup.policy = delete |日志清理策略选择有：delete和compact主要针对过期数据的处理，或是日志文件达到限制的额度，会被 topic创建时的指定参数覆盖|
|log.retention.minutes=300 或 log.retention.hours=24  |数据文件保留多长时间， 存储的最大时间超过这个时间会根据log.cleanup.policy设置数据清除策略log.retention.bytes和log.retention.minutes或log.retention.hours任意一个达到要求，都会执行删除有2删除数据文件方式：按照文件大小删除：log.retention.bytes，按照2中不同时间粒度删除：分别为分钟，小时|
|log.retention.bytes=-1  |topic每个分区的最大文件大小，一个topic的大小限制 = 分区数*log.retention.bytes。-1没有大小限log.retention.bytes和log.retention.minutes任意一个达到要求，都会执行删除，会被topic创建时的指定参数覆盖|
|log.retention.check.interval.ms=5minutes  |文件大小检查的周期时间，是否处罚log.cleanup.policy中设置的策略|
|log.cleaner.enable=false  |是否开启日志清理|
|log.cleaner.threads = 2 |日志清理运行的线程数|
|log.cleaner.io.max.bytes.per.second=None  |日志清理时候处理的最大大小|
|log.cleaner.dedupe.buffer.size=50010241024  |日志清理去重时候的缓存空间，在空间允许的情况下，越大越好|
|log.cleaner.io.buffer.size=512*1024 |日志清理时候用到的IO块大小一般不需要修改|
|log.cleaner.io.buffer.load.factor =0.9  |日志清理中hash表的扩大因子一般不需要修改|
|log.cleaner.backoff.ms =15000 |检查是否处罚日志清理的间隔|
|log.cleaner.min.cleanable.ratio=0.5 |日志清理的频率控制，越大意味着更高效的清理，同时会存|在一些空间上的浪费，会被topic创建时的指定参数覆盖|
|log.cleaner.delete.retention.ms =1day |对于压缩的日志保留的最长时间，也是客户端消费消息的|最长时间，同log.retention.minutes的区别在于一个控制未压缩数据，一个控制压缩后的数据。会被to|pic创建时的指定参数覆盖|
|log.index.size.max.bytes =1010241024  |对于segment日志的索引文件大小限制，会被topic创建时的指定参数覆盖|
|log.index.interval.bytes=4096 |当执行一个fetch操作后,需要一定的空间来扫描最近的offset大|小，设置越大，代表扫描速度越快，但是也更好内存，一般情况下不需要搭理这个参数|
|log.flush.interval.messages=None  |例如log.flush.interval.messages=1000表示每当消息|记录数达到1000时flush一次数据到磁盘，log文件”sync”到磁盘之前累积的消息条数,因为磁盘IO操作是|一个慢操作,但又是一个”数据可靠性"的必要手段,所以此参数的设置,需要在"数据可靠性"与"性能"之间做|必要的权衡.如果此值过大,将会导致每次"fsync"的时间较长(IO阻塞),如果此值过小,将会导致"fsync"|的次数较多,这也意味着整体的client请求有一定的延迟.物理server故障,将会导致没有fsync的消息丢失|
|log.flush.scheduler.interval.ms =3000 |检查是否需要固化到硬盘的时间间隔|
|log.flush.interval.ms = None  |例如：log.flush.interval.ms=1000,表示每间隔1000毫秒fl|ush一次数据到磁盘仅仅通过interval来控制消息的磁盘写入时机,是不足的.此参数用于控制"fsync"的时|间间隔,如果消息量始终没有达到阀值,但是离上一次磁盘同步的时间间隔达到阀值,也将触发.|
|log.delete.delay.ms =60000  |文件在索引中清除后保留的时间一般不需要去修改|
|log.flush.offset.checkpoint.interval.ms =60000  |控制上次固化硬盘的时间点，以便于数据恢复一般不需要去修改|
|auto.create.topics.enable =true |是否允许自动创建topic，若是false，就需要通过命令创建topic|
|default.replication.factor =1 |是否允许自动创建topic，若是false，就需要通过命令创建topic|
|num.partitions =1 |每个topic的分区个数，若是在topic创建时候没有指定的话会被topic创建时的指定参数覆盖|

----

**kafka中Leader,replicas配置参数**

|参数 | 说明|
|----|----|
|controller.socket.timeout.ms =30000 |partition leader与replicas之间通讯时,socket的超时时间|
|controller.message.queue.size=10  |partition leader与replicas数据同步时,消息的队列尺寸|
|replica.lag.time.max.ms =10000 | replicas响应partition leader的最长等待时间，若是超过这个时间，就将replicas列入ISR(in-sync replicas)，并认为它是死的，不会再加入管理中|
|replica.lag.max.messages =4000 | 如果follower落后与leader太多,将会认为此follower[或者说partition relicas]已经失效.##通常,在follower与leader通讯时,因为网络延迟或者链接断开,总会导致replicas中消息同步滞后##如果消息之后太多,leader将认为此follower网络延迟较大或者消息吞吐能力有限,将会把此replicas迁移到其他follower中.##在broker数量较少,或者网络不足的环境中,建议提高此值.|
|replica.socket.timeout.ms=30*1000 |follower与leader之间的socket超时时间
|replica.socket.receive.buffer.bytes=64*1024 |leader复制时候的socket缓存大小
|replica.fetch.max.bytes =1024*1024  |replicas每次获取数据的最大大小
|replica.fetch.wait.max.ms =500  |replicas同leader之间通信的最大等待时间，失败了会重试
|replica.fetch.min.bytes =1  |fetch的最小数据尺寸,如果leader中尚未同步的数据不足此值,将会阻塞,直到满足条件|
|num.replica.fetchers=1 | leader进行复制的线程数，增大这个数值会增加follower的IO|
|replica.high.watermark.checkpoint.interval.ms =5000 |每个replica检查是否将最高水位进行固化的频率|
|controlled.shutdown.enable =false |是否允许控制器关闭broker ,若是设置为true,会关闭所有在这个broker上的leader，并转移到其他broker|
|controlled.shutdown.max.retries =3  |控制器关闭的尝试次数|
|controlled.shutdown.retry.backoff.ms =5000  |每次关闭尝试的时间间隔|
|leader.imbalance.per.broker.percentage =10  |leader的不平衡比例，若是超过这个数值，会对分区进行重新的平衡|
|leader.imbalance.check.interval.seconds =300 | 检查leader是否不平衡的时间间隔
|offset.metadata.max.bytes |客户端保留offset信息的最大空间大小|

----

**kafka中zookeeper参数配置**

|参数| 说明|
|----|----|
|zookeeper.connect = localhost:2181  |zookeeper集群的地址，可以是多个，多个之间用逗号分割hostname1:port1,hostname2:port2,hostname3:port3|
|zookeeper.session.timeout.ms=6000 |ZooKeeper的最大超时时间，就是心跳的间隔，若是没有反映，那么认为已经死了，不易过大|
|zookeeper.connection.timeout.ms =6000 |ZooKeeper的连接超时时间|
|zookeeper.sync.time.ms =2000  |ZooKeeper集群中leader和follower之间的同步时间|

----

## 参考资料 ##

1. [Kafka](http://kafka.apache.org/)
2. [Kafka quickstart](https://kafka.apache.org/quickstart)
3. [kafka quickstart 的中文翻译](https://www.kancloud.cn/hanxt/elk/159232)
4. [如何为Kafka集群选择合适的Topics/Partitions数量？](https://www.iteblog.com/archives/1805.html)
5. [create-multiple-consumers-in-kafka-in-command-line](https://stackoverflow.com/questions/26289518/create-multiple-consumers-in-kafka-in-command-line)

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

---
layout: post
title: '基于 Docker 构建 ElasticSearch'
keywords: Docker, Docker-Compose, ElasticSearch
date: 2017-11-21 06:36:00
description: '基于 Docker 构建 ElasticSearch'
categories: [docker]
tags: [Docker-Compose, Docker, ElasticSearch]
comments: true
author: mai
---

    本文是一篇基于 Docker 构建 ElasticSearch 的入门级指南。

----

其实用 Docker 来构建真的很简单，这里就给大家贴我的实际配置和运行命令吧。

。。。

### 检查 ElasticSearch 状态 ###

>curl -XGET http://localhost:9200/_cluster/health?pretty

```
{
  "cluster_name" : "docker-cluster",
  "status" : "yellow",
  "timed_out" : false,
  "number_of_nodes" : 1,
  "number_of_data_nodes" : 1,
  "active_primary_shards" : 1,
  "active_shards" : 1,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 1,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 50.0
}
```

### 增删改查 ###

**增加**

```
curl -XPUT 'localhost:9200/twitter/tweet/1?pretty' -H 'Content-Type: application/json' -d'
{
    "user" : "kimchy",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}
'
```

执行结果：
```
{
  "_index" : "twitter",
  "_type" : "tweet",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

**查询**

`curl -XGET 'http://localhost:9200/twitter/tweet/1'`

执行结果：
```
{"_index":"twitter","_type":"tweet","_id":"1","_version":1,"found":true,"_source":
{
    "user" : "kimchy",
    "post_date" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}
}
```

https://github.com/olivere/elastic/issues/312
https://github.com/olivere/elastic/wiki/Connection-Problems#how-to-figure-out-connection-problems

<!--more-->

----

## 参考资料 ##

1. https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
2. https://wenchao.ren/archives/250
3. https://segmentfault.com/a/1190000004376504
4. [elasticsearch 针对中文 开箱即用](https://github.com/hangxin1940/elasticsearch-cn-out-of-box/)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站。

![打赏](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/money.jpg)

这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。

![茶歇驿站二维码](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/tech_tea.jpg)

---
layout: post
title: 'logkit 进阶玩法之 Grok 解析 Kafka 数据流'
keywords: Pandora, bigdata, TSDB, qiniu, Grafana, logkit, LogDB, Kibana, Kafka
date: 2017-10-01 08:58
description: '本文是对 logkit 从 Kafka 读取数据的使用过程的问题总结。
'
categories: [pandora]
tags: [Pandora, bigdata, TSDB, LogDB, logkit, Grafana, Kibana, Kafka]
comments: true
group: archive
icon: file-o
---

    本文是我在使用 logkit Grok 解析 Kafka 数据流的过程中的问题总结，希望可以帮助到大家。

----

*logkit(https://github.com/qiniu/logkit) 非常强大，一定要抽时间阅读分析源码。*

<!-- more -->

### 前文回顾 ###

在之前的文章中介绍了 Pandora 的进阶使用及问题总结，包括 Grafana 配置图表，logkit 打点数据，导出到 TSDB, LogDB，配置 Kibana 日志检索系统。

本文是 logkit 打点数据的补充，主要会涉及到 logkit 从 Kafka 读取数据，以及定制 Grok 解析器等等。

----

>我从 Kafka 读取的数据已经打点到工作流了，但是当时是以 raw 的方式打过来的，但是我想把 raw 格式的数据解析出来的话，我应该怎么做？

可以在 logkit 打点的时候选择不同的解析方式，比方说 raw, csv, json, nginx, grok 等各种适合你的格式解析。

另外也可以在工作流里面直接写 SQL 来解析处理，当然如果你要考虑成本和便携性的话，就使用 logkit 解析。

今天的文章主要是在使用 grok 解析的过程中遇到的问题总结。

```conf
{
  "name": "logkit.runner.20170930122759",
  "reader": {
    "kafka_groupid": "logkit_kfk_nginx_xxx_consumer",
    "kafka_topic": "nginx_xxx",
    "kafka_zookeeper": "xxxx:2181,xxxx:2181,xxxx:2181",
    "mode": "kafka",
    "name": "logkit.runner.20170930122759",
    "read_from": "oldest",
    "runner_name": "logkit.runner.20170930122759"
  },
  "parser": {
    "grok_custom_patterns": "KFK_NGINX_XXX \"(?:%{NOTSPACE:remote_addr}?|%{DATA})\" \"(?:%{NOTSPACE:http_x_forwarded_for}?|%{DATA})\" \"(?:%{NOTSPACE:geoip_country_code}?|%{DATA})\" \"(?:%{USER:remote_user}?|%{DATA})\" \"(?:%{HTTPDATE:time_local:date}?|%{DATA})\" \"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:http_version})?|%{DATA})\" \"(?:%{NUMBER:status:long}?|%{DATA})\" \"(?:%{NUMBER:body_bytes_sent:long}?|%{DATA})\" \"(?:%{NOTSPACE:http_referer}?|%{DATA})\" (?:%{QUOTEDSTRING:http_user_agent}?|%{DATA}) \"(?:%{NOTSPACE:upstream_addrs}?|%{DATA})\" \"(?:%{NUMBER:upstream_response_time:float}?|-)\" \"(?:%{NUMBER:request_time:float}?|-})\" (?:%{QUOTEDSTRING:http_host}?|%{DATA}) (?:%{QUOTEDSTRING:uri}?|%{DATA}) (?:%{QUOTEDSTRING:service_name}?|%{DATA}) \"(?:%{NOTSPACE:msec_time:long}?|%{DATA})\"",
    "grok_mode": "oneline",
    "grok_patterns": "%{KFK_NGINX_XXX}",
    "name": "pandora.parser.20170930110709",
    "runner_name": "logkit.runner.20170930122759",
    "timezone_offset": "0",
    "type": "grok"
  },
  "senders": [
    {
      "fault_tolerant": "false",
      "force_microsecond": "true",
      "ft_memory_channel": "false",
      "ft_save_log_path": "../ftsendor/",
      "ft_strategy": "backup_only",
      "pandora_ak": "",
      "pandora_enable_logdb": "true",
      "pandora_gzip": "true",
      "pandora_host": "https://pipeline.qiniu.com",
      "pandora_logdb_host": "https://logdb.qiniu.com",
      "pandora_region": "nb",
      "pandora_repo_name": "kfk_nginx_xxx",
      "pandora_schema_free": "true",
      "pandora_sk": "",
      "runner_name": "logkit.runner.20170930122759",
      "sender_type": "pandora"
    }
  ],
  "web_folder": true
}
```

----

## QA ##

Q0: `"30/Sep/2017:10:57:25 +0800"`，我时区偏移量，是否要-8？

>不需要偏移了，偏移是给日志打时间戳没有加时区的用户使用的，加了时间戳的我们自动识别。

Q1: 配置 Grok Parser 解析器，但是通过七牛 logkit 配置助手无法解析样例数据？

>```
NGINX_NORMAL "%{IP:remote_addr}" "%{IP:http_x_forwarded_for}" "%{NOTSPACE:geoip_country_code}" "%{USER:remote_user}" "%{HTTPDATE:time_local:date}" "(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:http_version})?|%{DATA})" "%{NUMBER:status:long}" "%{NUMBER:body_bytes_sent:long}" "%{NOTSPACE:http_referer}" %{QUOTEDSTRING:http_user_agent} "%{NOTSPACE:upstream_addrs}" "%{NUMBER:upstream_response_time:float}" "%{NUMBER:request_time:float}" %{QUOTEDSTRING:http_host} %{QUOTEDSTRING:uri} %{QUOTEDSTRING:service_name} "%{NOTSPACE:msec_time:long}”
```

>可能是你的字段前有空格，比方说：`%{QUOTEDSTRING:uri}`，你写成`%{QUOTEDSTRING: uri}`，将无法解析出来结果，debugger 那个网站解析的也不全。它会把能匹配多少就显示出来，logkit 要求会严格些，要全部匹配才行。

Q2: `%{NUMBER:status}` 可以设置为 `%{NUMBER:status:long}`

>grok parser 里面可以给字段设置类型，如果你不设置，默认解析出来的都是字符串。

Q3: grok_patterns 和 grok_custom_pattern_files 什么区别？

>grok_custom_pattern_files 是你自定义一些基础模式串
grok_patterns 才是正式匹配的串；

>logkit 解析会依次尝试所有 grok_patterns 里面的串，直到最后都解析不出，才会放弃。

Q4: 使用 `%{QUOTEDSTRING:request_time:float}`，解析不出来 request_time 。

>因为解析出来的是：""0.004""，而这个是字符串，无法转成 float ，所以解析不出来。

>你可以使用 `%{NOTSPACE:request_time:float}` 。

>`%{NOTSPACE}` 这个 pattern 对不含空格的字符串有效，对 `"30/Sep/2017:10:57:25 +0800"` 又会解析失败。

Q5: `"30/Sep/2017:10:57:25 +0800"` 怎么解析？

>%{HTTPDATE:time_local:date}

Q6: 对于 http request : `"POST /xxx/v1/list HTTP/1.1"` 怎么解析？

>"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:http_version})?|%{DATA})"

>问号开头，表示这个可能不存在，正则里面的匹配0个或1个，method 字段很有用的，所以一般都会解析出来。

Q7: 对于 upstream_response_time 是 float 类型，但是可能有 `-` 怎么解析？

>"(?:%{NUMBER:upstream_response_time:float}?|-)"，不能使用 NOTSPACE ，因为他会匹配到 -，所以还会匹配出来，但是类型不匹配。

Q8: upstream_addrs 和 upstream_response_time 可能是多个值，比如 `"50.002, 50.001, 50.001, 50.004, 50.002"` 怎么解析？

>字段对应多个值，现在是不支持。解决办法：搞个新的字段，作为 string 存储。

Q9: logkit 从 Kafka 读取数据，速度跟不上怎么办？

>logkit 读取 kafka 数据跟不上，你是确认是否有配置容错队列？如果没配可以配置一下，如果配了容错队列，看看队列里有没有积压，如果有积压就开多线程发送 ft_procs 参数。

>如果这些都配置了，可以再多配两个 runner ，配置同一个 kafka reader group ，就会多线程读取。这种情况下注意一些 runner name ，容错队列保存路径等信息要不同。

>如果还是数据量还是太大消费不过来，可以部署多个 logkit 去消费，相当于多进程，只要保证 kafka reader group 相同。

----

## Grok Parser ##

>logkit 的 grok pattern 是 logstash grok pattern 的增强版，除了完全兼容 logstash grok pattern 规则以外，还增加了类型，与 telegraf 的 grok pattern规则一致，但是使用的类型是 logkit 自身定义的。你可以在 logstash grok 文档中找到详细的 grok 介绍.

参考文档：

1. [logkit Grok-Parser 文档](https://github.com/qiniu/logkit/wiki/Grok-Parser)
2. [logkit自身内置的patterns](https://github.com/qiniu/logkit/blob/develop/grok_patterns/logkit-patterns)
3. [logstash的内置pattern](https://github.com/logstash-plugins/logstash-patterns-core/blob/master/patterns/grok-patterns)
4. [grok库pattern](https://github.com/vjeantet/grok/tree/master/patterns)
5. [logstash grok pattern](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html#_grok_basics)

----

## Kafka 相关 ##

可以参考我之前整理的文章，在本地构建单点 Kafka 服务和多节点 Kafka 服务。

----

## 其他 ##

1. 从 Kafka 读取数据，有可能读取到很早之前的数据，所以数据集里面可能查最近的数据是空的。
2. grok parser 的强大之处还在于，你的日志格式是可变的，只要把所有可能性的pattern都写上就行，但是性能上可能会有折扣，这个需要我们自己有个权衡。

## 参考资料 ##

1. https://qiniu.github.io/pandora-docs/
2. https://github.com/qiniu/logkit/wiki
3. http://grokdebug.herokuapp.com

----

**茶歇驿站**

一个让你可以在茶歇之余，停下来看一看，里面的内容或许对你有一些帮助。

这里的内容主要是团队管理，个人管理，后台技术相关，其他个人杂想。

![茶歇驿站二维码](http://oqos7hrvp.bkt.clouddn.com/blog/tech_tea.jpg)

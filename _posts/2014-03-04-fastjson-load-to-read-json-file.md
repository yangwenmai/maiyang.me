---
layout: post
title: 'fastjson加载读取json文件'
date: 2014-03-04 14:26
comments: true
categories: Java
tags: [fastjson, druid, 温少]
---
Java的json解析库（`fastjson`）, 出品于阿里牛人[@温高铁](http://weibo.com/wengaotie)。

今天的重点是fastjson读取json文件。
参考链接：[Stream-api](https://github.com/alibaba/fastjson/wiki/Stream-api)

```java
	JSONReader reader = new JSONReader(new FileReader("./json/json.json"));
  reader.startObject();
  while(reader.hasNext()) {
        String key = reader.readString();
        VO vo = reader.readObject(VO.class);
        // handle vo ...
        // 处理vo对象，比方说插入数据库，或者获取值做其他业务逻辑功能
  }
  reader.endObject();
  reader.close();
```
说明：
1. VO是我们要解析json的结果对象值。
2. 读取的json一定要合法

想了解json的请参考这里。[介绍JSON](http://www.json.org/json-zh.html)
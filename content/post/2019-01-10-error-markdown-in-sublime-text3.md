---
title: 'Sublime Text 3 配合 OmniMarkupPreviewer 插件使用时报错 404'
keywords: golang, fmt, print, format
date: 2019-01-10T10:00:00+08:00
lastmod: 2019-01-10T10:00:00+08:00
draft: false
description: 'Go 中的 fmt 格式化'
categories: [golang]
tags: [golang, print, format]
comments: true
author: mai
---

## OmniMarkupPreviewer 使用时报错，错误信息如下：

```sh
Error: 404 Not Found

Sorry, the requested URL 'http://127.0.0.1:51004/view/388' caused an error:

'buffer_id(388) is not valid (closed or unsupported file format)'

**NOTE:** If you run multiple instances of Sublime Text, you may want to adjust
the `server_port` option in order to get this plugin work again.
```

## 如何解决？

错误原因是默认扩展中的 `strikeout` 不能正常加载。

*Sublime Text > Preferences > Package Settings > OmniMarkupPreviewer > Settings - User*

```json
{
    "renderer_options-MarkdownRenderer": {
        "extensions": ["tables", "fenced_code", "codehilite"]
   }
}
```

也有可能你可以这样解决(可能是你的端口被占用）：

```json
{
    "server_host": "0.0.0.0",
    "server_port": 9998
}
```

## 参考资料

1. [Sublime Text3 OmniMarkupPreviewer 404](https://desnbo.github.io/2017/03/18/OmniMarkupPreviewer-404/)
2. [OmniMarkupPreviewer 404 #93](https://github.com/timonwong/OmniMarkupPreviewer/issues/93)
3. [OmniMarkupPreviewer 404](https://stackoverflow.com/questions/35798823/omnimarkuppreviewer-404)

----

**茶歇驿站**

一个可以让你停下来看一看，在茶歇之余给你帮助的小站，这里的内容主要是后端技术，个人管理，团队管理，以及其他个人杂想。



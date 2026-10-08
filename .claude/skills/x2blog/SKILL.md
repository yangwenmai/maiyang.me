---
name: x2blog
description: 把 MaiYang 在 X 上发的 Article（长文）或 thread 回流成本博客（Hugo）的一篇文章：生成符合本仓库约定的 front matter、下载图片到 blog/、加上 X 首发链接、开分支并 commit。用户说 /x2blog、「把这篇 X 文章同步到博客」「X article 回流」「把这条 thread 整理成博客」时使用，参数可以是 x.com 链接、粘贴的全文，或两者都有。
---

# x2blog：X Article → 博客

目标：在不改写作者原文的前提下，把 X 上的内容低摩擦地落成 `content/post/` 下的一篇文章。

原则：**内容以原文为准**。这是作者本人的文字，搬运时只做格式转换，不润色、不扩写、不删减。想做「增强版」（补参考链接、加读者反馈）要等用户明确提出。

## 1. 拿到内容

按以下优先级：

1. **用户粘贴了全文**：直接用，这种最可靠。
2. **只给了链接**（`x.com/<user>/status/<id>` 或 `x.com/i/article/<id>`）：用内置浏览器（`mcp__Claude_Browser__*`，先读 `built-in-browser` skill）打开链接，再用 `get_page_text` 读正文，用 `read_page` / `find` 找图片地址（`pbs.twimg.com`）。X 需要登录，如果页面要求登录或者内容不完整，就停下来让用户粘贴全文，**不要替用户登录**。
3. **thread**：按顺序把每条推文拼成段落，去掉 `1/`、`🧵` 之类的编号；推文里引用的推文写成引用块，并附上链接。

还需要确认：
- **发布时间**：用 X 上的发布时间，时区 `+08:00`。拿不到就问用户，不要随便用今天的时间糊弄过去。
- **原文链接**：没有就问用户要，最后的首发说明要用到。

## 2. 查重

```bash
grep -rl "<status 或 article id>" content/post/
```

如果命中了，说明这篇已经同步过，告诉用户是哪个文件，问是更新（改正文和 `lastmod`）还是跳过。

## 3. 文件名和 front matter

文件路径：`content/post/YYYY-MM-DD-<english-kebab-slug>.md`。slug 用英文，3–7 个词，概括主题，参考已有文件名，比如 `2026-08-11-jeff-dean-1-percent-rule-yc-interview.md`。

front matter 照抄本仓库的约定（参考最近的文章，比如 `content/post/2026-08-17-*.md`）：

```yaml
---
title: '<原文标题；thread 没有标题时，起一个贴近原文的标题，并让用户确认>'
keywords: <逗号分隔，人名、产品名、核心概念，6–12 个>
date: 2026-10-08T21:30:00+08:00
lastmod: 2026-10-08T21:30:00+08:00
draft: false
description: '<1–3 句，尽量用原文开头的话，不要写成营销文案>'
categories: [AI]
tags: ["AI", "...", "..."]
comments: true
author: MaiYang
---
```

- `categories` 只放一个，优先复用近期在用的：`AI`、`Thinking`、`工具`、`人物`、`macOS`。都不合适时，提出新分类请用户确认。
- `tags` 3–6 个，用带引号的数组写法。
- 标题、描述里有单引号时，改用双引号包起来，或者转义。

## 4. 正文转换

- X Article 的小标题转成 `##` / `###`；加粗、列表、引用、代码块转成对应的 Markdown。
- 第一段之前不加 `# 标题`，主题会渲染 `title`。
- 外链保留原 URL；`t.co` 短链如果能看出真实地址就换成真实地址，看不出来就原样保留。
- @提及写成 `[@handle](https://x.com/handle)`。
- 嵌入的推文写成引用块，后面附上推文链接。
- 文末统一加一段（`<url>` 换成原文链接）：

```markdown
---

> 本文首发于 X：<url>，欢迎在那边留言讨论。
```

## 5. 图片

本仓库的图片放在 `blog/` 目录下，正文里用 GitHub raw 地址引用：

```markdown
![<alt：用原图说明或上下文概括>](https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/<slug>-<n>.<ext>)
```

步骤：

1. 只下载 `https://pbs.twimg.com/` 域名下的图片。其他域名的图片，先列给用户确认。
2. 文件名用 `<slug>-1.jpg`、`<slug>-2.png` 这样的格式，只允许 `[a-z0-9-]` 加扩展名，不要用 URL 里的原始文件名，避免路径穿越和重名。
3. 下载原图时把 `name=` 参数改成 `orig`，扩展名按 `format=` 参数确定：
   ```bash
   curl -fsSL -o "blog/<slug>-1.jpg" "https://pbs.twimg.com/media/<id>?format=jpg&name=orig"
   ```
4. 下载前先 `ls blog/<slug>-*`，确认不会覆盖已有文件。
5. 下载完用 `file blog/<slug>-*` 检查确实是图片。

封面图（如果有）作为正文第一张图，放在第一段之前或之后，以原文的位置为准。

## 6. 提交

1. 如果当前在 `master` 上，先开分支：`git checkout -b post/<slug>`。如果已经在一个工作分支上，就直接用。
2. 把文章和图片一起 commit，commit message 沿用仓库风格：
   ```
   docs: add post on <英文主题简述>
   ```
   结尾加上系统要求的 Co-Authored-By 行。
3. **不 push，不开 PR**，除非用户要求。

## 7. 交付

最后给用户：
- 文章文件链接，以及下载了哪些图片；
- 需要用户确认的点：标题（尤其是 thread 新起的标题）、分类、发布时间是否准确、哪些内容没抓到；
- 提示一句：如果本地装了 hugo，可以用 `hugo server -D` 预览。

## 批量补录

用户要求把一段时间内的 Article 全部补进来时：
1. 先列出清单（标题 + 链接 + 日期），请用户勾选；
2. 每篇按上面第 1–5 步处理，每篇单独一个 commit；
3. 最后汇总成功和失败的清单，失败的原因通常是需要登录或者内容抓不全。

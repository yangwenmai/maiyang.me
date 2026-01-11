# 快速开始指南

## 🚀 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

打开浏览器访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

静态文件生成在 `out/` 目录。

---

## 📝 添加新文章

### 1. 创建 Markdown 文件

在 `content/post/` 目录创建新文件，文件名格式：`YYYY-MM-DD-slug.md`

### 2. 添加 Frontmatter

```markdown
---
title: '文章标题'
date: 2026-01-09T12:00:00+08:00
description: '文章描述'
cover: '/images/posts/cover.png'  # 可选：封面图片
type: 'blog'  # blog | insight | tutorial | book-note
categories: [技术, AI]
tags: [Next.js, React]
featured: true  # 可选：是否在首页展示
---

文章内容...
```

### 3. 重新构建

```bash
npm run build
```

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev         # 启动开发服务器

# 构建
npm run build       # 构建生产版本
npm run prebuild    # 生成 RSS feed（构建时自动执行）

# 检查
npm run lint        # 代码检查
```

---

## 🎨 自定义配置

### 修改配色方案

编辑 `app/globals.css`：

```css
:root {
  --background: #fafafa;
  --foreground: #171717;
  --muted: #737373;
  --border: #e5e5e5;
}
```

### 修改 Logo

编辑 `components/Header.tsx` 中的 Logo 文本。

### 更新导航

编辑 `components/Header.tsx` 中的 `navigation` 数组。

---

## 📁 项目结构

```
maiyang.me/
├── app/                    # Next.js 应用
│   ├── page.tsx           # 首页
│   ├── blog/              # 博客页面
│   ├── go/                # Go 学习资源
│   ├── books/             # 我的书单
│   ├── podcasts/          # 播客世界
│   ├── uses/              # 使用的工具
│   └── about/             # 关于我
├── components/            # React 组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── PostCard.tsx       # 文章卡片
│   ├── Search.tsx         # 搜索按钮
│   └── CommandPalette.tsx # 搜索面板
├── lib/                   # 工具函数
│   └── posts.ts           # 文章数据处理
├── content/               # Markdown 内容
│   └── post/              # 博客文章 (361篇)
├── public/                # 静态资源
├── scripts/               # 构建脚本
│   └── generate-rss.js    # RSS 生成
└── netlify.toml           # Netlify 配置
```

---

## 📝 内容管理

### 更新书单
编辑 `app/books/page.tsx` 中的 `books` 数组。

### 更新 Go 资源
编辑 `app/go/page.tsx` 中的频道列表。

### 更新工具列表
编辑 `app/uses/page.tsx` 中的 `tools` 数组。

### 更新项目
编辑 `app/projects/page.tsx`。

---

## 🐛 常见问题

### Q: 构建失败怎么办？
```bash
# 清理缓存重试
rm -rf .next out
npm run build
```

### Q: 新文章不显示？
重启开发服务器：`npm run dev`

### Q: 搜索不工作？
确保文章有正确的 frontmatter 格式。

### Q: 图片不显示？
图片放在 `public/` 目录，使用绝对路径：`/images/xxx.png`

---

## 🔍 搜索功能

- 快捷键：`⌘K` (Mac) 或 `Ctrl+K` (Windows)
- 支持搜索：标题、描述、标签
- 实时过滤结果

---

## 📚 参考资料

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [cmdk 文档](https://cmdk.paco.me/)
- [部署指南](DEPLOYMENT.md)

---

**需要帮助？** 联系 yangwen.yw@gmail.com

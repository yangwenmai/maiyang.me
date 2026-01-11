# maiyang.me - 个人网站

[Netlify Status](https://app.netlify.com/sites/YOUR-SITE/deploys)

> Cursor Ambassador · AI Builder · Go 夜读发起人

🌐 [maiyang.me](https://maiyang.me) | 🐦 [@maiyangai](https://x.com/maiyangai) | 📧 

---

## ✨ 特色功能

### 🖥️ 终端风格美学

```bash
~/maiyang.me $ whoami
MaiYangAI
```

独特的命令行风格视觉识别，体现程序员气质。

### 🔍 Command+K 快捷搜索

- 快捷键：`⌘K` (Mac) 或 `Ctrl+K` (Windows)
- 实时搜索 360+ 篇技术文章
- 支持标题、描述、标签搜索

### 📚 完整的内容体系

- **Blog** - 361 篇技术博客，记录成长历程
- **Go** - Go 学习资源精选，22 个优质频道
- **Books** - 27 本书的阅读笔记和推荐
- **Podcasts** - 播客世界，集成 CastMind.AI
- **Projects** - 开源项目和社区贡献
- **Uses** - 6 大类工具的使用分享
- **About** - 个人介绍和社交链接

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建静态网站
npm run build

# 生成的文件在 out/ 目录
```

---

## 📝 添加新文章

1. 在 `content/post/` 创建 Markdown 文件：

```markdown
---
title: '文章标题'
date: 2026-01-09T12:00:00+08:00
description: '文章描述'
cover: '/images/posts/cover.png'  # 可选
type: 'blog'  # blog | insight | tutorial | book-note
categories: [技术, AI]
tags: [Next.js, React]
featured: true  # 可选：首页展示
---

文章内容...
```

1. 重新构建网站

---

## 🛠️ 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **样式**: Tailwind CSS 4
- **语言**: TypeScript 5
- **搜索**: cmdk (Command Palette)
- **内容**: Markdown (Gray Matter + Remark)
- **部署**: Netlify (静态导出)

---

## 📁 项目结构

```
maiyang.me/
├── app/                   # Next.js 应用
│   ├── page.tsx          # 首页
│   ├── blog/             # 博客
│   ├── go/               # Go 资源
│   ├── books/            # 书单
│   ├── podcasts/         # 播客
│   ├── uses/             # 工具
│   └── about/            # 关于
├── components/           # React 组件
├── lib/                  # 工具函数
├── content/              # Markdown 内容
│   └── post/            # 361 篇博客文章
├── public/              # 静态资源
└── netlify.toml         # 部署配置
```

---

## 🎨 设计特点

### 配色方案

```css
/* Light Mode */
--background: #fafafa;
--foreground: #171717;
--muted: #737373;
--border: #e5e5e5;

/* Dark Mode */
--background: #0a0a0a;
--foreground: #fafafa;
--muted: #a3a3a3;
--border: #262626;
```

### 交互动画

- Card hover 效果（上移 2px + 阴影）
- 平滑的主题切换
- 流畅的页面过渡

---

## 📊 网站数据

- **总页面数**: 375 个静态页面
- **博客文章**: 361 篇
- **构建时间**: ~91 秒
- **SEO**: Sitemap + Robots.txt + RSS Feed

---

## 🚀 部署

### Netlify 自动部署

```bash
git add .
git commit -m "更新内容"
git push origin main
```

Netlify 会自动检测并部署。

### URL 重定向

旧的博客链接自动重定向：

```
/post/* → /blog/*
```

---

## 📚 文档

- [快速开始指南](QUICK_START.md)
- [部署说明](DEPLOYMENT.md)
- [历史文档](docs/archive/) - 项目重设计的完成总结

---

## 🌟 核心品牌

### Go 夜读

作为 **Go 夜读发起人**，精心整理了 22 个优质 Go 学习频道。

[访问 Go 学习资源 →](https://maiyang.me/go)

### CastMind.AI

我的产品 - AI 驱动的播客发现平台。

[体验 CastMind.AI →](https://castmind.ai)

---

## 📞 联系方式

- 🐦 Twitter: [@maiyangai](https://x.com/maiyangai)
- 💼 LinkedIn: [Mai Yang](https://www.linkedin.com/in/mai-yang-2a082777/)
- 🐙 GitHub: [@yangwenmai](https://github.com/yangwenmai)

---

## 📄 许可证

内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可。

代码采用 MIT 许可。

---

## 🙏 致谢

- 设计灵感来自 [bagerbach.com](https://bagerbach.com/)
- 由 [Cursor](https://cursor.com) AI 辅助开发
- 托管于 [Netlify](https://netlify.com)

---

**构建于 2026** · 用 ❤️ 和 ☕ 创作
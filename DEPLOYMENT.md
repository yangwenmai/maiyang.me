# 部署指南

## ✅ 构建验证

确保本地构建成功：

```bash
npm run build
```

**预期结果：**
- ✅ 375 个静态页面生成
- ✅ TypeScript 无错误
- ✅ HTML 文件在 `out/` 目录

---

## 🚀 Netlify 部署

### 首次部署

1. **登录 Netlify**
   - 访问 https://app.netlify.com

2. **连接 GitHub 仓库**
   - 选择 "Import from Git"
   - 选择 `yangwenmai/maiyang.me` 仓库

3. **自动检测配置**
   - Netlify 会自动读取 `netlify.toml`
   - 构建命令：`npm run build`
   - 发布目录：`out`

4. **开始部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（约 2-3 分钟）

### 后续更新

每次推送到 GitHub，Netlify 会自动部署：

```bash
git add .
git commit -m "更新内容"
git push origin main
```

---

## ⚙️ Netlify 配置

项目已配置 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/post/*"
  to = "/blog/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 配置说明

- **构建命令**：包含 RSS 生成 + Next.js 构建
- **URL 重定向**：旧 Hugo 链接 `/post/*` → `/blog/*`
- **安全头部**：防止点击劫持、MIME 嗅探攻击

---

## ✓ 部署验证清单

部署完成后，验证以下内容：

### 基础功能
- [ ] 首页正常显示
- [ ] 所有导航链接可点击
- [ ] 博客文章可访问
- [ ] Command+K 搜索工作正常
- [ ] Dark/Light 模式切换正常

### URL 重定向
- [ ] 测试旧链接：`/post/2021-12-31-2021-summary` 应重定向到 `/blog/2021-12-31-2021-summary`
- [ ] 确认 301 永久重定向状态码

### SEO 资源
- [ ] https://maiyang.me/sitemap.xml 可访问
- [ ] https://maiyang.me/robots.txt 可访问
- [ ] https://maiyang.me/rss.xml 可访问

### 新增页面
- [ ] https://maiyang.me/go - Go 学习资源
- [ ] https://maiyang.me/books - 我的书单
- [ ] https://maiyang.me/podcasts - 播客世界
- [ ] https://maiyang.me/uses - 使用的工具
- [ ] https://maiyang.me/about - 关于我

---

## 🐛 故障排查

### 构建失败

**检查步骤：**
1. 查看 Netlify 构建日志
2. 确认 Node.js 版本（推荐 20.x）
3. 本地测试构建：`npm run build`
4. 检查依赖安装：`npm install`

**常见问题：**
- TypeScript 错误：检查类型定义
- Markdown 解析错误：检查文章 frontmatter 格式
- 内存不足：增加 Netlify 构建内存限制

### 旧链接 404

**解决方案：**
1. 确认 `netlify.toml` 中的 redirects 配置
2. 在 Netlify Dashboard 检查 "Redirects" 规则
3. 测试重定向：使用 `curl -I https://maiyang.me/post/xxx`

### 搜索不工作

**检查：**
- `app/layout.tsx` 中的 posts 数据传递
- 文章 frontmatter 格式是否正确
- 浏览器控制台是否有 JavaScript 错误

### 图片显示问题

**确认：**
- 图片在 `public/` 目录
- 使用绝对路径：`/images/xxx.png`
- Next.js 静态导出配置：`images: { unoptimized: true }`

---

## 🔧 高级配置

### 自定义域名

1. 在 Netlify Dashboard → Domain settings
2. 添加自定义域名：`maiyang.me`
3. 配置 DNS 记录（A 记录或 CNAME）
4. 启用 HTTPS（自动 Let's Encrypt）

### 环境变量

如需添加环境变量：
1. Netlify Dashboard → Site settings → Environment variables
2. 添加所需变量
3. 重新部署生效

### 性能优化

已实施的优化：
- ✅ 静态站点生成 (SSG)
- ✅ 图片未优化标记（静态导出）
- ✅ Trailing slash 路由
- ✅ RSS feed 预生成

**建议监控：**
- Netlify Analytics（可选）
- 404 错误追踪
- 构建时间趋势

---

## 📊 构建统计

**当前状态：**
- **总页面数**: 375 个静态页面
- **博客文章**: 361 篇
- **构建时间**: ~91 秒
- **输出大小**: ~10 MB

---

## 📞 支持

如遇问题：
- 查看 [快速开始指南](QUICK_START.md)
- 查看 [Netlify 文档](https://docs.netlify.com)
- 联系：yangwen.yw@gmail.com
- GitHub Issues：https://github.com/yangwenmai/maiyang.me/issues

---

**部署愉快！** 🎉

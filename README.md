# maiyang 个人博客


## 主题

用的是自己写的 `themes/mai`（Mission Control × Agent Native）。旧的 jane 还在 `themes/jane`，`config.toml` 里改 `theme` 就能回滚。

- 首页的个人介绍、终端会话、轨迹、产品、原则、社区、分享、联系方式都在 `data/profile.yaml`，改它就行，不用碰模板；
- 同一份数据会生成 `/llms.txt`，右上角切到 Agent 模式（或访问 `/#agent`）就能看到给 Agent 读的版本；
- 站内搜索读的是构建出来的 `/index.json`（标题 + 标签），按 `/` 或 `⌘K` 打开；
- CSS / JS 在 `themes/mai/assets/`，构建时自动合并、压缩、加指纹；
- 本地预览：`hugo server`，需要 Hugo ≥ 0.110（已在 0.167 上验证）。

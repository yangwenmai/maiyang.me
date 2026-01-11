type Tool = {
  name: string;
  description: string;
  url?: string;
  note?: string;
};

type Category = {
  title: string;
  icon: string;
  tone: string;
  items: Tool[];
};

const quickFacts = [
  { label: '主机', value: 'MacBook Pro 14” · M3 Max · 64GB' },
  { label: '桌面', value: '坐站升降桌 + LG 5K' },
  { label: '输入', value: 'Keychron K8 Pro / MX Master 3S' },
  { label: '音视频', value: 'Shure MV7 / Sony A7C' },
  { label: '键位', value: 'Colemak DH / 盲打' },
];

const highlights = ['AI-first 工作流', '重度键盘 / 少鼠标', 'Raycast → 一跳直达', '深夜护眼主题', '自动化脚本偏好'];

const categories: Category[] = [
  {
    title: '编辑器 / IDE',
    icon: '⌨️',
    tone: '写代码的绝对主场',
    items: [
      { name: 'Cursor', description: '主力编辑器 + AI 结对编程，Ambassador 持续摸索最佳实践', url: 'https://cursor.com' },
      { name: 'VSCode', description: '备用方案，插件生态和远程开发兼容性极佳', url: 'https://code.visualstudio.com' },
    ],
  },
  {
    title: '终端与命令流',
    icon: '>_',
    tone: '一切自动化的入口',
    items: [
      { name: 'Warp', description: '命令面板 + AI prompt，session 管理更丝滑', url: 'https://warp.dev' },
      { name: 'iTerm2', description: '经典备胎，必要时切回纯净体验', url: 'https://iterm2.com' },
      { name: 'Oh My Zsh', description: 'zsh + alias + fzf / z / git 插件组合', url: 'https://ohmyz.sh' },
    ],
  },
  {
    title: 'AI 工具',
    icon: '🧠',
    tone: 'AI 先行，手工收尾',
    items: [
      { name: 'Cursor AI', description: '多轮修改、文件级意图表达最快的助手', url: 'https://cursor.com' },
      { name: 'ChatGPT', description: '长文案与头脑风暴，越权认知更稳', url: 'https://chat.openai.com' },
      { name: 'Claude', description: '大上下文推理和文档改写专家', url: 'https://claude.ai' },
      { name: 'CastMind.AI', description: '自研 · AI 播客发现与剪辑，加速信息摄取', url: 'https://castmind.ai' },
    ],
  },
  {
    title: '开发与交付',
    icon: '🛠️',
    tone: '从本地到上线的最短路径',
    items: [
      { name: 'Git', description: '分支策略 + 预提交钩子守护基线', url: 'https://git-scm.com' },
      { name: 'Docker', description: '本地环境隔离，云端同构部署', url: 'https://docker.com' },
      { name: 'Postman', description: 'API 调试与集合回放', url: 'https://postman.com' },
      { name: 'Vercel', description: '前端无脑托管 + Preview 环境', url: 'https://vercel.com' },
    ],
  },
  {
    title: '生产力与知识库',
    icon: '⚡️',
    tone: '降摩擦，保持心流',
    items: [
      { name: 'Raycast', description: '启动器 + Snippets + AI，桌面一跳直达', url: 'https://raycast.com' },
      { name: 'Notion', description: '团队文档与数据库，轻量项目管理', url: 'https://notion.so' },
      { name: 'Obsidian', description: '本地优先，反向链接做长期知识沉淀', url: 'https://obsidian.md' },
      { name: 'Apple Reminders', description: '少即是多，时间敏感任务单点收敛' },
    ],
  },
  {
    title: '硬件 / 桌面',
    icon: '🖥️',
    tone: '长时间舒适 + 便携平衡',
    items: [
      { name: 'MacBook Pro 14” M3 Max', description: '开发与剪辑主力，性能 / 噪声平衡' },
      { name: 'LG UltraFine 5K', description: '色彩准、文字锐利，舒适长时间阅读' },
      { name: 'Keychron K8 Pro', description: '静音红轴，Colemak DH 键位', url: 'https://www.keychron.com' },
      { name: 'MX Master 3S', description: '少鼠标，但用时要顺手滚轮', url: 'https://www.logitech.com' },
      { name: 'Herman Miller / 国誉升降桌', description: '坐站切换，肩颈保命' },
    ],
  },
];

const badgeColors = [
  'linear-gradient(120deg, #7c3aed, #2563eb)',
  'linear-gradient(120deg, #14b8a6, #22d3ee)',
  'linear-gradient(120deg, #f97316, #f43f5e)',
  'linear-gradient(120deg, #0ea5e9, #6366f1)',
  'linear-gradient(120deg, #22c55e, #84cc16)',
];

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div
        className="relative overflow-hidden rounded-2xl border px-6 py-10 sm:px-10"
        style={{
          borderColor: 'var(--border)',
          background: 'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.12), transparent 30%), var(--background)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))' }} />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono" style={{ color: 'var(--foreground)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              $ cat ~/uses.md
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'linear-gradient(120deg, #22d3ee, #6366f1)' }} />
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>
                我使用的工具
              </h1>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: 'var(--foreground)', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)' }}>
                AI 优先 · 极简高效
              </span>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>
              这是我每天都在用的工具栈，从写代码、自动化到桌面硬件。原则：让「想法 → 产出」的路径更短、更顺手。
            </p>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item, idx) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1 text-xs font-medium border"
                  style={{ color: 'var(--foreground)', borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[260px]">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border px-4 py-3"
                style={{ borderColor: 'var(--border)', background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
                  {fact.label}
                </div>
                <div className="text-sm font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {categories.map((category, idx) => (
          <section
            key={category.title}
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              borderColor: 'var(--border)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-2xl grid place-items-center text-xl font-semibold text-white shadow-lg"
                  style={{ background: badgeColors[idx % badgeColors.length] }}
                  aria-hidden
                >
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    {category.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {category.tone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: badgeColors[idx % badgeColors.length] }} />
                {category.items.length} 项常用
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {category.items.map((tool, toolIdx) => (
                <div
                  key={tool.name}
                  className="group rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                          {tool.name}
                        </h3>
                        {tool.note && (
                          <span className="rounded-full px-2 py-0.5 text-[11px] border" style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                            {tool.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {tool.description}
                      </p>
                    </div>
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 transition-opacity hover:opacity-100"
                        aria-label={`访问 ${tool.name}`}
                        style={{ color: 'var(--muted)' }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.03)' }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
              工具栈是活的
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              我会持续更新这份清单，记录每一次迭代与取舍。有什么值得尝试的好物，欢迎告诉我。
            </p>
          </div>
          <a
            href="https://x.com/maiyangai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              color: '#0b1223',
              background: 'linear-gradient(120deg, #22d3ee, #6366f1)',
              boxShadow: '0 10px 30px rgba(99,102,241,0.25)',
            }}
          >
            分享你的推荐 →
          </a>
        </div>
      </div>
    </div>
  );
}

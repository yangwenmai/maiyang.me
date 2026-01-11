import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '项目作品 - MaiYangAI',
  description: 'Cursor Ambassador 活动、Go 夜读社区、开源贡献等项目作品',
};

const featuredProjects = [
  {
    title: 'Cursor Ambassador',
    description: '作为 Cursor 中国区首位 Ambassador，举办了 10+ 场 Cursor 官方活动，推广 AI 编程工具在中国的应用。',
    link: 'https://cursor-insider.com/',
    icon: '🎯',
    tags: ['AI', 'Cursor', 'Ambassador'],
    stats: '10+ 活动',
    highlight: true,
  },
  {
    title: 'Go 夜读',
    description: 'Go 夜读社区发起人，通过线上分享和讨论，帮助 Go 开发者深入学习 Go 语言及其生态。累计 200+ 期分享。',
    link: 'https://github.com/talkgo/night',
    icon: '📚',
    tags: ['Go', 'Community', 'Open Source'],
    stats: '12K+ Stars',
    highlight: true,
  },
  {
    title: 'CastMind.AI',
    description: '我的产品项目，AI 驱动的播客发现与笔记平台，帮助用户高效发现和学习优质播客内容。',
    link: 'https://castmind.ai',
    icon: '🎙️',
    tags: ['AI', 'Product', 'Podcast'],
    stats: '运营中',
    highlight: true,
  },
];

const openSourceContributions = [
  {
    title: 'TalkGo',
    description: 'TalkGo 社区联合创始人，致力于打造国内最活跃的 Go 语言技术社区。',
    link: 'https://talkgo.org/',
    icon: '💬',
    tags: ['Go', 'Community'],
  },
  {
    title: 'TiDB Contributor',
    description: '参与 TiDB 开源项目开发，为分布式数据库生态贡献代码。',
    link: 'https://github.com/pingcap/tidb',
    icon: '🗄️',
    tags: ['Database', 'Open Source', 'Go'],
  },
  {
    title: 'Logkit Contributor',
    description: '七牛云 Logkit 项目的贡献者，帮助完善日志收集工具。',
    link: 'https://github.com/qiniu/logkit',
    icon: '📊',
    tags: ['Logging', 'Open Source', 'Go'],
  },
  {
    title: 'Kingshard Contributor',
    description: 'MySQL 分库分表中间件 Kingshard 的贡献者。',
    link: 'https://github.com/flike/kingshard',
    icon: '⚡',
    tags: ['Database', 'Open Source', 'Go'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="font-mono text-sm mb-4" style={{ color: 'var(--muted)' }}>
          $ ls ~/projects
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          项目作品
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          社区贡献、开源项目与技术布道
        </p>
      </div>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <span>⭐</span> 重点项目
        </h2>
        <div className="grid gap-6">
          {featuredProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-xl border-2 hover:opacity-80 transition-all"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="text-5xl flex-shrink-0">{project.icon}</div>
                
                <div className="flex-1">
                  {/* Title with stats */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
                      {project.title}
                    </h3>
                    {project.stats && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                        {project.stats}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External link icon */}
                <svg className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Open Source Contributions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <span>🔧</span> 开源贡献
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {openSourceContributions.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-lg border hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{project.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded border"
                        style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Additional info */}
      <div
        className="p-8 rounded-lg border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <span>🏆</span> 社区角色
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👔</span>
            <div>
              <div className="font-medium" style={{ color: 'var(--foreground)' }}>TGO 深圳董事会成员</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>技术领导力社区</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="font-medium" style={{ color: 'var(--foreground)' }}>TUG 华南区 Leader</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>任职 2 年</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎤</span>
            <div>
              <div className="font-medium" style={{ color: 'var(--foreground)' }}>Meetup 组织者</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>多次深圳 Gopher Meetup</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <div className="font-medium" style={{ color: 'var(--foreground)' }}>技术负责人</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>全球化电商 SaaS 创业公司</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

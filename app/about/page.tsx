import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我 - MaiYangAI',
  description: 'Cursor Ambassador · AI Builder · Go 夜读发起人的个人介绍',
};

const timeline = [
  {
    year: '2025',
    events: [
      '5 月成为 Cursor 中国区首位 Ambassador，举办 10+ Cursor 官方活动',
    ],
  },
  {
    year: '2021',
    events: [
      '9 月加入全球化电商 SaaS 创业公司',
    ],
  },
  {
    year: '2018-2021',
    events: [
      '在 2C 赛道近 9 年，经历各种复杂应用场景（秒杀、亿级 API 调用、百亿级数据量存储、微服务架构等）',
      '任职 2 年 TUG 华南区 Leader',
      'TGO 深圳董事会成员',
    ],
  },
  {
    year: '2017',
    events: [
      '发起 Go 夜读社区',
      '成为 TiDB、logkit、kingshard 等多个开源项目的 Contributor',
    ],
  },
  {
    year: '2014',
    events: [
      '开始技术博客写作',
    ],
  },
];

const interests = [
  { name: 'F1 赛车', icon: '🏎️', description: '最近2年疯狂喜欢上了 F1' },
  { name: '篮球', icon: '🏀', description: '偶尔看看 NBA' },
  { name: '足球', icon: '⚽', description: '偶尔看看欧洲足球比赛' },
  { name: '徒步', icon: '🥾', description: '偶尔徒步，探索自然' },
  { name: '旅行', icon: '✈️', description: '带着家人到处旅行，多次 1700+ 公里的驾驶经历' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header with Avatar */}
      <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <img
          src="https://cursor-insider.com/assets/host-avatar.jpg"
          alt="MaiYangAI"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover flex-shrink-0 ring-4 ring-gray-200 dark:ring-gray-700 shadow-lg"
        />
        
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            关于我
          </h1>
          <p className="text-xl mb-3" style={{ color: 'var(--muted)' }}>
            Cursor Ambassador · AI Builder · Go 夜读发起人
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm font-medium rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              🇨🇳 深圳
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              10+ 年技术经验
            </span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="mb-16">
        <div className="max-w-none">
          <p className="text-lg leading-relaxed" style={{ color: 'var(--foreground)' }}>
            对 Go 情有独钟，也是一个开源爱好者，Go，TiDB，logkit, kingshard 等多个开源项目的 Contributor，
            <a href="https://github.com/talkgo/night" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: 'var(--foreground)' }}>Go 夜读</a>
            社区发起人，TGO 深圳董事会成员，任职 2 年 TUG 华南区 Leader，多次深圳地区 Gopher meetup 的组织者和分享嘉宾。
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
          成长历程
        </h2>
        
        <div className="relative border-l-2 pl-8 space-y-8" style={{ borderColor: 'var(--border)' }}>
          {timeline.map((period) => (
            <div key={period.year} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[37px] w-4 h-4 rounded-full border-4 bg-black dark:bg-white" style={{ borderColor: 'var(--background)' }}></div>
              
              {/* Year */}
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {period.year}
              </div>
              
              {/* Events */}
              <ul className="space-y-2">
                {period.events.map((event, index) => (
                  <li key={index} style={{ color: 'var(--muted)' }}>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
          兴趣爱好
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {interests.map((interest) => (
            <div
              key={interest.name}
              className="p-4 rounded-lg border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{interest.icon}</span>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {interest.name}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact + Follow (merged) */}
      <section
        className="mt-16 p-8 rounded-lg border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          联系与关注
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:yangwen.yw@gmail.com"
            className="flex items-center gap-3 p-4 rounded-lg border hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--foreground)' }}>
              <span className="text-lg font-bold" style={{ color: 'var(--background)' }}>@</span>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Email</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>yangwen.yw@gmail.com</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/mai-yang-2a082777/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <svg className="w-6 h-6" style={{ color: 'var(--foreground)' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>LinkedIn</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>职业合作与交流</div>
            </div>
          </a>

          <a
            href="https://x.com/maiyangai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center">
              <svg className="w-6 h-6 text-white dark:text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Twitter / X</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>日常思考与技术分享</div>
            </div>
          </a>

          <a
            href="https://github.com/yangwenmai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--foreground)' }}>
              <svg className="w-6 h-6" style={{ color: 'var(--background)' }} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>GitHub</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>开源项目与代码贡献</div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

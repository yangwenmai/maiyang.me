import Link from 'next/link';

const podcastCategories = [
  {
    name: '科技前沿',
    icon: '💻',
    podcasts: [
      { name: '声东击西', description: '两个驻美记者主持的播客，带你看不一样的世界', url: 'http://www.etw.fm/' },
      { name: '内核恐慌', description: '一档由 Rio 和吴涛主持的科技播客', url: 'https://pan.icu/' },
      { name: '硅谷101', description: '来自硅谷的科技与商业深度对话', url: 'https://sv101.fireside.fm/' },
      { name: 'OnBoard!', description: '科技产品体验与行业洞察', url: 'https://onboard.fireside.fm/' },
    ],
  },
  {
    name: '程序员视角',
    icon: '👨‍💻',
    podcasts: [
      { name: 'ggtalk', description: '程序员的闲聊节目', url: 'https://talk.swift.gg/' },
      { name: '捕蛇者说', description: 'Python 开发者的播客', url: 'https://pythonhunter.org/' },
      { name: 'ByteTalk', description: '字节跳动技术团队出品的技术播客', url: 'https://bytetalk.fm/' },
      { name: 'TeaHour', description: '专注于程序员的技术茶话会', url: 'https://teahour.fm/' },
    ],
  },
  {
    name: '商业洞察',
    icon: '📈',
    podcasts: [
      { name: '疯投圈', description: '投资人的深度访谈与行业分析', url: 'https://crazy.capital/' },
      { name: '商业就是这样', description: '商业世界的有趣故事', url: 'https://www.xiaoyuzhoufm.com/podcast/6217f62d9504a4f2b8366aae' },
      { name: '创业内幕', description: 'GGV 出品的创业者访谈', url: 'https://www.xiaoyuzhoufm.com/podcast/5e4ee557418a84a0466fc53f' },
    ],
  },
  {
    name: '人文思考',
    icon: '📚',
    podcasts: [
      { name: '随机波动', description: '三位女性媒体人的文化观察', url: 'https://www.xiaoyuzhoufm.com/podcast/5e280faf418a84a046261fc8' },
      { name: '忽左忽右', description: '文化、历史、社会的深度对话', url: 'https://www.xiaoyuzhoufm.com/podcast/5e4ee557418a84a0466fc537' },
      { name: '文化有限', description: '读书、电影、生活的文化播客', url: 'https://www.xiaoyuzhoufm.com/podcast/5e4ee557418a84a0466fc537' },
    ],
  },
];

export default function PodcastsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="font-mono text-sm mb-4" style={{ color: 'var(--muted)' }}>
          $ open ~/podcasts
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          播客世界
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          我是播客重度用户，在 CastMind.AI 持续更新播客发现
        </p>
      </div>

      {/* CastMind.AI Feature */}
      <div
        className="mb-16 p-8 sm:p-12 rounded-2xl border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-2xl">
          <div className="text-5xl mb-6">🎙️</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            CastMind.AI
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--muted)' }}>
            AI 驱动的播客发现与笔记平台。
            <br />
            在这里，我持续分享最新的播客发现和学习笔记。
          </p>
          <Link
            href="https://castmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-opacity"
          >
            立即体验 CastMind.AI →
          </Link>
        </div>
      </div>

      {/* Podcast Categories */}
      <div className="space-y-12">
        {podcastCategories.map((category) => (
          <section key={category.name}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
              <span className="text-3xl">{category.icon}</span>
              {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {category.podcasts.map((podcast) => (
                <a
                  key={podcast.name}
                  href={podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-lg border card-hover"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
                    {podcast.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {podcast.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Info */}
      <div
        className="mt-16 p-8 rounded-lg border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          🎧 播客客户端推荐
        </h3>
        <div className="space-y-3 text-sm" style={{ color: 'var(--muted)' }}>
          <p>
            <span className="font-semibold">iOS:</span> 推荐使用 <span className="font-semibold">Overcast</span>，它的 Smart Speed 智能加速和 Voice Boost 声音均衡器功能非常实用。
          </p>
          <p>
            <span className="font-semibold">跨平台:</span> <span className="font-semibold">小宇宙</span> 是国内最好的播客 App，社区氛围很好。
          </p>
          <p className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            如果你也是播客重度用户，欢迎添加我的微信，加入「重度播客听友群」一起交流。
          </p>
        </div>
      </div>
    </div>
  );
}

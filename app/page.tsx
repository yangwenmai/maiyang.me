import Link from 'next/link';
import { getFeaturedPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function Home() {
  const featuredPosts = getFeaturedPosts(6);
  const accentColor = '#d87a52';
  const socialLinks = [
    {
      href: 'https://github.com/yangwenmai',
      label: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.13-4.55-5a3.93 3.93 0 0 1 1.02-2.7 3.6 3.6 0 0 1 .1-2.66s.84-.28 2.75 1.02a9.23 9.23 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.55 1.19.2 2.07.1 2.29a3.93 3.93 0 0 1 1.02 2.7c0 3.88-2.34 4.73-4.57 4.98.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.58.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/in/mai-yang-2a082777/',
      label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M4.98 3.5a2.25 2.25 0 1 1 .02 4.5 2.25 2.25 0 0 1-.02-4.5ZM3 8.75h3.96v11.5H3Zm6.78 0H14v1.57h.05c.35-.67 1.23-1.37 2.53-1.37 2.7 0 3.2 1.83 3.2 4.2v6.1h-3.96v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.78Z"
          />
        </svg>
      ),
    },
    {
      href: 'https://x.com/maiyangai',
      label: 'X',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="m4 4h4.67l3.02 4.62L14.79 4H20l-5.38 7.33L20 20h-4.67l-3.2-4.75L8.72 20H4l5.55-7.24Z"
          />
        </svg>
      ),
    },
    {
      href: 'https://www.youtube.com/@talkgo_night',
      label: 'YouTube',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M21.6 7.2s-.2-1.52-.82-2.19c-.79-.9-1.68-.9-2.09-.95C15.33 4 12 4 12 4h-.02s-3.33 0-6.67.06c-.4.05-1.3.05-2.09.95C2.6 5.68 2.4 7.2 2.4 7.2S2.2 8.9 2.2 10.59v1.78c0 1.69.2 3.38.2 3.38s.2 1.52.82 2.2c.79.9 1.83.87 2.29.96 1.66.17 6.49.23 6.49.23s3.33 0 6.67-.06c.4-.05 1.3-.05 2.09-.95.62-.67.82-2.19.82-2.19s.2-1.69.2-3.38v-1.78c0-1.69-.2-3.38-.2-3.38ZM9.85 14.52V8.77l5.57 2.88Z"
          />
        </svg>
      ),
    },
    {
      href: '/rss.xml',
      label: 'RSS',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3-5.9v3.2A8.7 8.7 0 0 1 11.7 23h3.2A11.9 11.9 0 0 0 3 11.1Zm0-5.8v3.2A14.5 14.5 0 0 1 20.5 23h3.2C23.7 13.7 14.3 4.3 3 4.3Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div
          className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10"
          style={{
            borderColor: 'var(--border)',
            background:
              'radial-gradient(circle at 20% 20%, rgba(216,122,82,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 45%), var(--background)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl" style={{ color: 'var(--muted)' }}>
                  Hi, I'm
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <span style={{ color: 'var(--foreground)' }}>MaiYang</span>{' '}
                  <span style={{ color: accentColor }}>AI</span>
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Engineer → Manager → Head of Engineering. <br />
                  <span style={{ color: accentColor }}>Cursor 中国区首位 Ambassador，「Go 夜读」创始人。</span>
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                  现带领几十人规模的工程团队，同时我也是一名 AI Builder，我正打造{' '}
                  <a href="https://cursor-insider.com" target="_blank" rel="noreferrer" style={{ color: accentColor }}>
                    Cursor-Insider.com
                  </a>{' '}
                  、{' '}
                  <a href="https://ctxly.ai" target="_blank" rel="noreferrer" style={{ color: accentColor }}>
                    Ctxly.ai
                  </a>{' '}
                  、{' '}
                  <a href="https://castmind.ai" target="_blank" rel="noreferrer" style={{ color: accentColor }}>
                    CastMind.ai
                  </a>{' '}
                  等产品，深耕 AI 辅助开发与技术社区，让人人都能成为 Builder。
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['AI Builder', 'Cursor Ambassador', 'Go 夜读发起人'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium rounded-full"
                    style={{
                      color: 'var(--foreground)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold"
                  style={{ backgroundColor: accentColor, color: '#0a0a0a' }}
                >
                  阅读我的博客
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold border"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  了解更多
                </Link>
              </div>

              <div className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-xs sm:max-w-sm">
                <div
                  className="absolute inset-0 -rotate-6 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, rgba(216,122,82,0.2) 60%, transparent 100%)`,
                    filter: 'blur(24px)',
                    opacity: 0.4,
                  }}
                />
                <div className="relative overflow-hidden rounded-full border-[10px]" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <img
                    src="https://cursor-insider.com/assets/host-avatar.jpg"
                    alt="MaiYang"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              最近文章
            </h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              最新的洞见和思考
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: 'var(--foreground)' }}
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
          快速导航
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/go"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="mb-4 h-12 w-12">
              <img 
                src="https://go.dev/images/gophers/ladder.svg" 
                alt="Go Gopher"
                className="h-full w-auto object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              Go 学习资源
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Go 夜读发起人精心整理的学习资源
            </p>
          </Link>

          <Link
            href="/projects"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              项目作品
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              开源贡献与社区建设
            </p>
          </Link>

          <Link
            href="/books"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              我的书单
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              已读、在读、想读的书籍分享
            </p>
          </Link>

          <Link
            href="/podcasts"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              播客世界
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              在 CastMind.AI 探索更多播客
            </p>
          </Link>

          <Link
            href="/uses"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              工具清单
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              我日常使用的软件和硬件
            </p>
          </Link>

          <Link
            href="/about"
            className="group p-6 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="text-4xl mb-4">👋</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
              关于我
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              成长历程与联系方式
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

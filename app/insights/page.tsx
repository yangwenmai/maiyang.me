import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'AI 洞见 - MaiYangAI',
  description: '探索 AI、Cursor 相关的技术洞察和实践经验',
};

export default function InsightsPage() {
  // Get posts from AI, Cursor categories
  const aiPosts = getPostsByCategory('ai');
  const cursorPosts = getPostsByCategory('cursor');
  
  // Combine and deduplicate
  const allInsights = [...aiPosts, ...cursorPosts];
  const uniqueInsights = Array.from(
    new Map(allInsights.map(post => [post.slug, post])).values()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          AI 洞见
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          探索 AI、Cursor 相关的技术洞察和实践经验
        </p>
      </div>

      {/* Insights grid */}
      {uniqueInsights.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {uniqueInsights.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p style={{ color: 'var(--muted)' }}>
            暂无 AI 相关文章
          </p>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-16 p-8 rounded-lg border bg-white dark:bg-black" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          想了解更多？
        </h2>
        <p className="mb-4" style={{ color: 'var(--muted)' }}>
          作为 Cursor Ambassador，我定期举办 Cursor 相关的线上线下活动，欢迎关注。
        </p>
        <div className="flex gap-4">
          <a
            href="https://cursor-insider.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-opacity"
          >
            Cursor Insider →
          </a>
        </div>
      </div>
    </div>
  );
}

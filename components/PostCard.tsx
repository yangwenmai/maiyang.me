import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/lib/posts';

interface PostCardProps {
  post: PostMeta;
}

// Helper function to determine post type label
function getPostTypeLabel(post: PostMeta): string {
  if (post.type) {
    const typeMap: Record<string, string> = {
      'blog': 'Blog post',
      'insight': 'AI Insight',
      'tutorial': 'Tutorial',
      'book-note': 'Book note',
    };
    return typeMap[post.type] || 'Blog post';
  }
  
  // Infer from categories
  if (post.categories?.includes('cursor') || post.categories?.includes('ai')) {
    return 'AI Insight';
  }
  
  return 'Blog post';
}

// Helper function to normalize tag display (capitalize first letter)
function normalizeTag(tag: string): string {
  if (!tag) return tag;
  // Handle special cases
  const specialCases: Record<string, string> = {
    'ai': 'AI',
    'go': 'Go',
    'golang': 'Golang',
    'api': 'API',
    'css': 'CSS',
    'html': 'HTML',
    'js': 'JS',
    'sql': 'SQL',
    'ui': 'UI',
    'ux': 'UX',
    'ios': 'iOS',
    'macos': 'macOS',
    'tidb': 'TiDB',
    'mysql': 'MySQL',
    'mongodb': 'MongoDB',
    'redis': 'Redis',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'k8s': 'K8s',
    'devops': 'DevOps',
    'saas': 'SaaS',
  };
  
  const lowerTag = tag.toLowerCase();
  if (specialCases[lowerTag]) {
    return specialCases[lowerTag];
  }
  
  // Capitalize first letter for other tags
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const postType = getPostTypeLabel(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      {/* 使用主题变量确保无论 dark 类是否生效都能正确适配 */}
      <article
        className="card-hover rounded-lg border overflow-hidden transition-all"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--background)',
        }}
      >
        {/* Cover Image */}
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta info */}
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--muted)' }}>
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span className="font-medium">{postType}</span>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
            {post.title}
          </h3>

          {/* Subtitle or description */}
          {(post.subtitle || post.description) && (
            <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
              {post.subtitle || post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(post.tags)).slice(0, 3).map((tag, index) => (
                <span
                  key={`${post.slug}-tag-${index}`}
                  className="px-2 py-1 text-xs font-medium rounded bg-black dark:bg-white text-white dark:text-black"
                >
                  {normalizeTag(tag)}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

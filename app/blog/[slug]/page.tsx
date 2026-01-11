import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPostSlugs, getPostWithHtml, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title} - MaiYangAI`,
    description: post.description || post.subtitle,
    keywords: post.keywords,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.description || post.subtitle,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastmod,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm hover:opacity-70 transition-opacity mb-8"
        style={{ color: 'var(--muted)' }}
      >
        ← 返回博客
      </Link>

      {/* Article header */}
      <article>
        <header className="mb-8 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl mb-4" style={{ color: 'var(--muted)' }}>
              {post.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
            <time dateTime={post.date}>{formattedDate}</time>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime}</span>
              </>
            )}
            {post.author && (
              <>
                <span>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {/* Categories and Tags */}
          {(post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories?.map((category, index) => (
                <span
                  key={`category-${index}`}
                  className="px-3 py-1 text-sm rounded-full border"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  {category}
                </span>
              ))}
              {Array.from(new Set(post.tags || [])).map((tag, index) => (
                <span
                  key={`tag-${index}`}
                  className="px-3 py-1 text-sm rounded border"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold
            prose-p:leading-relaxed
            prose-a:underline hover:prose-a:no-underline
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:rounded-lg prose-pre:border
            prose-blockquote:border-l-4 prose-blockquote:pl-4
            prose-img:rounded-lg prose-img:border"
          style={{
            color: 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-links': 'var(--foreground)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-quotes': 'var(--muted)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* Footer navigation */}
      <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}
        >
          ← 查看更多文章
        </Link>
      </div>
    </div>
  );
}

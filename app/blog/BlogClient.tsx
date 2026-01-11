'use client';

import { useState, useMemo } from 'react';
import { PostMeta } from '@/lib/posts';
import PostCard from '@/components/PostCard';

const POSTS_PER_PAGE = 20;

interface BlogClientProps {
  posts: PostMeta[];
  postsByYear: Record<number, PostMeta[]>;
  years: string[];
}

export default function BlogClient({ posts, postsByYear, years }: BlogClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Filter posts by selected year
  const filteredPosts = useMemo(() => {
    if (selectedYear) {
      return postsByYear[Number(selectedYear)] || [];
    }
    return posts;
  }, [selectedYear, postsByYear, posts]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Group paginated posts by year for display
  const displayPostsByYear = useMemo(() => {
    return paginatedPosts.reduce((acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {} as Record<number, PostMeta[]>);
  }, [paginatedPosts]);

  const displayYears = Object.keys(displayPostsByYear).sort((a, b) => Number(b) - Number(a));

  // Reset to page 1 when year changes
  const handleYearChange = (year: string | null) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="font-mono text-sm mb-4" style={{ color: 'var(--muted)' }}>
          $ ls -la ~/blog
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          博客归档
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          共 {posts.length} 篇文章，记录技术成长与个人思考
        </p>
      </div>

      {/* Year filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium mr-2" style={{ color: 'var(--muted)' }}>
          按年份筛选：
        </span>
        <button
          onClick={() => handleYearChange(null)}
          className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
          style={{
            borderColor: 'var(--border)',
            color: selectedYear === null ? 'var(--background)' : 'var(--foreground)',
            backgroundColor: selectedYear === null ? 'var(--foreground)' : 'var(--background)',
          }}
        >
          全部
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors"
            style={{
              borderColor: 'var(--border)',
              color: selectedYear === year ? 'var(--background)' : 'var(--foreground)',
              backgroundColor: selectedYear === year ? 'var(--foreground)' : 'var(--background)',
            }}
          >
            {year}
            <span className="ml-1 opacity-60">({postsByYear[Number(year)]?.length || 0})</span>
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
        {selectedYear ? (
          <span>显示 {selectedYear} 年的 {filteredPosts.length} 篇文章</span>
        ) : (
          <span>显示第 {(currentPage - 1) * POSTS_PER_PAGE + 1}-{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} 篇，共 {filteredPosts.length} 篇</span>
        )}
      </div>

      {/* Posts by year */}
      <div className="space-y-12">
        {displayYears.map((year) => (
          <div key={year} id={`year-${year}`}>
            {/* Year heading */}
            <div className="sticky top-20 z-10 py-4 mb-6 border-b backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
              <h2 className="text-2xl font-bold font-mono" style={{ color: 'var(--foreground)' }}>
                {year}
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                {displayPostsByYear[Number(year)].length} 篇文章
              </p>
            </div>

            {/* Posts grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {displayPostsByYear[Number(year)].map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !selectedYear && (
        <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            ← 上一页
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={currentPage !== pageNum ? { color: 'var(--foreground)' } : {}}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
          >
            下一页 →
          </button>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-8 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm hover:underline"
          style={{ color: 'var(--muted)' }}
        >
          ↑ 返回顶部
        </button>
      </div>
    </div>
  );
}

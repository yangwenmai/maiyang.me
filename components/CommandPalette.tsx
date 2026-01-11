'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  readingTime?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: Post[];
}

export default function CommandPalette({ open, onOpenChange, posts }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
    .slice(0, 10);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)}>
      <div className="fixed left-[50%] top-[20%] translate-x-[-50%] w-full max-w-2xl px-4">
        <Command 
          className="rounded-lg border bg-white dark:bg-black shadow-2xl overflow-hidden"
          style={{ borderColor: 'var(--border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border-b px-4" style={{ borderColor: 'var(--border)' }}>
            <svg className="w-5 h-5 mr-3" style={{ color: 'var(--muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              className="w-full py-4 bg-transparent outline-none text-base"
              style={{ color: 'var(--foreground)' }}
              placeholder="搜索文章..."
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono rounded border" style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            {filteredPosts.length === 0 && search && (
              <Command.Empty className="py-12 text-center text-sm" style={{ color: 'var(--muted)' }}>
                未找到相关文章
              </Command.Empty>
            )}

            {!search && (
              <div className="px-2 py-1.5 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                最近文章
              </div>
            )}

            {filteredPosts.map((post) => (
              <Command.Item
                key={post.slug}
                value={post.title}
                onSelect={() => {
                  router.push(`/blog/${post.slug}`);
                  onOpenChange(false);
                }}
                className="flex flex-col gap-1 px-4 py-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                  {post.title}
                </div>
                {post.description && (
                  <div className="text-xs line-clamp-1" style={{ color: 'var(--muted)' }}>
                    {post.description}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  {post.readingTime && (
                    <>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

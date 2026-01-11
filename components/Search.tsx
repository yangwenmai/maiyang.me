'use client';

import { useState } from 'react';
import CommandPalette from './CommandPalette';

interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  readingTime?: string;
}

interface SearchProps {
  posts: Post[];
}

export default function Search({ posts }: SearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border transition-colors"
        style={{ 
          borderColor: 'var(--border)',
          color: 'var(--muted)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="font-mono text-xs">⌘K</span>
      </button>
      <CommandPalette open={open} onOpenChange={setOpen} posts={posts} />
    </>
  );
}

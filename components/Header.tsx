'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Search from './Search';

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'Go', href: '/go' },
  { name: 'Books', href: '/books' },
  { name: 'Podcasts', href: '/podcasts' },
  { name: 'Projects', href: '/projects' },
  { name: 'Uses', href: '/uses' },
  { name: 'About', href: '/about' },
];

interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  readingTime?: string;
}

interface HeaderProps {
  searchPosts: Post[];
}

export default function Header({ searchPosts }: HeaderProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Terminal-style Logo */}
          <Link 
            href="/" 
            className="font-mono text-lg font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--foreground)' }}
          >
            ~/maiyang.me $
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors`}
                  style={{ 
                    color: isActive ? 'var(--foreground)' : 'var(--muted)',
                    backgroundColor: isActive ? 'rgba(128, 128, 128, 0.15)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side: Search + Theme toggle */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Search posts={searchPosts} />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--muted)' }}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

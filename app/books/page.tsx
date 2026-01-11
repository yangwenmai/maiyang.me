'use client';

import { useState } from 'react';

type BookStatus = 'read' | 'reading' | 'want-to-read';
type BookCategory = 'tech' | 'growth' | 'business' | 'life';

interface Book {
  title: string;
  author?: string;
  rating?: number;
  review?: string;
  status: BookStatus;
  category?: BookCategory;
}

const categoryLabels: Record<BookCategory, { label: string; icon: string }> = {
  tech: { label: '技术', icon: '💻' },
  growth: { label: '成长', icon: '🌱' },
  business: { label: '商业', icon: '📈' },
  life: { label: '人生', icon: '🌟' },
};

const books: Book[] = [
  // Read - Tech
  { title: '深入理解计算机系统', rating: 5, review: '计算机领域的龙书，必须精看。', status: 'read', category: 'tech' },
  { title: 'Linux 性能优化实战', review: '倪朋飞老师的极客时间专栏，跟着 TalkGo 读书会的小伙伴们一起在2个月内读完，非常不错的专栏。', status: 'read', category: 'tech' },
  { title: 'Google SRE：运维解密', review: 'DevOps 与 SRE 究竟有何不同？', status: 'read', category: 'tech' },
  { title: '数学之美', author: '吴军', rating: 5, review: '强烈推荐', status: 'read', category: 'tech' },
  { title: '香侬传', rating: 4, review: '了解香侬的一生，也能了解到咱们计算机发展历史。', status: 'read', category: 'tech' },
  
  // Read - Growth
  { title: '暗时间', author: '刘未鹏', rating: 5, review: '强烈推荐，书中有很多心理认知理论和阐述都让我有了新的了解。', status: 'read', category: 'growth' },
  { title: '见识', author: '吴军', rating: 5, review: '强烈推荐，吴军老师写的书都值得我们互联网从业者仔细阅读。', status: 'read', category: 'growth' },
  { title: '终身成长', rating: 4, review: '成长思维', status: 'read', category: 'growth' },
  { title: '如何高效阅读一本书', rating: 4, review: '实操手册', status: 'read', category: 'growth' },
  { title: '卓有成效的管理者', rating: 4, review: '管理者可以变成卓有成效的一些实践经验分享。', status: 'read', category: 'growth' },
  
  // Read - Business
  { title: '重新理解创业', rating: 5, review: '强烈推荐', status: 'read', category: 'business' },
  { title: '不拘一格', review: 'Netflix 的用人观', status: 'read', category: 'business' },
  { title: '价值', rating: 4, review: '每一个不善于学习的孩子都有强大的帮助别人学习的内在力量。', status: 'read', category: 'business' },
  
  // Read - Life
  { title: '活法', rating: 4, review: '我们人生的意义是什么? 人生的目的在哪里？', status: 'read', category: 'life' },
  { title: '有限与无限的游戏', rating: 5, review: '世上有且只有一种无限游戏。', status: 'read', category: 'life' },
  
  // Reading
  { title: '思考，快与慢', review: '刚开始看，书中对于快与慢有不少有意思的案例。', status: 'reading', category: 'growth' },
  
  // Want to read
  { title: '哈佛家训', review: '子女教育的鸡汤书，可以慢慢看完它。', status: 'want-to-read', category: 'life' },
  { title: '谈判', review: '看过前面4章，然后就中断了（已经几个月了），但是这本书我一定要花时间把它看完。', status: 'want-to-read', category: 'business' },
  { title: '瓦尔登湖', status: 'want-to-read', category: 'life' },
  { title: '第一性原理', status: 'want-to-read', category: 'growth' },
  { title: '开放式组织', status: 'want-to-read', category: 'business' },
  { title: '从优秀到卓越', status: 'want-to-read', category: 'business' },
  { title: '请停止无效的努力：加速升级你的眼界、心智和能力', status: 'want-to-read', category: 'growth' },
  { title: '大国政治的悲剧', status: 'want-to-read', category: 'life' },
  { title: '幸福之路', author: '罗素', review: '来自于拼多多黄铮推荐', status: 'want-to-read', category: 'life' },
  { title: '三十岁：一切刚刚开始', status: 'want-to-read', category: 'growth' },
  { title: '分析与思考：复旦大学的经济学课', status: 'want-to-read', category: 'business' },
];

export default function BooksPage() {
  const [activeTab, setActiveTab] = useState<BookStatus>('read');

  const filteredBooks = books.filter(book => book.status === activeTab);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="font-mono text-sm mb-4" style={{ color: 'var(--muted)' }}>
          $ cat ~/reading-list.md
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          我的书单
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          记录阅读历程，分享知识收获
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-8 border-b" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setActiveTab('read')}
          className={`pb-3 font-medium transition-colors ${activeTab === 'read' ? 'border-b-2 border-black dark:border-white' : ''}`}
          style={{ color: activeTab === 'read' ? 'var(--foreground)' : 'var(--muted)' }}
        >
          已读 ({books.filter(b => b.status === 'read').length})
        </button>
        <button
          onClick={() => setActiveTab('reading')}
          className={`pb-3 font-medium transition-colors ${activeTab === 'reading' ? 'border-b-2 border-black dark:border-white' : ''}`}
          style={{ color: activeTab === 'reading' ? 'var(--foreground)' : 'var(--muted)' }}
        >
          在读 ({books.filter(b => b.status === 'reading').length})
        </button>
        <button
          onClick={() => setActiveTab('want-to-read')}
          className={`pb-3 font-medium transition-colors ${activeTab === 'want-to-read' ? 'border-b-2 border-black dark:border-white' : ''}`}
          style={{ color: activeTab === 'want-to-read' ? 'var(--foreground)' : 'var(--muted)' }}
        >
          想读 ({books.filter(b => b.status === 'want-to-read').length})
        </button>
      </div>

      {/* Books list */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredBooks.map((book, index) => (
          <div
            key={`${book.title}-${index}`}
            className="p-5 rounded-lg border card-hover"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                    {book.title}
                  </h3>
                  {book.category && (
                    <span className="px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                      {categoryLabels[book.category].icon} {categoryLabels[book.category].label}
                    </span>
                  )}
                </div>
                {book.author && (
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    作者：{book.author}
                  </p>
                )}
              </div>
              {book.rating && (
                <div className="flex items-center gap-0.5 text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < book.rating! ? '' : 'opacity-30'}>
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
            {book.review && (
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>
                {book.review}
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

'use client';

import { useState } from 'react';

const featured = [
  {
    name: 'TalkGo',
    platform: 'YouTube & Bilibili',
    description: 'Weekly Go Online Meetup - Go 夜读社区',
    subscribers: '4.07K+ subscribers',
    links: {
      youtube: 'https://youtube.com/c/talkgo_night',
      bilibili: 'https://space.bilibili.com/326749661',
    },
  },
  {
    name: 'Go 夜读',
    platform: 'Bilibili',
    description: '所有与 Go 相关的技术知识、架构实践、TalkGo 读书会的阅读清单',
    subscribers: '1.4 万粉丝',
    links: {
      bilibili: 'https://space.bilibili.com/326749661',
      github: 'https://github.com/talkgo/night',
    },
  },
];

const youtubeChannels = [
  { name: 'justforfunc: Programming in Go', description: 'Series of talk recordings and screencasts mainly about Go and the Google Cloud Platform', subscribers: '33.1K', url: 'https://www.youtube.com/channel/UC_BzFbxG2za3bp5NRRRXJSw' },
  { name: 'The Go Programming Language', description: 'Videos about working with the Go Programming Language', subscribers: '26K', url: 'https://www.youtube.com/channel/UCO3LEtymiLrgvpb59cNsb8A' },
  { name: 'Gopher Academy', description: 'Gopher Academy', subscribers: '20.1K', url: 'https://www.youtube.com/channel/UCx9QVEApa5BKLw9r8cnOFEA' },
  { name: 'dotconferences dotgo', description: 'Tech Conferences, re-invented', subscribers: '17.9K', url: 'https://www.youtube.com/channel/UCSRhwaM00ay0fasnsw6EXKA' },
  { name: 'GopherCon UK', description: 'GopherCon UK', subscribers: '8.35K', url: 'https://www.youtube.com/channel/UC9ZNrGdT2aAdrNbX78lbNlQ' },
  { name: 'Go In 5 Minutes', description: 'Weekly 5 Minute Screencasts with focused, self contained tips', subscribers: '6.48K', url: 'https://www.youtube.com/channel/UC2GHqYE3fVJMncbrRd8AqcA' },
  { name: 'package main', description: 'Real-world Go tutorials for beginners and advanced engineers', subscribers: '5.47K', url: 'https://www.youtube.com/channel/UCI39wKG8GQnuzFPN5SM55qw' },
];

const bilibiliChannels = [
  { name: '土妹编程', description: '硅谷老年(senior)程序员，认真做对技术人有帮助的干货视频！', subscribers: '1.7 万', url: 'https://space.bilibili.com/555585221/' },
  { name: 'eggo-tech', description: '公众号：幼麟实验室。形象通透的编程教程', subscribers: '5674', url: 'https://space.bilibili.com/567195437/' },
  { name: '面向加薪学习', description: '专注于Go、Java、Flutter、Vue、React等', subscribers: '3202', url: 'https://space.bilibili.com/375038855' },
  { name: 'GopherChina', description: 'GopherChina', subscribers: '2396', url: 'https://space.bilibili.com/436361287' },
];

export default function GoPage() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'bilibili'>('youtube');

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="font-mono text-sm mb-4" style={{ color: 'var(--muted)' }}>
          $ cd ~/go-resources
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
          Go 学习资源
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          作为 Go 夜读发起人，我整理了这份精选学习资源
        </p>
      </div>

      {/* Featured Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
          ⭐ 精选推荐
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((channel) => (
            <div
              key={channel.name}
              className="p-6 rounded-lg border card-hover"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                    {channel.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {channel.platform}
                  </p>
                </div>
                <img 
                  src="https://go.dev/images/gophers/ladder.svg" 
                  alt="Go Gopher"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                {channel.description}
              </p>
              <div className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                {channel.subscribers}
              </div>
              <div className="flex flex-wrap gap-2">
                {channel.links.youtube && (
                  <a
                    href={channel.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {channel.links.bilibili && (
                  <a
                    href={channel.links.bilibili}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                  >
                    Bilibili
                  </a>
                )}
                {channel.links.github && (
                  <a
                    href={channel.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium rounded-md border hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Channels Section */}
      <section>
        <div className="flex items-center gap-4 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`pb-3 font-medium transition-colors ${activeTab === 'youtube' ? 'border-b-2 border-black dark:border-white' : ''}`}
            style={{ color: activeTab === 'youtube' ? 'var(--foreground)' : 'var(--muted)' }}
          >
            YouTube 频道
          </button>
          <button
            onClick={() => setActiveTab('bilibili')}
            className={`pb-3 font-medium transition-colors ${activeTab === 'bilibili' ? 'border-b-2 border-black dark:border-white' : ''}`}
            style={{ color: activeTab === 'bilibili' ? 'var(--foreground)' : 'var(--muted)' }}
          >
            Bilibili 频道
          </button>
        </div>

        <div className="grid gap-4">
          {(activeTab === 'youtube' ? youtubeChannels : bilibiliChannels).map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg border card-hover"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--foreground)' }}>
                    {channel.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                    {channel.description}
                  </p>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>
                    {channel.subscribers} subscribers
                  </div>
                </div>
                <svg className="w-5 h-5 flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--muted)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

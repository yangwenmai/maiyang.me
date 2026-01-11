import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '播客世界 - MaiYangAI',
  description: '播客重度用户的精选推荐，探索 CastMind.AI 发现更多优质播客',
};

export default function PodcastsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客归档 - MaiYangAI',
  description: '360+ 篇技术文章，记录 Go、AI、Cursor 技术成长与个人思考',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

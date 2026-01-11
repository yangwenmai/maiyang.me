import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的书单 - MaiYangAI',
  description: '记录阅读历程，分享已读、在读、想读的书籍和阅读感悟',
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

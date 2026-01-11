import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Go 学习资源 - MaiYangAI',
  description: 'Go 夜读发起人精心整理的 Go 语言学习资源，包括 YouTube、Bilibili 频道推荐',
};

export default function GoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

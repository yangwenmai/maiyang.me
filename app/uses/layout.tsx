import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我使用的工具 - MaiYangAI',
  description: '分享我日常使用的软件、硬件和工作流，包括编辑器、终端、AI 工具等',
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import Search from "@/components/Search";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaiYangAI - AI Builder, Cursor Ambassador, Gopher",
  description: "Cursor Ambassador · AI Builder · Go 夜读发起人。探索 AI、Cursor、Go 技术的洞见与实践。",
  keywords: ["MaiYangAI", "ai", "cursor", "go", "golang", "gopher", "AI Builder"],
  authors: [{ name: "MaiYang" }],
  openGraph: {
    title: "MaiYangAI",
    description: "Cursor Ambassador · AI Builder · Go 夜读发起人",
    url: "https://maiyang.me",
    siteName: "MaiYangAI",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Prepare search data
  const posts = getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description || post.subtitle,
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const shouldBeDark = theme ? theme === 'dark' : true;

                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header searchPosts={posts} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

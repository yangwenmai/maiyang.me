import { getAllPosts, PostMeta } from '@/lib/posts';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const posts = getAllPosts();
  
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, PostMeta[]>);

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <BlogClient 
      posts={posts} 
      postsByYear={postsByYear} 
      years={years} 
    />
  );
}

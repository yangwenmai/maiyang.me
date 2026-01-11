import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/post');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  lastmod?: string;
  description?: string;
  subtitle?: string;
  keywords?: string | string[];
  categories?: string[];
  tags?: string[];
  author?: string;
  draft?: boolean;
  featured?: boolean;
  cover?: string;
  type?: string;
  readingTime?: string;
}

export interface Post extends PostMeta {
  content: string;
  contentHtml: string;
}

/**
 * Get all post slugs from content/post directory
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get post metadata by slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    // Calculate reading time
    const stats = readingTime(content);
    
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      lastmod: data.lastmod,
      description: data.description,
      subtitle: data.subtitle,
      keywords: data.keywords,
      categories: data.categories || [],
      tags: data.tags || [],
      author: data.author,
      draft: data.draft || false,
      featured: data.featured || false,
      cover: data.cover,
      type: data.type,
      content,
      contentHtml: '',
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts metadata, sorted by date (newest first)
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && !post.draft)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  
  return posts;
}

/**
 * Get featured posts for homepage
 */
export function getFeaturedPosts(limit: number = 5): PostMeta[] {
  const allPosts = getAllPosts();
  
  // First try to get posts marked as featured
  const featuredPosts = allPosts.filter(post => post.featured);
  
  if (featuredPosts.length >= limit) {
    return featuredPosts.slice(0, limit);
  }
  
  // If not enough featured posts, get latest posts with AI/Cursor categories
  const aiPosts = allPosts.filter(post => 
    post.categories?.some(cat => 
      ['ai', 'cursor', 'AI', 'Cursor'].includes(cat)
    )
  );
  
  const combined = [...featuredPosts, ...aiPosts];
  const unique = Array.from(new Map(combined.map(p => [p.slug, p])).values());
  
  return unique.slice(0, limit);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.categories?.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.tags?.some(t => 
      t.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get all categories with post counts
 */
export function getAllCategories(): { name: string; count: number }[] {
  const allPosts = getAllPosts();
  const categoryMap = new Map<string, number>();
  
  allPosts.forEach(post => {
    post.categories?.forEach(category => {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
  });
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all tags with post counts
 */
export function getAllTags(): { name: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagMap = new Map<string, number>();
  
  allPosts.forEach(post => {
    post.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}

/**
 * Get post with HTML content
 */
export async function getPostWithHtml(slug: string): Promise<Post | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;
  
  const contentHtml = await markdownToHtml(post.content);
  return {
    ...post,
    contentHtml,
  };
}

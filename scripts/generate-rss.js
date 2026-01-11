const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'content/post');

function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          description: data.description || data.subtitle || '',
          author: data.author || 'MaiYang',
          categories: data.categories || [],
          draft: data.draft || false,
        };
      })
      .filter(post => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20); // Latest 20 posts for RSS
    
    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

function generateRSS() {
  const posts = getAllPosts();
  
  const rssItems = posts.map((post) => {
    const pubDate = new Date(post.date).toUTCString();
    const link = `https://maiyang.me/blog/${post.slug}/`;
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
      <author>${post.author}</author>
      ${post.categories.map(cat => `<category>${cat}</category>`).join('\n      ')}
    </item>`;
  }).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MaiYangAI</title>
    <link>https://maiyang.me</link>
    <description>Cursor Ambassador · AI Builder · Go 夜读发起人。探索 AI、Cursor、Go 技术的洞见与实践。</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://maiyang.me/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  // Write to public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
  console.log('RSS feed generated successfully!');
}

generateRSS();

import { bookData } from '@/data/bookData';
import { siteConfig } from '@/lib/seo-config';

interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(): string {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [
    // 主要页面
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contents`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
  
  // 添加所有章节页面
  bookData.parts.forEach(part => {
    part.chapters.forEach(chapter => {
      urls.push({
        url: `${baseUrl}/contents/${chapter.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7
      });
    });
  });
  
  // 生成XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return sitemap;
}

export function generateRobotsTxt(): string {
  const baseUrl = siteConfig.url;
  
  return `User-agent: *
Allow: /

# 优化搜索引擎抓取
Crawl-delay: 1

# Sitemap 位置
Sitemap: ${baseUrl}/sitemap.xml

# 禁止抓取的路径
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# 允许抓取的重要资源
Allow: /images/
Allow: /css/
Allow: /js/

# 特定搜索引擎优化
User-agent: Baiduspider
Crawl-delay: 2

User-agent: Googlebot
Crawl-delay: 1

User-agent: Sogou web spider
Crawl-delay: 2`;
}

// RSS订阅生成器
export function generateRSSFeed(): string {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();
  
  const items = bookData.parts.slice(0, 10).map(part => 
    part.chapters.slice(0, 3).map(chapter => `    <item>
      <title><![CDATA[${chapter.title}]]></title>
      <description><![CDATA[${chapter.description}]]></description>
      <link>${baseUrl}/contents/${chapter.id}</link>
      <guid isPermaLink="true">${baseUrl}/contents/${chapter.id}</guid>
      <pubDate>${currentDate}</pubDate>
      <category><![CDATA[医美]]></category>
      <category><![CDATA[美学]]></category>
    </item>`)
  ).flat().join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.title}]]></title>
    <description><![CDATA[${siteConfig.description}]]></description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <managingEditor>${siteConfig.company.email} (${siteConfig.authors[0]})</managingEditor>
    <webMaster>${siteConfig.company.email}</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} ${siteConfig.company.name}</copyright>
    <category><![CDATA[医美]]></category>
    <category><![CDATA[美学]]></category>
    <category><![CDATA[医疗]]></category>
    <ttl>1440</ttl>
    <image>
      <url>${siteConfig.images.logo}</url>
      <title><![CDATA[${siteConfig.title}]]></title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
${items}
  </channel>
</rss>`;
}
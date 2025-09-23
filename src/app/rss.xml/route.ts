import { generateRSSFeed } from '@/lib/sitemap';

export async function GET() {
  const rss = generateRSSFeed();
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600',
    },
  });
}
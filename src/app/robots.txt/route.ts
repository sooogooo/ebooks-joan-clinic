import { generateRobotsTxt } from '@/lib/sitemap';

export async function GET() {
  const robots = generateRobotsTxt();
  
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
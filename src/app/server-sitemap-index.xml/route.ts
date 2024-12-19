import { getServerSideSitemapIndex } from 'next-sitemap';

export async function GET() {
  return getServerSideSitemapIndex([
    'https://www.adrsource.com/resources/server-sitemap.xml',
    'https://www.adrsource.com/team/server-sitemap.xml',
  ]);
}

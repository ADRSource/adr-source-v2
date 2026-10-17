import { getServerSideSitemapIndex } from 'next-sitemap';
import { PATHS } from '~/constants/paths.constants';

export async function GET() {
  return getServerSideSitemapIndex([
    `${PATHS.absolute}${PATHS.resources}/server-sitemap.xml`,
    `${PATHS.absolute}${PATHS.team}/server-sitemap.xml`,
  ]);
}

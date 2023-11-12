import { getServerSideSitemap } from 'next-sitemap';
import { getResources } from '~/api/resource';
import { PATHS } from '~/constants/paths.constants';

// TODO: should be recursive in the future but tbh we don't have that many resources anyway
export async function GET() {
	// Method to source urls from cms
	const data = await getResources(1000, 0);
	const { resourcePages } = data;

	return getServerSideSitemap(
		resourcePages.map((resource) => {
			const { slug } = resource;
			return {
				loc: `${PATHS.absolute}${PATHS.resources}/${slug}`,
				changefreq: 'daily',
				priority: 0.7,
				lastmod: new Date().toISOString(),
			};
		}),
	);
}

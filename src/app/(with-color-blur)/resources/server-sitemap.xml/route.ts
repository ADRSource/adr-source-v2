import { getServerSideSitemap } from 'next-sitemap';
import { getResources } from '~/api/resource';
import { PATHS } from '~/constants/paths.constants';

// TODO: should be recursive in the future but tbh we don't have that many resources anyway
export async function GET() {
	// Method to source urls from cms
	const data = await getResources(1000, 0);
	const { resources } = data;

	return getServerSideSitemap(
		resources
			.filter((r) => r.resource?.__typename === 'InternalResource')
			.map((r) => {
				const { resource } = r;

				if (resource?.__typename !== 'InternalResource') return null;

				return {
					loc: `${PATHS.absolute}${PATHS.resources}/${resource.slug}`,
					changefreq: 'daily' as const,
					priority: 0.7,
					lastmod: new Date().toISOString(),
				};
			})
			.filter(Boolean),
	);
}

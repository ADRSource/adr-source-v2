import { Metadata } from 'next';
import { getHomePage } from '~/api/home';
import { prefetchNeutralsList } from '~/api/member';
import { prefetchResources } from '~/api/resource';
import { BlockAbout } from '~/components/blocks/block-about';
import { BlockHero } from '~/components/blocks/block-hero';
import { BlockResources } from '~/components/blocks/block-resources';
import { BlockTeam } from '~/components/blocks/block-team/block-team';
import { PATHS } from '~/constants/paths.constants';

export const revalidate = 300; // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
	try {
		const data = await getHomePage();
		const { seo } = data.homePage ?? {};

		const title = seo?.title ?? '';
		const description = seo?.description ?? '';
		const index = Boolean(seo?.index);

		return {
			title,
			description,
			robots: index ? 'index, follow' : 'noindex, nofollow',
			openGraph: {
				title,
				description,
				type: 'website',
				locale: 'en_US',
				url: PATHS.absolute,
			},
		};
	} catch (_error) {
		console.error('Error generating metadata for home page');

		return {};
	}
}

export default async function Home() {
	const _neutralsPrefetch = await prefetchNeutralsList();
	const _resourcesPrefetch = await prefetchResources(3);

	return (
		<main className="min-h-screen">
			<div className="relative z-0">
				<BlockHero />
			</div>
			<BlockTeam />
			<BlockAbout />
			<BlockResources />
		</main>
	);
}

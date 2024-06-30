import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getHomePage } from '~/api/home';
import { getNeutralsList } from '~/api/member';
import { getResources } from '~/api/resource';
import { BlockAbout } from '~/components/blocks/block-about';
import { BlockHero } from '~/components/blocks/block-hero/block-hero';
import { BlockResources } from '~/components/blocks/block-resources';
import { BlockTeam } from '~/components/blocks/block-team/block-team';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const preview = draftMode().isEnabled;
		const data = await getHomePage(preview);
		const { seo } = data.homePage ?? {};

		return getMetadataFromSeo(PATHS.absolute, seo);
	} catch (_error) {
		console.error('Error generating metadata for home page');

		return {};
	}
}

export default async function Home() {
	const preview = draftMode().isEnabled;
	const _neutralsPrefetch = await getNeutralsList(preview);
	const _resourcesPrefetch = await getResources(3, undefined, preview);

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

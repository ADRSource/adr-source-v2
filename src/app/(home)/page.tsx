import { BlockAbout } from '../../components/blocks/block-about';
import { BlockHero } from '../../components/blocks/block-hero';
import { BlockResources } from '../../components/blocks/block-resources';
import { BlockTeam } from '../../components/blocks/block-team/block-team';

export default function Home() {
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

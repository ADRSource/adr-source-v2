import { BlockAbout } from './components/blocks/block-about';
import { BlockHero } from './components/blocks/block-hero';
import { BlockResources } from './components/blocks/block-resources';

export default function Home() {
	return (
		<main className="min-h-screen">
			<BlockHero />
			<BlockAbout />
			<BlockResources />
		</main>
	);
}

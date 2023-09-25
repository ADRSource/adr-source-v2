import { BlockAbout } from './components/blocks/block-about';
import { BlockResources } from './components/blocks/block-resources';

export default function Home() {
	return (
		<main className="min-h-screen">
			<BlockAbout />
			<BlockResources />
		</main>
	);
}

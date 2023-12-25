'use client';

import { Footer } from '~/components/footer/footer';
import { Navigation } from '~/components/navigation/navigation';
import { RootError } from '~/components/root-error';
import { RootHtml } from '~/components/root-html';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<RootHtml>
			<Navigation />
			<RootError error={error} reset={reset} />
			<Footer />
		</RootHtml>
	);
}

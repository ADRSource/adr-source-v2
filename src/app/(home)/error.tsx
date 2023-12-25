'use client';

import { RootError } from '~/components/root-error';

export default function Error({
	reset,
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <RootError reset={reset} error={error} />;
}

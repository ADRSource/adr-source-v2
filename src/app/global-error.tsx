'use client';

import { ErrorView } from '~/components/error-view';
import { Footer } from '~/components/footer/footer';
import { Navigation } from '~/components/navigation/navigation';
import { root } from '~/components/ui/button';
import { heading } from '~/components/ui/text';
import { gloock, inter } from '~/styles/fonts';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en" className={`${inter.variable} ${gloock.variable}`}>
			<head>
				<meta name="theme-color" content="#1B1B1B" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className="relative isolate flex min-h-screen flex-col bg-brand-black text-brand-copper">
				<Navigation />
				<ErrorView type="500">
					<div className="stack-y-4">
						<details className="rounded-lg border border-solid border-brand-copper bg-brand-black px-2 py-1 text-base text-brand-copper">
							<summary className={heading({ type: '5', className: 'cursor-pointer text-lg' })}>
								Details
							</summary>
							<pre className="mt-1 rounded-lg bg-[#2D2D2D] px-2 py-1 text-sm text-brand-copper">
								{error.message}
							</pre>
						</details>

						<div className="flex justify-center">
							<button
								className={root({ size: 'large' })}
								onClick={
									// Attempt to recover by trying to re-render the segment
									() => {
										reset();
									}
								}
							>
								Try again
							</button>
						</div>
					</div>
				</ErrorView>

				<Footer />
			</body>
		</html>
	);
}

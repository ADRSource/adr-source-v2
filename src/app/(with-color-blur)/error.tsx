'use client';

import { ErrorView } from '~/components/error-view';
import { root } from '~/components/ui/button';
import { heading } from '~/components/ui/text';

export default function Error({
	reset,
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
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
	);
}

'use client';
import { twMerge } from 'tailwind-merge';

export function ColorBlurContainer() {
	return (
		<div
			className={twMerge(
				'pointer-events-none absolute inset-0 isolate z-10 h-screen max-h-[150vh] min-h-screen w-full overflow-x-clip md:min-h-[832px]',
			)}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute bottom-0 left-0 z-10 aspect-square w-[50%] -translate-x-1/2 translate-y-[33%] rounded-full bg-brand-blue opacity-10 blur-[70px]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 rounded-full bg-brand-red opacity-20 blur-[70px]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute bottom-0 right-1/2 z-10 aspect-square w-[50%] translate-x-1/2 translate-y-[66%] rounded-full bg-brand-green opacity-20 blur-[70px]"
			/>
		</div>
	);
}

import { twMerge } from 'tailwind-merge';
import { IconLogoMark } from '~/components/icons/IconLogoMark';
import styles from './page-loader.module.css';

export function PageLoader() {
	return (
		<div
			className={twMerge(
				'relative isolate grid grid-cols-1 grid-rows-1 place-items-center',
				styles.loading,
			)}
		>
			<div className="relative z-10 col-span-full row-span-full h-[var(--size)] w-[var(--size)] animate-ping rounded-full bg-brand-copper/10" />

			{/* Outer blurred ring with a more subtle transparency for a softer glow */}
			<div className="relative z-20 col-span-full row-span-full h-[var(--size)] w-[var(--size)] animate-pulse rounded-full bg-brand-copper/50 blur-md" />

			{/* Adjust the linear gradient to soften the transition from copper to dark */}
			<div className="relative z-30 col-span-full row-span-full h-[var(--size)] w-[var(--size)] rounded-full bg-brand-copper" />

			{/* Fine-tune the radial gradient to start transitioning sooner and avoid abrupt color change */}
			<div className="relative z-40 col-span-full row-span-full h-[var(--size)] w-[var(--size)] scale-[97%] rounded-full bg-[radial-gradient(210%_95%_at_50%_0%,_#2B2B2B_0%,_#1B1B1B_80%)]" />

			<IconLogoMark className="relative z-50 col-span-full row-span-full w-[35px] -translate-x-[3px] translate-y-[2px]" />
		</div>
	);
}

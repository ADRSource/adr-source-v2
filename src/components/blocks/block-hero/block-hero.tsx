import Image from 'next/image';
import Balancer from 'react-wrap-balancer';
import { createFluidValue } from '~/utils/create-fluid-value';
import styles from './block-hero.module.css';

export function BlockHero() {
	return (
		<section className="relative -mt-[var(--nav-spacing)] h-[100svh] w-full">
			<h1 className="sr-only">ADR Source</h1>
			<div
				className="relative z-20 flex h-full flex-col justify-end overflow-x-clip pt-[var(--nav-spacing)]"
				style={{
					zIndex: 20,
				}}
			>
				<p
					className="px-2 py-6 text-left font-serif text-8xl leading-none"
					style={{
						fontSize: createFluidValue(40, 96, 390, 1920),
					}}
				>
					<Balancer>
						Your source for a trusted neutral <br />
						when it counts
					</Balancer>
				</p>
			</div>
			<div
				className="absolute inset-0 flex h-full flex-col justify-end overflow-x-clip pt-[var(--nav-spacing)]"
				style={{
					zIndex: 5,
				}}
			>
				<div className={styles.textGradient}>
					<p
						className={`invisible relative z-20 px-2 py-6 text-left font-serif text-8xl leading-none`}
						style={{
							fontSize: createFluidValue(40, 96, 390, 1920),
						}}
					>
						<Balancer>
							Your source for a trusted neutral <br />
							when it counts
						</Balancer>
					</p>
				</div>
			</div>
			<div
				className="pointer-events-none absolute inset-0 isolate h-full w-full overflow-x-clip md:min-h-[832px]"
				style={{
					zIndex: 10,
				}}
			>
				<div
					aria-hidden
					className="pointer-events-none absolute bottom-0 left-0 z-10 aspect-square w-[50%] -translate-x-1/2 translate-y-[33%] rounded-full bg-brand-blue opacity-10 blur-[70px]"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 rounded-full bg-brand-red opacity-40 blur-[70px]"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute bottom-0 right-1/2 z-10 aspect-square w-[50%] translate-x-1/2 translate-y-[66%] rounded-full bg-brand-green opacity-20 blur-[70px]"
				/>
			</div>
			<div
				className={styles.bgGradient}
				style={{
					zIndex: 5,
				}}
			/>
			<div
				className="pointer-events-none absolute top-0 h-full w-full"
				style={{
					zIndex: 0,
				}}
			>
				<Image
					alt=""
					loading="eager"
					fill
					priority
					src="https://media.graphassets.com/C44kks1SnyJPFq8vLpBp"
					style={{
						objectFit: 'cover',
					}}
				/>
			</div>
		</section>
	);
}

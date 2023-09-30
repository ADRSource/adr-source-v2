import Image from 'next/image';
import { createFluidValue } from 'tailwind/create-fluid-value';

export function BlockHero() {
	return (
		<section className="w-full">
			<div className="relative overflow-x-clip py-6 stack-y-3">
				<h1 className="sr-only relative z-10">ADR Source</h1>
				<p className="relative z-20 whitespace-nowrap px-2 stack-y-2">
					<span className="relative w-min items-center stack-y-3">
						<span
							className="block font-sans uppercase leading-none"
							style={{ fontSize: createFluidValue(24, 48, 1040, 1600) }}
						>
							Your source for a
						</span>
						<span className="block font-serif text-[max(72px,15.55vw)] capitalize leading-[80%]">
							trusted
						</span>
					</span>

					<span className="relative w-min items-center self-end stack-y-3">
						<span className="block font-serif text-[max(72px,15.55vw)] capitalize leading-[80%]">
							neutral
						</span>
						<span
							className="block font-sans uppercase leading-none"
							style={{ fontSize: createFluidValue(24, 48, 1040, 1600) }}
						>
							when it counts<span className="sr-only">.</span>
						</span>
					</span>
				</p>
				<div
					aria-hidden
					className="pointer-events-none absolute bottom-0 left-0 z-10 aspect-square w-[50%] -translate-x-1/2 translate-y-[33%] rounded-full bg-brand-blue opacity-10 blur-[70px]"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 rounded-full bg-brand-red opacity-20 blur-[70px]"
				/>
				<div className="absolute top-0 z-0 h-full w-full opacity-30">
					<Image
						alt=""
						loading="eager"
						fill
						priority
						src="/images/hero-bg.webp"
						className="z-0 grayscale"
						style={{
							clipPath: 'ellipse(50% 50%)',
							objectFit: 'cover',
						}}
					/>
					<div
						className="relative z-10 mx-auto h-full w-full rounded-full bg-brand-black/20"
						style={{
							backgroundImage:
								'radial-gradient(farthest-side, rgba(27, 27, 27, 0) 0%, rgb(27, 27, 27) 86%)',
						}}
					/>
				</div>
			</div>
		</section>
	);
}

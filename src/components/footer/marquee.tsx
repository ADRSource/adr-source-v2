'use client';

import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

const REPEAT_COUNT = 10;

export function Marquee({ text }: { text: string }) {
	const textRepeat = text.repeat(REPEAT_COUNT);
	const [textMeasureRef, { width }] = useMeasure({ debounce: 100 });

	return (
		<div className="relative z-10 col-span-full row-span-full h-full w-full select-none overflow-x-clip">
			<p
				aria-hidden
				className="leading-0 invisible whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-none"
			>
				{textRepeat}
			</p>
			<motion.p
				className="leading-0 absolute left-0 top-0 whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-none"
				ref={textMeasureRef}
				animate={{
					x: [0, -width],
					transition: {
						x: {
							duration: 300,
							repeat: Infinity,
							repeatType: 'loop',
							ease: 'linear',
						},
					},
				}}
			>
				{textRepeat}
			</motion.p>
		</div>
	);
}

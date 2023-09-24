'use client';
import * as React from 'react';

import {
	motion,
	useMotionTemplate,
	useMotionValueEvent,
	useScroll,
	useSpring,
} from 'framer-motion';
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';

export function Marquee({ children }: { children: React.ReactNode }) {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [containerMeasureRef, { width: containerWidth }] = useMeasure({ debounce: 100 });
	const [textMeasureRef, { width: textWidth }] = useMeasure({ debounce: 100 });
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['end end', '200% end'],
	});
	const textWidthDelta = textWidth - containerWidth;

	const springScrollYProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});
	const translateX = useMotionTemplate`calc(100% - (${
		textWidth + textWidthDelta * springScrollYProgress.get()
	}px))`;
	useMotionValueEvent(springScrollYProgress, 'change', (v) => {
		translateX.set(`calc(100% - (${textWidth + textWidthDelta * v}px))`);
	});

	return (
		<div
			ref={mergeRefs([containerRef, containerMeasureRef])}
			className="h z-10-full relative col-span-full row-span-full w-full overflow-hidden"
		>
			<p
				aria-hidden
				className="leading-0 invisible whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-[85%]"
			>
				{children}
			</p>
			<motion.p
				style={
					{
						x: translateX,
					} as React.CSSProperties
				}
				className="leading-0 absolute left-0 top-0 whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-[85%]"
				ref={textMeasureRef}
			>
				{children}
			</motion.p>
		</div>
	);
}

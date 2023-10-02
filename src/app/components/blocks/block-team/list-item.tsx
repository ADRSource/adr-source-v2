'use client';

import { useThrottle } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { ButtonLink, IconButtonLink } from '~/components/ui/button';
import { IconLink } from '~/components/ui/link';
import { heading } from '~/components/ui/text';

interface ListItemProps {
	member: {
		name: string;
		url: string;
		headshot: string;
	};
}
export function ListItem({ member }: ListItemProps) {
	const containerRef = React.useRef<HTMLLIElement>(null);
	const { x, y } = useMousePosition();
	const { left, top } = containerRef.current?.getBoundingClientRect() ?? {};

	return (
		<li
			className="group linkBox flex items-center justify-between border-b border-solid border-brand-copper py-2 first:border-t"
			ref={containerRef}
		>
			<p className={heading({ type: '5' })}>{member.name}</p>
			<div className="items-center opacity-25 transition-opacity stack-x-3 group-hover:opacity-100">
				<div className="hidden md:block">
					<IconLink
						className="p-1 text-xs font-medium uppercase leading-none text-white transition-colors hover:text-brand-copper"
						href="/schedule"
					>
						Calendar <span className="sr-only">for {member.name}</span>
					</IconLink>
				</div>
				<div className="hidden md:block">
					<ButtonLink href={member.url}>View Bio</ButtonLink>
				</div>
				<div className="md:hidden">
					<IconButtonLink className="linkOverlay" href={member.url}>
						<IconArrowTopRight />
					</IconButtonLink>
				</div>
			</div>
			<motion.div
				className="pointer-events-none absolute inset-0 z-30 "
				animate={{
					x: x - (left ?? 0),
					y: y - (top ?? 0),
				}}
				transition={{
					type: 'tween',
					ease: 'circOut',
				}}
			>
				<div className="relative aspect-[4/5] w-[270px] -translate-x-[calc(100%_+_20px)] translate-y-[40px] overflow-clip rounded-md bg-brand-black opacity-0 transition duration-500 ease-in-out group-hover:opacity-100">
					<Image
						alt=""
						src={member.headshot}
						fill
						sizes="(max-width: 498px) 100vw, (max-width: 751px) 50vw, (max-width: 1039px) 33vw, 308px"
						className="grayscale"
						style={{
							objectFit: 'cover',
							scale: 1.05,
						}}
					/>
				</div>
			</motion.div>
		</li>
	);
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	React.useEffect(() => {
		function updateMousePosition(this: Window, ev: MouseEvent) {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		}
		window.addEventListener('mousemove', updateMousePosition);
		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);
	return useThrottle(mousePosition, 50);
};

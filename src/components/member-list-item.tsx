'use client';

import { useThrottle } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { ButtonLink, CircleButton } from '~/components/ui/button';
import { IconLink } from '~/components/ui/link';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

interface MemberListItemProps {
	member: {
		name: string;
		url: string;
		headshot: string;
	};
	hasSchedule?: boolean;
	children?: React.ReactNode;
}
export function MemberListItem({ member, hasSchedule = true, children }: MemberListItemProps) {
	const containerRef = React.useRef<HTMLLIElement>(null);
	const { x, y } = useMousePosition();
	const { left, top } = containerRef.current?.getBoundingClientRect() ?? {};
	const url = `${PATHS.team}/${member.url}`;

	return (
		<li
			className="group linkBox flex items-center justify-between border-b border-solid border-brand-copper/40 py-2 transition-colors first:border-t hover:border-brand-copper"
			ref={containerRef}
		>
			<div className="items-baseline stack-x-1">
				<p className={heading({ type: '5' })}>{member.name}</p>
				{children}
			</div>
			<div className="items-center opacity-100 transition-opacity stack-x-3 group-hover:opacity-100 md:opacity-25">
				{Boolean(hasSchedule) && (
					<div className="hidden md:block">
						<IconLink
							className="p-1 text-xs font-medium uppercase leading-none text-white transition-colors hover:text-brand-copper"
							href={{
								pathname: url,
								hash: 'schedule',
							}}
						>
							Scheduling <span className="sr-only">for {member.name}</span>
						</IconLink>
					</div>
				)}
				<div className="hidden md:block">
					<ButtonLink href={url}>View Bio</ButtonLink>
				</div>
				<div className="md:hidden">
					<CircleButton className="linkOverlay" href={url}>
						<IconArrowTopRight />
					</CircleButton>
				</div>
			</div>
			<motion.div
				className="pointer-events-none absolute inset-0 z-30 hidden md:block "
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

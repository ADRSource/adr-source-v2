'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { IconCalendar } from '~/components/icons/IconCalendar';
import { ButtonLink } from '~/components/ui/button';
import { PATHS } from '~/constants/paths.constants';

export function ScheduleButtonLink() {
	return (
		<ButtonLink
			icon={<IconCalendar />}
			href={PATHS.schedule}
			className="right-2 block leading-none md:absolute md:inset-y-center"
		>
			Scheduling
		</ButtonLink>
	);
}

interface NavigationLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onLinkClick?: (href: string) => void;
}
export function NavigationLink({ href, children, onLinkClick, className }: NavigationLinkProps) {
	return (
		<Link
			href={href}
			className={twMerge(
				'decoration-none text-center text-xs font-medium uppercase leading-none text-white',
				className,
			)}
			onClick={() => {
				onLinkClick?.(href);
			}}
		>
			{children}
		</Link>
	);
}

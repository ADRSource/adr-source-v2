import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ButtonLink } from '~/components/ui/button';
import { PATHS } from '~/constants/paths.constants';

export function ScheduleButtonLink() {
	return (
		<ButtonLink href={PATHS.schedule} className="right-2 block md:absolute md:inset-y-center">
			Schedule
		</ButtonLink>
	);
}

interface NavigationLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}
export function NavigationLink({ href, children, onClick, className }: NavigationLinkProps) {
	return (
		<Link
			href={href}
			className={twMerge(
				'decoration-none text-center text-xs font-medium uppercase leading-none text-white',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</Link>
	);
}

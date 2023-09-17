import Link from 'next/link';
import { PATHS } from '~/constants/paths.constants';
import { IconLogo } from './icons/IconLogo';
import { ButtonLink } from './ui/button';

export function Navigation() {
	return (
		<nav className="fixed top-1 z-30 h-nav-height w-full px-1 inset-x-center md:top-2 md:px-2">
			<div className="mx-auto flex h-full w-full max-w-[922px] items-center rounded-full border border-solid border-brand-copper bg-brand-black/70 backdrop-blur-sm backdrop-saturate-150 ">
				<ul className="relative flex w-full items-center gap-1 px-1 py-1 md:justify-between md:px-2 md:stack-x-2">
					<li>
						<Link href={PATHS.home} className="left-2 block md:absolute md:inset-y-center">
							<IconLogo className="h-[30px] w-auto" />
							<span className="sr-only">Home</span>
						</Link>
					</li>
					<li>
						<DesktopNavigation />
						<MobileNavigation />
					</li>
					<li className="flex flex-1 justify-end md:flex-initial">
						<ButtonLink
							href={PATHS.schedule}
							className="right-2 block md:absolute md:inset-y-center"
						>
							Schedule
						</ButtonLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

function DesktopNavigation() {
	return (
		<ul className="hidden items-center justify-center md:stack-x-2">
			<li>
				<NavigationLink href={PATHS.about}>About</NavigationLink>
			</li>
			<li>
				<NavigationLink href={PATHS.team}>Team</NavigationLink>
			</li>
			<li>
				<NavigationLink href={PATHS.resources}>Resources</NavigationLink>
			</li>
		</ul>
	);
}

function MobileNavigation() {
	return (
		<button className="block md:hidden" aria-label="Open Menu">
			<span className="grid place-items-center p-1">
				<span className="h-2 justify-center stack-y-[calc(theme(spacing.1)_/_2)]">
					<span className="block h-[1px] w-[24px] bg-white"></span>
					<span className="block h-[1px] w-[60%] bg-white"></span>
				</span>
			</span>
		</button>
	);
}

interface NavigationLinkProps {
	href: string;
	children: React.ReactNode;
}
function NavigationLink({ href, children }: NavigationLinkProps) {
	return (
		<Link
			href={href}
			className="decoration-none text-xs font-medium uppercase leading-none text-white"
		>
			{children}
		</Link>
	);
}

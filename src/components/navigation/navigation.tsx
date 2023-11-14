import Link from 'next/link';
import { IconLogo } from '~/components/icons/IconLogo';
import { MobileNavigation } from '~/components/navigation/mobile-navigation';
import { NavigationLink, ScheduleButtonLink } from '~/components/navigation/navigation-ui';
import { PATHS } from '~/constants/paths.constants';

export function Navigation() {
	return (
		<>
			<DesktopNavigation />
			<MobileNavigation />
		</>
	);
}

function DesktopNavigation() {
	return (
		<header className="fixed top-2 z-30 hidden h-nav-height w-full px-2 inset-x-center md:block">
			<nav className="glass-md/1 relative mx-auto flex h-full w-full max-w-[922px] items-center overflow-clip rounded-full border border-solid border-brand-copper">
				<ul className="relative z-30 flex w-full items-center justify-between px-2 py-1 pl-[calc(theme(spacing.1)_*_2)] stack-x-2">
					<li>
						<Link href={PATHS.home} className="absolute left-2 inset-y-center">
							<IconLogo className="h-[25px] w-auto md:h-[30px]" />
							<span className="sr-only">Home</span>
						</Link>
					</li>
					<li className="block">
						<NavigationLinkList />
					</li>
					<li className="flex">
						<ScheduleButtonLink />
					</li>
				</ul>
				<div className="absolute inset-0 bg-brand-black/50"></div>
				<div className="glass-edge-xl absolute inset-0"></div>
			</nav>
		</header>
	);
}

function NavigationLinkList() {
	return (
		<ul className="items-center justify-center md:stack-x-2">
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

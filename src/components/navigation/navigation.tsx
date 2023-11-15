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
			<nav className="relative mx-auto grid h-full w-full max-w-[922px] place-items-center">
				<div className="absolute z-10 h-full w-full rounded-full border border-solid border-brand-copper bg-brand-black/70 backdrop-blur-sm backdrop-saturate-150" />
				<ul className="relative z-20 flex w-full items-center justify-between px-2 py-1 pl-[calc(theme(spacing.1)_*_2)] stack-x-2">
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

'use client';

import { FocusScope } from '@react-aria/focus';
import { usePreventScroll } from '@react-aria/overlays';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconCalendar } from '~/components/icons/IconCalendar';
import { IconLogo } from '~/components/icons/IconLogo';
import { NavigationLink } from '~/components/navigation/navigation-ui';
import { ButtonLink } from '~/components/ui/button';
import { PATHS } from '~/constants/paths.constants';

export function MobileNavigation() {
	return (
		<NavigationDrawerProvider>
			<header className="fixed top-2 z-30 block h-nav-height w-full px-2 inset-x-center md:hidden">
				<div className="relative mx-auto grid h-full w-full max-w-[922px] place-items-center">
					<div className="absolute z-10 h-full w-full rounded-full border border-solid border-brand-copper bg-brand-black/70 backdrop-blur-sm backdrop-saturate-150" />
					<div className="relative z-20 flex w-full items-center gap-1 px-1 py-1">
						<div className="flex-1">
							<Link href={PATHS.home} className="absolute left-2 inset-y-center">
								<IconLogo className="h-[25px] w-auto" />
								<span className="sr-only">Home</span>
							</Link>
						</div>
						<ButtonLink
							stripped
							className="pr-1 leading-none"
							icon={<IconCalendar />}
							href={PATHS.schedule}
						>
							Scheduling
						</ButtonLink>
						<MobileNavigationTrigger />
					</div>
				</div>
			</header>
			<MobileNavigationDrawer />
		</NavigationDrawerProvider>
	);
}

function MobileNavigationTrigger() {
	const { isOpen, setTrigger, actions } = useDrawerState();

	return (
		<button
			aria-label="Open Menu"
			aria-controls="mobile-navigation-menu"
			aria-expanded={isOpen}
			onClick={() => {
				actions.open();
			}}
			ref={setTrigger}
			className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid border-brand-copper bg-white"
		>
			<span aria-hidden className="grid place-items-center">
				<span className="h-2 justify-center stack-y-[calc(theme(spacing.1)_/_2)]">
					<span className="block h-[1px] w-[13px] bg-brand-black"></span>
					<span className="block h-[1px] w-[13px] bg-brand-black"></span>
					<span className="block h-[1px] w-[13px] bg-brand-black"></span>
				</span>
			</span>
		</button>
	);
}

function MobileNavigationDrawer() {
	const { isOpen, actions } = useDrawerState();
	const pathname = usePathname();

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		switch (event.key) {
			case 'Escape': {
				actions.close();
			}
			default:
				break;
		}
	}

	usePreventScroll({
		isDisabled: !isOpen,
	});

	React.useEffect(() => {
		// Close the drawer when the route changes
		actions.close();
	}, [pathname, actions]);

	const handleLinkClick = React.useCallback(
		(href: string) => {
			// Close the drawer when a user clicks a link and the link is for the current page
			if (href === pathname) {
				actions.close();
			}
		},
		[actions, pathname],
	);

	return (
		<nav
			className={twMerge(
				isOpen ? 'block' : 'hidden',
				'fixed inset-0 z-40 h-[100dvh] w-screen overflow-y-auto bg-brand-black',
			)}
			id="mobile-navigation-menu"
			aria-hidden={!isOpen}
			aria-label="Mobile Navigation Menu"
			onKeyDown={handleKeyDown}
		>
			<FocusScope restoreFocus contain={isOpen}>
				<div className="relative z-20 flex h-full flex-col justify-between px-2 pb-5 pt-3">
					<header className="relative flex justify-end p-1">
						<Link href={PATHS.home} className="absolute left-1 inset-y-center">
							<IconLogo className="h-[25px] w-auto" />
							<span className="sr-only">Home</span>
						</Link>
						<button
							aria-label="Close Menu"
							onClick={() => {
								actions.close();
							}}
							className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid border-brand-copper bg-white"
						>
							<span aria-hidden className="grid h-full place-items-center">
								<span className="flex h-2 flex-col items-center justify-center">
									<span className="absolute h-[1px] w-[13px] rotate-45 bg-brand-black"></span>
									<span className="absolute h-[1px] w-[13px] -rotate-45 bg-brand-black"></span>
								</span>
							</span>
						</button>
					</header>
					<ul>
						<li className="border-b border-solid border-brand-copper/25 first:border-t">
							<NavigationLink href="/about" onLinkClick={handleLinkClick} className="block py-3">
								About
							</NavigationLink>
						</li>
						<li className="border-b border-solid border-brand-copper/25 first:border-t">
							<NavigationLink href="/team" onLinkClick={handleLinkClick} className="block py-3">
								Team
							</NavigationLink>
						</li>
						<li className="border-b border-solid border-brand-copper/25 first:border-t">
							<NavigationLink
								href="/resources"
								onLinkClick={handleLinkClick}
								className="block py-3"
							>
								Resources
							</NavigationLink>
						</li>
					</ul>
					<div className="flex justify-center">
						<ButtonLink
							icon={<IconCalendar className="h-[15px] w-[15px]" />}
							href={PATHS.schedule}
							className="block"
							onClick={() => {
								handleLinkClick(PATHS.schedule);
							}}
						>
							Scheduling
						</ButtonLink>
					</div>
				</div>

				<div
					className={twMerge(
						'pointer-events-none absolute inset-0 isolate z-10 h-[100dvh] w-full overflow-clip',
					)}
				>
					<div
						aria-hidden
						className="pointer-events-none absolute left-0 top-1/2 z-10 aspect-square w-[50%] -translate-y-1/2 rounded-full bg-brand-blue opacity-10 blur-[70px]"
					/>
					<div
						aria-hidden
						className="pointer-events-none absolute right-0 top-0 z-10 aspect-square w-[50%] -translate-y-[33%] translate-x-1/2 rounded-full bg-brand-red opacity-20 blur-[70px]"
					/>
				</div>
			</FocusScope>
		</nav>
	);
}

interface TNavigationDrawerContext {
	isOpen: boolean;
	setTrigger: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
	actions: {
		open(): void;
		close(): void;
	};
}
const NavigationDrawerContext = React.createContext<TNavigationDrawerContext | null>(null);

interface NavigationDrawerProviderProps {
	children: React.ReactNode;
}
function NavigationDrawerProvider({ children }: NavigationDrawerProviderProps) {
	const [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);

	const actions = React.useMemo(() => {
		return {
			open() {
				setIsOpen(true);
			},
			close() {
				setIsOpen(false);

				// Putting this in the setTimeout in order to give `FocusScope` time to clear out its state
				setTimeout(() => {
					trigger?.focus();
				}, 10);
			},
		};
	}, [trigger]);

	return (
		<NavigationDrawerContext.Provider
			value={{
				isOpen,
				setTrigger,
				actions,
			}}
		>
			{children}
		</NavigationDrawerContext.Provider>
	);
}

function useDrawerState() {
	const context = React.useContext(NavigationDrawerContext);
	if (!context) {
		throw new Error('useDrawerState must be used within a NavigationDrawerProvider');
	}

	return context;
}

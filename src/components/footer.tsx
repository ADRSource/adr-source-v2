import Link from 'next/link';
import { PATHS } from '~/constants/paths.constants';
import { IconLogo } from './icons/IconLogo';
import { ButtonLink } from './ui/button';
import { heading } from './ui/text';

export function Footer() {
	return (
		<footer className="z-20 w-full px-1 md:p-2">
			<div className="rounded-lg bg-brand-copper pb-4 pt-5 text-brand-black md:pt-6">
				<CallToAction />
				<div className="justify-between px-2 pt-5 stack-y-3 md:px-4 md:pt-6 md:stack-x-3">
					<FooterListSection title="Navigate">
						<FooterList>
							<FooterListItem>
								<FooterInternalLink href={PATHS.team}>Team</FooterInternalLink>
							</FooterListItem>
							<FooterListItem>
								<FooterInternalLink href={PATHS.about}>About</FooterInternalLink>
							</FooterListItem>
							<FooterListItem>
								<FooterInternalLink href={PATHS.resources}>Resources</FooterInternalLink>
							</FooterListItem>
						</FooterList>
					</FooterListSection>
					<FooterListSection title="Contact">
						<FooterList>
							<FooterListItem>
								<p className="text-xs uppercase leading-none">M-F 9am - 5pm EST</p>
							</FooterListItem>
							<FooterListItem>
								<FooterExternalLink href="tel:888-741-2224">
									<span className="sr-only">Call</span>
									(888) 741-2224
								</FooterExternalLink>
							</FooterListItem>
							<FooterListItem>
								<FooterExternalLink href={PATHS.linkedin}>LinkedIn</FooterExternalLink>
							</FooterListItem>
						</FooterList>
					</FooterListSection>
					<FooterListSection title="Legal + Credit">
						<FooterList>
							<FooterListItem>
								<IconLogo className="h-[30px] w-auto" theme="monoDark" />
							</FooterListItem>
							<FooterListItem>
								<p className="text-xs uppercase leading-none">&copy;2023 ADRsource, LLC</p>
							</FooterListItem>
							<FooterListItem>
								<FooterExternalLink href={PATHS.hunter}>Code by Hunter</FooterExternalLink>
							</FooterListItem>
						</FooterList>
					</FooterListSection>
				</div>
			</div>
		</footer>
	);
}

function CallToAction() {
	return (
		<div className="grid grid-cols-1 grid-rows-1 place-items-center border-y border-brand-black">
			<div className="relative z-10 col-span-full row-span-full h-full w-full overflow-hidden">
				<p
					aria-hidden
					className="leading-0 invisible whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-[85%]"
				>
					When it counts
				</p>
				<p className="leading-0 absolute whitespace-nowrap text-center font-serif text-[max(128px,14.5vw)] leading-[85%] inset-center">
					When it counts
				</p>
			</div>
			<div className="relative z-20 col-span-full row-span-full">
				<ButtonLink href={PATHS.schedule} size="large" outline="black">
					Schedule
				</ButtonLink>
			</div>
		</div>
	);
}

interface FooterListSectionProps {
	children: React.ReactNode;
	title: string;
}
function FooterListSection({ children, title }: FooterListSectionProps) {
	return (
		<div className="stack-y-2 md:stack-y-3">
			<h2 className={heading({ type: '6', className: 'text-xl md:text-2xl' })}>{title}</h2>
			{children}
		</div>
	);
}

interface FooterListProps {
	children: React.ReactNode;
}
function FooterList({ children }: FooterListProps) {
	return <ul className="stack-y-2">{children}</ul>;
}

interface FooterListItemProps {
	children: React.ReactNode;
}
function FooterListItem({ children }: FooterListItemProps) {
	return <li className="flex">{children}</li>;
}

interface FooterInternalLinkProps {
	children: React.ReactNode;
	href: string;
}
function FooterInternalLink({ children, href }: FooterInternalLinkProps) {
	return (
		<Link
			href={href}
			className="decoration-none text-xs uppercase leading-none focus-visible:ring-brand-black focus-visible:ring-offset-brand-copper"
		>
			{children}
		</Link>
	);
}

interface FooterExternalLinkProps {
	children: React.ReactNode;
	href: string;
}
function FooterExternalLink({ children, href }: FooterExternalLinkProps) {
	return (
		<a
			href={href}
			className="decoration-none text-xs uppercase leading-none focus-visible:ring-brand-black focus-visible:ring-offset-brand-copper"
		>
			{children}
		</a>
	);
}

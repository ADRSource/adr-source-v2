import { RichText } from '@graphcms/rich-text-react-renderer';
import type { RichTextContent } from '@graphcms/rich-text-types';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { getMemberPageBySlug } from '~/api/member';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { CircleButton } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import {
	BaseMemberInfoFragment,
	MemberInfoCaseManagerFragment,
	MemberInfoNeutralFragment,
	MemberPageMember,
} from '~/graphql/generated/cms.generated';

export const revalidate = 300; // 5 minutes

export async function generateMetadata({
	params,
}: {
	params: { member: string };
}): Promise<Metadata> {
	try {
		const data = await getMemberPageBySlug(params.member);

		if (!data.memberPage) return {};

		const { seo } = data.memberPage;
		const { title, description, index } = seo;
		const shouldIndex = Boolean(index);

		return {
			title,
			description,
			robots: shouldIndex ? 'index, follow' : 'noindex, nofollow',
			openGraph: {
				title,
				description,
				type: 'website',
				locale: 'en_US',
				url: `${PATHS.absolute}${PATHS.team}/${params.member}`,
			},
		};
	} catch (_error) {
		console.error(`Error generating metadata for member page: ${params.member}`);

		return {};
	}
}

type Role = NonNullable<MemberPageMember['__typename']>;

const ROLE_NAME: Record<Role, string> = {
	Neutral: 'Neutral',
	CaseManager: 'Case Manager',
};

export default async function Member({ params }: { params: { member: string } }) {
	const data = await getMemberPageBySlug(params.member);

	if (!data.memberPage) {
		return notFound();
	}

	const { memberPage } = data;
	const { member } = memberPage;
	const { info } = member ?? {};

	if (!info) return null;

	const { name, headshot, bio } = info;

	return (
		<div className="isolate">
			<main className="min-h-screen">
				<div className="mx-auto w-full max-w-[1750px] pb-7">
					<header className="relative overflow-x-clip px-2 pt-6 stack-y-4">
						<h1
							className={heading({
								type: '3',
								className: 'text-center',
							})}
						>
							{name}
						</h1>
						<div className="hidden md:block">
							<CallToActionBar role={member?.__typename} info={info} />
						</div>
					</header>
					<section className="grid grid-cols-1 justify-items-center divide-brand-copper/40 border-b border-brand-copper/40 md:grid-cols-2 md:divide-x">
						<div className="px-2 py-6 stack-y-5 md:stack-y-4">
							<div className="relative aspect-[9/10] w-full max-w-[449px] overflow-clip rounded-lg">
								<Image
									priority
									alt={`${info.name} Headshot`}
									src={headshot.url}
									className="bg-brand-black grayscale"
									fill
									sizes="(max-width: 498px) 100vw, (max-width: 768px) 449px, (max-width: 1039px) 44vw, 449px"
									style={{ objectFit: 'cover', objectPosition: 'center top' }}
								/>
							</div>

							<div className="block md:hidden">
								<CallToActionBar role={member?.__typename} info={info} />
							</div>
							<div
								className={text({
									type: 'body',
									className: 'w-full max-w-[449px] px-2 stack-y-[1em] md:px-0',
								})}
							>
								<h2 className="block font-medium uppercase md:hidden">{name}&apos;s Bio</h2>
								<RichText content={bio.raw as RichTextContent} />
							</div>
						</div>
						<div className="w-full px-2 py-6">
							<div className="mx-auto max-w-[380px] stack-y-4">
								<div>
									<h2 className="sr-only">Basic Information</h2>
									{member?.__typename != null && <BasicInfoList member={member} />}
								</div>
								{member?.__typename === 'Neutral' && (
									<div className="stack-y-3">
										<h2 className={heading({ type: '6' })}>Areas of focus</h2>
										<ul className="grid grid-cols-2 gap-x-2 gap-y-1">
											{member.focusAreas.map((area) => {
												return (
													<li key={area}>
														<p className="text-sm">{area}</p>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</div>
						</div>
					</section>

					{/* SCHEDULE SECTION */}
					{member?.__typename === 'Neutral' && (
						<section
							id="schedule"
							className="scroll-mt-nav-height border-b border-solid border-brand-copper/40 py-6 "
						>
							<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-5 rounded-lg bg-brand-black/70 md:grid-cols-2">
								<div className="w-full max-w-[449px]  justify-self-center px-2 stack-y-4 md:py-6">
									<h2
										className={heading({
											type: '4',
											className: 'text-center text-7xl md:text-left',
										})}
									>
										Schedule
									</h2>
									<p className={text({ type: 'body', className: 'text-center md:text-left' })}>
										To schedule an appointment online, click on your preferred available date. Our
										staff will contact you once they receive your appointment request form.
									</p>
								</div>
								<div className="px-2 md:py-6">
									<div>
										<h3 className="sr-only">{member.info.name}&apos;s Calendar</h3>
										<div className="mx-auto w-full max-w-[449px] self-center overflow-y-auto rounded-lg border border-solid border-brand-copper bg-white/70 p-2 backdrop-blur-sm backdrop-saturate-150">
											<div className="mx-auto w-full rounded-lg bg-white p-1">
												<iframe
													width="310"
													height="400"
													className="mx-auto overflow-clip"
													src={`https://nadn.org/smallcalendar/${member.nadnId}`}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					)}
				</div>
			</main>
		</div>
	);
}

interface BasicInfoListProps {
	member: MemberInfoNeutralFragment | MemberInfoCaseManagerFragment;
}
function BasicInfoList({ member }: BasicInfoListProps) {
	switch (member.__typename) {
		case 'Neutral': {
			const yearsOfExperience =
				new Date().getFullYear() - new Date(member.experienceStartDate as string).getFullYear();
			const caseManager = member.caseManager;

			return (
				<ul className="stack-y-1">
					<ListItem>Role: {ROLE_NAME[member.__typename]}</ListItem>
					<ListItem>Years of experience: {yearsOfExperience}</ListItem>
					<ListItem>Area of operation: Statewide</ListItem>
					{caseManager != null && (
						<ListItem className="linkBox relative flex justify-between">
							<p>Case manager: {caseManager.info.name}</p>
							<CircleButton
								aria-label={`Visit ${caseManager.info.name}'s page`}
								className="linkOverlay"
								href={`${PATHS.team}/${caseManager.memberPage?.slug ?? ''}`}
							>
								<IconArrowTopRight aria-hidden />
							</CircleButton>
						</ListItem>
					)}
				</ul>
			);
		}
		case 'CaseManager': {
			const { neutrals } = member;
			return (
				<ul className="stack-y-4">
					<ListItem>Role: {ROLE_NAME[member.__typename]}</ListItem>
					<li className="stack-y-3">
						<h3 className={heading({ type: '6' })}>Managed Neutrals</h3>
						<ul className="stack-y-1">
							{neutrals.map((neutral) => {
								const { memberPage } = neutral;
								const { slug } = memberPage ?? {};
								const { name } = neutral.info;

								return (
									<ListItem key={neutral.id} className="linkBox relative flex justify-between">
										<p>{name}</p>

										<CircleButton
											aria-label={`Visit ${name}'s page`}
											className="linkOverlay"
											href={`${PATHS.team}/${slug ?? ''}`}
										>
											<IconArrowTopRight aria-hidden />
										</CircleButton>
									</ListItem>
								);
							})}
						</ul>
					</li>
				</ul>
			);
		}
		default: {
			return null;
		}
	}
}

interface ListItemProps {
	children: React.ReactNode;
	className?: string;
}
const ListItem = ({ children, className }: ListItemProps) => {
	return (
		<li
			className={twMerge(
				'rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-base font-bold text-brand-copper',
				className,
			)}
		>
			{children}
		</li>
	);
};

function CallToActionBar({ role, info }: { role?: Role; info: BaseMemberInfoFragment }) {
	const { email, phone, linkedIn } = info;

	return (
		<nav className="divide-y divide-brand-copper border-y border-solid border-brand-copper md:justify-between md:divide-y-0 md:py-2 md:stack-x-2">
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href={`mailto:${email}`}
			>
				{email}
			</Link>
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href={`tel:${phone}`}
			>
				{phone}
			</Link>
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href={linkedIn}
			>
				LinkedIn
			</Link>
			{(() => {
				switch (role) {
					case 'Neutral': {
						return (
							<Link
								className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
								href={{
									hash: '#schedule',
								}}
							>
								Scheduling
							</Link>
						);
					}
					case 'CaseManager': {
						return (
							<Link
								className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
								href={PATHS.schedule}
							>
								Scheduling
							</Link>
						);
					}
					default: {
						return null;
					}
				}
			})()}
		</nav>
	);
}

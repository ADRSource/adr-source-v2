import { RichText } from '@graphcms/rich-text-react-renderer';
import type { RichTextContent } from '@graphcms/rich-text-types';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
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
import { getMetadataFromSeo } from '~/utils/seo';

export async function generateMetadata({
	params,
}: {
	params: { member: string };
}): Promise<Metadata> {
	const preview = draftMode().isEnabled;
	try {
		const data = await getMemberPageBySlug(params.member, preview);

		if (!data.memberPage) return {};

		const { seo } = data.memberPage;
		return getMetadataFromSeo(`${PATHS.absolute}${PATHS.team}/${params.member}`, seo);
	} catch (_error) {
		console.error(`Error generating metadata for member page: ${params.member}`);

		return {};
	}
}

type Role = NonNullable<MemberPageMember['__typename']>;

export default async function Member({ params }: { params: { member: string } }) {
	const preview = draftMode().isEnabled;
	const data = await getMemberPageBySlug(params.member, preview);

	if (!data.memberPage) {
		return notFound();
	}

	const { memberPage } = data;
	const { member } = memberPage;
	const { info } = member ?? {};

	if (!info) return null;

	const { name, postNominalTitles, headshot, bio } = info;

	return (
		<div className="isolate">
			<main className="min-h-screen">
				<div className="mx-auto w-full max-w-[1750px] pb-7">
					<header className="relative overflow-x-clip px-2 pt-6 stack-y-4">
						<h1
							className={heading({
								type: '3',
								className:
									'mb-6 flex-wrap items-baseline justify-center text-balance text-center stack-x-2/inline md:mb-0',
							})}
						>
							<span>{name}</span>
							{postNominalTitles != null && (
								<span className="text-heading-5 text-brand-toffee">{postNominalTitles}</span>
							)}
						</h1>
						<div className="hidden md:block">
							<CallToActionBar role={member?.__typename} info={info} />
						</div>
					</header>
					<section className="grid grid-cols-1 justify-items-center gap-y-4 divide-brand-copper/40 border-b border-brand-copper/40 md:grid-cols-2 md:divide-x">
						<div className="px-2 stack-y-5 md:py-6 md:stack-y-4">
							<div className="relative aspect-[9/10] w-full max-w-[449px] overflow-clip rounded-lg">
								<Image
									priority
									alt={`${info.name} Headshot`}
									src={headshot.url}
									className="bg-brand-black contrast-125 grayscale"
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
						<div className="w-full px-2 pb-6 md:py-6">
							<div className="mx-auto max-w-[449px] stack-y-4">
								{member?.__typename != null && <MemberInfo name={name} member={member} />}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

function MemberInfo({
	member,
	name,
}: {
	member: MemberInfoCaseManagerFragment | MemberInfoNeutralFragment;
	name: string;
}) {
	switch (member.__typename) {
		case 'Neutral': {
			return <NeutralInfo name={name} member={member} />;
		}
		case 'CaseManager': {
			return <CaseManagerInfo member={member} />;
		}
		default: {
			return null;
		}
	}
}

function NeutralInfo({ member, name }: { member: MemberInfoNeutralFragment; name: string }) {
	const { nadnId, focusAreas, caseManager } = member;

	return (
		<>
			{/* SCHEDULE */}
			<div className="stack-y-3">
				<h2
					id="schedule"
					className={heading({
						type: '6',
						className: 'scroll-mt-[calc(var(--nav-height)_+_(theme(spacing.2)_*_2))] text-balance',
					})}
				>
					Schedule with {name}
				</h2>
				<div className="stack-y-3">
					<p className={text({ type: 'body', className: 'px-2 text-left md:px-0' })}>
						To schedule an appointment online, click on your preferred available date. Our staff
						will contact you once they receive your appointment request form.
					</p>
					<div className="mx-auto w-full max-w-[449px] self-center overflow-y-auto rounded-lg border border-solid border-brand-copper bg-white/70 backdrop-blur-sm backdrop-saturate-150 md:p-2">
						<div className="mx-auto w-full rounded-lg bg-white p-1">
							<iframe
								width="310"
								height="400"
								className="mx-auto overflow-clip"
								src={`https://nadn.org/smallcalendar/${nadnId}`}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* CASE MANAGER */}
			{caseManager != null && (
				<div className="stack-y-2">
					<h2 className={heading({ type: '6' })}>Case Manager</h2>
					<div className="linkBox relative flex justify-between rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-lg font-bold text-brand-copper">
						<p>{caseManager.info.name}</p>
						<CircleButton
							aria-label={`Visit ${caseManager.info.name}'s page`}
							className="linkOverlay"
							href={`${PATHS.team}/${caseManager.memberPage?.slug ?? ''}`}
						>
							<IconArrowTopRight aria-hidden />
						</CircleButton>
					</div>
				</div>
			)}

			{/* AREA OF FOCUS */}
			<div className="stack-y-3">
				<h2 className={heading({ type: '6' })}>Areas of focus</h2>
				<ul className="grid grid-cols-2 gap-x-2 gap-y-1">
					{focusAreas.map((area) => {
						// We use a magic character (~) to denote a list item that should be styled differently. The character is removed before rendering.
						// * This is to fill the request from the client to have a list item that is bolded and uppercase.
						// * A better and more declarative solution would be to use an object or rich text to denote the styling.
						const MAGIC_CHAR = '~';
						if (area.startsWith(MAGIC_CHAR)) {
							return (
								<li key={area}>
									<p className="text-sm font-bold uppercase">{area.slice(1)}</p>
								</li>
							);
						}

						return (
							<li key={area}>
								<p className="text-sm">{area}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}

function CaseManagerInfo({ member }: { member: MemberInfoCaseManagerFragment }) {
	const { neutrals } = member;
	return (
		<div className="stack-y-3">
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
		</div>
	);
}

interface ListItemProps {
	children: React.ReactNode;
	className?: string;
}
const ListItem = ({ children, className }: ListItemProps) => {
	return (
		<li
			className={twMerge(
				'rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-lg font-bold text-brand-copper',
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

import { Metadata } from 'next';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { getTeamPage } from '~/api/team';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { MemberListItem } from '~/components/member-list-item/member-list-item';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

export const revalidate = 300; // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
	try {
		const data = await getTeamPage();
		const { seo } = data.teamPage ?? {};

		const title = seo?.title ?? '';
		const description = seo?.description ?? '';
		const index = Boolean(seo?.index);

		return {
			title,
			description,
			robots: index ? 'index, follow' : 'noindex, nofollow',
			openGraph: {
				title,
				description,
				type: 'website',
				locale: 'en_US',
				url: `${PATHS.absolute}${PATHS.team}`,
			},
		};
	} catch (_error) {
		console.error('Error generating metadata for about page');

		return {};
	}
}

export default async function Team() {
	const [neutralsResult, caseManagersResult] = await Promise.all([
		getNeutralsList(),
		getCaseManagersList(),
	]);
	const { neutralList } = neutralsResult;
	const { caseManagerList } = caseManagersResult;

	return (
		<div className="isolate">
			<main className="relative z-20 min-h-screen">
				<div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-4">
					<h1
						className={heading({
							type: '3',
							className: 'text-center',
						})}
					>
						Team
					</h1>

					<div className="mx-auto w-full max-w-[1058px] stack-y-6">
						<div className="stack-y-3">
							<h2 className={heading({ type: '6' })}>Neutrals</h2>
							<ul>
								{neutralList?.neutrals.map((neutral) => {
									const member = extractMemberFromNeutral(neutral);

									if (!member) return null;

									return <MemberListItem key={neutral.id} member={member} />;
								})}
							</ul>
						</div>
						<div className="stack-y-3">
							<h2 className={heading({ type: '6' })}>Case Managers</h2>
							<ul className="relative">
								{caseManagerList?.caseManagers.map((caseManager) => {
									const { memberPage } = caseManager;
									const { slug } = memberPage ?? {};

									if (!memberPage) return null;

									const m = {
										url: slug ?? '',
										name: caseManager.info.name,
										headshot: caseManager.info.headshot.url,
									};

									return <MemberListItem hasSchedule={false} key={caseManager.id} member={m} />;
								})}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

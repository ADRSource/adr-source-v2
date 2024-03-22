import { getServerSideSitemap } from 'next-sitemap';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { PATHS } from '~/constants/paths.constants';

export async function GET() {
	// Method to source urls from cms
	const [neutralsListData, caseManagersListData] = await Promise.all([
		getNeutralsList(),
		getCaseManagersList(),
	]);
	const { neutralList } = neutralsListData;
	const { neutrals } = neutralList ?? {};
	const { caseManagerList } = caseManagersListData;
	const { caseManagers } = caseManagerList ?? {};

	return getServerSideSitemap(
		[...(neutrals ?? []), ...(caseManagers ?? [])].map((member) => {
			const { memberPage } = member;
			return {
				loc: `${PATHS.absolute}${PATHS.team}/${memberPage?.slug ?? ''}`,
				changefreq: 'daily',
				priority: 0.7,
				lastmod: new Date().toISOString(),
			};
		}),
	);
}

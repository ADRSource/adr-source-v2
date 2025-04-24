import { getServerSideSitemap } from 'next-sitemap';
import { draftMode } from 'next/headers';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { PATHS } from '~/constants/paths.constants';

export async function GET() {
  const preview = (await draftMode()).isEnabled;
  // Method to source urls from cms
  const [neutralsListData, caseManagersListData] = await Promise.all([
    getNeutralsList(preview),
    getCaseManagersList(preview),
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

import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { getTeamPage } from '~/api/team';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { MemberCardItem } from '~/components/member-card-item';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { PageHeader } from '~/components/ui/page-header';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;
  try {
    const data = await getTeamPage(preview);
    const { seo } = data.teamPage ?? {};
    return getMetadataFromSeo(`${PATHS.absolute}${PATHS.team}`, seo);
  } catch (_error) {
    console.error('Error generating metadata for about page');

    return {};
  }
}

export default async function Team() {
  const preview = (await draftMode()).isEnabled;
  const [neutralsResult, caseManagersResult] = await Promise.all([
    getNeutralsList(preview),
    getCaseManagersList(preview),
  ]);
  const { neutralList } = neutralsResult;
  const { caseManagerList } = caseManagersResult;

  return (
    <div className="isolate">
      <main className="relative z-20 min-h-screen">
        <div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-4">
          <PageHeader className="text-center">Team</PageHeader>

          <div className="mx-auto w-full max-w-block stack-y-6">
            <div className="stack-y-3">
              <h2 className={heading({ type: '6' })}>Neutrals</h2>
              <AutoGrid
                count={4}
                itemMinWidth={280}
                gapX="24px"
                gapY="64px"
                className="relative px-3"
                stagger
              >
                {neutralList?.neutrals.map((neutral) => {
                  const member = extractMemberFromNeutral(neutral);

                  if (!member) return null;

                  return <MemberCardItem key={neutral.id} {...member} />;
                })}
              </AutoGrid>
            </div>
            <div className="stack-y-3">
              <h2 className={heading({ type: '6' })}>Case Managers</h2>
              <AutoGrid
                count={4}
                itemMinWidth={250}
                gapX="24px"
                gapY="64px"
                className="relative px-3"
                stagger
              >
                {caseManagerList?.caseManagers.map((caseManager) => {
                  const { memberPage } = caseManager;
                  const { slug } = memberPage ?? {};

                  if (!memberPage) return null;

                  const member = {
                    url: slug ?? '',
                    name: caseManager.info.name,
                    headshot: caseManager.info.headshot.url,
                    role: caseManager.roleDescription,
                  };

                  return <MemberCardItem key={caseManager.id} {...member} />;
                })}
              </AutoGrid>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { z } from 'zod';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { getTeamPage } from '~/api/team';
import { SearchInput } from '~/app/_components/search-input';
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
    console.error('Error generating metadata for team page');

    return {};
  }
}

const TeamSearchParamSchema = z.object({
  term: z.string().optional().catch(''),
});

export default async function Team(props: PageProps<'/team'>) {
  const searchParams = await props.searchParams;
  const { term } = TeamSearchParamSchema.parse(searchParams);
  const preview = (await draftMode()).isEnabled;
  const [neutralsResult, caseManagersResult] = await Promise.all([
    getNeutralsList(preview, term),
    getCaseManagersList(preview, term),
  ]);
  const { neutralList } = neutralsResult;
  const { caseManagerList } = caseManagersResult;
  const noResults =
    neutralList?.neutrals.length === 0 && caseManagerList?.caseManagers.length === 0;

  return (
    <div className="isolate">
      <main className="relative z-20 min-h-screen">
        <div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-4">
          <PageHeader className="text-center">Team</PageHeader>

          <div className="mx-auto w-full max-w-block stack-y-6">
            <SearchInput />
            {noResults && term != null ? (
              <div className="w-full">
                <p className={heading({ type: '6', className: 'text-center' })}>
                  No Results for &quot;{term}&quot;
                </p>
              </div>
            ) : null}
            {neutralList?.neutrals != null && neutralList.neutrals.length > 0 && (
              <div className="px-3 stack-y-4">
                <h2 className={heading({ type: '5', className: 'normal-case tracking-tight' })}>
                  Neutrals
                </h2>
                <AutoGrid
                  count={4}
                  itemMinWidth={280}
                  gapX="24px"
                  gapY="64px"
                  className="relative"
                  stagger={term == null}
                  key={term}
                >
                  {neutralList.neutrals.map((neutral) => {
                    const member = extractMemberFromNeutral(neutral);

                    if (!member) return null;

                    return <MemberCardItem key={neutral.id} {...member} />;
                  })}
                </AutoGrid>
              </div>
            )}

            {caseManagerList?.caseManagers != null && caseManagerList.caseManagers.length > 0 && (
              <div className="px-3 stack-y-4">
                <h2 className={heading({ type: '5', className: 'normal-case tracking-tight' })}>
                  Case Managers
                </h2>
                <AutoGrid
                  count={4}
                  itemMinWidth={250}
                  gapX="24px"
                  gapY="64px"
                  className="relative"
                  stagger={term == null}
                  key={term}
                >
                  {caseManagerList.caseManagers.map((caseManager) => {
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

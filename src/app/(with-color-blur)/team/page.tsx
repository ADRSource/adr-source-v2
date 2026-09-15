import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { getTeamPage } from '~/api/team';
import { SearchInput } from '~/app/_components/search-input';
import {
  TeamSearchParamSchema,
  memberMatchesFilters,
  uniqueFocusAreas,
} from '~/app/_components/team-search';
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

export default async function Team(props: PageProps<'/team'>) {
  const searchParams = await props.searchParams;
  const { term, role, focus } = TeamSearchParamSchema.parse(searchParams);
  const preview = (await draftMode()).isEnabled;
  const [neutralsResult, caseManagersResult, allNeutralsResult] = await Promise.all([
    getNeutralsList(preview, term),
    getCaseManagersList(preview, term),
    // Always the cached unfiltered list so the Areas of Focus options stay
    // complete even when a name search has already narrowed the results.
    getNeutralsList(preview),
  ]);
  const neutrals =
    neutralsResult.neutralList?.neutrals.filter((neutral) =>
      memberMatchesFilters(neutral, { role, focus }),
    ) ?? [];
  const caseManagers =
    caseManagersResult.caseManagerList?.caseManagers.filter((caseManager) =>
      memberMatchesFilters(caseManager, { role, focus }),
    ) ?? [];
  const focusAreas = uniqueFocusAreas(allNeutralsResult.neutralList?.neutrals ?? []);
  const noResults = neutrals.length === 0 && caseManagers.length === 0;
  const hasQuery = term != null || role != null || focus != null;
  const resultsKey = `${term ?? ''}:${role ?? ''}:${focus ?? ''}`;

  return (
    <div className="isolate">
      <main className="relative z-20 min-h-screen">
        <div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-4">
          <PageHeader className="text-center">Team</PageHeader>

          <div className="mx-auto w-full max-w-block scroll-mt-[var(--nav-spacing)] stack-y-6">
            <SearchInput focusAreas={focusAreas} />
            {noResults && hasQuery ? (
              <div className="w-full" role="status" aria-live="polite">
                <p className={heading({ type: '6', className: 'text-center' })}>
                  {term != null ? `No Results for "${term}"` : 'No Results'}
                </p>
              </div>
            ) : null}
            {neutrals.length > 0 && (
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
                  stagger={!hasQuery}
                  key={resultsKey}
                >
                  {neutrals.map((neutral) => {
                    const member = extractMemberFromNeutral(neutral);

                    if (!member) return null;

                    return <MemberCardItem key={neutral.id} {...member} />;
                  })}
                </AutoGrid>
              </div>
            )}

            {caseManagers.length > 0 && (
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
                  stagger={!hasQuery}
                  key={resultsKey}
                >
                  {caseManagers.map((caseManager) => {
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

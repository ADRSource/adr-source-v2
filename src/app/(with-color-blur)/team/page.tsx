import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { getTeamPage } from '~/api/team';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
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
          <h1
            className={heading({
              type: '3',
              className: 'text-center',
            })}
          >
            Team
          </h1>

          <div className="mx-auto w-full max-w-block stack-y-6">
            <div className="stack-y-3">
              <h2 className={heading({ type: '6' })}>Neutrals</h2>
              <ul className="relative grid grid-cols-1 gap-x-2 gap-y-4 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {neutralList?.neutrals.map((neutral) => {
                  const member = extractMemberFromNeutral(neutral);

                  if (!member) return null;

                  return <MemberCardItem key={neutral.id} {...member} />;
                })}
              </ul>
            </div>
            <div className="stack-y-3">
              <h2 className={heading({ type: '6' })}>Case Managers</h2>
              <ul className="relative grid grid-cols-1 gap-x-2 gap-y-4 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MemberCardItem({
  name,
  url,
  headshot,
  role,
}: {
  name: string;
  url: string;
  headshot: string;
  role: string;
}) {
  return (
    <div className="group/card linkBox flex flex-col gap-y-[calc(theme(spacing.1)*2)]">
      <div className="relative aspect-[4/5] w-full overflow-clip rounded-lg">
        <Image
          src={headshot}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={`${name} headshot`}
          className="scale-100 bg-brand-black object-cover object-top contrast-125 grayscale transition-all group-hover/card:scale-105 group-hover/card:filter-none"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <Link
            href={`${PATHS.team}/${url}`}
            className="linkOverlay inline-block scroll-auto font-sans text-base/tight underline decoration-transparent transition-all hover:decoration-current"
          >
            {name}
          </Link>
        </div>
        <p className="text-base/tight text-brand-toffee">{role}</p>
      </div>
    </div>
  );
}

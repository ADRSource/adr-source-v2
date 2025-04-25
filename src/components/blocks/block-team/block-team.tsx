import { draftMode } from 'next/headers';
import { getCaseManagersList, getNeutralsList } from '~/api/member';
import { Container } from '~/components/container';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { MemberListItem } from '~/components/member-list-item/member-list-item';
import { heading } from '~/components/ui/text';

export async function BlockTeam() {
  const preview = (await draftMode()).isEnabled;
  const [neutralsResult, caseManagersResult] = await Promise.all([
    getNeutralsList(preview),
    getCaseManagersList(preview),
  ]);
  const { neutralList } = neutralsResult;
  const { caseManagerList } = caseManagersResult;

  return (
    <Container>
      <div className="relative overflow-x-clip py-6 stack-y-4">
        <h2
          className={heading({
            type: '3',
            className: 'text-center',
          })}
        >
          Team
        </h2>
        <div className="mx-auto w-full max-w-[1058px] stack-y-6">
          <div className="stack-y-4">
            <h3 className={heading({ type: '6' })}>Neutrals</h3>
            <ul className="relative">
              {neutralList?.neutrals.map((neutral) => {
                const member = extractMemberFromNeutral(neutral);

                if (!member) return null;

                return <MemberListItem key={neutral.id} member={member} />;
              })}
            </ul>
          </div>
          <div className="stack-y-4">
            <h3 className={heading({ type: '6' })}>Case Managers</h3>
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
    </Container>
  );
}

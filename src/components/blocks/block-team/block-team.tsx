import { draftMode } from 'next/headers';
import { getNeutralsList } from '~/api/member';
import { AnimatedSection } from '~/components/blocks/animated-section';
import { TeamCarousel } from '~/components/blocks/block-team/team-carousel';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { ButtonLink } from '~/components/ui/button';
import { heading } from '~/components/ui/text';

export async function BlockTeam() {
  const preview = (await draftMode()).isEnabled;
  const result = await getNeutralsList(preview);
  const { neutralList } = result;

  const members =
    neutralList?.neutrals
      .map((neutral) => {
        const member = extractMemberFromNeutral(neutral);
        if (!member) return null;
        return { id: neutral.id, ...member };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null) ?? [];

  return (
    <AnimatedSection>
      <div className="relative py-6 stack-y-4">
        <div className="stack-y-2">
          <span className="text-balance px-2 text-center text-sm/snug font-medium uppercase tracking-wider text-brand-toffee lg:text-base/snug">
            Mediators
            <span className="break-words">&nbsp;&middot;&nbsp;Arbitrators</span>
            <span className="whitespace-nowrap">&nbsp;&middot;&nbsp;Special Magistrates</span>
          </span>
          <h2
            className={heading({
              type: '3',
              className: 'text-center',
            })}
          >
            Our Team
          </h2>
        </div>
        <div>
          <TeamCarousel members={members} />
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/team">
            <span className="sr-only">Visit Team Page</span>
            <span aria-hidden>View Full Team</span>
          </ButtonLink>
        </div>
      </div>
    </AnimatedSection>
  );
}

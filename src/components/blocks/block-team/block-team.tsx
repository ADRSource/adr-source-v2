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

  const services = ['Mediators', 'Arbitrators', 'Special Magistrates'];

  return (
    <AnimatedSection>
      <div className="relative py-6 stack-y-4">
        <div className="stack-y-2">
          <ul className="gap-y-0.5 flex flex-col items-center justify-center px-2 text-center text-sm/snug font-medium uppercase tracking-wider text-brand-toffee sm:flex-row lg:text-base/snug">
            {services.map((service) => (
              <li
                key={service}
                className="flex items-center whitespace-nowrap before:hidden before:w-[2ch] before:content-['·'] first-of-type:before:hidden sm:before:block"
              >
                {service}
              </li>
            ))}
          </ul>
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

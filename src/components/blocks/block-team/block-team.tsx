import { draftMode } from 'next/headers';
import { getRecentNeutralsList } from '~/api/member';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { AnimatedSection } from '~/components/blocks/animated-section';
import { Container } from '~/components/container';
import { MemberCardItem } from '~/components/member-card-item';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { ButtonLink } from '~/components/ui/button';
import { createFluidValue } from '~/utils/create-fluid-value';

export async function BlockTeam() {
  const preview = (await draftMode()).isEnabled;
  const result = await getRecentNeutralsList(preview);
  const { neutralList } = result;

  return (
    <Container>
      <AnimatedSection>
        <div className="relative overflow-x-clip py-6 stack-y-4">
          <h2
            className="text-center font-serif text-8xl leading-none"
            style={{
              fontSize: createFluidValue(40, 96, 390, 1920),
            }}
          >
            Our Newest Neutrals
          </h2>
          <div>
            <AutoGrid
              count={3}
              itemMinWidth={280}
              gapX="16px"
              gapY="16px"
              className="relative mx-auto max-w-[1058px] px-3"
              stagger
            >
              {neutralList?.neutrals.map((neutral) => {
                const member = extractMemberFromNeutral(neutral);

                if (!member) return null;

                return <MemberCardItem key={neutral.id} {...member} />;
              })}
            </AutoGrid>
          </div>
          <div className="flex justify-center">
            <ButtonLink href="/team">
              <span className="sr-only">Visit Team Page</span>
              <span aria-hidden>View Full Team</span>
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </Container>
  );
}

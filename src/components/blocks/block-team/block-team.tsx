import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getRecentNeutralsList } from '~/api/member';
import { Container } from '~/components/container';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { ButtonLink } from '~/components/ui/button';
import { PATHS } from '~/constants/paths.constants';
import { createFluidValue } from '~/utils/create-fluid-value';

export async function BlockTeam() {
  const preview = (await draftMode()).isEnabled;
  const result = await getRecentNeutralsList(preview);
  const { neutralList } = result;

  return (
    <Container>
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
          <ul className="relative mx-auto grid max-w-[1058px] grid-cols-1 gap-x-2 gap-y-4 px-3 md:grid-cols-2 lg:grid-cols-3">
            {neutralList?.neutrals.map((neutral) => {
              const member = extractMemberFromNeutral(neutral);

              if (!member) return null;

              return (
                <li key={neutral.id}>
                  <div className="group/card linkBox flex flex-col gap-y-[calc(theme(spacing.1)*2)]">
                    <div className="relative aspect-[4/5] w-full overflow-clip rounded-lg">
                      <Image
                        src={member.headshot}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 353px"
                        alt={`${member.name} headshot`}
                        className="scale-100 bg-brand-black object-cover object-top contrast-125 grayscale transition-all group-hover/card:scale-105 group-hover/card:filter-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <Link
                          href={`${PATHS.team}/${member.url}`}
                          className="linkOverlay inline-block scroll-auto font-sans text-base/tight underline decoration-transparent transition-all hover:decoration-current"
                        >
                          {member.name}
                        </Link>
                      </div>
                      <p className="text-base/tight text-brand-toffee">{member.role}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center">
          <ButtonLink href="/team">
            <span className="sr-only">Visit Team Page</span>
            <span aria-hidden>View Full Team</span>
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

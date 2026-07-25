import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { CaseManagerWhereInput, NeutralWhereInput } from '~/graphql/generated/cms.generated';

/**
 * Names are stored as "First M. Last", so a single `name_contains` against the
 * raw term misses the most natural search there is: "Jeffrey Fleming" never
 * matches "Jeffrey M. Fleming". AND-ing each whitespace-separated token matches
 * regardless of what sits between them.
 *
 * Codegen runs with `avoidOptionals`, which makes every field on the generated
 * where-inputs required, so a partial filter has to be cast to the target input.
 */
function buildNameFilter(name?: string): CaseManagerWhereInput & NeutralWhereInput {
  const tokens = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const filter =
    tokens.length === 0 ? {} : { AND: tokens.map((t) => ({ info: { name_contains: t } })) };

  return filter as unknown as CaseManagerWhereInput & NeutralWhereInput;
}

const MEMBER_TAGS = {
  all: ['member'],
  member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
  neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
  caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

export const getNeutralsList = unstable_cache(
  (preview: boolean, name?: string) =>
    cmsRequest(preview).GetNeutralList({ where: buildNameFilter(name) }),
  MEMBER_TAGS.neutralsList(),
  {
    tags: MEMBER_TAGS.neutralsList(),
  },
);

export const getRecentNeutralsList = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetRecentNeutralList(),
  [...MEMBER_TAGS.neutralsList(), 'recent'],
  {
    tags: [...MEMBER_TAGS.neutralsList(), 'recent'],
  },
);

export const getCaseManagersList = unstable_cache(
  (preview: boolean, name?: string) =>
    cmsRequest(preview).GetCaseManagerList({ where: buildNameFilter(name) }),
  MEMBER_TAGS.caseManagersList(),
  {
    tags: MEMBER_TAGS.caseManagersList(),
  },
);

export const getMemberPageBySlug = (slug: string, preview: boolean) =>
  unstable_cache(
    (slug: string, preview: boolean) => cmsRequest(preview).GetMemberPageBySlug({ slug }),
    MEMBER_TAGS.member(slug),
    {
      tags: MEMBER_TAGS.member(slug),
    },
  )(slug, preview);

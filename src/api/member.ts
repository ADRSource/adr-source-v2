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

/**
 * `unstable_cache` folds its arguments into the cache key, so caching the
 * search path would mint a permanent data-cache entry per distinct term and let
 * arbitrary `?term=` values grow the cache without bound. The unfiltered list —
 * the one virtually every visitor loads — stays cached; searches go direct.
 */
function isSearch(name?: string): name is string {
  return name != null && name.trim().length > 0;
}

const MEMBER_TAGS = {
  all: ['member'],
  member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
  neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
  caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

const getCachedNeutralsList = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetNeutralList({ where: buildNameFilter() }),
  MEMBER_TAGS.neutralsList(),
  {
    tags: MEMBER_TAGS.neutralsList(),
  },
);

export const getNeutralsList = (preview: boolean, name?: string) =>
  isSearch(name)
    ? cmsRequest(preview).GetNeutralList({ where: buildNameFilter(name) })
    : getCachedNeutralsList(preview);

export const getRecentNeutralsList = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetRecentNeutralList(),
  [...MEMBER_TAGS.neutralsList(), 'recent'],
  {
    tags: [...MEMBER_TAGS.neutralsList(), 'recent'],
  },
);

const getCachedCaseManagersList = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetCaseManagerList({ where: buildNameFilter() }),
  MEMBER_TAGS.caseManagersList(),
  {
    tags: MEMBER_TAGS.caseManagersList(),
  },
);

export const getCaseManagersList = (preview: boolean, name?: string) =>
  isSearch(name)
    ? cmsRequest(preview).GetCaseManagerList({ where: buildNameFilter(name) })
    : getCachedCaseManagersList(preview);

export const getMemberPageBySlug = (slug: string, preview: boolean) =>
  unstable_cache(
    (slug: string, preview: boolean) => cmsRequest(preview).GetMemberPageBySlug({ slug }),
    MEMBER_TAGS.member(slug),
    {
      tags: MEMBER_TAGS.member(slug),
    },
  )(slug, preview);

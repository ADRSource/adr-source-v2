import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const MEMBER_TAGS = {
  all: ['member'],
  member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
  neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
  caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

export const getNeutralsList = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetNeutralList(),
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
  (preview: boolean) => cmsRequest(preview).GetCaseManagerList(),
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

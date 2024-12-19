import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

const MEMBER_TAGS = {
  all: ['member'],
  member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
  neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
  caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

const throttledGetNeutralsList = throttle((preview: boolean) => {
  return cmsRequest(preview).GetNeutralList();
});
export const getNeutralsList = unstable_cache(
  throttledGetNeutralsList,
  MEMBER_TAGS.neutralsList(),
  {
    tags: MEMBER_TAGS.neutralsList(),
  },
);

const throttledGetCaseManagersList = throttle((preview: boolean) => {
  return cmsRequest(preview).GetCaseManagerList();
});
export const getCaseManagersList = unstable_cache(
  throttledGetCaseManagersList,
  MEMBER_TAGS.caseManagersList(),
  {
    tags: MEMBER_TAGS.caseManagersList(),
  },
);

const throttledGetMemberPageBySlug = throttle((slug: string, preview: boolean) => {
  return cmsRequest(preview).GetMemberPageBySlug({
    slug,
  });
});
export const getMemberPageBySlug = (slug: string, preview: boolean) =>
  unstable_cache(throttledGetMemberPageBySlug, MEMBER_TAGS.member(slug), {
    tags: MEMBER_TAGS.member(slug),
  })(slug, preview);

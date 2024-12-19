import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

export const TEAM_TAGS = {
  all: ['team'],
};

const throttledGetTeamPage = throttle((preview: boolean) => {
  return cmsRequest(preview).GetTeamPage();
});
export const getTeamPage = unstable_cache(throttledGetTeamPage, TEAM_TAGS.all, {
  tags: TEAM_TAGS.all,
});

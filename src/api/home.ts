import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

const throttledGetHomePage = throttle((preview: boolean) => {
  return cmsRequest(preview).GetHomePage();
});

export const getHomePage = unstable_cache(throttledGetHomePage, ['home'], {
  tags: ['home'],
});

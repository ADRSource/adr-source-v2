import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

const throttledGetAboutPage = throttle((preview: boolean) => {
  return cmsRequest(preview).GetAboutPage();
});

export const getAboutPage = unstable_cache(throttledGetAboutPage, ['about'], {
  tags: ['about'],
});

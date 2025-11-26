import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getHomePage = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetHomePage(),
  ['home'],
  {
    tags: ['home'],
  },
);

import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getTeamPage = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetTeamPage(),
  ['team'],
);

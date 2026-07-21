import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getResourcesPage = unstable_cache(
  (preview: boolean) => cmsRequest(preview).GetResourcesPage(),
  ['resourcesPage'],
);

export const getResources = unstable_cache(
  (first: number, skip: number, preview: boolean) =>
    cmsRequest(preview).GetResources({ first, skip }),
  ['resources'],
);

export const getInternalResourceBySlug = unstable_cache(
  (slug: string, preview: boolean) => cmsRequest(preview).GetInternalResourceBySlug({ slug }),
  ['internalResource'],
);

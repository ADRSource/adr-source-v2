import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

const RESOURCES_TAGS = {
  all: ['resources'],
  resource: (slug: string) => [...RESOURCES_TAGS.all, `resource:${slug}`],
  list: (first: number, skip: number) => [
    ...RESOURCES_TAGS.all,
    `resources-first:${first.toString()}-skip:${skip.toString()}`,
  ],
};

const throttledGetResourcesPage = throttle((preview: boolean) => {
  return cmsRequest(preview).GetResourcesPage();
});
export const getResourcesPage = unstable_cache(throttledGetResourcesPage, RESOURCES_TAGS.all, {
  tags: RESOURCES_TAGS.all,
});

const throttledGetResources = throttle((first: number, skip: number, preview: boolean) => {
  return cmsRequest(preview).GetResources({ first, skip });
});
export const getResources = (first = 12, skip = 0, preview: boolean) => {
  return unstable_cache(throttledGetResources, RESOURCES_TAGS.list(first, skip), {
    tags: RESOURCES_TAGS.list(first, skip),
  })(first, skip, preview);
};

const throttledGetInternalResourceBySlug = throttle((slug: string, preview: boolean) => {
  return cmsRequest(preview).GetInternalResourceBySlug({ slug });
});
export const getInternalResourceBySlug = (slug: string, preview: boolean) =>
  unstable_cache(throttledGetInternalResourceBySlug, RESOURCES_TAGS.resource(slug), {
    tags: RESOURCES_TAGS.resource(slug),
  })(slug, preview);

/**
 * Unthrottled version for use in Edge Runtime (e.g., OG images)
 * where throttling doesn't work across isolated invocations.
 */
export const getInternalResourceBySlugUnthrottled = (slug: string, preview: boolean) =>
  unstable_cache(
    (slug: string, preview: boolean) => cmsRequest(preview).GetInternalResourceBySlug({ slug }),
    RESOURCES_TAGS.resource(slug),
    {
      tags: RESOURCES_TAGS.resource(slug),
    },
  )(slug, preview);

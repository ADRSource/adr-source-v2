import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const RESOURCES_TAGS = {
	all: ['resources'],
	resource: (slug: string) => [...RESOURCES_TAGS.all, `resource:${slug}`],
	list: (first: number, skip: number) => [
		...RESOURCES_TAGS.all,
		`resources-first:${first.toString()}-skip:${skip.toString()}`,
	],
};

export const getResourcesPage = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetResourcesPage();
	},
	RESOURCES_TAGS.all,
	{
		tags: RESOURCES_TAGS.all,
	},
);

export function prefetchResources(first = 12, skip = 0, preview: boolean) {
	return getResources(first, skip, preview);
}

export const getResources = (first = 12, skip = 0, preview: boolean) =>
	unstable_cache(
		(first: number, skip: number, preview: boolean) => {
			return cmsRequest(preview).GetResources({ first, skip });
		},
		RESOURCES_TAGS.list(first, skip),
		{
			tags: RESOURCES_TAGS.list(first, skip),
		},
	)(first, skip, preview);

export const getInternalResourceBySlug = (slug: string, preview: boolean) =>
	unstable_cache(
		(slug: string, preview: boolean) => {
			return cmsRequest(preview).GetInternalResourceBySlug({ slug });
		},
		RESOURCES_TAGS.resource(slug),
		{
			tags: RESOURCES_TAGS.resource(slug),
		},
	)(slug, preview);

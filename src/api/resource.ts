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
	() => {
		return cmsRequest().GetResourcesPage();
	},
	RESOURCES_TAGS.all,
	{
		tags: RESOURCES_TAGS.all,
	},
);

export function prefetchResources(first = 12, skip = 0) {
	return getResources(first, skip);
}

export const getResources = (first = 12, skip = 0) =>
	unstable_cache(
		(first: number, skip: number) => {
			return cmsRequest().GetResources({ first, skip });
		},
		RESOURCES_TAGS.list(first, skip),
		{
			tags: RESOURCES_TAGS.list(first, skip),
		},
	)(first, skip);

export const getInternalResourceBySlug = (slug: string) =>
	unstable_cache(
		(slug: string) => {
			return cmsRequest().GetInternalResourceBySlug({ slug });
		},
		RESOURCES_TAGS.resource(slug),
		{
			tags: RESOURCES_TAGS.resource(slug),
		},
	)(slug);

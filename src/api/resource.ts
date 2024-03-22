import { cmsRequest } from '~/graphql/cms';

const RESOURCES_TAGS = {
	resources: 'GetResourcesPage' as const,
	resource: (slug: string) => `GetInternalResourceBySlug:${slug}` as const,
	list: (first: number, skip: number) =>
		`GetResources-first:${first.toString()}-skip:${skip.toString()}` as const,
};

export function getResourcesPage() {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.resources],
		},
	}).GetResourcesPage();
}

export function prefetchResources(first = 12, skip = 0) {
	return getResources(first, skip);
}

export function getResources(first = 12, skip = 0) {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.list(first, skip)],
		},
	}).GetResources({ first, skip });
}

export function getInternalResourceBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.resource(slug)],
		},
	}).GetInternalResourceBySlug({ slug });
}

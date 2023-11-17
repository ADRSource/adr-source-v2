import { cmsRequest } from '~/graphql/cms';

const RESOURCES_TAGS = {
	resources: 'GetResourcesPage' as const,
	resource: (slug: string) => `GetResourceBySlug:${slug}` as const,
	list: (first: number, skip: number) => `GetResources-first:${first}-skip:${skip}` as const,
};

export function getResourcesPage() {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.resources],
		},
	}).GetResourcesPage();
}

export function getResources(first = 12, skip = 0) {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.list(first, skip)],
		},
	}).GetResources({ first, skip });
}

export function getResourceBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: [RESOURCES_TAGS.resource(slug)],
		},
	}).GetResourceBySlug({ slug });
}

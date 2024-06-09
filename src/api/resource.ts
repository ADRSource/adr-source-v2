import { cmsRequest } from '~/graphql/cms';

const RESOURCES_TAGS = {
	all: ['resources'],
	resource: (slug: string) => [...RESOURCES_TAGS.all, `resource:${slug}`],
	list: (first: number, skip: number) => [
		...RESOURCES_TAGS.all,
		`resources-first:${first.toString()}-skip:${skip.toString()}`,
	],
};

export function getResourcesPage() {
	return cmsRequest({
		next: {
			tags: RESOURCES_TAGS.all,
		},
	}).GetResourcesPage();
}

export function prefetchResources(first = 12, skip = 0) {
	return getResources(first, skip);
}

export function getResources(first = 12, skip = 0) {
	return cmsRequest({
		next: {
			tags: RESOURCES_TAGS.list(first, skip),
		},
	}).GetResources({ first, skip });
}

export function getInternalResourceBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: RESOURCES_TAGS.resource(slug),
		},
	}).GetInternalResourceBySlug({ slug });
}

import { cmsRequest } from '~/graphql/cms';

const RESOURCES_TAGS = {
	all: ['resources'],
	list: (first: number, skip: number) => [
		...RESOURCES_TAGS.all,
		`resources-first:${first}-skip:${skip}`,
	],
};

export function getResourcesPage() {
	return cmsRequest({
		next: {
			tags: RESOURCES_TAGS.all,
		},
	}).GetResourcesPage();
}

export function getResources(first = 12, skip = 0) {
	return cmsRequest({
		next: {
			tags: RESOURCES_TAGS.list(first, skip),
		},
	}).GetResources({ first, skip });
}

export function getResourceBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: [`resource:${slug}`],
		},
	}).GetResourceBySlug({ slug });
}

import { cmsRequest } from '~/graphql/cms';

export function getResourcesPage() {
	return cmsRequest({
		next: {
			tags: ['resources'],
		},
	}).GetResourcesPage();
}

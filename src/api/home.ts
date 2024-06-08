import { cmsRequest } from '~/graphql/cms';

export function getHomePage() {
	return cmsRequest({
		next: {
			tags: ['home'],
		},
	}).GetHomePage();
}

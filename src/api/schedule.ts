import { cmsRequest } from '~/graphql/cms';

export function getSchedulePage() {
	return cmsRequest({
		next: {
			tags: ['schedule'],
		},
	}).GetSchedulePage();
}

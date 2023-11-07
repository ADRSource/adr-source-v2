import { cmsRequest } from '~/graphql/cms';

export function getAboutPage() {
	return cmsRequest({
		next: {
			tags: ['about'],
		},
	}).GetAboutPage();
}

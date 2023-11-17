import { cmsRequest } from '~/graphql/cms';

const ABOUT_TAGS = {
	about: 'GetAboutPage' as const,
};

export function getAboutPage() {
	return cmsRequest({
		next: {
			tags: [ABOUT_TAGS.about],
		},
	}).GetAboutPage();
}

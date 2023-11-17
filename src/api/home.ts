import { cmsRequest } from '~/graphql/cms';

const HOME_TAGS = {
	home: 'GetHomePage' as const,
};

export function getHomePage() {
	return cmsRequest({
		next: {
			tags: [HOME_TAGS.home],
		},
	}).GetHomePage();
}

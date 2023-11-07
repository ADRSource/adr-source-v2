import { cmsRequest } from '~/graphql/cms';

export const TEAM_TAGS = {
	all: ['team'],
};

export function getTeamPage() {
	return cmsRequest({
		next: {
			tags: TEAM_TAGS.all,
		},
	}).GetTeamPage();
}

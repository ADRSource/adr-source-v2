import { cmsRequest } from '~/graphql/cms';

export const TEAM_TAGS = {
	team: 'GetTeamPage' as const,
};

export function getTeamPage() {
	return cmsRequest({
		next: {
			tags: [TEAM_TAGS.team],
		},
	}).GetTeamPage();
}

import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const TEAM_TAGS = {
	all: ['team'],
};

export const getTeamPage = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetTeamPage();
	},
	TEAM_TAGS.all,
	{
		tags: TEAM_TAGS.all,
	},
);

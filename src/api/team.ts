import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const TEAM_TAGS = {
	all: ['team'],
};

export const getTeamPage = unstable_cache(
	() => {
		return cmsRequest().GetTeamPage();
	},
	TEAM_TAGS.all,
	{
		tags: TEAM_TAGS.all,
	},
);

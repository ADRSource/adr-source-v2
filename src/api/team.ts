import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const TEAM_TAGS = {
	all: ['team'],
};

export const getTeamPage = cache(async () => cmsRequest().GetTeamPage(), TEAM_TAGS.all);

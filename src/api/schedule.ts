import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getSchedulePage = unstable_cache(
	() => {
		return cmsRequest().GetSchedulePage();
	},
	['schedule'],
	{
		tags: ['schedule'],
	},
);

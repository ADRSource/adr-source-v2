import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getHomePage = unstable_cache(
	() => {
		return cmsRequest().GetHomePage();
	},
	['home'],
	{
		tags: ['home'],
	},
);

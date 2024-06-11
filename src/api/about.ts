import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getAboutPage = unstable_cache(
	() => {
		return cmsRequest().GetAboutPage();
	},
	['about'],
	{
		tags: ['about'],
	},
);

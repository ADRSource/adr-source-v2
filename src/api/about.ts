import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getAboutPage = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetAboutPage();
	},
	['about'],
	{
		tags: ['about'],
	},
);

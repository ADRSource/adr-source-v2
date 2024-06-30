import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

export const getSchedulePage = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetSchedulePage();
	},
	['schedule'],
	{
		tags: ['schedule'],
	},
);

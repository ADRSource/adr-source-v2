import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const HOME_TAGS = {
	all: ['home'],
};

export const getHomePage = cache(async () => {
	return cmsRequest().GetHomePage();
}, HOME_TAGS.all);

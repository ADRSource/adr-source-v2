import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const RESOURCE_TAGS = {
	all: ['resources'],
};

export const getResourcesPage = cache(async () => {
	return cmsRequest().GetResourcesPage();
}, RESOURCE_TAGS.all);

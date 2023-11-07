import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const ABOUT_TAGS = {
	all: ['about'],
};
export const getAboutPage = cache(async () => {
	return cmsRequest().GetAboutPage();
}, ABOUT_TAGS.all);

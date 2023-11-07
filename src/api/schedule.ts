import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const SCHEDULE_TAGS = {
	all: ['schedule'],
};
export const getSchedulePage = cache(async () => cmsRequest().GetSchedulePage(), SCHEDULE_TAGS.all);

import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';
import { throttle } from '~/utils/throttle';

const throttledGetSchedulePage = throttle((preview: boolean) => {
	return cmsRequest(preview).GetSchedulePage();
});
export const getSchedulePage = unstable_cache(throttledGetSchedulePage, ['schedule'], {
	tags: ['schedule'],
});

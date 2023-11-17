import { cmsRequest } from '~/graphql/cms';

const SCHEDULE_TAGS = {
	schedule: 'GetSchedulePage' as const,
};

export function getSchedulePage() {
	return cmsRequest({
		next: {
			tags: [SCHEDULE_TAGS.schedule],
		},
	}).GetSchedulePage();
}

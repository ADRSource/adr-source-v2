import { unstable_cache as cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const MEMBER_TAGS = {
	all: ['member'],
	neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
	caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

export function prefetchNeutralsList() {
	return getNeutralsList();
}

export const getNeutralsList = cache(async () => {
	return cmsRequest().GetNeutralList();
}, MEMBER_TAGS.neutralsList());

export const getCaseManagersList = cache(async () => {
	return cmsRequest().GetCaseManagerList();
}, MEMBER_TAGS.caseManagersList());

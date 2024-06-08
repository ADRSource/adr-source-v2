import { cmsRequest } from '~/graphql/cms';

const MEMBER_TAGS = {
	all: ['member'],
	member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
	neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
	caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

export function prefetchNeutralsList() {
	return getNeutralsList();
}

export function getNeutralsList() {
	return cmsRequest({
		next: {
			tags: MEMBER_TAGS.neutralsList(),
		},
	}).GetNeutralList();
}

export function getCaseManagersList() {
	return cmsRequest({
		next: {
			tags: MEMBER_TAGS.caseManagersList(),
		},
	}).GetCaseManagerList();
}

export function getMemberPageBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: MEMBER_TAGS.member(slug),
		},
	}).GetMemberPageBySlug({
		slug,
	});
}

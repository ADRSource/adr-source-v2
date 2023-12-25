import { cmsRequest } from '~/graphql/cms';

const MEMBER_TAGS = {
	member: (slug: string) => `GetMemberPageBySlug:${slug}` as const,
	neutralsList: 'GetNeutralList' as const,
	caseManagersList: 'GetCaseManagerList' as const,
};

export function prefetchNeutralsList() {
	return getNeutralsList();
}

export function getNeutralsList() {
	return cmsRequest({
		next: {
			tags: [MEMBER_TAGS.neutralsList],
		},
	}).GetNeutralList();
}

export function getCaseManagersList() {
	return cmsRequest({
		next: {
			tags: [MEMBER_TAGS.caseManagersList],
		},
	}).GetCaseManagerList();
}

export function getMemberPageBySlug(slug: string) {
	return cmsRequest({
		next: {
			tags: [MEMBER_TAGS.member(slug)],
		},
	}).GetMemberPageBySlug({
		slug,
	});
}

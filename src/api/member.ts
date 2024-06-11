import { unstable_cache } from 'next/cache';
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

export const getNeutralsList = unstable_cache(
	() => {
		return cmsRequest().GetNeutralList();
	},
	MEMBER_TAGS.neutralsList(),
	{
		tags: MEMBER_TAGS.neutralsList(),
	},
);

export const getCaseManagersList = unstable_cache(
	() => {
		return cmsRequest().GetCaseManagerList();
	},
	MEMBER_TAGS.caseManagersList(),
	{
		tags: MEMBER_TAGS.caseManagersList(),
	},
);

export const getMemberPageBySlug = (slug: string) =>
	unstable_cache(
		(slug: string) => {
			return cmsRequest().GetMemberPageBySlug({
				slug,
			});
		},
		MEMBER_TAGS.member(slug),
		{
			tags: MEMBER_TAGS.member(slug),
		},
	)(slug);

import { unstable_cache } from 'next/cache';
import { cmsRequest } from '~/graphql/cms';

const MEMBER_TAGS = {
	all: ['member'],
	member: (slug: string) => [...MEMBER_TAGS.all, `member:${slug}`],
	neutralsList: () => [...MEMBER_TAGS.all, 'neutralsList'],
	caseManagersList: () => [...MEMBER_TAGS.all, 'caseManagersList'],
};

export function prefetchNeutralsList(preview: boolean) {
	return getNeutralsList(preview);
}

export const getNeutralsList = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetNeutralList();
	},
	MEMBER_TAGS.neutralsList(),
	{
		tags: MEMBER_TAGS.neutralsList(),
	},
);

export const getCaseManagersList = unstable_cache(
	(preview: boolean) => {
		return cmsRequest(preview).GetCaseManagerList();
	},
	MEMBER_TAGS.caseManagersList(),
	{
		tags: MEMBER_TAGS.caseManagersList(),
	},
);

export const getMemberPageBySlug = (slug: string, preview: boolean) =>
	unstable_cache(
		(slug: string, preview: boolean) => {
			return cmsRequest(preview).GetMemberPageBySlug({
				slug,
			});
		},
		MEMBER_TAGS.member(slug),
		{
			tags: MEMBER_TAGS.member(slug),
		},
	)(slug, preview);

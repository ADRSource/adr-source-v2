import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetNeutralList = gql`
	query GetNeutralList {
		neutralList(where: { id: "clonox8ds7npt0bk1jsjz6wb9" }) {
			neutrals {
				id
				memberPage {
					slug
				}
				info {
					name
					headshot {
						url(transformation: { document: { output: { format: webp } } })
					}
				}
			}
		}
	}
`;

export const GetCaseManagerList = gql`
	query GetCaseManagerList {
		caseManagerList(where: { id: "clonp2m207nw30bk1grlirghc" }) {
			caseManagers {
				id
				memberPage {
					slug
				}
				info {
					name
					headshot {
						url(transformation: { document: { output: { format: webp } } })
					}
				}
			}
		}
	}
`;

export const GetMemberPageBySlug = gql`
	query GetMemberPageBySlug($slug: String!) {
		memberPage(where: { slug: $slug }) {
			seo {
				...SeoInfo
			}
			slug
			member {
				__typename
				...MemberInfoNeutral
				...MemberInfoCaseManager
			}
		}
	}

	fragment MemberInfoNeutral on Neutral {
		__typename
		id
		info {
			...BaseMemberInfo
		}
		experienceStartDate
		focusAreas
		nadnId
		caseManager {
			... on CaseManager {
				id
				memberPage {
					slug
				}
				info {
					name
				}
			}
		}
	}

	fragment MemberInfoCaseManager on CaseManager {
		__typename
		id
		info {
			...BaseMemberInfo
		}
		neutrals {
			id
			memberPage {
				slug
			}
			info {
				name
			}
		}
	}

	fragment BaseMemberInfo on BaseMemberInfo {
		name
		headshot {
			url(transformation: { document: { output: { format: webp } } })
		}
		email
		phone
		linkedIn
		bio {
			raw
		}
	}

	${SeoFragment}
`;

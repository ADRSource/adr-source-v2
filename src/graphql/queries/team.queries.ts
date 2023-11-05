import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetTeamPage = gql`
	query GetTeamPage {
		teamPage(where: { id: "cloloqgmo43uh0bk1wehax5j0" }) {
			seo {
				...SeoInfo
			}
		}
	}
	${SeoFragment}
`;

export const GetNeutralList = gql`
	query GetNeutralList {
		neutrals(orderBy: createdAt_DESC) {
			memberPage {
				slug
				member {
					... on Neutral {
						__typename
						id
						info {
							name
							headshot {
								url(transformation: { document: { output: { format: webp } } })
							}
						}
					}
				}
			}
		}
	}
`;

export const GetCaseManagerList = gql`
	query GetCaseManagerList {
		caseManagers(orderBy: createdAt_DESC) {
			memberPage {
				slug
				member {
					... on CaseManager {
						__typename
						id
						info {
							name
							headshot {
								url(transformation: { document: { output: { format: webp } } })
							}
						}
					}
				}
			}
		}
	}
`;

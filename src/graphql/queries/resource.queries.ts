import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetResourcesPage = gql`
	query GetResourcesPage {
		resourcesPage(where: { id: "clom3ez9d4dub0alisjn42xnu" }) {
			seo {
				...SeoInfo
			}
		}
	}
	${SeoFragment}
`;

export const GetResources = gql`
	query GetResources($first: Int = 12, $skip: Int = 0) {
		resourcePages(first: $first, skip: $skip, orderBy: publishDate_DESC) {
			title
			slug
			excerpt {
				raw
			}
			resourceType {
				type
			}
		}
		resourcePagesConnection {
			aggregate {
				count
			}
		}
	}
`;

export const GetResourceBySlug = gql`
	query GetResourceBySlug($slug: String!) {
		resourcePage(where: { slug: $slug }) {
			seo {
				...SeoInfo
			}
			title
			publishDate
			slug
			author {
				... on Neutral {
					info {
						name
					}
					memberPage {
						slug
					}
				}
				... on CaseManager {
					info {
						name
					}
					memberPage {
						slug
					}
				}
			}
			resourceType {
				type
			}
			resourceContent {
				json
				references {
					__typename
					... on MemberPage {
						id
						slug
					}
					... on Asset {
						id
						mimeType
					}
				}
			}
		}
	}
	${SeoFragment}
`;

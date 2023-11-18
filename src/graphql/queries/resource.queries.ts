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
		resources(first: $first, skip: $skip, orderBy: publishDate_DESC) {
			id
			resourceType {
				type
			}
			resource {
				__typename
				... on InternalResource {
					title
					excerpt {
						raw
					}
					slug
				}
				... on ExternalResource {
					title
					excerpt {
						raw
					}
					url
				}
			}
		}
		resourcePagesConnection {
			aggregate {
				count
			}
		}
	}
`;

export const GetInternalResourceBySlug = gql`
	query GetInternalResourceBySlug($slug: String!) {
		internalResource(where: { slug: $slug }) {
			seo {
				...SeoInfo
			}
			resource {
				publishDate
				resourceType {
					type
				}
			}
			title
			slug
			excerpt {
				text
			}
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

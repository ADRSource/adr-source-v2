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

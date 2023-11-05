import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetHomePage = gql`
	query GetHomePage {
		homePage(where: { id: "clolon43n44d60aliirff1nct" }) {
			seo {
				...SeoInfo
			}
		}
	}
	${SeoFragment}
`;

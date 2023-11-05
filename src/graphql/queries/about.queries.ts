import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetAboutPage = gql`
	query GetAboutPage {
		aboutPage(where: { id: "clolorbch44fg0alieql4kgmq" }) {
			seo {
				...SeoInfo
			}
		}
	}
	${SeoFragment}
`;

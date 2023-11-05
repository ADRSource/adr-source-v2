import gql from 'graphql-tag';

export const SeoFragment = gql`
	fragment SeoInfo on Seo {
		title
		description
		index
	}
`;

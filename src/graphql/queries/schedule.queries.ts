import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetSchedulePage = gql`
  query GetSchedulePage {
    schedulePage(where: { id: "clom2orhq4dfn0alilnwb4oyx" }) {
      seo {
        ...SeoInfo
      }
    }
  }
  ${SeoFragment}
`;

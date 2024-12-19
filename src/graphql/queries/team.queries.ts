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

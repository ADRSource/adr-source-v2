import gql from 'graphql-tag';

export const GetPreviewTarget = gql`
  query GetPreviewTarget($id: ID!) {
    neutral(where: { id: $id }) {
      memberPage {
        slug
      }
    }
    caseManager(where: { id: $id }) {
      memberPage {
        slug
      }
    }
    resource(where: { id: $id }) {
      resource {
        __typename
        ... on InternalResource {
          slug
        }
      }
    }
  }
`;

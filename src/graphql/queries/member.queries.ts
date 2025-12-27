import gql from 'graphql-tag';
import { SeoFragment } from '~/graphql/fragments/seo.fragments';

export const GetNeutralList = gql`
  query GetNeutralList {
    neutralList(where: { id: "clonox8ds7npt0bk1jsjz6wb9" }) {
      neutrals(first: 20) {
        ...NeutralItem
      }
    }
  }
`;

export const GetRecentNeutralList = gql`
  query GetRecentNeutralList {
    neutralList(where: { id: "clonox8ds7npt0bk1jsjz6wb9" }) {
      neutrals(first: 3, orderBy: createdAt_DESC) {
        ...NeutralItem
      }
    }
  }

  fragment NeutralItem on Neutral {
    id
    memberPage {
      slug
    }
    roleDescription
    info {
      name
      headshot {
        url(transformation: { document: { output: { format: webp } } })
      }
    }
  }
`;

export const GetCaseManagerList = gql`
  query GetCaseManagerList {
    caseManagerList(where: { id: "clonp2m207nw30bk1grlirghc" }) {
      caseManagers(first: 20) {
        id
        memberPage {
          slug
        }
        roleDescription
        info {
          name
          headshot {
            url(transformation: { document: { output: { format: webp } } })
          }
        }
      }
    }
  }
`;

export const GetMemberPageBySlug = gql`
  query GetMemberPageBySlug($slug: String!) {
    memberPage(where: { slug: $slug }) {
      seo {
        ...SeoInfo
      }
      slug
      member {
        __typename
        ...MemberInfoNeutral
        ...MemberInfoCaseManager
      }
    }
  }

  fragment MemberInfoNeutral on Neutral {
    __typename
    id
    info {
      ...BaseMemberInfo
    }
    experienceStartDate
    focusAreas
    nadnId
    caseManager {
      ... on CaseManager {
        id
        memberPage {
          slug
        }
        info {
          name
        }
      }
    }
    roleDescription
    availabilityStartDate
  }

  fragment MemberInfoCaseManager on CaseManager {
    __typename
    id
    info {
      ...BaseMemberInfo
    }
    neutrals(first: 20) {
      id
      memberPage {
        slug
      }
      info {
        name
        headshot {
          url(transformation: { document: { output: { format: webp } } })
        }
      }
      roleDescription
    }
    roleDescription
  }

  fragment BaseMemberInfo on BaseMemberInfo {
    name
    informalName
    postNominalTitles
    headshot {
      url(transformation: { document: { output: { format: webp } } })
    }
    email
    phone
    linkedIn
    bio {
      raw
    }
  }

  ${SeoFragment}
`;

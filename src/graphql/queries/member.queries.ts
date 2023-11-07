import gql from "graphql-tag";


export const GetNeutralList = gql`
	query GetNeutralList {
		neutralList(where: { id: "clonox8ds7npt0bk1jsjz6wb9" }) {
			neutrals {
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
			}
		}
	}
`;

export const GetCaseManagerList = gql`
	query GetCaseManagerList {
		caseManagerList(where: { id: "clonp2m207nw30bk1grlirghc" }) {
			caseManagers {
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
			}
		}
	}
`;

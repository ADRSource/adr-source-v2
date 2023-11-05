import { cmsRequest } from '~/graphql/cms';

export function getTeamPage() {
	return cmsRequest({
		next: {
			tags: ['team'],
		},
	}).GetTeamPage();
}

export function prefetchNeutralsList() {
	return getNeutralsList();
}

export function getNeutralsList() {
	return cmsRequest({
		next: {
			tags: ['neutralsList'],
		},
	}).GetNeutralList();
}

export function getCaseManagersList() {
	return cmsRequest({
		next: {
			tags: ['caseManagersList'],
		},
	}).GetCaseManagerList();
}

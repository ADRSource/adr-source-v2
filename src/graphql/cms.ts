import { GraphQLClient } from 'graphql-request';
import { draftMode } from 'next/headers';
import 'server-only';
import { CMS_URL } from '~/constants/cms.constants';
import { getSdk } from '~/graphql/generated/cms.generated';

function getAuthHeader() {
	const { isEnabled } = draftMode();

	return `Bearer ${isEnabled ? process.env.CMS_PREVIEW_TOKEN : process.env.CMS_PROD_TOKEN}`;
}

const client = new GraphQLClient(CMS_URL, {
	headers: {
		Authorization: getAuthHeader(),
	},
});

export function cmsRequest() {
	return getSdk(client);
}

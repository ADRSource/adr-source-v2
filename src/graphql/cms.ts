import { GraphQLClient } from 'graphql-request';
import 'server-only';
import { CMS_URL } from '~/constants/cms.constants';
import { getSdk } from '~/graphql/generated/cms.generated';

function getAuthHeader(preview: boolean) {
  return `Bearer ${preview ? process.env.CMS_PREVIEW_TOKEN! : process.env.CMS_PROD_TOKEN!}`;
}
const client = new GraphQLClient(CMS_URL, { fetch });

export function cmsRequest(preview: boolean) {
  return getSdk(client.setHeader('Authorization', getAuthHeader(preview)));
}

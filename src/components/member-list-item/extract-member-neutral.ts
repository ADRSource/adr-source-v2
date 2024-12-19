import { NeutralItemFragment } from '~/graphql/generated/cms.generated';

export function extractMemberFromNeutral(neutral: NeutralItemFragment) {
  const { memberPage } = neutral;
  const { slug } = memberPage ?? {};

  if (!memberPage) return null;

  return {
    url: slug ?? '',
    name: neutral.info.name,
    headshot: neutral.info.headshot.url,
  };
}

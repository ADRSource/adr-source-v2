import { PATHS } from '~/constants/paths.constants';
import { cmsRequest } from '~/graphql/cms';

// Resolves entries whose page lives on a related entry; IDs are unique across models, so at most one field matches.
// Uncached: it runs before draft mode is on, so `unstable_cache` would pin the first lookup.
export async function getPreviewPath(id: string) {
  const { neutral, caseManager, resource } = await cmsRequest(true).GetPreviewTarget({ id });
  const memberSlug = (neutral ?? caseManager)?.memberPage?.slug;

  if (memberSlug != null) {
    return `${PATHS.team}/${memberSlug}`;
  }

  if (resource?.resource?.__typename === 'InternalResource') {
    return `${PATHS.resources}/${resource.resource.slug}`;
  }

  // External resources have no page of their own; they appear in the list.
  return resource != null ? PATHS.resources : null;
}

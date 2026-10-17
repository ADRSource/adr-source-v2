import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getResources, getResourcesPage } from '~/api/resource';
import { Pagination } from '~/app/(with-color-blur)/resources/pagination';
import { getPageParam } from '~/app/(with-color-blur)/resources/utils/getPageParam';
import { ResourceCard } from '~/app/_components/resources/resource-card';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Container } from '~/components/container';
import { PageHeader } from '~/components/ui/page-header';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';

export async function generateMetadata(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;
  // Later pages are canonical to themselves, not page 1, so their resources stay indexable.
  const page = getPageParam(PARAM_KEY, await props.searchParams);
  const query = page > 1 ? `?${PARAM_KEY}=${page.toString()}` : '';
  try {
    const data = await getResourcesPage(preview);
    const { seo } = data.resourcesPage ?? {};

    return getMetadataFromSeo(`${PATHS.absolute}${PATHS.resources}${query}`, seo);
  } catch (_error) {
    console.error('Error generating metadata for resources page');

    return {};
  }
}

const LIMIT = 9;
const PARAM_KEY = 'page';

export default async function Resources(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const preview = (await draftMode()).isEnabled;
  const page = getPageParam(PARAM_KEY, searchParams);
  const skip = (page - 1) * LIMIT;
  const data = await getResources(LIMIT, skip, preview);
  const { resources, resourcesConnection } = data;
  const pageSize = Math.ceil(resourcesConnection.aggregate.count / LIMIT);

  if (page > 1 && page > pageSize) {
    return notFound();
  }

  return (
    <Container>
      <div className="pb-7 pt-6 stack-y-6">
        <PageHeader className="text-center">Resources</PageHeader>
        <AutoGrid
          count={3}
          itemMinWidth={350}
          gapX="24px"
          gapY="24px"
          className="relative z-20"
          stagger
        >
          {resources.map((r, i) => {
            const { resource, resourceType } = r;
            if (resource == null) return null;

            return <ResourceCard key={i} resource={resource} type={resourceType?.type} />;
          })}
        </AutoGrid>
        {pageSize > 0 && (
          <Pagination
            pageSize={pageSize}
            paramKey={PARAM_KEY}
            siblingCount={1}
            searchParams={searchParams}
          />
        )}
      </div>
    </Container>
  );
}

import { Metadata } from 'next';
import { getResources, getResourcesPage } from '~/api/resource';
import { Pagination } from '~/app/(with-color-blur)/resources/pagination';
import { getPageParam } from '~/app/(with-color-blur)/resources/utils/getPageParam';
import { ResourceCard } from '~/app/_components/resources/resource-card';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

export const revalidate = 300; // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
	try {
		const data = await getResourcesPage();
		const { seo } = data.resourcesPage ?? {};

		const title = seo?.title ?? '';
		const description = seo?.description ?? '';
		const index = Boolean(seo?.index);

		return {
			title,
			description,
			robots: index ? 'index, follow' : 'noindex, nofollow',
			openGraph: {
				title,
				description,
				type: 'website',
				locale: 'en_US',
				url: `${PATHS.absolute}${PATHS.resources}`,
			},
		};
	} catch (_error) {
		console.error('Error generating metadata for resources page');

		return {};
	}
}

const LIMIT = 9;
const PARAM_KEY = 'page';

export default async function Resources({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const skip = (getPageParam(PARAM_KEY, searchParams) - 1) * LIMIT;
	const data = await getResources(LIMIT, skip);
	const { resources, resourcesConnection } = data;
	const pageSize = Math.ceil(resourcesConnection.aggregate.count / LIMIT);

	return (
		<Container>
			<div className="pb-7 pt-6 stack-y-6">
				<h1
					className={heading({
						type: '3',
						className: 'text-center',
					})}
				>
					Resources
				</h1>
				<AutoGrid count={3} itemMinWidth={350} gapX="24px" gapY="24px" className="relative z-20">
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

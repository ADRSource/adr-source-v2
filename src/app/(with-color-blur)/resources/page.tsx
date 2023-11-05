import { Metadata } from 'next';
import { getResourcesPage } from '~/api/resource';
import { TEST_CARD_DATA } from '~/app/(with-color-blur)/resources/data';
import { ResourcesGrid } from '~/app/(with-color-blur)/resources/resources-grid';
import { Container } from '~/components/container';
import { Pagination } from '~/components/pagination';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

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

const PAGINATION_ID = 'resources';
export default function Resources({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const paramKey = PAGINATION_ID + '-page';
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
				<ResourcesGrid paramKey={paramKey} searchParams={searchParams} />
				<Pagination count={TEST_CARD_DATA.length} id={PAGINATION_ID} paramKey={paramKey} />
			</div>
		</Container>
	);
}

import { Metadata } from 'next';
import { TEST_CARD_DATA } from '~/app/(with-color-blur)/resources/data';
import { ResourcesGrid } from '~/app/(with-color-blur)/resources/resources-grid';
import { Container } from '~/components/container';
import { Pagination } from '~/components/pagination';
import { heading } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

const TITLE = 'Resources';
const DESCRIPTION = `Resources for ADRsource. Get the latest news, updates, and more.`;
export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: `${PATHS.absolute}${PATHS.resources}`,
		type: 'website',
		locale: 'en_US',
	},
};

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

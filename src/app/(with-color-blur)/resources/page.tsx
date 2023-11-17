import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { Metadata } from 'next';
import { getResources, getResourcesPage } from '~/api/resource';
import { Pagination } from '~/app/(with-color-blur)/resources/pagination';
import { getPageParam } from '~/app/(with-color-blur)/resources/utils/getPageParam';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Card, CardBody, CardTag } from '~/components/card';
import { Container } from '~/components/container';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { CircleButton } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';
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
	const { resourcePages, resourcePagesConnection } = data;
	const pageSize = Math.ceil(resourcePagesConnection.aggregate.count / LIMIT);

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
					{resourcePages.map((resource, i) => {
						const { title, resourceType, excerpt } = resource;
						return (
							<Card key={i}>
								{resourceType?.type != null ? <CardTag>{resourceType.type}</CardTag> : null}
								<CardBody>
									<h3 className={heading({ type: '6', className: 'leading-none' })}>{title}</h3>
									<RichText
										content={excerpt.raw as RichTextContent}
										renderers={{
											p: ({ children }) => (
												<p className={text({ type: 'body', className: 'line-clamp-3' })}>
													{children}
												</p>
											),
										}}
									/>
								</CardBody>
								<CircleButton
									href={`${PATHS.resources}/${resource.slug}`}
									size="small"
									className="linkOverlay opacity-25 transition-opacity group-hover:opacity-100"
								>
									<IconArrowTopRight />
								</CircleButton>
							</Card>
						);
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

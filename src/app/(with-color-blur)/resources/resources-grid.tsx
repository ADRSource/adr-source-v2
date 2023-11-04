import { TEST_CARD_DATA } from '~/app/(with-color-blur)/resources/data';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Card, CardBody, CardTag } from '~/components/card';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { CircleButton } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';

export function ResourcesGrid({
	paramKey,
	searchParams,
}: {
	paramKey: string;
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const page = searchParams[paramKey] ?? '1';

	if (typeof page !== 'string') return null;

	const pageNumber = page === '' ? '1' : page;
	const data = TEST_CARD_DATA.slice((parseInt(pageNumber) - 1) * 12, parseInt(pageNumber) * 12);

	return (
		<AutoGrid count={4} itemMinWidth={350} gapX="24px" gapY="24px" className="relative z-20">
			{data.map((card, i) => {
				return (
					<Card key={i}>
						<CardTag>{card.tag}</CardTag>
						<CardBody>
							<h3 className={heading({ type: '6', className: 'leading-none' })}>{card.title}</h3>
							<p className={text({ type: 'body' })}>{card.description}</p>
						</CardBody>
						<CircleButton
							href={card.link}
							size="small"
							className="linkOverlay opacity-25 transition-opacity group-hover:opacity-100"
						>
							<IconArrowTopRight />
						</CircleButton>
					</Card>
				);
			})}
		</AutoGrid>
	);
}

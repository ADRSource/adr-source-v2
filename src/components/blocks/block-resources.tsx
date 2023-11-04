import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Card, CardBody, CardTag } from '~/components/card';
import { Container } from '~/components/container';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { ButtonLink, CircleButton } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';

export function BlockResources() {
	return (
		<Container>
			<div className="relative py-7">
				<div className="relative z-20 stack-y-3">
					<h2
						className={heading({
							type: '3',
							className: 'text-center md:text-right',
						})}
					>
						Resources
					</h2>
					<AutoGrid count={4} itemMinWidth={350} gapX="24px" gapY="24px" className="relative z-20">
						{TEST_CARD_DATA.map((card, i) => {
							return (
								<Card key={i}>
									<CardTag>{card.tag}</CardTag>
									<CardBody>
										<h3 className={heading({ type: '6', className: 'leading-none' })}>
											{card.title}
										</h3>
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
					<div className="flex justify-center">
						<ButtonLink href="/resources" size="small">
							View All
						</ButtonLink>
					</div>
				</div>
				<div className="pointer-events-none absolute bottom-[100%] left-1/2 z-10 aspect-square w-[min(75%,_787px)] -translate-x-1/2 translate-y-full rounded-full bg-brand-copper/30 opacity-40 blur-[63px] md:bottom-[-20%] md:blur-[70px] md:inset-x-center" />
			</div>
		</Container>
	);
}

const TEST_CARD_DATA = [
	{
		tag: 'Article',
		title: 'Doloremque',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		link: '/',
	},
	{
		tag: 'Blog',
		title: 'Adipiscing Elit',
		description:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		link: '/',
	},
	{
		tag: 'News',
		title: 'Lorem Ipsum',
		description:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		link: '/',
	},
	{
		tag: 'Article',
		title: 'Doloremque',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		link: '/',
	},
];

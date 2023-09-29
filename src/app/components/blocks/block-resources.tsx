import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Container } from '~/components/container';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { ButtonLink, IconButtonLink } from '~/components/ui/button';
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
									<IconButtonLink href={card.link} size="small" className="linkOverlay">
										<IconArrowTopRight />
									</IconButtonLink>
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
				<div className="md:opacity-1 pointer-events-none absolute bottom-[100%] left-1/2 z-10 aspect-square w-[min(75%,_787px)] -translate-x-1/2 translate-y-full rounded-full bg-brand-copper/30 opacity-60 bg-blend-darken blur-[63px] md:bottom-[-20%] md:blur-[250px] md:inset-x-center" />
			</div>
		</Container>
	);
}

function Card({ children }: { children?: React.ReactNode }) {
	return (
		<div className="linkBox rounded-md border border-solid border-brand-copper bg-brand-black px-4 py-5 stack-y-3">
			{children}
		</div>
	);
}

function CardTag({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className="inline-flex rounded-full border border-solid border-brand-copper bg-brand-black p-1">
				<p className={text({ type: 'tag', className: 'leading-none' })}>{children}</p>
			</div>
		</div>
	);
}

function CardBody({ children }: { children: React.ReactNode }) {
	return <div className="stack-y-2">{children}</div>;
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

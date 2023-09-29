import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Container } from '~/components/container';
import { ButtonLink } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';

export function BlockResources() {
	return (
		<Container>
			<div className="relative py-7">
				<div className="relative z-20 stack-y-3">
					<h2
						className={heading({
							type: '3',
							className: ' text-left md:text-right',
						})}
					>
						Resources
					</h2>
					<AutoGrid count={4} itemMinWidth={350} gapX="24px" gapY="24px" className="relative z-20">
						<Card />
						<Card />
						<Card />
						<Card />
					</AutoGrid>
					<div className="flex justify-center">
						<ButtonLink href="/resources" size="small">
							View All
						</ButtonLink>
					</div>
				</div>
				<div className="pointer-events-none absolute bottom-0 z-10 aspect-square w-[min(75%,_787px)] rounded-full bg-brand-copper/30 bg-blend-darken blur-[250px] inset-x-center md:bottom-[-20%]" />
			</div>
		</Container>
	);
}

function Card() {
	return (
		<div className="linkBox rounded-md border border-solid border-brand-copper bg-brand-black px-4 py-5 stack-y-3">
			<h3 className={heading({ type: '6' })}>Doloremque</h3>
			<p className={text({ type: 'body' })}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
	);
}

import { Container } from '~/components/container';
import { ButtonLink } from '~/components/ui/button';
import { heading } from '~/components/ui/text';

export function BlockAbout() {
	return (
		<Container>
			<div className="relative py-6 stack-y-3">
				<h2
					className={heading({
						type: '3',
						className: 'text-center md:text-left',
					})}
				>
					About
				</h2>
				<h3 className="sr-only">Our Values</h3>
				<ul>
					{VALUES.map((value, index) => {
						return (
							<li
								key={index}
								className="border-b border-solid border-brand-copper py-1 first:border-t"
							>
								<p className="mx-auto flex w-full max-w-[1324px] justify-center font-serif text-2xl leading-none md:text-5xl">
									<span className="block w-full px-1 md:px-2">
										<span className="w-full items-center justify-between rounded-md bg-brand-black p-2 stack-x-1">
											<span className="block">{value}</span>
											<span className="block font-sans text-xs tabular-nums leading-none">
												[{index + 1}]
											</span>
										</span>
									</span>
								</p>
							</li>
						);
					})}
				</ul>
				<div className="flex justify-center">
					<ButtonLink href="/about">Learn More</ButtonLink>
				</div>
			</div>
		</Container>
	);
}

const VALUES = [
	'Foster open communication',
	'Facilitate constructive dialogue',
	'Achieve mutually agreeable solutions',
	'Resolve conflicts peacefully',
	'Preserve relationships',
];

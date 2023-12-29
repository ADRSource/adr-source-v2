import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
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
					{VALUES.map(({ title, anchor }, index) => {
						return (
							<li
								key={index}
								className="linkBox border-b border-solid border-brand-copper py-1 first:border-t"
							>
								<Link
									href={{
										pathname: '/about',
										hash: anchor,
									}}
									className={twMerge(
										'linkOverlay mx-auto flex w-full max-w-[1324px] justify-center',
										heading({ type: '5' }),
									)}
								>
									<span className="block w-full px-1 md:px-2">
										<span className="w-full items-center justify-between rounded-md bg-brand-black p-2 stack-x-1">
											<span className="block">{title}</span>
											<span className="block font-sans text-xs tabular-nums leading-none">
												[{index + 1}]
											</span>
										</span>
									</span>
								</Link>
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
	{ title: 'Experience Matters', anchor: 'trial-experience-matters' },
	{ title: 'Diligent & Dedicated', anchor: 'diligence-and-dedication' },
	{ title: 'True Neutrality', anchor: 'true-neutrality' },
] as const;

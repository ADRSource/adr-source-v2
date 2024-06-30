import { draftMode } from 'next/headers';
import { getResources } from '~/api/resource';
import { ResourceCard } from '~/app/_components/resources/resource-card';
import { AutoGrid } from '~/components/auto-grid/auto-grid';
import { Container } from '~/components/container';
import { ButtonLink } from '~/components/ui/button';
import { heading } from '~/components/ui/text';

export async function BlockResources() {
	const preview = draftMode().isEnabled;
	const data = await getResources(3, undefined, preview);
	const { resources } = data;

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
					<AutoGrid count={3} itemMinWidth={350} gapX="24px" gapY="24px" className="relative z-20">
						{resources.map((r, i) => {
							const { resource, resourceType } = r;
							if (resource == null) return null;

							return <ResourceCard key={i} resource={resource} type={resourceType?.type} />;
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

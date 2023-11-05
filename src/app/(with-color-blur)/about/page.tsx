import { Metadata } from 'next';
import { getAboutPage } from '~/api/about';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const data = await getAboutPage();
		const { seo } = data.aboutPage ?? {};

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
				url: `${PATHS.absolute}${PATHS.about}`,
			},
		};
	} catch (_error) {
		console.error('Error generating metadata for about page');

		return {};
	}
}

export default function About() {
	return (
		<div className="isolate">
			<main className="relative z-20 min-h-screen">
				<div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-6">
					<div className="mx-auto max-w-[1058px] border-b border-brand-copper pb-6 stack-y-6">
						<h1
							className={heading({
								type: '3',
								className: 'text-center',
							})}
						>
							About
						</h1>
						<p
							className={heading({
								type: '5',
								className: '[text-wrap: balance] mx-auto text-center',
							})}
						>
							ADRsource exclusively provides mediation and arbitration services for the resolution
							of legal disputes. We are an independent stand-alone firm offering the services
							provided by full-time professional neutrals{' '}
						</p>
					</div>

					<ul className="mx-auto max-w-prose stack-y-6">
						{PAGE_CONTENT.map(({ title, body }) => {
							return (
								<li key={title} className="stack-y-3">
									<h2
										className={heading({
											type: '6',
										})}
									>
										{title}
									</h2>
									<p
										className={text({
											type: 'body',
										})}
									>
										{body}
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</main>
		</div>
	);
}

const PAGE_CONTENT = [
	{
		title: 'Who we are',
		body: `Our neutrals come from different trial backgrounds and work hard, stripped of all bias, to help those who entrust their disputes to us.`,
	},
	{
		title: 'Our values',
		body: `A professional commitment to the process, earning the trust of the participants, and working hard the way we would want neutrals to work hard for us guides us in all that we do.`,
	},
	{
		title: 'Let us help',
		body: `Finding the right neutral can be key to your success.`,
	},
];

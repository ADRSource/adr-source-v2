import { Metadata } from 'next';
import { Balancer } from 'react-wrap-balancer';
import { getAboutPage } from '~/api/about';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

export const revalidate = 300; // 5 minutes

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
								className: 'mx-auto text-center',
							})}
						>
							<Balancer>
								ADRsource exclusively provides mediation and arbitration services for the resolution
								of legal disputes. We are an independent stand-alone firm offering the services
								provided by full-time professional neutrals{' '}
							</Balancer>
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
									{body.map((paragraph, index) => {
										return (
											<p key={index} className={text({ type: 'body' })}>
												{paragraph}
											</p>
										);
									})}
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
		title: 'Trial experience matters',
		body: [
			`At ADRsource we believe that experienced trial lawyers are uniquely suited to be effective neutrals. This is because trial lawyers spend vast amounts of time and energy evaluating and reevaluating any given claim. It is this constancy of effort and attention to detail that allows a lawyer to refine their vision for how a judge or jury will process the presentation of a case. An effective mediator must arrive fully equipped with the capacity to appreciate the strengths and weaknesses of any given case just a trial lawyer does. The mediator, however, must be prepared to interact with the case in a highly concentrated manner. A strong background in trial practice is a necessary foundation to allow the accelerated learning and orientation required to understand the potential inflection points in the hypothetical trial of the case in order conduct an effective mediation.`,
			`Experience is similarly vital when serving as an arbitrator. The experience of arbitrating cases a litigator provides unique insight for adjudicating disputes in a manner that is at the same time fair and legally coherent.`,
			`At ADRsource, our neutrals have vast trial experience. We have collectively tried hundreds of cases including jury and bench trials, arbitrations and appellate proceedings in both the federal and state court systems, even including successful argument before the United States Supreme Court. While we are all now full time neutrals, we carry our trial credentials into every assignment.`,
		],
	},
	{
		title: 'Diligence & dedication',
		body: [
			`There are many points within a mediation where the parties perceive that settlement will not be possible. In fact, there are many occasions wherein one or more of the parties suggests that the process is a waste of time. These expressions of futility are often accompanied by an assessment that the other side is unreasonable in their assessment of the case.`,
			`This could certainly tempt the mediator to decide that perhaps an impasse is warranted. However, it is the role of the mediator to find a way to interject energy and creativity into the process in order to move the process through the sometimes frustrating chapters of a mediation where the process may seem hopeless.`,
			`The neutrals at ADRsource understand that it is in these difficult moments where a mediator adds the most value to the process. We do not give up. While we are required to allow a party to request an impasse, we are not required to make it easy for them to do so. We believe that the application of hard work and diligence can encourage the parties to navigate through the difficult and sometimes frustrating episodes toward meaningful negotiation and, ultimately, successful resolution.`,
		],
	},
	{
		title: 'True neutrality',
		body: [
			`ADRsource is a truly neutral platform. Founded by full time neutrals and operated for and by full time neutrals. In this era where alternative dispute resolution firms are sometimes owned and operated by larger corporate interests, ADRsource remains an independent stand-alone firm of neutrals.`,
		],
	},
] as const;

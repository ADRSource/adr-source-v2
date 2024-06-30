import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { Balancer } from 'react-wrap-balancer';
import { getAboutPage } from '~/api/about';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { getMetadataFromSeo } from '~/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const preview = draftMode().isEnabled;
		const data = await getAboutPage(preview);
		const { seo } = data.aboutPage ?? {};

		return getMetadataFromSeo(`${PATHS.absolute}${PATHS.about}`, seo);
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
					<div className="mx-auto max-w-[1058px] border-b border-brand-copper pb-6 stack-y-5">
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
								className: 'mx-auto text-center leading-tight',
							})}
							style={{ textTransform: 'none' }}
						>
							<Balancer>
								ADRsource is a fully independent organization designed and operated by professional
								neutrals. We foster excellence in the field of alternative dispute resolution by
								providing a level of service and effectiveness that sets us apart from other firms.
							</Balancer>
						</p>
					</div>

					<ul className="mx-auto max-w-prose stack-y-6">
						{PAGE_CONTENT.map(({ title, body, anchor }) => {
							return (
								<li key={title} className="stack-y-3">
									<h2
										id={anchor}
										className={heading({
											type: '6',
											className:
												'scroll-mt-[calc(var(--nav-height)_+_(theme(spacing.2)_*_2))] capitalize',
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
		anchor: 'trial-experience-matters',
		body: [
			`We believe that experienced trial lawyers are uniquely suited to be effective neutrals. This is because trial lawyers spend vast amounts of time and energy evaluating and reevaluating any given claim. It is this constancy of effort and attention to detail that allows a lawyer to refine their vision for how a judge or jury will process the presentation of a case. An effective mediator must arrive fully equipped with the capacity to appreciate the strengths and weaknesses of any given case just as a trial lawyer does. The mediator, however, must be prepared to interact with the case in a highly concentrated manner. A strong background in trial practice is a necessary foundation to allow the accelerated learning and orientation required to understand the potential inflection points in the hypothetical trial of the case in order to conduct an effective mediation.`,
			`Experience is similarly vital when serving as an arbitrator. The experience of arbitrating cases as a litigator provides unique insight for adjudicating disputes in a manner that is both fair and legally coherent.`,
			`Our neutrals have vast trial experience. We have collectively tried hundreds of cases including jury and bench trials, arbitrations and appellate proceedings in both the federal and state court systems, even including successful argument before the United States Supreme Court. While we are all now full-time neutrals, we carry our trial credentials into every assignment.`,
		],
	},
	{
		title: 'Diligence & dedication',
		anchor: 'diligence-and-dedication',
		body: [
			`There are many points within a mediation where the parties perceive that settlement will not be possible. In fact, there are many occasions wherein one or more of the parties suggests that the process is a waste of time. These expressions of futility are often accompanied by an assessment that the other side is unreasonable in their assessment of the case.`,
			`This could certainly tempt the mediator to decide that perhaps an impasse is warranted. However, it is the role of the mediator to find a way to interject energy and creativity into the process in order to move through the most challenging chapters of a negotiation. It is in these difficult moments where a mediator adds the most value to the process.`,
		],
	},
	{
		title: 'True neutrality',
		anchor: 'true-neutrality',
		body: [
			`ADRsource is a fully neutral organization founded by full-time neutrals and operated for and by full-time neutrals. In this era where alternative dispute resolution firms are sometimes owned and operated by larger corporate interests, ADRsource remains an independent stand-alone firm of neutrals.`,
		],
	},
] as const;

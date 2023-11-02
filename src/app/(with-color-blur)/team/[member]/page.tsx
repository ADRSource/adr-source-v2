import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { IconButtonLink } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';

export const generateMetadata = ({ params }: { params: { member: string } }): Metadata => {
	// TODO: Update this to pull data from the CMS
	return {
		title: params.member,
		openGraph: {
			title: params.member,
		},
	};
};

export default function Member() {
	return (
		<div className="isolate">
			<main className="min-h-screen">
				<div className="mx-auto w-full max-w-[1750px] pb-7">
					<div className="relative overflow-x-clip px-2 pt-6 stack-y-4">
						<h1
							className={heading({
								type: '3',
								className: 'text-center',
							})}
						>
							Richard B. Lord
						</h1>
						<div className="hidden md:block">
							<CallToActionBar />
						</div>
					</div>
					<div className="grid grid-cols-1 justify-items-center divide-brand-copper/40 border-b border-brand-copper/40 md:grid-cols-2 md:divide-x">
						<div className="px-2 py-6 stack-y-5 md:stack-y-4">
							<div className="relative aspect-[9/10] w-full max-w-[449px] overflow-clip rounded-lg">
								<Image
									priority
									alt="Richard Lord"
									src="/images/team/richard-headshot.jpg"
									className="grayscale"
									fill
									sizes="(max-width: 498px) 100vw, (max-width: 768px) 449px, (max-width: 1039px) 44vw, 449px"
									style={{ objectFit: 'cover', objectPosition: 'center top' }}
								/>
							</div>
							<div className="block md:hidden">
								<CallToActionBar />
							</div>
							<div
								className={text({
									type: 'body',
									className: 'w-full max-w-[449px] px-2 stack-y-[1em] md:px-0',
								})}
							>
								<h2 className="block font-medium uppercase md:hidden">Richard&apos;s Bio</h2>
								<p>
									Richard, a member of the Florida Bar since 1990, has mediated thousands of cases,
									and mediates both online and in person. He is a Diplomate Member of the National
									Academy of Distinguished Neutrals, a Fellow of the American College of Civil Trial
									Mediators and a Fellow of the American Bar Foundation.
								</p>
								<p>
									He mediates a broad range of civil litigation matters including professional
									liability, nursing home & ALF, auto, first-party insurance, premises, negligent
									security, breach of contract, ERISA, eminent domain, and employment claims. He is
									a frequent lecturer on ADR topics and is an active member of the American Bar
									Association Section of Dispute Resolution. Richard has served on the governing
									council of the ABA Section of Dispute Resolution and as co-chair of its Mediation
									and Membership Committees.
								</p>
							</div>
						</div>
						<div className="w-full px-2 py-6">
							<div className="mx-auto max-w-[380px] stack-y-4">
								<div>
									<h2 className="sr-only">Basic Information</h2>
									<ul className="stack-y-1">
										<li className="rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-base font-bold text-brand-copper">
											<p>Role: Neutral</p>
										</li>
										<li className="rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-base font-bold text-brand-copper">
											<p>Years of experience: 32</p>
										</li>
										<li className="rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-base font-bold text-brand-copper">
											<p>Area of operation: Statewide</p>
										</li>
										<li className="linkbox relative flex justify-between rounded-lg border border-solid border-brand-copper/5 bg-brand-black p-2 text-base font-bold text-brand-copper">
											<p>Case manager: Norma Abreu</p>
											<IconButtonLink
												aria-label="Visit Norma's page"
												className="linkOverlay"
												href={`${PATHS.team}/norma-abreu`}
											>
												<IconArrowTopRight aria-hidden />
											</IconButtonLink>
										</li>
									</ul>
								</div>
								<div className="stack-y-3">
									<h2 className={heading({ type: '6' })}>Areas of focus</h2>
									<ul className="grid grid-cols-2 gap-x-2 gap-y-1">
										{AREA_OF_FOCUS.map((area) => {
											return (
												<li key={area}>
													<p className="text-sm">{area}</p>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

const AREA_OF_FOCUS = [
	'Assisted Living Facilities',
	'Automobile',
	'Bad Faith',
	'Business Disputes',
	'Civil Rights',
	'Commercial',
	'Construction',
	'Contract',
	'Employment',
	'ERISA',
	'Eminent Domain',
	'Family',
	'First Party Insurance',
	'Foreclosure',
	'Healthcare',
	'Homeowners Association',
	'Insurance',
	'Landlord/Tenant',
	'Legal Malpractice',
	'Medical Malpractice',
	'Nursing Home',
	'Personal Injury',
	'Premises Liability',
	'Probate',
	'Product Liability',
	'Professional Liability',
	'Real Estate',
	'Securities',
	'Trusts & Estates',
	'Wrongful Death',
];

function CallToActionBar() {
	return (
		<nav className="divide-y divide-brand-copper border-y border-solid border-brand-copper md:justify-between md:divide-y-0 md:py-2 md:stack-x-2">
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href="mailto:richard@adrsource.com"
			>
				richard@adrsource.com
			</Link>
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href="tel:(888)-741-2224"
			>
				(888) 741-2224
			</Link>
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href="https://www.linkedin.com/in/floridamediator"
			>
				LinkedIn
			</Link>
			<Link
				className="block py-2 text-xs font-medium uppercase leading-none md:py-0 md:text-center"
				href={PATHS.schedule}
			>
				Calendar
			</Link>
		</nav>
	);
}

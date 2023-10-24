import { Metadata } from 'next';
import { ColorBlurContainer } from '~/components/color-blur-container';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import { MemberListItem } from '../../components/member-list-item';

const TITLE = 'Our Team';
const DESCRIPTION = `At ADRsource, we are proud to have a team of highly experienced and skilled mediators. You can learn more about our mediators and find the right one for your dispute by visiting our team page and clicking on the individual mediators' profiles. Don't let your dispute linger any longer, take the first step towards resolution with ADRsource.`;
export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: `${PATHS.absolute}${PATHS.team}`,
		type: 'website',
		locale: 'en_US',
	},
};

export default function Team() {
	return (
		<div className="isolate">
			<ColorBlurContainer />
			<main className="relative z-20 min-h-screen">
				<div className="relative overflow-x-clip px-2 pb-7 pt-6 stack-y-4">
					<h1
						className={heading({
							type: '3',
							className: 'text-center',
						})}
					>
						Team
					</h1>

					<ul className="mx-auto max-w-[1058px]">
						{TEAM_MEMBERS.map((member) => {
							return (
								<MemberListItem key={member.name} member={member}>
									<p
										className={text({
											type: 'body',
											className: 'leading-none',
										})}
									>
										{member.role}
									</p>
								</MemberListItem>
							);
						})}
					</ul>
				</div>
			</main>
		</div>
	);
}

const TEAM_MEMBERS = [
	{
		name: 'Scott Baughan',
		url: '/team/scott-baughan',
		headshot: '/images/team/scott-headshot.jpg',
		role: 'Neutral',
	},
	{
		name: 'Richard Lord',
		url: '/team/richard-lord',
		headshot: '/images/team/richard-headshot.jpg',
		role: 'Neutral',
	},
	{
		name: 'Bob Henry',
		url: '/team/bob-henry',
		headshot: '/images/team/bob-henry-headshot.jpeg',
		role: 'Neutral',
	},
	{
		name: 'Andy Hament',
		url: '/team/andy-hament',
		headshot: '/images/team/andy-hament-headshot.jpg',
		role: 'Neutral',
	},
	{
		name: 'Norma Abreu',
		url: '/team/norma-abreu',
		headshot: '/images/team/andy-hament-headshot.jpg',
		role: 'Case Manager',
	},
	{
		name: 'Paulina Carrasco',
		url: '/team/paulina-carrasco',
		headshot: '/images/team/andy-hament-headshot.jpg',
		role: 'Case Manager',
	},
];

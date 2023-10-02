import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';
import { ListItem } from './list-item';

export function BlockTeam() {
	return (
		<Container>
			<div className="relative overflow-x-clip py-6 stack-y-4">
				<h2
					className={heading({
						type: '3',
						className: 'text-center',
					})}
				>
					Team
				</h2>
				<div>
					<ul className="mx-auto max-w-[1058px]">
						{TEAM_MEMBERS.map((member) => {
							return <ListItem key={member.name} member={member} />;
						})}
					</ul>
				</div>
			</div>
		</Container>
	);
}

const TEAM_MEMBERS = [
	{
		name: 'Scott Baughan',
		url: '/team/scott-baughan',
		headshot: '/images/team/scott-headshot.jpg',
	},
	{
		name: 'Richard Lord',
		url: '/team/richard-lord',
		headshot: '/images/team/richard-headshot.jpg',
	},
	{
		name: 'Bob Henry',
		url: '/team/bob-henry',
		headshot: '/images/team/bob-henry-headshot.jpeg',
	},
	{
		name: 'Andy Hament',
		url: '/team/andy-hament',
		headshot: '/images/team/andy-hament-headshot.jpg',
	},
];

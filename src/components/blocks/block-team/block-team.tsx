import { getNeutralsList } from '~/api/team';
import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';
import { MemberListItem } from '../../member-list-item';

export async function BlockTeam() {
	const result = await getNeutralsList();
	const { neutrals } = result;

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
						{neutrals.map(({ memberPage }) => {
							const { member, slug } = memberPage ?? {};

							if (!member || member.__typename !== 'Neutral') return null;

							const m = {
								url: slug ?? '',
								name: member.info.name,
								headshot: member.info.headshot.url,
							};

							return <MemberListItem key={member.id} member={m} />;
						})}
					</ul>
				</div>
			</div>
		</Container>
	);
}

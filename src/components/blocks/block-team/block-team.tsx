import { getNeutralsList } from '~/api/member';
import { Container } from '~/components/container';
import { extractMemberFromNeutral } from '~/components/member-list-item/extract-member-neutral';
import { MemberListItem } from '~/components/member-list-item/member-list-item';
import { heading } from '~/components/ui/text';

export async function BlockTeam() {
	const result = await getNeutralsList();
	const { neutralList } = result;

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
					<ul className="relative mx-auto max-w-[1058px]">
						{neutralList?.neutrals.map((neutral) => {
							const member = extractMemberFromNeutral(neutral);

							if (!member) return null;

							return <MemberListItem key={neutral.id} member={member} />;
						})}
					</ul>
				</div>
			</div>
		</Container>
	);
}

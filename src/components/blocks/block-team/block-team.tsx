import { getNeutralsList } from '~/api/team';
import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';
import { MemberListItem } from '../../member-list-item';

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
					<ul className="mx-auto max-w-[1058px]">
						{neutralList?.neutrals.map((neutral) => {
							const { memberPage } = neutral;
							const { slug } = memberPage ?? {};

							if (!memberPage) return null;

							const m = {
								url: slug ?? '',
								name: neutral.info.name,
								headshot: neutral.info.headshot.url,
							};

							return <MemberListItem key={neutral.id} member={m} />;
						})}
					</ul>
				</div>
			</div>
		</Container>
	);
}

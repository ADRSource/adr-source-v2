import { Container } from '~/components/container';
import { heading } from '~/components/ui/text';

export function BlockAbout() {
	return (
		<Container>
			<div className="relative py-7 stack-y-3">
				<h2
					className={heading({
						type: '3',
						className: 'text-center md:text-left',
					})}
				>
					About
				</h2>
			</div>
		</Container>
	);
}

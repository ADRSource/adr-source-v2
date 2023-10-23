import { ColorBlurContainer } from '~/components/color-blur-container';
import { heading } from '~/components/ui/text';

export default function Member() {
	return (
		<div className="isolate">
			<ColorBlurContainer />
			<main className="min-h-screen">
				<div className="relative overflow-x-clip py-6 stack-y-4">
					<h1
						className={heading({
							type: '3',
							className: 'text-center',
						})}
					>
						Member
					</h1>
				</div>
			</main>
		</div>
	);
}

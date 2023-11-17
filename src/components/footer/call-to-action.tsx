import { PATHS } from '~/constants/paths.constants';
import { ButtonLink } from '../ui/button';
import { Marquee } from './marquee';

export function CallToAction() {
	return (
		<div className="grid grid-cols-1 grid-rows-1 place-items-center border-y border-brand-black">
			<Marquee text="When it counts. " />
			<div className="relative z-20 col-span-full row-span-full">
				<ButtonLink href={PATHS.schedule} size="large" outline="black">
					Schedule
				</ButtonLink>
			</div>
		</div>
	);
}

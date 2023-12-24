import { IconCalendar } from '~/components/icons/IconCalendar';
import { PATHS } from '~/constants/paths.constants';
import { ButtonLink } from '../ui/button';
import { Marquee } from './marquee';

const MARQUEE_TEXT = ['Experienced', 'Trusted', 'Neutral', 'Diligent', 'Persistent'].join(' · ');

export function CallToAction() {
	return (
		<div className="grid grid-cols-1 grid-rows-1 place-items-center border-y border-brand-black">
			<Marquee text={MARQUEE_TEXT + ' · '} />
			<div className="relative z-20 col-span-full row-span-full">
				<ButtonLink href={PATHS.schedule} icon={<IconCalendar />} size="large" outline="black">
					Scheduling
				</ButtonLink>
			</div>
		</div>
	);
}

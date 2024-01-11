import { IconCalendar } from '~/components/icons/IconCalendar';
import { PATHS } from '~/constants/paths.constants';
import { ButtonLink } from '../ui/button';
import { Marquee } from './marquee';

const MARQUEE_TEXT = ['Experienced', 'Trusted', 'Neutral', 'Diligent'].join(' · ');

export function CallToAction() {
	return (
		<div className="stack-y-5 md:stack-y-6">
			<div className="flex w-full justify-center">
				<ButtonLink href={PATHS.schedule} icon={<IconCalendar />} size="large" outline="black">
					Scheduling
				</ButtonLink>
			</div>
			<div className="border-y border-brand-black/25 py-2">
				<Marquee text={MARQUEE_TEXT + ' · '} />
			</div>
		</div>
	);
}

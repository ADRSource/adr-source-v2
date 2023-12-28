import * as React from 'react';
import { ColorBlurContainer } from '~/components/color-blur-container';

export default function ColorBlurLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="z-20 flex-1 pt-[var(--nav-spacing)]">{children}</div>
			<div className="absolute inset-0 z-10 h-full w-full overflow-clip">
				<ColorBlurContainer />
			</div>
		</>
	);
}

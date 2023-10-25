import * as React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-20 flex-1 pt-[calc(theme(spacing.1)_+_theme(spacing.nav-height))] md:pt-[calc(theme(spacing.2)_+_theme(spacing.nav-height))]">
			{children}
		</div>
	);
}

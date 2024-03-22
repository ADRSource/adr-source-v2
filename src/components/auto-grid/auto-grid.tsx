'use client';
import * as React from 'react';
import useMeasure from 'react-use-measure';
import { twMerge } from 'tailwind-merge';
import styles from './auto-grid.module.css';

type AutoGridProps = React.ComponentPropsWithoutRef<'div'> & {
	count: number;
	itemMinWidth: number;
	gapX?: string;
	gapY?: string;
};

export const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
	(
		{ count, itemMinWidth, gapX, gapY = '8px', className, style, children, ...rest },
		forwardedRef,
	) => {
		const noGapX = gapX == undefined;
		const noGapXStyles = {
			gridTemplateColumns: `repeat(auto-fill, minmax(max(var(--grid-item-min-width), calc(100% / ${count.toString()})), 1fr))`,
		};
		// Measuring if actual width of container is below the min width.
		// if so, then we want to set gtc to 1fr
		const [ref, { width }] = useMeasure({ debounce: 250 });

		return (
			<div ref={ref}>
				<div
					{...rest}
					style={
						{
							...style,
							'--grid-column-count': count,
							'--grid-item-min-width': `${itemMinWidth.toString()}px`,
							'--grid-layout-gap-x': gapX ?? '0',
							'--grid-layout-gap-y': gapY,
							...(noGapX ? noGapXStyles : {}),
							...(width && width <= itemMinWidth ? { gridTemplateColumns: '1fr' } : {}),
						} as React.CSSProperties
					}
					className={twMerge(className, styles.root)}
					ref={forwardedRef}
				>
					{children}
				</div>
			</div>
		);
	},
);

AutoGrid.displayName = 'AutoGrid';

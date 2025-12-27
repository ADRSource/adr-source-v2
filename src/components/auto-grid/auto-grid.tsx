'use client';
import { motion, type Variants } from 'framer-motion';
import * as React from 'react';
import useMeasure from 'react-use-measure';
import { twMerge } from 'tailwind-merge';
import styles from './auto-grid.module.css';

type AutoGridProps = React.ComponentPropsWithoutRef<'div'> & {
  count: number;
  itemMinWidth: number;
  gapX?: string;
  gapY?: string;
  stagger?: boolean;
};

type GridStyle = React.CSSProperties & {
  '--grid-column-count'?: number;
  '--grid-item-min-width'?: string;
  '--grid-layout-gap-x'?: string;
  '--grid-layout-gap-y'?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
      mass: 0.5,
    },
  },
};

export const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
  (
    { count, itemMinWidth, gapX, gapY = '8px', className, style, children, stagger = false, ...rest },
    forwardedRef,
  ) => {
    const noGapX = gapX === undefined;
    const noGapXStyles = {
      gridTemplateColumns: `repeat(auto-fill, minmax(max(var(--grid-item-min-width), calc(100% / ${count.toString()})), 1fr))`,
    };
    // Measuring if actual width of container is below the min width.
    // if so, then we want to set gtc to 1fr
    const [ref, { width }] = useMeasure({ debounce: 250 });

    const gridElement = (
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
          } as GridStyle
        }
        className={twMerge(className, styles.root)}
        ref={forwardedRef}
      >
        {children}
      </div>
    );

    if (stagger) {
      return (
        <div ref={ref}>
          <motion.div
            style={
              {
                ...style,
                '--grid-column-count': count,
                '--grid-item-min-width': `${itemMinWidth.toString()}px`,
                '--grid-layout-gap-x': gapX ?? '0',
                '--grid-layout-gap-y': gapY,
                ...(noGapX ? noGapXStyles : {}),
                ...(width && width <= itemMinWidth ? { gridTemplateColumns: '1fr' } : {}),
              } as GridStyle
            }
            className={twMerge(className, styles.root)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return (
                  <motion.div key={index} variants={itemVariants} className={styles.gridItem}>
                    {child}
                  </motion.div>
                );
              }
              return child;
            })}
          </motion.div>
        </div>
      );
    }

    return <div ref={ref}>{gridElement}</div>;
  },
);

AutoGrid.displayName = 'AutoGrid';

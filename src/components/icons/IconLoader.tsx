import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './IconLoader.module.css';

interface IconLoaderProps extends React.ComponentPropsWithoutRef<'svg'> {
  animate?: boolean;
}
export const IconLoader = React.forwardRef<SVGSVGElement, IconLoaderProps>(
  ({ animate = false, className, ...rest }, ref) => {
    return (
      <svg
        {...rest}
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge(animate ? styles.animation : '', className)}
      >
        <path d="M4.92999 4.92999L7.75999 7.75999" style={getAnimateStyles(7)} />
        <path d="M2 12H6" stroke="currentColor" style={getAnimateStyles(6)} />
        <path d="M4.92999 19.07L7.75999 16.24" stroke="currentColor" style={getAnimateStyles(5)} />
        <path d="M12 18V22" stroke="currentColor" style={getAnimateStyles(4)} />
        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" style={getAnimateStyles(3)} />
        <path d="M18 12H22" stroke="currentColor" style={getAnimateStyles(2)} />
        <path d="M16.24 7.75999L19.07 4.92999" stroke="currentColor" style={getAnimateStyles(1)} />
        <path d="M12 2V6" stroke="currentColor" style={getAnimateStyles(0)} />
      </svg>
    );
  },
);

function getAnimateStyles(index: number) {
  const total = 8;
  const duration = 1200;
  const delay = index * (duration / total);

  return {
    animationDelay: `${String(delay)}ms`,
  };
}

IconLoader.displayName = 'IconLoader';

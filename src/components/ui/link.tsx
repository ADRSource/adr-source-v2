import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { IconArrowTopRight } from '../icons/IconArrowTopRight';

interface IconLinkProps
	extends Omit<React.ComponentPropsWithoutRef<'a'>, keyof LinkProps>,
		LinkProps {
	children?: React.ReactNode;
	icon?: React.ReactNode;
}
export const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
	({ children, className, icon, ...rest }, ref) => {
		return (
			<Link {...rest} ref={ref} className={twMerge('items-center stack-x-[4px]', className)}>
				<span className="flex">{children}</span>
				{icon ?? <IconArrowTopRight aria-hidden />}
			</Link>
		);
	},
);
IconLink.displayName = 'IconLink';

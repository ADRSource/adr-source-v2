import Link from 'next/link';
import * as React from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import { IconArrowTopRight } from '../icons/IconArrowTopRight';

interface ButtonLinkProps
	extends VariantProps<typeof root>,
		Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {
	href: string;
	children?: React.ReactNode;
}
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	({ className, size, children, ...rest }, ref) => {
		return (
			<Link
				{...rest}
				ref={ref}
				className={root({
					size,
					className,
				})}
			>
				<span>{children}</span>
				<IconArrowTopRight
					aria-hidden
					className={icon({
						size,
					})}
				/>
			</Link>
		);
	},
);
ButtonLink.displayName = 'ButtonLink';

const root = tv({
	base: 'font-sans stack-x-[calc(theme(spacing.1)_/_2)]/inline items-center bg-white ring-1 ring-brand-copper rounded-full uppercase font-medium text-brand-black leading-none select-none',
	variants: {
		size: {
			medium: 'min-h-[30px] px-2 py-1 text-small',
			large: 'min-h-[50px] px-3 py-[20px] text-1',
		},
	},
	defaultVariants: {
		size: 'medium',
	},
});

const icon = tv({
	base: 'w-[15px] h-[15px]',
	variants: {
		size: {
			medium: 'w-[15px] h-[15px]',
			large: 'w-[28px] h-[28px]',
		},
	},
	defaultVariants: {
		size: 'medium',
	},
});

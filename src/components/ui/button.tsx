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
	({ className, size, outline, children, ...rest }, ref) => {
		return (
			<Link
				{...rest}
				ref={ref}
				className={root({
					size,
					outline,
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

const root = tv(
	{
		base: 'decoration-inherit font-sans stack-x-[4px]/inline items-center bg-white border border-solid rounded-full uppercase font-medium leading-none select-none',
		variants: {
			size: {
				small: 'min-h-[30px] px-2 py-1 text-xs text-brand-black',
				large: 'min-h-[50px] px-3 py-[20px] ring-offset-3 text-xl text-brand-black',
			},
			outline: {
				copper:
					'focus-visible:ring-brand-copper border-brand-copper focus-visible:ring-offset-brand-black',
				black:
					'focus-visible:ring-brand-black border-brand-black focus-visible:ring-offset-brand-copper',
			},
		},
		defaultVariants: {
			size: 'small',
			outline: 'copper',
		},
	},
	{
		responsiveVariants: ['md'],
	},
);

const icon = tv(
	{
		base: 'w-[15px] h-[15px]',
		variants: {
			size: {
				small: 'w-[15px] h-[15px]',
				large: 'w-[28px] h-[28px]',
			},
		},
	},
	{
		responsiveVariants: ['md'],
	},
);

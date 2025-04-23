import { cva, VariantProps } from 'cva';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import { IconArrowTopRight } from '../icons/IconArrowTopRight';

interface ButtonLinkProps
  extends VariantProps<typeof root>,
    Omit<React.ComponentPropsWithoutRef<'a'>, keyof LinkProps>,
    LinkProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, icon, size, stripped, outline, children, ...rest }, ref) => {
    return (
      <Link
        {...rest}
        ref={ref}
        className={root({
          size,
          outline,
          stripped,
          className,
        })}
      >
        {children}
        <span aria-hidden className={iconStyles({ size, className: 'min-w-0' })}>
          {icon ?? <IconArrowTopRight />}
        </span>
      </Link>
    );
  },
);
ButtonLink.displayName = 'ButtonLink';

export const root = cva({
  base: 'decoration-inherit font-sans stack-x-[4px]/inline items-center bg-white border border-solid rounded-full uppercase font-medium leading-none select-none',
  variants: {
    size: {
      small: 'min-h-[30px] px-2 py-1 text-xs text-brand-black stack-x-[4px]/inline',
      large:
        'min-h-[50px] px-3 py-[20px] ring-offset-3 text-xl text-brand-black stack-x-[8px]/inline',
    },
    outline: {
      copper:
        'focus-visible:ring-brand-copper border-brand-copper focus-visible:ring-offset-brand-black',
      black:
        'focus-visible:ring-brand-black border-brand-black focus-visible:ring-offset-brand-copper',
    },
    stripped: {
      true: 'bg-transparent border-0 text-white',
    },
  },
  defaultVariants: {
    size: 'small',
    outline: 'copper',
  },
});

const iconStyles = cva({
  base: 'grid place-items-center',
  variants: {
    size: {
      small: 'w-[15px] h-[15px]',
      large: 'w-[28px] h-[28px]',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface IconButtonLinkProps
  extends VariantProps<typeof circleButtonRoot>,
    Omit<React.ComponentPropsWithoutRef<'a'>, keyof LinkProps>,
    LinkProps {
  children?: React.ReactNode;
}
export const CircleButton = React.forwardRef<HTMLAnchorElement, IconButtonLinkProps>(
  ({ className, size, ghost, children, ...rest }, ref) => {
    return (
      <Link
        {...rest}
        ref={ref}
        className={circleButtonRoot({
          size,
          ghost,
          className,
        })}
      >
        {children}
      </Link>
    );
  },
);
CircleButton.displayName = 'IconButtonLink';

const circleButtonRoot = cva({
  base: 'group text-black bg-white rounded-full grid place-items-center border border-solid border-brand-copper',
  variants: {
    size: {
      small: 'h-[30px] w-[30px]',
    },
    outline: {
      copper:
        'focus-visible:ring-brand-copper border-brand-copper focus-visible:ring-offset-brand-black',
      black:
        'focus-visible:ring-brand-black border-brand-black focus-visible:ring-offset-brand-copper',
    },
    ghost: {
      true: 'bg-brand-black text-brand-copper border-brand-copper/25 hover:border-brand-copper transition-colors',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

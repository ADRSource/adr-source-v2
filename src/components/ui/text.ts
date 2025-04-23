import { cva } from 'cva';

export const heading = cva({
  base: 'text-left font-normal leading-none',
  variants: {
    type: {
      '1': 'text-super font-serif',
      '2': 'text-10xl font-serif',
      '3': 'text-heading-3 font-serif',
      '4': 'text-heading-4 font-serif',
      '5': 'text-heading-5 font-sans uppercase tracking-tighter',
      '6': 'text-xl font-medium md:text-2xl font-sans',
    },
  },
  defaultVariants: {
    type: '4',
  },
});

export const text = cva({
  base: 'text-left leading-tight font-normal font-sans',
  variants: {
    type: {
      body: 'text-lg max-w-prose w-full',
      legal: 'text-xs',
      highlight: 'text-base font-semibold',
      tag: 'text-xs uppercase tracking-tighter',
    },
  },
  defaultVariants: {
    type: 'body',
  },
});

import { tv } from 'tailwind-variants';

export const heading = tv({
	base: 'text-left font-normal',
	variants: {
		type: {
			'1': 'text-super font-serif',
			'2': 'text-10xl font-serif',
			'3': `text-heading-3 font-serif leading-none`,
			'4': 'text-8xl font-serif',
			'5': 'text-5xl font-sans uppercase tracking-tighter',
			'6': 'text-2xl font-sans',
		},
	},
	defaultVariants: {
		type: '4',
	},
});

export const text = tv({
	base: 'text-left leading-tight font-normal font-sans',
	variants: {
		type: {
			body: 'text-base max-w-prose',
			legal: 'text-xs',
			highlight: 'text-base font-semibold',
			tag: 'text-xs uppercase tracking-tighter',
		},
	},
	defaultVariants: {
		type: 'body',
	},
});

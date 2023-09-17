import { tv } from 'tailwind-variants';

export const heading = tv({
	base: 'text-left leading-none font-normal text-brand-black',
	variants: {
		type: {
			1: 'text-9 font-serif',
			2: 'text-8 font-serif',
			3: 'text-7 font-serif',
			4: 'text-4 font-serif',
			5: 'text-4 font-sans uppercase tracking-tighter',
			6: 'text-2 font-sans',
		},
	},
});

export const text = tv({
	base: 'text-left leading-tight font-normal font-sans text-brand-black',
	variants: {
		type: {
			body: 'text-base',
			legal: 'text-small',
			highlight: 'text-base font-semibold',
			tag: 'text-small uppercase tracking-tighter',
		},
	},
});

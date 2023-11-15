import { withTV } from 'tailwind-variants/transformer';
import { Config } from 'tailwindcss';
import { createFluidValue } from './tailwind/create-fluid-value';
import debug from './tailwind/plugins/debug';
import inset from './tailwind/plugins/inset';
import linkbox from './tailwind/plugins/linkbox';
import stack from './tailwind/plugins/stack';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],

	theme: {
		extend: {
			fontFamily: {
				sans: 'var(--font-sans)',
				serif: 'var(--font-serif)',
				primary: 'var(--font-sans)',
			},
			colors: {
				brand: {
					black: '#1B1B1B',
					copper: '#F8C596',
					toffee: '#e0a76d',
					red: '#BB5C52',
					green: '#46A758',
					blue: '#0090FF',
				},
			},
			fontSize: {
				'10xl': '12.5rem', // 200px
				super: '17.5rem', // 280px
				'heading-3': createFluidValue(48, 128),
				'heading-4': createFluidValue(48, 96),
				'heading-5': createFluidValue(24, 48),
			},
			maxWidth: {
				block: '1600px',
			},
		},
		spacing: {
			0: '0',
			1: '8px',
			2: createFluidValue(16, 24),
			3: createFluidValue(24, 40),
			4: createFluidValue(32, 64),
			5: createFluidValue(40, 80),
			6: createFluidValue(64, 120),
			7: createFluidValue(120, 240),
			'nav-height': 'var(--nav-height)',
		},
	},
	plugins: [stack, linkbox, debug, inset, require('@tailwindcss/typography')],
	future: {
		hoverOnlyWhenSupported: true,
	},
};

export default withTV(config);

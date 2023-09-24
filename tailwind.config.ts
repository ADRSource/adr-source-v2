import { withTV } from 'tailwind-variants/transformer';
import { Config } from 'tailwindcss';
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
					red: '#BB5C52',
					green: '#46A758',
					blue: '#0090FF',
				},
			},
			fontSize: {
				'10xl': '12.5rem', // 200px
				super: '17.5rem', // 280px
			},
		},
		spacing: {
			0: '0',
			1: '8px',
			2: '24px',
			3: '40px',
			4: '56px',
			5: '80px',
			6: '120px',
			7: '240px',
			'nav-height': 'var(--nav-height)',
		},
	},
	plugins: [stack, linkbox, debug, inset],
};

export default withTV(config);

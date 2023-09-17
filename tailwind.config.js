const stack = require('./tailwind/plugins/stack');
const linkbox = require('./tailwind/plugins/linkbox');
const debug = require('./tailwind/plugins/debug');
const inset = require('./tailwind/plugins/inset');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],

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

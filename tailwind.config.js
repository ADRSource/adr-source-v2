const { withTV } = require('tailwind-variants/transformer');
const stack = require('./tailwind/plugins/stack');
const linkbox = require('./tailwind/plugins/linkbox');
const debug = require('./tailwind/plugins/debug');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

	theme: {
		fontFamily: {
			sans: 'var(--font-sans)',
			serif: 'var(--font-serif)',
			primary: 'var(--font-sans)',
		},
		extend: {
			colors: {
				brand: {
					black: '#1B1B1B',
					copper: '#F8C596',
					red: '#BB5C52',
					green: '#46A758',
					blue: '#0090FF',
				},
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
		},
		fontSize: {
			small: '12px',
			base: '16px',
			1: '20px',
			2: '24px',
			3: '32px',
			4: '48px',
			5: '64px',
			6: '96px',
			7: '128px',
			8: '200px',
			9: '280px',
		},
	},
	plugins: [stack, linkbox, debug],
});

const { withTV } = require('tailwind-variants/transformer');
const stack = require('./tailwind/plugins/stack');
const linkbox = require('./tailwind/plugins/linkbox');
const debug = require('./tailwind/plugins/debug');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

	theme: {
		extend: {
			colors: {
				gold: '#d6a06f',
			},
		},
		spacing: {
			0: '0',
			1: '5px',
			2: '10px',
			3: '20px',
			4: '40px',
			5: '60px',
			6: '80px',
			7: '120px',
			8: '240px',
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
			7: '140px',
		},
	},
	plugins: [stack, linkbox, debug],
});

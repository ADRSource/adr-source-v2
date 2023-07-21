const { withTV } = require('tailwind-variants/transformer');
const stack = require('./tailwind/plugins/stack');
const linkbox = require('./tailwind/plugins/linkbox');
const debug = require('./tailwind/plugins/debug');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			black: 'var(--colors-black)',
			white: 'var(--colors-white)',
			gold: 'var(--colors-gold)',
			token: {
				accent: 'var(--colors-accent)',
			},
		},
		borderColor: {
			token: {
				base: 'var(--colors-border-base)',
				'btn-border': 'var(--colors-btn-border)',
			},
		},
		textColor: {
			token: {
				base: 'var(--colors-text-base)',
				accent: 'var(--colors-text-accent)',
				'btn-content': 'var(--colors-btn-content)',
				'nav-content': 'var(--colors-nav-content)',
				'nav-link': 'var(--colors-nav-link)',
				'nav-link-active': 'var(--colors-nav-link-active)',
			},
		},
		boxShadowColor: {
			token: {
				'btn-ring': 'var(--colors-btn-ring)',
			},
		},
		backgroundColor: {
			token: {
				base: 'var(--colors-bg-base)',
				'btn-bg': 'var(--colors-btn-bg)',
				'nav-bg': 'var(--colors-nav-bg)',
			},
		},
	},
	plugins: [stack, linkbox, debug],
});

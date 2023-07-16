const { withTV } = require('tailwind-variants/transformer');
const stack = require('./tailwind/plugins/stack');
const linkbox = require('./tailwind/plugins/linkbox');
const debug = require('./tailwind/plugins/debug');

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {},
	},
	plugins: [stack, linkbox, debug],
});

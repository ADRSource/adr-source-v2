const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, theme }) {
	addUtilities({
		'.debug': {
			outline: '1px solid red',
		},
		'.debug-children': {
			'& > *': {
				outline: '1px solid red',
			},
		},
	});
});

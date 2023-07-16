const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			'stack-y': (value, { modifier }) => {
				const BASE_STYLE = {
					'flex-direction': 'column',
					gap: value,
				};
				if (modifier === 'inline') {
					return {
						display: 'inline-flex',
						...BASE_STYLE,
					};
				}
				return {
					display: 'flex',
					...BASE_STYLE,
				};
			},
			'stack-x': (value, { modifier }) => {
				const BASE_STYLE = {
					'flex-direction': 'row',
					gap: value,
				};
				if (modifier === 'inline') {
					return {
						display: 'inline-flex',
						...BASE_STYLE,
					};
				}
				return {
					display: 'flex',
					...BASE_STYLE,
				};
			},
		},
		{
			values: theme('spacing'),
			modifiers: {
				inline: 'inline',
			},
			supportsNegativeValues: true,
		},
	);
});

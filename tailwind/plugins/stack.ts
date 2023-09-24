import plugin from 'tailwindcss/plugin';

const stack = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			'stack-y': (value: string, { modifier }) => {
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
			'stack-x': (value: string, { modifier }) => {
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

export default stack;

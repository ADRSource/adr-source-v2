import plugin from 'tailwindcss/plugin';

const debug = plugin(function ({ addUtilities }) {
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

export default debug;

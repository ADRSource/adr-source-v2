const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
	addUtilities({
		'.inset-center': {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		'.inset-x-center': {
			left: '50%',
			transform: 'translateX(-50%)',
		},
		'.inset-y-center': {
			top: '50%',
			transform: 'translateY(-50%)',
		},
	});
});

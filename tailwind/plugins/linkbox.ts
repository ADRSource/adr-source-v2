import plugin from 'tailwindcss/plugin';

const linkBox = plugin(function ({ addComponents }) {
	addComponents({
		'.linkBox': {
			position: 'relative',
			'& :where(a, abbr)': {
				position: 'relative',
				zIndex: '1',
			},
		},
		'.linkOverlay': {
			position: 'static',
			'&:before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				cursor: 'inherit',
				inset: '0',
				zIndex: '0',
			},
		},
	});
});

export default linkBox;

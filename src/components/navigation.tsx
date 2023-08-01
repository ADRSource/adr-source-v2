'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';

export function Navigation() {
	const [toggle, setToggle] = React.useState(false);
	const { nav, text } = navigation({
		theme: toggle ? 'dark' : 'light',
	});

	return (
		<nav className={nav()}>
			<p className={text()}>This is text</p>
			<p className={text()}>This is text</p>
			<button
				className='text-red-500'
				onClick={() => {
					setToggle(!toggle);
				}}
			>
				Toggle
			</button>
		</nav>
	);
}

const navigation = tv({
	slots: {
		nav: 'border-gold border rounded-full p-5',
		text: 'text-black',
	},
	variants: {
		theme: {
			dark: {
				nav: 'bg-black',
				text: 'text-white',
			},
			light: {
				nav: 'bg-white',
				text: 'text-gold',
			},
		},
	},
});

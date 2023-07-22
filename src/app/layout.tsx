import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PATHS } from '~/constants/paths.constants';
import '~/styles/global.css';

const inter = Inter({
	display: 'swap',
	preload: true,
	subsets: ['latin'],
	variable: '--font-sans',
	fallback: ['system-ui', 'sans-serif'],
});

const TITLE = 'ADRsource';
const DESCRIPTION = `ADR Source is a company that provides mediation and alternative dispute resolution services. The company's team of experienced mediators has successfully handled thousands of cases across a wide range of civil litigation matters. ADR Source is dedicated to helping parties resolve their disputes in a timely and efficient manner, using the latest online mediation technologies. The company is committed to providing top-quality services and ensuring the satisfaction of its clients.`;

export const metadata: Metadata = {
	metadataBase: new URL(PATHS.absolute),
	robots: 'noindex, nofollow', // TODO: change this to 'index, follow' when the site is ready
	title: {
		template: `%s | ${TITLE}`,
		default: TITLE,
	},
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: PATHS.absolute,
		type: 'website',
		locale: 'en_US',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={inter.variable} data-color-mode="dark">
			<head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body>{children}</body>
		</html>
	);
}

import { Manrope } from 'next/font/google';
import { type ReactNode } from 'react';

import '~/app/globals.css';

const manropeFont = Manrope({ subsets: ['latin'], weight: 'variable', variable: '--font-manrope' });

export const metadata = {
	title: 'coloruiz',
	description: "How good are you at assigning RGB values to colors? Let's check it out!",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html className={manropeFont.variable} lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className="p-2">{children}</body>
		</html>
	);
};

export default RootLayout;

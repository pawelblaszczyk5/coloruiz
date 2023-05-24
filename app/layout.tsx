import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

import '~/app/globals.css';

// TODO: change this font maybe
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
	title: 'coloruiz',
	description: "How good are you at assigning RGB values to colors? Let's check it out!",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html className={inter.variable} lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;

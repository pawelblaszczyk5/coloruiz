import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

import '~/app/globals.css';

// TODO: change this font maybe
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
	title: 'coloruiz',
	description: 'Quiz about colors',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html className={inter.variable} lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;

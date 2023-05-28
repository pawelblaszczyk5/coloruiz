import { Manrope } from 'next/font/google';
import { type ReactNode } from 'react';
import { Header } from '~/app/_components/Header';
import { Providers } from '~/app/_components/Providers';

import '~/app/globals.css';

const manropeFont = Manrope({ subsets: ['latin'], weight: 'variable', variable: '--font-manrope' });

export const runtime = 'edge';

export const metadata = {
	title: 'coloruiz',
	description: "How good you're at recognizing colors? Let's check it out in with a geek twist!",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html suppressHydrationWarning className={manropeFont.variable} lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className="flex flex-col gap-8 bg-stone-100 p-8 text-stone-950 dark:bg-stone-800 dark:text-stone-200">
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

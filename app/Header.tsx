import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import FluentEmojiArtistPalette from '~icons/fluent-emoji/artist-palette.jsx';
import LucideGithub from '~icons/lucide/github';

const ThemeSwitcher = dynamic(
	async () => import('~/app/ThemeSwitcher').then(module => ({ default: module.ThemeSwitcher })),
	{ ssr: false },
);

export const Header = () => {
	return (
		<header className="flex items-center gap-8">
			<Link className="mr-auto text-5xl" href="/">
				<span className="sr-only">Home page</span>
				<FluentEmojiArtistPalette aria-hidden focusable={false} />
			</Link>
			<Suspense fallback={null}>
				<ThemeSwitcher />
			</Suspense>
			<a className="text-2xl" href="https://github.com/pawelblaszczyk5/coloruiz">
				<span className="sr-only">GitHub</span>
				<LucideGithub aria-hidden focusable={false} />
			</a>
		</header>
	);
};

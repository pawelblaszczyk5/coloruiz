import Link from 'next/link';
import { Suspense } from 'react';
import { ThemeSwitcher } from '~/app/_components/ThemeSwitcher';
import FluentEmojiArtistPalette from '~icons/fluent-emoji/artist-palette.jsx';
import LucideGithub from '~icons/lucide/github.jsx';

export const Header = () => {
	return (
		<header className="flex items-center gap-8">
			<Link
				className="mr-auto rounded-sm text-5xl outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline"
				href="/"
			>
				<span className="sr-only">Home page</span>
				<FluentEmojiArtistPalette aria-hidden focusable={false} />
			</Link>
			<Suspense fallback={null}>
				<ThemeSwitcher />
			</Suspense>
			<a
				className="rounded-sm text-2xl outline-2 outline-offset-4 outline-fuchsia-500 focus-visible:outline"
				href="https://github.com/pawelblaszczyk5/coloruiz"
				target="_blank"
				rel="noreferrer"
			>
				<span className="sr-only">GitHub</span>
				<LucideGithub aria-hidden focusable={false} />
			</a>
		</header>
	);
};

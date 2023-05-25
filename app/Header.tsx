'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { match } from 'ts-pattern';
import FluentEmojiArtistPalette from '~icons/fluent-emoji/artist-palette.jsx';
import LucideGithub from '~icons/lucide/github';
import LucideMonitor from '~icons/lucide/monitor';
import LucideMoon from '~icons/lucide/moon';
import LucideSun from '~icons/lucide/sun';

const THEME = {
	DARK: 'dark',
	LIGHT: 'light',
	SYSTEM: 'system',
} as const;

const mapTheme = (theme: string | undefined) =>
	match(theme)
		.with('light', () => THEME.LIGHT)
		.with('dark', () => THEME.DARK)
		.otherwise(() => THEME.SYSTEM);

const getNextTheme = (currentTheme: (typeof THEME)[keyof typeof THEME]) =>
	match(currentTheme)
		.with(THEME.LIGHT, () => THEME.DARK)
		.with(THEME.DARK, () => THEME.SYSTEM)
		.with(THEME.SYSTEM, () => THEME.LIGHT)
		.exhaustive();

const getThemeIcon = (currentTheme: (typeof THEME)[keyof typeof THEME]) =>
	match(currentTheme)
		.with(THEME.LIGHT, () => LucideSun)
		.with(THEME.DARK, () => LucideMoon)
		.with(THEME.SYSTEM, () => LucideMonitor)
		.exhaustive();

const ThemeChangeButton = () => {
	const { setTheme, theme: unmappedTheme } = useTheme();
	const theme = mapTheme(unmappedTheme);
	const nextTheme = getNextTheme(theme);
	const ThemeIcon = getThemeIcon(theme);

	return (
		<button onClick={() => setTheme(nextTheme)} className="text-2xl">
			<span className="sr-only">Change theme to {nextTheme}</span>
			<ThemeIcon aria-hidden focusable={false} />
		</button>
	);
};

export const Header = () => {
	return (
		<header className="flex items-center gap-8">
			<Link className="mr-auto text-5xl" href="/">
				<span className="sr-only">Home page</span>
				<FluentEmojiArtistPalette aria-hidden focusable={false} />
			</Link>
			<ThemeChangeButton />
			<a className="text-2xl" href="https://github.com/pawelblaszczyk5/coloruiz">
				<span className="sr-only">GitHub</span>
				<LucideGithub aria-hidden focusable={false} />
			</a>
		</header>
	);
};

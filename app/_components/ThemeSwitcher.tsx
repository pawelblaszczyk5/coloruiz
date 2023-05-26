'use client';

import { useTheme } from 'next-themes';
import { match } from 'ts-pattern';
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

export const ThemeSwitcher = () => {
	const { setTheme, theme: unmappedTheme } = useTheme();
	const theme = mapTheme(unmappedTheme);
	const nextTheme = getNextTheme(theme);
	const ThemeIcon = getThemeIcon(theme);

	if (typeof window === 'undefined') throw new Error('This component should be rendered only on server');

	return (
		<button onClick={() => setTheme(nextTheme)} className="text-2xl">
			<span className="sr-only">Change theme to {nextTheme}</span>
			<ThemeIcon aria-hidden focusable={false} />
		</button>
	);
};

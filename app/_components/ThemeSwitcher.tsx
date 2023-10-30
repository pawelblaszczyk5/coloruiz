'use client';

import { useTheme } from 'next-themes';
import { match } from 'ts-pattern';
import { unstable_postpone } from 'react';
import LucideMonitor from '~icons/lucide/monitor.jsx';
import LucideMoon from '~icons/lucide/moon.jsx';
import LucideSun from '~icons/lucide/sun.jsx';

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
	if (typeof document === 'undefined') unstable_postpone("Can't render ThemeSwitcher on server");

	const { setTheme, theme: unmappedTheme } = useTheme();
	const theme = mapTheme(unmappedTheme);
	const nextTheme = getNextTheme(theme);
	const ThemeIcon = getThemeIcon(theme);

	if (typeof window === 'undefined') throw new Error('This component should be rendered only on server');

	return (
		<button
			onClick={() => setTheme(nextTheme)}
			className="rounded-sm text-2xl outline-2 outline-offset-4 outline-fuchsia-500 focus-visible:outline"
		>
			<span className="sr-only">Change theme to {nextTheme}</span>
			<ThemeIcon aria-hidden focusable={false} />
		</button>
	);
};

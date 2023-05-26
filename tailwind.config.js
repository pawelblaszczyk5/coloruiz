const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-manrope)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	darkMode: 'class',
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
	experimental: {
		optimizeUniversalDefaults: true,
	},
};

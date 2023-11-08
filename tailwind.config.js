const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
			},
			animation: {
				text: 'text 7s ease infinite',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
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

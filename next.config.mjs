import UnpluginIconsWebpack from 'unplugin-icons/webpack';

import './lib/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		ppr: true,
	},
	reactStrictMode: true,
	webpack(config) {
		config.plugins.push(
			UnpluginIconsWebpack({
				compiler: 'jsx',
				jsx: 'react',
				autoInstall: true,
				extension: 'jsx',
			}),
		);
		return config;
	},
};

export default nextConfig;

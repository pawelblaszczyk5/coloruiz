import UnpluginIconsWebpack from 'unplugin-icons/webpack';

import './utils/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
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

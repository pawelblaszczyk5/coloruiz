/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
	reactStrictMode: true,
	webpack(config) {
		config.plugins.push(
			require('unplugin-icons/webpack')({
				compiler: 'jsx',
				jsx: 'react',
				autoInstall: true,
			}),
		);
		return config;
	},
};

module.exports = nextConfig;

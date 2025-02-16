const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const { resolve } = require('path');
const _mode = argv.mode || 'development';
console.log('_mode', _mode);

const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const Dotenv = require('dotenv-webpack');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBar = require('webpackbar');
const { ThemedProgressPlugin } = require('themed-progress-plugin');
const webpackBaseConfig = {
	entry: {
		main: resolve('src/index.tsx'),
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules)/,
				use: {
					// `.swcrc` can be used to configure swc
					loader: 'swc-loader',
				},
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
				type: 'asset/resource',
			}
		],
	},
	resolve: {
		alias: {
			'@': resolve('src/'),
			'@components': resolve('src/components'),
			'@hooks': resolve('src/hooks'),
			'@pages': resolve('src/pages'),
			'@layouts': resolve('src/layouts'),
			'@assets': resolve('src/assets'),
			'@states': resolve('src/states'),
			'@service': resolve('src/service'),
			'@utils': resolve('src/utils'),
			'@lib': resolve('src/lib'),
			'@constants': resolve('src/constants'),
			'@connections': resolve('src/connections'),
			'@abis': resolve('src/abis'),
			'@types': resolve('src/types'),
			'@routes': resolve('src/routes'),
		},
		extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
		fallback: {
			// stream: require.resolve('stream-browserify'),
		},
	},
	plugins: [new Dotenv(), new ThemedProgressPlugin()],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);

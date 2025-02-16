const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ip = require('ip');
const port = process.env.PORT || 3003;
module.exports = {
	devServer: {
    static: {
      directory: join(__dirname, '../dist'),
    },
		historyApiFallback: true,
    host: ip.address(),
    open: true,
		hot: true,
    port
	},
	stats: 'errors-only',
	output: {
		publicPath: '/',
		//如果是通过loader 编译的 放到scripts文件夹里 filename
		filename: 'scripts/[name].bundle.js',
    path: resolve(process.cwd(), 'dist'),
	},
  module: {
		rules: [
			{
				test: /\.css$/i,
				// include: [
				// 	resolve(__dirname, 'node_modules'),
				// ],
				use: [
					// MiniCssExtractPlugin.loader,
					'style-loader',
					{ loader: 'css-loader', 
            options: { importLoaders: 1 } 
          },
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			favicon: './public/favicon.ico',
			template: resolve(__dirname, '../src/index-dev.html'),
		}),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [
					'You application is running here http://' + ip.address() + ':' + port,
				],
				notes: ['💊 构建信息请及时关注窗口右上角'],
			},
			// new WebpackBuildNotifierPlugin({
			//   title: '💿 Solv Dvelopment Notification',
			//   logo,
			//   suppressSuccess: true,
			// }),
			onErrors: function (severity, errors) {
				if (severity !== 'error') {
					return;
				}
				const error = errors[0];
				notifier.notify({
					title: '👒 Webpack Build Error',
					message: severity + ': ' + error.name,
					subtitle: error.file || '',
					icon: join(__dirname, 'icon.png'),
				});
			},
			clearConsole: true,
		}),
	],
};

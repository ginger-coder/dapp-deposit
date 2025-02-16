const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	output: {
		publicPath: '/',
		//如果是通过loader 编译的 放到scripts文件夹里 filename
		filename: 'scripts/[name].bundle.js',
		//如果是通过'asset/resource' 编译的
		assetModuleFilename: 'images/[name].[ext]',
        path: resolve(process.cwd(), 'dist'),
	},
    module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
                    // 'style-loader',
					{ 
                        loader: 'css-loader', 
                        options: { importLoaders: 0 } 
                    },
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
        new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			favicon: './public/favicon.ico',
			template: resolve(__dirname, '../src/index-prod.html'),
		}),
		new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                messages: [
                    'You application is build successfully!'
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
                console.log(error);
                notifier.notify({
                    title: '👒 Webpack Build Error',
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    icon: join(__dirname, 'icon.png'),
                });
            },
            clearConsole: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:5].css',
            chunkFilename: 'styles/[name].[contenthash:5].css',
            ignoreOrder: false,
        }),
		// new BundleAnalyzerPlugin(),
	],
};
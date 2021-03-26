var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	mode: 'development', 
	devtool: 'source-map',
	watchOptions: {
		ignored: '/node_modules/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js','.html'],
	},
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: false, 
		historyApiFallback: true, 
		hot: true, 
		port: 3000,
	},
	plugins: [new HtmlWebpackPlugin({
		template: "public/index.html",
		hash: true, // This is useful for cache busting
		filename: '../dist/index.html'
	})]
};

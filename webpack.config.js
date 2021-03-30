var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	mode: 'development', 
	devtool: 'source-map',
	watchOptions: {
		ignored: '/node_modules/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
				    {
				    	loader: 'ts-loader',
				    	options: {
				        	transpileOnly: true,
				        	experimentalWatchApi: true,
				    	},
				    },
				 ],
			},
			// {
			// 	test: /\.(css|scss)$/,
			// 	use: ["style-loader", "css-loader"],
			// },
			// {
			// 	test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
			// 	use: ["file-loader"],
			// },
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js','.html'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		pathinfo: false
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

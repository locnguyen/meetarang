var webpack = require('webpack');

var config = {
	context: __dirname + '/app',
	entry: './index.js',
	output: {
		path: __dirname + '/app',
		filename: 'bundle.js'
	},
	
	plugins: [
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test'
		})
	],
	
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
			{test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
			{test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
			{test: /\.scss$/, loader: 'style!css!sass', exclude: /node_moduels/}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/dist';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	config.devtool = 'source-map';
}

module.exports = config;
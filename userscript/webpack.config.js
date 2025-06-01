const path = require('path');

const Terser = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.min.js'
	},

	module: {
		rules: [{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		}]
	},

	optimization: {
		minimize: true,
		minimizer: [new Terser({
			terserOptions: {
				keep_fnames: false,
				compress: {
					keep_fnames: false,
				},
				mangle: {
					keep_fnames: false,
				},
			}
		})]
	}
};
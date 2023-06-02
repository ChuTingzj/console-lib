import {resolve} from 'path';
import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';
import {common} from '../../config/webpack.common';
module.exports = () => {
	return merge<Configuration>(common, {
		target:'web',
		mode: 'production',
		entry: resolve(__dirname, './index.ts'),
		output: {
			publicPath: '/',
			clean: true,
			path: resolve(__dirname, './dist/esm'),
			filename: 'index.js',
			library: {
				type: 'module',
				export:'default'
			},
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules|__test__/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env', '@babel/preset-typescript'],
								plugins: ['@babel/plugin-transform-typescript'],
								cacheCompression: false,
								cacheDirectory: resolve(__dirname, './node_modules/.cache/babel-loader'),
							},
						},
						{
							loader: 'ts-loader',
						},
					],
				},
			],
		},
		experiments:{
			outputModule:true
		},
		externals: 'spark-md5',
		externalsType:'module'
	});
};

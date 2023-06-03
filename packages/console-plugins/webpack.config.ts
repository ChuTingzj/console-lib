import {resolve} from 'path';
import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';
import {common} from '../../config/webpack.common';
import {readdir} from 'fs/promises';
import packageJson from './package.json';
import {CopyWebpackPlugin} from './src/CopyWebpackPlugin';
module.exports = () => {
	return merge<Configuration>(common, {
		target: 'node',
		mode: 'production',
		entry: () =>
			readdir(resolve(__dirname, './src')).then((res) => {
				const entry = {};
				for (const key of res) {
					if (key === 'index.js') continue;
					Reflect.set(entry, key, {
						import: `${resolve(__dirname, './src')}/${key}/index.ts`,
						filename: `${key}/index.js`,
					});
				}
				return entry;
			}),
		output: {
			publicPath: '/',
			clean: true,
			path: resolve(__dirname, './dist'),
			library: {
				name: packageJson.name,
				type: 'umd',
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
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: resolve(__dirname, './src/index.js'),
						to: resolve(__dirname, './dist/index.js'),
						types: true,
					},
				],
			}),
		],
	});
};

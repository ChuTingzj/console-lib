import {resolve} from 'path';
import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';
import packageJson from './package.json';
import {common} from '../../config/webpack.common';
module.exports = () => {
	return merge<Configuration>(common, {
		mode: 'production',
		entry: resolve(__dirname, './index.ts'),
    target:'node',
		output: {
			publicPath: '/',
			clean: true,
			filename: 'index.js',
      path: resolve(__dirname, './dist/cjs'),
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
              options:{
                configFile:'tsconfig.node.json'
              }
						},
					],
				},
			],
		},
	});
};

import {resolve} from 'path';
import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';
import {common} from '../../config/webpack.common';
import {readdir} from 'node:fs/promises';
module.exports = () => {
	return merge<Configuration>(common, {
		target:'web',
		mode: 'production',
		entry: ()=>readdir(resolve(__dirname,'./src')).then(res=>{
			const entry = {};
			for (const dir of res) {
				if(dir==='index.js')continue;
				Reflect.set(entry,dir,{import:`${resolve(__dirname,'./src')}/${dir}/index.ts`,filename:`${dir}/index.js`});
			}
			return entry;
		}),
		output: {
			publicPath: '/',
			clean: true,
			path: resolve(__dirname, './dist/esm'),
			library: {
				type: 'module',
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

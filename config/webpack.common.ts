import type {Configuration} from 'webpack';
import NodePolyfillWebpackPlugin from 'node-polyfill-webpack-plugin';
import {resolve} from 'path';
export const common = {
	resolve: {
		alias: {
			'@': resolve(__dirname, '../packages/'),
		},
		extensions: ['.ts', '.d.ts', '...'],
	},
	plugins:[new NodePolyfillWebpackPlugin()]
} satisfies Configuration;

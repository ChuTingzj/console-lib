import type {Configuration} from 'webpack';
import {resolve} from 'path';
export const common = {
	resolve: {
		alias: {
			'@': resolve(__dirname, '../packages/'),
		},
		extensions: ['.ts', '.d.ts', '...'],
	},
} satisfies Configuration;

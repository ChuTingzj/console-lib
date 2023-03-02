/// <reference types="vitest" />
import {defineConfig} from 'vitest/config';
import {resolve} from 'path';
export default defineConfig({
	test: {
		root: resolve(__dirname, 'packages/'),
		coverage: {
			reportsDirectory: '../vitest-coverage',
		},
	},
});

import {defineConfig} from 'vite';
import {resolve} from 'path';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import solid from 'vite-plugin-solid';
export default defineConfig({
	plugins: [vue(), react(), solid()],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			name: '@console1024/components',
			fileName: 'index',
		},
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'lib/'),
			},
		],
	},
});

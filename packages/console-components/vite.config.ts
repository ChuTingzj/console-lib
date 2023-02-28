import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
export default defineConfig({
	plugins: [
		UnoCSS({
			presets: [presetUno(), presetAttributify()],
			transformers: [transformerDirectives()],
		}),
		react(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
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

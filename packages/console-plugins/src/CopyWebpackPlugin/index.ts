import type {Compiler} from 'webpack';
import {copyFile, cp, readFile, appendFile} from 'node:fs/promises';
export type CopyWebpackPluginOptions = {
	patterns: Array<Record<'from' | 'to', string> & {types?: boolean}>;
};
export class CopyWebpackPlugin {
	readonly options: CopyWebpackPluginOptions;
	constructor(options: CopyWebpackPluginOptions) {
		this.options = options;
	}
	apply(compiler: Compiler) {
		compiler.hooks.afterEmit.tapAsync(CopyWebpackPlugin.name, (_compilation, callback) => {
			for (const pattern of this.options.patterns) {
				(async () => {
					if (pattern.from.includes('.')) {
						await copyFile(pattern.from, pattern.to);
						if (pattern.types) {
							const contents = await readFile(pattern.from, {encoding: 'utf8'});
							await appendFile(`${pattern.to.split('.')[0]}.d.ts`, contents);
						}
					} else {
						await cp(pattern.from, pattern.to);
					}
				})();
			}
			callback();
		});
	}
}

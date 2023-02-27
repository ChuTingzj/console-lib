import type {Compiler} from 'webpack';
export const enum EFlagTypes {
	'console',
	'alert',
	'confirm',
	'prompt',
}
export type Options = {
	flag: keyof typeof EFlagTypes | Array<keyof typeof EFlagTypes>;
};
export class ClearFlagWebpackPlugin {
	options: Options;
	constructor(options: Options) {
		this.options = options;
	}
	apply(compiler: Compiler) {
		compiler.hooks.emit.tapAsync(ClearFlagWebpackPlugin.name, (compilation, callback) => {
			compilation.getAssets().forEach(({name, source}, index) => {
				console.log(index, name, source.source());
			});
			callback();
		});
	}
}

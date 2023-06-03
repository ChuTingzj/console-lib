import type {Compiler, Compilation} from 'webpack';
export enum EFlagTypes {
	'console',
	'alert',
	'confirm',
	'prompt',
	'debugger',
}
export type ClearFlagWebpackPluginOptions = {
	flag: keyof typeof EFlagTypes | Array<keyof typeof EFlagTypes>;
};
const matchSingleFlag = (flag: keyof typeof EFlagTypes) => {
	const regs: Array<RegExp> = [];
	if (flag === 'console') {
		regs.push(
			...[
				new RegExp(/console\.log\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.assert\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.clear\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.count\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.countReset\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.debug\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.dir\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.dirxml\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.error\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.group\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.groupCollapsed\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.groupEnd\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.info\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.profile\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.profileEnd\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.table\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.time\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.timeEnd\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.timeLog\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.timeStamp\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.trace\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
				new RegExp(/console\.warn\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'),
			]
		);
	} else if (flag === 'alert') {
		regs.push(new RegExp(/alert\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'));
	} else if (flag === 'confirm') {
		regs.push(new RegExp(/confirm\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'));
	} else if (flag === 'debugger') {
		regs.push(new RegExp(/debugger/, 'g'));
	} else if (flag === 'prompt') {
		regs.push(new RegExp(/prompt\([\u4E00-\u9FA5A-Za-z0-9_^%&',;=?$\x22]+\)/, 'g'));
	}
	return regs;
};
const getMatchRegs = (options: ClearFlagWebpackPluginOptions) => {
	const keys = options.flag;
	let regs: Array<RegExp> = [];
	if (Array.isArray(keys)) {
		for (const flag of keys) {
			regs.push(...matchSingleFlag(flag));
		}
	} else {
		regs = matchSingleFlag(keys);
	}
	return regs;
};
export class ClearFlagWebpackPlugin {
	regs: Array<RegExp>;
	constructor(options: ClearFlagWebpackPluginOptions) {
		this.regs = getMatchRegs(options);
	}
	apply(compiler: Compiler) {
		compiler.hooks.compilation.tap(ClearFlagWebpackPlugin.name, (compilation) => {
			compilation.hooks.processAssets.tap(ClearFlagWebpackPlugin.name, (assets) => {
				Object.entries(assets).forEach(([name, source]) => {
					this.clear(compilation, source, name);
				});
			});
		});
	}
	clear(compilation: Compilation, source: Compilation['assets']['source'], name: string) {
		let newSource = '';
		this.regs.forEach((reg) => {
			newSource = (!!newSource ? newSource : source.source().toString('utf8')).replaceAll(reg, '');
		});
		compilation.assets[name] = {
			source: () => newSource,
			size: () => Buffer.byteLength(newSource),
			buffer: () => Buffer.from(newSource),
			sourceAndMap: () => ({source: newSource, map: source.map()!}),
			map: () => source.map(),
			updateHash: source.updateHash,
		};
	}
}

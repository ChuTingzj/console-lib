export const singleInstance = (fn: new (...args: Array<any>) => object) => {
	let instance: typeof fn;
	return new Proxy(fn, {
		construct(target: {new (): void}, argArray: Array<any>): object {
			console.log(`Creating a ${target.name}`);
			if (!instance) {
				return new fn(...argArray);
			}
			return instance;
		},
	});
};

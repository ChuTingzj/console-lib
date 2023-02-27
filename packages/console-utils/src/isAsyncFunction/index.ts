export const isAsyncFunction = (fn: Function) => {
	return fn.prototype[Symbol.toStringTag] === 'AsyncFunction';
};

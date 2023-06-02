export const isPromiseLike = (value: any) => {
	return  value !== null &&
		(typeof value === 'function' || typeof value === 'object') &&
		typeof value.then === 'function';
};
export default isPromiseLike;
export const enum EStatus {
	'pending',
	'fulfilled',
	'rejected',
}
export type TResponse = {
	data: object | null;
	status: keyof typeof EStatus;
	err: object | null;
};
export const run = (fn: () => void) => {
	const _fetch = window.fetch;
	const cache: Array<TResponse> = [];
	let i = 0;
	window.fetch = ((...args: Parameters<typeof _fetch>) => {
		if (cache[i]) {
			if (cache[i].status === 'fulfilled') {
				return cache[i].data;
			}
			if (cache[i].status === 'rejected') {
				throw cache[i].err;
			}
		}
		const result = {
			data: null,
			status: 'pending',
			err: null,
		} as TResponse;
		cache[i++] = result;
		const promise = _fetch(...args)
			.then((res) => res.json())
			.then(
				(response) => {
					result.status = 'fulfilled';
					result.data = response;
				},
				(error) => {
					result.status = 'rejected';
					result.err = error;
				}
			);
		throw promise;
	}) as any;
	try {
		fn();
	} catch (error) {
		if (error instanceof Promise) {
			const reRun = () => {
				i = 0;
				fn();
			};
			error.then(reRun, reRun);
		}
	}
};
export default run;
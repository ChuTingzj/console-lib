import {describe, expect, it} from '@jest/globals';
import {isAsyncFunction} from '..';
describe('isAsyncFunction', () => {
	it('async', () => {
		expect(isAsyncFunction(async () => {})).not.toBeFalsy();
	});
	it('not async', () => {
		expect(
			isAsyncFunction(
				() =>
					new Promise((resolve) => {
						resolve(1);
					})
			)
		).toBeFalsy();
	});
});

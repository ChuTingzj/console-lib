import {describe, expect, it} from '@jest/globals';
import {only} from '..';
describe('only function', () => {
	it('it should be return 2', () => {
		expect(only([1, 1, 2])).toBe(2);
	});
});

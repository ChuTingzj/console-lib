import {describe, it, expect} from '@jest/globals';
import {deDuplicate} from '../';

describe('deDuplicate', () => {
	it('empty arr', () => {
		expect(deDuplicate([])).toStrictEqual([]);
	});
	it('pure symbol arr', () => {
		expect(deDuplicate([Symbol('1'), Symbol('1')])).toHaveLength(2);
	});
	it('pure function arr', () => {
		expect(deDuplicate([function a() {}, function a() {}])).toHaveLength(2);
	});
	it('pure string arr', () => {
		expect(deDuplicate(['1', '1', '2'])).toStrictEqual(['1', '2']);
	});
	it('pure number arr', () => {
		expect(deDuplicate([1, 2, 3, 2])).toStrictEqual([1, 2, 3]);
	});
	it('pure boolean arr', () => {
		expect(deDuplicate([true, false, true])).toStrictEqual([true, false]);
	});
	it('pure null arr', () => {
		expect(deDuplicate([null, null])).toStrictEqual([null]);
	});
	it('pure undefine arr', () => {
		expect(deDuplicate([undefined, undefined])).toStrictEqual([undefined]);
	});
	it('pure two-dimension arr', () => {
		expect(deDuplicate([['a', 'b'], ['a', 'b'], ['a']])).toContainEqual(['a']);
	});
	it('pure object arr', () => {
		expect(deDuplicate([{a: 1, b: 2}, {a: 1, b: 2}, {a: 1}])).toContainEqual({a: 1});
	});
	it('pure Map arr', () => {
		expect(deDuplicate([new Map([['a', 1]]), new Map([['a', 1]])])).toHaveLength(1);
	});
	it('pure Set arr', () => {
		expect(deDuplicate([new Set([1]), new Set([1])])).toHaveLength(1);
	});
	it('mix arr', () => {
		expect(
			deDuplicate([
				new Set([1]),
				new Set([1]),
				new Set([2]),
				new Map([['a', 1]]),
				new Map([['a', 1]]),
				new Map([['a', 2]]),
				Symbol(1),
				Symbol(1),
				1,
				1,
				2,
				3,
				false,
				false,
				true,
				null,
				null,
				undefined,
				undefined,
				{},
				{},
				function a() {},
				function a() {},
			])
		).toHaveLength(16);
	});
});

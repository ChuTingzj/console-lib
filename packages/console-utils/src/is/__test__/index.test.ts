import {describe, it, expect} from '@jest/globals';
import * as is from '../';
describe('is', () => {
	it('string', () => {
		expect(is.isString('string')).not.toBeFalsy();
	});
	it('number', () => {
		expect(is.isNumber(6)).not.toBeFalsy();
	});
	it('boolean', () => {
		expect(is.isBoolean(true)).not.toBeFalsy();
	});
	it('null', () => {
		expect(is.isNull(null)).not.toBeFalsy();
	});
	it('undefined', () => {
		expect(is.isUndefined(undefined)).not.toBeFalsy();
	});
	it('array', () => {
		expect(is.isArray([])).not.toBeFalsy();
	});
	it('object', () => {
		expect(is.isObject({})).not.toBeFalsy();
	});
	it('symbol', () => {
		expect(is.isSymbol(Symbol(1))).not.toBeFalsy();
	});
	it('function', () => {
		expect(is.isFunction(function a() {})).not.toBeFalsy();
	});
	it('set', () => {
		expect(is.isSet(new Set([1]))).not.toBeFalsy();
	});
	it('map', () => {
		expect(is.isMap(new Map([[1, 1]]))).not.toBeFalsy();
	});
});

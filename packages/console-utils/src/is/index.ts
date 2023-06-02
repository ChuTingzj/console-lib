export const enum EVariableType {
	'String',
	'Number',
	'Boolean',
	'Null',
	'Undefined',
	'Set',
	'Map',
	'Symbol',
	'Object',
	'Function',
	'Array',
}
export function getVariableType(variable: any): keyof typeof EVariableType;
export function getVariableType(variable: any) {
	return (<any>Object.prototype.toString.call(variable)).match(/[a-zA-Z]+(?=])/g)[0];
}
export const isArray = (variable: any): variable is Array<any> =>
	getVariableType(variable) === 'Array';
export const isString = (variable: any): variable is string =>
	getVariableType(variable) === 'String';
export const isNumber = (variable: any): variable is number =>
	getVariableType(variable) === 'Number';
export const isBoolean = (variable: any): variable is boolean =>
	getVariableType(variable) === 'Boolean';
export const isNull = (variable: any): variable is null => getVariableType(variable) === 'Null';
export const isUndefined = (variable: any): variable is undefined =>
	getVariableType(variable) === 'Undefined';
export const isSet = <T = any>(variable: any): variable is Set<T> =>
	getVariableType(variable) === 'Set';
export const isMap = <K = any, V = any>(variable: any): variable is Map<K, V> =>
	getVariableType(variable) === 'Map';
export const isSymbol = (variable: any): variable is symbol =>
	getVariableType(variable) === 'Symbol';
export const isObject = <K extends string | number | symbol = any, V = any>(
	variable: any
): variable is Record<K, V> => getVariableType(variable) === 'Object';
export const isFunction = (variable: any): variable is Function =>
	getVariableType(variable) === 'Function';
export const isComplex = (variable: any): variable is object =>
	isArray(variable) ||
	isFunction(variable) ||
	isMap(variable) ||
	isSet(variable) ||
	isObject(variable);
export default {
	getVariableType,
	isArray,
	isString,
	isNumber,
	isBoolean,
	isNull,
	isUndefined,
	isSet,
	isMap,
	isSymbol,
	isObject,
	isFunction,
	isComplex
};
import {
	isComplex,
	isArray,
	isFunction,
	isMap,
	isSet,
	isObject,
	isBoolean,
	isNull,
	isNumber,
	isString,
	isSymbol,
	isUndefined,
} from '@/console-utils/src/is';
export const shallowCopy = <T = any>(variable: T): T => {
	if (isObject(variable)) {
		const keys = Reflect.ownKeys(variable);
		const symbolKeys = Object.getOwnPropertySymbols(variable);
		const shallow = {};
		if (!keys.length) {
			if (!symbolKeys.length) {
				return deepCopy(variable);
			} else {
				for (const symbolKey of symbolKeys) {
					Reflect.set(shallow, symbolKey, Reflect.get(variable, symbolKey));
				}
				return shallow as T;
			}
		} else {
			for (const key in keys) {
				Reflect.set(shallow, key, Reflect.get(variable, key));
			}
			if (!symbolKeys.length) return shallow as T;
			for (const symbolKey of symbolKeys) {
				Reflect.set(shallow, symbolKey, Reflect.get(variable, symbolKey));
			}
			return shallow as T;
		}
	} else {
		return deepCopy<T>(variable);
	}
};
export const deepCopy = <T = any>(variable: T): T => {
	if (isFunction(variable)) {
		return variable as typeof variable;
	}
	if (isArray(variable)) {
		const copyArr = [];
		for (const item of variable) {
			copyArr.push(isComplex(item) ? deepCopy(item) : item);
		}
		return copyArr as typeof variable;
	}
	if (isMap(variable)) {
		const copyMap: Array<[any, any]> = [];
		for (const arr of variable) {
			copyMap.push(arr);
		}
		return new Map(copyMap) as typeof variable;
	}
	if (isSet(variable)) {
		const copySet: Array<any> = [];
		for (const item of variable) {
			copySet.push(isComplex(item) ? deepCopy(item) : item);
		}
		return new Set(copySet) as typeof variable;
	}
	if (isObject(variable)) {
		const keys = Reflect.ownKeys(variable);
		const symbolKeys = Object.getOwnPropertySymbols(variable);
		const deep = {};
		if (!keys.length) {
			if (!symbolKeys.length) {
				return {} as typeof variable;
			} else {
				for (const symbolKey of symbolKeys) {
					const symbolValue = Reflect.get(variable, symbolKey);
					Reflect.set(
						deep,
						symbolKey,
						isComplex(symbolValue) ? deepCopy(symbolValue) : symbolValue
					);
				}
				return deep as typeof variable;
			}
		} else {
			for (const key of keys) {
				const value = Reflect.get(variable, key);
				Reflect.set(deep, key, isComplex(value) ? deepCopy(value) : value);
			}
			if (!symbolKeys.length) {
				return deep as typeof variable;
			} else {
				for (const symbolKey of symbolKeys) {
					const symbolValue = Reflect.get(variable, symbolKey);
					Reflect.set(
						deep,
						symbolKey,
						isComplex(symbolValue) ? deepCopy(symbolValue) : symbolValue
					);
				}
				return deep as typeof variable;
			}
		}
	}
	if (!isComplex(variable)) {
		if (isBoolean(variable)) return new Boolean(variable ? true : false).valueOf() as T;
		if (isNull(variable)) return null as T;
		if (isString(variable)) return new String(variable).valueOf() as T;
		if (isNumber(variable)) return new Number(variable).valueOf() as T;
		if (isUndefined(variable)) return undefined as T;
		if (isSymbol(variable)) return variable;
	}
	return variable;
};

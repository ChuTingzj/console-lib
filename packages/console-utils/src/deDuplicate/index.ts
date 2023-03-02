import {
	isSymbol,
	isString,
	isNumber,
	isBoolean,
	isNull,
	isUndefined,
	isObject,
	isArray,
	isMap,
	isFunction,
	isSet,
} from '../is';
export const deDuplicate = (args: Array<any>) => {
	if (args.length === 0) return args;
	const result: Array<any> = [];
	for (const item of args) {
		if (isSymbol(item) || isFunction(item)) {
			result.push(item);
		}
		if (isString(item) || isNumber(item) || isNull(item) || isBoolean(item) || isUndefined(item)) {
			const index = result.findIndex((self) => self === item);
			if (index === -1) {
				result.push(item);
			}
		}
		if (isArray(item) || isObject(item)) {
			const filter = result.filter((self) => isArray(self) || isObject(self));
			if (!filter.length) {
				result.push(item);
			} else {
				const index = filter.findIndex((self) => JSON.stringify(self) === JSON.stringify(item));
				if (index === -1) {
					result.push(item);
				}
			}
		}
		if (isMap(item) || isSet(item)) {
			const filter = result.filter((self) => isMap(self) || isSet(self));
			if (!filter.length) {
				result.push(item);
			} else {
				const index = filter.findIndex(
					(self) => JSON.stringify([...self]) === JSON.stringify([...item])
				);
				if (index === -1) {
					result.push(item);
				}
			}
		}
	}
	return result;
};

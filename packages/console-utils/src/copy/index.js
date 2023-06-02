"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = exports.shallowCopy = void 0;
var is_1 = require("@/console-utils/src/is");
var shallowCopy = function (variable) {
    if ((0, is_1.isObject)(variable)) {
        var keys = Reflect.ownKeys(variable);
        var symbolKeys = Object.getOwnPropertySymbols(variable);
        var shallow = {};
        if (!keys.length) {
            if (!symbolKeys.length) {
                return (0, exports.deepCopy)(variable);
            }
            else {
                for (var _i = 0, symbolKeys_1 = symbolKeys; _i < symbolKeys_1.length; _i++) {
                    var symbolKey = symbolKeys_1[_i];
                    Reflect.set(shallow, symbolKey, Reflect.get(variable, symbolKey));
                }
                return shallow;
            }
        }
        else {
            for (var key in keys) {
                Reflect.set(shallow, key, Reflect.get(variable, key));
            }
            if (!symbolKeys.length)
                return shallow;
            for (var _a = 0, symbolKeys_2 = symbolKeys; _a < symbolKeys_2.length; _a++) {
                var symbolKey = symbolKeys_2[_a];
                Reflect.set(shallow, symbolKey, Reflect.get(variable, symbolKey));
            }
            return shallow;
        }
    }
    else {
        return (0, exports.deepCopy)(variable);
    }
};
exports.shallowCopy = shallowCopy;
var deepCopy = function (variable) {
    if ((0, is_1.isFunction)(variable)) {
        return variable;
    }
    if ((0, is_1.isArray)(variable)) {
        var copyArr = [];
        for (var _i = 0, variable_1 = variable; _i < variable_1.length; _i++) {
            var item = variable_1[_i];
            copyArr.push((0, is_1.isComplex)(item) ? (0, exports.deepCopy)(item) : item);
        }
        return copyArr;
    }
    if ((0, is_1.isMap)(variable)) {
        var copyMap = [];
        for (var _a = 0, variable_2 = variable; _a < variable_2.length; _a++) {
            var arr = variable_2[_a];
            copyMap.push(arr);
        }
        return new Map(copyMap);
    }
    if ((0, is_1.isSet)(variable)) {
        var copySet = [];
        for (var _b = 0, variable_3 = variable; _b < variable_3.length; _b++) {
            var item = variable_3[_b];
            copySet.push((0, is_1.isComplex)(item) ? (0, exports.deepCopy)(item) : item);
        }
        return new Set(copySet);
    }
    if ((0, is_1.isObject)(variable)) {
        var keys = Reflect.ownKeys(variable);
        var symbolKeys = Object.getOwnPropertySymbols(variable);
        var deep = {};
        if (!keys.length) {
            if (!symbolKeys.length) {
                return {};
            }
            else {
                for (var _c = 0, symbolKeys_3 = symbolKeys; _c < symbolKeys_3.length; _c++) {
                    var symbolKey = symbolKeys_3[_c];
                    var symbolValue = Reflect.get(variable, symbolKey);
                    Reflect.set(deep, symbolKey, (0, is_1.isComplex)(symbolValue) ? (0, exports.deepCopy)(symbolValue) : symbolValue);
                }
                return deep;
            }
        }
        else {
            for (var _d = 0, keys_1 = keys; _d < keys_1.length; _d++) {
                var key = keys_1[_d];
                var value = Reflect.get(variable, key);
                Reflect.set(deep, key, (0, is_1.isComplex)(value) ? (0, exports.deepCopy)(value) : value);
            }
            if (!symbolKeys.length) {
                return deep;
            }
            else {
                for (var _e = 0, symbolKeys_4 = symbolKeys; _e < symbolKeys_4.length; _e++) {
                    var symbolKey = symbolKeys_4[_e];
                    var symbolValue = Reflect.get(variable, symbolKey);
                    Reflect.set(deep, symbolKey, (0, is_1.isComplex)(symbolValue) ? (0, exports.deepCopy)(symbolValue) : symbolValue);
                }
                return deep;
            }
        }
    }
    if (!(0, is_1.isComplex)(variable)) {
        if ((0, is_1.isBoolean)(variable))
            return new Boolean(variable ? true : false).valueOf();
        if ((0, is_1.isNull)(variable))
            return null;
        if ((0, is_1.isString)(variable))
            return new String(variable).valueOf();
        if ((0, is_1.isNumber)(variable))
            return new Number(variable).valueOf();
        if ((0, is_1.isUndefined)(variable))
            return undefined;
        if ((0, is_1.isSymbol)(variable))
            return variable;
    }
    return variable;
};
exports.deepCopy = deepCopy;
exports.default = {
    shallowCopy: exports.shallowCopy,
    deepCopy: exports.deepCopy
};

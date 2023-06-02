"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplex = exports.isFunction = exports.isObject = exports.isSymbol = exports.isMap = exports.isSet = exports.isUndefined = exports.isNull = exports.isBoolean = exports.isNumber = exports.isString = exports.isArray = exports.getVariableType = void 0;
function getVariableType(variable) {
    return Object.prototype.toString.call(variable).match(/[a-zA-Z]+(?=])/g)[0];
}
exports.getVariableType = getVariableType;
var isArray = function (variable) {
    return getVariableType(variable) === 'Array';
};
exports.isArray = isArray;
var isString = function (variable) {
    return getVariableType(variable) === 'String';
};
exports.isString = isString;
var isNumber = function (variable) {
    return getVariableType(variable) === 'Number';
};
exports.isNumber = isNumber;
var isBoolean = function (variable) {
    return getVariableType(variable) === 'Boolean';
};
exports.isBoolean = isBoolean;
var isNull = function (variable) { return getVariableType(variable) === 'Null'; };
exports.isNull = isNull;
var isUndefined = function (variable) {
    return getVariableType(variable) === 'Undefined';
};
exports.isUndefined = isUndefined;
var isSet = function (variable) {
    return getVariableType(variable) === 'Set';
};
exports.isSet = isSet;
var isMap = function (variable) {
    return getVariableType(variable) === 'Map';
};
exports.isMap = isMap;
var isSymbol = function (variable) {
    return getVariableType(variable) === 'Symbol';
};
exports.isSymbol = isSymbol;
var isObject = function (variable) { return getVariableType(variable) === 'Object'; };
exports.isObject = isObject;
var isFunction = function (variable) {
    return getVariableType(variable) === 'Function';
};
exports.isFunction = isFunction;
var isComplex = function (variable) {
    return (0, exports.isArray)(variable) ||
        (0, exports.isFunction)(variable) ||
        (0, exports.isMap)(variable) ||
        (0, exports.isSet)(variable) ||
        (0, exports.isObject)(variable);
};
exports.isComplex = isComplex;
exports.default = {
    getVariableType: getVariableType,
    isArray: exports.isArray,
    isString: exports.isString,
    isNumber: exports.isNumber,
    isBoolean: exports.isBoolean,
    isNull: exports.isNull,
    isUndefined: exports.isUndefined,
    isSet: exports.isSet,
    isMap: exports.isMap,
    isSymbol: exports.isSymbol,
    isObject: exports.isObject,
    isFunction: exports.isFunction,
    isComplex: exports.isComplex
};

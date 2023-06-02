"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromiseLike = void 0;
var isPromiseLike = function (value) {
    return value !== null &&
        (typeof value === 'function' || typeof value === 'object') &&
        typeof value.then === 'function';
};
exports.isPromiseLike = isPromiseLike;
exports.default = exports.isPromiseLike;

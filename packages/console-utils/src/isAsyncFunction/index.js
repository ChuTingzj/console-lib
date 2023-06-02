"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncFunction = void 0;
var isAsyncFunction = function (fn) { return fn[Symbol.toStringTag] === 'AsyncFunction'; };
exports.isAsyncFunction = isAsyncFunction;
exports.default = exports.isAsyncFunction;

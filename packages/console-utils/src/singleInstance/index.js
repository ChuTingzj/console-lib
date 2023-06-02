"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleInstance = void 0;
var singleInstance = function (fn) {
    var instance;
    return new Proxy(fn, {
        construct: function (target, argArray) {
            console.log("Creating a ".concat(target.name));
            if (!instance) {
                return new (fn.bind.apply(fn, __spreadArray([void 0], argArray, false)))();
            }
            return instance;
        },
    });
};
exports.singleInstance = singleInstance;
exports.default = exports.singleInstance;

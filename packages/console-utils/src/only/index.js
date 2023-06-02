"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.only = void 0;
var only = function (nums) {
    return nums.reduce(function (pre, next) { return pre ^ next; }, 0);
};
exports.only = only;
exports.default = exports.only;

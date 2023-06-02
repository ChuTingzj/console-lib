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
exports.deDuplicate = void 0;
var is_1 = require("../is");
var equal_1 = require("../equal");
var deDuplicate = function (args) {
    if (args.length === 0)
        return args;
    var result = [];
    var _loop_1 = function (item) {
        if ((0, is_1.isSymbol)(item) || (0, is_1.isFunction)(item)) {
            result.push(item);
        }
        if ((0, is_1.isString)(item) || (0, is_1.isNumber)(item) || (0, is_1.isNull)(item) || (0, is_1.isBoolean)(item) || (0, is_1.isUndefined)(item)) {
            var index = result.findIndex(function (self) { return self === item; });
            if (index === -1) {
                result.push(item);
            }
        }
        if ((0, is_1.isArray)(item) || (0, is_1.isObject)(item)) {
            var filter = result.filter(function (self) { return (0, is_1.isArray)(self) || (0, is_1.isObject)(self); });
            if (!filter.length) {
                result.push(item);
            }
            else {
                var index = filter.findIndex(function (self) { var _a; return (_a = (0, equal_1.equal)(self, item)) !== null && _a !== void 0 ? _a : true; });
                if (index === -1) {
                    result.push(item);
                }
            }
        }
        if ((0, is_1.isMap)(item) || (0, is_1.isSet)(item)) {
            var filter = result.filter(function (self) { return (0, is_1.isMap)(self) || (0, is_1.isSet)(self); });
            if (!filter.length) {
                result.push(item);
            }
            else {
                var index = filter.findIndex(function (self) { return JSON.stringify(__spreadArray([], self, true)) === JSON.stringify(__spreadArray([], item, true)); });
                if (index === -1) {
                    result.push(item);
                }
            }
        }
    };
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var item = args_1[_i];
        _loop_1(item);
    }
    return result;
};
exports.deDuplicate = deDuplicate;
exports.default = exports.deDuplicate;

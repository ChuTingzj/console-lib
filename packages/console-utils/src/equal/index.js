"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = void 0;
var equal = function (arg1, arg2) {
    if (typeof arg1 === 'object' && typeof arg2 === 'object') {
        var arg1Keys = Reflect.ownKeys(arg1);
        var arg2Keys = Reflect.ownKeys(arg2);
        if (arg1Keys.length === arg1Keys.length) {
            for (var _i = 0, arg1Keys_1 = arg1Keys; _i < arg1Keys_1.length; _i++) {
                var key = arg1Keys_1[_i];
                if (!arg2Keys.includes(key)) {
                    return false;
                }
                else {
                    if (!(0, exports.equal)(arg1[key], arg2[key])) {
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
    }
    else {
        return arg1 === arg2;
    }
};
exports.equal = equal;
exports.default = exports.equal;

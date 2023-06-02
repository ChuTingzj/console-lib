"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
function throttle(fn, delay) {
    if (delay === void 0) { delay = 200; }
    var flag = true;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!flag)
            return;
        flag = false;
        setTimeout(function () {
            fn.apply(_this, args);
            flag = true;
        }, delay);
    };
}
exports.throttle = throttle;
exports.default = throttle;

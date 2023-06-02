"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
function debounce(fn, delay) {
    if (delay === void 0) { delay = 500; }
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args); // 改变this指向为调用debounce所指的对象
        }, delay);
    };
}
exports.debounce = debounce;
exports.default = debounce;

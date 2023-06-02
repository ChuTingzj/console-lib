"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
var toBase64 = function (file, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        var _a;
        var base64 = ((_a = event.target) === null || _a === void 0 ? void 0 : _a.result).split(',')[1];
        callback(base64);
    };
    fileReader.readAsDataURL(file);
};
exports.toBase64 = toBase64;
exports.default = exports.toBase64;

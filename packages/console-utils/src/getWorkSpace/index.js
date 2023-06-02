"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkSpace = void 0;
var getWorkSpace = function () {
    var absoluteArr = process.cwd().split('\\');
    var firstNodeModulesIndex = absoluteArr.findIndex(function (item) { return item === 'node_modules'; });
    if (firstNodeModulesIndex === -1)
        return process.cwd();
    return absoluteArr.slice(0, firstNodeModulesIndex).join('\\');
};
exports.getWorkSpace = getWorkSpace;
exports.default = exports.getWorkSpace;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forDom = void 0;
var microRun_1 = require("@/console-utils/src/microRun");
var forDom = function (selector, whatToShow, filter) {
    var node;
    var nodeArr = [];
    (0, microRun_1.microRun)(function () {
        var res = document.querySelector(selector);
        if (!res) {
            return;
        }
        node = res;
        var treeWalker = document.createTreeWalker(node, whatToShow, filter);
        var current = treeWalker.currentNode;
        while (current) {
            nodeArr.push(current);
            current = treeWalker.nextNode();
        }
    });
    return nodeArr;
};
exports.forDom = forDom;
exports.default = exports.forDom;

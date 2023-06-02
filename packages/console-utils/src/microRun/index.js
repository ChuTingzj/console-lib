"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.microRun = void 0;
var microRun = function (fn) {
    if (typeof queueMicrotask !== 'undefined') {
        queueMicrotask(fn);
    }
    else if (typeof Promise !== 'undefined') {
        Promise.resolve().then(fn);
    }
    else if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(fn);
        var textNode = document.createTextNode('0');
        observer.observe(textNode, {
            characterData: true,
        });
        textNode.data = '1';
    }
    else {
        setTimeout(fn);
    }
};
exports.microRun = microRun;
exports.default = exports.microRun;

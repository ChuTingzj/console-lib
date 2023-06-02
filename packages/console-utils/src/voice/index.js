"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToVoice = void 0;
var textToVoice = function (text, options) {
    var utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, options);
    speechSynthesis.addEventListener('voiceschanged', function () {
        if (!Reflect.has(options, 'voice')) {
            var voices = speechSynthesis.getVoices();
            utterance.voice = voices[0];
        }
    });
    speechSynthesis.speak(utterance);
};
exports.textToVoice = textToVoice;
exports.default = exports.textToVoice;

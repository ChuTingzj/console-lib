"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
var request = function (type, options, onProgress) {
    var url = options.url, method = options.method, data = options.data;
    switch (type) {
        case 'XHR':
            return new Promise(function (resolve) {
                var XHR = new XMLHttpRequest();
                XHR.onprogress = function (event) {
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(Math.floor((event.loaded / event.total) * 100));
                };
                XHR.onreadystatechange = function () {
                    if (XHR.readyState === XHR.DONE) {
                        resolve(XHR.responseText);
                    }
                };
                XHR.open(method, url);
                XHR.send(JSON.stringify(data));
            });
        case 'Fetch':
            return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                var res, total, reader, decoder, text, loaded, _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, fetch(url, {
                                method: method,
                                body: JSON.stringify(data),
                            })];
                        case 1:
                            res = _b.sent();
                            total = +res.headers.get('content-length');
                            reader = res.body.getReader();
                            decoder = new TextDecoder();
                            text = '';
                            loaded = 0;
                            _b.label = 2;
                        case 2:
                            if (!true) return [3 /*break*/, 4];
                            return [4 /*yield*/, reader.read()];
                        case 3:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (done) {
                                return [3 /*break*/, 4];
                            }
                            loaded += value.length;
                            text += decoder.decode(value);
                            onProgress === null || onProgress === void 0 ? void 0 : onProgress(Math.floor((loaded / total) * 100));
                            return [3 /*break*/, 2];
                        case 4:
                            resolve(text);
                            return [2 /*return*/];
                    }
                });
            }); });
    }
};
exports.request = request;
exports.default = exports.request;

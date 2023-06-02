"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadByXhr = void 0;
var uploadByXhr = function (onProgress, onFinish) {
    var xhr = new XMLHttpRequest();
    return function (dataType) {
        switch (dataType) {
            case 'FormData':
                return function (data, url) {
                    var form = new FormData();
                    var key = Reflect.ownKeys(data).shift();
                    form.append(key, data[key]);
                    xhr.onload = function () {
                        var res = JSON.parse(xhr.responseText);
                        onFinish(res);
                    };
                    xhr.upload.onprogress = function (event) {
                        var percent = Math.floor((event.loaded / event.total) * 100);
                        onProgress(percent);
                    };
                    xhr.open('POST', url);
                    xhr.send(form);
                    return function () {
                        xhr.abort();
                    };
                };
            case 'Base64':
                return function (data, url) {
                    var reader = new FileReader();
                    var ext = '.' + data.name.split('.').pop();
                    reader.readAsDataURL(data);
                    reader.onload = function (event) {
                        var _a;
                        var base64 = ((_a = event.target) === null || _a === void 0 ? void 0 : _a.result).split(',').pop();
                        xhr.setRequestHeader('content-type', 'application/json');
                        xhr.onload = function () {
                            var res = JSON.parse(xhr.responseText);
                            onFinish(res);
                        };
                        xhr.upload.onprogress = function (event) {
                            var percent = Math.floor((event.loaded / event.total) * 100);
                            onProgress(percent);
                        };
                        xhr.open('POST', url);
                        xhr.send(JSON.stringify({ ext: ext, base64: base64 }));
                    };
                    return function () {
                        xhr.abort();
                    };
                };
            case 'Binary':
                return function (data, url) {
                    var ext = '.' + data.name.split('.').pop();
                    xhr.setRequestHeader('content-type', 'application/octet-stream');
                    xhr.setRequestHeader('x-ext', ext);
                    xhr.onload = function () {
                        var res = JSON.parse(xhr.responseText);
                        onFinish(res);
                    };
                    xhr.upload.onprogress = function (event) {
                        var percent = Math.floor((event.loaded / event.total) * 100);
                        onProgress(percent);
                    };
                    xhr.open('POST', url);
                    xhr.send(data);
                    return function () {
                        xhr.abort();
                    };
                };
            default:
                console.warn('👿:数据类型不匹配!');
                break;
        }
    };
};
exports.uploadByXhr = uploadByXhr;
exports.default = exports.uploadByXhr;

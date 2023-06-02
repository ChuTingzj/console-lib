"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileHash = exports.fileSlice = void 0;
var spark_md5_1 = require("spark-md5");
var fileSlice = function (file, interval) {
    var chunks = [];
    for (var i = 0; i < file.size; i += interval) {
        chunks.push(file.slice(i, i + interval + 1));
    }
    return chunks;
};
exports.fileSlice = fileSlice;
var getFileHash = function (chunks) {
    return new Promise(function (resolve) {
        var spark = new spark_md5_1.default();
        var read = function (index) {
            if (index >= chunks.length) {
                resolve(spark.end());
                return;
            }
            var chunk = chunks[index];
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var _a;
                var bytes = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                spark.append(bytes);
                read(index + 1);
            };
            fileReader.readAsArrayBuffer(chunk);
        };
    });
};
exports.getFileHash = getFileHash;
exports.default = { fileSlice: exports.fileSlice, getFileHash: exports.getFileHash };

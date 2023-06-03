#! /usr/bin/env ts-node
//@ts-nocheck
// import {isArray} from '../dist/esm';
//@ts-nocheck
import {readdir, readFile, writeFile, appendFile, copyFile} from 'node:fs/promises';
//@ts-nocheck
import {resolve} from 'node:path';
// try {
//     (async ()=> {
//         const files = await readFile('../src/index.js', {encoding: 'utf8'});
//         console.log(files);
//     })();
// } catch (err) {
//     // eslint-disable-next-line no-console
//         console.error(err);
// }
// console.log(isArray('1'));
(async () => {
	const contents = await appendFile(resolve(__dirname, '../src/a.js'), 'let a = 1', 'utf8');
	console.log(contents);
})();
// console.log(resolve(__dirname,'../src/index.js').split('/'));

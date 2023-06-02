#! /usr/bin/env ts-node
//@ts-nocheck
import {isArray} from '../dist/esm';
//@ts-nocheck
import {readdir,readFile} from 'node:fs/promises';
try {
    (async ()=> {
        const files = await readFile('../src/index.js', {encoding: 'utf8'});
        console.log(files);
    })();
} catch (err) {
    // eslint-disable-next-line no-console
        console.error(err);
}
console.log(isArray('1'));

/**
 * Created by lihuiyin on 2020/11/12.
 */
// rollup.config.js
const path = require('path');
const rlv = function(filePath) {
    return path.join(__dirname, '..', filePath)
}
const version = require('../package.json').version;

import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

import { uglify } from 'rollup-plugin-uglify'

export default {
    input: rlv('./src/main-rollup.js'),
    output: {
        file: './dist/inmark.min.js',
        format: 'umd',
        sourcemap: false,
        name: 'inMark',
        intro: 'var global = typeof self !== undefined ? self : this;'
    },
    watch: {
        include: 'src/**',
    },
    plugins: [
        commonjs({ sourceMap: false }),
        builtins(),
        json({ preferConst: true }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({
            VERSION: JSON.stringify(version)
        }),
        uglify()
    ],
};
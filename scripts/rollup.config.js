/**
 * Created by lihuiyin on 2020/11/12.
 */
// rollup.config.js
const path = require('path');
const rlv = function(filePath) {
    return path.join(__dirname, '..', filePath)
}
const version = require('../package.json').version;

const ENV = process.env.NODE_ENV;

import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const livereload = require('rollup-plugin-livereload');
const serve = require('rollup-plugin-serve');

export default {
    input: rlv('./src/main-rollup.js'),
    output: {
        file: process.env.NODE_ENV === 'development' ? './dist/inmark.dev.js' : './dist/inmark.js',
        format: 'umd',
        sourcemap: process.env.NODE_ENV === 'development' ? true : false,
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
            VERSION: JSON.stringify(version),
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        ENV == 'development' ?
        livereload():
        '',
        // 开启服务
        ENV == 'development' ?
        serve({
            open: true, // 是否打开浏览器
            openPage: '/examples/index.html',
            contentBase: '', // 入口html的文件位置
            historyApiFallback: true, // Set to true to return index.html instead of 404
            host: 'localhost',
            port: 3003
        }) :
        ''
    ],
};
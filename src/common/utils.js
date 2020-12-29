import deepmerge from 'deepmerge';

export function merge() {
    let arr = Array.prototype.slice.call(arguments);
    return deepmerge.all(arr, {
        arrayMerge: function(destinationArray, sourceArray) {
            if (sourceArray.length > 0) {
                return sourceArray;
            } else {
                return destinationArray;
            }
        }
    });
}

export function calcHypotenuse(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

export function cosA(a, b, c) {
    let numerator = Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2);
    let denominator = 2 * b * c;
    return numerator / denominator;
}

export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
        '[object AsyncFunction]': 'async',
        '[object Promise]': 'promise'
    };
    return map[toString.call(obj)];
}
export function isNumber(num) {
    return typeOf(num) == 'number';
}
export function isBoolean(obj) {
    return typeOf(obj) == 'boolean';
}

/**
 * 是否是函数
 * @param {Mix}
 * @returns {Boolean}
 */
export function isFunction(func) {
    return typeOf(func) == 'function';
}

/**
 * 是否是异步函数
 * @param {Mix}
 * @returns {Boolean}
 */
export function isAsync(func) {
    return typeOf(func) === 'async';
}

/**
 * 是否是异步Promise函数
 * @param {Mix}
 * @returns {Boolean}
 */
export function isPromise(func) {
    return typeOf(func) === 'promise';
}

/**
 * 是否是字符串
 * @param {Mix}
 * @returns {Boolean}
 */
export function isString(string) {
    return typeOf(string) == 'string';
}

/**
 * 是否为对象类型
 * @param {Mix}
 * @returns {Boolean}
 */
export function isObject(object) {
    return typeOf(object) == 'object';
}
/**
 * 判断目标参数是否Array对象
 * @param {Mix} 
 * @returns {boolean} 类型判断结果
 */
export function isArray(source) {
    return typeOf(source) == 'array';
}
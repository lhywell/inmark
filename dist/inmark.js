(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("inMark", [], factory);
	else if(typeof exports === 'object')
		exports["inMark"] = factory();
	else
		root["inMark"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 190);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(22);
var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var ctx = __webpack_require__(23);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * @module zrender/core/util
 */
// 用于处理merge时无法遍历Date等对象的问题
var BUILTIN_OBJECT = {
  '[object Function]': 1,
  '[object RegExp]': 1,
  '[object Date]': 1,
  '[object Error]': 1,
  '[object CanvasGradient]': 1,
  '[object CanvasPattern]': 1,
  // For node-canvas
  '[object Image]': 1,
  '[object Canvas]': 1
};
var TYPED_ARRAY = {
  '[object Int8Array]': 1,
  '[object Uint8Array]': 1,
  '[object Uint8ClampedArray]': 1,
  '[object Int16Array]': 1,
  '[object Uint16Array]': 1,
  '[object Int32Array]': 1,
  '[object Uint32Array]': 1,
  '[object Float32Array]': 1,
  '[object Float64Array]': 1
};
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var nativeReduce = arrayProto.reduce; // Avoid assign to an exported variable, for transforming to cjs.

var methods = {};

function $override(name, fn) {
  // Clear ctx instance for different environment
  if (name === 'createCanvas') {
    _ctx = null;
  }

  methods[name] = fn;
}
/**
 * Those data types can be cloned:
 *     Plain object, Array, TypedArray, number, string, null, undefined.
 * Those data types will be assgined using the orginal data:
 *     BUILTIN_OBJECT
 * Instance of user defined class will be cloned to a plain object, without
 * properties in prototype.
 * Other data types is not supported (not sure what will happen).
 *
 * Caution: do not support clone Date, for performance consideration.
 * (There might be a large number of date in `series.data`).
 * So date should not be modified in and out of echarts.
 *
 * @param {*} source
 * @return {*} new
 */


function clone(source) {
  if (source == null || typeof source !== 'object') {
    return source;
  }

  var result = source;
  var typeStr = objToString.call(source);

  if (typeStr === '[object Array]') {
    if (!isPrimitive(source)) {
      result = [];

      for (var i = 0, len = source.length; i < len; i++) {
        result[i] = clone(source[i]);
      }
    }
  } else if (TYPED_ARRAY[typeStr]) {
    if (!isPrimitive(source)) {
      var Ctor = source.constructor;

      if (source.constructor.from) {
        result = Ctor.from(source);
      } else {
        result = new Ctor(source.length);

        for (var i = 0, len = source.length; i < len; i++) {
          result[i] = clone(source[i]);
        }
      }
    }
  } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
    result = {};

    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = clone(source[key]);
      }
    }
  }

  return result;
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overwrite=false]
 */


function merge(target, source, overwrite) {
  // We should escapse that source is string
  // and enter for ... in ...
  if (!isObject(source) || !isObject(target)) {
    return overwrite ? clone(source) : target;
  }

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      var targetProp = target[key];
      var sourceProp = source[key];

      if (isObject(sourceProp) && isObject(targetProp) && !isArray(sourceProp) && !isArray(targetProp) && !isDom(sourceProp) && !isDom(targetProp) && !isBuiltInObject(sourceProp) && !isBuiltInObject(targetProp) && !isPrimitive(sourceProp) && !isPrimitive(targetProp)) {
        // 如果需要递归覆盖，就递归调用merge
        merge(targetProp, sourceProp, overwrite);
      } else if (overwrite || !(key in target)) {
        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
        // NOTE，在 target[key] 不存在的时候也是直接覆盖
        target[key] = clone(source[key], true);
      }
    }
  }

  return target;
}
/**
 * @param {Array} targetAndSources The first item is target, and the rests are source.
 * @param {boolean} [overwrite=false]
 * @return {*} target
 */


function mergeAll(targetAndSources, overwrite) {
  var result = targetAndSources[0];

  for (var i = 1, len = targetAndSources.length; i < len; i++) {
    result = merge(result, targetAndSources[i], overwrite);
  }

  return result;
}
/**
 * @param {*} target
 * @param {*} source
 * @memberOf module:zrender/core/util
 */


function extend(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }

  return target;
}
/**
 * @param {*} target
 * @param {*} source
 * @param {boolean} [overlay=false]
 * @memberOf module:zrender/core/util
 */


function defaults(target, source, overlay) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && (overlay ? source[key] != null : target[key] == null)) {
      target[key] = source[key];
    }
  }

  return target;
}

var createCanvas = function () {
  return methods.createCanvas();
};

methods.createCanvas = function () {
  return document.createElement('canvas');
}; // FIXME


var _ctx;

function getContext() {
  if (!_ctx) {
    // Use util.createCanvas instead of createCanvas
    // because createCanvas may be overwritten in different environment
    _ctx = createCanvas().getContext('2d');
  }

  return _ctx;
}
/**
 * 查询数组中元素的index
 * @memberOf module:zrender/core/util
 */


function indexOf(array, value) {
  if (array) {
    if (array.indexOf) {
      return array.indexOf(value);
    }

    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === value) {
        return i;
      }
    }
  }

  return -1;
}
/**
 * 构造类继承关系
 *
 * @memberOf module:zrender/core/util
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */


function inherits(clazz, baseClazz) {
  var clazzPrototype = clazz.prototype;

  function F() {}

  F.prototype = baseClazz.prototype;
  clazz.prototype = new F();

  for (var prop in clazzPrototype) {
    if (clazzPrototype.hasOwnProperty(prop)) {
      clazz.prototype[prop] = clazzPrototype[prop];
    }
  }

  clazz.prototype.constructor = clazz;
  clazz.superClass = baseClazz;
}
/**
 * @memberOf module:zrender/core/util
 * @param {Object|Function} target
 * @param {Object|Function} sorce
 * @param {boolean} overlay
 */


function mixin(target, source, overlay) {
  target = 'prototype' in target ? target.prototype : target;
  source = 'prototype' in source ? source.prototype : source;
  defaults(target, source, overlay);
}
/**
 * Consider typed array.
 * @param {Array|TypedArray} data
 */


function isArrayLike(data) {
  if (!data) {
    return;
  }

  if (typeof data === 'string') {
    return false;
  }

  return typeof data.length === 'number';
}
/**
 * 数组或对象遍历
 * @memberOf module:zrender/core/util
 * @param {Object|Array} obj
 * @param {Function} cb
 * @param {*} [context]
 */


function each(obj, cb, context) {
  if (!(obj && cb)) {
    return;
  }

  if (obj.forEach && obj.forEach === nativeForEach) {
    obj.forEach(cb, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, len = obj.length; i < len; i++) {
      cb.call(context, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        cb.call(context, obj[key], key, obj);
      }
    }
  }
}
/**
 * 数组映射
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */


function map(obj, cb, context) {
  if (!(obj && cb)) {
    return;
  }

  if (obj.map && obj.map === nativeMap) {
    return obj.map(cb, context);
  } else {
    var result = [];

    for (var i = 0, len = obj.length; i < len; i++) {
      result.push(cb.call(context, obj[i], i, obj));
    }

    return result;
  }
}
/**
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {Object} [memo]
 * @param {*} [context]
 * @return {Array}
 */


function reduce(obj, cb, memo, context) {
  if (!(obj && cb)) {
    return;
  }

  if (obj.reduce && obj.reduce === nativeReduce) {
    return obj.reduce(cb, memo, context);
  } else {
    for (var i = 0, len = obj.length; i < len; i++) {
      memo = cb.call(context, memo, obj[i], i, obj);
    }

    return memo;
  }
}
/**
 * 数组过滤
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */


function filter(obj, cb, context) {
  if (!(obj && cb)) {
    return;
  }

  if (obj.filter && obj.filter === nativeFilter) {
    return obj.filter(cb, context);
  } else {
    var result = [];

    for (var i = 0, len = obj.length; i < len; i++) {
      if (cb.call(context, obj[i], i, obj)) {
        result.push(obj[i]);
      }
    }

    return result;
  }
}
/**
 * 数组项查找
 * @memberOf module:zrender/core/util
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {*}
 */


function find(obj, cb, context) {
  if (!(obj && cb)) {
    return;
  }

  for (var i = 0, len = obj.length; i < len; i++) {
    if (cb.call(context, obj[i], i, obj)) {
      return obj[i];
    }
  }
}
/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @param {*} context
 * @return {Function}
 */


function bind(func, context) {
  var args = nativeSlice.call(arguments, 2);
  return function () {
    return func.apply(context, args.concat(nativeSlice.call(arguments)));
  };
}
/**
 * @memberOf module:zrender/core/util
 * @param {Function} func
 * @return {Function}
 */


function curry(func) {
  var args = nativeSlice.call(arguments, 1);
  return function () {
    return func.apply(this, args.concat(nativeSlice.call(arguments)));
  };
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isArray(value) {
  return objToString.call(value) === '[object Array]';
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isFunction(value) {
  return typeof value === 'function';
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isString(value) {
  return objToString.call(value) === '[object String]';
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type === 'function' || !!value && type === 'object';
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isBuiltInObject(value) {
  return !!BUILTIN_OBJECT[objToString.call(value)];
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isTypedArray(value) {
  return !!TYPED_ARRAY[objToString.call(value)];
}
/**
 * @memberOf module:zrender/core/util
 * @param {*} value
 * @return {boolean}
 */


function isDom(value) {
  return typeof value === 'object' && typeof value.nodeType === 'number' && typeof value.ownerDocument === 'object';
}
/**
 * Whether is exactly NaN. Notice isNaN('a') returns true.
 * @param {*} value
 * @return {boolean}
 */


function eqNaN(value) {
  /* eslint-disable-next-line no-self-compare */
  return value !== value;
}
/**
 * If value1 is not null, then return value1, otherwise judget rest of values.
 * Low performance.
 * @memberOf module:zrender/core/util
 * @return {*} Final value
 */


function retrieve(values) {
  for (var i = 0, len = arguments.length; i < len; i++) {
    if (arguments[i] != null) {
      return arguments[i];
    }
  }
}

function retrieve2(value0, value1) {
  return value0 != null ? value0 : value1;
}

function retrieve3(value0, value1, value2) {
  return value0 != null ? value0 : value1 != null ? value1 : value2;
}
/**
 * @memberOf module:zrender/core/util
 * @param {Array} arr
 * @param {number} startIndex
 * @param {number} endIndex
 * @return {Array}
 */


function slice() {
  return Function.call.apply(nativeSlice, arguments);
}
/**
 * Normalize css liked array configuration
 * e.g.
 *  3 => [3, 3, 3, 3]
 *  [4, 2] => [4, 2, 4, 2]
 *  [4, 3, 2] => [4, 3, 2, 3]
 * @param {number|Array.<number>} val
 * @return {Array.<number>}
 */


function normalizeCssArray(val) {
  if (typeof val === 'number') {
    return [val, val, val, val];
  }

  var len = val.length;

  if (len === 2) {
    // vertical | horizontal
    return [val[0], val[1], val[0], val[1]];
  } else if (len === 3) {
    // top | horizontal | bottom
    return [val[0], val[1], val[2], val[1]];
  }

  return val;
}
/**
 * @memberOf module:zrender/core/util
 * @param {boolean} condition
 * @param {string} message
 */


function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
/**
 * @memberOf module:zrender/core/util
 * @param {string} str string to be trimed
 * @return {string} trimed string
 */


function trim(str) {
  if (str == null) {
    return null;
  } else if (typeof str.trim === 'function') {
    return str.trim();
  } else {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
}

var primitiveKey = '__ec_primitive__';
/**
 * Set an object as primitive to be ignored traversing children in clone or merge
 */

function setAsPrimitive(obj) {
  obj[primitiveKey] = true;
}

function isPrimitive(obj) {
  return obj[primitiveKey];
}
/**
 * @constructor
 * @param {Object} obj Only apply `ownProperty`.
 */


function HashMap(obj) {
  var isArr = isArray(obj); // Key should not be set on this, otherwise
  // methods get/set/... may be overrided.

  this.data = {};
  var thisMap = this;
  obj instanceof HashMap ? obj.each(visit) : obj && each(obj, visit);

  function visit(value, key) {
    isArr ? thisMap.set(value, key) : thisMap.set(key, value);
  }
}

HashMap.prototype = {
  constructor: HashMap,
  // Do not provide `has` method to avoid defining what is `has`.
  // (We usually treat `null` and `undefined` as the same, different
  // from ES6 Map).
  get: function (key) {
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  },
  set: function (key, value) {
    // Comparing with invocation chaining, `return value` is more commonly
    // used in this case: `var someVal = map.set('a', genVal());`
    return this.data[key] = value;
  },
  // Although util.each can be performed on this hashMap directly, user
  // should not use the exposed keys, who are prefixed.
  each: function (cb, context) {
    context !== void 0 && (cb = bind(cb, context));
    /* eslint-disable guard-for-in */

    for (var key in this.data) {
      this.data.hasOwnProperty(key) && cb(this.data[key], key);
    }
    /* eslint-enable guard-for-in */

  },
  // Do not use this method if performance sensitive.
  removeKey: function (key) {
    delete this.data[key];
  }
};

function createHashMap(obj) {
  return new HashMap(obj);
}

function concatArray(a, b) {
  var newArray = new a.constructor(a.length + b.length);

  for (var i = 0; i < a.length; i++) {
    newArray[i] = a[i];
  }

  var offset = a.length;

  for (i = 0; i < b.length; i++) {
    newArray[i + offset] = b[i];
  }

  return newArray;
}

function noop() {}

exports.$override = $override;
exports.clone = clone;
exports.merge = merge;
exports.mergeAll = mergeAll;
exports.extend = extend;
exports.defaults = defaults;
exports.createCanvas = createCanvas;
exports.getContext = getContext;
exports.indexOf = indexOf;
exports.inherits = inherits;
exports.mixin = mixin;
exports.isArrayLike = isArrayLike;
exports.each = each;
exports.map = map;
exports.reduce = reduce;
exports.filter = filter;
exports.find = find;
exports.bind = bind;
exports.curry = curry;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isObject = isObject;
exports.isBuiltInObject = isBuiltInObject;
exports.isTypedArray = isTypedArray;
exports.isDom = isDom;
exports.eqNaN = eqNaN;
exports.retrieve = retrieve;
exports.retrieve2 = retrieve2;
exports.retrieve3 = retrieve3;
exports.slice = slice;
exports.normalizeCssArray = normalizeCssArray;
exports.assert = assert;
exports.trim = trim;
exports.setAsPrimitive = setAsPrimitive;
exports.isPrimitive = isPrimitive;
exports.createHashMap = createHashMap;
exports.concatArray = concatArray;
exports.noop = noop;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(61)('wks');
var uid = __webpack_require__(46);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__(64);

var zrUtil = __webpack_require__(5);

var PathProxy = __webpack_require__(52);

var pathContain = __webpack_require__(404);

var Pattern = __webpack_require__(119);

var getCanvasPattern = Pattern.prototype.getCanvasPattern;
var abs = Math.abs;
var pathProxyForDraw = new PathProxy(true);
/**
 * @alias module:zrender/graphic/Path
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */

function Path(opts) {
  Displayable.call(this, opts);
  /**
   * @type {module:zrender/core/PathProxy}
   * @readOnly
   */

  this.path = null;
}

Path.prototype = {
  constructor: Path,
  type: 'path',
  __dirtyPath: true,
  strokeContainThreshold: 5,
  // This item default to be false. But in map series in echarts,
  // in order to improve performance, it should be set to true,
  // so the shorty segment won't draw.
  segmentIgnoreThreshold: 0,

  /**
   * See `module:zrender/src/graphic/helper/subPixelOptimize`.
   * @type {boolean}
   */
  subPixelOptimize: false,
  brush: function (ctx, prevEl) {
    var style = this.style;
    var path = this.path || pathProxyForDraw;
    var hasStroke = style.hasStroke();
    var hasFill = style.hasFill();
    var fill = style.fill;
    var stroke = style.stroke;
    var hasFillGradient = hasFill && !!fill.colorStops;
    var hasStrokeGradient = hasStroke && !!stroke.colorStops;
    var hasFillPattern = hasFill && !!fill.image;
    var hasStrokePattern = hasStroke && !!stroke.image;
    style.bind(ctx, this, prevEl);
    this.setTransform(ctx);

    if (this.__dirty) {
      var rect; // Update gradient because bounding rect may changed

      if (hasFillGradient) {
        rect = rect || this.getBoundingRect();
        this._fillGradient = style.getGradient(ctx, fill, rect);
      }

      if (hasStrokeGradient) {
        rect = rect || this.getBoundingRect();
        this._strokeGradient = style.getGradient(ctx, stroke, rect);
      }
    } // Use the gradient or pattern


    if (hasFillGradient) {
      // PENDING If may have affect the state
      ctx.fillStyle = this._fillGradient;
    } else if (hasFillPattern) {
      ctx.fillStyle = getCanvasPattern.call(fill, ctx);
    }

    if (hasStrokeGradient) {
      ctx.strokeStyle = this._strokeGradient;
    } else if (hasStrokePattern) {
      ctx.strokeStyle = getCanvasPattern.call(stroke, ctx);
    }

    var lineDash = style.lineDash;
    var lineDashOffset = style.lineDashOffset;
    var ctxLineDash = !!ctx.setLineDash; // Update path sx, sy

    var scale = this.getGlobalScale();
    path.setScale(scale[0], scale[1], this.segmentIgnoreThreshold); // Proxy context
    // Rebuild path in following 2 cases
    // 1. Path is dirty
    // 2. Path needs javascript implemented lineDash stroking.
    //    In this case, lineDash information will not be saved in PathProxy

    if (this.__dirtyPath || lineDash && !ctxLineDash && hasStroke) {
      path.beginPath(ctx); // Setting line dash before build path

      if (lineDash && !ctxLineDash) {
        path.setLineDash(lineDash);
        path.setLineDashOffset(lineDashOffset);
      }

      this.buildPath(path, this.shape, false); // Clear path dirty flag

      if (this.path) {
        this.__dirtyPath = false;
      }
    } else {
      // Replay path building
      ctx.beginPath();
      this.path.rebuildPath(ctx);
    }

    if (hasFill) {
      if (style.fillOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.fillOpacity * style.opacity;
        path.fill(ctx);
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        path.fill(ctx);
      }
    }

    if (lineDash && ctxLineDash) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }

    if (hasStroke) {
      if (style.strokeOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.strokeOpacity * style.opacity;
        path.stroke(ctx);
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        path.stroke(ctx);
      }
    }

    if (lineDash && ctxLineDash) {
      // PENDING
      // Remove lineDash
      ctx.setLineDash([]);
    } // Draw rect text


    if (style.text != null) {
      // Only restore transform when needs draw text.
      this.restoreTransform(ctx);
      this.drawRectText(ctx, this.getBoundingRect());
    }
  },
  // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
  // Like in circle
  buildPath: function (ctx, shapeCfg, inBundle) {},
  createPathProxy: function () {
    this.path = new PathProxy();
  },
  getBoundingRect: function () {
    var rect = this._rect;
    var style = this.style;
    var needsUpdateRect = !rect;

    if (needsUpdateRect) {
      var path = this.path;

      if (!path) {
        // Create path on demand.
        path = this.path = new PathProxy();
      }

      if (this.__dirtyPath) {
        path.beginPath();
        this.buildPath(path, this.shape, false);
      }

      rect = path.getBoundingRect();
    }

    this._rect = rect;

    if (style.hasStroke()) {
      // Needs update rect with stroke lineWidth when
      // 1. Element changes scale or lineWidth
      // 2. Shape is changed
      var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());

      if (this.__dirty || needsUpdateRect) {
        rectWithStroke.copy(rect); // FIXME Must after updateTransform

        var w = style.lineWidth; // PENDING, Min line width is needed when line is horizontal or vertical

        var lineScale = style.strokeNoScale ? this.getLineScale() : 1; // Only add extra hover lineWidth when there are no fill

        if (!style.hasFill()) {
          w = Math.max(w, this.strokeContainThreshold || 4);
        } // Consider line width
        // Line scale can't be 0;


        if (lineScale > 1e-10) {
          rectWithStroke.width += w / lineScale;
          rectWithStroke.height += w / lineScale;
          rectWithStroke.x -= w / lineScale / 2;
          rectWithStroke.y -= w / lineScale / 2;
        }
      } // Return rect with stroke


      return rectWithStroke;
    }

    return rect;
  },
  contain: function (x, y) {
    var localPos = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    var style = this.style;
    x = localPos[0];
    y = localPos[1];

    if (rect.contain(x, y)) {
      var pathData = this.path.data;

      if (style.hasStroke()) {
        var lineWidth = style.lineWidth;
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1; // Line scale can't be 0;

        if (lineScale > 1e-10) {
          // Only add extra hover lineWidth when there are no fill
          if (!style.hasFill()) {
            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
          }

          if (pathContain.containStroke(pathData, lineWidth / lineScale, x, y)) {
            return true;
          }
        }
      }

      if (style.hasFill()) {
        return pathContain.contain(pathData, x, y);
      }
    }

    return false;
  },

  /**
   * @param  {boolean} dirtyPath
   */
  dirty: function (dirtyPath) {
    if (dirtyPath == null) {
      dirtyPath = true;
    } // Only mark dirty, not mark clean


    if (dirtyPath) {
      this.__dirtyPath = dirtyPath;
      this._rect = null;
    }

    this.__dirty = this.__dirtyText = true;
    this.__zr && this.__zr.refresh(); // Used as a clipping path

    if (this.__clipTarget) {
      this.__clipTarget.dirty();
    }
  },

  /**
   * Alias for animate('shape')
   * @param {boolean} loop
   */
  animateShape: function (loop) {
    return this.animate('shape', loop);
  },
  // Overwrite attrKV
  attrKV: function (key, value) {
    // FIXME
    if (key === 'shape') {
      this.setShape(value);
      this.__dirtyPath = true;
      this._rect = null;
    } else {
      Displayable.prototype.attrKV.call(this, key, value);
    }
  },

  /**
   * @param {Object|string} key
   * @param {*} value
   */
  setShape: function (key, value) {
    var shape = this.shape; // Path from string may not have shape

    if (shape) {
      if (zrUtil.isObject(key)) {
        for (var name in key) {
          if (key.hasOwnProperty(name)) {
            shape[name] = key[name];
          }
        }
      } else {
        shape[key] = value;
      }

      this.dirty(true);
    }

    return this;
  },
  getLineScale: function () {
    var m = this.transform; // Get the line scale.
    // Determinant of `m` means how much the area is enlarged by the
    // transformation. So its square root can be used as a scale factor
    // for width.

    return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10 ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1])) : 1;
  }
};
/**
 * 扩展一个 Path element, 比如星形，圆等。
 * Extend a path element
 * @param {Object} props
 * @param {string} props.type Path type
 * @param {Function} props.init Initialize
 * @param {Function} props.buildPath Overwrite buildPath method
 * @param {Object} [props.style] Extended default style config
 * @param {Object} [props.shape] Extended default shape config
 */

Path.extend = function (defaults) {
  var Sub = function (opts) {
    Path.call(this, opts);

    if (defaults.style) {
      // Extend default style
      this.style.extendFrom(defaults.style, false);
    } // Extend default shape


    var defaultShape = defaults.shape;

    if (defaultShape) {
      this.shape = this.shape || {};
      var thisShape = this.shape;

      for (var name in defaultShape) {
        if (!thisShape.hasOwnProperty(name) && defaultShape.hasOwnProperty(name)) {
          thisShape[name] = defaultShape[name];
        }
      }
    }

    defaults.init && defaults.init.call(this, opts);
  };

  zrUtil.inherits(Sub, Path); // FIXME 不能 extend position, rotation 等引用对象

  for (var name in defaults) {
    // Extending prototype values and methods
    if (name !== 'style' && name !== 'shape') {
      Sub.prototype[name] = defaults[name];
    }
  }

  return Sub;
};

zrUtil.inherits(Path, Displayable);
var _default = Path;
module.exports = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(138);
var toPrimitive = __webpack_require__(29);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(42);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var has = __webpack_require__(16);
var SRC = __webpack_require__(46)('src');
var $toString = __webpack_require__(197);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(22).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(27);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(60);
var createDesc = __webpack_require__(42);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(29);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(138);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(107)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(59);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/* global Float32Array */
var ArrayCtor = typeof Float32Array === 'undefined' ? Array : Float32Array;
/**
 * 创建一个向量
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @return {Vector2}
 */

function create(x, y) {
  var out = new ArrayCtor(2);

  if (x == null) {
    x = 0;
  }

  if (y == null) {
    y = 0;
  }

  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * 复制向量数据
 * @param {Vector2} out
 * @param {Vector2} v
 * @return {Vector2}
 */


function copy(out, v) {
  out[0] = v[0];
  out[1] = v[1];
  return out;
}
/**
 * 克隆一个向量
 * @param {Vector2} v
 * @return {Vector2}
 */


function clone(v) {
  var out = new ArrayCtor(2);
  out[0] = v[0];
  out[1] = v[1];
  return out;
}
/**
 * 设置向量的两个项
 * @param {Vector2} out
 * @param {number} a
 * @param {number} b
 * @return {Vector2} 结果
 */


function set(out, a, b) {
  out[0] = a;
  out[1] = b;
  return out;
}
/**
 * 向量相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */


function add(out, v1, v2) {
  out[0] = v1[0] + v2[0];
  out[1] = v1[1] + v2[1];
  return out;
}
/**
 * 向量缩放后相加
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} a
 */


function scaleAndAdd(out, v1, v2, a) {
  out[0] = v1[0] + v2[0] * a;
  out[1] = v1[1] + v2[1] * a;
  return out;
}
/**
 * 向量相减
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */


function sub(out, v1, v2) {
  out[0] = v1[0] - v2[0];
  out[1] = v1[1] - v2[1];
  return out;
}
/**
 * 向量长度
 * @param {Vector2} v
 * @return {number}
 */


function len(v) {
  return Math.sqrt(lenSquare(v));
}

var length = len; // jshint ignore:line

/**
 * 向量长度平方
 * @param {Vector2} v
 * @return {number}
 */

function lenSquare(v) {
  return v[0] * v[0] + v[1] * v[1];
}

var lengthSquare = lenSquare;
/**
 * 向量乘法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */

function mul(out, v1, v2) {
  out[0] = v1[0] * v2[0];
  out[1] = v1[1] * v2[1];
  return out;
}
/**
 * 向量除法
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 */


function div(out, v1, v2) {
  out[0] = v1[0] / v2[0];
  out[1] = v1[1] / v2[1];
  return out;
}
/**
 * 向量点乘
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */


function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}
/**
 * 向量缩放
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {number} s
 */


function scale(out, v, s) {
  out[0] = v[0] * s;
  out[1] = v[1] * s;
  return out;
}
/**
 * 向量归一化
 * @param {Vector2} out
 * @param {Vector2} v
 */


function normalize(out, v) {
  var d = len(v);

  if (d === 0) {
    out[0] = 0;
    out[1] = 0;
  } else {
    out[0] = v[0] / d;
    out[1] = v[1] / d;
  }

  return out;
}
/**
 * 计算向量间距离
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */


function distance(v1, v2) {
  return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}

var dist = distance;
/**
 * 向量距离平方
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */

function distanceSquare(v1, v2) {
  return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}

var distSquare = distanceSquare;
/**
 * 求负向量
 * @param {Vector2} out
 * @param {Vector2} v
 */

function negate(out, v) {
  out[0] = -v[0];
  out[1] = -v[1];
  return out;
}
/**
 * 插值两个点
 * @param {Vector2} out
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} t
 */


function lerp(out, v1, v2, t) {
  out[0] = v1[0] + t * (v2[0] - v1[0]);
  out[1] = v1[1] + t * (v2[1] - v1[1]);
  return out;
}
/**
 * 矩阵左乘向量
 * @param {Vector2} out
 * @param {Vector2} v
 * @param {Vector2} m
 */


function applyTransform(out, v, m) {
  var x = v[0];
  var y = v[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * 求两个向量最小值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */


function min(out, v1, v2) {
  out[0] = Math.min(v1[0], v2[0]);
  out[1] = Math.min(v1[1], v2[1]);
  return out;
}
/**
 * 求两个向量最大值
 * @param  {Vector2} out
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 */


function max(out, v1, v2) {
  out[0] = Math.max(v1[0], v2[0]);
  out[1] = Math.max(v1[1], v2[1]);
  return out;
}

exports.create = create;
exports.copy = copy;
exports.clone = clone;
exports.set = set;
exports.add = add;
exports.scaleAndAdd = scaleAndAdd;
exports.sub = sub;
exports.len = len;
exports.length = length;
exports.lenSquare = lenSquare;
exports.lengthSquare = lengthSquare;
exports.mul = mul;
exports.div = div;
exports.dot = dot;
exports.scale = scale;
exports.normalize = normalize;
exports.distance = distance;
exports.dist = dist;
exports.distanceSquare = distanceSquare;
exports.distSquare = distSquare;
exports.negate = negate;
exports.lerp = lerp;
exports.applyTransform = applyTransform;
exports.min = min;
exports.max = max;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(23);
var IObject = __webpack_require__(59);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(7);
var asc = __webpack_require__(91);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(22);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var vec2 = __webpack_require__(20);

var matrix = __webpack_require__(54);

/**
 * @module echarts/core/BoundingRect
 */
var v2ApplyTransform = vec2.applyTransform;
var mathMin = Math.min;
var mathMax = Math.max;
/**
 * @alias module:echarts/core/BoundingRect
 */

function BoundingRect(x, y, width, height) {
  if (width < 0) {
    x = x + width;
    width = -width;
  }

  if (height < 0) {
    y = y + height;
    height = -height;
  }
  /**
   * @type {number}
   */


  this.x = x;
  /**
   * @type {number}
   */

  this.y = y;
  /**
   * @type {number}
   */

  this.width = width;
  /**
   * @type {number}
   */

  this.height = height;
}

BoundingRect.prototype = {
  constructor: BoundingRect,

  /**
   * @param {module:echarts/core/BoundingRect} other
   */
  union: function (other) {
    var x = mathMin(other.x, this.x);
    var y = mathMin(other.y, this.y);
    this.width = mathMax(other.x + other.width, this.x + this.width) - x;
    this.height = mathMax(other.y + other.height, this.y + this.height) - y;
    this.x = x;
    this.y = y;
  },

  /**
   * @param {Array.<number>} m
   * @methods
   */
  applyTransform: function () {
    var lt = [];
    var rb = [];
    var lb = [];
    var rt = [];
    return function (m) {
      // In case usage like this
      // el.getBoundingRect().applyTransform(el.transform)
      // And element has no transform
      if (!m) {
        return;
      }

      lt[0] = lb[0] = this.x;
      lt[1] = rt[1] = this.y;
      rb[0] = rt[0] = this.x + this.width;
      rb[1] = lb[1] = this.y + this.height;
      v2ApplyTransform(lt, lt, m);
      v2ApplyTransform(rb, rb, m);
      v2ApplyTransform(lb, lb, m);
      v2ApplyTransform(rt, rt, m);
      this.x = mathMin(lt[0], rb[0], lb[0], rt[0]);
      this.y = mathMin(lt[1], rb[1], lb[1], rt[1]);
      var maxX = mathMax(lt[0], rb[0], lb[0], rt[0]);
      var maxY = mathMax(lt[1], rb[1], lb[1], rt[1]);
      this.width = maxX - this.x;
      this.height = maxY - this.y;
    };
  }(),

  /**
   * Calculate matrix of transforming from self to target rect
   * @param  {module:zrender/core/BoundingRect} b
   * @return {Array.<number>}
   */
  calculateTransform: function (b) {
    var a = this;
    var sx = b.width / a.width;
    var sy = b.height / a.height;
    var m = matrix.create(); // 矩阵右乘

    matrix.translate(m, m, [-a.x, -a.y]);
    matrix.scale(m, m, [sx, sy]);
    matrix.translate(m, m, [b.x, b.y]);
    return m;
  },

  /**
   * @param {(module:echarts/core/BoundingRect|Object)} b
   * @return {boolean}
   */
  intersect: function (b) {
    if (!b) {
      return false;
    }

    if (!(b instanceof BoundingRect)) {
      // Normalize negative width/height.
      b = BoundingRect.create(b);
    }

    var a = this;
    var ax0 = a.x;
    var ax1 = a.x + a.width;
    var ay0 = a.y;
    var ay1 = a.y + a.height;
    var bx0 = b.x;
    var bx1 = b.x + b.width;
    var by0 = b.y;
    var by1 = b.y + b.height;
    return !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
  },
  contain: function (x, y) {
    var rect = this;
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  },

  /**
   * @return {module:echarts/core/BoundingRect}
   */
  clone: function () {
    return new BoundingRect(this.x, this.y, this.width, this.height);
  },

  /**
   * Copy from another rect
   */
  copy: function (other) {
    this.x = other.x;
    this.y = other.y;
    this.width = other.width;
    this.height = other.height;
  },
  plain: function () {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
};
/**
 * @param {Object|module:zrender/core/BoundingRect} rect
 * @param {number} rect.x
 * @param {number} rect.y
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {module:zrender/core/BoundingRect}
 */

BoundingRect.create = function (rect) {
  return new BoundingRect(rect.x, rect.y, rect.width, rect.height);
};

var _default = BoundingRect;
module.exports = _default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(160);
var $export = __webpack_require__(0);
var shared = __webpack_require__(61)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(164))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(8)) {
  var LIBRARY = __webpack_require__(34);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(77);
  var $buffer = __webpack_require__(112);
  var ctx = __webpack_require__(23);
  var anInstance = __webpack_require__(37);
  var propertyDesc = __webpack_require__(42);
  var hide = __webpack_require__(13);
  var redefineAll = __webpack_require__(43);
  var toInteger = __webpack_require__(25);
  var toLength = __webpack_require__(7);
  var toIndex = __webpack_require__(158);
  var toAbsoluteIndex = __webpack_require__(45);
  var toPrimitive = __webpack_require__(29);
  var has = __webpack_require__(16);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(98);
  var create = __webpack_require__(39);
  var getPrototypeOf = __webpack_require__(18);
  var gOPN = __webpack_require__(40).f;
  var getIterFn = __webpack_require__(114);
  var uid = __webpack_require__(46);
  var wks = __webpack_require__(6);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(65);
  var speciesConstructor = __webpack_require__(62);
  var ArrayIterators = __webpack_require__(115);
  var Iterators = __webpack_require__(49);
  var $iterDetect = __webpack_require__(70);
  var setSpecies = __webpack_require__(44);
  var arrayFill = __webpack_require__(90);
  var arrayCopyWithin = __webpack_require__(130);
  var $DP = __webpack_require__(10);
  var $GOPD = __webpack_require__(17);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(46)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */

/* global wx */
var env = {};

if (typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function') {
  // In Weixin Application
  env = {
    browser: {},
    os: {},
    node: false,
    wxa: true,
    // Weixin Application
    canvasSupported: true,
    svgSupported: false,
    touchEventsSupported: true,
    domSupported: false
  };
} else if (typeof document === 'undefined' && typeof self !== 'undefined') {
  // In worker
  env = {
    browser: {},
    os: {},
    node: false,
    worker: true,
    canvasSupported: true,
    domSupported: false
  };
} else if (typeof navigator === 'undefined') {
  // In node
  env = {
    browser: {},
    os: {},
    node: true,
    worker: false,
    // Assume canvas is supported
    canvasSupported: true,
    svgSupported: true,
    domSupported: false
  };
} else {
  env = detect(navigator.userAgent);
}

var _default = env; // Zepto.js
// (c) 2010-2013 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.

function detect(ua) {
  var os = {};
  var browser = {}; // var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
  // var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  // var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  // var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  // var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  // var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
  // var touchpad = webos && ua.match(/TouchPad/);
  // var kindle = ua.match(/Kindle\/([\d.]+)/);
  // var silk = ua.match(/Silk\/([\d._]+)/);
  // var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
  // var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
  // var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
  // var playbook = ua.match(/PlayBook/);
  // var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);

  var firefox = ua.match(/Firefox\/([\d.]+)/); // var safari = webkit && ua.match(/Mobile\//) && !chrome;
  // var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;

  var ie = ua.match(/MSIE\s([\d.]+)/) // IE 11 Trident/7.0; rv:11.0
  || ua.match(/Trident\/.+?rv:(([\d.]+))/);
  var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+

  var weChat = /micromessenger/i.test(ua); // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes
  // if (browser.webkit = !!webkit) browser.version = webkit[1];
  // if (android) os.android = true, os.version = android[2];
  // if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
  // if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
  // if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  // if (webos) os.webos = true, os.version = webos[2];
  // if (touchpad) os.touchpad = true;
  // if (blackberry) os.blackberry = true, os.version = blackberry[2];
  // if (bb10) os.bb10 = true, os.version = bb10[2];
  // if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
  // if (playbook) browser.playbook = true;
  // if (kindle) os.kindle = true, os.version = kindle[1];
  // if (silk) browser.silk = true, browser.version = silk[1];
  // if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
  // if (chrome) browser.chrome = true, browser.version = chrome[1];

  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  } // if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
  // if (webview) browser.webview = true;


  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }

  if (edge) {
    browser.edge = true;
    browser.version = edge[1];
  } // It is difficult to detect WeChat in Win Phone precisely, because ua can
  // not be set on win phone. So we do not consider Win Phone.


  if (weChat) {
    browser.weChat = true;
  } // os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
  //     (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
  // os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos ||
  //     (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
  //     (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));


  return {
    browser: browser,
    os: os,
    node: false,
    // 原生canvas支持，改极端点了
    // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
    canvasSupported: !!document.createElement('canvas').getContext,
    svgSupported: typeof SVGRect !== 'undefined',
    // works on most browsers
    // IE10/11 does not support touch event, and MS Edge supports them but not by
    // default, so we dont check navigator.maxTouchPoints for them here.
    touchEventsSupported: 'ontouchstart' in window && !browser.ie && !browser.edge,
    // <http://caniuse.com/#search=pointer%20event>.
    pointerEventsSupported: // (1) Firefox supports pointer but not by default, only MS browsers are reliable on pointer
    // events currently. So we dont use that on other browsers unless tested sufficiently.
    // For example, in iOS 13 Mobile Chromium 78, if the touching behavior starts page
    // scroll, the `pointermove` event can not be fired any more. That will break some
    // features like "pan horizontally to move something and pan vertically to page scroll".
    // The horizontal pan probably be interrupted by the casually triggered page scroll.
    // (2) Although IE 10 supports pointer event, it use old style and is different from the
    // standard. So we exclude that. (IE 10 is hardly used on touch device)
    'onpointerdown' in window && (browser.edge || browser.ie && browser.version >= 11),
    // passiveSupported: detectPassiveSupport()
    domSupported: typeof document !== 'undefined'
  };
} // See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
// function detectPassiveSupport() {
//     // Test via a getter in the options object to see if the passive property is accessed
//     var supportsPassive = false;
//     try {
//         var opts = Object.defineProperty({}, 'passive', {
//             get: function() {
//                 supportsPassive = true;
//             }
//         });
//         window.addEventListener('testPassive', function() {}, opts);
//     } catch (e) {
//     }
//     return supportsPassive;
// }


module.exports = _default;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var call = __webpack_require__(141);
var isArrayIter = __webpack_require__(98);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(7);
var getIterFn = __webpack_require__(114);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(147);
var enumBugKeys = __webpack_require__(94);
var IE_PROTO = __webpack_require__(107)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(93)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(96).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(149);
var hiddenKeys = __webpack_require__(94).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(149);
var enumBugKeys = __webpack_require__(94);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(27);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(110);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var curve = __webpack_require__(53);

var vec2 = __webpack_require__(20);

var bbox = __webpack_require__(409);

var BoundingRect = __webpack_require__(30);

var _config = __webpack_require__(80);

var dpr = _config.devicePixelRatio;

/**
 * Path 代理，可以在`buildPath`中用于替代`ctx`, 会保存每个path操作的命令到pathCommands属性中
 * 可以用于 isInsidePath 判断以及获取boundingRect
 *
 * @module zrender/core/PathProxy
 * @author Yi Shen (http://www.github.com/pissang)
 */
// TODO getTotalLength, getPointAtLength

/* global Float32Array */
var CMD = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  // Rect
  R: 7
}; // var CMD_MEM_SIZE = {
//     M: 3,
//     L: 3,
//     C: 7,
//     Q: 5,
//     A: 9,
//     R: 5,
//     Z: 1
// };

var min = [];
var max = [];
var min2 = [];
var max2 = [];
var mathMin = Math.min;
var mathMax = Math.max;
var mathCos = Math.cos;
var mathSin = Math.sin;
var mathSqrt = Math.sqrt;
var mathAbs = Math.abs;
var hasTypedArray = typeof Float32Array !== 'undefined';
/**
 * @alias module:zrender/core/PathProxy
 * @constructor
 */

var PathProxy = function (notSaveData) {
  this._saveData = !(notSaveData || false);

  if (this._saveData) {
    /**
     * Path data. Stored as flat array
     * @type {Array.<Object>}
     */
    this.data = [];
  }

  this._ctx = null;
};
/**
 * 快速计算Path包围盒（并不是最小包围盒）
 * @return {Object}
 */


PathProxy.prototype = {
  constructor: PathProxy,
  _xi: 0,
  _yi: 0,
  _x0: 0,
  _y0: 0,
  // Unit x, Unit y. Provide for avoiding drawing that too short line segment
  _ux: 0,
  _uy: 0,
  _len: 0,
  _lineDash: null,
  _dashOffset: 0,
  _dashIdx: 0,
  _dashSum: 0,

  /**
   * @readOnly
   */
  setScale: function (sx, sy, segmentIgnoreThreshold) {
    // Compat. Previously there is no segmentIgnoreThreshold.
    segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
    this._ux = mathAbs(segmentIgnoreThreshold / dpr / sx) || 0;
    this._uy = mathAbs(segmentIgnoreThreshold / dpr / sy) || 0;
  },
  getContext: function () {
    return this._ctx;
  },

  /**
   * @param  {CanvasRenderingContext2D} ctx
   * @return {module:zrender/core/PathProxy}
   */
  beginPath: function (ctx) {
    this._ctx = ctx;
    ctx && ctx.beginPath();
    ctx && (this.dpr = ctx.dpr); // Reset

    if (this._saveData) {
      this._len = 0;
    }

    if (this._lineDash) {
      this._lineDash = null;
      this._dashOffset = 0;
    }

    return this;
  },

  /**
   * @param  {number} x
   * @param  {number} y
   * @return {module:zrender/core/PathProxy}
   */
  moveTo: function (x, y) {
    this.addData(CMD.M, x, y);
    this._ctx && this._ctx.moveTo(x, y); // x0, y0, xi, yi 是记录在 _dashedXXXXTo 方法中使用
    // xi, yi 记录当前点, x0, y0 在 closePath 的时候回到起始点。
    // 有可能在 beginPath 之后直接调用 lineTo，这时候 x0, y0 需要
    // 在 lineTo 方法中记录，这里先不考虑这种情况，dashed line 也只在 IE10- 中不支持

    this._x0 = x;
    this._y0 = y;
    this._xi = x;
    this._yi = y;
    return this;
  },

  /**
   * @param  {number} x
   * @param  {number} y
   * @return {module:zrender/core/PathProxy}
   */
  lineTo: function (x, y) {
    var exceedUnit = mathAbs(x - this._xi) > this._ux || mathAbs(y - this._yi) > this._uy // Force draw the first segment
    || this._len < 5;
    this.addData(CMD.L, x, y);

    if (this._ctx && exceedUnit) {
      this._needsDash() ? this._dashedLineTo(x, y) : this._ctx.lineTo(x, y);
    }

    if (exceedUnit) {
      this._xi = x;
      this._yi = y;
    }

    return this;
  },

  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @param  {number} x3
   * @param  {number} y3
   * @return {module:zrender/core/PathProxy}
   */
  bezierCurveTo: function (x1, y1, x2, y2, x3, y3) {
    this.addData(CMD.C, x1, y1, x2, y2, x3, y3);

    if (this._ctx) {
      this._needsDash() ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3) : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    }

    this._xi = x3;
    this._yi = y3;
    return this;
  },

  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @return {module:zrender/core/PathProxy}
   */
  quadraticCurveTo: function (x1, y1, x2, y2) {
    this.addData(CMD.Q, x1, y1, x2, y2);

    if (this._ctx) {
      this._needsDash() ? this._dashedQuadraticTo(x1, y1, x2, y2) : this._ctx.quadraticCurveTo(x1, y1, x2, y2);
    }

    this._xi = x2;
    this._yi = y2;
    return this;
  },

  /**
   * @param  {number} cx
   * @param  {number} cy
   * @param  {number} r
   * @param  {number} startAngle
   * @param  {number} endAngle
   * @param  {boolean} anticlockwise
   * @return {module:zrender/core/PathProxy}
   */
  arc: function (cx, cy, r, startAngle, endAngle, anticlockwise) {
    this.addData(CMD.A, cx, cy, r, r, startAngle, endAngle - startAngle, 0, anticlockwise ? 0 : 1);
    this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
    this._xi = mathCos(endAngle) * r + cx;
    this._yi = mathSin(endAngle) * r + cy;
    return this;
  },
  // TODO
  arcTo: function (x1, y1, x2, y2, radius) {
    if (this._ctx) {
      this._ctx.arcTo(x1, y1, x2, y2, radius);
    }

    return this;
  },
  // TODO
  rect: function (x, y, w, h) {
    this._ctx && this._ctx.rect(x, y, w, h);
    this.addData(CMD.R, x, y, w, h);
    return this;
  },

  /**
   * @return {module:zrender/core/PathProxy}
   */
  closePath: function () {
    this.addData(CMD.Z);
    var ctx = this._ctx;
    var x0 = this._x0;
    var y0 = this._y0;

    if (ctx) {
      this._needsDash() && this._dashedLineTo(x0, y0);
      ctx.closePath();
    }

    this._xi = x0;
    this._yi = y0;
    return this;
  },

  /**
   * Context 从外部传入，因为有可能是 rebuildPath 完之后再 fill。
   * stroke 同样
   * @param {CanvasRenderingContext2D} ctx
   * @return {module:zrender/core/PathProxy}
   */
  fill: function (ctx) {
    ctx && ctx.fill();
    this.toStatic();
  },

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @return {module:zrender/core/PathProxy}
   */
  stroke: function (ctx) {
    ctx && ctx.stroke();
    this.toStatic();
  },

  /**
   * 必须在其它绘制命令前调用
   * Must be invoked before all other path drawing methods
   * @return {module:zrender/core/PathProxy}
   */
  setLineDash: function (lineDash) {
    if (lineDash instanceof Array) {
      this._lineDash = lineDash;
      this._dashIdx = 0;
      var lineDashSum = 0;

      for (var i = 0; i < lineDash.length; i++) {
        lineDashSum += lineDash[i];
      }

      this._dashSum = lineDashSum;
    }

    return this;
  },

  /**
   * 必须在其它绘制命令前调用
   * Must be invoked before all other path drawing methods
   * @return {module:zrender/core/PathProxy}
   */
  setLineDashOffset: function (offset) {
    this._dashOffset = offset;
    return this;
  },

  /**
   *
   * @return {boolean}
   */
  len: function () {
    return this._len;
  },

  /**
   * 直接设置 Path 数据
   */
  setData: function (data) {
    var len = data.length;

    if (!(this.data && this.data.length === len) && hasTypedArray) {
      this.data = new Float32Array(len);
    }

    for (var i = 0; i < len; i++) {
      this.data[i] = data[i];
    }

    this._len = len;
  },

  /**
   * 添加子路径
   * @param {module:zrender/core/PathProxy|Array.<module:zrender/core/PathProxy>} path
   */
  appendPath: function (path) {
    if (!(path instanceof Array)) {
      path = [path];
    }

    var len = path.length;
    var appendSize = 0;
    var offset = this._len;

    for (var i = 0; i < len; i++) {
      appendSize += path[i].len();
    }

    if (hasTypedArray && this.data instanceof Float32Array) {
      this.data = new Float32Array(offset + appendSize);
    }

    for (var i = 0; i < len; i++) {
      var appendPathData = path[i].data;

      for (var k = 0; k < appendPathData.length; k++) {
        this.data[offset++] = appendPathData[k];
      }
    }

    this._len = offset;
  },

  /**
   * 填充 Path 数据。
   * 尽量复用而不申明新的数组。大部分图形重绘的指令数据长度都是不变的。
   */
  addData: function (cmd) {
    if (!this._saveData) {
      return;
    }

    var data = this.data;

    if (this._len + arguments.length > data.length) {
      // 因为之前的数组已经转换成静态的 Float32Array
      // 所以不够用时需要扩展一个新的动态数组
      this._expandData();

      data = this.data;
    }

    for (var i = 0; i < arguments.length; i++) {
      data[this._len++] = arguments[i];
    }

    this._prevCmd = cmd;
  },
  _expandData: function () {
    // Only if data is Float32Array
    if (!(this.data instanceof Array)) {
      var newData = [];

      for (var i = 0; i < this._len; i++) {
        newData[i] = this.data[i];
      }

      this.data = newData;
    }
  },

  /**
   * If needs js implemented dashed line
   * @return {boolean}
   * @private
   */
  _needsDash: function () {
    return this._lineDash;
  },
  _dashedLineTo: function (x1, y1) {
    var dashSum = this._dashSum;
    var offset = this._dashOffset;
    var lineDash = this._lineDash;
    var ctx = this._ctx;
    var x0 = this._xi;
    var y0 = this._yi;
    var dx = x1 - x0;
    var dy = y1 - y0;
    var dist = mathSqrt(dx * dx + dy * dy);
    var x = x0;
    var y = y0;
    var dash;
    var nDash = lineDash.length;
    var idx;
    dx /= dist;
    dy /= dist;

    if (offset < 0) {
      // Convert to positive offset
      offset = dashSum + offset;
    }

    offset %= dashSum;
    x -= offset * dx;
    y -= offset * dy;

    while (dx > 0 && x <= x1 || dx < 0 && x >= x1 || dx === 0 && (dy > 0 && y <= y1 || dy < 0 && y >= y1)) {
      idx = this._dashIdx;
      dash = lineDash[idx];
      x += dx * dash;
      y += dy * dash;
      this._dashIdx = (idx + 1) % nDash; // Skip positive offset

      if (dx > 0 && x < x0 || dx < 0 && x > x0 || dy > 0 && y < y0 || dy < 0 && y > y0) {
        continue;
      }

      ctx[idx % 2 ? 'moveTo' : 'lineTo'](dx >= 0 ? mathMin(x, x1) : mathMax(x, x1), dy >= 0 ? mathMin(y, y1) : mathMax(y, y1));
    } // Offset for next lineTo


    dx = x - x1;
    dy = y - y1;
    this._dashOffset = -mathSqrt(dx * dx + dy * dy);
  },
  // Not accurate dashed line to
  _dashedBezierTo: function (x1, y1, x2, y2, x3, y3) {
    var dashSum = this._dashSum;
    var offset = this._dashOffset;
    var lineDash = this._lineDash;
    var ctx = this._ctx;
    var x0 = this._xi;
    var y0 = this._yi;
    var t;
    var dx;
    var dy;
    var cubicAt = curve.cubicAt;
    var bezierLen = 0;
    var idx = this._dashIdx;
    var nDash = lineDash.length;
    var x;
    var y;
    var tmpLen = 0;

    if (offset < 0) {
      // Convert to positive offset
      offset = dashSum + offset;
    }

    offset %= dashSum; // Bezier approx length

    for (t = 0; t < 1; t += 0.1) {
      dx = cubicAt(x0, x1, x2, x3, t + 0.1) - cubicAt(x0, x1, x2, x3, t);
      dy = cubicAt(y0, y1, y2, y3, t + 0.1) - cubicAt(y0, y1, y2, y3, t);
      bezierLen += mathSqrt(dx * dx + dy * dy);
    } // Find idx after add offset


    for (; idx < nDash; idx++) {
      tmpLen += lineDash[idx];

      if (tmpLen > offset) {
        break;
      }
    }

    t = (tmpLen - offset) / bezierLen;

    while (t <= 1) {
      x = cubicAt(x0, x1, x2, x3, t);
      y = cubicAt(y0, y1, y2, y3, t); // Use line to approximate dashed bezier
      // Bad result if dash is long

      idx % 2 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      t += lineDash[idx] / bezierLen;
      idx = (idx + 1) % nDash;
    } // Finish the last segment and calculate the new offset


    idx % 2 !== 0 && ctx.lineTo(x3, y3);
    dx = x3 - x;
    dy = y3 - y;
    this._dashOffset = -mathSqrt(dx * dx + dy * dy);
  },
  _dashedQuadraticTo: function (x1, y1, x2, y2) {
    // Convert quadratic to cubic using degree elevation
    var x3 = x2;
    var y3 = y2;
    x2 = (x2 + 2 * x1) / 3;
    y2 = (y2 + 2 * y1) / 3;
    x1 = (this._xi + 2 * x1) / 3;
    y1 = (this._yi + 2 * y1) / 3;

    this._dashedBezierTo(x1, y1, x2, y2, x3, y3);
  },

  /**
   * 转成静态的 Float32Array 减少堆内存占用
   * Convert dynamic array to static Float32Array
   */
  toStatic: function () {
    var data = this.data;

    if (data instanceof Array) {
      data.length = this._len;

      if (hasTypedArray) {
        this.data = new Float32Array(data);
      }
    }
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getBoundingRect: function () {
    min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
    max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
    var data = this.data;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;

    for (var i = 0; i < data.length;) {
      var cmd = data[i++];

      if (i === 1) {
        // 如果第一个命令是 L, C, Q
        // 则 previous point 同绘制命令的第一个 point
        //
        // 第一个命令为 Arc 的情况下会在后面特殊处理
        xi = data[i];
        yi = data[i + 1];
        x0 = xi;
        y0 = yi;
      }

      switch (cmd) {
        case CMD.M:
          // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
          // 在 closePath 的时候使用
          x0 = data[i++];
          y0 = data[i++];
          xi = x0;
          yi = y0;
          min2[0] = x0;
          min2[1] = y0;
          max2[0] = x0;
          max2[1] = y0;
          break;

        case CMD.L:
          bbox.fromLine(xi, yi, data[i], data[i + 1], min2, max2);
          xi = data[i++];
          yi = data[i++];
          break;

        case CMD.C:
          bbox.fromCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], min2, max2);
          xi = data[i++];
          yi = data[i++];
          break;

        case CMD.Q:
          bbox.fromQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], min2, max2);
          xi = data[i++];
          yi = data[i++];
          break;

        case CMD.A:
          // TODO Arc 判断的开销比较大
          var cx = data[i++];
          var cy = data[i++];
          var rx = data[i++];
          var ry = data[i++];
          var startAngle = data[i++];
          var endAngle = data[i++] + startAngle; // TODO Arc 旋转

          i += 1;
          var anticlockwise = 1 - data[i++];

          if (i === 1) {
            // 直接使用 arc 命令
            // 第一个命令起点还未定义
            x0 = mathCos(startAngle) * rx + cx;
            y0 = mathSin(startAngle) * ry + cy;
          }

          bbox.fromArc(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2);
          xi = mathCos(endAngle) * rx + cx;
          yi = mathSin(endAngle) * ry + cy;
          break;

        case CMD.R:
          x0 = xi = data[i++];
          y0 = yi = data[i++];
          var width = data[i++];
          var height = data[i++]; // Use fromLine

          bbox.fromLine(x0, y0, x0 + width, y0 + height, min2, max2);
          break;

        case CMD.Z:
          xi = x0;
          yi = y0;
          break;
      } // Union


      vec2.min(min, min, min2);
      vec2.max(max, max, max2);
    } // No data


    if (i === 0) {
      min[0] = min[1] = max[0] = max[1] = 0;
    }

    return new BoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  },

  /**
   * Rebuild path from current data
   * Rebuild path will not consider javascript implemented line dash.
   * @param {CanvasRenderingContext2D} ctx
   */
  rebuildPath: function (ctx) {
    var d = this.data;
    var x0;
    var y0;
    var xi;
    var yi;
    var x;
    var y;
    var ux = this._ux;
    var uy = this._uy;
    var len = this._len;

    for (var i = 0; i < len;) {
      var cmd = d[i++];

      if (i === 1) {
        // 如果第一个命令是 L, C, Q
        // 则 previous point 同绘制命令的第一个 point
        //
        // 第一个命令为 Arc 的情况下会在后面特殊处理
        xi = d[i];
        yi = d[i + 1];
        x0 = xi;
        y0 = yi;
      }

      switch (cmd) {
        case CMD.M:
          x0 = xi = d[i++];
          y0 = yi = d[i++];
          ctx.moveTo(xi, yi);
          break;

        case CMD.L:
          x = d[i++];
          y = d[i++]; // Not draw too small seg between

          if (mathAbs(x - xi) > ux || mathAbs(y - yi) > uy || i === len - 1) {
            ctx.lineTo(x, y);
            xi = x;
            yi = y;
          }

          break;

        case CMD.C:
          ctx.bezierCurveTo(d[i++], d[i++], d[i++], d[i++], d[i++], d[i++]);
          xi = d[i - 2];
          yi = d[i - 1];
          break;

        case CMD.Q:
          ctx.quadraticCurveTo(d[i++], d[i++], d[i++], d[i++]);
          xi = d[i - 2];
          yi = d[i - 1];
          break;

        case CMD.A:
          var cx = d[i++];
          var cy = d[i++];
          var rx = d[i++];
          var ry = d[i++];
          var theta = d[i++];
          var dTheta = d[i++];
          var psi = d[i++];
          var fs = d[i++];
          var r = rx > ry ? rx : ry;
          var scaleX = rx > ry ? 1 : rx / ry;
          var scaleY = rx > ry ? ry / rx : 1;
          var isEllipse = Math.abs(rx - ry) > 1e-3;
          var endAngle = theta + dTheta;

          if (isEllipse) {
            ctx.translate(cx, cy);
            ctx.rotate(psi);
            ctx.scale(scaleX, scaleY);
            ctx.arc(0, 0, r, theta, endAngle, 1 - fs);
            ctx.scale(1 / scaleX, 1 / scaleY);
            ctx.rotate(-psi);
            ctx.translate(-cx, -cy);
          } else {
            ctx.arc(cx, cy, r, theta, endAngle, 1 - fs);
          }

          if (i === 1) {
            // 直接使用 arc 命令
            // 第一个命令起点还未定义
            x0 = mathCos(theta) * rx + cx;
            y0 = mathSin(theta) * ry + cy;
          }

          xi = mathCos(endAngle) * rx + cx;
          yi = mathSin(endAngle) * ry + cy;
          break;

        case CMD.R:
          x0 = xi = d[i];
          y0 = yi = d[i + 1];
          ctx.rect(d[i++], d[i++], d[i++], d[i++]);
          break;

        case CMD.Z:
          ctx.closePath();
          xi = x0;
          yi = y0;
      }
    }
  }
};
PathProxy.CMD = CMD;
var _default = PathProxy;
module.exports = _default;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var _vector = __webpack_require__(20);

var v2Create = _vector.create;
var v2DistSquare = _vector.distSquare;

/**
 * 曲线辅助模块
 * @module zrender/core/curve
 * @author pissang(https://www.github.com/pissang)
 */
var mathPow = Math.pow;
var mathSqrt = Math.sqrt;
var EPSILON = 1e-8;
var EPSILON_NUMERIC = 1e-4;
var THREE_SQRT = mathSqrt(3);
var ONE_THIRD = 1 / 3; // 临时变量

var _v0 = v2Create();

var _v1 = v2Create();

var _v2 = v2Create();

function isAroundZero(val) {
  return val > -EPSILON && val < EPSILON;
}

function isNotAroundZero(val) {
  return val > EPSILON || val < -EPSILON;
}
/**
 * 计算三次贝塞尔值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */


function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * (onet * p0 + 3 * t * p1) + t * t * (t * p3 + 3 * onet * p2);
}
/**
 * 计算三次贝塞尔导数值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @return {number}
 */


function cubicDerivativeAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t);
}
/**
 * 计算三次贝塞尔方程根，使用盛金公式
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} val
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */


function cubicRootAt(p0, p1, p2, p3, val, roots) {
  // Evaluate roots of cubic functions
  var a = p3 + 3 * (p1 - p2) - p0;
  var b = 3 * (p2 - p1 * 2 + p0);
  var c = 3 * (p1 - p0);
  var d = p0 - val;
  var A = b * b - 3 * a * c;
  var B = b * c - 9 * a * d;
  var C = c * c - 3 * b * d;
  var n = 0;

  if (isAroundZero(A) && isAroundZero(B)) {
    if (isAroundZero(b)) {
      roots[0] = 0;
    } else {
      var t1 = -c / b; //t1, t2, t3, b is not zero

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }
    }
  } else {
    var disc = B * B - 4 * A * C;

    if (isAroundZero(disc)) {
      var K = B / A;
      var t1 = -b / a + K; // t1, a is not zero

      var t2 = -K / 2; // t2, t3

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }

      if (t2 >= 0 && t2 <= 1) {
        roots[n++] = t2;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var Y1 = A * b + 1.5 * a * (-B + discSqrt);
      var Y2 = A * b + 1.5 * a * (-B - discSqrt);

      if (Y1 < 0) {
        Y1 = -mathPow(-Y1, ONE_THIRD);
      } else {
        Y1 = mathPow(Y1, ONE_THIRD);
      }

      if (Y2 < 0) {
        Y2 = -mathPow(-Y2, ONE_THIRD);
      } else {
        Y2 = mathPow(Y2, ONE_THIRD);
      }

      var t1 = (-b - (Y1 + Y2)) / (3 * a);

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }
    } else {
      var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A));
      var theta = Math.acos(T) / 3;
      var ASqrt = mathSqrt(A);
      var tmp = Math.cos(theta);
      var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
      var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
      var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }

      if (t2 >= 0 && t2 <= 1) {
        roots[n++] = t2;
      }

      if (t3 >= 0 && t3 <= 1) {
        roots[n++] = t3;
      }
    }
  }

  return n;
}
/**
 * 计算三次贝塞尔方程极限值的位置
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {Array.<number>} extrema
 * @return {number} 有效数目
 */


function cubicExtrema(p0, p1, p2, p3, extrema) {
  var b = 6 * p2 - 12 * p1 + 6 * p0;
  var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
  var c = 3 * p1 - 3 * p0;
  var n = 0;

  if (isAroundZero(a)) {
    if (isNotAroundZero(b)) {
      var t1 = -c / b;

      if (t1 >= 0 && t1 <= 1) {
        extrema[n++] = t1;
      }
    }
  } else {
    var disc = b * b - 4 * a * c;

    if (isAroundZero(disc)) {
      extrema[0] = -b / (2 * a);
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var t1 = (-b + discSqrt) / (2 * a);
      var t2 = (-b - discSqrt) / (2 * a);

      if (t1 >= 0 && t1 <= 1) {
        extrema[n++] = t1;
      }

      if (t2 >= 0 && t2 <= 1) {
        extrema[n++] = t2;
      }
    }
  }

  return n;
}
/**
 * 细分三次贝塞尔曲线
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {Array.<number>} out
 */


function cubicSubdivide(p0, p1, p2, p3, t, out) {
  var p01 = (p1 - p0) * t + p0;
  var p12 = (p2 - p1) * t + p1;
  var p23 = (p3 - p2) * t + p2;
  var p012 = (p12 - p01) * t + p01;
  var p123 = (p23 - p12) * t + p12;
  var p0123 = (p123 - p012) * t + p012; // Seg0

  out[0] = p0;
  out[1] = p01;
  out[2] = p012;
  out[3] = p0123; // Seg1

  out[4] = p0123;
  out[5] = p123;
  out[6] = p23;
  out[7] = p3;
}
/**
 * 投射点到三次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} [out] 投射点
 * @return {number}
 */


function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
  // http://pomax.github.io/bezierinfo/#projections
  var t;
  var interval = 0.005;
  var d = Infinity;
  var prev;
  var next;
  var d1;
  var d2;
  _v0[0] = x;
  _v0[1] = y; // 先粗略估计一下可能的最小距离的 t 值
  // PENDING

  for (var _t = 0; _t < 1; _t += 0.05) {
    _v1[0] = cubicAt(x0, x1, x2, x3, _t);
    _v1[1] = cubicAt(y0, y1, y2, y3, _t);
    d1 = v2DistSquare(_v0, _v1);

    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }

  d = Infinity; // At most 32 iteration

  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }

    prev = t - interval;
    next = t + interval; // t - interval

    _v1[0] = cubicAt(x0, x1, x2, x3, prev);
    _v1[1] = cubicAt(y0, y1, y2, y3, prev);
    d1 = v2DistSquare(_v1, _v0);

    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      // t + interval
      _v2[0] = cubicAt(x0, x1, x2, x3, next);
      _v2[1] = cubicAt(y0, y1, y2, y3, next);
      d2 = v2DistSquare(_v2, _v0);

      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  } // t


  if (out) {
    out[0] = cubicAt(x0, x1, x2, x3, t);
    out[1] = cubicAt(y0, y1, y2, y3, t);
  } // console.log(interval, i);


  return mathSqrt(d);
}
/**
 * 计算二次方贝塞尔值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */


function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}
/**
 * 计算二次方贝塞尔导数值
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @return {number}
 */


function quadraticDerivativeAt(p0, p1, p2, t) {
  return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}
/**
 * 计算二次方贝塞尔方程根
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} roots
 * @return {number} 有效根数目
 */


function quadraticRootAt(p0, p1, p2, val, roots) {
  var a = p0 - 2 * p1 + p2;
  var b = 2 * (p1 - p0);
  var c = p0 - val;
  var n = 0;

  if (isAroundZero(a)) {
    if (isNotAroundZero(b)) {
      var t1 = -c / b;

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }
    }
  } else {
    var disc = b * b - 4 * a * c;

    if (isAroundZero(disc)) {
      var t1 = -b / (2 * a);

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var t1 = (-b + discSqrt) / (2 * a);
      var t2 = (-b - discSqrt) / (2 * a);

      if (t1 >= 0 && t1 <= 1) {
        roots[n++] = t1;
      }

      if (t2 >= 0 && t2 <= 1) {
        roots[n++] = t2;
      }
    }
  }

  return n;
}
/**
 * 计算二次贝塞尔方程极限值
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @return {number}
 */


function quadraticExtremum(p0, p1, p2) {
  var divider = p0 + p2 - 2 * p1;

  if (divider === 0) {
    // p1 is center of p0 and p2
    return 0.5;
  } else {
    return (p0 - p1) / divider;
  }
}
/**
 * 细分二次贝塞尔曲线
 * @memberOf module:zrender/core/curve
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} t
 * @param  {Array.<number>} out
 */


function quadraticSubdivide(p0, p1, p2, t, out) {
  var p01 = (p1 - p0) * t + p0;
  var p12 = (p2 - p1) * t + p1;
  var p012 = (p12 - p01) * t + p01; // Seg0

  out[0] = p0;
  out[1] = p01;
  out[2] = p012; // Seg1

  out[3] = p012;
  out[4] = p12;
  out[5] = p2;
}
/**
 * 投射点到二次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} out 投射点
 * @return {number}
 */


function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
  // http://pomax.github.io/bezierinfo/#projections
  var t;
  var interval = 0.005;
  var d = Infinity;
  _v0[0] = x;
  _v0[1] = y; // 先粗略估计一下可能的最小距离的 t 值
  // PENDING

  for (var _t = 0; _t < 1; _t += 0.05) {
    _v1[0] = quadraticAt(x0, x1, x2, _t);
    _v1[1] = quadraticAt(y0, y1, y2, _t);
    var d1 = v2DistSquare(_v0, _v1);

    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }

  d = Infinity; // At most 32 iteration

  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }

    var prev = t - interval;
    var next = t + interval; // t - interval

    _v1[0] = quadraticAt(x0, x1, x2, prev);
    _v1[1] = quadraticAt(y0, y1, y2, prev);
    var d1 = v2DistSquare(_v1, _v0);

    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      // t + interval
      _v2[0] = quadraticAt(x0, x1, x2, next);
      _v2[1] = quadraticAt(y0, y1, y2, next);
      var d2 = v2DistSquare(_v2, _v0);

      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  } // t


  if (out) {
    out[0] = quadraticAt(x0, x1, x2, t);
    out[1] = quadraticAt(y0, y1, y2, t);
  } // console.log(interval, i);


  return mathSqrt(d);
}

exports.cubicAt = cubicAt;
exports.cubicDerivativeAt = cubicDerivativeAt;
exports.cubicRootAt = cubicRootAt;
exports.cubicExtrema = cubicExtrema;
exports.cubicSubdivide = cubicSubdivide;
exports.cubicProjectPoint = cubicProjectPoint;
exports.quadraticAt = quadraticAt;
exports.quadraticDerivativeAt = quadraticDerivativeAt;
exports.quadraticRootAt = quadraticRootAt;
exports.quadraticExtremum = quadraticExtremum;
exports.quadraticSubdivide = quadraticSubdivide;
exports.quadraticProjectPoint = quadraticProjectPoint;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * 3x2矩阵操作类
 * @exports zrender/tool/matrix
 */

/* global Float32Array */
var ArrayCtor = typeof Float32Array === 'undefined' ? Array : Float32Array;
/**
 * Create a identity matrix.
 * @return {Float32Array|Array.<number>}
 */

function create() {
  var out = new ArrayCtor(6);
  identity(out);
  return out;
}
/**
 * 设置矩阵为单位矩阵
 * @param {Float32Array|Array.<number>} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * 复制矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m
 */


function copy(out, m) {
  out[0] = m[0];
  out[1] = m[1];
  out[2] = m[2];
  out[3] = m[3];
  out[4] = m[4];
  out[5] = m[5];
  return out;
}
/**
 * 矩阵相乘
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} m1
 * @param {Float32Array|Array.<number>} m2
 */


function mul(out, m1, m2) {
  // Consider matrix.mul(m, m2, m);
  // where out is the same as m2.
  // So use temp variable to escape error.
  var out0 = m1[0] * m2[0] + m1[2] * m2[1];
  var out1 = m1[1] * m2[0] + m1[3] * m2[1];
  var out2 = m1[0] * m2[2] + m1[2] * m2[3];
  var out3 = m1[1] * m2[2] + m1[3] * m2[3];
  var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
  var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = out3;
  out[4] = out4;
  out[5] = out5;
  return out;
}
/**
 * 平移变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */


function translate(out, a, v) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4] + v[0];
  out[5] = a[5] + v[1];
  return out;
}
/**
 * 旋转变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {number} rad
 */


function rotate(out, a, rad) {
  var aa = a[0];
  var ac = a[2];
  var atx = a[4];
  var ab = a[1];
  var ad = a[3];
  var aty = a[5];
  var st = Math.sin(rad);
  var ct = Math.cos(rad);
  out[0] = aa * ct + ab * st;
  out[1] = -aa * st + ab * ct;
  out[2] = ac * ct + ad * st;
  out[3] = -ac * st + ct * ad;
  out[4] = ct * atx + st * aty;
  out[5] = ct * aty - st * atx;
  return out;
}
/**
 * 缩放变换
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 * @param {Float32Array|Array.<number>} v
 */


function scale(out, a, v) {
  var vx = v[0];
  var vy = v[1];
  out[0] = a[0] * vx;
  out[1] = a[1] * vy;
  out[2] = a[2] * vx;
  out[3] = a[3] * vy;
  out[4] = a[4] * vx;
  out[5] = a[5] * vy;
  return out;
}
/**
 * 求逆矩阵
 * @param {Float32Array|Array.<number>} out
 * @param {Float32Array|Array.<number>} a
 */


function invert(out, a) {
  var aa = a[0];
  var ac = a[2];
  var atx = a[4];
  var ab = a[1];
  var ad = a[3];
  var aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Clone a new matrix.
 * @param {Float32Array|Array.<number>} a
 */


function clone(a) {
  var b = create();
  copy(b, a);
  return b;
}

exports.create = create;
exports.identity = identity;
exports.copy = copy;
exports.mul = mul;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.invert = invert;
exports.clone = clone;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__(64);

var BoundingRect = __webpack_require__(30);

var zrUtil = __webpack_require__(5);

var imageHelper = __webpack_require__(121);

/**
 * @alias zrender/graphic/Image
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
function ZImage(opts) {
  Displayable.call(this, opts);
}

ZImage.prototype = {
  constructor: ZImage,
  type: 'image',
  brush: function (ctx, prevEl) {
    var style = this.style;
    var src = style.image; // Must bind each time

    style.bind(ctx, this, prevEl);
    var image = this._image = imageHelper.createOrUpdateImage(src, this._image, this, this.onload);

    if (!image || !imageHelper.isImageReady(image)) {
      return;
    } // 图片已经加载完成
    // if (image.nodeName.toUpperCase() == 'IMG') {
    //     if (!image.complete) {
    //         return;
    //     }
    // }
    // Else is canvas


    var x = style.x || 0;
    var y = style.y || 0;
    var width = style.width;
    var height = style.height;
    var aspect = image.width / image.height;

    if (width == null && height != null) {
      // Keep image/height ratio
      width = height * aspect;
    } else if (height == null && width != null) {
      height = width / aspect;
    } else if (width == null && height == null) {
      width = image.width;
      height = image.height;
    } // 设置transform


    this.setTransform(ctx);

    if (style.sWidth && style.sHeight) {
      var sx = style.sx || 0;
      var sy = style.sy || 0;
      ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
    } else if (style.sx && style.sy) {
      var sx = style.sx;
      var sy = style.sy;
      var sWidth = width - sx;
      var sHeight = height - sy;
      ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    } else {
      ctx.drawImage(image, x, y, width, height);
    } // Draw rect text


    if (style.text != null) {
      // Only restore transform when needs draw text.
      this.restoreTransform(ctx);
      this.drawRectText(ctx, this.getBoundingRect());
    }
  },
  getBoundingRect: function () {
    var style = this.style;

    if (!this._rect) {
      this._rect = new BoundingRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
    }

    return this._rect;
  }
};
zrUtil.inherits(ZImage, Displayable);
var _default = ZImage;
module.exports = _default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__(64);

var zrUtil = __webpack_require__(5);

var textContain = __webpack_require__(81);

var textHelper = __webpack_require__(84);

var _constant = __webpack_require__(83);

var ContextCachedBy = _constant.ContextCachedBy;

/**
 * @alias zrender/graphic/Text
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
var Text = function (opts) {
  // jshint ignore:line
  Displayable.call(this, opts);
};

Text.prototype = {
  constructor: Text,
  type: 'text',
  brush: function (ctx, prevEl) {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true); // Use props with prefix 'text'.

    style.fill = style.stroke = style.shadowBlur = style.shadowColor = style.shadowOffsetX = style.shadowOffsetY = null;
    var text = style.text; // Convert to string

    text != null && (text += ''); // Do not apply style.bind in Text node. Because the real bind job
    // is in textHelper.renderText, and performance of text render should
    // be considered.
    // style.bind(ctx, this, prevEl);

    if (!textHelper.needDrawText(text, style)) {
      // The current el.style is not applied
      // and should not be used as cache.
      ctx.__attrCachedBy = ContextCachedBy.NONE;
      return;
    }

    this.setTransform(ctx);
    textHelper.renderText(this, ctx, text, style, null, prevEl);
    this.restoreTransform(ctx);
  },
  getBoundingRect: function () {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);

    if (!this._rect) {
      var text = style.text;
      text != null ? text += '' : text = '';
      var rect = textContain.getBoundingRect(style.text + '', style.font, style.textAlign, style.textVerticalAlign, style.textPadding, style.textLineHeight, style.rich);
      rect.x += style.x || 0;
      rect.y += style.y || 0;

      if (textHelper.getStroke(style.textStroke, style.textStrokeWidth)) {
        var w = style.textStrokeWidth;
        rect.x -= w / 2;
        rect.y -= w / 2;
        rect.width += w;
        rect.height += w;
      }

      this._rect = rect;
    }

    return this._rect;
  }
};
zrUtil.inherits(Text, Displayable);
var _default = Text;
module.exports = _default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.merge = merge;

var _deepmerge = __webpack_require__(392);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function merge() {
    var arr = Array.prototype.slice.call(arguments);
    return _deepmerge2.default.all(arr, {
        arrayMerge: function arrayMerge(destinationArray, sourceArray) {
            if (sourceArray.length > 0) {
                return sourceArray;
            } else {
                return destinationArray;
            }
        }
    });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(22);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(34) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__(80);

var debugMode = _config.debugMode;

var logError = function () {};

if (debugMode === 1) {
  logError = console.error;
}

var _default = logError;
module.exports = _default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(5);

var Style = __webpack_require__(120);

var Element = __webpack_require__(165);

var RectText = __webpack_require__(177);

/**
 * Base class of all displayable graphic objects
 * @module zrender/graphic/Displayable
 */

/**
 * @alias module:zrender/graphic/Displayable
 * @extends module:zrender/Element
 * @extends module:zrender/graphic/mixin/RectText
 */
function Displayable(opts) {
  opts = opts || {};
  Element.call(this, opts); // Extend properties

  for (var name in opts) {
    if (opts.hasOwnProperty(name) && name !== 'style') {
      this[name] = opts[name];
    }
  }
  /**
   * @type {module:zrender/graphic/Style}
   */


  this.style = new Style(opts.style, this);
  this._rect = null; // Shapes for cascade clipping.
  // Can only be `null`/`undefined` or an non-empty array, MUST NOT be an empty array.
  // because it is easy to only using null to check whether clipPaths changed.

  this.__clipPaths = null; // FIXME Stateful must be mixined after style is setted
  // Stateful.call(this, opts);
}

Displayable.prototype = {
  constructor: Displayable,
  type: 'displayable',

  /**
   * Dirty flag. From which painter will determine if this displayable object needs brush.
   * @name module:zrender/graphic/Displayable#__dirty
   * @type {boolean}
   */
  __dirty: true,

  /**
   * Whether the displayable object is visible. when it is true, the displayable object
   * is not drawn, but the mouse event can still trigger the object.
   * @name module:/zrender/graphic/Displayable#invisible
   * @type {boolean}
   * @default false
   */
  invisible: false,

  /**
   * @name module:/zrender/graphic/Displayable#z
   * @type {number}
   * @default 0
   */
  z: 0,

  /**
   * @name module:/zrender/graphic/Displayable#z
   * @type {number}
   * @default 0
   */
  z2: 0,

  /**
   * The z level determines the displayable object can be drawn in which layer canvas.
   * @name module:/zrender/graphic/Displayable#zlevel
   * @type {number}
   * @default 0
   */
  zlevel: 0,

  /**
   * Whether it can be dragged.
   * @name module:/zrender/graphic/Displayable#draggable
   * @type {boolean}
   * @default false
   */
  draggable: false,

  /**
   * Whether is it dragging.
   * @name module:/zrender/graphic/Displayable#draggable
   * @type {boolean}
   * @default false
   */
  dragging: false,

  /**
   * Whether to respond to mouse events.
   * @name module:/zrender/graphic/Displayable#silent
   * @type {boolean}
   * @default false
   */
  silent: false,

  /**
   * If enable culling
   * @type {boolean}
   * @default false
   */
  culling: false,

  /**
   * Mouse cursor when hovered
   * @name module:/zrender/graphic/Displayable#cursor
   * @type {string}
   */
  cursor: 'pointer',

  /**
   * If hover area is bounding rect
   * @name module:/zrender/graphic/Displayable#rectHover
   * @type {string}
   */
  rectHover: false,

  /**
   * Render the element progressively when the value >= 0,
   * usefull for large data.
   * @type {boolean}
   */
  progressive: false,

  /**
   * @type {boolean}
   */
  incremental: false,

  /**
   * Scale ratio for global scale.
   * @type {boolean}
   */
  globalScaleRatio: 1,
  beforeBrush: function (ctx) {},
  afterBrush: function (ctx) {},

  /**
   * Graphic drawing method.
   * @param {CanvasRenderingContext2D} ctx
   */
  // Interface
  brush: function (ctx, prevEl) {},

  /**
   * Get the minimum bounding box.
   * @return {module:zrender/core/BoundingRect}
   */
  // Interface
  getBoundingRect: function () {},

  /**
   * If displayable element contain coord x, y
   * @param  {number} x
   * @param  {number} y
   * @return {boolean}
   */
  contain: function (x, y) {
    return this.rectContain(x, y);
  },

  /**
   * @param  {Function} cb
   * @param  {}   context
   */
  traverse: function (cb, context) {
    cb.call(context, this);
  },

  /**
   * If bounding rect of element contain coord x, y
   * @param  {number} x
   * @param  {number} y
   * @return {boolean}
   */
  rectContain: function (x, y) {
    var coord = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    return rect.contain(coord[0], coord[1]);
  },

  /**
   * Mark displayable element dirty and refresh next frame
   */
  dirty: function () {
    this.__dirty = this.__dirtyText = true;
    this._rect = null;
    this.__zr && this.__zr.refresh();
  },

  /**
   * If displayable object binded any event
   * @return {boolean}
   */
  // TODO, events bound by bind
  // isSilent: function () {
  //     return !(
  //         this.hoverable || this.draggable
  //         || this.onmousemove || this.onmouseover || this.onmouseout
  //         || this.onmousedown || this.onmouseup || this.onclick
  //         || this.ondragenter || this.ondragover || this.ondragleave
  //         || this.ondrop
  //     );
  // },

  /**
   * Alias for animate('style')
   * @param {boolean} loop
   */
  animateStyle: function (loop) {
    return this.animate('style', loop);
  },
  attrKV: function (key, value) {
    if (key !== 'style') {
      Element.prototype.attrKV.call(this, key, value);
    } else {
      this.style.set(value);
    }
  },

  /**
   * @param {Object|string} key
   * @param {*} value
   */
  setStyle: function (key, value) {
    this.style.set(key, value);
    this.dirty(false);
    return this;
  },

  /**
   * Use given style object
   * @param  {Object} obj
   */
  useStyle: function (obj) {
    this.style = new Style(obj, this);
    this.dirty(false);
    return this;
  },

  /**
   * The string value of `textPosition` needs to be calculated to a real postion.
   * For example, `'inside'` is calculated to `[rect.width/2, rect.height/2]`
   * by default. See `contain/text.js#calculateTextPosition` for more details.
   * But some coutom shapes like "pin", "flag" have center that is not exactly
   * `[width/2, height/2]`. So we provide this hook to customize the calculation
   * for those shapes. It will be called if the `style.textPosition` is a string.
   * @param {Obejct} [out] Prepared out object. If not provided, this method should
   *        be responsible for creating one.
   * @param {module:zrender/graphic/Style} style
   * @param {Object} rect {x, y, width, height}
   * @return {Obejct} out The same as the input out.
   *         {
   *             x: number. mandatory.
   *             y: number. mandatory.
   *             textAlign: string. optional. use style.textAlign by default.
   *             textVerticalAlign: string. optional. use style.textVerticalAlign by default.
   *         }
   */
  calculateTextPosition: null
};
zrUtil.inherits(Displayable, Element);
zrUtil.mixin(Displayable, RectText); // zrUtil.mixin(Displayable, Stateful);

var _default = Displayable;
module.exports = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(7);
var toAbsoluteIndex = __webpack_require__(45);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var redefineAll = __webpack_require__(43);
var meta = __webpack_require__(35);
var forOf = __webpack_require__(38);
var anInstance = __webpack_require__(37);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(70);
var setToStringTag = __webpack_require__(50);
var inheritIfRequired = __webpack_require__(97);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(161);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(27);
var wks = __webpack_require__(6);
var regexpExec = __webpack_require__(105);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(21);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(34) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(48);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var ctx = __webpack_require__(23);
var forOf = __webpack_require__(38);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var uid = __webpack_require__(46);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var _zrender = __webpack_require__(125);

(function () {
  for (var key in _zrender) {
    if (_zrender == null || !_zrender.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _zrender[key];
  }
})();

var _export = __webpack_require__(412);

(function () {
  for (var key in _export) {
    if (_export == null || !_export.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _export[key];
  }
})();

__webpack_require__(436);

__webpack_require__(441);

/***/ }),
/* 80 */
/***/ (function(module, exports) {

var dpr = 1; // If in browser environment

if (typeof window !== 'undefined') {
  dpr = Math.max(window.devicePixelRatio || 1, 1);
}
/**
 * config默认配置项
 * @exports zrender/config
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 */

/**
 * Debug log mode:
 * 0: Do nothing, for release.
 * 1: console.error, for debug.
 */


var debugMode = 0; // retina 屏幕优化

var devicePixelRatio = dpr;
exports.debugMode = debugMode;
exports.devicePixelRatio = devicePixelRatio;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var BoundingRect = __webpack_require__(30);

var imageHelper = __webpack_require__(121);

var _util = __webpack_require__(5);

var getContext = _util.getContext;
var extend = _util.extend;
var retrieve2 = _util.retrieve2;
var retrieve3 = _util.retrieve3;
var trim = _util.trim;
var textWidthCache = {};
var textWidthCacheCounter = 0;
var TEXT_CACHE_MAX = 5000;
var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
var DEFAULT_FONT = '12px sans-serif'; // Avoid assign to an exported variable, for transforming to cjs.

var methods = {};

function $override(name, fn) {
  methods[name] = fn;
}
/**
 * @public
 * @param {string} text
 * @param {string} font
 * @return {number} width
 */


function getWidth(text, font) {
  font = font || DEFAULT_FONT;
  var key = text + ':' + font;

  if (textWidthCache[key]) {
    return textWidthCache[key];
  }

  var textLines = (text + '').split('\n');
  var width = 0;

  for (var i = 0, l = textLines.length; i < l; i++) {
    // textContain.measureText may be overrided in SVG or VML
    width = Math.max(measureText(textLines[i], font).width, width);
  }

  if (textWidthCacheCounter > TEXT_CACHE_MAX) {
    textWidthCacheCounter = 0;
    textWidthCache = {};
  }

  textWidthCacheCounter++;
  textWidthCache[key] = width;
  return width;
}
/**
 * @public
 * @param {string} text
 * @param {string} font
 * @param {string} [textAlign='left']
 * @param {string} [textVerticalAlign='top']
 * @param {Array.<number>} [textPadding]
 * @param {Object} [rich]
 * @param {Object} [truncate]
 * @return {Object} {x, y, width, height, lineHeight}
 */


function getBoundingRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
  return rich ? getRichTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) : getPlainTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate);
}

function getPlainTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, truncate) {
  var contentBlock = parsePlainText(text, font, textPadding, textLineHeight, truncate);
  var outerWidth = getWidth(text, font);

  if (textPadding) {
    outerWidth += textPadding[1] + textPadding[3];
  }

  var outerHeight = contentBlock.outerHeight;
  var x = adjustTextX(0, outerWidth, textAlign);
  var y = adjustTextY(0, outerHeight, textVerticalAlign);
  var rect = new BoundingRect(x, y, outerWidth, outerHeight);
  rect.lineHeight = contentBlock.lineHeight;
  return rect;
}

function getRichTextRect(text, font, textAlign, textVerticalAlign, textPadding, textLineHeight, rich, truncate) {
  var contentBlock = parseRichText(text, {
    rich: rich,
    truncate: truncate,
    font: font,
    textAlign: textAlign,
    textPadding: textPadding,
    textLineHeight: textLineHeight
  });
  var outerWidth = contentBlock.outerWidth;
  var outerHeight = contentBlock.outerHeight;
  var x = adjustTextX(0, outerWidth, textAlign);
  var y = adjustTextY(0, outerHeight, textVerticalAlign);
  return new BoundingRect(x, y, outerWidth, outerHeight);
}
/**
 * @public
 * @param {number} x
 * @param {number} width
 * @param {string} [textAlign='left']
 * @return {number} Adjusted x.
 */


function adjustTextX(x, width, textAlign) {
  // FIXME Right to left language
  if (textAlign === 'right') {
    x -= width;
  } else if (textAlign === 'center') {
    x -= width / 2;
  }

  return x;
}
/**
 * @public
 * @param {number} y
 * @param {number} height
 * @param {string} [textVerticalAlign='top']
 * @return {number} Adjusted y.
 */


function adjustTextY(y, height, textVerticalAlign) {
  if (textVerticalAlign === 'middle') {
    y -= height / 2;
  } else if (textVerticalAlign === 'bottom') {
    y -= height;
  }

  return y;
}
/**
 * Follow same interface to `Displayable.prototype.calculateTextPosition`.
 * @public
 * @param {Obejct} [out] Prepared out object. If not input, auto created in the method.
 * @param {module:zrender/graphic/Style} style where `textPosition` and `textDistance` are visited.
 * @param {Object} rect {x, y, width, height} Rect of the host elment, according to which the text positioned.
 * @return {Object} The input `out`. Set: {x, y, textAlign, textVerticalAlign}
 */


function calculateTextPosition(out, style, rect) {
  var textPosition = style.textPosition;
  var distance = style.textDistance;
  var x = rect.x;
  var y = rect.y;
  distance = distance || 0;
  var height = rect.height;
  var width = rect.width;
  var halfHeight = height / 2;
  var textAlign = 'left';
  var textVerticalAlign = 'top';

  switch (textPosition) {
    case 'left':
      x -= distance;
      y += halfHeight;
      textAlign = 'right';
      textVerticalAlign = 'middle';
      break;

    case 'right':
      x += distance + width;
      y += halfHeight;
      textVerticalAlign = 'middle';
      break;

    case 'top':
      x += width / 2;
      y -= distance;
      textAlign = 'center';
      textVerticalAlign = 'bottom';
      break;

    case 'bottom':
      x += width / 2;
      y += height + distance;
      textAlign = 'center';
      break;

    case 'inside':
      x += width / 2;
      y += halfHeight;
      textAlign = 'center';
      textVerticalAlign = 'middle';
      break;

    case 'insideLeft':
      x += distance;
      y += halfHeight;
      textVerticalAlign = 'middle';
      break;

    case 'insideRight':
      x += width - distance;
      y += halfHeight;
      textAlign = 'right';
      textVerticalAlign = 'middle';
      break;

    case 'insideTop':
      x += width / 2;
      y += distance;
      textAlign = 'center';
      break;

    case 'insideBottom':
      x += width / 2;
      y += height - distance;
      textAlign = 'center';
      textVerticalAlign = 'bottom';
      break;

    case 'insideTopLeft':
      x += distance;
      y += distance;
      break;

    case 'insideTopRight':
      x += width - distance;
      y += distance;
      textAlign = 'right';
      break;

    case 'insideBottomLeft':
      x += distance;
      y += height - distance;
      textVerticalAlign = 'bottom';
      break;

    case 'insideBottomRight':
      x += width - distance;
      y += height - distance;
      textAlign = 'right';
      textVerticalAlign = 'bottom';
      break;
  }

  out = out || {};
  out.x = x;
  out.y = y;
  out.textAlign = textAlign;
  out.textVerticalAlign = textVerticalAlign;
  return out;
}
/**
 * To be removed. But still do not remove in case that some one has imported it.
 * @deprecated
 * @public
 * @param {stirng} textPosition
 * @param {Object} rect {x, y, width, height}
 * @param {number} distance
 * @return {Object} {x, y, textAlign, textVerticalAlign}
 */


function adjustTextPositionOnRect(textPosition, rect, distance) {
  var dummyStyle = {
    textPosition: textPosition,
    textDistance: distance
  };
  return calculateTextPosition({}, dummyStyle, rect);
}
/**
 * Show ellipsis if overflow.
 *
 * @public
 * @param  {string} text
 * @param  {string} containerWidth
 * @param  {string} font
 * @param  {number} [ellipsis='...']
 * @param  {Object} [options]
 * @param  {number} [options.maxIterations=3]
 * @param  {number} [options.minChar=0] If truncate result are less
 *                  then minChar, ellipsis will not show, which is
 *                  better for user hint in some cases.
 * @param  {number} [options.placeholder=''] When all truncated, use the placeholder.
 * @return {string}
 */


function truncateText(text, containerWidth, font, ellipsis, options) {
  if (!containerWidth) {
    return '';
  }

  var textLines = (text + '').split('\n');
  options = prepareTruncateOptions(containerWidth, font, ellipsis, options); // FIXME
  // It is not appropriate that every line has '...' when truncate multiple lines.

  for (var i = 0, len = textLines.length; i < len; i++) {
    textLines[i] = truncateSingleLine(textLines[i], options);
  }

  return textLines.join('\n');
}

function prepareTruncateOptions(containerWidth, font, ellipsis, options) {
  options = extend({}, options);
  options.font = font;
  var ellipsis = retrieve2(ellipsis, '...');
  options.maxIterations = retrieve2(options.maxIterations, 2);
  var minChar = options.minChar = retrieve2(options.minChar, 0); // FIXME
  // Other languages?

  options.cnCharWidth = getWidth('国', font); // FIXME
  // Consider proportional font?

  var ascCharWidth = options.ascCharWidth = getWidth('a', font);
  options.placeholder = retrieve2(options.placeholder, ''); // Example 1: minChar: 3, text: 'asdfzxcv', truncate result: 'asdf', but not: 'a...'.
  // Example 2: minChar: 3, text: '维度', truncate result: '维', but not: '...'.

  var contentWidth = containerWidth = Math.max(0, containerWidth - 1); // Reserve some gap.

  for (var i = 0; i < minChar && contentWidth >= ascCharWidth; i++) {
    contentWidth -= ascCharWidth;
  }

  var ellipsisWidth = getWidth(ellipsis, font);

  if (ellipsisWidth > contentWidth) {
    ellipsis = '';
    ellipsisWidth = 0;
  }

  contentWidth = containerWidth - ellipsisWidth;
  options.ellipsis = ellipsis;
  options.ellipsisWidth = ellipsisWidth;
  options.contentWidth = contentWidth;
  options.containerWidth = containerWidth;
  return options;
}

function truncateSingleLine(textLine, options) {
  var containerWidth = options.containerWidth;
  var font = options.font;
  var contentWidth = options.contentWidth;

  if (!containerWidth) {
    return '';
  }

  var lineWidth = getWidth(textLine, font);

  if (lineWidth <= containerWidth) {
    return textLine;
  }

  for (var j = 0;; j++) {
    if (lineWidth <= contentWidth || j >= options.maxIterations) {
      textLine += options.ellipsis;
      break;
    }

    var subLength = j === 0 ? estimateLength(textLine, contentWidth, options.ascCharWidth, options.cnCharWidth) : lineWidth > 0 ? Math.floor(textLine.length * contentWidth / lineWidth) : 0;
    textLine = textLine.substr(0, subLength);
    lineWidth = getWidth(textLine, font);
  }

  if (textLine === '') {
    textLine = options.placeholder;
  }

  return textLine;
}

function estimateLength(text, contentWidth, ascCharWidth, cnCharWidth) {
  var width = 0;
  var i = 0;

  for (var len = text.length; i < len && width < contentWidth; i++) {
    var charCode = text.charCodeAt(i);
    width += 0 <= charCode && charCode <= 127 ? ascCharWidth : cnCharWidth;
  }

  return i;
}
/**
 * @public
 * @param {string} font
 * @return {number} line height
 */


function getLineHeight(font) {
  // FIXME A rough approach.
  return getWidth('国', font);
}
/**
 * @public
 * @param {string} text
 * @param {string} font
 * @return {Object} width
 */


function measureText(text, font) {
  return methods.measureText(text, font);
} // Avoid assign to an exported variable, for transforming to cjs.


methods.measureText = function (text, font) {
  var ctx = getContext();
  ctx.font = font || DEFAULT_FONT;
  return ctx.measureText(text);
};
/**
 * @public
 * @param {string} text
 * @param {string} font
 * @param {Object} [truncate]
 * @return {Object} block: {lineHeight, lines, height, outerHeight, canCacheByTextString}
 *  Notice: for performance, do not calculate outerWidth util needed.
 *  `canCacheByTextString` means the result `lines` is only determined by the input `text`.
 *  Thus we can simply comparing the `input` text to determin whether the result changed,
 *  without travel the result `lines`.
 */


function parsePlainText(text, font, padding, textLineHeight, truncate) {
  text != null && (text += '');
  var lineHeight = retrieve2(textLineHeight, getLineHeight(font));
  var lines = text ? text.split('\n') : [];
  var height = lines.length * lineHeight;
  var outerHeight = height;
  var canCacheByTextString = true;

  if (padding) {
    outerHeight += padding[0] + padding[2];
  }

  if (text && truncate) {
    canCacheByTextString = false;
    var truncOuterHeight = truncate.outerHeight;
    var truncOuterWidth = truncate.outerWidth;

    if (truncOuterHeight != null && outerHeight > truncOuterHeight) {
      text = '';
      lines = [];
    } else if (truncOuterWidth != null) {
      var options = prepareTruncateOptions(truncOuterWidth - (padding ? padding[1] + padding[3] : 0), font, truncate.ellipsis, {
        minChar: truncate.minChar,
        placeholder: truncate.placeholder
      }); // FIXME
      // It is not appropriate that every line has '...' when truncate multiple lines.

      for (var i = 0, len = lines.length; i < len; i++) {
        lines[i] = truncateSingleLine(lines[i], options);
      }
    }
  }

  return {
    lines: lines,
    height: height,
    outerHeight: outerHeight,
    lineHeight: lineHeight,
    canCacheByTextString: canCacheByTextString
  };
}
/**
 * For example: 'some text {a|some text}other text{b|some text}xxx{c|}xxx'
 * Also consider 'bbbb{a|xxx\nzzz}xxxx\naaaa'.
 *
 * @public
 * @param {string} text
 * @param {Object} style
 * @return {Object} block
 * {
 *      width,
 *      height,
 *      lines: [{
 *          lineHeight,
 *          width,
 *          tokens: [[{
 *              styleName,
 *              text,
 *              width,      // include textPadding
 *              height,     // include textPadding
 *              textWidth, // pure text width
 *              textHeight, // pure text height
 *              lineHeihgt,
 *              font,
 *              textAlign,
 *              textVerticalAlign
 *          }], [...], ...]
 *      }, ...]
 * }
 * If styleName is undefined, it is plain text.
 */


function parseRichText(text, style) {
  var contentBlock = {
    lines: [],
    width: 0,
    height: 0
  };
  text != null && (text += '');

  if (!text) {
    return contentBlock;
  }

  var lastIndex = STYLE_REG.lastIndex = 0;
  var result;

  while ((result = STYLE_REG.exec(text)) != null) {
    var matchedIndex = result.index;

    if (matchedIndex > lastIndex) {
      pushTokens(contentBlock, text.substring(lastIndex, matchedIndex));
    }

    pushTokens(contentBlock, result[2], result[1]);
    lastIndex = STYLE_REG.lastIndex;
  }

  if (lastIndex < text.length) {
    pushTokens(contentBlock, text.substring(lastIndex, text.length));
  }

  var lines = contentBlock.lines;
  var contentHeight = 0;
  var contentWidth = 0; // For `textWidth: 100%`

  var pendingList = [];
  var stlPadding = style.textPadding;
  var truncate = style.truncate;
  var truncateWidth = truncate && truncate.outerWidth;
  var truncateHeight = truncate && truncate.outerHeight;

  if (stlPadding) {
    truncateWidth != null && (truncateWidth -= stlPadding[1] + stlPadding[3]);
    truncateHeight != null && (truncateHeight -= stlPadding[0] + stlPadding[2]);
  } // Calculate layout info of tokens.


  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var lineHeight = 0;
    var lineWidth = 0;

    for (var j = 0; j < line.tokens.length; j++) {
      var token = line.tokens[j];
      var tokenStyle = token.styleName && style.rich[token.styleName] || {}; // textPadding should not inherit from style.

      var textPadding = token.textPadding = tokenStyle.textPadding; // textFont has been asigned to font by `normalizeStyle`.

      var font = token.font = tokenStyle.font || style.font; // textHeight can be used when textVerticalAlign is specified in token.

      var tokenHeight = token.textHeight = retrieve2( // textHeight should not be inherited, consider it can be specified
      // as box height of the block.
      tokenStyle.textHeight, getLineHeight(font));
      textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
      token.height = tokenHeight;
      token.lineHeight = retrieve3(tokenStyle.textLineHeight, style.textLineHeight, tokenHeight);
      token.textAlign = tokenStyle && tokenStyle.textAlign || style.textAlign;
      token.textVerticalAlign = tokenStyle && tokenStyle.textVerticalAlign || 'middle';

      if (truncateHeight != null && contentHeight + token.lineHeight > truncateHeight) {
        return {
          lines: [],
          width: 0,
          height: 0
        };
      }

      token.textWidth = getWidth(token.text, font);
      var tokenWidth = tokenStyle.textWidth;
      var tokenWidthNotSpecified = tokenWidth == null || tokenWidth === 'auto'; // Percent width, can be `100%`, can be used in drawing separate
      // line when box width is needed to be auto.

      if (typeof tokenWidth === 'string' && tokenWidth.charAt(tokenWidth.length - 1) === '%') {
        token.percentWidth = tokenWidth;
        pendingList.push(token);
        tokenWidth = 0; // Do not truncate in this case, because there is no user case
        // and it is too complicated.
      } else {
        if (tokenWidthNotSpecified) {
          tokenWidth = token.textWidth; // FIXME: If image is not loaded and textWidth is not specified, calling
          // `getBoundingRect()` will not get correct result.

          var textBackgroundColor = tokenStyle.textBackgroundColor;
          var bgImg = textBackgroundColor && textBackgroundColor.image; // Use cases:
          // (1) If image is not loaded, it will be loaded at render phase and call
          // `dirty()` and `textBackgroundColor.image` will be replaced with the loaded
          // image, and then the right size will be calculated here at the next tick.
          // See `graphic/helper/text.js`.
          // (2) If image loaded, and `textBackgroundColor.image` is image src string,
          // use `imageHelper.findExistImage` to find cached image.
          // `imageHelper.findExistImage` will always be called here before
          // `imageHelper.createOrUpdateImage` in `graphic/helper/text.js#renderRichText`
          // which ensures that image will not be rendered before correct size calcualted.

          if (bgImg) {
            bgImg = imageHelper.findExistImage(bgImg);

            if (imageHelper.isImageReady(bgImg)) {
              tokenWidth = Math.max(tokenWidth, bgImg.width * tokenHeight / bgImg.height);
            }
          }
        }

        var paddingW = textPadding ? textPadding[1] + textPadding[3] : 0;
        tokenWidth += paddingW;
        var remianTruncWidth = truncateWidth != null ? truncateWidth - lineWidth : null;

        if (remianTruncWidth != null && remianTruncWidth < tokenWidth) {
          if (!tokenWidthNotSpecified || remianTruncWidth < paddingW) {
            token.text = '';
            token.textWidth = tokenWidth = 0;
          } else {
            token.text = truncateText(token.text, remianTruncWidth - paddingW, font, truncate.ellipsis, {
              minChar: truncate.minChar
            });
            token.textWidth = getWidth(token.text, font);
            tokenWidth = token.textWidth + paddingW;
          }
        }
      }

      lineWidth += token.width = tokenWidth;
      tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
    }

    line.width = lineWidth;
    line.lineHeight = lineHeight;
    contentHeight += lineHeight;
    contentWidth = Math.max(contentWidth, lineWidth);
  }

  contentBlock.outerWidth = contentBlock.width = retrieve2(style.textWidth, contentWidth);
  contentBlock.outerHeight = contentBlock.height = retrieve2(style.textHeight, contentHeight);

  if (stlPadding) {
    contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
    contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
  }

  for (var i = 0; i < pendingList.length; i++) {
    var token = pendingList[i];
    var percentWidth = token.percentWidth; // Should not base on outerWidth, because token can not be placed out of padding.

    token.width = parseInt(percentWidth, 10) / 100 * contentWidth;
  }

  return contentBlock;
}

function pushTokens(block, str, styleName) {
  var isEmptyStr = str === '';
  var strs = str.split('\n');
  var lines = block.lines;

  for (var i = 0; i < strs.length; i++) {
    var text = strs[i];
    var token = {
      styleName: styleName,
      text: text,
      isLineHolder: !text && !isEmptyStr
    }; // The first token should be appended to the last line.

    if (!i) {
      var tokens = (lines[lines.length - 1] || (lines[0] = {
        tokens: []
      })).tokens; // Consider cases:
      // (1) ''.split('\n') => ['', '\n', ''], the '' at the first item
      // (which is a placeholder) should be replaced by new token.
      // (2) A image backage, where token likes {a|}.
      // (3) A redundant '' will affect textAlign in line.
      // (4) tokens with the same tplName should not be merged, because
      // they should be displayed in different box (with border and padding).

      var tokensLen = tokens.length;
      tokensLen === 1 && tokens[0].isLineHolder ? tokens[0] = token : // Consider text is '', only insert when it is the "lineHolder" or
      // "emptyStr". Otherwise a redundant '' will affect textAlign in line.
      (text || !tokensLen || isEmptyStr) && tokens.push(token);
    } // Other tokens always start a new line.
    else {
        // If there is '', insert it as a placeholder.
        lines.push({
          tokens: [token]
        });
      }
  }
}

function makeFont(style) {
  // FIXME in node-canvas fontWeight is before fontStyle
  // Use `fontSize` `fontFamily` to check whether font properties are defined.
  var font = (style.fontSize || style.fontFamily) && [style.fontStyle, style.fontWeight, (style.fontSize || 12) + 'px', // If font properties are defined, `fontFamily` should not be ignored.
  style.fontFamily || 'sans-serif'].join(' ');
  return font && trim(font) || style.textFont || style.font;
}

exports.DEFAULT_FONT = DEFAULT_FONT;
exports.$override = $override;
exports.getWidth = getWidth;
exports.getBoundingRect = getBoundingRect;
exports.adjustTextX = adjustTextX;
exports.adjustTextY = adjustTextY;
exports.calculateTextPosition = calculateTextPosition;
exports.adjustTextPositionOnRect = adjustTextPositionOnRect;
exports.truncateText = truncateText;
exports.getLineHeight = getLineHeight;
exports.measureText = measureText;
exports.parsePlainText = parsePlainText;
exports.parseRichText = parseRichText;
exports.makeFont = makeFont;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var Eventful = __webpack_require__(85);

exports.Dispatcher = Eventful;

var env = __webpack_require__(36);

var _fourPointsTransform = __webpack_require__(410);

var buildTransformer = _fourPointsTransform.buildTransformer;

/**
 * Utilities for mouse or touch events.
 */
var isDomLevel2 = typeof window !== 'undefined' && !!window.addEventListener;
var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
var EVENT_SAVED_PROP = '___zrEVENTSAVED';
var _calcOut = [];
/**
 * Get the `zrX` and `zrY`, which are relative to the top-left of
 * the input `el`.
 * CSS transform (2D & 3D) is supported.
 *
 * The strategy to fetch the coords:
 * + If `calculate` is not set as `true`, users of this method should
 * ensure that `el` is the same or the same size & location as `e.target`.
 * Otherwise the result coords are probably not expected. Because we
 * firstly try to get coords from e.offsetX/e.offsetY.
 * + If `calculate` is set as `true`, the input `el` can be any element
 * and we force to calculate the coords based on `el`.
 * + The input `el` should be positionable (not position:static).
 *
 * The force `calculate` can be used in case like:
 * When mousemove event triggered on ec tooltip, `e.target` is not `el`(zr painter.dom).
 *
 * @param {HTMLElement} el DOM element.
 * @param {Event} e Mouse event or touch event.
 * @param {Object} out Get `out.zrX` and `out.zrY` as the result.
 * @param {boolean} [calculate=false] Whether to force calculate
 *        the coordinates but not use ones provided by browser.
 */

function clientToLocal(el, e, out, calculate) {
  out = out || {}; // According to the W3C Working Draft, offsetX and offsetY should be relative
  // to the padding edge of the target element. The only browser using this convention
  // is IE. Webkit uses the border edge, Opera uses the content edge, and FireFox does
  // not support the properties.
  // (see http://www.jacklmoore.com/notes/mouse-position/)
  // In zr painter.dom, padding edge equals to border edge.

  if (calculate || !env.canvasSupported) {
    calculateZrXY(el, e, out);
  } // Caution: In FireFox, layerX/layerY Mouse position relative to the closest positioned
  // ancestor element, so we should make sure el is positioned (e.g., not position:static).
  // BTW1, Webkit don't return the same results as FF in non-simple cases (like add
  // zoom-factor, overflow / opacity layers, transforms ...)
  // BTW2, (ev.offsetY || ev.pageY - $(ev.target).offset().top) is not correct in preserve-3d.
  // <https://bugs.jquery.com/ticket/8523#comment:14>
  // BTW3, In ff, offsetX/offsetY is always 0.
  else if (env.browser.firefox && e.layerX != null && e.layerX !== e.offsetX) {
      out.zrX = e.layerX;
      out.zrY = e.layerY;
    } // For IE6+, chrome, safari, opera. (When will ff support offsetX?)
    else if (e.offsetX != null) {
        out.zrX = e.offsetX;
        out.zrY = e.offsetY;
      } // For some other device, e.g., IOS safari.
      else {
          calculateZrXY(el, e, out);
        }

  return out;
}

function calculateZrXY(el, e, out) {
  // BlackBerry 5, iOS 3 (original iPhone) don't have getBoundingRect.
  if (el.getBoundingClientRect && env.domSupported) {
    var ex = e.clientX;
    var ey = e.clientY;

    if (el.nodeName.toUpperCase() === 'CANVAS') {
      // Original approach, which do not support CSS transform.
      // marker can not be locationed in a canvas container
      // (getBoundingClientRect is always 0). We do not support
      // that input a pre-created canvas to zr while using css
      // transform in iOS.
      var box = el.getBoundingClientRect();
      out.zrX = ex - box.left;
      out.zrY = ey - box.top;
      return;
    } else {
      var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
      var transformer = preparePointerTransformer(prepareCoordMarkers(el, saved), saved);

      if (transformer) {
        transformer(_calcOut, ex, ey);
        out.zrX = _calcOut[0];
        out.zrY = _calcOut[1];
        return;
      }
    }
  }

  out.zrX = out.zrY = 0;
}

function prepareCoordMarkers(el, saved) {
  var markers = saved.markers;

  if (markers) {
    return markers;
  }

  markers = saved.markers = [];
  var propLR = ['left', 'right'];
  var propTB = ['top', 'bottom'];

  for (var i = 0; i < 4; i++) {
    var marker = document.createElement('div');
    var stl = marker.style;
    var idxLR = i % 2;
    var idxTB = (i >> 1) % 2;
    stl.cssText = ['position:absolute', 'visibility: hidden', 'padding: 0', 'margin: 0', 'border-width: 0', 'width:0', 'height:0', // 'width: 5px',
    // 'height: 5px',
    propLR[idxLR] + ':0', propTB[idxTB] + ':0', propLR[1 - idxLR] + ':auto', propTB[1 - idxTB] + ':auto', ''].join('!important;');
    el.appendChild(marker);
    markers.push(marker);
  }

  return markers;
}

function preparePointerTransformer(markers, saved) {
  var transformer = saved.transformer;
  var oldSrcCoords = saved.srcCoords;
  var useOld = true;
  var srcCoords = [];
  var destCoords = [];

  for (var i = 0; i < 4; i++) {
    var rect = markers[i].getBoundingClientRect();
    var ii = 2 * i;
    var x = rect.left;
    var y = rect.top;
    srcCoords.push(x, y);
    useOld &= oldSrcCoords && x === oldSrcCoords[ii] && y === oldSrcCoords[ii + 1];
    destCoords.push(markers[i].offsetLeft, markers[i].offsetTop);
  } // Cache to avoid time consuming of `buildTransformer`.


  return useOld ? transformer : (saved.srcCoords = srcCoords, saved.transformer = buildTransformer(srcCoords, destCoords));
}
/**
 * Find native event compat for legency IE.
 * Should be called at the begining of a native event listener.
 *
 * @param {Event} [e] Mouse event or touch event or pointer event.
 *        For lagency IE, we use `window.event` is used.
 * @return {Event} The native event.
 */


function getNativeEvent(e) {
  return e || window.event;
}
/**
 * Normalize the coordinates of the input event.
 *
 * Get the `e.zrX` and `e.zrY`, which are relative to the top-left of
 * the input `el`.
 * Get `e.zrDelta` if using mouse wheel.
 * Get `e.which`, see the comment inside this function.
 *
 * Do not calculate repeatly if `zrX` and `zrY` already exist.
 *
 * Notice: see comments in `clientToLocal`. check the relationship
 * between the result coords and the parameters `el` and `calculate`.
 *
 * @param {HTMLElement} el DOM element.
 * @param {Event} [e] See `getNativeEvent`.
 * @param {boolean} [calculate=false] Whether to force calculate
 *        the coordinates but not use ones provided by browser.
 * @return {UIEvent} The normalized native UIEvent.
 */


function normalizeEvent(el, e, calculate) {
  e = getNativeEvent(e);

  if (e.zrX != null) {
    return e;
  }

  var eventType = e.type;
  var isTouch = eventType && eventType.indexOf('touch') >= 0;

  if (!isTouch) {
    clientToLocal(el, e, e, calculate);
    e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
  } else {
    var touch = eventType !== 'touchend' ? e.targetTouches[0] : e.changedTouches[0];
    touch && clientToLocal(el, touch, e, calculate);
  } // Add which for click: 1 === left; 2 === middle; 3 === right; otherwise: 0;
  // See jQuery: https://github.com/jquery/jquery/blob/master/src/event.js
  // If e.which has been defined, it may be readonly,
  // see: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/which


  var button = e.button;

  if (e.which == null && button !== undefined && MOUSE_EVENT_REG.test(e.type)) {
    e.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
  } // [Caution]: `e.which` from browser is not always reliable. For example,
  // when press left button and `mousemove (pointermove)` in Edge, the `e.which`
  // is 65536 and the `e.button` is -1. But the `mouseup (pointerup)` and
  // `mousedown (pointerdown)` is the same as Chrome does.


  return e;
}
/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Function} handler
 * @param {Object|boolean} opt If boolean, means `opt.capture`
 * @param {boolean} [opt.capture=false]
 * @param {boolean} [opt.passive=false]
 */


function addEventListener(el, name, handler, opt) {
  if (isDomLevel2) {
    // Reproduct the console warning:
    // [Violation] Added non-passive event listener to a scroll-blocking <some> event.
    // Consider marking event handler as 'passive' to make the page more responsive.
    // Just set console log level: verbose in chrome dev tool.
    // then the warning log will be printed when addEventListener called.
    // See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // We have not yet found a neat way to using passive. Because in zrender the dom event
    // listener delegate all of the upper events of element. Some of those events need
    // to prevent default. For example, the feature `preventDefaultMouseMove` of echarts.
    // Before passive can be adopted, these issues should be considered:
    // (1) Whether and how a zrender user specifies an event listener passive. And by default,
    // passive or not.
    // (2) How to tread that some zrender event listener is passive, and some is not. If
    // we use other way but not preventDefault of mousewheel and touchmove, browser
    // compatibility should be handled.
    // var opts = (env.passiveSupported && name === 'mousewheel')
    //     ? {passive: true}
    //     // By default, the third param of el.addEventListener is `capture: false`.
    //     : void 0;
    // el.addEventListener(name, handler /* , opts */);
    el.addEventListener(name, handler, opt);
  } else {
    // For simplicity, do not implement `setCapture` for IE9-.
    el.attachEvent('on' + name, handler);
  }
}
/**
 * Parameter are the same as `addEventListener`.
 *
 * Notice that if a listener is registered twice, one with capture and one without,
 * remove each one separately. Removal of a capturing listener does not affect a
 * non-capturing version of the same listener, and vice versa.
 */


function removeEventListener(el, name, handler, opt) {
  if (isDomLevel2) {
    el.removeEventListener(name, handler, opt);
  } else {
    el.detachEvent('on' + name, handler);
  }
}
/**
 * preventDefault and stopPropagation.
 * Notice: do not use this method in zrender. It can only be
 * used by upper applications if necessary.
 *
 * @param {Event} e A mouse or touch event.
 */


var stop = isDomLevel2 ? function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.cancelBubble = true;
} : function (e) {
  e.returnValue = false;
  e.cancelBubble = true;
};
/**
 * This method only works for mouseup and mousedown. The functionality is restricted
 * for fault tolerance, See the `e.which` compatibility above.
 *
 * @param {MouseEvent} e
 * @return {boolean}
 */

function isMiddleOrRightButtonOnMouseUpDown(e) {
  return e.which === 2 || e.which === 3;
}
/**
 * To be removed.
 * @deprecated
 */


function notLeftMouse(e) {
  // If e.which is undefined, considered as left mouse event.
  return e.which > 1;
} // For backward compatibility


exports.clientToLocal = clientToLocal;
exports.getNativeEvent = getNativeEvent;
exports.normalizeEvent = normalizeEvent;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.stop = stop;
exports.isMiddleOrRightButtonOnMouseUpDown = isMiddleOrRightButtonOnMouseUpDown;
exports.notLeftMouse = notLeftMouse;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

var ContextCachedBy = {
  NONE: 0,
  STYLE_BIND: 1,
  PLAIN_TEXT: 2
}; // Avoid confused with 0/false.

var WILL_BE_RESTORED = 9;
exports.ContextCachedBy = ContextCachedBy;
exports.WILL_BE_RESTORED = WILL_BE_RESTORED;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);

var retrieve2 = _util.retrieve2;
var retrieve3 = _util.retrieve3;
var each = _util.each;
var normalizeCssArray = _util.normalizeCssArray;
var isString = _util.isString;
var isObject = _util.isObject;

var textContain = __webpack_require__(81);

var roundRectHelper = __webpack_require__(175);

var imageHelper = __webpack_require__(121);

var fixShadow = __webpack_require__(173);

var _constant = __webpack_require__(83);

var ContextCachedBy = _constant.ContextCachedBy;
var WILL_BE_RESTORED = _constant.WILL_BE_RESTORED;
var DEFAULT_FONT = textContain.DEFAULT_FONT; // TODO: Have not support 'start', 'end' yet.

var VALID_TEXT_ALIGN = {
  left: 1,
  right: 1,
  center: 1
};
var VALID_TEXT_VERTICAL_ALIGN = {
  top: 1,
  bottom: 1,
  middle: 1
}; // Different from `STYLE_COMMON_PROPS` of `graphic/Style`,
// the default value of shadowColor is `'transparent'`.

var SHADOW_STYLE_COMMON_PROPS = [['textShadowBlur', 'shadowBlur', 0], ['textShadowOffsetX', 'shadowOffsetX', 0], ['textShadowOffsetY', 'shadowOffsetY', 0], ['textShadowColor', 'shadowColor', 'transparent']];
var _tmpTextPositionResult = {};
var _tmpBoxPositionResult = {};
/**
 * @param {module:zrender/graphic/Style} style
 * @return {module:zrender/graphic/Style} The input style.
 */

function normalizeTextStyle(style) {
  normalizeStyle(style);
  each(style.rich, normalizeStyle);
  return style;
}

function normalizeStyle(style) {
  if (style) {
    style.font = textContain.makeFont(style);
    var textAlign = style.textAlign;
    textAlign === 'middle' && (textAlign = 'center');
    style.textAlign = textAlign == null || VALID_TEXT_ALIGN[textAlign] ? textAlign : 'left'; // Compatible with textBaseline.

    var textVerticalAlign = style.textVerticalAlign || style.textBaseline;
    textVerticalAlign === 'center' && (textVerticalAlign = 'middle');
    style.textVerticalAlign = textVerticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[textVerticalAlign] ? textVerticalAlign : 'top';
    var textPadding = style.textPadding;

    if (textPadding) {
      style.textPadding = normalizeCssArray(style.textPadding);
    }
  }
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {module:zrender/graphic/Style} style
 * @param {Object|boolean} [rect] {x, y, width, height}
 *                  If set false, rect text is not used.
 * @param {Element|module:zrender/graphic/helper/constant.WILL_BE_RESTORED} [prevEl] For ctx prop cache.
 */


function renderText(hostEl, ctx, text, style, rect, prevEl) {
  style.rich ? renderRichText(hostEl, ctx, text, style, rect, prevEl) : renderPlainText(hostEl, ctx, text, style, rect, prevEl);
} // Avoid setting to ctx according to prevEl if possible for
// performance in scenarios of large amount text.


function renderPlainText(hostEl, ctx, text, style, rect, prevEl) {
  'use strict';

  var needDrawBg = needDrawBackground(style);
  var prevStyle;
  var checkCache = false;
  var cachedByMe = ctx.__attrCachedBy === ContextCachedBy.PLAIN_TEXT; // Only take and check cache for `Text` el, but not RectText.

  if (prevEl !== WILL_BE_RESTORED) {
    if (prevEl) {
      prevStyle = prevEl.style;
      checkCache = !needDrawBg && cachedByMe && prevStyle;
    } // Prevent from using cache in `Style::bind`, because of the case:
    // ctx property is modified by other properties than `Style::bind`
    // used, and Style::bind is called next.


    ctx.__attrCachedBy = needDrawBg ? ContextCachedBy.NONE : ContextCachedBy.PLAIN_TEXT;
  } // Since this will be restored, prevent from using these props to check cache in the next
  // entering of this method. But do not need to clear other cache like `Style::bind`.
  else if (cachedByMe) {
      ctx.__attrCachedBy = ContextCachedBy.NONE;
    }

  var styleFont = style.font || DEFAULT_FONT; // PENDING
  // Only `Text` el set `font` and keep it (`RectText` will restore). So theoretically
  // we can make font cache on ctx, which can cache for text el that are discontinuous.
  // But layer save/restore needed to be considered.
  // if (styleFont !== ctx.__fontCache) {
  //     ctx.font = styleFont;
  //     if (prevEl !== WILL_BE_RESTORED) {
  //         ctx.__fontCache = styleFont;
  //     }
  // }

  if (!checkCache || styleFont !== (prevStyle.font || DEFAULT_FONT)) {
    ctx.font = styleFont;
  } // Use the final font from context-2d, because the final
  // font might not be the style.font when it is illegal.
  // But get `ctx.font` might be time consuming.


  var computedFont = hostEl.__computedFont;

  if (hostEl.__styleFont !== styleFont) {
    hostEl.__styleFont = styleFont;
    computedFont = hostEl.__computedFont = ctx.font;
  }

  var textPadding = style.textPadding;
  var textLineHeight = style.textLineHeight;
  var contentBlock = hostEl.__textCotentBlock;

  if (!contentBlock || hostEl.__dirtyText) {
    contentBlock = hostEl.__textCotentBlock = textContain.parsePlainText(text, computedFont, textPadding, textLineHeight, style.truncate);
  }

  var outerHeight = contentBlock.outerHeight;
  var textLines = contentBlock.lines;
  var lineHeight = contentBlock.lineHeight;
  var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
  var baseX = boxPos.baseX;
  var baseY = boxPos.baseY;
  var textAlign = boxPos.textAlign || 'left';
  var textVerticalAlign = boxPos.textVerticalAlign; // Origin of textRotation should be the base point of text drawing.

  applyTextRotation(ctx, style, rect, baseX, baseY);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var textX = baseX;
  var textY = boxY;

  if (needDrawBg || textPadding) {
    // Consider performance, do not call getTextWidth util necessary.
    var textWidth = textContain.getWidth(text, computedFont);
    var outerWidth = textWidth;
    textPadding && (outerWidth += textPadding[1] + textPadding[3]);
    var boxX = textContain.adjustTextX(baseX, outerWidth, textAlign);
    needDrawBg && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);

    if (textPadding) {
      textX = getTextXForPadding(baseX, textAlign, textPadding);
      textY += textPadding[0];
    }
  } // Always set textAlign and textBase line, because it is difficute to calculate
  // textAlign from prevEl, and we dont sure whether textAlign will be reset if
  // font set happened.


  ctx.textAlign = textAlign; // Force baseline to be "middle". Otherwise, if using "top", the
  // text will offset downward a little bit in font "Microsoft YaHei".

  ctx.textBaseline = 'middle'; // Set text opacity

  ctx.globalAlpha = style.opacity || 1; // Always set shadowBlur and shadowOffset to avoid leak from displayable.

  for (var i = 0; i < SHADOW_STYLE_COMMON_PROPS.length; i++) {
    var propItem = SHADOW_STYLE_COMMON_PROPS[i];
    var styleProp = propItem[0];
    var ctxProp = propItem[1];
    var val = style[styleProp];

    if (!checkCache || val !== prevStyle[styleProp]) {
      ctx[ctxProp] = fixShadow(ctx, ctxProp, val || propItem[2]);
    }
  } // `textBaseline` is set as 'middle'.


  textY += lineHeight / 2;
  var textStrokeWidth = style.textStrokeWidth;
  var textStrokeWidthPrev = checkCache ? prevStyle.textStrokeWidth : null;
  var strokeWidthChanged = !checkCache || textStrokeWidth !== textStrokeWidthPrev;
  var strokeChanged = !checkCache || strokeWidthChanged || style.textStroke !== prevStyle.textStroke;
  var textStroke = getStroke(style.textStroke, textStrokeWidth);
  var textFill = getFill(style.textFill);

  if (textStroke) {
    if (strokeWidthChanged) {
      ctx.lineWidth = textStrokeWidth;
    }

    if (strokeChanged) {
      ctx.strokeStyle = textStroke;
    }
  }

  if (textFill) {
    if (!checkCache || style.textFill !== prevStyle.textFill) {
      ctx.fillStyle = textFill;
    }
  } // Optimize simply, in most cases only one line exists.


  if (textLines.length === 1) {
    // Fill after stroke so the outline will not cover the main part.
    textStroke && ctx.strokeText(textLines[0], textX, textY);
    textFill && ctx.fillText(textLines[0], textX, textY);
  } else {
    for (var i = 0; i < textLines.length; i++) {
      // Fill after stroke so the outline will not cover the main part.
      textStroke && ctx.strokeText(textLines[i], textX, textY);
      textFill && ctx.fillText(textLines[i], textX, textY);
      textY += lineHeight;
    }
  }
}

function renderRichText(hostEl, ctx, text, style, rect, prevEl) {
  // Do not do cache for rich text because of the complexity.
  // But `RectText` this will be restored, do not need to clear other cache like `Style::bind`.
  if (prevEl !== WILL_BE_RESTORED) {
    ctx.__attrCachedBy = ContextCachedBy.NONE;
  }

  var contentBlock = hostEl.__textCotentBlock;

  if (!contentBlock || hostEl.__dirtyText) {
    contentBlock = hostEl.__textCotentBlock = textContain.parseRichText(text, style);
  }

  drawRichText(hostEl, ctx, contentBlock, style, rect);
}

function drawRichText(hostEl, ctx, contentBlock, style, rect) {
  var contentWidth = contentBlock.width;
  var outerWidth = contentBlock.outerWidth;
  var outerHeight = contentBlock.outerHeight;
  var textPadding = style.textPadding;
  var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
  var baseX = boxPos.baseX;
  var baseY = boxPos.baseY;
  var textAlign = boxPos.textAlign;
  var textVerticalAlign = boxPos.textVerticalAlign; // Origin of textRotation should be the base point of text drawing.

  applyTextRotation(ctx, style, rect, baseX, baseY);
  var boxX = textContain.adjustTextX(baseX, outerWidth, textAlign);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var xLeft = boxX;
  var lineTop = boxY;

  if (textPadding) {
    xLeft += textPadding[3];
    lineTop += textPadding[0];
  }

  var xRight = xLeft + contentWidth;
  needDrawBackground(style) && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);

  for (var i = 0; i < contentBlock.lines.length; i++) {
    var line = contentBlock.lines[i];
    var tokens = line.tokens;
    var tokenCount = tokens.length;
    var lineHeight = line.lineHeight;
    var usedWidth = line.width;
    var leftIndex = 0;
    var lineXLeft = xLeft;
    var lineXRight = xRight;
    var rightIndex = tokenCount - 1;
    var token;

    while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.textAlign || token.textAlign === 'left')) {
      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft, 'left');
      usedWidth -= token.width;
      lineXLeft += token.width;
      leftIndex++;
    }

    while (rightIndex >= 0 && (token = tokens[rightIndex], token.textAlign === 'right')) {
      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXRight, 'right');
      usedWidth -= token.width;
      lineXRight -= token.width;
      rightIndex--;
    } // The other tokens are placed as textAlign 'center' if there is enough space.


    lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - usedWidth) / 2;

    while (leftIndex <= rightIndex) {
      token = tokens[leftIndex]; // Consider width specified by user, use 'center' rather than 'left'.

      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft + token.width / 2, 'center');
      lineXLeft += token.width;
      leftIndex++;
    }

    lineTop += lineHeight;
  }
}

function applyTextRotation(ctx, style, rect, x, y) {
  // textRotation only apply in RectText.
  if (rect && style.textRotation) {
    var origin = style.textOrigin;

    if (origin === 'center') {
      x = rect.width / 2 + rect.x;
      y = rect.height / 2 + rect.y;
    } else if (origin) {
      x = origin[0] + rect.x;
      y = origin[1] + rect.y;
    }

    ctx.translate(x, y); // Positive: anticlockwise

    ctx.rotate(-style.textRotation);
    ctx.translate(-x, -y);
  }
}

function placeToken(hostEl, ctx, token, style, lineHeight, lineTop, x, textAlign) {
  var tokenStyle = style.rich[token.styleName] || {};
  tokenStyle.text = token.text; // 'ctx.textBaseline' is always set as 'middle', for sake of
  // the bias of "Microsoft YaHei".

  var textVerticalAlign = token.textVerticalAlign;
  var y = lineTop + lineHeight / 2;

  if (textVerticalAlign === 'top') {
    y = lineTop + token.height / 2;
  } else if (textVerticalAlign === 'bottom') {
    y = lineTop + lineHeight - token.height / 2;
  }

  !token.isLineHolder && needDrawBackground(tokenStyle) && drawBackground(hostEl, ctx, tokenStyle, textAlign === 'right' ? x - token.width : textAlign === 'center' ? x - token.width / 2 : x, y - token.height / 2, token.width, token.height);
  var textPadding = token.textPadding;

  if (textPadding) {
    x = getTextXForPadding(x, textAlign, textPadding);
    y -= token.height / 2 - textPadding[2] - token.textHeight / 2;
  }

  setCtx(ctx, 'shadowBlur', retrieve3(tokenStyle.textShadowBlur, style.textShadowBlur, 0));
  setCtx(ctx, 'shadowColor', tokenStyle.textShadowColor || style.textShadowColor || 'transparent');
  setCtx(ctx, 'shadowOffsetX', retrieve3(tokenStyle.textShadowOffsetX, style.textShadowOffsetX, 0));
  setCtx(ctx, 'shadowOffsetY', retrieve3(tokenStyle.textShadowOffsetY, style.textShadowOffsetY, 0));
  setCtx(ctx, 'textAlign', textAlign); // Force baseline to be "middle". Otherwise, if using "top", the
  // text will offset downward a little bit in font "Microsoft YaHei".

  setCtx(ctx, 'textBaseline', 'middle');
  setCtx(ctx, 'font', token.font || DEFAULT_FONT);
  var textStroke = getStroke(tokenStyle.textStroke || style.textStroke, textStrokeWidth);
  var textFill = getFill(tokenStyle.textFill || style.textFill);
  var textStrokeWidth = retrieve2(tokenStyle.textStrokeWidth, style.textStrokeWidth); // Fill after stroke so the outline will not cover the main part.

  if (textStroke) {
    setCtx(ctx, 'lineWidth', textStrokeWidth);
    setCtx(ctx, 'strokeStyle', textStroke);
    ctx.strokeText(token.text, x, y);
  }

  if (textFill) {
    setCtx(ctx, 'fillStyle', textFill);
    ctx.fillText(token.text, x, y);
  }
}

function needDrawBackground(style) {
  return !!(style.textBackgroundColor || style.textBorderWidth && style.textBorderColor);
} // style: {textBackgroundColor, textBorderWidth, textBorderColor, textBorderRadius, text}
// shape: {x, y, width, height}


function drawBackground(hostEl, ctx, style, x, y, width, height) {
  var textBackgroundColor = style.textBackgroundColor;
  var textBorderWidth = style.textBorderWidth;
  var textBorderColor = style.textBorderColor;
  var isPlainBg = isString(textBackgroundColor);
  setCtx(ctx, 'shadowBlur', style.textBoxShadowBlur || 0);
  setCtx(ctx, 'shadowColor', style.textBoxShadowColor || 'transparent');
  setCtx(ctx, 'shadowOffsetX', style.textBoxShadowOffsetX || 0);
  setCtx(ctx, 'shadowOffsetY', style.textBoxShadowOffsetY || 0);

  if (isPlainBg || textBorderWidth && textBorderColor) {
    ctx.beginPath();
    var textBorderRadius = style.textBorderRadius;

    if (!textBorderRadius) {
      ctx.rect(x, y, width, height);
    } else {
      roundRectHelper.buildPath(ctx, {
        x: x,
        y: y,
        width: width,
        height: height,
        r: textBorderRadius
      });
    }

    ctx.closePath();
  }

  if (isPlainBg) {
    setCtx(ctx, 'fillStyle', textBackgroundColor);

    if (style.fillOpacity != null) {
      var originalGlobalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = style.fillOpacity * style.opacity;
      ctx.fill();
      ctx.globalAlpha = originalGlobalAlpha;
    } else {
      ctx.fill();
    }
  } else if (isObject(textBackgroundColor)) {
    var image = textBackgroundColor.image;
    image = imageHelper.createOrUpdateImage(image, null, hostEl, onBgImageLoaded, textBackgroundColor);

    if (image && imageHelper.isImageReady(image)) {
      ctx.drawImage(image, x, y, width, height);
    }
  }

  if (textBorderWidth && textBorderColor) {
    setCtx(ctx, 'lineWidth', textBorderWidth);
    setCtx(ctx, 'strokeStyle', textBorderColor);

    if (style.strokeOpacity != null) {
      var originalGlobalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = style.strokeOpacity * style.opacity;
      ctx.stroke();
      ctx.globalAlpha = originalGlobalAlpha;
    } else {
      ctx.stroke();
    }
  }
}

function onBgImageLoaded(image, textBackgroundColor) {
  // Replace image, so that `contain/text.js#parseRichText`
  // will get correct result in next tick.
  textBackgroundColor.image = image;
}

function getBoxPosition(out, hostEl, style, rect) {
  var baseX = style.x || 0;
  var baseY = style.y || 0;
  var textAlign = style.textAlign;
  var textVerticalAlign = style.textVerticalAlign; // Text position represented by coord

  if (rect) {
    var textPosition = style.textPosition;

    if (textPosition instanceof Array) {
      // Percent
      baseX = rect.x + parsePercent(textPosition[0], rect.width);
      baseY = rect.y + parsePercent(textPosition[1], rect.height);
    } else {
      var res = hostEl && hostEl.calculateTextPosition ? hostEl.calculateTextPosition(_tmpTextPositionResult, style, rect) : textContain.calculateTextPosition(_tmpTextPositionResult, style, rect);
      baseX = res.x;
      baseY = res.y; // Default align and baseline when has textPosition

      textAlign = textAlign || res.textAlign;
      textVerticalAlign = textVerticalAlign || res.textVerticalAlign;
    } // textOffset is only support in RectText, otherwise
    // we have to adjust boundingRect for textOffset.


    var textOffset = style.textOffset;

    if (textOffset) {
      baseX += textOffset[0];
      baseY += textOffset[1];
    }
  }

  out = out || {};
  out.baseX = baseX;
  out.baseY = baseY;
  out.textAlign = textAlign;
  out.textVerticalAlign = textVerticalAlign;
  return out;
}

function setCtx(ctx, prop, value) {
  ctx[prop] = fixShadow(ctx, prop, value);
  return ctx[prop];
}
/**
 * @param {string} [stroke] If specified, do not check style.textStroke.
 * @param {string} [lineWidth] If specified, do not check style.textStroke.
 * @param {number} style
 */


function getStroke(stroke, lineWidth) {
  return stroke == null || lineWidth <= 0 || stroke === 'transparent' || stroke === 'none' ? null // TODO pattern and gradient?
  : stroke.image || stroke.colorStops ? '#000' : stroke;
}

function getFill(fill) {
  return fill == null || fill === 'none' ? null // TODO pattern and gradient?
  : fill.image || fill.colorStops ? '#000' : fill;
}

function parsePercent(value, maxValue) {
  if (typeof value === 'string') {
    if (value.lastIndexOf('%') >= 0) {
      return parseFloat(value) / 100 * maxValue;
    }

    return parseFloat(value);
  }

  return value;
}

function getTextXForPadding(x, textAlign, textPadding) {
  return textAlign === 'right' ? x - textPadding[1] : textAlign === 'center' ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
}
/**
 * @param {string} text
 * @param {module:zrender/Style} style
 * @return {boolean}
 */


function needDrawText(text, style) {
  return text != null && (text || style.textBackgroundColor || style.textBorderWidth && style.textBorderColor || style.textPadding);
}

exports.normalizeTextStyle = normalizeTextStyle;
exports.renderText = renderText;
exports.getBoxPosition = getBoxPosition;
exports.getStroke = getStroke;
exports.getFill = getFill;
exports.parsePercent = parsePercent;
exports.needDrawText = needDrawText;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

/**
 * Event Mixin
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */
var arrySlice = Array.prototype.slice;
/**
 * Event dispatcher.
 *
 * @alias module:zrender/mixin/Eventful
 * @constructor
 * @param {Object} [eventProcessor] The object eventProcessor is the scope when
 *        `eventProcessor.xxx` called.
 * @param {Function} [eventProcessor.normalizeQuery]
 *        param: {string|Object} Raw query.
 *        return: {string|Object} Normalized query.
 * @param {Function} [eventProcessor.filter] Event will be dispatched only
 *        if it returns `true`.
 *        param: {string} eventType
 *        param: {string|Object} query
 *        return: {boolean}
 * @param {Function} [eventProcessor.afterTrigger] Called after all handlers called.
 *        param: {string} eventType
 */

var Eventful = function (eventProcessor) {
  this._$handlers = {};
  this._$eventProcessor = eventProcessor;
};

Eventful.prototype = {
  constructor: Eventful,

  /**
   * The handler can only be triggered once, then removed.
   *
   * @param {string} event The event name.
   * @param {string|Object} [query] Condition used on event filter.
   * @param {Function} handler The event handler.
   * @param {Object} context
   */
  one: function (event, query, handler, context) {
    return on(this, event, query, handler, context, true);
  },

  /**
   * Bind a handler.
   *
   * @param {string} event The event name.
   * @param {string|Object} [query] Condition used on event filter.
   * @param {Function} handler The event handler.
   * @param {Object} [context]
   */
  on: function (event, query, handler, context) {
    return on(this, event, query, handler, context, false);
  },

  /**
   * Whether any handler has bound.
   *
   * @param  {string}  event
   * @return {boolean}
   */
  isSilent: function (event) {
    var _h = this._$handlers;
    return !_h[event] || !_h[event].length;
  },

  /**
   * Unbind a event.
   *
   * @param {string} [event] The event name.
   *        If no `event` input, "off" all listeners.
   * @param {Function} [handler] The event handler.
   *        If no `handler` input, "off" all listeners of the `event`.
   */
  off: function (event, handler) {
    var _h = this._$handlers;

    if (!event) {
      this._$handlers = {};
      return this;
    }

    if (handler) {
      if (_h[event]) {
        var newList = [];

        for (var i = 0, l = _h[event].length; i < l; i++) {
          if (_h[event][i].h !== handler) {
            newList.push(_h[event][i]);
          }
        }

        _h[event] = newList;
      }

      if (_h[event] && _h[event].length === 0) {
        delete _h[event];
      }
    } else {
      delete _h[event];
    }

    return this;
  },

  /**
   * Dispatch a event.
   *
   * @param {string} type The event name.
   */
  trigger: function (type) {
    var _h = this._$handlers[type];
    var eventProcessor = this._$eventProcessor;

    if (_h) {
      var args = arguments;
      var argLen = args.length;

      if (argLen > 3) {
        args = arrySlice.call(args, 1);
      }

      var len = _h.length;

      for (var i = 0; i < len;) {
        var hItem = _h[i];

        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
          i++;
          continue;
        } // Optimize advise from backbone


        switch (argLen) {
          case 1:
            hItem.h.call(hItem.ctx);
            break;

          case 2:
            hItem.h.call(hItem.ctx, args[1]);
            break;

          case 3:
            hItem.h.call(hItem.ctx, args[1], args[2]);
            break;

          default:
            // have more than 2 given arguments
            hItem.h.apply(hItem.ctx, args);
            break;
        }

        if (hItem.one) {
          _h.splice(i, 1);

          len--;
        } else {
          i++;
        }
      }
    }

    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
    return this;
  },

  /**
   * Dispatch a event with context, which is specified at the last parameter.
   *
   * @param {string} type The event name.
   */
  triggerWithContext: function (type) {
    var _h = this._$handlers[type];
    var eventProcessor = this._$eventProcessor;

    if (_h) {
      var args = arguments;
      var argLen = args.length;

      if (argLen > 4) {
        args = arrySlice.call(args, 1, args.length - 1);
      }

      var ctx = args[args.length - 1];
      var len = _h.length;

      for (var i = 0; i < len;) {
        var hItem = _h[i];

        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
          i++;
          continue;
        } // Optimize advise from backbone


        switch (argLen) {
          case 1:
            hItem.h.call(ctx);
            break;

          case 2:
            hItem.h.call(ctx, args[1]);
            break;

          case 3:
            hItem.h.call(ctx, args[1], args[2]);
            break;

          default:
            // have more than 2 given arguments
            hItem.h.apply(ctx, args);
            break;
        }

        if (hItem.one) {
          _h.splice(i, 1);

          len--;
        } else {
          i++;
        }
      }
    }

    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
    return this;
  }
};

function normalizeQuery(host, query) {
  var eventProcessor = host._$eventProcessor;

  if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
    query = eventProcessor.normalizeQuery(query);
  }

  return query;
}

function on(eventful, event, query, handler, context, isOnce) {
  var _h = eventful._$handlers;

  if (typeof query === 'function') {
    context = handler;
    handler = query;
    query = null;
  }

  if (!handler || !event) {
    return eventful;
  }

  query = normalizeQuery(eventful, query);

  if (!_h[event]) {
    _h[event] = [];
  }

  for (var i = 0; i < _h[event].length; i++) {
    if (_h[event][i].h === handler) {
      return eventful;
    }
  }

  var wrap = {
    h: handler,
    one: isOnce,
    query: query,
    ctx: context || eventful,
    // FIXME
    // Do not publish this feature util it is proved that it makes sense.
    callAtLast: handler.zrEventfulCallAtLast
  };
  var lastIndex = _h[event].length - 1;
  var lastWrap = _h[event][lastIndex];
  lastWrap && lastWrap.callAtLast ? _h[event].splice(lastIndex, 0, wrap) : _h[event].push(wrap);
  return eventful;
} // ----------------------
// The events in zrender
// ----------------------

/**
 * @event module:zrender/mixin/Eventful#onclick
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseover
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseout
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousemove
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousewheel
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousedown
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseup
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondrag
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragstart
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragend
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragenter
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragleave
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragover
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondrop
 * @type {Function}
 * @default null
 */


var _default = Eventful;
module.exports = _default;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var LRU = __webpack_require__(169);

var kCSSColorTable = {
  'transparent': [0, 0, 0, 0],
  'aliceblue': [240, 248, 255, 1],
  'antiquewhite': [250, 235, 215, 1],
  'aqua': [0, 255, 255, 1],
  'aquamarine': [127, 255, 212, 1],
  'azure': [240, 255, 255, 1],
  'beige': [245, 245, 220, 1],
  'bisque': [255, 228, 196, 1],
  'black': [0, 0, 0, 1],
  'blanchedalmond': [255, 235, 205, 1],
  'blue': [0, 0, 255, 1],
  'blueviolet': [138, 43, 226, 1],
  'brown': [165, 42, 42, 1],
  'burlywood': [222, 184, 135, 1],
  'cadetblue': [95, 158, 160, 1],
  'chartreuse': [127, 255, 0, 1],
  'chocolate': [210, 105, 30, 1],
  'coral': [255, 127, 80, 1],
  'cornflowerblue': [100, 149, 237, 1],
  'cornsilk': [255, 248, 220, 1],
  'crimson': [220, 20, 60, 1],
  'cyan': [0, 255, 255, 1],
  'darkblue': [0, 0, 139, 1],
  'darkcyan': [0, 139, 139, 1],
  'darkgoldenrod': [184, 134, 11, 1],
  'darkgray': [169, 169, 169, 1],
  'darkgreen': [0, 100, 0, 1],
  'darkgrey': [169, 169, 169, 1],
  'darkkhaki': [189, 183, 107, 1],
  'darkmagenta': [139, 0, 139, 1],
  'darkolivegreen': [85, 107, 47, 1],
  'darkorange': [255, 140, 0, 1],
  'darkorchid': [153, 50, 204, 1],
  'darkred': [139, 0, 0, 1],
  'darksalmon': [233, 150, 122, 1],
  'darkseagreen': [143, 188, 143, 1],
  'darkslateblue': [72, 61, 139, 1],
  'darkslategray': [47, 79, 79, 1],
  'darkslategrey': [47, 79, 79, 1],
  'darkturquoise': [0, 206, 209, 1],
  'darkviolet': [148, 0, 211, 1],
  'deeppink': [255, 20, 147, 1],
  'deepskyblue': [0, 191, 255, 1],
  'dimgray': [105, 105, 105, 1],
  'dimgrey': [105, 105, 105, 1],
  'dodgerblue': [30, 144, 255, 1],
  'firebrick': [178, 34, 34, 1],
  'floralwhite': [255, 250, 240, 1],
  'forestgreen': [34, 139, 34, 1],
  'fuchsia': [255, 0, 255, 1],
  'gainsboro': [220, 220, 220, 1],
  'ghostwhite': [248, 248, 255, 1],
  'gold': [255, 215, 0, 1],
  'goldenrod': [218, 165, 32, 1],
  'gray': [128, 128, 128, 1],
  'green': [0, 128, 0, 1],
  'greenyellow': [173, 255, 47, 1],
  'grey': [128, 128, 128, 1],
  'honeydew': [240, 255, 240, 1],
  'hotpink': [255, 105, 180, 1],
  'indianred': [205, 92, 92, 1],
  'indigo': [75, 0, 130, 1],
  'ivory': [255, 255, 240, 1],
  'khaki': [240, 230, 140, 1],
  'lavender': [230, 230, 250, 1],
  'lavenderblush': [255, 240, 245, 1],
  'lawngreen': [124, 252, 0, 1],
  'lemonchiffon': [255, 250, 205, 1],
  'lightblue': [173, 216, 230, 1],
  'lightcoral': [240, 128, 128, 1],
  'lightcyan': [224, 255, 255, 1],
  'lightgoldenrodyellow': [250, 250, 210, 1],
  'lightgray': [211, 211, 211, 1],
  'lightgreen': [144, 238, 144, 1],
  'lightgrey': [211, 211, 211, 1],
  'lightpink': [255, 182, 193, 1],
  'lightsalmon': [255, 160, 122, 1],
  'lightseagreen': [32, 178, 170, 1],
  'lightskyblue': [135, 206, 250, 1],
  'lightslategray': [119, 136, 153, 1],
  'lightslategrey': [119, 136, 153, 1],
  'lightsteelblue': [176, 196, 222, 1],
  'lightyellow': [255, 255, 224, 1],
  'lime': [0, 255, 0, 1],
  'limegreen': [50, 205, 50, 1],
  'linen': [250, 240, 230, 1],
  'magenta': [255, 0, 255, 1],
  'maroon': [128, 0, 0, 1],
  'mediumaquamarine': [102, 205, 170, 1],
  'mediumblue': [0, 0, 205, 1],
  'mediumorchid': [186, 85, 211, 1],
  'mediumpurple': [147, 112, 219, 1],
  'mediumseagreen': [60, 179, 113, 1],
  'mediumslateblue': [123, 104, 238, 1],
  'mediumspringgreen': [0, 250, 154, 1],
  'mediumturquoise': [72, 209, 204, 1],
  'mediumvioletred': [199, 21, 133, 1],
  'midnightblue': [25, 25, 112, 1],
  'mintcream': [245, 255, 250, 1],
  'mistyrose': [255, 228, 225, 1],
  'moccasin': [255, 228, 181, 1],
  'navajowhite': [255, 222, 173, 1],
  'navy': [0, 0, 128, 1],
  'oldlace': [253, 245, 230, 1],
  'olive': [128, 128, 0, 1],
  'olivedrab': [107, 142, 35, 1],
  'orange': [255, 165, 0, 1],
  'orangered': [255, 69, 0, 1],
  'orchid': [218, 112, 214, 1],
  'palegoldenrod': [238, 232, 170, 1],
  'palegreen': [152, 251, 152, 1],
  'paleturquoise': [175, 238, 238, 1],
  'palevioletred': [219, 112, 147, 1],
  'papayawhip': [255, 239, 213, 1],
  'peachpuff': [255, 218, 185, 1],
  'peru': [205, 133, 63, 1],
  'pink': [255, 192, 203, 1],
  'plum': [221, 160, 221, 1],
  'powderblue': [176, 224, 230, 1],
  'purple': [128, 0, 128, 1],
  'red': [255, 0, 0, 1],
  'rosybrown': [188, 143, 143, 1],
  'royalblue': [65, 105, 225, 1],
  'saddlebrown': [139, 69, 19, 1],
  'salmon': [250, 128, 114, 1],
  'sandybrown': [244, 164, 96, 1],
  'seagreen': [46, 139, 87, 1],
  'seashell': [255, 245, 238, 1],
  'sienna': [160, 82, 45, 1],
  'silver': [192, 192, 192, 1],
  'skyblue': [135, 206, 235, 1],
  'slateblue': [106, 90, 205, 1],
  'slategray': [112, 128, 144, 1],
  'slategrey': [112, 128, 144, 1],
  'snow': [255, 250, 250, 1],
  'springgreen': [0, 255, 127, 1],
  'steelblue': [70, 130, 180, 1],
  'tan': [210, 180, 140, 1],
  'teal': [0, 128, 128, 1],
  'thistle': [216, 191, 216, 1],
  'tomato': [255, 99, 71, 1],
  'turquoise': [64, 224, 208, 1],
  'violet': [238, 130, 238, 1],
  'wheat': [245, 222, 179, 1],
  'white': [255, 255, 255, 1],
  'whitesmoke': [245, 245, 245, 1],
  'yellow': [255, 255, 0, 1],
  'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {
  // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {
  // Clamp to integer 0 .. 360.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {
  // int or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssByte(parseFloat(str) / 100 * 255);
  }

  return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) {
  // float or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssFloat(parseFloat(str) / 100);
  }

  return clampCssFloat(parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
  if (h < 0) {
    h += 1;
  } else if (h > 1) {
    h -= 1;
  }

  if (h * 6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  }

  if (h * 2 < 1) {
    return m2;
  }

  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }

  return m1;
}

function lerpNumber(a, b, p) {
  return a + (b - a) * p;
}

function setRgba(out, r, g, b, a) {
  out[0] = r;
  out[1] = g;
  out[2] = b;
  out[3] = a;
  return out;
}

function copyRgba(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

var colorCache = new LRU(20);
var lastRemovedArr = null;

function putToCache(colorStr, rgbaArr) {
  // Reuse removed array
  if (lastRemovedArr) {
    copyRgba(lastRemovedArr, rgbaArr);
  }

  lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice());
}
/**
 * @param {string} colorStr
 * @param {Array.<number>} out
 * @return {Array.<number>}
 * @memberOf module:zrender/util/color
 */


function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }

  rgbaArr = rgbaArr || [];
  var cached = colorCache.get(colorStr);

  if (cached) {
    return copyRgba(rgbaArr, cached);
  } // colorStr may be not string


  colorStr = colorStr + ''; // Remove all whitespace, not compliant, but should just be more accepting.

  var str = colorStr.replace(/ /g, '').toLowerCase(); // Color keywords (and transparent) lookup.

  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    putToCache(colorStr, rgbaArr);
    return rgbaArr;
  } // #abc and #abc123 syntax.


  if (str.charAt(0) === '#') {
    if (str.length === 4) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.

      if (!(iv >= 0 && iv <= 0xfff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (iv & 0xf00) >> 4 | (iv & 0xf00) >> 8, iv & 0xf0 | (iv & 0xf0) >> 4, iv & 0xf | (iv & 0xf) << 4, 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    } else if (str.length === 7) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.

      if (!(iv >= 0 && iv <= 0xffffff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    }

    return;
  }

  var op = str.indexOf('(');
  var ep = str.indexOf(')');

  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(',');
    var alpha = 1; // To allow case fallthrough.

    switch (fname) {
      case 'rgba':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        alpha = parseCssFloat(params.pop());
      // jshint ignore:line
      // Fall through.

      case 'rgb':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      case 'hsla':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        params[3] = parseCssFloat(params[3]);
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      case 'hsl':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      default:
        return;
    }
  }

  setRgba(rgbaArr, 0, 0, 0, 1);
  return;
}
/**
 * @param {Array.<number>} hsla
 * @param {Array.<number>} rgba
 * @return {Array.<number>} rgba
 */


function hsla2rgba(hsla, rgba) {
  var h = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360; // 0 .. 1
  // NOTE(deanm): According to the CSS spec s/l should only be
  // percentages, but we don't bother and let float or percentage.

  var s = parseCssFloat(hsla[1]);
  var l = parseCssFloat(hsla[2]);
  var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  var m1 = l * 2 - m2;
  rgba = rgba || [];
  setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);

  if (hsla.length === 4) {
    rgba[3] = hsla[3];
  }

  return rgba;
}
/**
 * @param {Array.<number>} rgba
 * @return {Array.<number>} hsla
 */


function rgba2hsla(rgba) {
  if (!rgba) {
    return;
  } // RGB from 0 to 255


  var R = rgba[0] / 255;
  var G = rgba[1] / 255;
  var B = rgba[2] / 255;
  var vMin = Math.min(R, G, B); // Min. value of RGB

  var vMax = Math.max(R, G, B); // Max. value of RGB

  var delta = vMax - vMin; // Delta RGB value

  var L = (vMax + vMin) / 2;
  var H;
  var S; // HSL results from 0 to 1

  if (delta === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = delta / (vMax + vMin);
    } else {
      S = delta / (2 - vMax - vMin);
    }

    var deltaR = ((vMax - R) / 6 + delta / 2) / delta;
    var deltaG = ((vMax - G) / 6 + delta / 2) / delta;
    var deltaB = ((vMax - B) / 6 + delta / 2) / delta;

    if (R === vMax) {
      H = deltaB - deltaG;
    } else if (G === vMax) {
      H = 1 / 3 + deltaR - deltaB;
    } else if (B === vMax) {
      H = 2 / 3 + deltaG - deltaR;
    }

    if (H < 0) {
      H += 1;
    }

    if (H > 1) {
      H -= 1;
    }
  }

  var hsla = [H * 360, S, L];

  if (rgba[3] != null) {
    hsla.push(rgba[3]);
  }

  return hsla;
}
/**
 * @param {string} color
 * @param {number} level
 * @return {string}
 * @memberOf module:zrender/util/color
 */


function lift(color, level) {
  var colorArr = parse(color);

  if (colorArr) {
    for (var i = 0; i < 3; i++) {
      if (level < 0) {
        colorArr[i] = colorArr[i] * (1 - level) | 0;
      } else {
        colorArr[i] = (255 - colorArr[i]) * level + colorArr[i] | 0;
      }

      if (colorArr[i] > 255) {
        colorArr[i] = 255;
      } else if (color[i] < 0) {
        colorArr[i] = 0;
      }
    }

    return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
  }
}
/**
 * @param {string} color
 * @return {string}
 * @memberOf module:zrender/util/color
 */


function toHex(color) {
  var colorArr = parse(color);

  if (colorArr) {
    return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + +colorArr[2]).toString(16).slice(1);
  }
}
/**
 * Map value to color. Faster than lerp methods because color is represented by rgba array.
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<Array.<number>>} colors List of rgba color array
 * @param {Array.<number>} [out] Mapped gba color array
 * @return {Array.<number>} will be null/undefined if input illegal.
 */


function fastLerp(normalizedValue, colors, out) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  out = out || [];
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = colors[leftIndex];
  var rightColor = colors[rightIndex];
  var dv = value - leftIndex;
  out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
  out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
  out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
  out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
  return out;
}
/**
 * @deprecated
 */


var fastMapToColor = fastLerp;
/**
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<string>} colors Color list.
 * @param {boolean=} fullOutput Default false.
 * @return {(string|Object)} Result color. If fullOutput,
 *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
 * @memberOf module:zrender/util/color
 */

function lerp(normalizedValue, colors, fullOutput) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = parse(colors[leftIndex]);
  var rightColor = parse(colors[rightIndex]);
  var dv = value - leftIndex;
  var color = stringify([clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)), clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)), clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)), clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))], 'rgba');
  return fullOutput ? {
    color: color,
    leftIndex: leftIndex,
    rightIndex: rightIndex,
    value: value
  } : color;
}
/**
 * @deprecated
 */


var mapToColor = lerp;
/**
 * @param {string} color
 * @param {number=} h 0 ~ 360, ignore when null.
 * @param {number=} s 0 ~ 1, ignore when null.
 * @param {number=} l 0 ~ 1, ignore when null.
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */

function modifyHSL(color, h, s, l) {
  color = parse(color);

  if (color) {
    color = rgba2hsla(color);
    h != null && (color[0] = clampCssAngle(h));
    s != null && (color[1] = parseCssFloat(s));
    l != null && (color[2] = parseCssFloat(l));
    return stringify(hsla2rgba(color), 'rgba');
  }
}
/**
 * @param {string} color
 * @param {number=} alpha 0 ~ 1
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */


function modifyAlpha(color, alpha) {
  color = parse(color);

  if (color && alpha != null) {
    color[3] = clampCssFloat(alpha);
    return stringify(color, 'rgba');
  }
}
/**
 * @param {Array.<number>} arrColor like [12,33,44,0.4]
 * @param {string} type 'rgba', 'hsva', ...
 * @return {string} Result color. (If input illegal, return undefined).
 */


function stringify(arrColor, type) {
  if (!arrColor || !arrColor.length) {
    return;
  }

  var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];

  if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
    colorStr += ',' + arrColor[3];
  }

  return type + '(' + colorStr + ')';
}

exports.parse = parse;
exports.lift = lift;
exports.toHex = toHex;
exports.fastLerp = fastLerp;
exports.fastMapToColor = fastMapToColor;
exports.lerp = lerp;
exports.mapToColor = mapToColor;
exports.modifyHSL = modifyHSL;
exports.modifyAlpha = modifyAlpha;
exports.stringify = stringify;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zrender = __webpack_require__(79);

var _zrender2 = _interopRequireDefault(_zrender);

var _utils = __webpack_require__(57);

var _Tools = __webpack_require__(127);

var _Tools2 = _interopRequireDefault(_Tools);

var _ImageConfig = __webpack_require__(189);

var _ImageConfig2 = _interopRequireDefault(_ImageConfig);

var _EditRect = __webpack_require__(88);

var _EditRect2 = _interopRequireDefault(_EditRect);

var _Init2 = __webpack_require__(126);

var _Init3 = _interopRequireDefault(_Init2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageOption = void 0,
    image = void 0,
    group = void 0;

var BImage = function (_Init) {
    _inherits(BImage, _Init);

    function BImage(opts) {
        _classCallCheck(this, BImage);

        var _this = _possibleConstructorReturn(this, (BImage.__proto__ || Object.getPrototypeOf(BImage)).call(this, opts, ImageOption));

        if (ImageOption) {
            _this._option = ImageOption;
        } else {
            _this._option = {};
            _this._option.offsetX = 0;
            _this._option.offsetY = 0;

            _this._option.imgZoom = 2;
            _this._option.setRate = 0;
            _this._option.widthImg = 0;
            _this._option.heightImg = 0;
            _this._option.scale = 1;
            _this._option.x = 0;
            _this._option.y = 0;
            _this._option.draggable = false;
            _this._option.rotateTime = 0;
            _this._option.center = [];
            _this._option.rotate = {};
            _this._option.mode = opts && opts.mode || 'auto';
        }

        _this.type = 'IMAGE';
        _this.image = null;
        _this._editWidth = _EditRect2.default.shape.width;

        _this._imageDrag = opts && opts.event.onImageDrag;
        _this._imageDragEnd = opts && opts.event.onImageDragEnd;
        _this._onComplete = opts && opts.event.onLoadComplete;


        _this.initialize();

        ImageOption = _this._option;
        return _this;
    }

    _createClass(BImage, [{
        key: 'initialize',
        value: function initialize() {
            this.renderImg(this.imgUrl);
        }
    }, {
        key: 'getZrender',
        value: function getZrender() {
            return this.zr;
        }
    }, {
        key: 'getImage',
        value: function getImage() {
            return this.image;
        }
    }, {
        key: 'getGroup',
        value: function getGroup() {
            return this.group;
        }
    }, {
        key: 'setDrag',
        value: function setDrag(bol) {
            this._option.draggable = bol;

            this.group && this.group.eachChild(function (item) {
                if (item.data.type === 'IMAGE') {
                    item.attr({
                        'draggable': bol,
                        'cursor': 'pointer'
                    });
                }
            });
        }
    }, {
        key: 'getDrag',
        value: function getDrag() {
            return this._option.draggable;
        }
    }, {
        key: 'renderImg',
        value: function renderImg(url) {
            var _this2 = this;

            if (!url) {
                return;
            }

            group = new _zrender2.default.Group();
            this.group = group;
            this._option.group = group;

            var img = new Image();
            img.src = url;
            img.setAttribute('crossorigin', 'anonymous');
            img.onload = function () {
                if (_this2._option.mode === 'auto') {
                    var xRate = _this2.ctx.canvasWidth / img.width;
                    var yRate = _this2.ctx.canvasHeight / img.height;
                    _this2._option.setRate = xRate < yRate ? xRate : yRate;

                    if (_this2._option.setRate > _this2._option.imgZoom) {
                        _this2._option.setRate = _this2._option.imgZoom;
                    }
                    _this2._option.widthImg = img.width * _this2._option.setRate;
                    _this2._option.heightImg = img.height * _this2._option.setRate;
                    _this2._option.offsetX = (_this2.ctx.canvasWidth - _this2._option.widthImg) / 2;
                    _this2._option.offsetY = (_this2.ctx.canvasHeight - _this2._option.heightImg) / 2;
                } else {
                    _this2._option.setRate = 1;
                    _this2._option.widthImg = img.width;
                    _this2._option.heightImg = img.height;
                    _this2._option.offsetX = 0;
                    _this2._option.offsetY = 0;
                }

                image = new _zrender2.default.Image({
                    style: {
                        image: url,
                        x: _this2._option.offsetX,
                        y: _this2._option.offsetY,
                        width: _this2._option.widthImg,
                        height: _this2._option.heightImg
                    },
                    cursor: 'default',
                    data: {
                        type: 'IMAGE',
                        origin_width: img.width,
                        origin_height: img.height,
                        rate_width: _this2._option.widthImg,
                        rate_height: _this2._option.heightImg
                    },
                    zlevel: 1
                });
                _this2._option.center = [_this2._option.offsetX + _this2._option.widthImg / 2, _this2._option.offsetY + _this2._option.heightImg / 2];

                _this2.image = image;

                _this2._option.image = image;

                group.add(image);
                _this2.zr.add(group);

                _this2.image.on('drag', function (e) {
                    _this2._imageDrag && _this2._imageDrag(e);
                });
                _this2.image.on('dragend', function (e) {
                    _this2._imageDragEnd && _this2._imageDragEnd(e);
                });

                _this2._onComplete && _this2._onComplete();

                _this2._bindEvent();
            };
        }
    }, {
        key: '_zrClick',
        value: function _zrClick() {}
    }, {
        key: '_zrMouseMove',
        value: function _zrMouseMove() {}
    }, {
        key: '_zrMouseDown',
        value: function _zrMouseDown() {}
    }, {
        key: '_zrMouseUp',
        value: function _zrMouseUp() {}
    }, {
        key: '_zrDBClick',
        value: function _zrDBClick() {}
    }, {
        key: 'getRotate',
        value: function getRotate() {
            return this._option.rotate;
        }
    }, {
        key: 'resetRotate',
        value: function resetRotate() {
            this.rotate(0);
        }
    }, {
        key: 'rotate',
        value: function rotate(degree) {
            var oldScale = this.group.scale[0];

            var center = this._option.center;

            var zero = 0.003 / 180 * Math.PI;

            if (degree === 0) {
                this._option.rotateTime = 0;
                this.group.attr({
                    rotation: zero,
                    origin: center
                });
                this._option.rotate = {
                    radians: 0,
                    degrees: 0
                };
                return;
            }

            var degreePi = degree / 180 * Math.PI;

            if (degree > 0) {
                this._option.rotateTime++;

                var result = void 0;
                if (this._option.rotateTime === 0) {
                    result = zero;
                } else {
                    result = -degreePi * this._option.rotateTime;
                }

                this.group.attr({
                    rotation: result,
                    origin: center
                });
                this._option.rotate = {
                    radians: -degreePi * this._option.rotateTime,
                    degrees: -degree * this._option.rotateTime
                };
            } else {
                this._option.rotateTime--;

                var _result = void 0;
                if (this._option.rotateTime === 0) {
                    _result = zero;
                } else {
                    _result = degreePi * this._option.rotateTime;
                }

                this.group.attr({
                    rotation: _result,
                    origin: center
                });
                this._option.rotate = {
                    radians: degreePi * this._option.rotateTime,
                    degrees: degree * this._option.rotateTime
                };
            }
        }
    }, {
        key: '_limitAttributes',
        value: function _limitAttributes(newAttrs) {
            var box = this.image.getBoundingRect();
            var minX = -box.width + this.ctx.canvasWidth / 2;
            var maxX = this.ctx.canvasWidth / 2;

            var x = Math.max(minX, Math.min(newAttrs.x, maxX));

            var minY = -box.height + this.ctx.canvasHeight / 2;
            var maxY = this.ctx.canvasHeight / 2;

            var y = Math.max(minY, Math.min(newAttrs.y, maxY));

            var scale = Math.max(0.05, newAttrs.scale);

            return { x: x, y: y, scale: scale };
        }
    }, {
        key: 'zoomIn',
        value: function zoomIn() {
            var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.2;

            this.zoomStage(times);
        }
    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.8;

            this.zoomStage(times);
        }
    }, {
        key: 'zoomStage',
        value: function zoomStage(scaleBy) {
            var oldScale = this.group.scale[0];
            var pos = {
                x: this.ctx.canvasWidth / 2,
                y: this.ctx.canvasHeight / 2
            };

            var mousePointTo = {
                x: pos.x / oldScale - this.group.position[0] / oldScale,
                y: pos.y / oldScale - this.group.position[1] / oldScale
            };
            var newScale = Math.max(0.05, oldScale * scaleBy);

            var newPos = {
                x: -(mousePointTo.x - pos.x / newScale) * newScale,
                y: -(mousePointTo.y - pos.y / newScale) * newScale
            };

            var newAttrs = this._limitAttributes(_extends({}, newPos, { scale: newScale }));

            this.group.attr({
                position: [newPos.x, newPos.y],
                scale: [newAttrs.scale, newAttrs.scale]
            });

            this._option.scale = newAttrs.scale;
            this._option.x = newPos.x;
            this._option.y = newPos.y;

            return this;
        }
    }, {
        key: 'exportSimple',
        value: function exportSimple() {
            this.zr.painter.getRenderedCanvas({
                backgroundColor: "#fff"
            }).toBlob(function (blob) {
                var url = window.URL.createObjectURL(blob);
                window.open(url);
            }, 'image/png');
        }
    }, {
        key: 'export',
        value: function _export() {
            var _group$getBoundingRec = this.group.getBoundingRect(),
                x = _group$getBoundingRec.x,
                y = _group$getBoundingRec.y,
                width = _group$getBoundingRec.width,
                height = _group$getBoundingRec.height;

            var zr = _zrender2.default.init(document.createElement('div'), {
                width: width,
                height: height
            });
            var group = new _zrender2.default.Group();
            group.position = [0 - x, 0 - y];

            this.group.eachChild(function (child) {
                group.add(child);
            });

            zr.add(group);
            zr.refreshImmediately();

            return zr.painter.getRenderedCanvas({
                backgroundColor: "#fff"
            }).toBlob(function (blob) {
                var url = window.URL.createObjectURL(blob);
                window.open(url);
            }, 'image/png');
        }
    }]);

    return BImage;
}(_Init3.default);

exports.default = BImage;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    shape: {
        x: 0,
        y: 0,
        width: 4,
        height: 4
    },
    data: {
        type: 'editRect'
    },
    style: {
        fill: 'rgba(255, 255, 255,1)',
        stroke: '#CC3737',
        lineWidth: 2,
        strokeNoScale: true
    },
    zlevel: 3,
    draggable: true
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(76)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(7);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(193);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(10);
var createDesc = __webpack_require__(42);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(106).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(49);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(39);
var descriptor = __webpack_require__(42);
var setToStringTag = __webpack_require__(50);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(49);
var $iterCreate = __webpack_require__(99);
var setToStringTag = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(18);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(111).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(58);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(61)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(69);
var defined = __webpack_require__(27);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(27);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var invoke = __webpack_require__(139);
var html = __webpack_require__(96);
var cel = __webpack_require__(93);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(8);
var LIBRARY = __webpack_require__(34);
var $typed = __webpack_require__(77);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(43);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(37);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(7);
var toIndex = __webpack_require__(158);
var gOPN = __webpack_require__(40).f;
var dP = __webpack_require__(10).f;
var arrayFill = __webpack_require__(90);
var setToStringTag = __webpack_require__(50);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(22);
var LIBRARY = __webpack_require__(34);
var wksExt = __webpack_require__(159);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(49);
module.exports = __webpack_require__(22).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(33);
var step = __webpack_require__(142);
var Iterators = __webpack_require__(49);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(100)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 116 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(5);

var Element = __webpack_require__(165);

var BoundingRect = __webpack_require__(30);

/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/graphic/Group
 * @example
 *     var Group = require('zrender/container/Group');
 *     var Circle = require('zrender/graphic/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.add(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *         }
 *     }));
 *     zr.add(g);
 */

/**
 * @alias module:zrender/graphic/Group
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @extends module:zrender/mixin/Eventful
 */
var Group = function (opts) {
  opts = opts || {};
  Element.call(this, opts);

  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      this[key] = opts[key];
    }
  }

  this._children = [];
  this.__storage = null;
  this.__dirty = true;
};

Group.prototype = {
  constructor: Group,
  isGroup: true,

  /**
   * @type {string}
   */
  type: 'group',

  /**
   * 所有子孙元素是否响应鼠标事件
   * @name module:/zrender/container/Group#silent
   * @type {boolean}
   * @default false
   */
  silent: false,

  /**
   * @return {Array.<module:zrender/Element>}
   */
  children: function () {
    return this._children.slice();
  },

  /**
   * 获取指定 index 的儿子节点
   * @param  {number} idx
   * @return {module:zrender/Element}
   */
  childAt: function (idx) {
    return this._children[idx];
  },

  /**
   * 获取指定名字的儿子节点
   * @param  {string} name
   * @return {module:zrender/Element}
   */
  childOfName: function (name) {
    var children = this._children;

    for (var i = 0; i < children.length; i++) {
      if (children[i].name === name) {
        return children[i];
      }
    }
  },

  /**
   * @return {number}
   */
  childCount: function () {
    return this._children.length;
  },

  /**
   * 添加子节点到最后
   * @param {module:zrender/Element} child
   */
  add: function (child) {
    if (child && child !== this && child.parent !== this) {
      this._children.push(child);

      this._doAdd(child);
    }

    return this;
  },

  /**
   * 添加子节点在 nextSibling 之前
   * @param {module:zrender/Element} child
   * @param {module:zrender/Element} nextSibling
   */
  addBefore: function (child, nextSibling) {
    if (child && child !== this && child.parent !== this && nextSibling && nextSibling.parent === this) {
      var children = this._children;
      var idx = children.indexOf(nextSibling);

      if (idx >= 0) {
        children.splice(idx, 0, child);

        this._doAdd(child);
      }
    }

    return this;
  },
  _doAdd: function (child) {
    if (child.parent) {
      child.parent.remove(child);
    }

    child.parent = this;
    var storage = this.__storage;
    var zr = this.__zr;

    if (storage && storage !== child.__storage) {
      storage.addToStorage(child);

      if (child instanceof Group) {
        child.addChildrenToStorage(storage);
      }
    }

    zr && zr.refresh();
  },

  /**
   * 移除子节点
   * @param {module:zrender/Element} child
   */
  remove: function (child) {
    var zr = this.__zr;
    var storage = this.__storage;
    var children = this._children;
    var idx = zrUtil.indexOf(children, child);

    if (idx < 0) {
      return this;
    }

    children.splice(idx, 1);
    child.parent = null;

    if (storage) {
      storage.delFromStorage(child);

      if (child instanceof Group) {
        child.delChildrenFromStorage(storage);
      }
    }

    zr && zr.refresh();
    return this;
  },

  /**
   * 移除所有子节点
   */
  removeAll: function () {
    var children = this._children;
    var storage = this.__storage;
    var child;
    var i;

    for (i = 0; i < children.length; i++) {
      child = children[i];

      if (storage) {
        storage.delFromStorage(child);

        if (child instanceof Group) {
          child.delChildrenFromStorage(storage);
        }
      }

      child.parent = null;
    }

    children.length = 0;
    return this;
  },

  /**
   * 遍历所有子节点
   * @param  {Function} cb
   * @param  {}   context
   */
  eachChild: function (cb, context) {
    var children = this._children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      cb.call(context, child, i);
    }

    return this;
  },

  /**
   * 深度优先遍历所有子孙节点
   * @param  {Function} cb
   * @param  {}   context
   */
  traverse: function (cb, context) {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      cb.call(context, child);

      if (child.type === 'group') {
        child.traverse(cb, context);
      }
    }

    return this;
  },
  addChildrenToStorage: function (storage) {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      storage.addToStorage(child);

      if (child instanceof Group) {
        child.addChildrenToStorage(storage);
      }
    }
  },
  delChildrenFromStorage: function (storage) {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      storage.delFromStorage(child);

      if (child instanceof Group) {
        child.delChildrenFromStorage(storage);
      }
    }
  },
  dirty: function () {
    this.__dirty = true;
    this.__zr && this.__zr.refresh();
    return this;
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getBoundingRect: function (includeChildren) {
    // TODO Caching
    var rect = null;
    var tmpRect = new BoundingRect(0, 0, 0, 0);
    var children = includeChildren || this._children;
    var tmpMat = [];

    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      if (child.ignore || child.invisible) {
        continue;
      }

      var childRect = child.getBoundingRect();
      var transform = child.getLocalTransform(tmpMat); // TODO
      // The boundingRect cacluated by transforming original
      // rect may be bigger than the actual bundingRect when rotation
      // is used. (Consider a circle rotated aginst its center, where
      // the actual boundingRect should be the same as that not be
      // rotated.) But we can not find better approach to calculate
      // actual boundingRect yet, considering performance.

      if (transform) {
        tmpRect.copy(childRect);
        tmpRect.applyTransform(transform);
        rect = rect || tmpRect.clone();
        rect.union(tmpRect);
      } else {
        rect = rect || childRect.clone();
        rect.union(childRect);
      }
    }

    return rect || tmpRect;
  }
};
zrUtil.inherits(Group, Element);
var _default = Group;
module.exports = _default;

/***/ }),
/* 118 */
/***/ (function(module, exports) {

/**
 * @param {Array.<Object>} colorStops
 */
var Gradient = function (colorStops) {
  this.colorStops = colorStops || [];
};

Gradient.prototype = {
  constructor: Gradient,
  addColorStop: function (offset, color) {
    this.colorStops.push({
      offset: offset,
      color: color
    });
  }
};
var _default = Gradient;
module.exports = _default;

/***/ }),
/* 119 */
/***/ (function(module, exports) {

var Pattern = function (image, repeat) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {image: ...}`, where this constructor will not be called.
  this.image = image;
  this.repeat = repeat; // Can be cloned

  this.type = 'pattern';
};

Pattern.prototype.getCanvasPattern = function (ctx) {
  return ctx.createPattern(this.image, this.repeat || 'repeat');
};

var _default = Pattern;
module.exports = _default;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var fixShadow = __webpack_require__(173);

var _constant = __webpack_require__(83);

var ContextCachedBy = _constant.ContextCachedBy;
var STYLE_COMMON_PROPS = [['shadowBlur', 0], ['shadowOffsetX', 0], ['shadowOffsetY', 0], ['shadowColor', '#000'], ['lineCap', 'butt'], ['lineJoin', 'miter'], ['miterLimit', 10]]; // var SHADOW_PROPS = STYLE_COMMON_PROPS.slice(0, 4);
// var LINE_PROPS = STYLE_COMMON_PROPS.slice(4);

var Style = function (opts) {
  this.extendFrom(opts, false);
};

function createLinearGradient(ctx, obj, rect) {
  var x = obj.x == null ? 0 : obj.x;
  var x2 = obj.x2 == null ? 1 : obj.x2;
  var y = obj.y == null ? 0 : obj.y;
  var y2 = obj.y2 == null ? 0 : obj.y2;

  if (!obj.global) {
    x = x * rect.width + rect.x;
    x2 = x2 * rect.width + rect.x;
    y = y * rect.height + rect.y;
    y2 = y2 * rect.height + rect.y;
  } // Fix NaN when rect is Infinity


  x = isNaN(x) ? 0 : x;
  x2 = isNaN(x2) ? 1 : x2;
  y = isNaN(y) ? 0 : y;
  y2 = isNaN(y2) ? 0 : y2;
  var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
  return canvasGradient;
}

function createRadialGradient(ctx, obj, rect) {
  var width = rect.width;
  var height = rect.height;
  var min = Math.min(width, height);
  var x = obj.x == null ? 0.5 : obj.x;
  var y = obj.y == null ? 0.5 : obj.y;
  var r = obj.r == null ? 0.5 : obj.r;

  if (!obj.global) {
    x = x * width + rect.x;
    y = y * height + rect.y;
    r = r * min;
  }

  var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  return canvasGradient;
}

Style.prototype = {
  constructor: Style,

  /**
   * @type {string}
   */
  fill: '#000',

  /**
   * @type {string}
   */
  stroke: null,

  /**
   * @type {number}
   */
  opacity: 1,

  /**
   * @type {number}
   */
  fillOpacity: null,

  /**
   * @type {number}
   */
  strokeOpacity: null,

  /**
   * `true` is not supported.
   * `false`/`null`/`undefined` are the same.
   * `false` is used to remove lineDash in some
   * case that `null`/`undefined` can not be set.
   * (e.g., emphasis.lineStyle in echarts)
   * @type {Array.<number>|boolean}
   */
  lineDash: null,

  /**
   * @type {number}
   */
  lineDashOffset: 0,

  /**
   * @type {number}
   */
  shadowBlur: 0,

  /**
   * @type {number}
   */
  shadowOffsetX: 0,

  /**
   * @type {number}
   */
  shadowOffsetY: 0,

  /**
   * @type {number}
   */
  lineWidth: 1,

  /**
   * If stroke ignore scale
   * @type {Boolean}
   */
  strokeNoScale: false,
  // Bounding rect text configuration
  // Not affected by element transform

  /**
   * @type {string}
   */
  text: null,

  /**
   * If `fontSize` or `fontFamily` exists, `font` will be reset by
   * `fontSize`, `fontStyle`, `fontWeight`, `fontFamily`.
   * So do not visit it directly in upper application (like echarts),
   * but use `contain/text#makeFont` instead.
   * @type {string}
   */
  font: null,

  /**
   * The same as font. Use font please.
   * @deprecated
   * @type {string}
   */
  textFont: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontStyle: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontWeight: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * Should be 12 but not '12px'.
   * @type {number}
   */
  fontSize: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontFamily: null,

  /**
   * Reserved for special functinality, like 'hr'.
   * @type {string}
   */
  textTag: null,

  /**
   * @type {string}
   */
  textFill: '#000',

  /**
   * @type {string}
   */
  textStroke: null,

  /**
   * @type {number}
   */
  textWidth: null,

  /**
   * Only for textBackground.
   * @type {number}
   */
  textHeight: null,

  /**
   * textStroke may be set as some color as a default
   * value in upper applicaion, where the default value
   * of textStrokeWidth should be 0 to make sure that
   * user can choose to do not use text stroke.
   * @type {number}
   */
  textStrokeWidth: 0,

  /**
   * @type {number}
   */
  textLineHeight: null,

  /**
   * 'inside', 'left', 'right', 'top', 'bottom'
   * [x, y]
   * Based on x, y of rect.
   * @type {string|Array.<number>}
   * @default 'inside'
   */
  textPosition: 'inside',

  /**
   * If not specified, use the boundingRect of a `displayable`.
   * @type {Object}
   */
  textRect: null,

  /**
   * [x, y]
   * @type {Array.<number>}
   */
  textOffset: null,

  /**
   * @type {string}
   */
  textAlign: null,

  /**
   * @type {string}
   */
  textVerticalAlign: null,

  /**
   * @type {number}
   */
  textDistance: 5,

  /**
   * @type {string}
   */
  textShadowColor: 'transparent',

  /**
   * @type {number}
   */
  textShadowBlur: 0,

  /**
   * @type {number}
   */
  textShadowOffsetX: 0,

  /**
   * @type {number}
   */
  textShadowOffsetY: 0,

  /**
   * @type {string}
   */
  textBoxShadowColor: 'transparent',

  /**
   * @type {number}
   */
  textBoxShadowBlur: 0,

  /**
   * @type {number}
   */
  textBoxShadowOffsetX: 0,

  /**
   * @type {number}
   */
  textBoxShadowOffsetY: 0,

  /**
   * Whether transform text.
   * Only available in Path and Image element,
   * where the text is called as `RectText`.
   * @type {boolean}
   */
  transformText: false,

  /**
   * Text rotate around position of Path or Image.
   * The origin of the rotation can be specified by `textOrigin`.
   * Only available in Path and Image element,
   * where the text is called as `RectText`.
   */
  textRotation: 0,

  /**
   * Text origin of text rotation.
   * Useful in the case like label rotation of circular symbol.
   * Only available in Path and Image element, where the text is called
   * as `RectText` and the element is called as "host element".
   * The value can be:
   * + If specified as a coordinate like `[10, 40]`, it is the `[x, y]`
   * base on the left-top corner of the rect of its host element.
   * + If specified as a string `center`, it is the center of the rect of
   * its host element.
   * + By default, this origin is the `textPosition`.
   * @type {string|Array.<number>}
   */
  textOrigin: null,

  /**
   * @type {string}
   */
  textBackgroundColor: null,

  /**
   * @type {string}
   */
  textBorderColor: null,

  /**
   * @type {number}
   */
  textBorderWidth: 0,

  /**
   * @type {number}
   */
  textBorderRadius: 0,

  /**
   * Can be `2` or `[2, 4]` or `[2, 3, 4, 5]`
   * @type {number|Array.<number>}
   */
  textPadding: null,

  /**
   * Text styles for rich text.
   * @type {Object}
   */
  rich: null,

  /**
   * {outerWidth, outerHeight, ellipsis, placeholder}
   * @type {Object}
   */
  truncate: null,

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
   * @type {string}
   */
  blend: null,

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  bind: function (ctx, el, prevEl) {
    var style = this;
    var prevStyle = prevEl && prevEl.style; // If no prevStyle, it means first draw.
    // Only apply cache if the last time cachced by this function.

    var notCheckCache = !prevStyle || ctx.__attrCachedBy !== ContextCachedBy.STYLE_BIND;
    ctx.__attrCachedBy = ContextCachedBy.STYLE_BIND;

    for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
      var prop = STYLE_COMMON_PROPS[i];
      var styleName = prop[0];

      if (notCheckCache || style[styleName] !== prevStyle[styleName]) {
        // FIXME Invalid property value will cause style leak from previous element.
        ctx[styleName] = fixShadow(ctx, styleName, style[styleName] || prop[1]);
      }
    }

    if (notCheckCache || style.fill !== prevStyle.fill) {
      ctx.fillStyle = style.fill;
    }

    if (notCheckCache || style.stroke !== prevStyle.stroke) {
      ctx.strokeStyle = style.stroke;
    }

    if (notCheckCache || style.opacity !== prevStyle.opacity) {
      ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
    }

    if (notCheckCache || style.blend !== prevStyle.blend) {
      ctx.globalCompositeOperation = style.blend || 'source-over';
    }

    if (this.hasStroke()) {
      var lineWidth = style.lineWidth;
      ctx.lineWidth = lineWidth / (this.strokeNoScale && el && el.getLineScale ? el.getLineScale() : 1);
    }
  },
  hasFill: function () {
    var fill = this.fill;
    return fill != null && fill !== 'none';
  },
  hasStroke: function () {
    var stroke = this.stroke;
    return stroke != null && stroke !== 'none' && this.lineWidth > 0;
  },

  /**
   * Extend from other style
   * @param {zrender/graphic/Style} otherStyle
   * @param {boolean} overwrite true: overwrirte any way.
   *                            false: overwrite only when !target.hasOwnProperty
   *                            others: overwrite when property is not null/undefined.
   */
  extendFrom: function (otherStyle, overwrite) {
    if (otherStyle) {
      for (var name in otherStyle) {
        if (otherStyle.hasOwnProperty(name) && (overwrite === true || (overwrite === false ? !this.hasOwnProperty(name) : otherStyle[name] != null))) {
          this[name] = otherStyle[name];
        }
      }
    }
  },

  /**
   * Batch setting style with a given object
   * @param {Object|string} obj
   * @param {*} [obj]
   */
  set: function (obj, value) {
    if (typeof obj === 'string') {
      this[obj] = value;
    } else {
      this.extendFrom(obj, true);
    }
  },

  /**
   * Clone
   * @return {zrender/graphic/Style} [description]
   */
  clone: function () {
    var newStyle = new this.constructor();
    newStyle.extendFrom(this, true);
    return newStyle;
  },
  getGradient: function (ctx, obj, rect) {
    var method = obj.type === 'radial' ? createRadialGradient : createLinearGradient;
    var canvasGradient = method(ctx, obj, rect);
    var colorStops = obj.colorStops;

    for (var i = 0; i < colorStops.length; i++) {
      canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
    }

    return canvasGradient;
  }
};
var styleProto = Style.prototype;

for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
  var prop = STYLE_COMMON_PROPS[i];

  if (!(prop[0] in styleProto)) {
    styleProto[prop[0]] = prop[1];
  }
} // Provide for others


Style.getGradient = styleProto.getGradient;
var _default = Style;
module.exports = _default;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var LRU = __webpack_require__(169);

var globalImageCache = new LRU(50);
/**
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */

function findExistImage(newImageOrSrc) {
  if (typeof newImageOrSrc === 'string') {
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    return cachedImgObj && cachedImgObj.image;
  } else {
    return newImageOrSrc;
  }
}
/**
 * Caution: User should cache loaded images, but not just count on LRU.
 * Consider if required images more than LRU size, will dead loop occur?
 *
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @param {HTMLImageElement|HTMLCanvasElement|Canvas} image Existent image.
 * @param {module:zrender/Element} [hostEl] For calling `dirty`.
 * @param {Function} [cb] params: (image, cbPayload)
 * @param {Object} [cbPayload] Payload on cb calling.
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */


function createOrUpdateImage(newImageOrSrc, image, hostEl, cb, cbPayload) {
  if (!newImageOrSrc) {
    return image;
  } else if (typeof newImageOrSrc === 'string') {
    // Image should not be loaded repeatly.
    if (image && image.__zrImageSrc === newImageOrSrc || !hostEl) {
      return image;
    } // Only when there is no existent image or existent image src
    // is different, this method is responsible for load.


    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    var pendingWrap = {
      hostEl: hostEl,
      cb: cb,
      cbPayload: cbPayload
    };

    if (cachedImgObj) {
      image = cachedImgObj.image;
      !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
    } else {
      image = new Image();
      image.onload = image.onerror = imageOnLoad;
      globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
        image: image,
        pending: [pendingWrap]
      });
      image.src = image.__zrImageSrc = newImageOrSrc;
    }

    return image;
  } // newImageOrSrc is an HTMLImageElement or HTMLCanvasElement or Canvas
  else {
      return newImageOrSrc;
    }
}

function imageOnLoad() {
  var cachedImgObj = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;

  for (var i = 0; i < cachedImgObj.pending.length; i++) {
    var pendingWrap = cachedImgObj.pending[i];
    var cb = pendingWrap.cb;
    cb && cb(this, pendingWrap.cbPayload);
    pendingWrap.hostEl.dirty();
  }

  cachedImgObj.pending.length = 0;
}

function isImageReady(image) {
  return image && image.width && image.height;
}

exports.findExistImage = findExistImage;
exports.createOrUpdateImage = createOrUpdateImage;
exports.isImageReady = isImageReady;

/***/ }),
/* 122 */
/***/ (function(module, exports) {

var svgURI = 'http://www.w3.org/2000/svg';

function createElement(name) {
  return document.createElementNS(svgURI, name);
}

exports.createElement = createElement;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__(122);

var createElement = _core.createElement;

var PathProxy = __webpack_require__(52);

var BoundingRect = __webpack_require__(30);

var matrix = __webpack_require__(54);

var textContain = __webpack_require__(81);

var textHelper = __webpack_require__(84);

var Text = __webpack_require__(56);

// TODO
// 1. shadow
// 2. Image: sx, sy, sw, sh
var CMD = PathProxy.CMD;
var arrayJoin = Array.prototype.join;
var NONE = 'none';
var mathRound = Math.round;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;
var PI2 = Math.PI * 2;
var degree = 180 / PI;
var EPSILON = 1e-4;

function round4(val) {
  return mathRound(val * 1e4) / 1e4;
}

function isAroundZero(val) {
  return val < EPSILON && val > -EPSILON;
}

function pathHasFill(style, isText) {
  var fill = isText ? style.textFill : style.fill;
  return fill != null && fill !== NONE;
}

function pathHasStroke(style, isText) {
  var stroke = isText ? style.textStroke : style.stroke;
  return stroke != null && stroke !== NONE;
}

function setTransform(svgEl, m) {
  if (m) {
    attr(svgEl, 'transform', 'matrix(' + arrayJoin.call(m, ',') + ')');
  }
}

function attr(el, key, val) {
  if (!val || val.type !== 'linear' && val.type !== 'radial') {
    // Don't set attribute for gradient, since it need new dom nodes
    el.setAttribute(key, val);
  }
}

function attrXLink(el, key, val) {
  el.setAttributeNS('http://www.w3.org/1999/xlink', key, val);
}

function bindStyle(svgEl, style, isText, el) {
  if (pathHasFill(style, isText)) {
    var fill = isText ? style.textFill : style.fill;
    fill = fill === 'transparent' ? NONE : fill;
    attr(svgEl, 'fill', fill);
    attr(svgEl, 'fill-opacity', style.fillOpacity != null ? style.fillOpacity * style.opacity : style.opacity);
  } else {
    attr(svgEl, 'fill', NONE);
  }

  if (pathHasStroke(style, isText)) {
    var stroke = isText ? style.textStroke : style.stroke;
    stroke = stroke === 'transparent' ? NONE : stroke;
    attr(svgEl, 'stroke', stroke);
    var strokeWidth = isText ? style.textStrokeWidth : style.lineWidth;
    var strokeScale = !isText && style.strokeNoScale ? el.getLineScale() : 1;
    attr(svgEl, 'stroke-width', strokeWidth / strokeScale); // stroke then fill for text; fill then stroke for others

    attr(svgEl, 'paint-order', isText ? 'stroke' : 'fill');
    attr(svgEl, 'stroke-opacity', style.strokeOpacity != null ? style.strokeOpacity : style.opacity);
    var lineDash = style.lineDash;

    if (lineDash) {
      attr(svgEl, 'stroke-dasharray', style.lineDash.join(','));
      attr(svgEl, 'stroke-dashoffset', mathRound(style.lineDashOffset || 0));
    } else {
      attr(svgEl, 'stroke-dasharray', '');
    } // PENDING


    style.lineCap && attr(svgEl, 'stroke-linecap', style.lineCap);
    style.lineJoin && attr(svgEl, 'stroke-linejoin', style.lineJoin);
    style.miterLimit && attr(svgEl, 'stroke-miterlimit', style.miterLimit);
  } else {
    attr(svgEl, 'stroke', NONE);
  }
}
/***************************************************
 * PATH
 **************************************************/


function pathDataToString(path) {
  var str = [];
  var data = path.data;
  var dataLength = path.len();

  for (var i = 0; i < dataLength;) {
    var cmd = data[i++];
    var cmdStr = '';
    var nData = 0;

    switch (cmd) {
      case CMD.M:
        cmdStr = 'M';
        nData = 2;
        break;

      case CMD.L:
        cmdStr = 'L';
        nData = 2;
        break;

      case CMD.Q:
        cmdStr = 'Q';
        nData = 4;
        break;

      case CMD.C:
        cmdStr = 'C';
        nData = 6;
        break;

      case CMD.A:
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        var psi = data[i++];
        var clockwise = data[i++];
        var dThetaPositive = Math.abs(dTheta);
        var isCircle = isAroundZero(dThetaPositive - PI2) || (clockwise ? dTheta >= PI2 : -dTheta >= PI2); // Mapping to 0~2PI

        var unifiedTheta = dTheta > 0 ? dTheta % PI2 : dTheta % PI2 + PI2;
        var large = false;

        if (isCircle) {
          large = true;
        } else if (isAroundZero(dThetaPositive)) {
          large = false;
        } else {
          large = unifiedTheta >= PI === !!clockwise;
        }

        var x0 = round4(cx + rx * mathCos(theta));
        var y0 = round4(cy + ry * mathSin(theta)); // It will not draw if start point and end point are exactly the same
        // We need to shift the end point with a small value
        // FIXME A better way to draw circle ?

        if (isCircle) {
          if (clockwise) {
            dTheta = PI2 - 1e-4;
          } else {
            dTheta = -PI2 + 1e-4;
          }

          large = true;

          if (i === 9) {
            // Move to (x0, y0) only when CMD.A comes at the
            // first position of a shape.
            // For instance, when drawing a ring, CMD.A comes
            // after CMD.M, so it's unnecessary to move to
            // (x0, y0).
            str.push('M', x0, y0);
          }
        }

        var x = round4(cx + rx * mathCos(theta + dTheta));
        var y = round4(cy + ry * mathSin(theta + dTheta)); // FIXME Ellipse

        str.push('A', round4(rx), round4(ry), mathRound(psi * degree), +large, +clockwise, x, y);
        break;

      case CMD.Z:
        cmdStr = 'Z';
        break;

      case CMD.R:
        var x = round4(data[i++]);
        var y = round4(data[i++]);
        var w = round4(data[i++]);
        var h = round4(data[i++]);
        str.push('M', x, y, 'L', x + w, y, 'L', x + w, y + h, 'L', x, y + h, 'L', x, y);
        break;
    }

    cmdStr && str.push(cmdStr);

    for (var j = 0; j < nData; j++) {
      // PENDING With scale
      str.push(round4(data[i++]));
    }
  }

  return str.join(' ');
}

var svgPath = {};

svgPath.brush = function (el) {
  var style = el.style;
  var svgEl = el.__svgEl;

  if (!svgEl) {
    svgEl = createElement('path');
    el.__svgEl = svgEl;
  }

  if (!el.path) {
    el.createPathProxy();
  }

  var path = el.path;

  if (el.__dirtyPath) {
    path.beginPath();
    path.subPixelOptimize = false;
    el.buildPath(path, el.shape);
    el.__dirtyPath = false;
    var pathStr = pathDataToString(path);

    if (pathStr.indexOf('NaN') < 0) {
      // Ignore illegal path, which may happen such in out-of-range
      // data in Calendar series.
      attr(svgEl, 'd', pathStr);
    }
  }

  bindStyle(svgEl, style, false, el);
  setTransform(svgEl, el.transform);

  if (style.text != null) {
    svgTextDrawRectText(el, el.getBoundingRect());
  } else {
    removeOldTextNode(el);
  }
};
/***************************************************
 * IMAGE
 **************************************************/


var svgImage = {};

svgImage.brush = function (el) {
  var style = el.style;
  var image = style.image;

  if (image instanceof HTMLImageElement) {
    var src = image.src;
    image = src;
  }

  if (!image) {
    return;
  }

  var x = style.x || 0;
  var y = style.y || 0;
  var dw = style.width;
  var dh = style.height;
  var svgEl = el.__svgEl;

  if (!svgEl) {
    svgEl = createElement('image');
    el.__svgEl = svgEl;
  }

  if (image !== el.__imageSrc) {
    attrXLink(svgEl, 'href', image); // Caching image src

    el.__imageSrc = image;
  }

  attr(svgEl, 'width', dw);
  attr(svgEl, 'height', dh);
  attr(svgEl, 'x', x);
  attr(svgEl, 'y', y);
  setTransform(svgEl, el.transform);

  if (style.text != null) {
    svgTextDrawRectText(el, el.getBoundingRect());
  } else {
    removeOldTextNode(el);
  }
};
/***************************************************
 * TEXT
 **************************************************/


var svgText = {};

var _tmpTextHostRect = new BoundingRect();

var _tmpTextBoxPos = {};
var _tmpTextTransform = [];
var TEXT_ALIGN_TO_ANCHRO = {
  left: 'start',
  right: 'end',
  center: 'middle',
  middle: 'middle'
};
/**
 * @param {module:zrender/Element} el
 * @param {Object|boolean} [hostRect] {x, y, width, height}
 *        If set false, rect text is not used.
 */

var svgTextDrawRectText = function (el, hostRect) {
  var style = el.style;
  var elTransform = el.transform;
  var needTransformTextByHostEl = el instanceof Text || style.transformText;
  el.__dirty && textHelper.normalizeTextStyle(style, true);
  var text = style.text; // Convert to string

  text != null && (text += '');

  if (!textHelper.needDrawText(text, style)) {
    return;
  } // render empty text for svg if no text but need draw text.


  text == null && (text = ''); // Follow the setting in the canvas renderer, if not transform the
  // text, transform the hostRect, by which the text is located.

  if (!needTransformTextByHostEl && elTransform) {
    _tmpTextHostRect.copy(hostRect);

    _tmpTextHostRect.applyTransform(elTransform);

    hostRect = _tmpTextHostRect;
  }

  var textSvgEl = el.__textSvgEl;

  if (!textSvgEl) {
    textSvgEl = createElement('text');
    el.__textSvgEl = textSvgEl;
  } // style.font has been normalized by `normalizeTextStyle`.


  var textSvgElStyle = textSvgEl.style;
  var font = style.font || textContain.DEFAULT_FONT;
  var computedFont = textSvgEl.__computedFont;

  if (font !== textSvgEl.__styleFont) {
    textSvgElStyle.font = textSvgEl.__styleFont = font; // The computedFont might not be the orginal font if it is illegal font.

    computedFont = textSvgEl.__computedFont = textSvgElStyle.font;
  }

  var textPadding = style.textPadding;
  var textLineHeight = style.textLineHeight;
  var contentBlock = el.__textCotentBlock;

  if (!contentBlock || el.__dirtyText) {
    contentBlock = el.__textCotentBlock = textContain.parsePlainText(text, computedFont, textPadding, textLineHeight, style.truncate);
  }

  var outerHeight = contentBlock.outerHeight;
  var lineHeight = contentBlock.lineHeight;
  textHelper.getBoxPosition(_tmpTextBoxPos, el, style, hostRect);
  var baseX = _tmpTextBoxPos.baseX;
  var baseY = _tmpTextBoxPos.baseY;
  var textAlign = _tmpTextBoxPos.textAlign || 'left';
  var textVerticalAlign = _tmpTextBoxPos.textVerticalAlign;
  setTextTransform(textSvgEl, needTransformTextByHostEl, elTransform, style, hostRect, baseX, baseY);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var textX = baseX;
  var textY = boxY; // TODO needDrawBg

  if (textPadding) {
    textX = getTextXForPadding(baseX, textAlign, textPadding);
    textY += textPadding[0];
  } // `textBaseline` is set as 'middle'.


  textY += lineHeight / 2;
  bindStyle(textSvgEl, style, true, el); // FIXME
  // Add a <style> to reset all of the text font as inherit?
  // otherwise the outer <style> may set the unexpected style.
  // Font may affect position of each tspan elements

  var canCacheByTextString = contentBlock.canCacheByTextString;
  var tspanList = el.__tspanList || (el.__tspanList = []);
  var tspanOriginLen = tspanList.length; // Optimize for most cases, just compare text string to determine change.

  if (canCacheByTextString && el.__canCacheByTextString && el.__text === text) {
    if (el.__dirtyText && tspanOriginLen) {
      for (var idx = 0; idx < tspanOriginLen; ++idx) {
        updateTextLocation(tspanList[idx], textAlign, textX, textY + idx * lineHeight);
      }
    }
  } else {
    el.__text = text;
    el.__canCacheByTextString = canCacheByTextString;
    var textLines = contentBlock.lines;
    var nTextLines = textLines.length;
    var idx = 0;

    for (; idx < nTextLines; idx++) {
      // Using cached tspan elements
      var tspan = tspanList[idx];
      var singleLineText = textLines[idx];

      if (!tspan) {
        tspan = tspanList[idx] = createElement('tspan');
        textSvgEl.appendChild(tspan);
        tspan.appendChild(document.createTextNode(singleLineText));
      } else if (tspan.__zrText !== singleLineText) {
        tspan.innerHTML = '';
        tspan.appendChild(document.createTextNode(singleLineText));
      }

      updateTextLocation(tspan, textAlign, textX, textY + idx * lineHeight);
    } // Remove unused tspan elements


    if (tspanOriginLen > nTextLines) {
      for (; idx < tspanOriginLen; idx++) {
        textSvgEl.removeChild(tspanList[idx]);
      }

      tspanList.length = nTextLines;
    }
  }
};

function setTextTransform(textSvgEl, needTransformTextByHostEl, elTransform, style, hostRect, baseX, baseY) {
  matrix.identity(_tmpTextTransform);

  if (needTransformTextByHostEl && elTransform) {
    matrix.copy(_tmpTextTransform, elTransform);
  } // textRotation only apply in RectText.


  var textRotation = style.textRotation;

  if (hostRect && textRotation) {
    var origin = style.textOrigin;

    if (origin === 'center') {
      baseX = hostRect.width / 2 + hostRect.x;
      baseY = hostRect.height / 2 + hostRect.y;
    } else if (origin) {
      baseX = origin[0] + hostRect.x;
      baseY = origin[1] + hostRect.y;
    }

    _tmpTextTransform[4] -= baseX;
    _tmpTextTransform[5] -= baseY; // Positive: anticlockwise

    matrix.rotate(_tmpTextTransform, _tmpTextTransform, textRotation);
    _tmpTextTransform[4] += baseX;
    _tmpTextTransform[5] += baseY;
  } // See the definition in `Style.js#textOrigin`, the default
  // origin is from the result of `getBoxPosition`.


  setTransform(textSvgEl, _tmpTextTransform);
} // FIXME merge the same code with `helper/text.js#getTextXForPadding`;


function getTextXForPadding(x, textAlign, textPadding) {
  return textAlign === 'right' ? x - textPadding[1] : textAlign === 'center' ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
}

function updateTextLocation(tspan, textAlign, x, y) {
  // Consider different font display differently in vertial align, we always
  // set vertialAlign as 'middle', and use 'y' to locate text vertically.
  attr(tspan, 'dominant-baseline', 'middle');
  attr(tspan, 'text-anchor', TEXT_ALIGN_TO_ANCHRO[textAlign]);
  attr(tspan, 'x', x);
  attr(tspan, 'y', y);
}

function removeOldTextNode(el) {
  if (el && el.__textSvgEl) {
    // textSvgEl may has no parentNode if el has been removed temporary.
    if (el.__textSvgEl.parentNode) {
      el.__textSvgEl.parentNode.removeChild(el.__textSvgEl);
    }

    el.__textSvgEl = null;
    el.__tspanList = [];
    el.__text = null;
  }
}

svgText.drawRectText = svgTextDrawRectText;

svgText.brush = function (el) {
  var style = el.style;

  if (style.text != null) {
    svgTextDrawRectText(el, false);
  } else {
    removeOldTextNode(el);
  }
};

exports.path = svgPath;
exports.image = svgImage;
exports.text = svgText;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__(122);

var createElement = _core.createElement;

var zrUtil = __webpack_require__(5);

var Path = __webpack_require__(9);

var ZImage = __webpack_require__(55);

var ZText = __webpack_require__(56);

var _graphic = __webpack_require__(123);

var svgPath = _graphic.path;
var svgImage = _graphic.image;
var svgText = _graphic.text;

/**
 * @file Manages elements that can be defined in <defs> in SVG,
 *       e.g., gradients, clip path, etc.
 * @author Zhang Wenli
 */
var MARK_UNUSED = '0';
var MARK_USED = '1';
/**
 * Manages elements that can be defined in <defs> in SVG,
 * e.g., gradients, clip path, etc.
 *
 * @class
 * @param {number}          zrId      zrender instance id
 * @param {SVGElement}      svgRoot   root of SVG document
 * @param {string|string[]} tagNames  possible tag names
 * @param {string}          markLabel label name to make if the element
 *                                    is used
 */

function Definable(zrId, svgRoot, tagNames, markLabel, domName) {
  this._zrId = zrId;
  this._svgRoot = svgRoot;
  this._tagNames = typeof tagNames === 'string' ? [tagNames] : tagNames;
  this._markLabel = markLabel;
  this._domName = domName || '_dom';
  this.nextId = 0;
}

Definable.prototype.createElement = createElement;
/**
 * Get the <defs> tag for svgRoot; optionally creates one if not exists.
 *
 * @param {boolean} isForceCreating if need to create when not exists
 * @return {SVGDefsElement} SVG <defs> element, null if it doesn't
 * exist and isForceCreating is false
 */

Definable.prototype.getDefs = function (isForceCreating) {
  var svgRoot = this._svgRoot;

  var defs = this._svgRoot.getElementsByTagName('defs');

  if (defs.length === 0) {
    // Not exist
    if (isForceCreating) {
      defs = svgRoot.insertBefore(this.createElement('defs'), // Create new tag
      svgRoot.firstChild // Insert in the front of svg
      );

      if (!defs.contains) {
        // IE doesn't support contains method
        defs.contains = function (el) {
          var children = defs.children;

          if (!children) {
            return false;
          }

          for (var i = children.length - 1; i >= 0; --i) {
            if (children[i] === el) {
              return true;
            }
          }

          return false;
        };
      }

      return defs;
    } else {
      return null;
    }
  } else {
    return defs[0];
  }
};
/**
 * Update DOM element if necessary.
 *
 * @param {Object|string} element style element. e.g., for gradient,
 *                                it may be '#ccc' or {type: 'linear', ...}
 * @param {Function|undefined} onUpdate update callback
 */


Definable.prototype.update = function (element, onUpdate) {
  if (!element) {
    return;
  }

  var defs = this.getDefs(false);

  if (element[this._domName] && defs.contains(element[this._domName])) {
    // Update DOM
    if (typeof onUpdate === 'function') {
      onUpdate(element);
    }
  } else {
    // No previous dom, create new
    var dom = this.add(element);

    if (dom) {
      element[this._domName] = dom;
    }
  }
};
/**
 * Add gradient dom to defs
 *
 * @param {SVGElement} dom DOM to be added to <defs>
 */


Definable.prototype.addDom = function (dom) {
  var defs = this.getDefs(true);
  defs.appendChild(dom);
};
/**
 * Remove DOM of a given element.
 *
 * @param {SVGElement} element element to remove dom
 */


Definable.prototype.removeDom = function (element) {
  var defs = this.getDefs(false);

  if (defs && element[this._domName]) {
    defs.removeChild(element[this._domName]);
    element[this._domName] = null;
  }
};
/**
 * Get DOMs of this element.
 *
 * @return {HTMLDomElement} doms of this defineable elements in <defs>
 */


Definable.prototype.getDoms = function () {
  var defs = this.getDefs(false);

  if (!defs) {
    // No dom when defs is not defined
    return [];
  }

  var doms = [];
  zrUtil.each(this._tagNames, function (tagName) {
    var tags = defs.getElementsByTagName(tagName); // Note that tags is HTMLCollection, which is array-like
    // rather than real array.
    // So `doms.concat(tags)` add tags as one object.

    doms = doms.concat([].slice.call(tags));
  });
  return doms;
};
/**
 * Mark DOMs to be unused before painting, and clear unused ones at the end
 * of the painting.
 */


Definable.prototype.markAllUnused = function () {
  var doms = this.getDoms();
  var that = this;
  zrUtil.each(doms, function (dom) {
    dom[that._markLabel] = MARK_UNUSED;
  });
};
/**
 * Mark a single DOM to be used.
 *
 * @param {SVGElement} dom DOM to mark
 */


Definable.prototype.markUsed = function (dom) {
  if (dom) {
    dom[this._markLabel] = MARK_USED;
  }
};
/**
 * Remove unused DOMs defined in <defs>
 */


Definable.prototype.removeUnused = function () {
  var defs = this.getDefs(false);

  if (!defs) {
    // Nothing to remove
    return;
  }

  var doms = this.getDoms();
  var that = this;
  zrUtil.each(doms, function (dom) {
    if (dom[that._markLabel] !== MARK_USED) {
      // Remove gradient
      defs.removeChild(dom);
    }
  });
};
/**
 * Get SVG proxy.
 *
 * @param {Displayable} displayable displayable element
 * @return {Path|Image|Text} svg proxy of given element
 */


Definable.prototype.getSvgProxy = function (displayable) {
  if (displayable instanceof Path) {
    return svgPath;
  } else if (displayable instanceof ZImage) {
    return svgImage;
  } else if (displayable instanceof ZText) {
    return svgText;
  } else {
    return svgPath;
  }
};
/**
 * Get text SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element of text
 */


Definable.prototype.getTextSvgElement = function (displayable) {
  return displayable.__textSvgEl;
};
/**
 * Get SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element
 */


Definable.prototype.getSvgElement = function (displayable) {
  return displayable.__svgEl;
};

var _default = Definable;
module.exports = _default;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var guid = __webpack_require__(170);

var env = __webpack_require__(36);

var zrUtil = __webpack_require__(5);

var Handler = __webpack_require__(394);

var Storage = __webpack_require__(397);

var Painter = __webpack_require__(396);

var Animation = __webpack_require__(398);

var HandlerProxy = __webpack_require__(411);

/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var useVML = !env.canvasSupported;
var painterCtors = {
  canvas: Painter
};
var instances = {}; // ZRender实例map索引

/**
 * @type {string}
 */

var version = '4.2.0';
/**
 * Initializing a zrender instance
 * @param {HTMLElement} dom
 * @param {Object} [opts]
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
 * @return {module:zrender/ZRender}
 */

function init(dom, opts) {
  var zr = new ZRender(guid(), dom, opts);
  instances[zr.id] = zr;
  return zr;
}
/**
 * Dispose zrender instance
 * @param {module:zrender/ZRender} zr
 */


function dispose(zr) {
  if (zr) {
    zr.dispose();
  } else {
    for (var key in instances) {
      if (instances.hasOwnProperty(key)) {
        instances[key].dispose();
      }
    }

    instances = {};
  }

  return this;
}
/**
 * Get zrender instance by id
 * @param {string} id zrender instance id
 * @return {module:zrender/ZRender}
 */


function getInstance(id) {
  return instances[id];
}

function registerPainter(name, Ctor) {
  painterCtors[name] = Ctor;
}

function delInstance(id) {
  delete instances[id];
}
/**
 * @module zrender/ZRender
 */

/**
 * @constructor
 * @alias module:zrender/ZRender
 * @param {string} id
 * @param {HTMLElement} dom
 * @param {Object} opts
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number} [opts.height] Can be 'auto' (the same as null/undefined)
 */


var ZRender = function (id, dom, opts) {
  opts = opts || {};
  /**
   * @type {HTMLDomElement}
   */

  this.dom = dom;
  /**
   * @type {string}
   */

  this.id = id;
  var self = this;
  var storage = new Storage();
  var rendererType = opts.renderer; // TODO WebGL

  if (useVML) {
    if (!painterCtors.vml) {
      throw new Error('You need to require \'zrender/vml/vml\' to support IE8');
    }

    rendererType = 'vml';
  } else if (!rendererType || !painterCtors[rendererType]) {
    rendererType = 'canvas';
  }

  var painter = new painterCtors[rendererType](dom, storage, opts, id);
  this.storage = storage;
  this.painter = painter;
  var handerProxy = !env.node && !env.worker ? new HandlerProxy(painter.getViewportRoot(), painter.root) : null;
  this.handler = new Handler(storage, painter, handerProxy, painter.root);
  /**
   * @type {module:zrender/animation/Animation}
   */

  this.animation = new Animation({
    stage: {
      update: zrUtil.bind(this.flush, this)
    }
  });
  this.animation.start();
  /**
   * @type {boolean}
   * @private
   */

  this._needsRefresh; // 修改 storage.delFromStorage, 每次删除元素之前删除动画
  // FIXME 有点ugly

  var oldDelFromStorage = storage.delFromStorage;
  var oldAddToStorage = storage.addToStorage;

  storage.delFromStorage = function (el) {
    oldDelFromStorage.call(storage, el);
    el && el.removeSelfFromZr(self);
  };

  storage.addToStorage = function (el) {
    oldAddToStorage.call(storage, el);
    el.addSelfToZr(self);
  };
};

ZRender.prototype = {
  constructor: ZRender,

  /**
   * 获取实例唯一标识
   * @return {string}
   */
  getId: function () {
    return this.id;
  },

  /**
   * 添加元素
   * @param  {module:zrender/Element} el
   */
  add: function (el) {
    this.storage.addRoot(el);
    this._needsRefresh = true;
  },

  /**
   * 删除元素
   * @param  {module:zrender/Element} el
   */
  remove: function (el) {
    this.storage.delRoot(el);
    this._needsRefresh = true;
  },

  /**
   * Change configuration of layer
   * @param {string} zLevel
   * @param {Object} config
   * @param {string} [config.clearColor=0] Clear color
   * @param {string} [config.motionBlur=false] If enable motion blur
   * @param {number} [config.lastFrameAlpha=0.7] Motion blur factor. Larger value cause longer trailer
  */
  configLayer: function (zLevel, config) {
    if (this.painter.configLayer) {
      this.painter.configLayer(zLevel, config);
    }

    this._needsRefresh = true;
  },

  /**
   * Set background color
   * @param {string} backgroundColor
   */
  setBackgroundColor: function (backgroundColor) {
    if (this.painter.setBackgroundColor) {
      this.painter.setBackgroundColor(backgroundColor);
    }

    this._needsRefresh = true;
  },

  /**
   * Repaint the canvas immediately
   */
  refreshImmediately: function () {
    // var start = new Date();
    // Clear needsRefresh ahead to avoid something wrong happens in refresh
    // Or it will cause zrender refreshes again and again.
    this._needsRefresh = this._needsRefreshHover = false;
    this.painter.refresh(); // Avoid trigger zr.refresh in Element#beforeUpdate hook

    this._needsRefresh = this._needsRefreshHover = false; // var end = new Date();
    // var log = document.getElementById('log');
    // if (log) {
    //     log.innerHTML = log.innerHTML + '<br>' + (end - start);
    // }
  },

  /**
   * Mark and repaint the canvas in the next frame of browser
   */
  refresh: function () {
    this._needsRefresh = true;
  },

  /**
   * Perform all refresh
   */
  flush: function () {
    var triggerRendered;

    if (this._needsRefresh) {
      triggerRendered = true;
      this.refreshImmediately();
    }

    if (this._needsRefreshHover) {
      triggerRendered = true;
      this.refreshHoverImmediately();
    }

    triggerRendered && this.trigger('rendered');
  },

  /**
   * Add element to hover layer
   * @param  {module:zrender/Element} el
   * @param {Object} style
   */
  addHover: function (el, style) {
    if (this.painter.addHover) {
      var elMirror = this.painter.addHover(el, style);
      this.refreshHover();
      return elMirror;
    }
  },

  /**
   * Add element from hover layer
   * @param  {module:zrender/Element} el
   */
  removeHover: function (el) {
    if (this.painter.removeHover) {
      this.painter.removeHover(el);
      this.refreshHover();
    }
  },

  /**
   * Clear all hover elements in hover layer
   * @param  {module:zrender/Element} el
   */
  clearHover: function () {
    if (this.painter.clearHover) {
      this.painter.clearHover();
      this.refreshHover();
    }
  },

  /**
   * Refresh hover in next frame
   */
  refreshHover: function () {
    this._needsRefreshHover = true;
  },

  /**
   * Refresh hover immediately
   */
  refreshHoverImmediately: function () {
    this._needsRefreshHover = false;
    this.painter.refreshHover && this.painter.refreshHover();
  },

  /**
   * Resize the canvas.
   * Should be invoked when container size is changed
   * @param {Object} [opts]
   * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
   * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
   */
  resize: function (opts) {
    opts = opts || {};
    this.painter.resize(opts.width, opts.height);
    this.handler.resize();
  },

  /**
   * Stop and clear all animation immediately
   */
  clearAnimation: function () {
    this.animation.clear();
  },

  /**
   * Get container width
   */
  getWidth: function () {
    return this.painter.getWidth();
  },

  /**
   * Get container height
   */
  getHeight: function () {
    return this.painter.getHeight();
  },

  /**
   * Export the canvas as Base64 URL
   * @param {string} type
   * @param {string} [backgroundColor='#fff']
   * @return {string} Base64 URL
   */
  // toDataURL: function(type, backgroundColor) {
  //     return this.painter.getRenderedCanvas({
  //         backgroundColor: backgroundColor
  //     }).toDataURL(type);
  // },

  /**
   * Converting a path to image.
   * It has much better performance of drawing image rather than drawing a vector path.
   * @param {module:zrender/graphic/Path} e
   * @param {number} width
   * @param {number} height
   */
  pathToImage: function (e, dpr) {
    return this.painter.pathToImage(e, dpr);
  },

  /**
   * Set default cursor
   * @param {string} [cursorStyle='default'] 例如 crosshair
   */
  setCursorStyle: function (cursorStyle) {
    this.handler.setCursorStyle(cursorStyle);
  },

  /**
   * Find hovered element
   * @param {number} x
   * @param {number} y
   * @return {Object} {target, topTarget}
   */
  findHover: function (x, y) {
    return this.handler.findHover(x, y);
  },

  /**
   * Bind event
   *
   * @param {string} eventName Event name
   * @param {Function} eventHandler Handler function
   * @param {Object} [context] Context object
   */
  on: function (eventName, eventHandler, context) {
    this.handler.on(eventName, eventHandler, context);
  },

  /**
   * Unbind event
   * @param {string} eventName Event name
   * @param {Function} [eventHandler] Handler function
   */
  off: function (eventName, eventHandler) {
    this.handler.off(eventName, eventHandler);
  },

  /**
   * Trigger event manually
   *
   * @param {string} eventName Event name
   * @param {event=} event Event object
   */
  trigger: function (eventName, event) {
    this.handler.trigger(eventName, event);
  },

  /**
   * Clear all objects and the canvas.
   */
  clear: function () {
    this.storage.delRoot();
    this.painter.clear();
  },

  /**
   * Dispose self.
   */
  dispose: function () {
    this.animation.stop();
    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();
    this.animation = this.storage = this.painter = this.handler = null;
    delInstance(this.id);
  }
};
exports.version = version;
exports.init = init;
exports.dispose = dispose;
exports.getInstance = getInstance;
exports.registerPainter = registerPainter;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zrender = __webpack_require__(79);

var _zrender2 = _interopRequireDefault(_zrender);

var _utils = __webpack_require__(57);

var _Tools = __webpack_require__(127);

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var zr = void 0;

var Init = function () {
    function Init(opts, obj) {
        _classCallCheck(this, Init);

        if (opts) {
            this.zr = _zrender2.default.init(document.getElementById(opts.id));
            zr = this.zr;
            if (opts && opts.imgUrl) {
                this.imgUrl = opts.imgUrl;
            } else {
                new Error('请填入imgUrl属性,仅支持http或者https');
            }

            this._option = opts;
        } else {
            this.zr = zr;
            this._option = obj;
        }

        this.zr.dom.oncontextmenu = function () {
            return false;
        };
        this.ctx = {};
        this.ctx.canvasWidth = this.zr.getWidth();
        this.ctx.canvasHeight = this.zr.getHeight();
        this._zrClick = this._zrClick;
        this._zrMouseMove = this._zrMouseMove;
        this._zrMouseDown = this._zrMouseDown;
        this._zrMouseUp = this._zrMouseUp;
    }

    _createClass(Init, [{
        key: '_bindEvent',
        value: function _bindEvent() {
            this.zr.on('click', this._zrClick, this);
            this.zr.on('mousemove', this._zrMouseMove, this);
            this.zr.on('mousedown', this._zrMouseDown, this);
            this.zr.on('mouseup', this._zrMouseUp, this);
            this.zr.on('dblclick', this._zrDBClick, this);
        }
    }, {
        key: '_zrClick',
        value: function _zrClick() {}
    }, {
        key: '_zrMouseMove',
        value: function _zrMouseMove() {}
    }, {
        key: '_zrMouseDown',
        value: function _zrMouseDown() {}
    }, {
        key: '_zrMouseUp',
        value: function _zrMouseUp() {}
    }, {
        key: '_toGlobal',
        value: function _toGlobal(points, shape) {
            var newPoints = _zrender2.default.util.clone(points);

            var array = [];
            newPoints.forEach(function (item) {
                var x = void 0;
                x = shape.transformCoordToGlobal(item[0], item[1]);
                array.push(x);
            });

            return array;
        }
    }, {
        key: '_toGlobalSave',
        value: function _toGlobalSave(points, shape) {
            var _this = this;

            var newPoints = _zrender2.default.util.clone(points);
            var array = [];
            newPoints.forEach(function (item) {
                var x = void 0,
                    scale = _this.group.scale[0];
                if (scale === 1) {
                    x = shape.transformCoordToGlobal(item[0], item[1]);
                } else {
                    x = shape.transformCoordToGlobal(item[0], item[1]);
                    x = [x[0] / scale, x[1] / scale];
                }
                array.push(x);
            });
            return array;
        }
    }, {
        key: '_toLocal',
        value: function _toLocal(points, shape) {
            var _this2 = this;

            var newPoints = _zrender2.default.util.clone(points);
            var array = [];
            newPoints.forEach(function (item) {
                var x = void 0,
                    scale = _this2.group.scale[0];
                x = shape.transformCoordToLocal(item[0], item[1]);
                array.push(x);
            });
            return array;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.group && this.group.removeAll();
            this.dispose();
            this.zr.clear();
            this.reset();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.zr = null;
            this.image = null;
            this.group = null;
            this.polygon = null;
        }
    }, {
        key: 'disposeMove',
        value: function disposeMove() {
            this.zr.off('mousedown', this._zrMouseDown);
            this.zr.off('mousemove', this._zrMouseMove);
            this.zr.off('click', this._zrClick);
        }
    }, {
        key: 'close',
        value: function close() {}
    }, {
        key: 'dispose',
        value: function dispose() {
            this.zr.off('click', this._zrClick);
            this.zr.off('mousemove', this._zrMouseMove);
            this.zr.off('mousedown', this._zrMouseDown);
            this.zr.off('mouseup', this._zrMouseUp);
            this.zr.off('dblclick', this._zrDBClick);
        }
    }]);

    return Init;
}();

exports.default = Init;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tools = function () {
    function Tools(opts) {
        _classCallCheck(this, Tools);
    }

    _createClass(Tools, [{
        key: "create",
        value: function create() {}
    }]);

    return Tools;
}();

exports.default = Tools;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: [],
    onlyShow: true,
    style: {
        default: {
            fill: 'rgba(24,151,117,0.05)',

            stroke: '#189775',

            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true
        },

        selected: {
            fill: 'rgba(245,69,69,0.15)',
            stroke: '#CC3737',
            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true
        },

        hover: {
            fill: 'rgba(24,151,117,0.05)',
            stroke: '#189775',
            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true
        }
    },
    edit: {
        dragBtnLimit: 10
    },
    event: {
        onMouseMove: function onMouseMove() {},
        onMouseOver: function onMouseOver() {},
        onMouseOut: function onMouseOut() {},
        onComplete: function onComplete() {},
        select: function select() {},
        unSelect: function unSelect() {}
    }
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(7);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(38);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(59);
var toLength = __webpack_require__(7);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(12);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(139);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(10).f;
var create = __webpack_require__(39);
var redefineAll = __webpack_require__(43);
var ctx = __webpack_require__(23);
var anInstance = __webpack_require__(37);
var forOf = __webpack_require__(38);
var $iterDefine = __webpack_require__(100);
var step = __webpack_require__(142);
var setSpecies = __webpack_require__(44);
var DESCRIPTORS = __webpack_require__(8);
var fastKey = __webpack_require__(35).fastKey;
var validate = __webpack_require__(47);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(131);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(43);
var getWeak = __webpack_require__(35).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(37);
var forOf = __webpack_require__(38);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(16);
var validate = __webpack_require__(47);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(68);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(7);
var ctx = __webpack_require__(23);
var IS_CONCAT_SPREADABLE = __webpack_require__(6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(93)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 139 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(102);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 145 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(8);
var getKeys = __webpack_require__(41);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(60);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(59);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(41);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(40).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(65)(false);
var IE_PROTO = __webpack_require__(107)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(8);
var getKeys = __webpack_require__(41);
var toIObject = __webpack_require__(19);
var isEnum = __webpack_require__(60).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(40);
var gOPS = __webpack_require__(72);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(51).trim;

module.exports = 1 / $parseFloat(__webpack_require__(110) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(51).trim;
var ws = __webpack_require__(110);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(104);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(7);
var repeat = __webpack_require__(109);
var defined = __webpack_require__(27);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(7);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(47);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(66)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(105);
__webpack_require__(0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(8) && /./g.flags != 'g') __webpack_require__(10).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(58)
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(134);
var validate = __webpack_require__(47);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(66)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(14);
var meta = __webpack_require__(35);
var assign = __webpack_require__(146);
var weak = __webpack_require__(136);
var isObject = __webpack_require__(4);
var validate = __webpack_require__(47);
var NATIVE_WEAK_MAP = __webpack_require__(47);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(66)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var guid = __webpack_require__(170);

var Eventful = __webpack_require__(85);

var Transformable = __webpack_require__(431);

var Animatable = __webpack_require__(429);

var zrUtil = __webpack_require__(5);

/**
 * @alias module:zrender/Element
 * @constructor
 * @extends {module:zrender/mixin/Animatable}
 * @extends {module:zrender/mixin/Transformable}
 * @extends {module:zrender/mixin/Eventful}
 */
var Element = function (opts) {
  // jshint ignore:line
  Transformable.call(this, opts);
  Eventful.call(this, opts);
  Animatable.call(this, opts);
  /**
   * 画布元素ID
   * @type {string}
   */

  this.id = opts.id || guid();
};

Element.prototype = {
  /**
   * 元素类型
   * Element type
   * @type {string}
   */
  type: 'element',

  /**
   * 元素名字
   * Element name
   * @type {string}
   */
  name: '',

  /**
   * ZRender 实例对象，会在 element 添加到 zrender 实例中后自动赋值
   * ZRender instance will be assigned when element is associated with zrender
   * @name module:/zrender/Element#__zr
   * @type {module:zrender/ZRender}
   */
  __zr: null,

  /**
   * 图形是否忽略，为true时忽略图形的绘制以及事件触发
   * If ignore drawing and events of the element object
   * @name module:/zrender/Element#ignore
   * @type {boolean}
   * @default false
   */
  ignore: false,

  /**
   * 用于裁剪的路径(shape)，所有 Group 内的路径在绘制时都会被这个路径裁剪
   * 该路径会继承被裁减对象的变换
   * @type {module:zrender/graphic/Path}
   * @see http://www.w3.org/TR/2dcontext/#clipping-region
   * @readOnly
   */
  clipPath: null,

  /**
   * 是否是 Group
   * @type {boolean}
   */
  isGroup: false,

  /**
   * Drift element
   * @param  {number} dx dx on the global space
   * @param  {number} dy dy on the global space
   */
  drift: function (dx, dy) {
    switch (this.draggable) {
      case 'horizontal':
        dy = 0;
        break;

      case 'vertical':
        dx = 0;
        break;
    }

    var m = this.transform;

    if (!m) {
      m = this.transform = [1, 0, 0, 1, 0, 0];
    }

    m[4] += dx;
    m[5] += dy;
    this.decomposeTransform();
    this.dirty(false);
  },

  /**
   * Hook before update
   */
  beforeUpdate: function () {},

  /**
   * Hook after update
   */
  afterUpdate: function () {},

  /**
   * Update each frame
   */
  update: function () {
    this.updateTransform();
  },

  /**
   * @param  {Function} cb
   * @param  {}   context
   */
  traverse: function (cb, context) {},

  /**
   * @protected
   */
  attrKV: function (key, value) {
    if (key === 'position' || key === 'scale' || key === 'origin') {
      // Copy the array
      if (value) {
        var target = this[key];

        if (!target) {
          target = this[key] = [];
        }

        target[0] = value[0];
        target[1] = value[1];
      }
    } else {
      this[key] = value;
    }
  },

  /**
   * Hide the element
   */
  hide: function () {
    this.ignore = true;
    this.__zr && this.__zr.refresh();
  },

  /**
   * Show the element
   */
  show: function () {
    this.ignore = false;
    this.__zr && this.__zr.refresh();
  },

  /**
   * @param {string|Object} key
   * @param {*} value
   */
  attr: function (key, value) {
    if (typeof key === 'string') {
      this.attrKV(key, value);
    } else if (zrUtil.isObject(key)) {
      for (var name in key) {
        if (key.hasOwnProperty(name)) {
          this.attrKV(name, key[name]);
        }
      }
    }

    this.dirty(false);
    return this;
  },

  /**
   * @param {module:zrender/graphic/Path} clipPath
   */
  setClipPath: function (clipPath) {
    var zr = this.__zr;

    if (zr) {
      clipPath.addSelfToZr(zr);
    } // Remove previous clip path


    if (this.clipPath && this.clipPath !== clipPath) {
      this.removeClipPath();
    }

    this.clipPath = clipPath;
    clipPath.__zr = zr;
    clipPath.__clipTarget = this;
    this.dirty(false);
  },

  /**
   */
  removeClipPath: function () {
    var clipPath = this.clipPath;

    if (clipPath) {
      if (clipPath.__zr) {
        clipPath.removeSelfFromZr(clipPath.__zr);
      }

      clipPath.__zr = null;
      clipPath.__clipTarget = null;
      this.clipPath = null;
      this.dirty(false);
    }
  },

  /**
   * Add self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   * @param {module:zrender/ZRender} zr
   */
  addSelfToZr: function (zr) {
    this.__zr = zr; // 添加动画

    var animators = this.animators;

    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.addAnimator(animators[i]);
      }
    }

    if (this.clipPath) {
      this.clipPath.addSelfToZr(zr);
    }
  },

  /**
   * Remove self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   * @param {module:zrender/ZRender} zr
   */
  removeSelfFromZr: function (zr) {
    this.__zr = null; // 移除动画

    var animators = this.animators;

    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.removeAnimator(animators[i]);
      }
    }

    if (this.clipPath) {
      this.clipPath.removeSelfFromZr(zr);
    }
  }
};
zrUtil.mixin(Element, Animatable);
zrUtil.mixin(Element, Transformable);
zrUtil.mixin(Element, Eventful);
var _default = Element;
module.exports = _default;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var Clip = __webpack_require__(399);

var color = __webpack_require__(86);

var _util = __webpack_require__(5);

var isArrayLike = _util.isArrayLike;

/**
 * @module echarts/animation/Animator
 */
var arraySlice = Array.prototype.slice;

function defaultGetter(target, key) {
  return target[key];
}

function defaultSetter(target, key, value) {
  target[key] = value;
}
/**
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} percent
 * @return {number}
 */


function interpolateNumber(p0, p1, percent) {
  return (p1 - p0) * percent + p0;
}
/**
 * @param  {string} p0
 * @param  {string} p1
 * @param  {number} percent
 * @return {string}
 */


function interpolateString(p0, p1, percent) {
  return percent > 0.5 ? p1 : p0;
}
/**
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {number} percent
 * @param  {Array} out
 * @param  {number} arrDim
 */


function interpolateArray(p0, p1, percent, out, arrDim) {
  var len = p0.length;

  if (arrDim === 1) {
    for (var i = 0; i < len; i++) {
      out[i] = interpolateNumber(p0[i], p1[i], percent);
    }
  } else {
    var len2 = len && p0[0].length;

    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len2; j++) {
        out[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent);
      }
    }
  }
} // arr0 is source array, arr1 is target array.
// Do some preprocess to avoid error happened when interpolating from arr0 to arr1


function fillArr(arr0, arr1, arrDim) {
  var arr0Len = arr0.length;
  var arr1Len = arr1.length;

  if (arr0Len !== arr1Len) {
    // FIXME Not work for TypedArray
    var isPreviousLarger = arr0Len > arr1Len;

    if (isPreviousLarger) {
      // Cut the previous
      arr0.length = arr1Len;
    } else {
      // Fill the previous
      for (var i = arr0Len; i < arr1Len; i++) {
        arr0.push(arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i]));
      }
    }
  } // Handling NaN value


  var len2 = arr0[0] && arr0[0].length;

  for (var i = 0; i < arr0.length; i++) {
    if (arrDim === 1) {
      if (isNaN(arr0[i])) {
        arr0[i] = arr1[i];
      }
    } else {
      for (var j = 0; j < len2; j++) {
        if (isNaN(arr0[i][j])) {
          arr0[i][j] = arr1[i][j];
        }
      }
    }
  }
}
/**
 * @param  {Array} arr0
 * @param  {Array} arr1
 * @param  {number} arrDim
 * @return {boolean}
 */


function isArraySame(arr0, arr1, arrDim) {
  if (arr0 === arr1) {
    return true;
  }

  var len = arr0.length;

  if (len !== arr1.length) {
    return false;
  }

  if (arrDim === 1) {
    for (var i = 0; i < len; i++) {
      if (arr0[i] !== arr1[i]) {
        return false;
      }
    }
  } else {
    var len2 = arr0[0].length;

    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len2; j++) {
        if (arr0[i][j] !== arr1[i][j]) {
          return false;
        }
      }
    }
  }

  return true;
}
/**
 * Catmull Rom interpolate array
 * @param  {Array} p0
 * @param  {Array} p1
 * @param  {Array} p2
 * @param  {Array} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @param  {Array} out
 * @param  {number} arrDim
 */


function catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
  var len = p0.length;

  if (arrDim === 1) {
    for (var i = 0; i < len; i++) {
      out[i] = catmullRomInterpolate(p0[i], p1[i], p2[i], p3[i], t, t2, t3);
    }
  } else {
    var len2 = p0[0].length;

    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len2; j++) {
        out[i][j] = catmullRomInterpolate(p0[i][j], p1[i][j], p2[i][j], p3[i][j], t, t2, t3);
      }
    }
  }
}
/**
 * Catmull Rom interpolate number
 * @param  {number} p0
 * @param  {number} p1
 * @param  {number} p2
 * @param  {number} p3
 * @param  {number} t
 * @param  {number} t2
 * @param  {number} t3
 * @return {number}
 */


function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
  var v0 = (p2 - p0) * 0.5;
  var v1 = (p3 - p1) * 0.5;
  return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

function cloneValue(value) {
  if (isArrayLike(value)) {
    var len = value.length;

    if (isArrayLike(value[0])) {
      var ret = [];

      for (var i = 0; i < len; i++) {
        ret.push(arraySlice.call(value[i]));
      }

      return ret;
    }

    return arraySlice.call(value);
  }

  return value;
}

function rgba2String(rgba) {
  rgba[0] = Math.floor(rgba[0]);
  rgba[1] = Math.floor(rgba[1]);
  rgba[2] = Math.floor(rgba[2]);
  return 'rgba(' + rgba.join(',') + ')';
}

function getArrayDim(keyframes) {
  var lastValue = keyframes[keyframes.length - 1].value;
  return isArrayLike(lastValue && lastValue[0]) ? 2 : 1;
}

function createTrackClip(animator, easing, oneTrackDone, keyframes, propName, forceAnimate) {
  var getter = animator._getter;
  var setter = animator._setter;
  var useSpline = easing === 'spline';
  var trackLen = keyframes.length;

  if (!trackLen) {
    return;
  } // Guess data type


  var firstVal = keyframes[0].value;
  var isValueArray = isArrayLike(firstVal);
  var isValueColor = false;
  var isValueString = false; // For vertices morphing

  var arrDim = isValueArray ? getArrayDim(keyframes) : 0;
  var trackMaxTime; // Sort keyframe as ascending

  keyframes.sort(function (a, b) {
    return a.time - b.time;
  });
  trackMaxTime = keyframes[trackLen - 1].time; // Percents of each keyframe

  var kfPercents = []; // Value of each keyframe

  var kfValues = [];
  var prevValue = keyframes[0].value;
  var isAllValueEqual = true;

  for (var i = 0; i < trackLen; i++) {
    kfPercents.push(keyframes[i].time / trackMaxTime); // Assume value is a color when it is a string

    var value = keyframes[i].value; // Check if value is equal, deep check if value is array

    if (!(isValueArray && isArraySame(value, prevValue, arrDim) || !isValueArray && value === prevValue)) {
      isAllValueEqual = false;
    }

    prevValue = value; // Try converting a string to a color array

    if (typeof value === 'string') {
      var colorArray = color.parse(value);

      if (colorArray) {
        value = colorArray;
        isValueColor = true;
      } else {
        isValueString = true;
      }
    }

    kfValues.push(value);
  }

  if (!forceAnimate && isAllValueEqual) {
    return;
  }

  var lastValue = kfValues[trackLen - 1]; // Polyfill array and NaN value

  for (var i = 0; i < trackLen - 1; i++) {
    if (isValueArray) {
      fillArr(kfValues[i], lastValue, arrDim);
    } else {
      if (isNaN(kfValues[i]) && !isNaN(lastValue) && !isValueString && !isValueColor) {
        kfValues[i] = lastValue;
      }
    }
  }

  isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim); // Cache the key of last frame to speed up when
  // animation playback is sequency

  var lastFrame = 0;
  var lastFramePercent = 0;
  var start;
  var w;
  var p0;
  var p1;
  var p2;
  var p3;

  if (isValueColor) {
    var rgba = [0, 0, 0, 0];
  }

  var onframe = function (target, percent) {
    // Find the range keyframes
    // kf1-----kf2---------current--------kf3
    // find kf2 and kf3 and do interpolation
    var frame; // In the easing function like elasticOut, percent may less than 0

    if (percent < 0) {
      frame = 0;
    } else if (percent < lastFramePercent) {
      // Start from next key
      // PENDING start from lastFrame ?
      start = Math.min(lastFrame + 1, trackLen - 1);

      for (frame = start; frame >= 0; frame--) {
        if (kfPercents[frame] <= percent) {
          break;
        }
      } // PENDING really need to do this ?


      frame = Math.min(frame, trackLen - 2);
    } else {
      for (frame = lastFrame; frame < trackLen; frame++) {
        if (kfPercents[frame] > percent) {
          break;
        }
      }

      frame = Math.min(frame - 1, trackLen - 2);
    }

    lastFrame = frame;
    lastFramePercent = percent;
    var range = kfPercents[frame + 1] - kfPercents[frame];

    if (range === 0) {
      return;
    } else {
      w = (percent - kfPercents[frame]) / range;
    }

    if (useSpline) {
      p1 = kfValues[frame];
      p0 = kfValues[frame === 0 ? frame : frame - 1];
      p2 = kfValues[frame > trackLen - 2 ? trackLen - 1 : frame + 1];
      p3 = kfValues[frame > trackLen - 3 ? trackLen - 1 : frame + 2];

      if (isValueArray) {
        catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, getter(target, propName), arrDim);
      } else {
        var value;

        if (isValueColor) {
          value = catmullRomInterpolateArray(p0, p1, p2, p3, w, w * w, w * w * w, rgba, 1);
          value = rgba2String(rgba);
        } else if (isValueString) {
          // String is step(0.5)
          return interpolateString(p1, p2, w);
        } else {
          value = catmullRomInterpolate(p0, p1, p2, p3, w, w * w, w * w * w);
        }

        setter(target, propName, value);
      }
    } else {
      if (isValueArray) {
        interpolateArray(kfValues[frame], kfValues[frame + 1], w, getter(target, propName), arrDim);
      } else {
        var value;

        if (isValueColor) {
          interpolateArray(kfValues[frame], kfValues[frame + 1], w, rgba, 1);
          value = rgba2String(rgba);
        } else if (isValueString) {
          // String is step(0.5)
          return interpolateString(kfValues[frame], kfValues[frame + 1], w);
        } else {
          value = interpolateNumber(kfValues[frame], kfValues[frame + 1], w);
        }

        setter(target, propName, value);
      }
    }
  };

  var clip = new Clip({
    target: animator._target,
    life: trackMaxTime,
    loop: animator._loop,
    delay: animator._delay,
    onframe: onframe,
    ondestroy: oneTrackDone
  });

  if (easing && easing !== 'spline') {
    clip.easing = easing;
  }

  return clip;
}
/**
 * @alias module:zrender/animation/Animator
 * @constructor
 * @param {Object} target
 * @param {boolean} loop
 * @param {Function} getter
 * @param {Function} setter
 */


var Animator = function (target, loop, getter, setter) {
  this._tracks = {};
  this._target = target;
  this._loop = loop || false;
  this._getter = getter || defaultGetter;
  this._setter = setter || defaultSetter;
  this._clipCount = 0;
  this._delay = 0;
  this._doneList = [];
  this._onframeList = [];
  this._clipList = [];
};

Animator.prototype = {
  /**
   * 设置动画关键帧
   * @param  {number} time 关键帧时间，单位是ms
   * @param  {Object} props 关键帧的属性值，key-value表示
   * @return {module:zrender/animation/Animator}
   */
  when: function (time
  /* ms */
  , props) {
    var tracks = this._tracks;

    for (var propName in props) {
      if (!props.hasOwnProperty(propName)) {
        continue;
      }

      if (!tracks[propName]) {
        tracks[propName] = []; // Invalid value

        var value = this._getter(this._target, propName);

        if (value == null) {
          // zrLog('Invalid property ' + propName);
          continue;
        } // If time is 0
        //  Then props is given initialize value
        // Else
        //  Initialize value from current prop value


        if (time !== 0) {
          tracks[propName].push({
            time: 0,
            value: cloneValue(value)
          });
        }
      }

      tracks[propName].push({
        time: time,
        value: props[propName]
      });
    }

    return this;
  },

  /**
   * 添加动画每一帧的回调函数
   * @param  {Function} callback
   * @return {module:zrender/animation/Animator}
   */
  during: function (callback) {
    this._onframeList.push(callback);

    return this;
  },
  pause: function () {
    for (var i = 0; i < this._clipList.length; i++) {
      this._clipList[i].pause();
    }

    this._paused = true;
  },
  resume: function () {
    for (var i = 0; i < this._clipList.length; i++) {
      this._clipList[i].resume();
    }

    this._paused = false;
  },
  isPaused: function () {
    return !!this._paused;
  },
  _doneCallback: function () {
    // Clear all tracks
    this._tracks = {}; // Clear all clips

    this._clipList.length = 0;
    var doneList = this._doneList;
    var len = doneList.length;

    for (var i = 0; i < len; i++) {
      doneList[i].call(this);
    }
  },

  /**
   * 开始执行动画
   * @param  {string|Function} [easing]
   *         动画缓动函数，详见{@link module:zrender/animation/easing}
   * @param  {boolean} forceAnimate
   * @return {module:zrender/animation/Animator}
   */
  start: function (easing, forceAnimate) {
    var self = this;
    var clipCount = 0;

    var oneTrackDone = function () {
      clipCount--;

      if (!clipCount) {
        self._doneCallback();
      }
    };

    var lastClip;

    for (var propName in this._tracks) {
      if (!this._tracks.hasOwnProperty(propName)) {
        continue;
      }

      var clip = createTrackClip(this, easing, oneTrackDone, this._tracks[propName], propName, forceAnimate);

      if (clip) {
        this._clipList.push(clip);

        clipCount++; // If start after added to animation

        if (this.animation) {
          this.animation.addClip(clip);
        }

        lastClip = clip;
      }
    } // Add during callback on the last clip


    if (lastClip) {
      var oldOnFrame = lastClip.onframe;

      lastClip.onframe = function (target, percent) {
        oldOnFrame(target, percent);

        for (var i = 0; i < self._onframeList.length; i++) {
          self._onframeList[i](target, percent);
        }
      };
    } // This optimization will help the case that in the upper application
    // the view may be refreshed frequently, where animation will be
    // called repeatly but nothing changed.


    if (!clipCount) {
      this._doneCallback();
    }

    return this;
  },

  /**
   * 停止动画
   * @param {boolean} forwardToLast If move to last frame before stop
   */
  stop: function (forwardToLast) {
    var clipList = this._clipList;
    var animation = this.animation;

    for (var i = 0; i < clipList.length; i++) {
      var clip = clipList[i];

      if (forwardToLast) {
        // Move to last frame before stop
        clip.onframe(this._target, 1);
      }

      animation && animation.removeClip(clip);
    }

    clipList.length = 0;
  },

  /**
   * 设置动画延迟开始的时间
   * @param  {number} time 单位ms
   * @return {module:zrender/animation/Animator}
   */
  delay: function (time) {
    this._delay = time;
    return this;
  },

  /**
   * 添加动画结束的回调
   * @param  {Function} cb
   * @return {module:zrender/animation/Animator}
   */
  done: function (cb) {
    if (cb) {
      this._doneList.push(cb);
    }

    return this;
  },

  /**
   * @return {Array.<module:zrender/animation/Clip>}
   */
  getClips: function () {
    return this._clipList;
  }
};
var _default = Animator;
module.exports = _default;

/***/ }),
/* 167 */
/***/ (function(module, exports) {

var _default = typeof window !== 'undefined' && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || // https://github.com/ecomfe/zrender/issues/189#issuecomment-224919809
window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (func) {
  setTimeout(func, 16);
};

module.exports = _default;

/***/ }),
/* 168 */
/***/ (function(module, exports) {

var PI2 = Math.PI * 2;

function normalizeRadian(angle) {
  angle %= PI2;

  if (angle < 0) {
    angle += PI2;
  }

  return angle;
}

exports.normalizeRadian = normalizeRadian;

/***/ }),
/* 169 */
/***/ (function(module, exports) {

// Simple LRU cache use doubly linked list
// @module zrender/core/LRU

/**
 * Simple double linked list. Compared with array, it has O(1) remove operation.
 * @constructor
 */
var LinkedList = function () {
  /**
   * @type {module:zrender/core/LRU~Entry}
   */
  this.head = null;
  /**
   * @type {module:zrender/core/LRU~Entry}
   */

  this.tail = null;
  this._len = 0;
};

var linkedListProto = LinkedList.prototype;
/**
 * Insert a new value at the tail
 * @param  {} val
 * @return {module:zrender/core/LRU~Entry}
 */

linkedListProto.insert = function (val) {
  var entry = new Entry(val);
  this.insertEntry(entry);
  return entry;
};
/**
 * Insert an entry at the tail
 * @param  {module:zrender/core/LRU~Entry} entry
 */


linkedListProto.insertEntry = function (entry) {
  if (!this.head) {
    this.head = this.tail = entry;
  } else {
    this.tail.next = entry;
    entry.prev = this.tail;
    entry.next = null;
    this.tail = entry;
  }

  this._len++;
};
/**
 * Remove entry.
 * @param  {module:zrender/core/LRU~Entry} entry
 */


linkedListProto.remove = function (entry) {
  var prev = entry.prev;
  var next = entry.next;

  if (prev) {
    prev.next = next;
  } else {
    // Is head
    this.head = next;
  }

  if (next) {
    next.prev = prev;
  } else {
    // Is tail
    this.tail = prev;
  }

  entry.next = entry.prev = null;
  this._len--;
};
/**
 * @return {number}
 */


linkedListProto.len = function () {
  return this._len;
};
/**
 * Clear list
 */


linkedListProto.clear = function () {
  this.head = this.tail = null;
  this._len = 0;
};
/**
 * @constructor
 * @param {} val
 */


var Entry = function (val) {
  /**
   * @type {}
   */
  this.value = val;
  /**
   * @type {module:zrender/core/LRU~Entry}
   */

  this.next;
  /**
   * @type {module:zrender/core/LRU~Entry}
   */

  this.prev;
};
/**
 * LRU Cache
 * @constructor
 * @alias module:zrender/core/LRU
 */


var LRU = function (maxSize) {
  this._list = new LinkedList();
  this._map = {};
  this._maxSize = maxSize || 10;
  this._lastRemovedEntry = null;
};

var LRUProto = LRU.prototype;
/**
 * @param  {string} key
 * @param  {} value
 * @return {} Removed value
 */

LRUProto.put = function (key, value) {
  var list = this._list;
  var map = this._map;
  var removed = null;

  if (map[key] == null) {
    var len = list.len(); // Reuse last removed entry

    var entry = this._lastRemovedEntry;

    if (len >= this._maxSize && len > 0) {
      // Remove the least recently used
      var leastUsedEntry = list.head;
      list.remove(leastUsedEntry);
      delete map[leastUsedEntry.key];
      removed = leastUsedEntry.value;
      this._lastRemovedEntry = leastUsedEntry;
    }

    if (entry) {
      entry.value = value;
    } else {
      entry = new Entry(value);
    }

    entry.key = key;
    list.insertEntry(entry);
    map[key] = entry;
  }

  return removed;
};
/**
 * @param  {string} key
 * @return {}
 */


LRUProto.get = function (key) {
  var entry = this._map[key];
  var list = this._list;

  if (entry != null) {
    // Put the latest used entry in the tail
    if (entry !== list.tail) {
      list.remove(entry);
      list.insertEntry(entry);
    }

    return entry.value;
  }
};
/**
 * Clear the cache
 */


LRUProto.clear = function () {
  this._list.clear();

  this._map = {};
};

var _default = LRU;
module.exports = _default;

/***/ }),
/* 170 */
/***/ (function(module, exports) {

/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */
var idStart = 0x0907;

function _default() {
  return idStart++;
}

module.exports = _default;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

// https://github.com/mziccard/node-timsort
var DEFAULT_MIN_MERGE = 32;
var DEFAULT_MIN_GALLOPING = 7;
var DEFAULT_TMP_STORAGE_LENGTH = 256;

function minRunLength(n) {
  var r = 0;

  while (n >= DEFAULT_MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }

  return n + r;
}

function makeAscendingRun(array, lo, hi, compare) {
  var runHi = lo + 1;

  if (runHi === hi) {
    return 1;
  }

  if (compare(array[runHi++], array[lo]) < 0) {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
      runHi++;
    }

    reverseRun(array, lo, runHi);
  } else {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
      runHi++;
    }
  }

  return runHi - lo;
}

function reverseRun(array, lo, hi) {
  hi--;

  while (lo < hi) {
    var t = array[lo];
    array[lo++] = array[hi];
    array[hi--] = t;
  }
}

function binaryInsertionSort(array, lo, hi, start, compare) {
  if (start === lo) {
    start++;
  }

  for (; start < hi; start++) {
    var pivot = array[start];
    var left = lo;
    var right = start;
    var mid;

    while (left < right) {
      mid = left + right >>> 1;

      if (compare(pivot, array[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    var n = start - left;

    switch (n) {
      case 3:
        array[left + 3] = array[left + 2];

      case 2:
        array[left + 2] = array[left + 1];

      case 1:
        array[left + 1] = array[left];
        break;

      default:
        while (n > 0) {
          array[left + n] = array[left + n - 1];
          n--;
        }

    }

    array[left] = pivot;
  }
}

function gallopLeft(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) > 0) {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    lastOffset += hint;
    offset += hint;
  } else {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }

  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) > 0) {
      lastOffset = m + 1;
    } else {
      offset = m;
    }
  }

  return offset;
}

function gallopRight(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) < 0) {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  } else {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    }

    lastOffset += hint;
    offset += hint;
  }

  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) < 0) {
      offset = m;
    } else {
      lastOffset = m + 1;
    }
  }

  return offset;
}

function TimSort(array, compare) {
  var minGallop = DEFAULT_MIN_GALLOPING;
  var length = 0;
  var tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;
  var stackLength = 0;
  var runStart;
  var runLength;
  var stackSize = 0;
  length = array.length;

  if (length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
    tmpStorageLength = length >>> 1;
  }

  var tmp = [];
  stackLength = length < 120 ? 5 : length < 1542 ? 10 : length < 119151 ? 19 : 40;
  runStart = [];
  runLength = [];

  function pushRun(_runStart, _runLength) {
    runStart[stackSize] = _runStart;
    runLength[stackSize] = _runLength;
    stackSize += 1;
  }

  function mergeRuns() {
    while (stackSize > 1) {
      var n = stackSize - 2;

      if (n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1] || n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1]) {
        if (runLength[n - 1] < runLength[n + 1]) {
          n--;
        }
      } else if (runLength[n] > runLength[n + 1]) {
        break;
      }

      mergeAt(n);
    }
  }

  function forceMergeRuns() {
    while (stackSize > 1) {
      var n = stackSize - 2;

      if (n > 0 && runLength[n - 1] < runLength[n + 1]) {
        n--;
      }

      mergeAt(n);
    }
  }

  function mergeAt(i) {
    var start1 = runStart[i];
    var length1 = runLength[i];
    var start2 = runStart[i + 1];
    var length2 = runLength[i + 1];
    runLength[i] = length1 + length2;

    if (i === stackSize - 3) {
      runStart[i + 1] = runStart[i + 2];
      runLength[i + 1] = runLength[i + 2];
    }

    stackSize--;
    var k = gallopRight(array[start2], array, start1, length1, 0, compare);
    start1 += k;
    length1 -= k;

    if (length1 === 0) {
      return;
    }

    length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

    if (length2 === 0) {
      return;
    }

    if (length1 <= length2) {
      mergeLow(start1, length1, start2, length2);
    } else {
      mergeHigh(start1, length1, start2, length2);
    }
  }

  function mergeLow(start1, length1, start2, length2) {
    var i = 0;

    for (i = 0; i < length1; i++) {
      tmp[i] = array[start1 + i];
    }

    var cursor1 = 0;
    var cursor2 = start2;
    var dest = start1;
    array[dest++] = array[cursor2++];

    if (--length2 === 0) {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }

      return;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
      return;
    }

    var _minGallop = minGallop;
    var count1;
    var count2;
    var exit;

    while (1) {
      count1 = 0;
      count2 = 0;
      exit = false;

      do {
        if (compare(array[cursor2], tmp[cursor1]) < 0) {
          array[dest++] = array[cursor2++];
          count2++;
          count1 = 0;

          if (--length2 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest++] = tmp[cursor1++];
          count1++;
          count2 = 0;

          if (--length1 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

        if (count1 !== 0) {
          for (i = 0; i < count1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }

          dest += count1;
          cursor1 += count1;
          length1 -= count1;

          if (length1 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest++] = array[cursor2++];

        if (--length2 === 0) {
          exit = true;
          break;
        }

        count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

        if (count2 !== 0) {
          for (i = 0; i < count2; i++) {
            array[dest + i] = array[cursor2 + i];
          }

          dest += count2;
          cursor2 += count2;
          length2 -= count2;

          if (length2 === 0) {
            exit = true;
            break;
          }
        }

        array[dest++] = tmp[cursor1++];

        if (--length1 === 1) {
          exit = true;
          break;
        }

        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (_minGallop < 0) {
        _minGallop = 0;
      }

      _minGallop += 2;
    }

    minGallop = _minGallop;
    minGallop < 1 && (minGallop = 1);

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
    } else if (length1 === 0) {
      throw new Error(); // throw new Error('mergeLow preconditions were not respected');
    } else {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }
    }
  }

  function mergeHigh(start1, length1, start2, length2) {
    var i = 0;

    for (i = 0; i < length2; i++) {
      tmp[i] = array[start2 + i];
    }

    var cursor1 = start1 + length1 - 1;
    var cursor2 = length2 - 1;
    var dest = start2 + length2 - 1;
    var customCursor = 0;
    var customDest = 0;
    array[dest--] = array[cursor1--];

    if (--length1 === 0) {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }

      return;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
      return;
    }

    var _minGallop = minGallop;

    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;

      do {
        if (compare(tmp[cursor2], array[cursor1]) < 0) {
          array[dest--] = array[cursor1--];
          count1++;
          count2 = 0;

          if (--length1 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest--] = tmp[cursor2--];
          count2++;
          count1 = 0;

          if (--length2 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = count1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }

          if (length1 === 0) {
            exit = true;
            break;
          }
        }

        array[dest--] = tmp[cursor2--];

        if (--length2 === 1) {
          exit = true;
          break;
        }

        count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;

          for (i = 0; i < count2; i++) {
            array[customDest + i] = tmp[customCursor + i];
          }

          if (length2 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest--] = array[cursor1--];

        if (--length1 === 0) {
          exit = true;
          break;
        }

        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (_minGallop < 0) {
        _minGallop = 0;
      }

      _minGallop += 2;
    }

    minGallop = _minGallop;

    if (minGallop < 1) {
      minGallop = 1;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
    } else if (length2 === 0) {
      throw new Error(); // throw new Error('mergeHigh preconditions were not respected');
    } else {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }
    }
  }

  this.mergeRuns = mergeRuns;
  this.forceMergeRuns = forceMergeRuns;
  this.pushRun = pushRun;
}

function sort(array, compare, lo, hi) {
  if (!lo) {
    lo = 0;
  }

  if (!hi) {
    hi = array.length;
  }

  var remaining = hi - lo;

  if (remaining < 2) {
    return;
  }

  var runLength = 0;

  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array, lo, hi, compare);
    binaryInsertionSort(array, lo, hi, lo + runLength, compare);
    return;
  }

  var ts = new TimSort(array, compare);
  var minRun = minRunLength(remaining);

  do {
    runLength = makeAscendingRun(array, lo, hi, compare);

    if (runLength < minRun) {
      var force = remaining;

      if (force > minRun) {
        force = minRun;
      }

      binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
      runLength = force;
    }

    ts.pushRun(lo, runLength);
    ts.mergeRuns();
    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0);

  ts.forceMergeRuns();
}

module.exports = sort;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(5);

var Gradient = __webpack_require__(118);

/**
 * x, y, x2, y2 are all percent from 0 to 1
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [x2=1]
 * @param {number} [y2=0]
 * @param {Array.<Object>} colorStops
 * @param {boolean} [globalCoord=false]
 */
var LinearGradient = function (x, y, x2, y2, colorStops, globalCoord) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {type: 'linear', colorStops: ...}`, where
  // this constructor will not be called.
  this.x = x == null ? 0 : x;
  this.y = y == null ? 0 : y;
  this.x2 = x2 == null ? 1 : x2;
  this.y2 = y2 == null ? 0 : y2; // Can be cloned

  this.type = 'linear'; // If use global coord

  this.global = globalCoord || false;
  Gradient.call(this, colorStops);
};

LinearGradient.prototype = {
  constructor: LinearGradient
};
zrUtil.inherits(LinearGradient, Gradient);
var _default = LinearGradient;
module.exports = _default;

/***/ }),
/* 173 */
/***/ (function(module, exports) {

var SHADOW_PROPS = {
  'shadowBlur': 1,
  'shadowOffsetX': 1,
  'shadowOffsetY': 1,
  'textShadowBlur': 1,
  'textShadowOffsetX': 1,
  'textShadowOffsetY': 1,
  'textBoxShadowBlur': 1,
  'textBoxShadowOffsetX': 1,
  'textBoxShadowOffsetY': 1
};

function _default(ctx, propName, value) {
  if (SHADOW_PROPS.hasOwnProperty(propName)) {
    return value *= ctx.dpr;
  }

  return value;
}

module.exports = _default;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var smoothSpline = __webpack_require__(418);

var smoothBezier = __webpack_require__(417);

function buildPath(ctx, shape, closePath) {
  var points = shape.points;
  var smooth = shape.smooth;

  if (points && points.length >= 2) {
    if (smooth && smooth !== 'spline') {
      var controlPoints = smoothBezier(points, smooth, closePath, shape.smoothConstraint);
      ctx.moveTo(points[0][0], points[0][1]);
      var len = points.length;

      for (var i = 0; i < (closePath ? len : len - 1); i++) {
        var cp1 = controlPoints[i * 2];
        var cp2 = controlPoints[i * 2 + 1];
        var p = points[(i + 1) % len];
        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
      }
    } else {
      if (smooth === 'spline') {
        points = smoothSpline(points, closePath);
      }

      ctx.moveTo(points[0][0], points[0][1]);

      for (var i = 1, l = points.length; i < l; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
    }

    closePath && ctx.closePath();
  }
}

exports.buildPath = buildPath;

/***/ }),
/* 175 */
/***/ (function(module, exports) {

/**
 * @param {Object} ctx
 * @param {Object} shape
 * @param {number} shape.x
 * @param {number} shape.y
 * @param {number} shape.width
 * @param {number} shape.height
 * @param {number} shape.r
 */
function buildPath(ctx, shape) {
  var x = shape.x;
  var y = shape.y;
  var width = shape.width;
  var height = shape.height;
  var r = shape.r;
  var r1;
  var r2;
  var r3;
  var r4; // Convert width and height to positive for better borderRadius

  if (width < 0) {
    x = x + width;
    width = -width;
  }

  if (height < 0) {
    y = y + height;
    height = -height;
  }

  if (typeof r === 'number') {
    r1 = r2 = r3 = r4 = r;
  } else if (r instanceof Array) {
    if (r.length === 1) {
      r1 = r2 = r3 = r4 = r[0];
    } else if (r.length === 2) {
      r1 = r3 = r[0];
      r2 = r4 = r[1];
    } else if (r.length === 3) {
      r1 = r[0];
      r2 = r4 = r[1];
      r3 = r[2];
    } else {
      r1 = r[0];
      r2 = r[1];
      r3 = r[2];
      r4 = r[3];
    }
  } else {
    r1 = r2 = r3 = r4 = 0;
  }

  var total;

  if (r1 + r2 > width) {
    total = r1 + r2;
    r1 *= width / total;
    r2 *= width / total;
  }

  if (r3 + r4 > width) {
    total = r3 + r4;
    r3 *= width / total;
    r4 *= width / total;
  }

  if (r2 + r3 > height) {
    total = r2 + r3;
    r2 *= height / total;
    r3 *= height / total;
  }

  if (r1 + r4 > height) {
    total = r1 + r4;
    r1 *= height / total;
    r4 *= height / total;
  }

  ctx.moveTo(x + r1, y);
  ctx.lineTo(x + width - r2, y);
  r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
  ctx.lineTo(x + width, y + height - r3);
  r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
  ctx.lineTo(x + r4, y + height);
  r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
  ctx.lineTo(x, y + r1);
  r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
}

exports.buildPath = buildPath;

/***/ }),
/* 176 */
/***/ (function(module, exports) {

/**
 * Sub-pixel optimize for canvas rendering, prevent from blur
 * when rendering a thin vertical/horizontal line.
 */
var round = Math.round;
/**
 * Sub pixel optimize line for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x1`, `x2`, `y1`, `y2` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x1]
 * @param {number} [inputShape.y1]
 * @param {number} [inputShape.x2]
 * @param {number} [inputShape.y2]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */

function subPixelOptimizeLine(outputShape, inputShape, style) {
  var lineWidth = style && style.lineWidth;

  if (!inputShape || !lineWidth) {
    return;
  }

  var x1 = inputShape.x1;
  var x2 = inputShape.x2;
  var y1 = inputShape.y1;
  var y2 = inputShape.y2;

  if (round(x1 * 2) === round(x2 * 2)) {
    outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
  } else {
    outputShape.x1 = x1;
    outputShape.x2 = x2;
  }

  if (round(y1 * 2) === round(y2 * 2)) {
    outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
  } else {
    outputShape.y1 = y1;
    outputShape.y2 = y2;
  }
}
/**
 * Sub pixel optimize rect for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x`, `y`, `width`, `height` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x]
 * @param {number} [inputShape.y]
 * @param {number} [inputShape.width]
 * @param {number} [inputShape.height]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */


function subPixelOptimizeRect(outputShape, inputShape, style) {
  var lineWidth = style && style.lineWidth;

  if (!inputShape || !lineWidth) {
    return;
  }

  var originX = inputShape.x;
  var originY = inputShape.y;
  var originWidth = inputShape.width;
  var originHeight = inputShape.height;
  outputShape.x = subPixelOptimize(originX, lineWidth, true);
  outputShape.y = subPixelOptimize(originY, lineWidth, true);
  outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
  outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
}
/**
 * Sub pixel optimize for canvas
 *
 * @param {number} position Coordinate, such as x, y
 * @param {number} lineWidth Should be nonnegative integer.
 * @param {boolean=} positiveOrNegative Default false (negative).
 * @return {number} Optimized position.
 */


function subPixelOptimize(position, lineWidth, positiveOrNegative) {
  // Assure that (position + lineWidth / 2) is near integer edge,
  // otherwise line will be fuzzy in canvas.
  var doubledPosition = round(position * 2);
  return (doubledPosition + round(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}

exports.subPixelOptimizeLine = subPixelOptimizeLine;
exports.subPixelOptimizeRect = subPixelOptimizeRect;
exports.subPixelOptimize = subPixelOptimize;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var textHelper = __webpack_require__(84);

var BoundingRect = __webpack_require__(30);

var _constant = __webpack_require__(83);

var WILL_BE_RESTORED = _constant.WILL_BE_RESTORED;

/**
 * Mixin for drawing text in a element bounding rect
 * @module zrender/mixin/RectText
 */
var tmpRect = new BoundingRect();

var RectText = function () {};

RectText.prototype = {
  constructor: RectText,

  /**
   * Draw text in a rect with specified position.
   * @param  {CanvasRenderingContext2D} ctx
   * @param  {Object} rect Displayable rect
   */
  drawRectText: function (ctx, rect) {
    var style = this.style;
    rect = style.textRect || rect; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);
    var text = style.text; // Convert to string

    text != null && (text += '');

    if (!textHelper.needDrawText(text, style)) {
      return;
    } // FIXME
    // Do not provide prevEl to `textHelper.renderText` for ctx prop cache,
    // but use `ctx.save()` and `ctx.restore()`. Because the cache for rect
    // text propably break the cache for its host elements.


    ctx.save(); // Transform rect to view space

    var transform = this.transform;

    if (!style.transformText) {
      if (transform) {
        tmpRect.copy(rect);
        tmpRect.applyTransform(transform);
        rect = tmpRect;
      }
    } else {
      this.setTransform(ctx);
    } // transformText and textRotation can not be used at the same time.


    textHelper.renderText(this, ctx, text, style, rect, WILL_BE_RESTORED);
    ctx.restore();
  }
};
var _default = RectText;
module.exports = _default;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 圆形
 * @module zrender/shape/Circle
 */
var _default = Path.extend({
  type: 'circle',
  shape: {
    cx: 0,
    cy: 0,
    r: 0
  },
  buildPath: function (ctx, shape, inBundle) {
    // Better stroking in ShapeBundle
    // Always do it may have performence issue ( fill may be 2x more cost)
    if (inBundle) {
      ctx.moveTo(shape.cx + shape.r, shape.cy);
    } // else {
    //     if (ctx.allocate && !ctx.data.length) {
    //         ctx.allocate(ctx.CMD_MEM_SIZE.A);
    //     }
    // }
    // Better stroking in ShapeBundle
    // ctx.moveTo(shape.cx + shape.r, shape.cy);


    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
  }
});

module.exports = _default;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 椭圆形状
 * @module zrender/graphic/shape/Ellipse
 */
var _default = Path.extend({
  type: 'ellipse',
  shape: {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0
  },
  buildPath: function (ctx, shape) {
    var k = 0.5522848;
    var x = shape.cx;
    var y = shape.cy;
    var a = shape.rx;
    var b = shape.ry;
    var ox = a * k; // 水平控制点偏移量

    var oy = b * k; // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线

    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var _subPixelOptimize = __webpack_require__(176);

var subPixelOptimizeLine = _subPixelOptimize.subPixelOptimizeLine;

/**
 * 直线
 * @module zrender/graphic/shape/Line
 */
// Avoid create repeatly.
var subPixelOptimizeOutputShape = {};

var _default = Path.extend({
  type: 'line',
  shape: {
    // Start point
    x1: 0,
    y1: 0,
    // End point
    x2: 0,
    y2: 0,
    percent: 1
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x1;
    var y1;
    var x2;
    var y2;

    if (this.subPixelOptimize) {
      subPixelOptimizeLine(subPixelOptimizeOutputShape, shape, this.style);
      x1 = subPixelOptimizeOutputShape.x1;
      y1 = subPixelOptimizeOutputShape.y1;
      x2 = subPixelOptimizeOutputShape.x2;
      y2 = subPixelOptimizeOutputShape.y2;
    } else {
      x1 = shape.x1;
      y1 = shape.y1;
      x2 = shape.x2;
      y2 = shape.y2;
    }

    var percent = shape.percent;

    if (percent === 0) {
      return;
    }

    ctx.moveTo(x1, y1);

    if (percent < 1) {
      x2 = x1 * (1 - percent) + x2 * percent;
      y2 = y1 * (1 - percent) + y2 * percent;
    }

    ctx.lineTo(x2, y2);
  },

  /**
   * Get point at percent
   * @param  {number} percent
   * @return {Array.<number>}
   */
  pointAt: function (p) {
    var shape = this.shape;
    return [shape.x1 * (1 - p) + shape.x2 * p, shape.y1 * (1 - p) + shape.y2 * p];
  }
});

module.exports = _default;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var polyHelper = __webpack_require__(174);

/**
 * 多边形
 * @module zrender/shape/Polygon
 */
var _default = Path.extend({
  type: 'polygon',
  shape: {
    points: null,
    smooth: false,
    smoothConstraint: null
  },
  buildPath: function (ctx, shape) {
    polyHelper.buildPath(ctx, shape, true);
  }
});

module.exports = _default;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var polyHelper = __webpack_require__(174);

/**
 * @module zrender/graphic/shape/Polyline
 */
var _default = Path.extend({
  type: 'polyline',
  shape: {
    points: null,
    smooth: false,
    smoothConstraint: null
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    polyHelper.buildPath(ctx, shape, false);
  }
});

module.exports = _default;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var roundRectHelper = __webpack_require__(175);

var _subPixelOptimize = __webpack_require__(176);

var subPixelOptimizeRect = _subPixelOptimize.subPixelOptimizeRect;

/**
 * 矩形
 * @module zrender/graphic/shape/Rect
 */
// Avoid create repeatly.
var subPixelOptimizeOutputShape = {};

var _default = Path.extend({
  type: 'rect',
  shape: {
    // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
    // r缩写为1         相当于 [1, 1, 1, 1]
    // r缩写为[1]       相当于 [1, 1, 1, 1]
    // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
    // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
    r: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function (ctx, shape) {
    var x;
    var y;
    var width;
    var height;

    if (this.subPixelOptimize) {
      subPixelOptimizeRect(subPixelOptimizeOutputShape, shape, this.style);
      x = subPixelOptimizeOutputShape.x;
      y = subPixelOptimizeOutputShape.y;
      width = subPixelOptimizeOutputShape.width;
      height = subPixelOptimizeOutputShape.height;
      subPixelOptimizeOutputShape.r = shape.r;
      shape = subPixelOptimizeOutputShape;
    } else {
      x = shape.x;
      y = shape.y;
      width = shape.width;
      height = shape.height;
    }

    if (!shape.r) {
      ctx.rect(x, y, width, height);
    } else {
      roundRectHelper.buildPath(ctx, shape);
    }

    ctx.closePath();
    return;
  }
});

module.exports = _default;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var PathProxy = __webpack_require__(52);

var transformPath = __webpack_require__(438);

// command chars
// var cc = [
//     'm', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z',
//     'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'
// ];
var mathSqrt = Math.sqrt;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;

var vMag = function (v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

var vRatio = function (u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
};

var vAngle = function (u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
};

function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
  var psi = psiDeg * (PI / 180.0);
  var xp = mathCos(psi) * (x1 - x2) / 2.0 + mathSin(psi) * (y1 - y2) / 2.0;
  var yp = -1 * mathSin(psi) * (x1 - x2) / 2.0 + mathCos(psi) * (y1 - y2) / 2.0;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

  if (lambda > 1) {
    rx *= mathSqrt(lambda);
    ry *= mathSqrt(lambda);
  }

  var f = (fa === fs ? -1 : 1) * mathSqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0;
  var cxp = f * rx * yp / ry;
  var cyp = f * -ry * xp / rx;
  var cx = (x1 + x2) / 2.0 + mathCos(psi) * cxp - mathSin(psi) * cyp;
  var cy = (y1 + y2) / 2.0 + mathSin(psi) * cxp + mathCos(psi) * cyp;
  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var dTheta = vAngle(u, v);

  if (vRatio(u, v) <= -1) {
    dTheta = PI;
  }

  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }

  if (fs === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * PI;
  }

  if (fs === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * PI;
  }

  path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
}

var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig; // Consider case:
// (1) delimiter can be comma or space, where continuous commas
// or spaces should be seen as one comma.
// (2) value can be like:
// '2e-4', 'l.5.9' (ignore 0), 'M-10-10', 'l-2.43e-1,34.9983',
// 'l-.5E1,54', '121-23-44-11' (no delimiter)

var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g; // var valueSplitReg = /[\s,]+/;

function createPathProxyFromString(data) {
  if (!data) {
    return new PathProxy();
  } // var data = data.replace(/-/g, ' -')
  //     .replace(/  /g, ' ')
  //     .replace(/ /g, ',')
  //     .replace(/,,/g, ',');
  // var n;
  // create pipes so that we can split the data
  // for (n = 0; n < cc.length; n++) {
  //     cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
  // }
  // data = data.replace(/-/g, ',-');
  // create array
  // var arr = cs.split('|');
  // init context point


  var cpx = 0;
  var cpy = 0;
  var subpathX = cpx;
  var subpathY = cpy;
  var prevCmd;
  var path = new PathProxy();
  var CMD = PathProxy.CMD; // commandReg.lastIndex = 0;
  // var cmdResult;
  // while ((cmdResult = commandReg.exec(data)) != null) {
  //     var cmdStr = cmdResult[1];
  //     var cmdContent = cmdResult[2];

  var cmdList = data.match(commandReg);

  for (var l = 0; l < cmdList.length; l++) {
    var cmdText = cmdList[l];
    var cmdStr = cmdText.charAt(0);
    var cmd; // String#split is faster a little bit than String#replace or RegExp#exec.
    // var p = cmdContent.split(valueSplitReg);
    // var pLen = 0;
    // for (var i = 0; i < p.length; i++) {
    //     // '' and other invalid str => NaN
    //     var val = parseFloat(p[i]);
    //     !isNaN(val) && (p[pLen++] = val);
    // }

    var p = cmdText.match(numberReg) || [];
    var pLen = p.length;

    for (var i = 0; i < pLen; i++) {
      p[i] = parseFloat(p[i]);
    }

    var off = 0;

    while (off < pLen) {
      var ctlPtx;
      var ctlPty;
      var rx;
      var ry;
      var psi;
      var fa;
      var fs;
      var x1 = cpx;
      var y1 = cpy; // convert l, H, h, V, and v to L

      switch (cmdStr) {
        case 'l':
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'L':
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'm':
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = 'l';
          break;

        case 'M':
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = 'L';
          break;

        case 'h':
          cpx += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'H':
          cpx = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'v':
          cpy += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'V':
          cpy = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'C':
          cmd = CMD.C;
          path.addData(cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]);
          cpx = p[off - 2];
          cpy = p[off - 1];
          break;

        case 'c':
          cmd = CMD.C;
          path.addData(cmd, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy);
          cpx += p[off - 2];
          cpy += p[off - 1];
          break;

        case 'S':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.C) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cmd = CMD.C;
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;

        case 's':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.C) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cmd = CMD.C;
          x1 = cpx + p[off++];
          y1 = cpy + p[off++];
          cpx += p[off++];
          cpy += p[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;

        case 'Q':
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;

        case 'q':
          x1 = p[off++] + cpx;
          y1 = p[off++] + cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;

        case 'T':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.Q) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;

        case 't':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.Q) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;

        case 'A':
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs = p[off++];
          x1 = cpx, y1 = cpy;
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;

        case 'a':
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs = p[off++];
          x1 = cpx, y1 = cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;
      }
    }

    if (cmdStr === 'z' || cmdStr === 'Z') {
      cmd = CMD.Z;
      path.addData(cmd); // z may be in the middle of the path.

      cpx = subpathX;
      cpy = subpathY;
    }

    prevCmd = cmd;
  }

  path.toStatic();
  return path;
} // TODO Optimize double memory cost problem


function createPathOptions(str, opts) {
  var pathProxy = createPathProxyFromString(str);
  opts = opts || {};

  opts.buildPath = function (path) {
    if (path.setData) {
      path.setData(pathProxy.data); // Svg and vml renderer don't have context

      var ctx = path.getContext();

      if (ctx) {
        path.rebuildPath(ctx);
      }
    } else {
      var ctx = path;
      pathProxy.rebuildPath(ctx);
    }
  };

  opts.applyTransform = function (m) {
    transformPath(pathProxy, m);
    this.dirty(true);
  };

  return opts;
}
/**
 * Create a Path object from path string data
 * http://www.w3.org/TR/SVG/paths.html#PathData
 * @param  {Object} opts Other options
 */


function createFromString(str, opts) {
  return new Path(createPathOptions(str, opts));
}
/**
 * Create a Path class from path string data
 * @param  {string} str
 * @param  {Object} opts Other options
 */


function extendFromString(str, opts) {
  return Path.extend(createPathOptions(str, opts));
}
/**
 * Merge multiple paths
 */
// TODO Apply transform
// TODO stroke dash
// TODO Optimize double memory cost problem


function mergePath(pathEls, opts) {
  var pathList = [];
  var len = pathEls.length;

  for (var i = 0; i < len; i++) {
    var pathEl = pathEls[i];

    if (!pathEl.path) {
      pathEl.createPathProxy();
    }

    if (pathEl.__dirtyPath) {
      pathEl.buildPath(pathEl.path, pathEl.shape, true);
    }

    pathList.push(pathEl.path);
  }

  var pathBundle = new Path(opts); // Need path proxy.

  pathBundle.createPathProxy();

  pathBundle.buildPath = function (path) {
    path.appendPath(pathList); // Svg and vml renderer don't have context

    var ctx = path.getContext();

    if (ctx) {
      path.rebuildPath(ctx);
    }
  };

  return pathBundle;
}

exports.createFromString = createFromString;
exports.extendFromString = extendFromString;
exports.mergePath = mergePath;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__(36);

var urn = 'urn:schemas-microsoft-com:vml';
var win = typeof window === 'undefined' ? null : window;
var vmlInited = false;
var doc = win && win.document;

function createNode(tagName) {
  return doCreateNode(tagName);
} // Avoid assign to an exported variable, for transforming to cjs.


var doCreateNode;

if (doc && !env.canvasSupported) {
  try {
    !doc.namespaces.zrvml && doc.namespaces.add('zrvml', urn);

    doCreateNode = function (tagName) {
      return doc.createElement('<zrvml:' + tagName + ' class="zrvml">');
    };
  } catch (e) {
    doCreateNode = function (tagName) {
      return doc.createElement('<' + tagName + ' xmlns="' + urn + '" class="zrvml">');
    };
  }
} // From raphael


function initVML() {
  if (vmlInited || !doc) {
    return;
  }

  vmlInited = true;
  var styleSheets = doc.styleSheets;

  if (styleSheets.length < 31) {
    doc.createStyleSheet().addRule('.zrvml', 'behavior:url(#default#VML)');
  } else {
    // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
    styleSheets[0].addRule('.zrvml', 'behavior:url(#default#VML)');
  }
}

exports.doc = doc;
exports.createNode = createNode;
exports.initVML = initVML;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (!global || !global._babelPolyfill) {
  __webpack_require__(191);
}
exports.default = {};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(116)))

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zrender = __webpack_require__(79);

var _zrender2 = _interopRequireDefault(_zrender);

var _utils = __webpack_require__(57);

var _PolygonRect = __webpack_require__(128);

var _PolygonRect2 = _interopRequireDefault(_PolygonRect);

var _EditRect = __webpack_require__(88);

var _EditRect2 = _interopRequireDefault(_EditRect);

var _Image2 = __webpack_require__(87);

var _Image3 = _interopRequireDefault(_Image2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Polygon = function (_Image) {
    _inherits(Polygon, _Image);

    function Polygon(opts) {
        _classCallCheck(this, Polygon);

        var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

        _this.group = _this._option.group;
        _this.image = _this._option.image;

        _this.type = 'POLYGON';

        _this.isOpen = opts.isOpen || false;

        _this._mousemove = opts.event.mousemove;
        _this._mouseout = opts.event.mouseout;
        _this._onCreate = opts.event.onCreate;
        _this._onCreateComplete = opts.event.onCreateComplete;
        _this._onRectDrag = opts.event.onRectDrag;
        _this._onRectDragComplete = opts.event.onRectDragComplete;
        _this._onEditNodeDrag = opts.event.onEditNodeDrag;
        _this._onEditNodeDragComplete = opts.event.onEditNodeDragComplete;
        _this._onSelected = opts.event.onSelected;
        _this._unSelect = opts.event.unSelect;
        _this._imageDrag = opts.event.onImageDrag;
        _this._imageDragEnd = opts.event.onImageDragEnd;

        _this.data = opts.data;

        _this._createLimit = 6;
        _this._editWidth = _EditRect2.default.shape.width;
        _this._styleConfig = _PolygonRect2.default.style;

        _this._isMouseDown = false;
        _this._canDrawShape = false;

        _this._startPoint = [];
        _this._endPoint = [];

        _this._areaShape = [];
        _this._edgePoint = [];
        _this._editNode = [];
        _this._editRectStart = [];
        _this.position = [0, 0];
        _this.origin = [];
        _this.bgDrag = [];
        _this.graphic = _this._createGraphicGroup();
        _this.currShape = {};
        _this.tempShape = [];
        _this.creatCount = 0;
        if (_this.image) {
            _this.image.on('drag', function (e) {
                _this._imageDrag && _this._imageDrag(e);
                if (_this.getDrag() === true) {
                    var array = e.target.position;
                    _this.graphic.attr({
                        position: array
                    });
                    _this.bgDrag = array;
                }
            });
            _this.image.on('dragend', function (e) {
                _this._imageDragEnd && _this._imageDragEnd(e);
            });
        }
        if (_typeof(_this.data) === 'object') {
            _this.setData(_this.data);
        } else {
            new Error('请传入数组类型');
        }

        if (_this.isOpen) {
            _this.open();
        } else {
            _this.close();
        }
        return _this;
    }

    _createClass(Polygon, [{
        key: '_createGraphicGroup',
        value: function _createGraphicGroup(points, shape) {
            var group = new _zrender2.default.Group();
            group.data = {
                type: 'graphicGroup'
            };

            return group;
        }
    }, {
        key: 'open',
        value: function open() {
            this.isOpen = true;

            this._bindEvent();

            this.setEdit(true);

            this.group.eachChild(function (item) {
                if (item.data.type === 'IMAGE') {
                    item.attr({
                        'cursor': 'crosshair'
                    });
                }
            });
            if (this.currShape && this.currShape.position) {
                this.setSelectedStyle(this.currShape);
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this.isOpen = false;

            this.setEdit(false);

            this.group.eachChild(function (item) {
                if (item.data.type === 'IMAGE') {
                    item.attr({
                        'cursor': 'default'
                    });
                }
            });
        }
    }, {
        key: 'setEdit',
        value: function setEdit(blean) {
            if (blean) {
                this._areaShape.forEach(function (item) {
                    item.attr({
                        draggable: true
                    });
                    if (item.bound) {
                        item.bound.eachChild(function (edit) {
                            edit.hide();
                        });
                    }
                });
            } else {
                this._areaShape.forEach(function (item) {
                    item.attr({
                        draggable: false
                    });

                    if (item.bound) {
                        item.bound.eachChild(function (edit) {
                            edit.hide();
                        });
                    }
                });
            }
        }
    }, {
        key: '_zrClick',
        value: function _zrClick(e) {
            if (e.target && e.target.data.type === "IMAGE") {
                this.resetShapeStyle();
            }
        }
    }, {
        key: '_zrDBClick',
        value: function _zrDBClick(e) {
            if (e.target && e.target.data.type === "IMAGE" && this._isMouseDown && this.currShape) {

                var index = this._areaShape.length - 1;
                var shapePoints = this.currShape.shape.points;

                var points = this._changeToPoints(shapePoints);
                var data = {
                    type: 'Polygon',
                    notes: '-1',
                    id: window.btoa(Math.random()) };
                this._areaShape[index].attr({
                    style: this._styleConfig.selected,
                    data: _extends({}, data)
                });
                this._editNode = points;

                if (points.length > 0) {
                    this._createEditGroup(shapePoints, this.currShape);

                    this._onCreateComplete && this._onCreateComplete(e, _extends({}, data, {
                        coordinates: points
                    }));
                    this.selectedSub = e.target;
                }
                this._isMouseDown = false;
                this._canDrawShape = false;
                this._startPoint = [];
                this._endPoint = [];
                this.creatCount = 0;
            }
        }
    }, {
        key: '_zrMouseDown',
        value: function _zrMouseDown(e) {
            if (e.which === 1 && e.target && e.target.data.type === "IMAGE") {
                if (this.isOpen === false) {
                    return;
                }
                this.resetShapeStyle();

                this.origin = this._getDrawPoint(e);
                this._startPoint[this.creatCount] = this.origin;

                this.creatCount++;
                this._isMouseDown = true;
                this.currShape = null;
            }
        }
    }, {
        key: '_zrMouseMove',
        value: function _zrMouseMove(e) {
            if (this._isMouseDown && this._startPoint && e.target) {

                this._canDrawShape = true;


                this._endPoint = this._getDrawPoint(e);

                var scale = this.group.scale[0];

                var points = void 0;
                if (this.creatCount === 1) {
                    points = [[this._startPoint[0][0] / scale, this._startPoint[0][1] / scale], [this._endPoint[0] / scale, this._endPoint[1] / scale]];
                } else {
                    var newPoints = _zrender2.default.util.clone(this._startPoint);
                    newPoints.push(this._endPoint);

                    points = newPoints;
                }

                if (!this.currShape) {
                    this.currShape = this._createShape(points, {
                        notes: '-1'
                    });
                    this.graphic.add(this.currShape);
                    this._areaShape.push(this.currShape);
                } else {
                    this.currShape.attr({
                        shape: {
                            points: points
                        }
                    });
                }
                var rPoints = this._changeToPoints(points);
                this._onCreate && this._onCreate(e, {
                    notes: '-1',
                    coordinates: rPoints
                });
            }
        }
    }, {
        key: '_zrMouseUp',
        value: function _zrMouseUp(e) {}
    }, {
        key: '_getDrawPoint',
        value: function _getDrawPoint(e) {
            var x = void 0,
                y = void 0;
            var zoom = this.group.scale[0];
            var m = e.target && e.target.transform;
            if (e.target && m) {
                zoom = m[0];
                this.group.scale = [zoom, zoom];
                if (m[4] > 0) {
                    x = e.offsetX / zoom - Math.abs(m[4]) / zoom;
                } else {
                    x = e.offsetX / zoom + Math.abs(m[4]) / zoom;
                }
                if (m[5] > 0) {
                    y = e.offsetY / zoom - Math.abs(m[5]) / zoom;
                } else {
                    y = e.offsetY / zoom + Math.abs(m[5]) / zoom;
                }
            } else {
                x = e.offsetX / zoom;
                y = e.offsetY / zoom;
            }
            return [x, y];
        }
    }, {
        key: 'setData',
        value: function setData(data) {
            this.showMarkers(data);
        }
    }, {
        key: '_filterImage',
        value: function _filterImage() {
            this._areaShape.splice(0);
            var save = [];
            this.group.eachChild(function (x) {
                if (x.data.type === 'IMAGE') {
                    save.push(x);
                }
            });
            this.group.removeAll();
            this.group.add(save[0]);
            this.zr.add(this.group);
        }
    }, {
        key: 'showMarkers',
        value: function showMarkers(data) {
            var _this2 = this;

            this.removeAll();
            if (data.length > 0) {
                data.forEach(function (item) {
                    if (item.type === 'Polygon') {

                        if (_typeof(item.coordinates) === 'object') {
                            var points = _this2._calculateToRelationpix(item.coordinates);
                            var shape = _this2._createShape(points, item);

                            if (points.length === 0) {
                                throw new Error('此图形没有坐标数据,请删除此图形' + JSON.stringify(item));
                            }
                            if (points.length > 0) {
                                _this2._createEditGroup(points, shape);

                                _this2._areaShape.push(shape);
                                _this2.graphic.add(shape);
                            }
                        }
                    }
                });
            }
            this.group.add(this.graphic);
            this.setEdit(false);
        }
    }, {
        key: 'setSelectedStyle',
        value: function setSelectedStyle(shape) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            shape.attr({
                style: (0, _utils.merge)(this._styleConfig.selected, options)
            });
            if (this.isOpen) {
                shape.attr({
                    draggable: true
                });

                var w = this._editWidth / this.group.scale[0];

                shape.bound && shape.bound.eachChild(function (x, i) {
                    x.show();
                    x.attr({
                        shape: {
                            x: shape.shape.points[i][0] - w / 2,
                            y: shape.shape.points[i][1] - w / 2,
                            width: w,
                            height: w
                        },
                        zlevel: 3
                    });
                });
            }
        }
    }, {
        key: 'selected',
        value: function selected(item) {
            var _this3 = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.resetShapeStyle();
            this._areaShape.forEach(function (x) {
                if (x.data.id === item.id) {
                    _this3.currShape = x;
                    _this3.setSelectedStyle(x, options);
                }
            });
        }
    }, {
        key: 'setPosition',
        value: function setPosition(item) {
            var point = this._calculateToRelationpix(item.coordinates);
            var point_center = [(point[0][0] + point[1][0]) / 2, (point[0][1] + point[3][1]) / 2];

            var scale = this.group.scale[0];
            var canvas_width = this.zr.painter._width;
            var canvas_height = this.zr.painter._height;

            var bgDragX = void 0;
            var bgDragY = void 0;
            if (this.bgDrag.length === 0) {
                bgDragX = 0;
                bgDragY = 0;
            } else {
                bgDragX = this.bgDrag[0];
                bgDragY = this.bgDrag[1];
            }

            this.group.attr({
                position: [(-point_center[0] - bgDragX) * scale + canvas_width / 2, (-point_center[1] - bgDragY) * scale + canvas_height / 2]
            });

            this.group.update();
            this.group.decomposeTransform();
            this.group.dirty();
        }
    }, {
        key: '_createEditGroup',
        value: function _createEditGroup(points, shape) {
            var group = new _zrender2.default.Group();
            group.data = {
                type: 'EditGroup'
            };

            group.bound = shape;

            this._createEditPoint(points, group);

            shape.bound = group;

            this.graphic.add(group);
            return group;
        }
    }, {
        key: '_toShapeDragEnd',
        value: function _toShapeDragEnd(e, shape) {
            var _this4 = this;

            var array = [];

            var points = _zrender2.default.util.clone(e.target.shape.points);
            var bgDragX = void 0,
                bgDragY = void 0;

            var m = e.target.transform;
            if (this.bgDrag.length === 0) {
                bgDragX = 0;
                bgDragY = 0;
            } else {
                bgDragX = this.bgDrag[0];
                bgDragY = this.bgDrag[1];
            }
            points.forEach(function (item) {
                var x = void 0;
                if (m) {
                    if (m[4] - _this4._option.x > 0) {
                        item[0] = item[0] + Math.abs(m[4] - _this4._option.x) / m[0];
                    } else {
                        item[0] = item[0] - Math.abs(m[4] - _this4._option.x) / m[0];
                    }
                    if (m[5] - _this4._option.y > 0) {
                        item[1] = item[1] + Math.abs(m[5] - _this4._option.y) / m[0];
                    } else {
                        item[1] = item[1] - Math.abs(m[5] - _this4._option.y) / m[0];
                    }
                }

                x = [item[0] - bgDragX, item[1] - bgDragY];
                array.push(x);
            });
            return array;
        }
    }, {
        key: '_createShape',
        value: function _createShape(points, data) {
            var _this5 = this;

            var shape = new _zrender2.default.Polygon({
                shape: {
                    points: points,
                    smooth: 0
                },
                data: data,
                cursor: 'default',
                draggable: false,
                style: this._styleConfig.default,
                zlevel: 2
            });

            var oldGroup = [];
            shape.on('click', function (e) {
                _this5._editNode = _this5._toShapeDragEnd(e, e.target);
            });
            shape.on('dragstart', function (e) {
                _this5.currShape = shape;

                _this5.tempShape = e.target;
            });
            shape.on('drag', function (e) {
                var group = shape.bound;
                group.attr({
                    position: group.bound.position
                });
                group.eachChild(function (item) {
                    item.hide();
                });

                _this5._editNode = _this5._toShapeDragEnd(e, e.target);

                _this5.currShape = e.target;

                var shapePoints = _this5._toGlobal(e.target.shape.points, shape);
                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onRectDrag && _this5._onRectDrag(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });

            shape.on('dragend', function (e) {
                var shape = e.target;

                _this5.position = _zrender2.default.util.clone(shape.position);

                var shapePoints = _this5._toShapeDragEnd(e, shape);

                _this5.currShape = shape;

                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onRectDragComplete && _this5._onRectDragComplete(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });
            shape.on('mousemove', function (e) {
                if (_this5.isOpen) {

                    shape.attr({
                        cursor: 'default'
                    });

                    _this5.tempShape = e.target;
                }
            });
            shape.on('mouseover', function (e) {
                if (_this5.isOpen) {
                    shape.attr({
                        cursor: 'default'
                    });
                    if (_this5._canDrawShape === false && _this5._isMouseDown === false) {
                        _this5.tempShape = e.target;
                    }
                }
            });
            shape.on('mouseout', function (e) {
                if (_this5.isOpen) {
                    _this5._bindEvent();
                }
            });

            shape.on('mousedown', function (e) {
                if (_this5._isMouseDown && _this5.creatCount) {
                    _this5._startPoint[_this5.creatCount] = _this5._getDrawPoint(e);
                    _this5.creatCount++;
                    return;
                }

                _this5.currShape = e.target;
                _this5.tempShape = e.target;

                _this5.selectedSub = shape;
                _this5.resetShapeStyle();

                _this5.setSelectedStyle(e.target);
                var shapePoints = _this5._toGlobal(e.target.shape.points, shape);
                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onSelected && _this5._onSelected(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });
            shape.on('dblclick', function (e) {
                var index = _this5._areaShape.length - 1;
                var shapePoints = _this5.currShape.shape.points;

                var points = _this5._changeToPoints(shapePoints);
                var data = {
                    type: 'Polygon',
                    notes: '-1',
                    id: window.btoa(Math.random()) };
                _this5._areaShape[index].attr({
                    style: _this5._styleConfig.selected,
                    data: _extends({}, data)
                });
                _this5._editNode = points;

                if (points.length > 0) {
                    _this5._createEditGroup(shapePoints, _this5.currShape);

                    _this5._onCreateComplete && _this5._onCreateComplete(e, _extends({}, data, {
                        coordinates: points
                    }));
                    _this5.selectedSub = e.target;
                }
                _this5._isMouseDown = false;
                _this5._canDrawShape = false;
                _this5._startPoint = [];
                _this5._endPoint = [];
                _this5.creatCount = 0;
            });
            shape.on('mouseup', function (e) {
                if (_this5.isOpen && _this5.selectedSub) {

                    _this5.currShape.bound && _this5.currShape.bound.eachChild(function (item) {
                        item.show();
                    });
                    _this5.temp = _zrender2.default.util.clone(_this5.currShape.shape.points);

                    _this5._bindEvent();
                }
            });

            return shape;
        }
    }, {
        key: '_editElementEvent',
        value: function _editElementEvent(editNode, group) {
            var _this6 = this;

            editNode.on('mouseover', function (e) {});
            editNode.on('mouseout', function (e) {});

            editNode.on('mouseup', function (e) {});
            editNode.on("dragstart", function (e) {

                var m = _this6.currShape.transform;
                var point = _this6.currShape.shape.points;
                var oldPoints = _zrender2.default.util.clone(point);


                _this6.oldPoint = oldPoints;
                var width = oldPoints[1][0] - oldPoints[0][0];
                var height = oldPoints[2][1] - oldPoints[1][1];

                _this6.obj = {
                    width: width,
                    height: height
                };
                _this6.m = _zrender2.default.util.clone(_this6.currShape.transform || []);
            });

            editNode.on("drag", function (e) {
                if (e.event.target.tagName === 'CANVAS') {
                    var oldPoints = _zrender2.default.util.clone(_this6._editNode);

                    if (oldPoints.length === 0) {
                        oldPoints = _zrender2.default.util.clone(_this6.currShape.shape.points);
                    }

                    var m = _this6.m;
                    var _side = e.target.data._side;

                    if (!m[0]) {
                        m[0] = 1;
                        m[4] = 0;
                        m[5] = 0;
                    }
                    if (m[4] === _this6.position[0]) {}

                    var bgDragX = void 0,
                        bgDragY = void 0;
                    if (_this6.bgDrag.length === 0) {
                        bgDragX = 0;
                        bgDragY = 0;
                    } else {
                        bgDragX = _this6.bgDrag[0];
                        bgDragY = _this6.bgDrag[1];
                    }

                    var newPoints = [];
                    var offsetX = 0;
                    var offsetY = 0;
                    var width = _this6.obj.width;
                    var height = _this6.obj.height;

                    switch (_side) {
                        case 'tl':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;
                            newPoints = [[(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [oldPoints[1][0], (offsetY - _this6._option.y) / m[0] - bgDragY], oldPoints[2], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[3][1]]];
                            break;

                        case 'tr':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [[oldPoints[0][0], (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[3][1]], oldPoints[3]];
                            break;

                        case 'br':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [oldPoints[0], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[0][1]], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [oldPoints[0][0], (offsetY - _this6._option.y) / m[0] - bgDragY]];
                            break;

                        case 'bl':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [[(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[0][1]], oldPoints[1], [oldPoints[2][0], (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY]];
                            break;
                    }
                    group.removeAll();

                    group.attr({
                        position: [0, 0],
                        scale: [1, 1]
                    });

                    _this6.currShape.attr({
                        scale: [1, 1],
                        shape: {
                            points: newPoints
                        },
                        position: [0, 0]
                    });

                    _this6._editNode = newPoints;

                    var rPoints = _this6._changeToPoints(newPoints);

                    _this6._onEditNodeDrag && _this6._onEditNodeDrag(e, _extends({}, group.bound.data, {
                        coordinates: rPoints
                    }));

                    _this6._createEditPoint(newPoints, group);
                }
            });
            editNode.on("dragend", function (e) {
                var shape = group.bound;

                var rPoints = _this6._changeToPoints(_this6._editNode);

                _this6._onEditNodeDragComplete(e, _extends({}, group.bound.data, {
                    coordinates: rPoints
                }));
            });
            editNode.on("dragend", function (e) {
                if (_this6._editNode.length > 0) {
                    var shape = _this6._createShape(_this6._editNode, _this6.currShape.data);
                    _this6.graphic.remove(_this6.currShape.bound);
                    _this6.graphic.remove(_this6.currShape);
                    _this6._areaShape.forEach(function (item, index) {
                        if (item.data.id === _this6.currShape.data.id) {
                            _this6._areaShape.splice(index, 1);
                        }
                    });
                    _this6.currShape = shape;

                    _this6._createEditGroup(_this6._editNode, shape);

                    _this6._areaShape.push(shape);
                    _this6.graphic.add(shape);

                    _this6.setSelectedStyle(shape);

                    var rPoints = _this6._changeToPoints(_this6._editNode);

                    _this6._onEditNodeDragComplete && _this6._onEditNodeDragComplete(e, _extends({}, group.bound.data, {
                        coordinates: rPoints
                    }));
                }
            });
        }
    }, {
        key: '_createEditPoint',
        value: function _createEditPoint(points, group) {
            var _this7 = this;

            var editPoint = [];

            points.forEach(function (item, index) {
                editPoint.push({
                    _side: 'editNode_' + index,
                    points: points[index]
                });
            });

            editPoint.forEach(function (item) {
                var width = _this7._editWidth / _this7.group.scale[0];
                var editNode = new _zrender2.default.Rect((0, _utils.merge)(_EditRect2.default, {
                    shape: {
                        x: item.points[0] - width / 2,
                        y: item.points[1] - width / 2,
                        width: width,
                        height: width
                    },
                    data: {
                        _side: item._side
                    },
                    zlevel: 3
                }));
                _this7._editElementEvent(editNode, group);

                group.add(editNode);
            });
        }
    }, {
        key: 'setSilent',
        value: function setSilent(bol) {}
    }, {
        key: 'resetShapeStyle',
        value: function resetShapeStyle() {
            var _this8 = this;

            var stroke = this._styleConfig.default.stroke;
            this._areaShape.forEach(function (item) {
                if (item.data.type === 'Polygon') {
                    item.attr({
                        style: _extends({}, _this8._styleConfig.default, {
                            stroke: stroke
                        }),
                        draggable: false
                    });

                    item.bound && item.bound.eachChild(function (x) {
                        x.hide();
                    });
                }
            });
        }
    }, {
        key: 'removeAnnotation',
        value: function removeAnnotation() {
            var _this9 = this;

            if (this.selectedSub) {
                var obj = void 0;
                this._areaShape.forEach(function (item, index) {
                    if (item.data.id === _this9.selectedSub.data.id) {
                        obj = item;
                        _this9._areaShape.splice(index, 1);
                    }
                });
                if (obj) {
                    this.graphic.remove(obj.bound);
                    obj.bound = null;
                    this.graphic.remove(this.selectedSub);
                    this.selectedSub = null;
                }

                return obj;
            }
        }
    }, {
        key: 'removeSub',
        value: function removeSub(data) {
            var id = data.id;
            var index = void 0;
            this._areaShape.forEach(function (sub, i) {
                if (sub.data.id === id) {
                    index = i;
                }
            });
            var sub = this._areaShape[index];
            if (sub) {
                this._areaShape.splice(index, 1);

                this.graphic.remove(sub.bound);
                sub.bound = null;
                this.graphic.remove(sub);
            }
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            var _this10 = this;

            if (this._areaShape.length > 0) {
                this._areaShape.forEach(function (item) {
                    if (item.bound) {
                        _this10.graphic.remove(item.bound);
                        item.bound = null;
                    }
                    _this10.graphic.remove(item);
                    item = null;
                });
            }
            this._areaShape = [];
        }
    }, {
        key: '_calculateToRelationpix',
        value: function _calculateToRelationpix(points) {
            var _this11 = this;

            var array = [];
            points.forEach(function (item) {
                var x = item[0] * _this11._option.setRate + _this11._option.offsetX;
                var y = item[1] * _this11._option.setRate + _this11._option.offsetY;
                array.push([x, y]);
            });
            return array;
        }
    }, {
        key: '_changeToTowPoints',
        value: function _changeToTowPoints(points) {
            var pointsData = [(points[0][0] - this._option.offsetX) / this._option.setRate, (points[0][1] - this._option.offsetY) / this._option.setRate, (points[2][0] - this._option.offsetX) / this._option.setRate, (points[2][1] - this._option.offsetY) / this._option.setRate];

            return pointsData;
        }
    }, {
        key: '_changeToPoints',
        value: function _changeToPoints(points) {
            var _this12 = this;

            var array = [];
            points.forEach(function (item) {
                array.push([(item[0] - _this12._option.offsetX) / _this12._option.setRate, (item[1] - _this12._option.offsetY) / _this12._option.setRate]);
            });
            return array;
        }
    }, {
        key: '_changeToFourScalePoints',
        value: function _changeToFourScalePoints(points, scale) {
            var currData = [];
            currData[0] = [points[0] / scale, points[1] / scale];
            currData[1] = [points[2] / scale, points[1] / scale];
            currData[2] = [points[2] / scale, points[3] / scale];
            currData[3] = [points[0] / scale, points[3] / scale];
            return currData;
        }
    }, {
        key: '_changeToFourPoints',
        value: function _changeToFourPoints(points) {
            var currData = [];
            currData[0] = [points[0], points[1]];
            currData[1] = [points[2], points[1]];
            currData[2] = [points[2], points[3]];
            currData[3] = [points[0], points[3]];
            return currData;
        }
    }, {
        key: 'addHover',
        value: function addHover(data) {
            for (var i = 0; i < this._areaShape.length; i++) {
                var curr = this._areaShape[i];
                if (curr.data.id == data.id) {
                    this.zr.addHover(curr, data.style);
                    break;
                }
            }
        }
    }, {
        key: 'removeHover',
        value: function removeHover(data) {
            for (var i = 0; i < this._areaShape.length; i++) {
                var curr = this._areaShape[i];
                if (curr.data.id == data.id) {
                    this.zr.removeHover(curr);
                    break;
                }
            }
        }
    }, {
        key: 'getData',
        value: function getData() {
            var _this13 = this;

            var markInfo = [];

            this._areaShape.forEach(function (item) {
                var shapePoints = item.shape.points;
                var twoPoint = _this13._changeToPoints(shapePoints);

                markInfo.push({
                    "id": item.data.id,
                    "type": item.data.type,
                    "notes": item.data.notes,
                    "coordinates": twoPoint
                });
            });
            return markInfo;
        }
    }, {
        key: 'reset',
        value: function reset() {}
    }]);

    return Polygon;
}(_Image3.default);

exports.default = Polygon;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zrender = __webpack_require__(79);

var _zrender2 = _interopRequireDefault(_zrender);

var _utils = __webpack_require__(57);

var _PolygonRect = __webpack_require__(128);

var _PolygonRect2 = _interopRequireDefault(_PolygonRect);

var _EditRect = __webpack_require__(88);

var _EditRect2 = _interopRequireDefault(_EditRect);

var _Image2 = __webpack_require__(87);

var _Image3 = _interopRequireDefault(_Image2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RectOverlay = function (_Image) {
    _inherits(RectOverlay, _Image);

    function RectOverlay(opts) {
        _classCallCheck(this, RectOverlay);

        var _this = _possibleConstructorReturn(this, (RectOverlay.__proto__ || Object.getPrototypeOf(RectOverlay)).call(this));

        _this.group = _this._option.group;
        _this.image = _this._option.image;

        _this.type = 'RECTANGLE';

        _this.isOpen = opts.isOpen || false;

        _this._mousemove = opts.event.mousemove;
        _this._mouseout = opts.event.mouseout;
        _this._onCreate = opts.event.onCreate;
        _this._onCreateComplete = opts.event.onCreateComplete;
        _this._onRectDrag = opts.event.onRectDrag;
        _this._onRectDragComplete = opts.event.onRectDragComplete;
        _this._onEditNodeDrag = opts.event.onEditNodeDrag;
        _this._onEditNodeDragComplete = opts.event.onEditNodeDragComplete;
        _this._onSelected = opts.event.onSelected;
        _this._onHover = opts.event.onHover;
        _this._unSelect = opts.event.unSelect;
        _this._imageDrag = opts.event.onImageDrag;
        _this._imageDragEnd = opts.event.onImageDragEnd;

        _this.data = opts.data;

        _this._createLimit = 6;
        _this._editWidth = _EditRect2.default.shape.width;
        if (opts.style) {
            _this._styleConfig = (0, _utils.merge)(_PolygonRect2.default.style, opts.style);
        } else {
            _this._styleConfig = _PolygonRect2.default.style;
        }

        _this._isMouseDown = false;
        _this._canDrawShape = false;

        _this._startPoint = [];
        _this._endPoint = [];

        _this._areaShape = [];
        _this._edgePoint = [];
        _this._editNode = [];
        _this._editRectStart = [];
        _this.position = [0, 0];
        _this.origin = [];
        _this.bgDrag = [];
        _this.graphic = _this._createGraphicGroup();
        _this.currShape = {};
        _this.tempShape = {};
        if (_this.image) {
            _this.image.on('drag', function (e) {
                _this._imageDrag && _this._imageDrag(e);
                if (_this.getDrag() === true) {
                    var array = e.target.position;
                    _this.graphic.attr({
                        position: array
                    });
                    _this.bgDrag = array;
                }
            });
            _this.image.on('dragend', function (e) {
                _this._imageDragEnd && _this._imageDragEnd(e);
            });
        }
        if (_typeof(_this.data) === 'object') {
            _this.setData(_this.data);
        } else {
            new Error('请传入数组类型');
        }

        if (_this.isOpen) {
            _this.open();
        } else {
            _this.close();
        }
        return _this;
    }

    _createClass(RectOverlay, [{
        key: '_createGraphicGroup',
        value: function _createGraphicGroup(points, shape) {
            var group = new _zrender2.default.Group();
            group.data = {
                type: 'graphicGroup'
            };

            return group;
        }
    }, {
        key: 'open',
        value: function open() {
            this.isOpen = true;

            this._bindEvent();

            this.setEdit(true);

            this.group.eachChild(function (item) {
                if (item.data.type === 'IMAGE') {
                    item.attr({
                        'cursor': 'crosshair'
                    });
                }
            });
            if (this.currShape && this.currShape.position) {
                this.setSelectedStyle(this.currShape);
            }
        }
    }, {
        key: 'close',
        value: function close() {
            this.isOpen = false;

            this.dispose();

            this.setEdit(false);

            this.group.eachChild(function (item) {
                if (item.data.type === 'IMAGE') {
                    item.attr({
                        'cursor': 'default'
                    });
                }
            });
        }
    }, {
        key: 'setEdit',
        value: function setEdit(blean) {
            if (blean) {
                this._areaShape.forEach(function (item) {
                    item.attr({
                        draggable: true
                    });
                    if (item.bound) {
                        item.bound.eachChild(function (edit) {
                            edit.hide();
                        });
                    }
                });
            } else {
                this._areaShape.forEach(function (item) {
                    item.attr({
                        draggable: false
                    });

                    if (item.bound) {
                        item.bound.eachChild(function (edit) {
                            edit.hide();
                        });
                    }
                });
            }
        }
    }, {
        key: '_zrClick',
        value: function _zrClick(e) {
            if (e.target && e.target.data.type === "IMAGE") {
                this.resetShapeStyle();
            }
        }
    }, {
        key: '_zrMouseDown',
        value: function _zrMouseDown(e) {
            if (e.which === 1 && e.target && e.target.data.type === "IMAGE") {
                this.resetShapeStyle();
                this.origin = this._getDrawPoint(e);
                this._startPoint = this.origin;
                this._isMouseDown = true;
                this.currShape = null;
            }
        }
    }, {
        key: '_getDrawPoint',
        value: function _getDrawPoint(e) {
            var x = void 0,
                y = void 0;
            var zoom = this.group.scale[0];
            var m = e.target && e.target.transform;
            if (e.target && m) {
                zoom = m[0];
                this.group.scale = [zoom, zoom];
                if (m[4] > 0) {
                    x = e.offsetX / zoom - Math.abs(m[4]) / zoom;
                } else {
                    x = e.offsetX / zoom + Math.abs(m[4]) / zoom;
                }
                if (m[5] > 0) {
                    y = e.offsetY / zoom - Math.abs(m[5]) / zoom;
                } else {
                    y = e.offsetY / zoom + Math.abs(m[5]) / zoom;
                }
            } else {
                x = e.offsetX / zoom;
                y = e.offsetY / zoom;
            }
            return [x, y];
        }
    }, {
        key: '_zrMouseMove',
        value: function _zrMouseMove(e) {
            if (this._isMouseDown && this._startPoint && e.target) {
                var p = this._getDrawPoint(e);

                var xLong = Math.abs(this._startPoint[0] - p[0]);
                var yLong = Math.abs(this._startPoint[1] - p[1]);

                if (xLong < this._createLimit && yLong < this._createLimit) {
                    this._canDrawShape = false;
                    this.selectedSub = null;

                    return;
                }
                this._canDrawShape = true;


                this._endPoint = this._getDrawPoint(e);

                var scale = this.group.scale[0];

                var points = this._changeToFourPoints(this._startPoint.concat(this._endPoint));

                if (!this.currShape) {
                    this.currShape = this._createShape(points, {
                        notes: '-1'
                    });
                    this.graphic.add(this.currShape);
                    this._areaShape.push(this.currShape);
                } else {
                    this.currShape.attr({
                        shape: {
                            points: points
                        }
                    });
                }
                var rPoints = this._changeToPoints(points);
                this._onCreate && this._onCreate(e, {
                    notes: '-1',
                    coordinates: rPoints
                });
            }
        }
    }, {
        key: '_zrMouseUp',
        value: function _zrMouseUp(e) {
            if (this._isMouseDown && this.currShape) {
                var index = this._areaShape.length - 1;
                var shapePoints = this.currShape.shape.points;

                var points = this._changeToPoints(shapePoints);
                var data = {
                    type: 'Rectangle',
                    notes: '-1',
                    id: window.btoa(Math.random()) };
                this._areaShape[index].attr({
                    style: this._styleConfig.selected,
                    data: _extends({}, data)
                });
                this._editNode = points;

                if (points.length > 0) {
                    this._createEditGroup(shapePoints, this.currShape);

                    this._onCreateComplete && this._onCreateComplete(e, _extends({}, data, {
                        coordinates: points
                    }));
                    this.selectedSub = e.target;
                }
            }
            this._isMouseDown = false;
            this._canDrawShape = false;
            this._startPoint = [];
            this._endPoint = [];
        }
    }, {
        key: 'setData',
        value: function setData(data) {
            this.showMarkers(data);
        }
    }, {
        key: '_filterImage',
        value: function _filterImage() {
            this._areaShape.splice(0);
            var save = [];
            this.group.eachChild(function (x) {
                if (x.data.type === 'IMAGE') {
                    save.push(x);
                }
            });
            this.group.removeAll();
            this.group.add(save[0]);
            this.zr.add(this.group);
        }
    }, {
        key: 'showMarkers',
        value: function showMarkers(data) {
            var _this2 = this;

            this.removeAll();
            if (data.length > 0) {
                data.forEach(function (item) {
                    if (item.type === 'Rectangle') {

                        if (_typeof(item.coordinates) === 'object') {
                            var points = _this2._calculateToRelationpix(item.coordinates);
                            var shape = _this2._createShape(points, item);

                            if (points.length === 0) {
                                throw new Error('此图形没有坐标数据,请删除此图形' + JSON.stringify(item));
                            }
                            if (points.length > 0) {
                                _this2._createEditGroup(points, shape);

                                _this2._areaShape.push(shape);
                                _this2.graphic.add(shape);
                            }
                        }
                    }
                });
            }
            this.group.add(this.graphic);
            this.setEdit(false);
        }
    }, {
        key: 'setSelectedStyle',
        value: function setSelectedStyle(shape) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            shape.attr({
                style: (0, _utils.merge)(this._styleConfig.selected, options)
            });
            if (this.isOpen) {
                shape.attr({
                    draggable: true
                });

                var w = this._editWidth / this.group.scale[0];
                shape.bound && shape.bound.eachChild(function (x, i) {
                    x.show();
                    x.attr({
                        shape: {
                            x: shape.shape.points[i][0] - w / 2,
                            y: shape.shape.points[i][1] - w / 2,
                            width: w,
                            height: w
                        },
                        zlevel: 3
                    });
                });
            }
        }
    }, {
        key: 'selected',
        value: function selected(item) {
            var _this3 = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (this.isOpen) {
                return;
            }
            this.resetShapeStyle();
            this._areaShape.forEach(function (x) {
                if (x.data.id === item.id) {
                    _this3.currShape = x;
                    _this3.setSelectedStyle(x, options);
                }
            });
        }
    }, {
        key: 'setPosition',
        value: function setPosition(item) {
            if (this.isOpen) {
                return;
            }
            var point = this._calculateToRelationpix(item.coordinates);
            var point_center = [(point[0][0] + point[1][0]) / 2, (point[0][1] + point[3][1]) / 2];

            var scale = this.group.scale[0];
            var canvas_width = this.zr.painter._width;
            var canvas_height = this.zr.painter._height;

            var bgDragX = void 0;
            var bgDragY = void 0;
            if (this.bgDrag.length === 0) {
                bgDragX = 0;
                bgDragY = 0;
            } else {
                bgDragX = this.bgDrag[0];
                bgDragY = this.bgDrag[1];
            }

            this.group.attr({
                position: [(-point_center[0] - bgDragX) * scale + canvas_width / 2, (-point_center[1] - bgDragY) * scale + canvas_height / 2]
            });

            this.group.update();
            this.group.decomposeTransform();
            this.group.dirty();
        }
    }, {
        key: '_createEditGroup',
        value: function _createEditGroup(points, shape) {
            var group = new _zrender2.default.Group();
            group.data = {
                type: 'EditGroup'
            };

            group.bound = shape;

            this._createEditPoint(points, group);

            shape.bound = group;

            this.graphic.add(group);
            return group;
        }
    }, {
        key: '_toShapeDragEnd',
        value: function _toShapeDragEnd(e, shape) {
            var _this4 = this;

            var array = [];


            var points = _zrender2.default.util.clone(e.target.shape.points);

            var bgDragX = void 0,
                bgDragY = void 0;

            var m = e.target.transform;

            if (this.bgDrag.length === 0) {
                bgDragX = 0;
                bgDragY = 0;
            } else {
                bgDragX = this.bgDrag[0];
                bgDragY = this.bgDrag[1];
            }

            points.forEach(function (item) {
                var x = void 0;
                if (m) {
                    if (m[4] - _this4._option.x > 0) {
                        item[0] = item[0] + Math.abs(m[4] - _this4._option.x) / m[0];
                    } else {
                        item[0] = item[0] - Math.abs(m[4] - _this4._option.x) / m[0];
                    }
                    if (m[5] - _this4._option.y > 0) {
                        item[1] = item[1] + Math.abs(m[5] - _this4._option.y) / m[0];
                    } else {
                        item[1] = item[1] - Math.abs(m[5] - _this4._option.y) / m[0];
                    }
                }

                x = [item[0] - bgDragX, item[1] - bgDragY];
                array.push(x);
            });
            return array;
        }
    }, {
        key: '_createShape',
        value: function _createShape(points, data) {
            var _this5 = this;

            var shape = new _zrender2.default.Polygon({
                shape: {
                    points: points,
                    smooth: 0
                },
                data: data,
                cursor: 'default',
                draggable: false,
                style: this._styleConfig.default,

                zlevel: 2
            });

            var oldGroup = [];
            shape.on('click', function (e) {
                _this5._editNode = _this5._toShapeDragEnd(e, e.target);
            });
            shape.on('dragstart', function (e) {
                _this5.currShape = shape;

                _this5.tempShape = e.target;
            });
            shape.on('drag', function (e) {
                var group = shape.bound;
                group.attr({
                    position: group.bound.position
                });
                group.eachChild(function (item) {
                    item.hide();
                });

                _this5._editNode = _this5._toShapeDragEnd(e, e.target);

                _this5.currShape = e.target;

                var shapePoints = _this5._toGlobal(e.target.shape.points, shape);
                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onRectDrag && _this5._onRectDrag(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });

            shape.on('dragend', function (e) {
                var shape = e.target;

                _this5.position = _zrender2.default.util.clone(shape.position);

                var shapePoints = _this5._toShapeDragEnd(e, shape);

                _this5.currShape = shape;

                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onRectDragComplete && _this5._onRectDragComplete(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });
            shape.on('mousemove', function (e) {
                if (_this5.isOpen) {

                    shape.attr({
                        cursor: 'default'
                    });

                    _this5.tempShape = e.target;
                }
            });
            shape.on('mouseover', function (e) {
                if (_this5.isOpen) {

                    shape.attr({
                        cursor: 'default'
                    });

                    if (_this5._canDrawShape === false && _this5._isMouseDown === false) {
                        _this5.tempShape = e.target;

                        _this5.dispose();
                    }
                    return;
                }


                var shapePoints = _this5._toGlobal(e.target.shape.points, shape);
                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onHover && _this5._onHover(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });
            shape.on('mouseout', function (e) {
                if (_this5.isOpen) {
                    _this5._bindEvent();
                }
            });
            shape.on('mousedown', function (e) {
                _this5.currShape = e.target;
                _this5.tempShape = e.target;

                _this5.selectedSub = shape;
                _this5.resetShapeStyle();

                _this5.setSelectedStyle(e.target);

                var shapePoints = _this5._toGlobal(e.target.shape.points, shape);
                var rPoints = _this5._changeToPoints(shapePoints);
                _this5._onSelected && _this5._onSelected(e, _extends({}, e.target.data, {
                    coordinates: rPoints
                }));
            });

            shape.on('mouseup', function (e) {
                if (_this5.isOpen && _this5.selectedSub) {
                    _this5._startPoint = [];

                    _this5.currShape.bound && _this5.currShape.bound.eachChild(function (item) {
                        item.show();
                    });
                    _this5.temp = _zrender2.default.util.clone(_this5.currShape.shape.points);

                    _this5._bindEvent();
                }
            });

            return shape;
        }
    }, {
        key: '_editElementEvent',
        value: function _editElementEvent(editNode, group) {
            var _this6 = this;

            editNode.on('mouseover', function (e) {});
            editNode.on('mouseout', function (e) {});

            editNode.on('mouseup', function (e) {});
            editNode.on("dragstart", function (e) {
                var m = _this6.currShape.transform;
                var point = _this6.currShape.shape.points;
                var oldPoints = _zrender2.default.util.clone(point);


                _this6.oldPoint = oldPoints;
                var width = oldPoints[1][0] - oldPoints[0][0];
                var height = oldPoints[2][1] - oldPoints[1][1];

                _this6.obj = {
                    width: width,
                    height: height
                };
                _this6.m = _zrender2.default.util.clone(_this6.currShape.transform || []);
            });

            editNode.on("drag", function (e) {
                if (e.event.target.tagName === 'CANVAS') {
                    var oldPoints = _zrender2.default.util.clone(_this6._editNode);

                    if (oldPoints.length === 0) {
                        oldPoints = _zrender2.default.util.clone(_this6.currShape.shape.points);
                    }


                    var m = _this6.m;
                    var _side = e.target.data._side;

                    if (!m[0]) {
                        m[0] = 1;
                        m[4] = 0;
                        m[5] = 0;
                    }
                    if (m[4] === _this6.position[0]) {}

                    var bgDragX = void 0,
                        bgDragY = void 0;
                    if (_this6.bgDrag.length === 0) {
                        bgDragX = 0;
                        bgDragY = 0;
                    } else {
                        bgDragX = _this6.bgDrag[0];
                        bgDragY = _this6.bgDrag[1];
                    }

                    var newPoints = [];
                    var offsetX = 0;
                    var offsetY = 0;
                    var width = _this6.obj.width;
                    var height = _this6.obj.height;

                    switch (_side) {
                        case 'tl':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;
                            newPoints = [[(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [oldPoints[1][0], (offsetY - _this6._option.y) / m[0] - bgDragY], oldPoints[2], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[3][1]]];
                            break;

                        case 'tr':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [[oldPoints[0][0], (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[3][1]], oldPoints[3]];
                            break;

                        case 'br':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [oldPoints[0], [(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[0][1]], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY], [oldPoints[0][0], (offsetY - _this6._option.y) / m[0] - bgDragY]];
                            break;

                        case 'bl':
                            offsetX = e.event.offsetX;
                            offsetY = e.event.offsetY;

                            newPoints = [[(offsetX - _this6._option.x) / m[0] - bgDragX, oldPoints[0][1]], oldPoints[1], [oldPoints[2][0], (offsetY - _this6._option.y) / m[0] - bgDragY], [(offsetX - _this6._option.x) / m[0] - bgDragX, (offsetY - _this6._option.y) / m[0] - bgDragY]];
                            break;
                    }
                    group.removeAll();

                    group.attr({
                        position: [0, 0],
                        scale: [1, 1]
                    });

                    _this6.currShape.attr({
                        scale: [1, 1],
                        shape: {
                            points: newPoints
                        },
                        position: [0, 0]
                    });

                    _this6._editNode = newPoints;

                    var rPoints = _this6._changeToPoints(newPoints);

                    _this6._onEditNodeDrag && _this6._onEditNodeDrag(e, _extends({}, group.bound.data, {
                        coordinates: rPoints
                    }));

                    _this6._createEditPoint(newPoints, group);
                }
            });
            editNode.on("dragend", function (e) {
                if (_this6._editNode.length > 0) {
                    var shape = _this6._createShape(_this6._editNode, _this6.currShape.data);
                    _this6.graphic.remove(_this6.currShape.bound);
                    _this6.graphic.remove(_this6.currShape);
                    _this6._areaShape.forEach(function (item, index) {
                        if (item.data.id === _this6.currShape.data.id) {
                            _this6._areaShape.splice(index, 1);
                        }
                    });
                    _this6.currShape = shape;

                    _this6._createEditGroup(_this6._editNode, shape);

                    _this6._areaShape.push(shape);
                    _this6.graphic.add(shape);

                    _this6.setSelectedStyle(shape);

                    _this6._startPoint = [];

                    var rPoints = _this6._changeToPoints(_this6._editNode);

                    _this6._onEditNodeDragComplete && _this6._onEditNodeDragComplete(e, _extends({}, group.bound.data, {
                        coordinates: rPoints
                    }));
                }
            });
        }
    }, {
        key: '_createEditPoint',
        value: function _createEditPoint(points, group) {
            var _this7 = this;

            var editPoint = [];
            editPoint.push({
                _side: 'tl',
                points: points[0]
            });

            editPoint.push({
                _side: 'tr',
                points: points[1]
            });

            editPoint.push({
                _side: 'br',
                points: points[2]
            });

            editPoint.push({
                _side: 'bl',
                points: points[3]
            });

            editPoint.forEach(function (item) {
                var width = _this7._editWidth / _this7.group.scale[0];
                var editNode = new _zrender2.default.Rect((0, _utils.merge)(_EditRect2.default, {
                    shape: {
                        x: item.points[0] - width / 2,
                        y: item.points[1] - width / 2,
                        width: width,
                        height: width
                    },
                    data: {
                        _side: item._side
                    },
                    zlevel: 3
                }));
                _this7._editElementEvent(editNode, group);

                group.add(editNode);
            });
        }
    }, {
        key: 'setSilent',
        value: function setSilent(bol) {}
    }, {
        key: 'resetShapeStyle',
        value: function resetShapeStyle() {
            var _this8 = this;

            var stroke = this._styleConfig.default.stroke;
            this._areaShape.forEach(function (item) {
                if (item.data.type === 'Rectangle') {
                    item.attr({
                        style: _extends({}, _this8._styleConfig.default, {
                            stroke: stroke
                        }),
                        draggable: false
                    });

                    item.bound && item.bound.eachChild(function (x) {
                        x.hide();
                    });
                }
            });
        }
    }, {
        key: 'removeAnnotation',
        value: function removeAnnotation() {
            var _this9 = this;

            if (this.selectedSub) {
                var obj = void 0;
                this._areaShape.forEach(function (item, index) {
                    if (item.data.id === _this9.selectedSub.data.id) {
                        obj = item;
                        _this9._areaShape.splice(index, 1);
                    }
                });
                if (obj) {
                    this.graphic.remove(obj.bound);
                    obj.bound = null;
                    this.graphic.remove(this.selectedSub);
                    this.selectedSub = null;
                }

                return obj;
            }
        }
    }, {
        key: 'removeSub',
        value: function removeSub(data) {
            var id = data.id;
            var index = void 0;
            this._areaShape.forEach(function (sub, i) {
                if (sub.data.id === id) {
                    index = i;
                }
            });
            var sub = this._areaShape[index];
            if (sub) {
                this._areaShape.splice(index, 1);

                this.graphic.remove(sub.bound);
                sub.bound = null;
                this.graphic.remove(sub);
            }
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            var _this10 = this;

            if (this._areaShape.length > 0) {
                this._areaShape.forEach(function (item) {
                    if (item.bound) {
                        _this10.graphic.remove(item.bound);
                        item.bound = null;
                    }
                    _this10.graphic.remove(item);
                    item = null;
                });
            }
            this._areaShape = [];
        }
    }, {
        key: '_calculateToRelationpix',
        value: function _calculateToRelationpix(points) {
            var _this11 = this;

            var array = [];
            points.forEach(function (item) {
                var x = item[0] * _this11._option.setRate + _this11._option.offsetX;
                var y = item[1] * _this11._option.setRate + _this11._option.offsetY;
                array.push([x, y]);
            });
            return array;
        }
    }, {
        key: '_changeToTowPoints',
        value: function _changeToTowPoints(points) {
            var pointsData = [(points[0][0] - this._option.offsetX) / this._option.setRate, (points[0][1] - this._option.offsetY) / this._option.setRate, (points[2][0] - this._option.offsetX) / this._option.setRate, (points[2][1] - this._option.offsetY) / this._option.setRate];

            return pointsData;
        }
    }, {
        key: '_changeToPoints',
        value: function _changeToPoints(points) {
            var _this12 = this;

            var array = [];
            points.forEach(function (item) {
                array.push([(item[0] - _this12._option.offsetX) / _this12._option.setRate, (item[1] - _this12._option.offsetY) / _this12._option.setRate]);
            });
            return array;
        }
    }, {
        key: '_changeToFourScalePoints',
        value: function _changeToFourScalePoints(points, scale) {
            var currData = [];
            currData[0] = [points[0] / scale, points[1] / scale];
            currData[1] = [points[2] / scale, points[1] / scale];
            currData[2] = [points[2] / scale, points[3] / scale];
            currData[3] = [points[0] / scale, points[3] / scale];
            return currData;
        }
    }, {
        key: '_changeToFourPoints',
        value: function _changeToFourPoints(points) {
            var currData = [];
            currData[0] = [points[0], points[1]];
            currData[1] = [points[2], points[1]];
            currData[2] = [points[2], points[3]];
            currData[3] = [points[0], points[3]];
            return currData;
        }
    }, {
        key: 'addHover',
        value: function addHover(data) {
            for (var i = 0; i < this._areaShape.length; i++) {
                var curr = this._areaShape[i];
                if (curr.data.id == data.id) {
                    this.zr.addHover(curr, data.style);
                    break;
                }
            }
        }
    }, {
        key: 'removeHover',
        value: function removeHover(data) {
            for (var i = 0; i < this._areaShape.length; i++) {
                var curr = this._areaShape[i];
                if (curr.data.id == data.id) {
                    this.zr.removeHover(curr);
                    break;
                }
            }
        }
    }, {
        key: 'getData',
        value: function getData() {
            var _this13 = this;

            var markInfo = [];

            this._areaShape.forEach(function (item) {
                var shapePoints = item.shape.points;
                var twoPoint = _this13._changeToPoints(shapePoints);

                markInfo.push({
                    "id": item.data.id,
                    "type": item.data.type,
                    "notes": item.data.notes,
                    "coordinates": twoPoint
                });
            });
            return markInfo;
        }
    }, {
        key: 'reset',
        value: function reset() {}
    }]);

    return RectOverlay;
}(_Image3.default);

exports.default = RectOverlay;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Polygon = exports.Rect = exports.Image = exports.Init = exports.utils = exports.version = undefined;

__webpack_require__(186);

var _Init = __webpack_require__(126);

var _Init2 = _interopRequireDefault(_Init);

var _Image = __webpack_require__(87);

var _Image2 = _interopRequireDefault(_Image);

var _Rectangle = __webpack_require__(188);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Polygon = __webpack_require__(187);

var _Polygon2 = _interopRequireDefault(_Polygon);

var _utils = __webpack_require__(57);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = "1.0.31";
console.log('inMark v' + version);
var inMark = {
    version: version,
    utils: utils,
    Init: _Init2.default,
    Image: _Image2.default,
    Rect: _Rectangle2.default,
    Polygon: _Polygon2.default
};
exports.version = version;
exports.utils = utils;
exports.Init = _Init2.default;
exports.Image = _Image2.default;
exports.Rect = _Rectangle2.default;
exports.Polygon = _Polygon2.default;
exports.default = inMark;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(391);

__webpack_require__(393);

__webpack_require__(192);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(116)))

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(199);
module.exports = __webpack_require__(22).RegExp.escape;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(68);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(29);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(41);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(60);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(61)('native-function-to-string', Function.toString);


/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(198)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(130) });

__webpack_require__(33)('copyWithin');


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(24)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(90) });

__webpack_require__(33)('fill');


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(24)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(24)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(141);
var isArrayIter = __webpack_require__(98);
var toLength = __webpack_require__(7);
var createProperty = __webpack_require__(92);
var getIterFn = __webpack_require__(114);

$export($export.S + $export.F * !__webpack_require__(70)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(65)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(24)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(68) });


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(59) != Object || !__webpack_require__(24)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toInteger = __webpack_require__(25);
var toLength = __webpack_require__(7);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(24)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(24)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(92);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(132);

$export($export.P + $export.F * !__webpack_require__(24)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(132);

$export($export.P + $export.F * !__webpack_require__(24)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(96);
var cof = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(7);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(24)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(24)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('Array');


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(194);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(29);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(13)(proto, TO_PRIMITIVE, __webpack_require__(195));


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(133) });


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(18);
var HAS_INSTANCE = __webpack_require__(6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(10).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(8) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(144);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(102);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(101);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(143) });


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(144) });


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(102) });


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(101);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(101);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(16);
var cof = __webpack_require__(21);
var inheritIfRequired = __webpack_require__(97);
var toPrimitive = __webpack_require__(29);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(40).f;
var gOPD = __webpack_require__(17).f;
var dP = __webpack_require__(10).f;
var $trim = __webpack_require__(51).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(39)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(8) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(14)(global, NUMBER, $Number);
}


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(140) });


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(140);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(152);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(153);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(25);
var aNumberValue = __webpack_require__(129);
var repeat = __webpack_require__(109);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(129);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(146) });


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(39) });


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperties: __webpack_require__(147) });


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(35).onFreeze;

__webpack_require__(28)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(28)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(28)('getOwnPropertyNames', function () {
  return __webpack_require__(148).f;
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(18);

__webpack_require__(28)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(156) });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(41);

__webpack_require__(28)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(35).onFreeze;

__webpack_require__(28)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(35).onFreeze;

__webpack_require__(28)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(106).set });


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(152);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(153);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var global = __webpack_require__(2);
var ctx = __webpack_require__(23);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(37);
var forOf = __webpack_require__(38);
var speciesConstructor = __webpack_require__(62);
var task = __webpack_require__(111).set;
var microtask = __webpack_require__(103)();
var newPromiseCapabilityModule = __webpack_require__(104);
var perform = __webpack_require__(154);
var userAgent = __webpack_require__(78);
var promiseResolve = __webpack_require__(155);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(43)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(50)($Promise, PROMISE);
__webpack_require__(44)(PROMISE);
Wrapper = __webpack_require__(22)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(70)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(39);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(133);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(10);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(29);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(17).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(99)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(17);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(18);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(151) });


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(106);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(10);
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(42);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(97);
var dP = __webpack_require__(10).f;
var gOPN = __webpack_require__(40).f;
var isRegExp = __webpack_require__(69);
var $flags = __webpack_require__(58);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(8) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(14)(global, 'RegExp', $RegExp);
}

__webpack_require__(44)('RegExp');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(7);
var advanceStringIndex = __webpack_require__(89);
var regExpExec = __webpack_require__(73);

// @@match logic
__webpack_require__(67)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(7);
var toInteger = __webpack_require__(25);
var advanceStringIndex = __webpack_require__(89);
var regExpExec = __webpack_require__(73);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(67)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var sameValue = __webpack_require__(156);
var regExpExec = __webpack_require__(73);

// @@search logic
__webpack_require__(67)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(69);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(62);
var advanceStringIndex = __webpack_require__(89);
var toLength = __webpack_require__(7);
var callRegExpExec = __webpack_require__(73);
var regexpExec = __webpack_require__(105);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(67)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(162);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(58);
var DESCRIPTORS = __webpack_require__(8);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(15)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(15)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(15)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(15)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(76)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(7);
var context = __webpack_require__(108);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(95)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(15)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(15)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(15)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(45);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(108);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(95)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(15)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(76)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(100)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(15)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(7);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(109)
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(15)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(7);
var context = __webpack_require__(108);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(95)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(15)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(15)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(15)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(51)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var META = __webpack_require__(35).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(61);
var setToStringTag = __webpack_require__(50);
var uid = __webpack_require__(46);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(159);
var wksDefine = __webpack_require__(113);
var enumKeys = __webpack_require__(196);
var isArray = __webpack_require__(68);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toObject = __webpack_require__(11);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(29);
var createDesc = __webpack_require__(42);
var _create = __webpack_require__(39);
var gOPNExt = __webpack_require__(148);
var $GOPD = __webpack_require__(17);
var $GOPS = __webpack_require__(72);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(41);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(40).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(60).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(34)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(77);
var buffer = __webpack_require__(112);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(45);
var toLength = __webpack_require__(7);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(62);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(44)(ARRAY_BUFFER);


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(77).ABV, {
  DataView: __webpack_require__(112).DataView
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(136);
var validate = __webpack_require__(47);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(66)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(137);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(7);
var aFunction = __webpack_require__(12);
var arraySpeciesCreate = __webpack_require__(91);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(33)('flatMap');


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(137);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(7);
var toInteger = __webpack_require__(25);
var arraySpeciesCreate = __webpack_require__(91);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(33)('flatten');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(65)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(33)('includes');


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(103)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(74)('Map');


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(75)('Map');


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(135)('Map') });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(145);
var fround = __webpack_require__(143);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(145) });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(10);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(8) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(10);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(8) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(150)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(151);
var toIObject = __webpack_require__(19);
var gOPD = __webpack_require__(17);
var createProperty = __webpack_require__(92);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(29);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(29);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(8) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(150)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(22);
var microtask = __webpack_require__(103)();
var OBSERVABLE = __webpack_require__(6)('observable');
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(37);
var redefineAll = __webpack_require__(43);
var hide = __webpack_require__(13);
var forOf = __webpack_require__(38);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(44)('Observable');


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(22);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(62);
var promiseResolve = __webpack_require__(155);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(104);
var perform = __webpack_require__(154);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(163);
var from = __webpack_require__(131);
var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(74)('Set');


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(75)('Set');


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(135)('Set') });


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(76)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(27);
var toLength = __webpack_require__(7);
var isRegExp = __webpack_require__(69);
var getFlags = __webpack_require__(58);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(99)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(157);
var userAgent = __webpack_require__(78);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(157);
var userAgent = __webpack_require__(78);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(51)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(51)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113)('asyncIterator');


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113)('observable');


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(74)('WeakMap');


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(75)('WeakMap');


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(74)('WeakSet');


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(75)('WeakSet');


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(115);
var getKeys = __webpack_require__(41);
var redefine = __webpack_require__(14);
var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(49);
var wks = __webpack_require__(6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(111);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(78);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(319);
__webpack_require__(258);
__webpack_require__(260);
__webpack_require__(259);
__webpack_require__(262);
__webpack_require__(264);
__webpack_require__(269);
__webpack_require__(263);
__webpack_require__(261);
__webpack_require__(271);
__webpack_require__(270);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(265);
__webpack_require__(257);
__webpack_require__(268);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(225);
__webpack_require__(227);
__webpack_require__(226);
__webpack_require__(275);
__webpack_require__(274);
__webpack_require__(245);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(306);
__webpack_require__(311);
__webpack_require__(318);
__webpack_require__(309);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(307);
__webpack_require__(312);
__webpack_require__(314);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(308);
__webpack_require__(310);
__webpack_require__(313);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(220);
__webpack_require__(222);
__webpack_require__(221);
__webpack_require__(224);
__webpack_require__(223);
__webpack_require__(209);
__webpack_require__(207);
__webpack_require__(213);
__webpack_require__(210);
__webpack_require__(216);
__webpack_require__(218);
__webpack_require__(206);
__webpack_require__(212);
__webpack_require__(203);
__webpack_require__(217);
__webpack_require__(201);
__webpack_require__(215);
__webpack_require__(214);
__webpack_require__(208);
__webpack_require__(211);
__webpack_require__(200);
__webpack_require__(202);
__webpack_require__(205);
__webpack_require__(204);
__webpack_require__(219);
__webpack_require__(115);
__webpack_require__(291);
__webpack_require__(161);
__webpack_require__(296);
__webpack_require__(162);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(276);
__webpack_require__(160);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(331);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(326);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(324);
__webpack_require__(327);
__webpack_require__(325);
__webpack_require__(328);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(284);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(290);
__webpack_require__(289);
__webpack_require__(334);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(375);
__webpack_require__(378);
__webpack_require__(377);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(376);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(356);
__webpack_require__(359);
__webpack_require__(355);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(340);
__webpack_require__(374);
__webpack_require__(339);
__webpack_require__(373);
__webpack_require__(385);
__webpack_require__(387);
__webpack_require__(338);
__webpack_require__(372);
__webpack_require__(384);
__webpack_require__(386);
__webpack_require__(337);
__webpack_require__(383);
__webpack_require__(336);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(347);
__webpack_require__(346);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(352);
__webpack_require__(351);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(366);
__webpack_require__(365);
__webpack_require__(368);
__webpack_require__(367);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(335);
__webpack_require__(360);
__webpack_require__(390);
__webpack_require__(389);
__webpack_require__(388);
module.exports = __webpack_require__(22);


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(116)))

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(5);

var vec2 = __webpack_require__(20);

var Draggable = __webpack_require__(430);

var Eventful = __webpack_require__(85);

var eventTool = __webpack_require__(82);

var GestureMgr = __webpack_require__(407);

/**
 * [The interface between `Handler` and `HandlerProxy`]:
 *
 * The default `HandlerProxy` only support the common standard web environment
 * (e.g., standalone browser, headless browser, embed browser in mobild APP, ...).
 * But `HandlerProxy` can be replaced to support more non-standard environment
 * (e.g., mini app), or to support more feature that the default `HandlerProxy`
 * not provided (like echarts-gl did).
 * So the interface between `Handler` and `HandlerProxy` should be stable. Do not
 * make break changes util inevitable. The interface include the public methods
 * of `Handler` and the events listed in `handlerNames` below, by which `HandlerProxy`
 * drives `Handler`.
 */

/**
 * [Drag outside]:
 *
 * That is, triggering `mousemove` and `mouseup` event when the pointer is out of the
 * zrender area when dragging. That is important for the improvement of the user experience
 * when dragging something near the boundary without being terminated unexpectedly.
 *
 * We originally consider to introduce new events like `pagemovemove` and `pagemouseup`
 * to resolve this issue. But some drawbacks of it is described in
 * https://github.com/ecomfe/zrender/pull/536#issuecomment-560286899
 *
 * Instead, we referenced the specifications:
 * https://www.w3.org/TR/touch-events/#the-touchmove-event
 * https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#event-type-mousemove
 * where the the mousemove/touchmove can be continue to fire if the user began a drag
 * operation and the pointer has left the boundary. (for the mouse event, browsers
 * only do it on `document` and when the pointer has left the boundary of the browser.)
 *
 * So the default `HandlerProxy` supports this feature similarly: if it is in the dragging
 * state (see `pointerCapture` in `HandlerProxy`), the `mousemove` and `mouseup` continue
 * to fire until release the pointer. That is implemented by listen to those event on
 * `document`.
 * If we implement some other `HandlerProxy` only for touch device, that would be easier.
 * The touch event support this feature by default.
 *
 * Note:
 * There might be some cases that the mouse event can not be
 * received on `document`. For example,
 * (A) `useCapture` is not supported and some user defined event listeners on the ancestor
 * of zr dom throw Error .
 * (B) `useCapture` is not supported Some user defined event listeners on the ancestor of
 * zr dom call `stopPropagation`.
 * In these cases, the `mousemove` event might be keep triggered event
 * if the mouse is released. We try to reduce the side-effect in those cases.
 * That is, do nothing (especially, `findHover`) in those cases. See `isOutsideBoundary`.
 *
 * Note:
 * If `HandlerProxy` listens to `document` with `useCapture`, `HandlerProxy` needs to
 * make sure `stopPropagation` and `preventDefault` doing nothing if and only if the event
 * target is not zrender dom. Becuase it is dangerous to enable users to call them in
 * `document` capture phase to prevent the propagation to any listener of the webpage.
 * But they are needed to work when the pointer inside the zrender dom.
 */
var SILENT = 'silent';

function makeEventPacket(eveType, targetInfo, event) {
  return {
    type: eveType,
    event: event,
    // target can only be an element that is not silent.
    target: targetInfo.target,
    // topTarget can be a silent element.
    topTarget: targetInfo.topTarget,
    cancelBubble: false,
    offsetX: event.zrX,
    offsetY: event.zrY,
    gestureEvent: event.gestureEvent,
    pinchX: event.pinchX,
    pinchY: event.pinchY,
    pinchScale: event.pinchScale,
    wheelDelta: event.zrDelta,
    zrByTouch: event.zrByTouch,
    which: event.which,
    stop: stopEvent
  };
}

function stopEvent() {
  eventTool.stop(this.event);
}

function EmptyProxy() {}

EmptyProxy.prototype.dispose = function () {};

var handlerNames = ['click', 'dblclick', 'mousewheel', 'mouseout', 'mouseup', 'mousedown', 'mousemove', 'contextmenu'];
/**
 * @alias module:zrender/Handler
 * @constructor
 * @extends module:zrender/mixin/Eventful
 * @param {module:zrender/Storage} storage Storage instance.
 * @param {module:zrender/Painter} painter Painter instance.
 * @param {module:zrender/dom/HandlerProxy} proxy HandlerProxy instance.
 * @param {HTMLElement} painterRoot painter.root (not painter.getViewportRoot()).
 */

var Handler = function (storage, painter, proxy, painterRoot) {
  Eventful.call(this);
  this.storage = storage;
  this.painter = painter;
  this.painterRoot = painterRoot;
  proxy = proxy || new EmptyProxy();
  /**
   * Proxy of event. can be Dom, WebGLSurface, etc.
   */

  this.proxy = null;
  /**
   * {target, topTarget, x, y}
   * @private
   * @type {Object}
   */

  this._hovered = {};
  /**
   * @private
   * @type {Date}
   */

  this._lastTouchMoment;
  /**
   * @private
   * @type {number}
   */

  this._lastX;
  /**
   * @private
   * @type {number}
   */

  this._lastY;
  /**
   * @private
   * @type {module:zrender/core/GestureMgr}
   */

  this._gestureMgr;
  Draggable.call(this);
  this.setHandlerProxy(proxy);
};

Handler.prototype = {
  constructor: Handler,
  setHandlerProxy: function (proxy) {
    if (this.proxy) {
      this.proxy.dispose();
    }

    if (proxy) {
      util.each(handlerNames, function (name) {
        proxy.on && proxy.on(name, this[name], this);
      }, this); // Attach handler

      proxy.handler = this;
    }

    this.proxy = proxy;
  },
  mousemove: function (event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var lastHovered = this._hovered;
    var lastHoveredTarget = lastHovered.target; // If lastHoveredTarget is removed from zr (detected by '__zr') by some API call
    // (like 'setOption' or 'dispatchAction') in event handlers, we should find
    // lastHovered again here. Otherwise 'mouseout' can not be triggered normally.
    // See #6198.

    if (lastHoveredTarget && !lastHoveredTarget.__zr) {
      lastHovered = this.findHover(lastHovered.x, lastHovered.y);
      lastHoveredTarget = lastHovered.target;
    }

    var hovered = this._hovered = isOutside ? {
      x: x,
      y: y
    } : this.findHover(x, y);
    var hoveredTarget = hovered.target;
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default'); // Mouse out on previous hovered element

    if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(lastHovered, 'mouseout', event);
    } // Mouse moving on one element


    this.dispatchToElement(hovered, 'mousemove', event); // Mouse over on a new element

    if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(hovered, 'mouseover', event);
    }
  },
  mouseout: function (event) {
    var eventControl = event.zrEventControl;
    var zrIsToLocalDOM = event.zrIsToLocalDOM;

    if (eventControl !== 'only_globalout') {
      this.dispatchToElement(this._hovered, 'mouseout', event);
    }

    if (eventControl !== 'no_globalout') {
      // FIXME: if the pointer moving from the extra doms to realy "outside",
      // the `globalout` should have been triggered. But currently not.
      !zrIsToLocalDOM && this.trigger('globalout', {
        type: 'globalout',
        event: event
      });
    }
  },

  /**
   * Resize
   */
  resize: function (event) {
    this._hovered = {};
  },

  /**
   * Dispatch event
   * @param {string} eventName
   * @param {event=} eventArgs
   */
  dispatch: function (eventName, eventArgs) {
    var handler = this[eventName];
    handler && handler.call(this, eventArgs);
  },

  /**
   * Dispose
   */
  dispose: function () {
    this.proxy.dispose();
    this.storage = this.proxy = this.painter = null;
  },

  /**
   * 设置默认的cursor style
   * @param {string} [cursorStyle='default'] 例如 crosshair
   */
  setCursorStyle: function (cursorStyle) {
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(cursorStyle);
  },

  /**
   * 事件分发代理
   *
   * @private
   * @param {Object} targetInfo {target, topTarget} 目标图形元素
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   */
  dispatchToElement: function (targetInfo, eventName, event) {
    targetInfo = targetInfo || {};
    var el = targetInfo.target;

    if (el && el.silent) {
      return;
    }

    var eventHandler = 'on' + eventName;
    var eventPacket = makeEventPacket(eventName, targetInfo, event);

    while (el) {
      el[eventHandler] && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));
      el.trigger(eventName, eventPacket);
      el = el.parent;

      if (eventPacket.cancelBubble) {
        break;
      }
    }

    if (!eventPacket.cancelBubble) {
      // 冒泡到顶级 zrender 对象
      this.trigger(eventName, eventPacket); // 分发事件到用户自定义层
      // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在

      this.painter && this.painter.eachOtherLayer(function (layer) {
        if (typeof layer[eventHandler] === 'function') {
          layer[eventHandler].call(layer, eventPacket);
        }

        if (layer.trigger) {
          layer.trigger(eventName, eventPacket);
        }
      });
    }
  },

  /**
   * @private
   * @param {number} x
   * @param {number} y
   * @param {module:zrender/graphic/Displayable} exclude
   * @return {model:zrender/Element}
   * @method
   */
  findHover: function (x, y, exclude) {
    var list = this.storage.getDisplayList();
    var out = {
      x: x,
      y: y
    };

    for (var i = list.length - 1; i >= 0; i--) {
      var hoverCheckResult;

      if (list[i] !== exclude // getDisplayList may include ignored item in VML mode
      && !list[i].ignore && (hoverCheckResult = isHover(list[i], x, y))) {
        !out.topTarget && (out.topTarget = list[i]);

        if (hoverCheckResult !== SILENT) {
          out.target = list[i];
          break;
        }
      }
    }

    return out;
  },
  processGesture: function (event, stage) {
    if (!this._gestureMgr) {
      this._gestureMgr = new GestureMgr();
    }

    var gestureMgr = this._gestureMgr;
    stage === 'start' && gestureMgr.clear();
    var gestureInfo = gestureMgr.recognize(event, this.findHover(event.zrX, event.zrY, null).target, this.proxy.dom);
    stage === 'end' && gestureMgr.clear(); // Do not do any preventDefault here. Upper application do that if necessary.

    if (gestureInfo) {
      var type = gestureInfo.type;
      event.gestureEvent = type;
      this.dispatchToElement({
        target: gestureInfo.target
      }, type, gestureInfo.event);
    }
  }
}; // Common handlers

util.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
  Handler.prototype[name] = function (event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var hovered;
    var hoveredTarget;

    if (name !== 'mouseup' || !isOutside) {
      // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
      hovered = this.findHover(x, y);
      hoveredTarget = hovered.target;
    }

    if (name === 'mousedown') {
      this._downEl = hoveredTarget;
      this._downPoint = [event.zrX, event.zrY]; // In case click triggered before mouseup

      this._upEl = hoveredTarget;
    } else if (name === 'mouseup') {
      this._upEl = hoveredTarget;
    } else if (name === 'click') {
      if (this._downEl !== this._upEl // Original click event is triggered on the whole canvas element,
      // including the case that `mousedown` - `mousemove` - `mouseup`,
      // which should be filtered, otherwise it will bring trouble to
      // pan and zoom.
      || !this._downPoint // Arbitrary value
      || vec2.dist(this._downPoint, [event.zrX, event.zrY]) > 4) {
        return;
      }

      this._downPoint = null;
    }

    this.dispatchToElement(hovered, name, event);
  };
});

function isHover(displayable, x, y) {
  if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
    var el = displayable;
    var isSilent;

    while (el) {
      // If clipped by ancestor.
      // FIXME: If clipPath has neither stroke nor fill,
      // el.clipPath.contain(x, y) will always return false.
      if (el.clipPath && !el.clipPath.contain(x, y)) {
        return false;
      }

      if (el.silent) {
        isSilent = true;
      }

      el = el.parent;
    }

    return isSilent ? SILENT : true;
  }

  return false;
}
/**
 * See [Drag outside].
 */


function isOutsideBoundary(handlerInstance, x, y) {
  var painter = handlerInstance.painter;
  return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}

util.mixin(Handler, Eventful);
util.mixin(Handler, Draggable);
var _default = Handler;
module.exports = _default;

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(5);

var _config = __webpack_require__(80);

var devicePixelRatio = _config.devicePixelRatio;

var Style = __webpack_require__(120);

var Pattern = __webpack_require__(119);

/**
 * @module zrender/Layer
 * @author pissang(https://www.github.com/pissang)
 */
function returnFalse() {
  return false;
}
/**
 * 创建dom
 *
 * @inner
 * @param {string} id dom id 待用
 * @param {Painter} painter painter instance
 * @param {number} number
 */


function createDom(id, painter, dpr) {
  var newDom = util.createCanvas();
  var width = painter.getWidth();
  var height = painter.getHeight();
  var newDomStyle = newDom.style;

  if (newDomStyle) {
    // In node or some other non-browser environment
    newDomStyle.position = 'absolute';
    newDomStyle.left = 0;
    newDomStyle.top = 0;
    newDomStyle.width = width + 'px';
    newDomStyle.height = height + 'px';
    newDom.setAttribute('data-zr-dom-id', id);
  }

  newDom.width = width * dpr;
  newDom.height = height * dpr;
  return newDom;
}
/**
 * @alias module:zrender/Layer
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @param {string} id
 * @param {module:zrender/Painter} painter
 * @param {number} [dpr]
 */


var Layer = function (id, painter, dpr) {
  var dom;
  dpr = dpr || devicePixelRatio;

  if (typeof id === 'string') {
    dom = createDom(id, painter, dpr);
  } // Not using isDom because in node it will return false
  else if (util.isObject(id)) {
      dom = id;
      id = dom.id;
    }

  this.id = id;
  this.dom = dom;
  var domStyle = dom.style;

  if (domStyle) {
    // Not in node
    dom.onselectstart = returnFalse; // 避免页面选中的尴尬

    domStyle['-webkit-user-select'] = 'none';
    domStyle['user-select'] = 'none';
    domStyle['-webkit-touch-callout'] = 'none';
    domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
    domStyle['padding'] = 0; // eslint-disable-line dot-notation

    domStyle['margin'] = 0; // eslint-disable-line dot-notation

    domStyle['border-width'] = 0;
  }

  this.domBack = null;
  this.ctxBack = null;
  this.painter = painter;
  this.config = null; // Configs

  /**
   * 每次清空画布的颜色
   * @type {string}
   * @default 0
   */

  this.clearColor = 0;
  /**
   * 是否开启动态模糊
   * @type {boolean}
   * @default false
   */

  this.motionBlur = false;
  /**
   * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
   * @type {number}
   * @default 0.7
   */

  this.lastFrameAlpha = 0.7;
  /**
   * Layer dpr
   * @type {number}
   */

  this.dpr = dpr;
};

Layer.prototype = {
  constructor: Layer,
  __dirty: true,
  __used: false,
  __drawIndex: 0,
  __startIndex: 0,
  __endIndex: 0,
  incremental: false,
  getElementCount: function () {
    return this.__endIndex - this.__startIndex;
  },
  initContext: function () {
    this.ctx = this.dom.getContext('2d');
    this.ctx.dpr = this.dpr;
  },
  createBackBuffer: function () {
    var dpr = this.dpr;
    this.domBack = createDom('back-' + this.id, this.painter, dpr);
    this.ctxBack = this.domBack.getContext('2d');

    if (dpr !== 1) {
      this.ctxBack.scale(dpr, dpr);
    }
  },

  /**
   * @param  {number} width
   * @param  {number} height
   */
  resize: function (width, height) {
    var dpr = this.dpr;
    var dom = this.dom;
    var domStyle = dom.style;
    var domBack = this.domBack;

    if (domStyle) {
      domStyle.width = width + 'px';
      domStyle.height = height + 'px';
    }

    dom.width = width * dpr;
    dom.height = height * dpr;

    if (domBack) {
      domBack.width = width * dpr;
      domBack.height = height * dpr;

      if (dpr !== 1) {
        this.ctxBack.scale(dpr, dpr);
      }
    }
  },

  /**
   * 清空该层画布
   * @param {boolean} [clearAll]=false Clear all with out motion blur
   * @param {Color} [clearColor]
   */
  clear: function (clearAll, clearColor) {
    var dom = this.dom;
    var ctx = this.ctx;
    var width = dom.width;
    var height = dom.height;
    var clearColor = clearColor || this.clearColor;
    var haveMotionBLur = this.motionBlur && !clearAll;
    var lastFrameAlpha = this.lastFrameAlpha;
    var dpr = this.dpr;

    if (haveMotionBLur) {
      if (!this.domBack) {
        this.createBackBuffer();
      }

      this.ctxBack.globalCompositeOperation = 'copy';
      this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
    }

    ctx.clearRect(0, 0, width, height);

    if (clearColor && clearColor !== 'transparent') {
      var clearColorGradientOrPattern; // Gradient

      if (clearColor.colorStops) {
        // Cache canvas gradient
        clearColorGradientOrPattern = clearColor.__canvasGradient || Style.getGradient(ctx, clearColor, {
          x: 0,
          y: 0,
          width: width,
          height: height
        });
        clearColor.__canvasGradient = clearColorGradientOrPattern;
      } // Pattern
      else if (clearColor.image) {
          clearColorGradientOrPattern = Pattern.prototype.getCanvasPattern.call(clearColor, ctx);
        }

      ctx.save();
      ctx.fillStyle = clearColorGradientOrPattern || clearColor;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    if (haveMotionBLur) {
      var domBack = this.domBack;
      ctx.save();
      ctx.globalAlpha = lastFrameAlpha;
      ctx.drawImage(domBack, 0, 0, width, height);
      ctx.restore();
    }
  }
};
var _default = Layer;
module.exports = _default;

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__(80);

var devicePixelRatio = _config.devicePixelRatio;

var util = __webpack_require__(5);

var logError = __webpack_require__(63);

var BoundingRect = __webpack_require__(30);

var timsort = __webpack_require__(171);

var Layer = __webpack_require__(395);

var requestAnimationFrame = __webpack_require__(167);

var Image = __webpack_require__(55);

var env = __webpack_require__(36);

var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 0.001;

function parseInt10(val) {
  return parseInt(val, 10);
}

function isLayerValid(layer) {
  if (!layer) {
    return false;
  }

  if (layer.__builtin__) {
    return true;
  }

  if (typeof layer.resize !== 'function' || typeof layer.refresh !== 'function') {
    return false;
  }

  return true;
}

var tmpRect = new BoundingRect(0, 0, 0, 0);
var viewRect = new BoundingRect(0, 0, 0, 0);

function isDisplayableCulled(el, width, height) {
  tmpRect.copy(el.getBoundingRect());

  if (el.transform) {
    tmpRect.applyTransform(el.transform);
  }

  viewRect.width = width;
  viewRect.height = height;
  return !tmpRect.intersect(viewRect);
}

function isClipPathChanged(clipPaths, prevClipPaths) {
  // displayable.__clipPaths can only be `null`/`undefined` or an non-empty array.
  if (clipPaths === prevClipPaths) {
    return false;
  }

  if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length) {
    return true;
  }

  for (var i = 0; i < clipPaths.length; i++) {
    if (clipPaths[i] !== prevClipPaths[i]) {
      return true;
    }
  }

  return false;
}

function doClip(clipPaths, ctx) {
  for (var i = 0; i < clipPaths.length; i++) {
    var clipPath = clipPaths[i];
    clipPath.setTransform(ctx);
    ctx.beginPath();
    clipPath.buildPath(ctx, clipPath.shape);
    ctx.clip(); // Transform back

    clipPath.restoreTransform(ctx);
  }
}

function createRoot(width, height) {
  var domRoot = document.createElement('div'); // domRoot.onselectstart = returnFalse; // Avoid page selected

  domRoot.style.cssText = ['position:relative', // IOS13 safari probably has a compositing bug (z order of the canvas and the consequent
  // dom does not act as expected) when some of the parent dom has
  // `-webkit-overflow-scrolling: touch;` and the webpage is longer than one screen and
  // the canvas is not at the top part of the page.
  // Check `https://bugs.webkit.org/show_bug.cgi?id=203681` for more details. We remove
  // this `overflow:hidden` to avoid the bug.
  // 'overflow:hidden',
  'width:' + width + 'px', 'height:' + height + 'px', 'padding:0', 'margin:0', 'border-width:0'].join(';') + ';';
  return domRoot;
}
/**
 * @alias module:zrender/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */


var Painter = function (root, storage, opts) {
  this.type = 'canvas'; // In node environment using node-canvas

  var singleCanvas = !root.nodeName // In node ?
  || root.nodeName.toUpperCase() === 'CANVAS';
  this._opts = opts = util.extend({}, opts || {});
  /**
   * @type {number}
   */

  this.dpr = opts.devicePixelRatio || devicePixelRatio;
  /**
   * @type {boolean}
   * @private
   */

  this._singleCanvas = singleCanvas;
  /**
   * 绘图容器
   * @type {HTMLElement}
   */

  this.root = root;
  var rootStyle = root.style;

  if (rootStyle) {
    rootStyle['-webkit-tap-highlight-color'] = 'transparent';
    rootStyle['-webkit-user-select'] = rootStyle['user-select'] = rootStyle['-webkit-touch-callout'] = 'none';
    root.innerHTML = '';
  }
  /**
   * @type {module:zrender/Storage}
   */


  this.storage = storage;
  /**
   * @type {Array.<number>}
   * @private
   */

  var zlevelList = this._zlevelList = [];
  /**
   * @type {Object.<string, module:zrender/Layer>}
   * @private
   */

  var layers = this._layers = {};
  /**
   * @type {Object.<string, Object>}
   * @private
   */

  this._layerConfig = {};
  /**
   * zrender will do compositing when root is a canvas and have multiple zlevels.
   */

  this._needsManuallyCompositing = false;

  if (!singleCanvas) {
    this._width = this._getSize(0);
    this._height = this._getSize(1);
    var domRoot = this._domRoot = createRoot(this._width, this._height);
    root.appendChild(domRoot);
  } else {
    var width = root.width;
    var height = root.height;

    if (opts.width != null) {
      width = opts.width;
    }

    if (opts.height != null) {
      height = opts.height;
    }

    this.dpr = opts.devicePixelRatio || 1; // Use canvas width and height directly

    root.width = width * this.dpr;
    root.height = height * this.dpr;
    this._width = width;
    this._height = height; // Create layer if only one given canvas
    // Device can be specified to create a high dpi image.

    var mainLayer = new Layer(root, this, this.dpr);
    mainLayer.__builtin__ = true;
    mainLayer.initContext(); // FIXME Use canvas width and height
    // mainLayer.resize(width, height);

    layers[CANVAS_ZLEVEL] = mainLayer;
    mainLayer.zlevel = CANVAS_ZLEVEL; // Not use common zlevel.

    zlevelList.push(CANVAS_ZLEVEL);
    this._domRoot = root;
  }
  /**
   * @type {module:zrender/Layer}
   * @private
   */


  this._hoverlayer = null;
  this._hoverElements = [];
};

Painter.prototype = {
  constructor: Painter,
  getType: function () {
    return 'canvas';
  },

  /**
   * If painter use a single canvas
   * @return {boolean}
   */
  isSingleCanvas: function () {
    return this._singleCanvas;
  },

  /**
   * @return {HTMLDivElement}
   */
  getViewportRoot: function () {
    return this._domRoot;
  },
  getViewportRootOffset: function () {
    var viewportRoot = this.getViewportRoot();

    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  },

  /**
   * 刷新
   * @param {boolean} [paintAll=false] 强制绘制所有displayable
   */
  refresh: function (paintAll) {
    var list = this.storage.getDisplayList(true);
    var zlevelList = this._zlevelList;
    this._redrawId = Math.random();

    this._paintList(list, paintAll, this._redrawId); // Paint custum layers


    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      var layer = this._layers[z];

      if (!layer.__builtin__ && layer.refresh) {
        var clearColor = i === 0 ? this._backgroundColor : null;
        layer.refresh(clearColor);
      }
    }

    this.refreshHover();
    return this;
  },
  addHover: function (el, hoverStyle) {
    if (el.__hoverMir) {
      return;
    }

    var elMirror = new el.constructor({
      style: el.style,
      shape: el.shape,
      z: el.z,
      z2: el.z2,
      silent: el.silent
    });
    elMirror.__from = el;
    el.__hoverMir = elMirror;
    hoverStyle && elMirror.setStyle(hoverStyle);

    this._hoverElements.push(elMirror);

    return elMirror;
  },
  removeHover: function (el) {
    var elMirror = el.__hoverMir;
    var hoverElements = this._hoverElements;
    var idx = util.indexOf(hoverElements, elMirror);

    if (idx >= 0) {
      hoverElements.splice(idx, 1);
    }

    el.__hoverMir = null;
  },
  clearHover: function (el) {
    var hoverElements = this._hoverElements;

    for (var i = 0; i < hoverElements.length; i++) {
      var from = hoverElements[i].__from;

      if (from) {
        from.__hoverMir = null;
      }
    }

    hoverElements.length = 0;
  },
  refreshHover: function () {
    var hoverElements = this._hoverElements;
    var len = hoverElements.length;
    var hoverLayer = this._hoverlayer;
    hoverLayer && hoverLayer.clear();

    if (!len) {
      return;
    }

    timsort(hoverElements, this.storage.displayableSortFunc); // Use a extream large zlevel
    // FIXME?

    if (!hoverLayer) {
      hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
    }

    var scope = {};
    hoverLayer.ctx.save();

    for (var i = 0; i < len;) {
      var el = hoverElements[i];
      var originalEl = el.__from; // Original el is removed
      // PENDING

      if (!(originalEl && originalEl.__zr)) {
        hoverElements.splice(i, 1);
        originalEl.__hoverMir = null;
        len--;
        continue;
      }

      i++; // Use transform
      // FIXME style and shape ?

      if (!originalEl.invisible) {
        el.transform = originalEl.transform;
        el.invTransform = originalEl.invTransform;
        el.__clipPaths = originalEl.__clipPaths; // el.

        this._doPaintEl(el, hoverLayer, true, scope);
      }
    }

    hoverLayer.ctx.restore();
  },
  getHoverLayer: function () {
    return this.getLayer(HOVER_LAYER_ZLEVEL);
  },
  _paintList: function (list, paintAll, redrawId) {
    if (this._redrawId !== redrawId) {
      return;
    }

    paintAll = paintAll || false;

    this._updateLayerStatus(list);

    var finished = this._doPaintList(list, paintAll);

    if (this._needsManuallyCompositing) {
      this._compositeManually();
    }

    if (!finished) {
      var self = this;
      requestAnimationFrame(function () {
        self._paintList(list, paintAll, redrawId);
      });
    }
  },
  _compositeManually: function () {
    var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
    var width = this._domRoot.width;
    var height = this._domRoot.height;
    ctx.clearRect(0, 0, width, height); // PENDING, If only builtin layer?

    this.eachBuiltinLayer(function (layer) {
      if (layer.virtual) {
        ctx.drawImage(layer.dom, 0, 0, width, height);
      }
    });
  },
  _doPaintList: function (list, paintAll) {
    var layerList = [];

    for (var zi = 0; zi < this._zlevelList.length; zi++) {
      var zlevel = this._zlevelList[zi];
      var layer = this._layers[zlevel];

      if (layer.__builtin__ && layer !== this._hoverlayer && (layer.__dirty || paintAll)) {
        layerList.push(layer);
      }
    }

    var finished = true;

    for (var k = 0; k < layerList.length; k++) {
      var layer = layerList[k];
      var ctx = layer.ctx;
      var scope = {};
      ctx.save();
      var start = paintAll ? layer.__startIndex : layer.__drawIndex;
      var useTimer = !paintAll && layer.incremental && Date.now;
      var startTime = useTimer && Date.now();
      var clearColor = layer.zlevel === this._zlevelList[0] ? this._backgroundColor : null; // All elements in this layer are cleared.

      if (layer.__startIndex === layer.__endIndex) {
        layer.clear(false, clearColor);
      } else if (start === layer.__startIndex) {
        var firstEl = list[start];

        if (!firstEl.incremental || !firstEl.notClear || paintAll) {
          layer.clear(false, clearColor);
        }
      }

      if (start === -1) {
        console.error('For some unknown reason. drawIndex is -1');
        start = layer.__startIndex;
      }

      for (var i = start; i < layer.__endIndex; i++) {
        var el = list[i];

        this._doPaintEl(el, layer, paintAll, scope);

        el.__dirty = el.__dirtyText = false;

        if (useTimer) {
          // Date.now can be executed in 13,025,305 ops/second.
          var dTime = Date.now() - startTime; // Give 15 millisecond to draw.
          // The rest elements will be drawn in the next frame.

          if (dTime > 15) {
            break;
          }
        }
      }

      layer.__drawIndex = i;

      if (layer.__drawIndex < layer.__endIndex) {
        finished = false;
      }

      if (scope.prevElClipPaths) {
        // Needs restore the state. If last drawn element is in the clipping area.
        ctx.restore();
      }

      ctx.restore();
    }

    if (env.wxa) {
      // Flush for weixin application
      util.each(this._layers, function (layer) {
        if (layer && layer.ctx && layer.ctx.draw) {
          layer.ctx.draw();
        }
      });
    }

    return finished;
  },
  _doPaintEl: function (el, currentLayer, forcePaint, scope) {
    var ctx = currentLayer.ctx;
    var m = el.transform;

    if ((currentLayer.__dirty || forcePaint) && // Ignore invisible element
    !el.invisible // Ignore transparent element
    && el.style.opacity !== 0 // Ignore scale 0 element, in some environment like node-canvas
    // Draw a scale 0 element can cause all following draw wrong
    // And setTransform with scale 0 will cause set back transform failed.
    && !(m && !m[0] && !m[3]) // Ignore culled element
    && !(el.culling && isDisplayableCulled(el, this._width, this._height))) {
      var clipPaths = el.__clipPaths;
      var prevElClipPaths = scope.prevElClipPaths; // Optimize when clipping on group with several elements

      if (!prevElClipPaths || isClipPathChanged(clipPaths, prevElClipPaths)) {
        // If has previous clipping state, restore from it
        if (prevElClipPaths) {
          ctx.restore();
          scope.prevElClipPaths = null; // Reset prevEl since context has been restored

          scope.prevEl = null;
        } // New clipping state


        if (clipPaths) {
          ctx.save();
          doClip(clipPaths, ctx);
          scope.prevElClipPaths = clipPaths;
        }
      }

      el.beforeBrush && el.beforeBrush(ctx);
      el.brush(ctx, scope.prevEl || null);
      scope.prevEl = el;
      el.afterBrush && el.afterBrush(ctx);
    }
  },

  /**
   * 获取 zlevel 所在层，如果不存在则会创建一个新的层
   * @param {number} zlevel
   * @param {boolean} virtual Virtual layer will not be inserted into dom.
   * @return {module:zrender/Layer}
   */
  getLayer: function (zlevel, virtual) {
    if (this._singleCanvas && !this._needsManuallyCompositing) {
      zlevel = CANVAS_ZLEVEL;
    }

    var layer = this._layers[zlevel];

    if (!layer) {
      // Create a new layer
      layer = new Layer('zr_' + zlevel, this, this.dpr);
      layer.zlevel = zlevel;
      layer.__builtin__ = true;

      if (this._layerConfig[zlevel]) {
        util.merge(layer, this._layerConfig[zlevel], true);
      }

      if (virtual) {
        layer.virtual = virtual;
      }

      this.insertLayer(zlevel, layer); // Context is created after dom inserted to document
      // Or excanvas will get 0px clientWidth and clientHeight

      layer.initContext();
    }

    return layer;
  },
  insertLayer: function (zlevel, layer) {
    var layersMap = this._layers;
    var zlevelList = this._zlevelList;
    var len = zlevelList.length;
    var prevLayer = null;
    var i = -1;
    var domRoot = this._domRoot;

    if (layersMap[zlevel]) {
      logError('ZLevel ' + zlevel + ' has been used already');
      return;
    } // Check if is a valid layer


    if (!isLayerValid(layer)) {
      logError('Layer of zlevel ' + zlevel + ' is not valid');
      return;
    }

    if (len > 0 && zlevel > zlevelList[0]) {
      for (i = 0; i < len - 1; i++) {
        if (zlevelList[i] < zlevel && zlevelList[i + 1] > zlevel) {
          break;
        }
      }

      prevLayer = layersMap[zlevelList[i]];
    }

    zlevelList.splice(i + 1, 0, zlevel);
    layersMap[zlevel] = layer; // Vitual layer will not directly show on the screen.
    // (It can be a WebGL layer and assigned to a ZImage element)
    // But it still under management of zrender.

    if (!layer.virtual) {
      if (prevLayer) {
        var prevDom = prevLayer.dom;

        if (prevDom.nextSibling) {
          domRoot.insertBefore(layer.dom, prevDom.nextSibling);
        } else {
          domRoot.appendChild(layer.dom);
        }
      } else {
        if (domRoot.firstChild) {
          domRoot.insertBefore(layer.dom, domRoot.firstChild);
        } else {
          domRoot.appendChild(layer.dom);
        }
      }
    }
  },
  // Iterate each layer
  eachLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      cb.call(context, this._layers[z], z);
    }
  },
  // Iterate each buildin layer
  eachBuiltinLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var layer;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      layer = this._layers[z];

      if (layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  },
  // Iterate each other layer except buildin layer
  eachOtherLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var layer;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      layer = this._layers[z];

      if (!layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  },

  /**
   * 获取所有已创建的层
   * @param {Array.<module:zrender/Layer>} [prevLayer]
   */
  getLayers: function () {
    return this._layers;
  },
  _updateLayerStatus: function (list) {
    this.eachBuiltinLayer(function (layer, z) {
      layer.__dirty = layer.__used = false;
    });

    function updatePrevLayer(idx) {
      if (prevLayer) {
        if (prevLayer.__endIndex !== idx) {
          prevLayer.__dirty = true;
        }

        prevLayer.__endIndex = idx;
      }
    }

    if (this._singleCanvas) {
      for (var i = 1; i < list.length; i++) {
        var el = list[i];

        if (el.zlevel !== list[i - 1].zlevel || el.incremental) {
          this._needsManuallyCompositing = true;
          break;
        }
      }
    }

    var prevLayer = null;
    var incrementalLayerCount = 0;

    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var zlevel = el.zlevel;
      var layer; // PENDING If change one incremental element style ?
      // TODO Where there are non-incremental elements between incremental elements.

      if (el.incremental) {
        layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
        layer.incremental = true;
        incrementalLayerCount = 1;
      } else {
        layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
      }

      if (!layer.__builtin__) {
        logError('ZLevel ' + zlevel + ' has been used by unkown layer ' + layer.id);
      }

      if (layer !== prevLayer) {
        layer.__used = true;

        if (layer.__startIndex !== i) {
          layer.__dirty = true;
        }

        layer.__startIndex = i;

        if (!layer.incremental) {
          layer.__drawIndex = i;
        } else {
          // Mark layer draw index needs to update.
          layer.__drawIndex = -1;
        }

        updatePrevLayer(i);
        prevLayer = layer;
      }

      if (el.__dirty) {
        layer.__dirty = true;

        if (layer.incremental && layer.__drawIndex < 0) {
          // Start draw from the first dirty element.
          layer.__drawIndex = i;
        }
      }
    }

    updatePrevLayer(i);
    this.eachBuiltinLayer(function (layer, z) {
      // Used in last frame but not in this frame. Needs clear
      if (!layer.__used && layer.getElementCount() > 0) {
        layer.__dirty = true;
        layer.__startIndex = layer.__endIndex = layer.__drawIndex = 0;
      } // For incremental layer. In case start index changed and no elements are dirty.


      if (layer.__dirty && layer.__drawIndex < 0) {
        layer.__drawIndex = layer.__startIndex;
      }
    });
  },

  /**
   * 清除hover层外所有内容
   */
  clear: function () {
    this.eachBuiltinLayer(this._clearLayer);
    return this;
  },
  _clearLayer: function (layer) {
    layer.clear();
  },
  setBackgroundColor: function (backgroundColor) {
    this._backgroundColor = backgroundColor;
  },

  /**
   * 修改指定zlevel的绘制参数
   *
   * @param {string} zlevel
   * @param {Object} config 配置对象
   * @param {string} [config.clearColor=0] 每次清空画布的颜色
   * @param {string} [config.motionBlur=false] 是否开启动态模糊
   * @param {number} [config.lastFrameAlpha=0.7]
   *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
   */
  configLayer: function (zlevel, config) {
    if (config) {
      var layerConfig = this._layerConfig;

      if (!layerConfig[zlevel]) {
        layerConfig[zlevel] = config;
      } else {
        util.merge(layerConfig[zlevel], config, true);
      }

      for (var i = 0; i < this._zlevelList.length; i++) {
        var _zlevel = this._zlevelList[i];

        if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
          var layer = this._layers[_zlevel];
          util.merge(layer, layerConfig[zlevel], true);
        }
      }
    }
  },

  /**
   * 删除指定层
   * @param {number} zlevel 层所在的zlevel
   */
  delLayer: function (zlevel) {
    var layers = this._layers;
    var zlevelList = this._zlevelList;
    var layer = layers[zlevel];

    if (!layer) {
      return;
    }

    layer.dom.parentNode.removeChild(layer.dom);
    delete layers[zlevel];
    zlevelList.splice(util.indexOf(zlevelList, zlevel), 1);
  },

  /**
   * 区域大小变化后重绘
   */
  resize: function (width, height) {
    if (!this._domRoot.style) {
      // Maybe in node or worker
      if (width == null || height == null) {
        return;
      }

      this._width = width;
      this._height = height;
      this.getLayer(CANVAS_ZLEVEL).resize(width, height);
    } else {
      var domRoot = this._domRoot; // FIXME Why ?

      domRoot.style.display = 'none'; // Save input w/h

      var opts = this._opts;
      width != null && (opts.width = width);
      height != null && (opts.height = height);
      width = this._getSize(0);
      height = this._getSize(1);
      domRoot.style.display = ''; // 优化没有实际改变的resize

      if (this._width !== width || height !== this._height) {
        domRoot.style.width = width + 'px';
        domRoot.style.height = height + 'px';

        for (var id in this._layers) {
          if (this._layers.hasOwnProperty(id)) {
            this._layers[id].resize(width, height);
          }
        }

        util.each(this._progressiveLayers, function (layer) {
          layer.resize(width, height);
        });
        this.refresh(true);
      }

      this._width = width;
      this._height = height;
    }

    return this;
  },

  /**
   * 清除单独的一个层
   * @param {number} zlevel
   */
  clearLayer: function (zlevel) {
    var layer = this._layers[zlevel];

    if (layer) {
      layer.clear();
    }
  },

  /**
   * 释放
   */
  dispose: function () {
    this.root.innerHTML = '';
    this.root = this.storage = this._domRoot = this._layers = null;
  },

  /**
   * Get canvas which has all thing rendered
   * @param {Object} opts
   * @param {string} [opts.backgroundColor]
   * @param {number} [opts.pixelRatio]
   */
  getRenderedCanvas: function (opts) {
    opts = opts || {};

    if (this._singleCanvas && !this._compositeManually) {
      return this._layers[CANVAS_ZLEVEL].dom;
    }

    var imageLayer = new Layer('image', this, opts.pixelRatio || this.dpr);
    imageLayer.initContext();
    imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);

    if (opts.pixelRatio <= this.dpr) {
      this.refresh();
      var width = imageLayer.dom.width;
      var height = imageLayer.dom.height;
      var ctx = imageLayer.ctx;
      this.eachLayer(function (layer) {
        if (layer.__builtin__) {
          ctx.drawImage(layer.dom, 0, 0, width, height);
        } else if (layer.renderToCanvas) {
          imageLayer.ctx.save();
          layer.renderToCanvas(imageLayer.ctx);
          imageLayer.ctx.restore();
        }
      });
    } else {
      // PENDING, echarts-gl and incremental rendering.
      var scope = {};
      var displayList = this.storage.getDisplayList(true);

      for (var i = 0; i < displayList.length; i++) {
        var el = displayList[i];

        this._doPaintEl(el, imageLayer, true, scope);
      }
    }

    return imageLayer.dom;
  },

  /**
   * 获取绘图区域宽度
   */
  getWidth: function () {
    return this._width;
  },

  /**
   * 获取绘图区域高度
   */
  getHeight: function () {
    return this._height;
  },
  _getSize: function (whIdx) {
    var opts = this._opts;
    var wh = ['width', 'height'][whIdx];
    var cwh = ['clientWidth', 'clientHeight'][whIdx];
    var plt = ['paddingLeft', 'paddingTop'][whIdx];
    var prb = ['paddingRight', 'paddingBottom'][whIdx];

    if (opts[wh] != null && opts[wh] !== 'auto') {
      return parseFloat(opts[wh]);
    }

    var root = this.root; // IE8 does not support getComputedStyle, but it use VML.

    var stl = document.defaultView.getComputedStyle(root);
    return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
  },
  pathToImage: function (path, dpr) {
    dpr = dpr || this.dpr;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rect = path.getBoundingRect();
    var style = path.style;
    var shadowBlurSize = style.shadowBlur * dpr;
    var shadowOffsetX = style.shadowOffsetX * dpr;
    var shadowOffsetY = style.shadowOffsetY * dpr;
    var lineWidth = style.hasStroke() ? style.lineWidth : 0;
    var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
    var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
    var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
    var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
    var width = rect.width + leftMargin + rightMargin;
    var height = rect.height + topMargin + bottomMargin;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    ctx.dpr = dpr;
    var pathTransform = {
      position: path.position,
      rotation: path.rotation,
      scale: path.scale
    };
    path.position = [leftMargin - rect.x, topMargin - rect.y];
    path.rotation = 0;
    path.scale = [1, 1];
    path.updateTransform();

    if (path) {
      path.brush(ctx);
    }

    var ImageShape = Image;
    var imgShape = new ImageShape({
      style: {
        x: 0,
        y: 0,
        image: canvas
      }
    });

    if (pathTransform.position != null) {
      imgShape.position = path.position = pathTransform.position;
    }

    if (pathTransform.rotation != null) {
      imgShape.rotation = path.rotation = pathTransform.rotation;
    }

    if (pathTransform.scale != null) {
      imgShape.scale = path.scale = pathTransform.scale;
    }

    return imgShape;
  }
};
var _default = Painter;
module.exports = _default;

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(5);

var env = __webpack_require__(36);

var Group = __webpack_require__(117);

var timsort = __webpack_require__(171);

// Use timsort because in most case elements are partially sorted
// https://jsfiddle.net/pissang/jr4x7mdm/8/
function shapeCompareFunc(a, b) {
  if (a.zlevel === b.zlevel) {
    if (a.z === b.z) {
      // if (a.z2 === b.z2) {
      //     // FIXME Slow has renderidx compare
      //     // http://stackoverflow.com/questions/20883421/sorting-in-javascript-should-every-compare-function-have-a-return-0-statement
      //     // https://github.com/v8/v8/blob/47cce544a31ed5577ffe2963f67acb4144ee0232/src/js/array.js#L1012
      //     return a.__renderidx - b.__renderidx;
      // }
      return a.z2 - b.z2;
    }

    return a.z - b.z;
  }

  return a.zlevel - b.zlevel;
}
/**
 * 内容仓库 (M)
 * @alias module:zrender/Storage
 * @constructor
 */


var Storage = function () {
  // jshint ignore:line
  this._roots = [];
  this._displayList = [];
  this._displayListLen = 0;
};

Storage.prototype = {
  constructor: Storage,

  /**
   * @param  {Function} cb
   *
   */
  traverse: function (cb, context) {
    for (var i = 0; i < this._roots.length; i++) {
      this._roots[i].traverse(cb, context);
    }
  },

  /**
   * 返回所有图形的绘制队列
   * @param {boolean} [update=false] 是否在返回前更新该数组
   * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组, 在 update 为 true 的时候有效
   *
   * 详见{@link module:zrender/graphic/Displayable.prototype.updateDisplayList}
   * @return {Array.<module:zrender/graphic/Displayable>}
   */
  getDisplayList: function (update, includeIgnore) {
    includeIgnore = includeIgnore || false;

    if (update) {
      this.updateDisplayList(includeIgnore);
    }

    return this._displayList;
  },

  /**
   * 更新图形的绘制队列。
   * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
   * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
   * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组
   */
  updateDisplayList: function (includeIgnore) {
    this._displayListLen = 0;
    var roots = this._roots;
    var displayList = this._displayList;

    for (var i = 0, len = roots.length; i < len; i++) {
      this._updateAndAddDisplayable(roots[i], null, includeIgnore);
    }

    displayList.length = this._displayListLen;
    env.canvasSupported && timsort(displayList, shapeCompareFunc);
  },
  _updateAndAddDisplayable: function (el, clipPaths, includeIgnore) {
    if (el.ignore && !includeIgnore) {
      return;
    }

    el.beforeUpdate();

    if (el.__dirty) {
      el.update();
    }

    el.afterUpdate();
    var userSetClipPath = el.clipPath;

    if (userSetClipPath) {
      // FIXME 效率影响
      if (clipPaths) {
        clipPaths = clipPaths.slice();
      } else {
        clipPaths = [];
      }

      var currentClipPath = userSetClipPath;
      var parentClipPath = el; // Recursively add clip path

      while (currentClipPath) {
        // clipPath 的变换是基于使用这个 clipPath 的元素
        currentClipPath.parent = parentClipPath;
        currentClipPath.updateTransform();
        clipPaths.push(currentClipPath);
        parentClipPath = currentClipPath;
        currentClipPath = currentClipPath.clipPath;
      }
    }

    if (el.isGroup) {
      var children = el._children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i]; // Force to mark as dirty if group is dirty
        // FIXME __dirtyPath ?

        if (el.__dirty) {
          child.__dirty = true;
        }

        this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
      } // Mark group clean here


      el.__dirty = false;
    } else {
      el.__clipPaths = clipPaths;
      this._displayList[this._displayListLen++] = el;
    }
  },

  /**
   * 添加图形(Shape)或者组(Group)到根节点
   * @param {module:zrender/Element} el
   */
  addRoot: function (el) {
    if (el.__storage === this) {
      return;
    }

    if (el instanceof Group) {
      el.addChildrenToStorage(this);
    }

    this.addToStorage(el);

    this._roots.push(el);
  },

  /**
   * 删除指定的图形(Shape)或者组(Group)
   * @param {string|Array.<string>} [el] 如果为空清空整个Storage
   */
  delRoot: function (el) {
    if (el == null) {
      // 不指定el清空
      for (var i = 0; i < this._roots.length; i++) {
        var root = this._roots[i];

        if (root instanceof Group) {
          root.delChildrenFromStorage(this);
        }
      }

      this._roots = [];
      this._displayList = [];
      this._displayListLen = 0;
      return;
    }

    if (el instanceof Array) {
      for (var i = 0, l = el.length; i < l; i++) {
        this.delRoot(el[i]);
      }

      return;
    }

    var idx = util.indexOf(this._roots, el);

    if (idx >= 0) {
      this.delFromStorage(el);

      this._roots.splice(idx, 1);

      if (el instanceof Group) {
        el.delChildrenFromStorage(this);
      }
    }
  },
  addToStorage: function (el) {
    if (el) {
      el.__storage = this;
      el.dirty(false);
    }

    return this;
  },
  delFromStorage: function (el) {
    if (el) {
      el.__storage = null;
    }

    return this;
  },

  /**
   * 清空并且释放Storage
   */
  dispose: function () {
    this._renderList = this._roots = null;
  },
  displayableSortFunc: shapeCompareFunc
};
var _default = Storage;
module.exports = _default;

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(5);

var _event = __webpack_require__(82);

var Dispatcher = _event.Dispatcher;

var requestAnimationFrame = __webpack_require__(167);

var Animator = __webpack_require__(166);

/**
 * 动画主类, 调度和管理所有动画控制器
 *
 * @module zrender/animation/Animation
 * @author pissang(https://github.com/pissang)
 */
// TODO Additive animation
// http://iosoteric.com/additive-animations-animatewithduration-in-ios-8/
// https://developer.apple.com/videos/wwdc2014/#236

/**
 * @typedef {Object} IZRenderStage
 * @property {Function} update
 */

/**
 * @alias module:zrender/animation/Animation
 * @constructor
 * @param {Object} [options]
 * @param {Function} [options.onframe]
 * @param {IZRenderStage} [options.stage]
 * @example
 *     var animation = new Animation();
 *     var obj = {
 *         x: 100,
 *         y: 100
 *     };
 *     animation.animate(node.position)
 *         .when(1000, {
 *             x: 500,
 *             y: 500
 *         })
 *         .when(2000, {
 *             x: 100,
 *             y: 100
 *         })
 *         .start('spline');
 */
var Animation = function (options) {
  options = options || {};
  this.stage = options.stage || {};

  this.onframe = options.onframe || function () {}; // private properties


  this._clips = [];
  this._running = false;
  this._time;
  this._pausedTime;
  this._pauseStart;
  this._paused = false;
  Dispatcher.call(this);
};

Animation.prototype = {
  constructor: Animation,

  /**
   * 添加 clip
   * @param {module:zrender/animation/Clip} clip
   */
  addClip: function (clip) {
    this._clips.push(clip);
  },

  /**
   * 添加 animator
   * @param {module:zrender/animation/Animator} animator
   */
  addAnimator: function (animator) {
    animator.animation = this;
    var clips = animator.getClips();

    for (var i = 0; i < clips.length; i++) {
      this.addClip(clips[i]);
    }
  },

  /**
   * 删除动画片段
   * @param {module:zrender/animation/Clip} clip
   */
  removeClip: function (clip) {
    var idx = util.indexOf(this._clips, clip);

    if (idx >= 0) {
      this._clips.splice(idx, 1);
    }
  },

  /**
   * 删除动画片段
   * @param {module:zrender/animation/Animator} animator
   */
  removeAnimator: function (animator) {
    var clips = animator.getClips();

    for (var i = 0; i < clips.length; i++) {
      this.removeClip(clips[i]);
    }

    animator.animation = null;
  },
  _update: function () {
    var time = new Date().getTime() - this._pausedTime;

    var delta = time - this._time;
    var clips = this._clips;
    var len = clips.length;
    var deferredEvents = [];
    var deferredClips = [];

    for (var i = 0; i < len; i++) {
      var clip = clips[i];
      var e = clip.step(time, delta); // Throw out the events need to be called after
      // stage.update, like destroy

      if (e) {
        deferredEvents.push(e);
        deferredClips.push(clip);
      }
    } // Remove the finished clip


    for (var i = 0; i < len;) {
      if (clips[i]._needsRemove) {
        clips[i] = clips[len - 1];
        clips.pop();
        len--;
      } else {
        i++;
      }
    }

    len = deferredEvents.length;

    for (var i = 0; i < len; i++) {
      deferredClips[i].fire(deferredEvents[i]);
    }

    this._time = time;
    this.onframe(delta); // 'frame' should be triggered before stage, because upper application
    // depends on the sequence (e.g., echarts-stream and finish
    // event judge)

    this.trigger('frame', delta);

    if (this.stage.update) {
      this.stage.update();
    }
  },
  _startLoop: function () {
    var self = this;
    this._running = true;

    function step() {
      if (self._running) {
        requestAnimationFrame(step);
        !self._paused && self._update();
      }
    }

    requestAnimationFrame(step);
  },

  /**
   * Start animation.
   */
  start: function () {
    this._time = new Date().getTime();
    this._pausedTime = 0;

    this._startLoop();
  },

  /**
   * Stop animation.
   */
  stop: function () {
    this._running = false;
  },

  /**
   * Pause animation.
   */
  pause: function () {
    if (!this._paused) {
      this._pauseStart = new Date().getTime();
      this._paused = true;
    }
  },

  /**
   * Resume animation.
   */
  resume: function () {
    if (this._paused) {
      this._pausedTime += new Date().getTime() - this._pauseStart;
      this._paused = false;
    }
  },

  /**
   * Clear animation.
   */
  clear: function () {
    this._clips = [];
  },

  /**
   * Whether animation finished.
   */
  isFinished: function () {
    return !this._clips.length;
  },

  /**
   * Creat animator for a target, whose props can be animated.
   *
   * @param  {Object} target
   * @param  {Object} options
   * @param  {boolean} [options.loop=false] Whether loop animation.
   * @param  {Function} [options.getter=null] Get value from target.
   * @param  {Function} [options.setter=null] Set value to target.
   * @return {module:zrender/animation/Animation~Animator}
   */
  // TODO Gap
  animate: function (target, options) {
    options = options || {};
    var animator = new Animator(target, options.loop, options.getter, options.setter);
    this.addAnimator(animator);
    return animator;
  }
};
util.mixin(Animation, Dispatcher);
var _default = Animation;
module.exports = _default;

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var easingFuncs = __webpack_require__(400);

/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 *
 * TODO pause
 */
function Clip(options) {
  this._target = options.target; // 生命周期

  this._life = options.life || 1000; // 延时

  this._delay = options.delay || 0; // 开始时间
  // this._startTime = new Date().getTime() + this._delay;// 单位毫秒

  this._initialized = false; // 是否循环

  this.loop = options.loop == null ? false : options.loop;
  this.gap = options.gap || 0;
  this.easing = options.easing || 'Linear';
  this.onframe = options.onframe;
  this.ondestroy = options.ondestroy;
  this.onrestart = options.onrestart;
  this._pausedTime = 0;
  this._paused = false;
}

Clip.prototype = {
  constructor: Clip,
  step: function (globalTime, deltaTime) {
    // Set startTime on first step, or _startTime may has milleseconds different between clips
    // PENDING
    if (!this._initialized) {
      this._startTime = globalTime + this._delay;
      this._initialized = true;
    }

    if (this._paused) {
      this._pausedTime += deltaTime;
      return;
    }

    var percent = (globalTime - this._startTime - this._pausedTime) / this._life; // 还没开始

    if (percent < 0) {
      return;
    }

    percent = Math.min(percent, 1);
    var easing = this.easing;
    var easingFunc = typeof easing === 'string' ? easingFuncs[easing] : easing;
    var schedule = typeof easingFunc === 'function' ? easingFunc(percent) : percent;
    this.fire('frame', schedule); // 结束

    if (percent === 1) {
      if (this.loop) {
        this.restart(globalTime); // 重新开始周期
        // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件

        return 'restart';
      } // 动画完成将这个控制器标识为待删除
      // 在Animation.update中进行批量删除


      this._needsRemove = true;
      return 'destroy';
    }

    return null;
  },
  restart: function (globalTime) {
    var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
    this._startTime = globalTime - remainder + this.gap;
    this._pausedTime = 0;
    this._needsRemove = false;
  },
  fire: function (eventType, arg) {
    eventType = 'on' + eventType;

    if (this[eventType]) {
      this[eventType](this._target, arg);
    }
  },
  pause: function () {
    this._paused = true;
  },
  resume: function () {
    this._paused = false;
  }
};
var _default = Clip;
module.exports = _default;

/***/ }),
/* 400 */
/***/ (function(module, exports) {

/**
 * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
 * @see http://sole.github.io/tween.js/examples/03_graphs.html
 * @exports zrender/animation/easing
 */
var easing = {
  /**
  * @param {number} k
  * @return {number}
  */
  linear: function (k) {
    return k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quadraticIn: function (k) {
    return k * k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quadraticOut: function (k) {
    return k * (2 - k);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quadraticInOut: function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  // 三次方的缓动（t^3）

  /**
  * @param {number} k
  * @return {number}
  */
  cubicIn: function (k) {
    return k * k * k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  cubicOut: function (k) {
    return --k * k * k + 1;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  cubicInOut: function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  // 四次方的缓动（t^4）

  /**
  * @param {number} k
  * @return {number}
  */
  quarticIn: function (k) {
    return k * k * k * k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quarticOut: function (k) {
    return 1 - --k * k * k * k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quarticInOut: function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }

    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  // 五次方的缓动（t^5）

  /**
  * @param {number} k
  * @return {number}
  */
  quinticIn: function (k) {
    return k * k * k * k * k;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quinticOut: function (k) {
    return --k * k * k * k * k + 1;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  quinticInOut: function (k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },
  // 正弦曲线的缓动（sin(t)）

  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalIn: function (k) {
    return 1 - Math.cos(k * Math.PI / 2);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalOut: function (k) {
    return Math.sin(k * Math.PI / 2);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalInOut: function (k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },
  // 指数曲线的缓动（2^t）

  /**
  * @param {number} k
  * @return {number}
  */
  exponentialIn: function (k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  exponentialOut: function (k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  exponentialInOut: function (k) {
    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },
  // 圆形曲线的缓动（sqrt(1-t^2)）

  /**
  * @param {number} k
  * @return {number}
  */
  circularIn: function (k) {
    return 1 - Math.sqrt(1 - k * k);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  circularOut: function (k) {
    return Math.sqrt(1 - --k * k);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  circularInOut: function (k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },
  // 创建类似于弹簧在停止前来回振荡的动画

  /**
  * @param {number} k
  * @return {number}
  */
  elasticIn: function (k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },

  /**
  * @param {number} k
  * @return {number}
  */
  elasticOut: function (k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  elasticInOut: function (k) {
    var s;
    var a = 0.1;
    var p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动

  /**
  * @param {number} k
  * @return {number}
  */
  backIn: function (k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  backOut: function (k) {
    var s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  },

  /**
  * @param {number} k
  * @return {number}
  */
  backInOut: function (k) {
    var s = 1.70158 * 1.525;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  // 创建弹跳效果

  /**
  * @param {number} k
  * @return {number}
  */
  bounceIn: function (k) {
    return 1 - easing.bounceOut(1 - k);
  },

  /**
  * @param {number} k
  * @return {number}
  */
  bounceOut: function (k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },

  /**
  * @param {number} k
  * @return {number}
  */
  bounceInOut: function (k) {
    if (k < 0.5) {
      return easing.bounceIn(k * 2) * 0.5;
    }

    return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
var _default = easing;
module.exports = _default;

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(168);

var normalizeRadian = _util.normalizeRadian;
var PI2 = Math.PI * 2;
/**
 * 圆弧描边包含判断
 * @param  {number}  cx
 * @param  {number}  cy
 * @param  {number}  r
 * @param  {number}  startAngle
 * @param  {number}  endAngle
 * @param  {boolean}  anticlockwise
 * @param  {number} lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {Boolean}
 */

function containStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }

  var _l = lineWidth;
  x -= cx;
  y -= cy;
  var d = Math.sqrt(x * x + y * y);

  if (d - _l > r || d + _l < r) {
    return false;
  }

  if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
    // Is a circle
    return true;
  }

  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }

  if (startAngle > endAngle) {
    endAngle += PI2;
  }

  var angle = Math.atan2(y, x);

  if (angle < 0) {
    angle += PI2;
  }

  return angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle;
}

exports.containStroke = containStroke;

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var curve = __webpack_require__(53);

/**
 * 三次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  x3
 * @param  {number}  y3
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }

  var _l = lineWidth; // Quick reject

  if (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l) {
    return false;
  }

  var d = curve.cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
  return d <= _l / 2;
}

exports.containStroke = containStroke;

/***/ }),
/* 403 */
/***/ (function(module, exports) {

/**
 * 线段包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke(x0, y0, x1, y1, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }

  var _l = lineWidth;
  var _a = 0;
  var _b = x0; // Quick reject

  if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l) {
    return false;
  }

  if (x0 !== x1) {
    _a = (y0 - y1) / (x0 - x1);
    _b = (x0 * y1 - x1 * y0) / (x0 - x1);
  } else {
    return Math.abs(x - x0) <= _l / 2;
  }

  var tmp = _a * x - y + _b;

  var _s = tmp * tmp / (_a * _a + 1);

  return _s <= _l / 2 * _l / 2;
}

exports.containStroke = containStroke;

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var PathProxy = __webpack_require__(52);

var line = __webpack_require__(403);

var cubic = __webpack_require__(402);

var quadratic = __webpack_require__(405);

var arc = __webpack_require__(401);

var _util = __webpack_require__(168);

var normalizeRadian = _util.normalizeRadian;

var curve = __webpack_require__(53);

var windingLine = __webpack_require__(406);

var CMD = PathProxy.CMD;
var PI2 = Math.PI * 2;
var EPSILON = 1e-4;

function isAroundEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
} // 临时数组


var roots = [-1, -1, -1];
var extrema = [-1, -1];

function swapExtrema() {
  var tmp = extrema[0];
  extrema[0] = extrema[1];
  extrema[1] = tmp;
}

function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
  // Quick reject
  if (y > y0 && y > y1 && y > y2 && y > y3 || y < y0 && y < y1 && y < y2 && y < y3) {
    return 0;
  }

  var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);

  if (nRoots === 0) {
    return 0;
  } else {
    var w = 0;
    var nExtrema = -1;
    var y0_;
    var y1_;

    for (var i = 0; i < nRoots; i++) {
      var t = roots[i]; // Avoid winding error when intersection point is the connect point of two line of polygon

      var unit = t === 0 || t === 1 ? 0.5 : 1;
      var x_ = curve.cubicAt(x0, x1, x2, x3, t);

      if (x_ < x) {
        // Quick reject
        continue;
      }

      if (nExtrema < 0) {
        nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);

        if (extrema[1] < extrema[0] && nExtrema > 1) {
          swapExtrema();
        }

        y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);

        if (nExtrema > 1) {
          y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
        }
      }

      if (nExtrema === 2) {
        // 分成三段单调函数
        if (t < extrema[0]) {
          w += y0_ < y0 ? unit : -unit;
        } else if (t < extrema[1]) {
          w += y1_ < y0_ ? unit : -unit;
        } else {
          w += y3 < y1_ ? unit : -unit;
        }
      } else {
        // 分成两段单调函数
        if (t < extrema[0]) {
          w += y0_ < y0 ? unit : -unit;
        } else {
          w += y3 < y0_ ? unit : -unit;
        }
      }
    }

    return w;
  }
}

function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
  // Quick reject
  if (y > y0 && y > y1 && y > y2 || y < y0 && y < y1 && y < y2) {
    return 0;
  }

  var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);

  if (nRoots === 0) {
    return 0;
  } else {
    var t = curve.quadraticExtremum(y0, y1, y2);

    if (t >= 0 && t <= 1) {
      var w = 0;
      var y_ = curve.quadraticAt(y0, y1, y2, t);

      for (var i = 0; i < nRoots; i++) {
        // Remove one endpoint.
        var unit = roots[i] === 0 || roots[i] === 1 ? 0.5 : 1;
        var x_ = curve.quadraticAt(x0, x1, x2, roots[i]);

        if (x_ < x) {
          // Quick reject
          continue;
        }

        if (roots[i] < t) {
          w += y_ < y0 ? unit : -unit;
        } else {
          w += y2 < y_ ? unit : -unit;
        }
      }

      return w;
    } else {
      // Remove one endpoint.
      var unit = roots[0] === 0 || roots[0] === 1 ? 0.5 : 1;
      var x_ = curve.quadraticAt(x0, x1, x2, roots[0]);

      if (x_ < x) {
        // Quick reject
        return 0;
      }

      return y2 < y0 ? unit : -unit;
    }
  }
} // TODO
// Arc 旋转


function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
  y -= cy;

  if (y > r || y < -r) {
    return 0;
  }

  var tmp = Math.sqrt(r * r - y * y);
  roots[0] = -tmp;
  roots[1] = tmp;
  var diff = Math.abs(startAngle - endAngle);

  if (diff < 1e-4) {
    return 0;
  }

  if (diff % PI2 < 1e-4) {
    // Is a circle
    startAngle = 0;
    endAngle = PI2;
    var dir = anticlockwise ? 1 : -1;

    if (x >= roots[0] + cx && x <= roots[1] + cx) {
      return dir;
    } else {
      return 0;
    }
  }

  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }

  if (startAngle > endAngle) {
    endAngle += PI2;
  }

  var w = 0;

  for (var i = 0; i < 2; i++) {
    var x_ = roots[i];

    if (x_ + cx > x) {
      var angle = Math.atan2(y, x_);
      var dir = anticlockwise ? 1 : -1;

      if (angle < 0) {
        angle = PI2 + angle;
      }

      if (angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle) {
        if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
          dir = -dir;
        }

        w += dir;
      }
    }
  }

  return w;
}

function containPath(data, lineWidth, isStroke, x, y) {
  var w = 0;
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;

  for (var i = 0; i < data.length;) {
    var cmd = data[i++]; // Begin a new subpath

    if (cmd === CMD.M && i > 1) {
      // Close previous subpath
      if (!isStroke) {
        w += windingLine(xi, yi, x0, y0, x, y);
      } // 如果被任何一个 subpath 包含
      // if (w !== 0) {
      //     return true;
      // }

    }

    if (i === 1) {
      // 如果第一个命令是 L, C, Q
      // 则 previous point 同绘制命令的第一个 point
      //
      // 第一个命令为 Arc 的情况下会在后面特殊处理
      xi = data[i];
      yi = data[i + 1];
      x0 = xi;
      y0 = yi;
    }

    switch (cmd) {
      case CMD.M:
        // moveTo 命令重新创建一个新的 subpath, 并且更新新的起点
        // 在 closePath 的时候使用
        x0 = data[i++];
        y0 = data[i++];
        xi = x0;
        yi = y0;
        break;

      case CMD.L:
        if (isStroke) {
          if (line.containStroke(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          // NOTE 在第一个命令为 L, C, Q 的时候会计算出 NaN
          w += windingLine(xi, yi, data[i], data[i + 1], x, y) || 0;
        }

        xi = data[i++];
        yi = data[i++];
        break;

      case CMD.C:
        if (isStroke) {
          if (cubic.containStroke(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
        }

        xi = data[i++];
        yi = data[i++];
        break;

      case CMD.Q:
        if (isStroke) {
          if (quadratic.containStroke(xi, yi, data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
        }

        xi = data[i++];
        yi = data[i++];
        break;

      case CMD.A:
        // TODO Arc 判断的开销比较大
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++]; // TODO Arc 旋转

        i += 1;
        var anticlockwise = 1 - data[i++];
        var x1 = Math.cos(theta) * rx + cx;
        var y1 = Math.sin(theta) * ry + cy; // 不是直接使用 arc 命令

        if (i > 1) {
          w += windingLine(xi, yi, x1, y1, x, y);
        } else {
          // 第一个命令起点还未定义
          x0 = x1;
          y0 = y1;
        } // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放


        var _x = (x - cx) * ry / rx + cx;

        if (isStroke) {
          if (arc.containStroke(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y)) {
            return true;
          }
        } else {
          w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
        }

        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;

      case CMD.R:
        x0 = xi = data[i++];
        y0 = yi = data[i++];
        var width = data[i++];
        var height = data[i++];
        var x1 = x0 + width;
        var y1 = y0 + height;

        if (isStroke) {
          if (line.containStroke(x0, y0, x1, y0, lineWidth, x, y) || line.containStroke(x1, y0, x1, y1, lineWidth, x, y) || line.containStroke(x1, y1, x0, y1, lineWidth, x, y) || line.containStroke(x0, y1, x0, y0, lineWidth, x, y)) {
            return true;
          }
        } else {
          // FIXME Clockwise ?
          w += windingLine(x1, y0, x1, y1, x, y);
          w += windingLine(x0, y1, x0, y0, x, y);
        }

        break;

      case CMD.Z:
        if (isStroke) {
          if (line.containStroke(xi, yi, x0, y0, lineWidth, x, y)) {
            return true;
          }
        } else {
          // Close a subpath
          w += windingLine(xi, yi, x0, y0, x, y); // 如果被任何一个 subpath 包含
          // FIXME subpaths may overlap
          // if (w !== 0) {
          //     return true;
          // }
        }

        xi = x0;
        yi = y0;
        break;
    }
  }

  if (!isStroke && !isAroundEqual(yi, y0)) {
    w += windingLine(xi, yi, x0, y0, x, y) || 0;
  }

  return w !== 0;
}

function contain(pathData, x, y) {
  return containPath(pathData, 0, false, x, y);
}

function containStroke(pathData, lineWidth, x, y) {
  return containPath(pathData, lineWidth, true, x, y);
}

exports.contain = contain;
exports.containStroke = containStroke;

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var _curve = __webpack_require__(53);

var quadraticProjectPoint = _curve.quadraticProjectPoint;

/**
 * 二次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }

  var _l = lineWidth; // Quick reject

  if (y > y0 + _l && y > y1 + _l && y > y2 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l) {
    return false;
  }

  var d = quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, null);
  return d <= _l / 2;
}

exports.containStroke = containStroke;

/***/ }),
/* 406 */
/***/ (function(module, exports) {

function windingLine(x0, y0, x1, y1, x, y) {
  if (y > y0 && y > y1 || y < y0 && y < y1) {
    return 0;
  } // Ignore horizontal line


  if (y1 === y0) {
    return 0;
  }

  var dir = y1 < y0 ? 1 : -1;
  var t = (y - y0) / (y1 - y0); // Avoid winding error when intersection point is the connect point of two line of polygon

  if (t === 1 || t === 0) {
    dir = y1 < y0 ? 0.5 : -0.5;
  }

  var x_ = t * (x1 - x0) + x0; // If (x, y) on the line, considered as "contain".

  return x_ === x ? Infinity : x_ > x ? dir : 0;
}

module.exports = windingLine;

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var eventUtil = __webpack_require__(82);

/**
 * Only implements needed gestures for mobile.
 */
var GestureMgr = function () {
  /**
   * @private
   * @type {Array.<Object>}
   */
  this._track = [];
};

GestureMgr.prototype = {
  constructor: GestureMgr,
  recognize: function (event, target, root) {
    this._doTrack(event, target, root);

    return this._recognize(event);
  },
  clear: function () {
    this._track.length = 0;
    return this;
  },
  _doTrack: function (event, target, root) {
    var touches = event.touches;

    if (!touches) {
      return;
    }

    var trackItem = {
      points: [],
      touches: [],
      target: target,
      event: event
    };

    for (var i = 0, len = touches.length; i < len; i++) {
      var touch = touches[i];
      var pos = eventUtil.clientToLocal(root, touch, {});
      trackItem.points.push([pos.zrX, pos.zrY]);
      trackItem.touches.push(touch);
    }

    this._track.push(trackItem);
  },
  _recognize: function (event) {
    for (var eventName in recognizers) {
      if (recognizers.hasOwnProperty(eventName)) {
        var gestureInfo = recognizers[eventName](this._track, event);

        if (gestureInfo) {
          return gestureInfo;
        }
      }
    }
  }
};

function dist(pointPair) {
  var dx = pointPair[1][0] - pointPair[0][0];
  var dy = pointPair[1][1] - pointPair[0][1];
  return Math.sqrt(dx * dx + dy * dy);
}

function center(pointPair) {
  return [(pointPair[0][0] + pointPair[1][0]) / 2, (pointPair[0][1] + pointPair[1][1]) / 2];
}

var recognizers = {
  pinch: function (track, event) {
    var trackLen = track.length;

    if (!trackLen) {
      return;
    }

    var pinchEnd = (track[trackLen - 1] || {}).points;
    var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;

    if (pinchPre && pinchPre.length > 1 && pinchEnd && pinchEnd.length > 1) {
      var pinchScale = dist(pinchEnd) / dist(pinchPre);
      !isFinite(pinchScale) && (pinchScale = 1);
      event.pinchScale = pinchScale;
      var pinchCenter = center(pinchEnd);
      event.pinchX = pinchCenter[0];
      event.pinchY = pinchCenter[1];
      return {
        type: 'pinch',
        target: track[0].target,
        event: event
      };
    }
  } // Only pinch currently.

};
var _default = GestureMgr;
module.exports = _default;

/***/ }),
/* 408 */
/***/ (function(module, exports) {

// Myers' Diff Algorithm
// Modified from https://github.com/kpdecker/jsdiff/blob/master/src/diff/base.js
function Diff() {}

Diff.prototype = {
  diff: function (oldArr, newArr, equals) {
    if (!equals) {
      equals = function (a, b) {
        return a === b;
      };
    }

    this.equals = equals;
    var self = this;
    oldArr = oldArr.slice();
    newArr = newArr.slice(); // Allow subclasses to massage the input prior to running

    var newLen = newArr.length;
    var oldLen = oldArr.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;
    var bestPath = [{
      newPos: -1,
      components: []
    }]; // Seed editLength = 0, i.e. the content starts with the same values

    var oldPos = this.extractCommon(bestPath[0], newArr, oldArr, 0);

    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
      var indices = [];

      for (var i = 0; i < newArr.length; i++) {
        indices.push(i);
      } // Identity per the equality and tokenizer


      return [{
        indices: indices,
        count: newArr.length
      }];
    } // Main worker method. checks all permutations of a given edit length for acceptance.


    function execEditLength() {
      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
        var basePath;
        var addPath = bestPath[diagonalPath - 1];
        var removePath = bestPath[diagonalPath + 1];
        var oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

        if (addPath) {
          // No one else is going to attempt to use this value, clear it
          bestPath[diagonalPath - 1] = undefined;
        }

        var canAdd = addPath && addPath.newPos + 1 < newLen;
        var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;

        if (!canAdd && !canRemove) {
          // If this path is a terminal then prune
          bestPath[diagonalPath] = undefined;
          continue;
        } // Select the diagonal that we want to branch from. We select the prior
        // path whose position in the new string is the farthest from the origin
        // and does not pass the bounds of the diff graph


        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self.pushComponent(basePath.components, undefined, true);
        } else {
          basePath = addPath; // No need to clone, we've pulled it from the list

          basePath.newPos++;
          self.pushComponent(basePath.components, true, undefined);
        }

        oldPos = self.extractCommon(basePath, newArr, oldArr, diagonalPath); // If we have hit the end of both strings, then we are done

        if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
          return buildValues(self, basePath.components, newArr, oldArr);
        } else {
          // Otherwise track this path as a potential candidate and continue.
          bestPath[diagonalPath] = basePath;
        }
      }

      editLength++;
    }

    while (editLength <= maxEditLength) {
      var ret = execEditLength();

      if (ret) {
        return ret;
      }
    }
  },
  pushComponent: function (components, added, removed) {
    var last = components[components.length - 1];

    if (last && last.added === added && last.removed === removed) {
      // We need to clone here as the component clone operation is just
      // as shallow array clone
      components[components.length - 1] = {
        count: last.count + 1,
        added: added,
        removed: removed
      };
    } else {
      components.push({
        count: 1,
        added: added,
        removed: removed
      });
    }
  },
  extractCommon: function (basePath, newArr, oldArr, diagonalPath) {
    var newLen = newArr.length;
    var oldLen = oldArr.length;
    var newPos = basePath.newPos;
    var oldPos = newPos - diagonalPath;
    var commonCount = 0;

    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newArr[newPos + 1], oldArr[oldPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }

    if (commonCount) {
      basePath.components.push({
        count: commonCount
      });
    }

    basePath.newPos = newPos;
    return oldPos;
  },
  tokenize: function (value) {
    return value.slice();
  },
  join: function (value) {
    return value.slice();
  }
};

function buildValues(diff, components, newArr, oldArr) {
  var componentPos = 0;
  var componentLen = components.length;
  var newPos = 0;
  var oldPos = 0;

  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];

    if (!component.removed) {
      var indices = [];

      for (var i = newPos; i < newPos + component.count; i++) {
        indices.push(i);
      }

      component.indices = indices;
      newPos += component.count; // Common case

      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      var indices = [];

      for (var i = oldPos; i < oldPos + component.count; i++) {
        indices.push(i);
      }

      component.indices = indices;
      oldPos += component.count;
    }
  }

  return components;
}

function clonePath(path) {
  return {
    newPos: path.newPos,
    components: path.components.slice(0)
  };
}

var arrayDiff = new Diff();

function _default(oldArr, newArr, callback) {
  return arrayDiff.diff(oldArr, newArr, callback);
}

module.exports = _default;

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

var vec2 = __webpack_require__(20);

var curve = __webpack_require__(53);

/**
 * @author Yi Shen(https://github.com/pissang)
 */
var mathMin = Math.min;
var mathMax = Math.max;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI2 = Math.PI * 2;
var start = vec2.create();
var end = vec2.create();
var extremity = vec2.create();
/**
 * 从顶点数组中计算出最小包围盒，写入`min`和`max`中
 * @module zrender/core/bbox
 * @param {Array<Object>} points 顶点数组
 * @param {number} min
 * @param {number} max
 */

function fromPoints(points, min, max) {
  if (points.length === 0) {
    return;
  }

  var p = points[0];
  var left = p[0];
  var right = p[0];
  var top = p[1];
  var bottom = p[1];
  var i;

  for (i = 1; i < points.length; i++) {
    p = points[i];
    left = mathMin(left, p[0]);
    right = mathMax(right, p[0]);
    top = mathMin(top, p[1]);
    bottom = mathMax(bottom, p[1]);
  }

  min[0] = left;
  min[1] = top;
  max[0] = right;
  max[1] = bottom;
}
/**
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */


function fromLine(x0, y0, x1, y1, min, max) {
  min[0] = mathMin(x0, x1);
  min[1] = mathMin(y0, y1);
  max[0] = mathMax(x0, x1);
  max[1] = mathMax(y0, y1);
}

var xDim = [];
var yDim = [];
/**
 * 从三阶贝塞尔曲线(p0, p1, p2, p3)中计算出最小包围盒，写入`min`和`max`中
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */

function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min, max) {
  var cubicExtrema = curve.cubicExtrema;
  var cubicAt = curve.cubicAt;
  var i;
  var n = cubicExtrema(x0, x1, x2, x3, xDim);
  min[0] = Infinity;
  min[1] = Infinity;
  max[0] = -Infinity;
  max[1] = -Infinity;

  for (i = 0; i < n; i++) {
    var x = cubicAt(x0, x1, x2, x3, xDim[i]);
    min[0] = mathMin(x, min[0]);
    max[0] = mathMax(x, max[0]);
  }

  n = cubicExtrema(y0, y1, y2, y3, yDim);

  for (i = 0; i < n; i++) {
    var y = cubicAt(y0, y1, y2, y3, yDim[i]);
    min[1] = mathMin(y, min[1]);
    max[1] = mathMax(y, max[1]);
  }

  min[0] = mathMin(x0, min[0]);
  max[0] = mathMax(x0, max[0]);
  min[0] = mathMin(x3, min[0]);
  max[0] = mathMax(x3, max[0]);
  min[1] = mathMin(y0, min[1]);
  max[1] = mathMax(y0, max[1]);
  min[1] = mathMin(y3, min[1]);
  max[1] = mathMax(y3, max[1]);
}
/**
 * 从二阶贝塞尔曲线(p0, p1, p2)中计算出最小包围盒，写入`min`和`max`中
 * @memberOf module:zrender/core/bbox
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */


function fromQuadratic(x0, y0, x1, y1, x2, y2, min, max) {
  var quadraticExtremum = curve.quadraticExtremum;
  var quadraticAt = curve.quadraticAt; // Find extremities, where derivative in x dim or y dim is zero

  var tx = mathMax(mathMin(quadraticExtremum(x0, x1, x2), 1), 0);
  var ty = mathMax(mathMin(quadraticExtremum(y0, y1, y2), 1), 0);
  var x = quadraticAt(x0, x1, x2, tx);
  var y = quadraticAt(y0, y1, y2, ty);
  min[0] = mathMin(x0, x2, x);
  min[1] = mathMin(y0, y2, y);
  max[0] = mathMax(x0, x2, x);
  max[1] = mathMax(y0, y2, y);
}
/**
 * 从圆弧中计算出最小包围盒，写入`min`和`max`中
 * @method
 * @memberOf module:zrender/core/bbox
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @param {number} startAngle
 * @param {number} endAngle
 * @param {number} anticlockwise
 * @param {Array.<number>} min
 * @param {Array.<number>} max
 */


function fromArc(x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max) {
  var vec2Min = vec2.min;
  var vec2Max = vec2.max;
  var diff = Math.abs(startAngle - endAngle);

  if (diff % PI2 < 1e-4 && diff > 1e-4) {
    // Is a circle
    min[0] = x - rx;
    min[1] = y - ry;
    max[0] = x + rx;
    max[1] = y + ry;
    return;
  }

  start[0] = mathCos(startAngle) * rx + x;
  start[1] = mathSin(startAngle) * ry + y;
  end[0] = mathCos(endAngle) * rx + x;
  end[1] = mathSin(endAngle) * ry + y;
  vec2Min(min, start, end);
  vec2Max(max, start, end); // Thresh to [0, Math.PI * 2]

  startAngle = startAngle % PI2;

  if (startAngle < 0) {
    startAngle = startAngle + PI2;
  }

  endAngle = endAngle % PI2;

  if (endAngle < 0) {
    endAngle = endAngle + PI2;
  }

  if (startAngle > endAngle && !anticlockwise) {
    endAngle += PI2;
  } else if (startAngle < endAngle && anticlockwise) {
    startAngle += PI2;
  }

  if (anticlockwise) {
    var tmp = endAngle;
    endAngle = startAngle;
    startAngle = tmp;
  } // var number = 0;
  // var step = (anticlockwise ? -Math.PI : Math.PI) / 2;


  for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
    if (angle > startAngle) {
      extremity[0] = mathCos(angle) * rx + x;
      extremity[1] = mathSin(angle) * ry + y;
      vec2Min(min, extremity, min);
      vec2Max(max, extremity, max);
    }
  }
}

exports.fromPoints = fromPoints;
exports.fromLine = fromLine;
exports.fromCubic = fromCubic;
exports.fromQuadratic = fromQuadratic;
exports.fromArc = fromArc;

/***/ }),
/* 410 */
/***/ (function(module, exports) {

/**
 * The algoritm is learnt from
 * https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
 * And we made some optimization for matrix inversion.
 * Other similar approaches:
 * "cv::getPerspectiveTransform", "Direct Linear Transformation".
 */
var LN2 = Math.log(2);

function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
  var cacheKey = rowMask + '-' + colMask;
  var fullRank = rows.length;

  if (detCache.hasOwnProperty(cacheKey)) {
    return detCache[cacheKey];
  }

  if (rank === 1) {
    // In this case the colMask must be like: `11101111`. We can find the place of `0`.
    var colStart = Math.round(Math.log((1 << fullRank) - 1 & ~colMask) / LN2);
    return rows[rowStart][colStart];
  }

  var subRowMask = rowMask | 1 << rowStart;
  var subRowStart = rowStart + 1;

  while (rowMask & 1 << subRowStart) {
    subRowStart++;
  }

  var sum = 0;

  for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
    var colTag = 1 << j;

    if (!(colTag & colMask)) {
      sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j] // det(subMatrix(0, j))
      * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
      colLocalIdx++;
    }
  }

  detCache[cacheKey] = sum;
  return sum;
}
/**
 * Usage:
 * ```js
 * var transformer = buildTransformer(
 *     [10, 44, 100, 44, 100, 300, 10, 300],
 *     [50, 54, 130, 14, 140, 330, 14, 220]
 * );
 * var out = [];
 * transformer && transformer([11, 33], out);
 * ```
 *
 * Notice: `buildTransformer` may take more than 10ms in some Android device.
 *
 * @param {Array.<number>} src source four points, [x0, y0, x1, y1, x2, y2, x3, y3]
 * @param {Array.<number>} dest destination four points, [x0, y0, x1, y1, x2, y2, x3, y3]
 * @return {Function} transformer If fail, return null/undefined.
 */


function buildTransformer(src, dest) {
  var mA = [[src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]], [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]], [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]], [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]], [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]], [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]], [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]], [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]];
  var detCache = {};
  var det = determinant(mA, 8, 0, 0, 0, detCache);

  if (det === 0) {
    return;
  } // `invert(mA) * dest`, that is, `adj(mA) / det * dest`.


  var vh = [];

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      vh[j] == null && (vh[j] = 0);
      vh[j] += ((i + j) % 2 ? -1 : 1) * // det(subMatrix(i, j))
      determinant(mA, 7, i === 0 ? 1 : 0, 1 << i, 1 << j, detCache) / det * dest[i];
    }
  }

  return function (out, srcPointX, srcPointY) {
    var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
    out[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
    out[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
  };
}

exports.buildTransformer = buildTransformer;

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var _event = __webpack_require__(82);

var addEventListener = _event.addEventListener;
var removeEventListener = _event.removeEventListener;
var normalizeEvent = _event.normalizeEvent;
var getNativeEvent = _event.getNativeEvent;

var zrUtil = __webpack_require__(5);

var Eventful = __webpack_require__(85);

var env = __webpack_require__(36);

/* global document */
var TOUCH_CLICK_DELAY = 300;
var globalEventSupported = env.domSupported;

var localNativeListenerNames = function () {
  var mouseHandlerNames = ['click', 'dblclick', 'mousewheel', 'mouseout', 'mouseup', 'mousedown', 'mousemove', 'contextmenu'];
  var touchHandlerNames = ['touchstart', 'touchend', 'touchmove'];
  var pointerEventNameMap = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  };
  var pointerHandlerNames = zrUtil.map(mouseHandlerNames, function (name) {
    var nm = name.replace('mouse', 'pointer');
    return pointerEventNameMap.hasOwnProperty(nm) ? nm : name;
  });
  return {
    mouse: mouseHandlerNames,
    touch: touchHandlerNames,
    pointer: pointerHandlerNames
  };
}();

var globalNativeListenerNames = {
  mouse: ['mousemove', 'mouseup'],
  pointer: ['pointermove', 'pointerup']
};

function eventNameFix(name) {
  return name === 'mousewheel' && env.browser.firefox ? 'DOMMouseScroll' : name;
}

function isPointerFromTouch(event) {
  var pointerType = event.pointerType;
  return pointerType === 'pen' || pointerType === 'touch';
} // function useMSGuesture(handlerProxy, event) {
//     return isPointerFromTouch(event) && !!handlerProxy._msGesture;
// }
// function onMSGestureChange(proxy, event) {
//     if (event.translationX || event.translationY) {
//         // mousemove is carried by MSGesture to reduce the sensitivity.
//         proxy.handler.dispatchToElement(event.target, 'mousemove', event);
//     }
//     if (event.scale !== 1) {
//         event.pinchX = event.offsetX;
//         event.pinchY = event.offsetY;
//         event.pinchScale = event.scale;
//         proxy.handler.dispatchToElement(event.target, 'pinch', event);
//     }
// }

/**
 * Prevent mouse event from being dispatched after Touch Events action
 * @see <https://github.com/deltakosh/handjs/blob/master/src/hand.base.js>
 * 1. Mobile browsers dispatch mouse events 300ms after touchend.
 * 2. Chrome for Android dispatch mousedown for long-touch about 650ms
 * Result: Blocking Mouse Events for 700ms.
 *
 * @param {DOMHandlerScope} scope
 */


function setTouchTimer(scope) {
  scope.touching = true;

  if (scope.touchTimer != null) {
    clearTimeout(scope.touchTimer);
    scope.touchTimer = null;
  }

  scope.touchTimer = setTimeout(function () {
    scope.touching = false;
    scope.touchTimer = null;
  }, 700);
} // Mark touch, which is useful in distinguish touch and
// mouse event in upper applicatoin.


function markTouch(event) {
  event && (event.zrByTouch = true);
} // function markTriggeredFromLocal(event) {
//     event && (event.__zrIsFromLocal = true);
// }
// function isTriggeredFromLocal(instance, event) {
//     return !!(event && event.__zrIsFromLocal);
// }


function normalizeGlobalEvent(instance, event) {
  // offsetX, offsetY still need to be calculated. They are necessary in the event
  // handlers of the upper applications. Set `true` to force calculate them.
  return normalizeEvent(instance.dom, new FakeGlobalEvent(instance, event), true);
}
/**
 * Detect whether the given el is in `painterRoot`.
 */


function isLocalEl(instance, el) {
  var isLocal = false;

  do {
    el = el && el.parentNode;
  } while (el && el.nodeType !== 9 && !(isLocal = el === instance.painterRoot));

  return isLocal;
}
/**
 * Make a fake event but not change the original event,
 * becuase the global event probably be used by other
 * listeners not belonging to zrender.
 * @class
 */


function FakeGlobalEvent(instance, event) {
  this.type = event.type;
  this.target = this.currentTarget = instance.dom;
  this.pointerType = event.pointerType; // Necessray for the force calculation of zrX, zrY

  this.clientX = event.clientX;
  this.clientY = event.clientY; // Because we do not mount global listeners to touch events,
  // we do not copy `targetTouches` and `changedTouches` here.
}

var fakeGlobalEventProto = FakeGlobalEvent.prototype; // we make the default methods on the event do nothing,
// otherwise it is dangerous. See more details in
// [Drag outside] in `Handler.js`.

fakeGlobalEventProto.stopPropagation = fakeGlobalEventProto.stopImmediatePropagation = fakeGlobalEventProto.preventDefault = zrUtil.noop;
/**
 * Local DOM Handlers
 * @this {HandlerProxy}
 */

var localDOMHandlers = {
  mousedown: function (event) {
    event = normalizeEvent(this.dom, event);
    this._mayPointerCapture = [event.zrX, event.zrY];
    this.trigger('mousedown', event);
  },
  mousemove: function (event) {
    event = normalizeEvent(this.dom, event);
    var downPoint = this._mayPointerCapture;

    if (downPoint && (event.zrX !== downPoint[0] || event.zrY !== downPoint[1])) {
      togglePointerCapture(this, true);
    }

    this.trigger('mousemove', event);
  },
  mouseup: function (event) {
    event = normalizeEvent(this.dom, event);
    togglePointerCapture(this, false);
    this.trigger('mouseup', event);
  },
  mouseout: function (event) {
    event = normalizeEvent(this.dom, event); // Similarly to the browser did on `document` and touch event,
    // `globalout` will be delayed to final pointer cature release.

    if (this._pointerCapturing) {
      event.zrEventControl = 'no_globalout';
    } // There might be some doms created by upper layer application
    // at the same level of painter.getViewportRoot() (e.g., tooltip
    // dom created by echarts), where 'globalout' event should not
    // be triggered when mouse enters these doms. (But 'mouseout'
    // should be triggered at the original hovered element as usual).


    var element = event.toElement || event.relatedTarget;
    event.zrIsToLocalDOM = isLocalEl(this, element);
    this.trigger('mouseout', event);
  },
  touchstart: function (event) {
    // Default mouse behaviour should not be disabled here.
    // For example, page may needs to be slided.
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this._lastTouchMoment = new Date();
    this.handler.processGesture(event, 'start'); // For consistent event listener for both touch device and mouse device,
    // we simulate "mouseover-->mousedown" in touch device. So we trigger
    // `mousemove` here (to trigger `mouseover` inside), and then trigger
    // `mousedown`.

    localDOMHandlers.mousemove.call(this, event);
    localDOMHandlers.mousedown.call(this, event);
  },
  touchmove: function (event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, 'change'); // Mouse move should always be triggered no matter whether
    // there is gestrue event, because mouse move and pinch may
    // be used at the same time.

    localDOMHandlers.mousemove.call(this, event);
  },
  touchend: function (event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, 'end');
    localDOMHandlers.mouseup.call(this, event); // Do not trigger `mouseout` here, in spite of `mousemove`(`mouseover`) is
    // triggered in `touchstart`. This seems to be illogical, but by this mechanism,
    // we can conveniently implement "hover style" in both PC and touch device just
    // by listening to `mouseover` to add "hover style" and listening to `mouseout`
    // to remove "hover style" on an element, without any additional code for
    // compatibility. (`mouseout` will not be triggered in `touchend`, so "hover
    // style" will remain for user view)
    // click event should always be triggered no matter whether
    // there is gestrue event. System click can not be prevented.

    if (+new Date() - this._lastTouchMoment < TOUCH_CLICK_DELAY) {
      localDOMHandlers.click.call(this, event);
    }
  },
  pointerdown: function (event) {
    localDOMHandlers.mousedown.call(this, event); // if (useMSGuesture(this, event)) {
    //     this._msGesture.addPointer(event.pointerId);
    // }
  },
  pointermove: function (event) {
    // FIXME
    // pointermove is so sensitive that it always triggered when
    // tap(click) on touch screen, which affect some judgement in
    // upper application. So, we dont support mousemove on MS touch
    // device yet.
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function (event) {
    localDOMHandlers.mouseup.call(this, event);
  },
  pointerout: function (event) {
    // pointerout will be triggered when tap on touch screen
    // (IE11+/Edge on MS Surface) after click event triggered,
    // which is inconsistent with the mousout behavior we defined
    // in touchend. So we unify them.
    // (check localDOMHandlers.touchend for detailed explanation)
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mouseout.call(this, event);
    }
  }
};
/**
 * Othere DOM UI Event handlers for zr dom.
 * @this {HandlerProxy}
 */

zrUtil.each(['click', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
  localDOMHandlers[name] = function (event) {
    event = normalizeEvent(this.dom, event);
    this.trigger(name, event);
  };
});
/**
 * DOM UI Event handlers for global page.
 *
 * [Caution]:
 * those handlers should both support in capture phase and bubble phase!
 *
 * @this {HandlerProxy}
 */

var globalDOMHandlers = {
  pointermove: function (event) {
    // FIXME
    // pointermove is so sensitive that it always triggered when
    // tap(click) on touch screen, which affect some judgement in
    // upper application. So, we dont support mousemove on MS touch
    // device yet.
    if (!isPointerFromTouch(event)) {
      globalDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function (event) {
    globalDOMHandlers.mouseup.call(this, event);
  },
  mousemove: function (event) {
    this.trigger('mousemove', event);
  },
  mouseup: function (event) {
    var pointerCaptureReleasing = this._pointerCapturing;
    togglePointerCapture(this, false);
    this.trigger('mouseup', event);

    if (pointerCaptureReleasing) {
      event.zrEventControl = 'only_globalout';
      this.trigger('mouseout', event);
    }
  }
};
/**
 * @param {HandlerProxy} instance
 * @param {DOMHandlerScope} scope
 */

function mountLocalDOMEventListeners(instance, scope) {
  var domHandlers = scope.domHandlers;

  if (env.pointerEventsSupported) {
    // Only IE11+/Edge
    // 1. On devices that both enable touch and mouse (e.g., MS Surface and lenovo X240),
    // IE11+/Edge do not trigger touch event, but trigger pointer event and mouse event
    // at the same time.
    // 2. On MS Surface, it probablely only trigger mousedown but no mouseup when tap on
    // screen, which do not occurs in pointer event.
    // So we use pointer event to both detect touch gesture and mouse behavior.
    zrUtil.each(localNativeListenerNames.pointer, function (nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function (event) {
        // markTriggeredFromLocal(event);
        domHandlers[nativeEventName].call(instance, event);
      });
    }); // FIXME
    // Note: MS Gesture require CSS touch-action set. But touch-action is not reliable,
    // which does not prevent defuault behavior occasionally (which may cause view port
    // zoomed in but use can not zoom it back). And event.preventDefault() does not work.
    // So we have to not to use MSGesture and not to support touchmove and pinch on MS
    // touch screen. And we only support click behavior on MS touch screen now.
    // MS Gesture Event is only supported on IE11+/Edge and on Windows 8+.
    // We dont support touch on IE on win7.
    // See <https://msdn.microsoft.com/en-us/library/dn433243(v=vs.85).aspx>
    // if (typeof MSGesture === 'function') {
    //     (this._msGesture = new MSGesture()).target = dom; // jshint ignore:line
    //     dom.addEventListener('MSGestureChange', onMSGestureChange);
    // }
  } else {
    if (env.touchEventsSupported) {
      zrUtil.each(localNativeListenerNames.touch, function (nativeEventName) {
        mountSingleDOMEventListener(scope, nativeEventName, function (event) {
          // markTriggeredFromLocal(event);
          domHandlers[nativeEventName].call(instance, event);
          setTouchTimer(scope);
        });
      }); // Handler of 'mouseout' event is needed in touch mode, which will be mounted below.
      // addEventListener(root, 'mouseout', this._mouseoutHandler);
    } // 1. Considering some devices that both enable touch and mouse event (like on MS Surface
    // and lenovo X240, @see #2350), we make mouse event be always listened, otherwise
    // mouse event can not be handle in those devices.
    // 2. On MS Surface, Chrome will trigger both touch event and mouse event. How to prevent
    // mouseevent after touch event triggered, see `setTouchTimer`.


    zrUtil.each(localNativeListenerNames.mouse, function (nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function (event) {
        event = getNativeEvent(event);

        if (!scope.touching) {
          // markTriggeredFromLocal(event);
          domHandlers[nativeEventName].call(instance, event);
        }
      });
    });
  }
}
/**
 * @param {HandlerProxy} instance
 * @param {DOMHandlerScope} scope
 */


function mountGlobalDOMEventListeners(instance, scope) {
  // Only IE11+/Edge. See the comment in `mountLocalDOMEventListeners`.
  if (env.pointerEventsSupported) {
    zrUtil.each(globalNativeListenerNames.pointer, mount);
  } // Touch event has implemented "drag outside" so we do not mount global listener for touch event.
  // (see https://www.w3.org/TR/touch-events/#the-touchmove-event)
  // We do not consider "both-support-touch-and-mouse device" for this feature (see the comment of
  // `mountLocalDOMEventListeners`) to avoid bugs util some requirements come.
  else if (!env.touchEventsSupported) {
      zrUtil.each(globalNativeListenerNames.mouse, mount);
    }

  function mount(nativeEventName) {
    function nativeEventListener(event) {
      event = getNativeEvent(event); // See the reason in [Drag outside] in `Handler.js`
      // This checking supports both `useCapture` or not.
      // PENDING: if there is performance issue in some devices,
      // we probably can not use `useCapture` and change a easier
      // to judes whether local (mark).

      if (!isLocalEl(instance, event.target)) {
        event = normalizeGlobalEvent(instance, event);
        scope.domHandlers[nativeEventName].call(instance, event);
      }
    }

    mountSingleDOMEventListener(scope, nativeEventName, nativeEventListener, {
      capture: true
    } // See [Drag Outside] in `Handler.js`
    );
  }
}

function mountSingleDOMEventListener(scope, nativeEventName, listener, opt) {
  scope.mounted[nativeEventName] = listener;
  scope.listenerOpts[nativeEventName] = opt;
  addEventListener(scope.domTarget, eventNameFix(nativeEventName), listener, opt);
}

function unmountDOMEventListeners(scope) {
  var mounted = scope.mounted;

  for (var nativeEventName in mounted) {
    if (mounted.hasOwnProperty(nativeEventName)) {
      removeEventListener(scope.domTarget, eventNameFix(nativeEventName), mounted[nativeEventName], scope.listenerOpts[nativeEventName]);
    }
  }

  scope.mounted = {};
}
/**
 * See [Drag Outside] in `Handler.js`.
 * @implement
 * @param {boolean} isPointerCapturing Should never be `null`/`undefined`.
 *        `true`: start to capture pointer if it is not capturing.
 *        `false`: end the capture if it is capturing.
 */


function togglePointerCapture(instance, isPointerCapturing) {
  instance._mayPointerCapture = null;

  if (globalEventSupported && instance._pointerCapturing ^ isPointerCapturing) {
    instance._pointerCapturing = isPointerCapturing;
    var globalHandlerScope = instance._globalHandlerScope;
    isPointerCapturing ? mountGlobalDOMEventListeners(instance, globalHandlerScope) : unmountDOMEventListeners(globalHandlerScope);
  }
}
/**
 * @inner
 * @class
 */


function DOMHandlerScope(domTarget, domHandlers) {
  this.domTarget = domTarget;
  this.domHandlers = domHandlers; // Key: eventName, value: mounted handler funcitons.
  // Used for unmount.

  this.mounted = {};
  this.listenerOpts = {};
  this.touchTimer = null;
  this.touching = false;
}
/**
 * @public
 * @class
 */


function HandlerDomProxy(dom, painterRoot) {
  Eventful.call(this);
  this.dom = dom;
  this.painterRoot = painterRoot;
  this._localHandlerScope = new DOMHandlerScope(dom, localDOMHandlers);

  if (globalEventSupported) {
    this._globalHandlerScope = new DOMHandlerScope(document, globalDOMHandlers);
  }
  /**
   * @type {boolean}
   */


  this._pointerCapturing = false;
  /**
   * @type {Array.<number>} [x, y] or null.
   */

  this._mayPointerCapture = null;
  mountLocalDOMEventListeners(this, this._localHandlerScope);
}

var handlerDomProxyProto = HandlerDomProxy.prototype;

handlerDomProxyProto.dispose = function () {
  unmountDOMEventListeners(this._localHandlerScope);

  if (globalEventSupported) {
    unmountDOMEventListeners(this._globalHandlerScope);
  }
};

handlerDomProxyProto.setCursor = function (cursorStyle) {
  this.dom.style && (this.dom.style.cursor = cursorStyle || 'default');
};

zrUtil.mixin(HandlerDomProxy, Eventful);
var _default = HandlerDomProxy;
module.exports = _default;

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(5);

exports.util = zrUtil;

var matrix = __webpack_require__(54);

exports.matrix = matrix;

var vector = __webpack_require__(20);

exports.vector = vector;

var colorTool = __webpack_require__(86);

exports.color = colorTool;

var pathTool = __webpack_require__(184);

exports.path = pathTool;

var _parseSVG = __webpack_require__(437);

var parseSVG = _parseSVG.parseSVG;
exports.parseSVG = _parseSVG.parseSVG;

var _Group = __webpack_require__(117);

exports.Group = _Group;

var _Path = __webpack_require__(9);

exports.Path = _Path;

var _Image = __webpack_require__(55);

exports.Image = _Image;

var _CompoundPath = __webpack_require__(413);

exports.CompoundPath = _CompoundPath;

var _Text = __webpack_require__(56);

exports.Text = _Text;

var _IncrementalDisplayable = __webpack_require__(414);

exports.IncrementalDisplayable = _IncrementalDisplayable;

var _Arc = __webpack_require__(419);

exports.Arc = _Arc;

var _BezierCurve = __webpack_require__(420);

exports.BezierCurve = _BezierCurve;

var _Circle = __webpack_require__(178);

exports.Circle = _Circle;

var _Droplet = __webpack_require__(421);

exports.Droplet = _Droplet;

var _Ellipse = __webpack_require__(179);

exports.Ellipse = _Ellipse;

var _Heart = __webpack_require__(422);

exports.Heart = _Heart;

var _Isogon = __webpack_require__(423);

exports.Isogon = _Isogon;

var _Line = __webpack_require__(180);

exports.Line = _Line;

var _Polygon = __webpack_require__(181);

exports.Polygon = _Polygon;

var _Polyline = __webpack_require__(182);

exports.Polyline = _Polyline;

var _Rect = __webpack_require__(183);

exports.Rect = _Rect;

var _Ring = __webpack_require__(424);

exports.Ring = _Ring;

var _Rose = __webpack_require__(425);

exports.Rose = _Rose;

var _Sector = __webpack_require__(426);

exports.Sector = _Sector;

var _Star = __webpack_require__(427);

exports.Star = _Star;

var _Trochoid = __webpack_require__(428);

exports.Trochoid = _Trochoid;

var _LinearGradient = __webpack_require__(172);

exports.LinearGradient = _LinearGradient;

var _RadialGradient = __webpack_require__(415);

exports.RadialGradient = _RadialGradient;

var _Pattern = __webpack_require__(119);

exports.Pattern = _Pattern;

var _BoundingRect = __webpack_require__(30);

exports.BoundingRect = _BoundingRect;

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

// CompoundPath to improve performance
var _default = Path.extend({
  type: 'compound',
  shape: {
    paths: null
  },
  _updatePathDirty: function () {
    var dirtyPath = this.__dirtyPath;
    var paths = this.shape.paths;

    for (var i = 0; i < paths.length; i++) {
      // Mark as dirty if any subpath is dirty
      dirtyPath = dirtyPath || paths[i].__dirtyPath;
    }

    this.__dirtyPath = dirtyPath;
    this.__dirty = this.__dirty || dirtyPath;
  },
  beforeBrush: function () {
    this._updatePathDirty();

    var paths = this.shape.paths || [];
    var scale = this.getGlobalScale(); // Update path scale

    for (var i = 0; i < paths.length; i++) {
      if (!paths[i].path) {
        paths[i].createPathProxy();
      }

      paths[i].path.setScale(scale[0], scale[1], paths[i].segmentIgnoreThreshold);
    }
  },
  buildPath: function (ctx, shape) {
    var paths = shape.paths || [];

    for (var i = 0; i < paths.length; i++) {
      paths[i].buildPath(ctx, paths[i].shape, true);
    }
  },
  afterBrush: function () {
    var paths = this.shape.paths || [];

    for (var i = 0; i < paths.length; i++) {
      paths[i].__dirtyPath = false;
    }
  },
  getBoundingRect: function () {
    this._updatePathDirty();

    return Path.prototype.getBoundingRect.call(this);
  }
});

module.exports = _default;

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(5);

var inherits = _util.inherits;

var Displayble = __webpack_require__(64);

var BoundingRect = __webpack_require__(30);

/**
 * Displayable for incremental rendering. It will be rendered in a separate layer
 * IncrementalDisplay have two main methods. `clearDisplayables` and `addDisplayables`
 * addDisplayables will render the added displayables incremetally.
 *
 * It use a not clearFlag to tell the painter don't clear the layer if it's the first element.
 */
// TODO Style override ?
function IncrementalDisplayble(opts) {
  Displayble.call(this, opts);
  this._displayables = [];
  this._temporaryDisplayables = [];
  this._cursor = 0;
  this.notClear = true;
}

IncrementalDisplayble.prototype.incremental = true;

IncrementalDisplayble.prototype.clearDisplaybles = function () {
  this._displayables = [];
  this._temporaryDisplayables = [];
  this._cursor = 0;
  this.dirty();
  this.notClear = false;
};

IncrementalDisplayble.prototype.addDisplayable = function (displayable, notPersistent) {
  if (notPersistent) {
    this._temporaryDisplayables.push(displayable);
  } else {
    this._displayables.push(displayable);
  }

  this.dirty();
};

IncrementalDisplayble.prototype.addDisplayables = function (displayables, notPersistent) {
  notPersistent = notPersistent || false;

  for (var i = 0; i < displayables.length; i++) {
    this.addDisplayable(displayables[i], notPersistent);
  }
};

IncrementalDisplayble.prototype.eachPendingDisplayable = function (cb) {
  for (var i = this._cursor; i < this._displayables.length; i++) {
    cb && cb(this._displayables[i]);
  }

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    cb && cb(this._temporaryDisplayables[i]);
  }
};

IncrementalDisplayble.prototype.update = function () {
  this.updateTransform();

  for (var i = this._cursor; i < this._displayables.length; i++) {
    var displayable = this._displayables[i]; // PENDING

    displayable.parent = this;
    displayable.update();
    displayable.parent = null;
  }

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    var displayable = this._temporaryDisplayables[i]; // PENDING

    displayable.parent = this;
    displayable.update();
    displayable.parent = null;
  }
};

IncrementalDisplayble.prototype.brush = function (ctx, prevEl) {
  // Render persistant displayables.
  for (var i = this._cursor; i < this._displayables.length; i++) {
    var displayable = this._displayables[i];
    displayable.beforeBrush && displayable.beforeBrush(ctx);
    displayable.brush(ctx, i === this._cursor ? null : this._displayables[i - 1]);
    displayable.afterBrush && displayable.afterBrush(ctx);
  }

  this._cursor = i; // Render temporary displayables.

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    var displayable = this._temporaryDisplayables[i];
    displayable.beforeBrush && displayable.beforeBrush(ctx);
    displayable.brush(ctx, i === 0 ? null : this._temporaryDisplayables[i - 1]);
    displayable.afterBrush && displayable.afterBrush(ctx);
  }

  this._temporaryDisplayables = [];
  this.notClear = true;
};

var m = [];

IncrementalDisplayble.prototype.getBoundingRect = function () {
  if (!this._rect) {
    var rect = new BoundingRect(Infinity, Infinity, -Infinity, -Infinity);

    for (var i = 0; i < this._displayables.length; i++) {
      var displayable = this._displayables[i];
      var childRect = displayable.getBoundingRect().clone();

      if (displayable.needLocalTransform()) {
        childRect.applyTransform(displayable.getLocalTransform(m));
      }

      rect.union(childRect);
    }

    this._rect = rect;
  }

  return this._rect;
};

IncrementalDisplayble.prototype.contain = function (x, y) {
  var localPos = this.transformCoordToLocal(x, y);
  var rect = this.getBoundingRect();

  if (rect.contain(localPos[0], localPos[1])) {
    for (var i = 0; i < this._displayables.length; i++) {
      var displayable = this._displayables[i];

      if (displayable.contain(x, y)) {
        return true;
      }
    }
  }

  return false;
};

inherits(IncrementalDisplayble, Displayble);
var _default = IncrementalDisplayble;
module.exports = _default;

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(5);

var Gradient = __webpack_require__(118);

/**
 * x, y, r are all percent from 0 to 1
 * @param {number} [x=0.5]
 * @param {number} [y=0.5]
 * @param {number} [r=0.5]
 * @param {Array.<Object>} [colorStops]
 * @param {boolean} [globalCoord=false]
 */
var RadialGradient = function (x, y, r, colorStops, globalCoord) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {type: 'radial', colorStops: ...}`, where
  // this constructor will not be called.
  this.x = x == null ? 0.5 : x;
  this.y = y == null ? 0.5 : y;
  this.r = r == null ? 0.5 : r; // Can be cloned

  this.type = 'radial'; // If use global coord

  this.global = globalCoord || false;
  Gradient.call(this, colorStops);
};

RadialGradient.prototype = {
  constructor: RadialGradient
};
zrUtil.inherits(RadialGradient, Gradient);
var _default = RadialGradient;
module.exports = _default;

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__(36);

// Fix weird bug in some version of IE11 (like 11.0.9600.178**),
// where exception "unexpected call to method or property access"
// might be thrown when calling ctx.fill or ctx.stroke after a path
// whose area size is zero is drawn and ctx.clip() is called and
// shadowBlur is set. See #4572, #3112, #5777.
// (e.g.,
//  ctx.moveTo(10, 10);
//  ctx.lineTo(20, 10);
//  ctx.closePath();
//  ctx.clip();
//  ctx.shadowBlur = 10;
//  ...
//  ctx.fill();
// )
var shadowTemp = [['shadowBlur', 0], ['shadowColor', '#000'], ['shadowOffsetX', 0], ['shadowOffsetY', 0]];

function _default(orignalBrush) {
  // version string can be: '11.0'
  return env.browser.ie && env.browser.version >= 11 ? function () {
    var clipPaths = this.__clipPaths;
    var style = this.style;
    var modified;

    if (clipPaths) {
      for (var i = 0; i < clipPaths.length; i++) {
        var clipPath = clipPaths[i];
        var shape = clipPath && clipPath.shape;
        var type = clipPath && clipPath.type;

        if (shape && (type === 'sector' && shape.startAngle === shape.endAngle || type === 'rect' && (!shape.width || !shape.height))) {
          for (var j = 0; j < shadowTemp.length; j++) {
            // It is save to put shadowTemp static, because shadowTemp
            // will be all modified each item brush called.
            shadowTemp[j][2] = style[shadowTemp[j][0]];
            style[shadowTemp[j][0]] = shadowTemp[j][1];
          }

          modified = true;
          break;
        }
      }
    }

    orignalBrush.apply(this, arguments);

    if (modified) {
      for (var j = 0; j < shadowTemp.length; j++) {
        style[shadowTemp[j][0]] = shadowTemp[j][2];
      }
    }
  } : orignalBrush;
}

module.exports = _default;

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

var _vector = __webpack_require__(20);

var v2Min = _vector.min;
var v2Max = _vector.max;
var v2Scale = _vector.scale;
var v2Distance = _vector.distance;
var v2Add = _vector.add;
var v2Clone = _vector.clone;
var v2Sub = _vector.sub;

/**
 * 贝塞尔平滑曲线
 * @module zrender/shape/util/smoothBezier
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * 贝塞尔平滑曲线
 * @alias module:zrender/shape/util/smoothBezier
 * @param {Array} points 线段顶点数组
 * @param {number} smooth 平滑等级, 0-1
 * @param {boolean} isLoop
 * @param {Array} constraint 将计算出来的控制点约束在一个包围盒内
 *                           比如 [[0, 0], [100, 100]], 这个包围盒会与
 *                           整个折线的包围盒做一个并集用来约束控制点。
 * @param {Array} 计算出来的控制点数组
 */
function _default(points, smooth, isLoop, constraint) {
  var cps = [];
  var v = [];
  var v1 = [];
  var v2 = [];
  var prevPoint;
  var nextPoint;
  var min;
  var max;

  if (constraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (var i = 0, len = points.length; i < len; i++) {
      v2Min(min, min, points[i]);
      v2Max(max, max, points[i]);
    } // 与指定的包围盒做并集


    v2Min(min, min, constraint[0]);
    v2Max(max, max, constraint[1]);
  }

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + 1) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(v2Clone(points[i]));
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }

    v2Sub(v, nextPoint, prevPoint); // use degree to scale the handle length

    v2Scale(v, v, smooth);
    var d0 = v2Distance(point, prevPoint);
    var d1 = v2Distance(point, nextPoint);
    var sum = d0 + d1;

    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    v2Scale(v1, v, -d0);
    v2Scale(v2, v, d1);
    var cp0 = v2Add([], point, v1);
    var cp1 = v2Add([], point, v2);

    if (constraint) {
      v2Max(cp0, cp0, min);
      v2Min(cp0, cp0, max);
      v2Max(cp1, cp1, min);
      v2Min(cp1, cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}

module.exports = _default;

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var _vector = __webpack_require__(20);

var v2Distance = _vector.distance;

/**
 * Catmull-Rom spline 插值折线
 * @module zrender/shape/util/smoothSpline
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * @inner
 */
function interpolate(p0, p1, p2, p3, t, t2, t3) {
  var v0 = (p2 - p0) * 0.5;
  var v1 = (p3 - p1) * 0.5;
  return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}
/**
 * @alias module:zrender/shape/util/smoothSpline
 * @param {Array} points 线段顶点数组
 * @param {boolean} isLoop
 * @return {Array}
 */


function _default(points, isLoop) {
  var len = points.length;
  var ret = [];
  var distance = 0;

  for (var i = 1; i < len; i++) {
    distance += v2Distance(points[i - 1], points[i]);
  }

  var segs = distance / 2;
  segs = segs < len ? len : segs;

  for (var i = 0; i < segs; i++) {
    var pos = i / (segs - 1) * (isLoop ? len : len - 1);
    var idx = Math.floor(pos);
    var w = pos - idx;
    var p0;
    var p1 = points[idx % len];
    var p2;
    var p3;

    if (!isLoop) {
      p0 = points[idx === 0 ? idx : idx - 1];
      p2 = points[idx > len - 2 ? len - 1 : idx + 1];
      p3 = points[idx > len - 3 ? len - 1 : idx + 2];
    } else {
      p0 = points[(idx - 1 + len) % len];
      p2 = points[(idx + 1) % len];
      p3 = points[(idx + 2) % len];
    }

    var w2 = w * w;
    var w3 = w * w2;
    ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
  }

  return ret;
}

module.exports = _default;

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 圆弧
 * @module zrender/graphic/shape/Arc
 */
var _default = Path.extend({
  type: 'arc',
  shape: {
    cx: 0,
    cy: 0,
    r: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    clockwise: true
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var r = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
  }
});

module.exports = _default;

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var vec2 = __webpack_require__(20);

var _curve = __webpack_require__(53);

var quadraticSubdivide = _curve.quadraticSubdivide;
var cubicSubdivide = _curve.cubicSubdivide;
var quadraticAt = _curve.quadraticAt;
var cubicAt = _curve.cubicAt;
var quadraticDerivativeAt = _curve.quadraticDerivativeAt;
var cubicDerivativeAt = _curve.cubicDerivativeAt;

/**
 * 贝塞尔曲线
 * @module zrender/shape/BezierCurve
 */
var out = [];

function someVectorAt(shape, t, isTangent) {
  var cpx2 = shape.cpx2;
  var cpy2 = shape.cpy2;

  if (cpx2 === null || cpy2 === null) {
    return [(isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t), (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)];
  } else {
    return [(isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t), (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)];
  }
}

var _default = Path.extend({
  type: 'bezier-curve',
  shape: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    cpx1: 0,
    cpy1: 0,
    // cpx2: 0,
    // cpy2: 0
    // Curve show percent, for animating
    percent: 1
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x1 = shape.x1;
    var y1 = shape.y1;
    var x2 = shape.x2;
    var y2 = shape.y2;
    var cpx1 = shape.cpx1;
    var cpy1 = shape.cpy1;
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    var percent = shape.percent;

    if (percent === 0) {
      return;
    }

    ctx.moveTo(x1, y1);

    if (cpx2 == null || cpy2 == null) {
      if (percent < 1) {
        quadraticSubdivide(x1, cpx1, x2, percent, out);
        cpx1 = out[1];
        x2 = out[2];
        quadraticSubdivide(y1, cpy1, y2, percent, out);
        cpy1 = out[1];
        y2 = out[2];
      }

      ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
    } else {
      if (percent < 1) {
        cubicSubdivide(x1, cpx1, cpx2, x2, percent, out);
        cpx1 = out[1];
        cpx2 = out[2];
        x2 = out[3];
        cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
        cpy1 = out[1];
        cpy2 = out[2];
        y2 = out[3];
      }

      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
  },

  /**
   * Get point at percent
   * @param  {number} t
   * @return {Array.<number>}
   */
  pointAt: function (t) {
    return someVectorAt(this.shape, t, false);
  },

  /**
   * Get tangent at percent
   * @param  {number} t
   * @return {Array.<number>}
   */
  tangentAt: function (t) {
    var p = someVectorAt(this.shape, t, true);
    return vec2.normalize(p, p);
  }
});

module.exports = _default;

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 水滴形状
 * @module zrender/graphic/shape/Droplet
 */
var _default = Path.extend({
  type: 'droplet',
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var a = shape.width;
    var b = shape.height;
    ctx.moveTo(x, y + a);
    ctx.bezierCurveTo(x + a, y + a, x + a * 3 / 2, y - a / 3, x, y - b);
    ctx.bezierCurveTo(x - a * 3 / 2, y - a / 3, x - a, y + a, x, y + a);
    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 心形
 * @module zrender/graphic/shape/Heart
 */
var _default = Path.extend({
  type: 'heart',
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var a = shape.width;
    var b = shape.height;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + a / 2, y - b * 2 / 3, x + a * 2, y + b / 3, x, y + b);
    ctx.bezierCurveTo(x - a * 2, y + b / 3, x - a / 2, y - b * 2 / 3, x, y);
  }
});

module.exports = _default;

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 正多边形
 * @module zrender/shape/Isogon
 */
var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;

var _default = Path.extend({
  type: 'isogon',
  shape: {
    x: 0,
    y: 0,
    r: 0,
    n: 0
  },
  buildPath: function (ctx, shape) {
    var n = shape.n;

    if (!n || n < 2) {
      return;
    }

    var x = shape.x;
    var y = shape.y;
    var r = shape.r;
    var dStep = 2 * PI / n;
    var deg = -PI / 2;
    ctx.moveTo(x + r * cos(deg), y + r * sin(deg));

    for (var i = 0, end = n - 1; i < end; i++) {
      deg += dStep;
      ctx.lineTo(x + r * cos(deg), y + r * sin(deg));
    }

    ctx.closePath();
    return;
  }
});

module.exports = _default;

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 圆环
 * @module zrender/graphic/shape/Ring
 */
var _default = Path.extend({
  type: 'ring',
  shape: {
    cx: 0,
    cy: 0,
    r: 0,
    r0: 0
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var PI2 = Math.PI * 2;
    ctx.moveTo(x + shape.r, y);
    ctx.arc(x, y, shape.r, 0, PI2, false);
    ctx.moveTo(x + shape.r0, y);
    ctx.arc(x, y, shape.r0, 0, PI2, true);
  }
});

module.exports = _default;

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 玫瑰线
 * @module zrender/graphic/shape/Rose
 */
var sin = Math.sin;
var cos = Math.cos;
var radian = Math.PI / 180;

var _default = Path.extend({
  type: 'rose',
  shape: {
    cx: 0,
    cy: 0,
    r: [],
    k: 0,
    n: 1
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x;
    var y;
    var R = shape.r;
    var r;
    var k = shape.k;
    var n = shape.n;
    var x0 = shape.cx;
    var y0 = shape.cy;
    ctx.moveTo(x0, y0);

    for (var i = 0, len = R.length; i < len; i++) {
      r = R[i];

      for (var j = 0; j <= 360 * n; j++) {
        x = r * sin(k / n * j % 360 * radian) * cos(j * radian) + x0;
        y = r * sin(k / n * j % 360 * radian) * sin(j * radian) + y0;
        ctx.lineTo(x, y);
      }
    }
  }
});

module.exports = _default;

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

var fixClipWithShadow = __webpack_require__(416);

/**
 * 扇形
 * @module zrender/graphic/shape/Sector
 */
var _default = Path.extend({
  type: 'sector',
  shape: {
    cx: 0,
    cy: 0,
    r0: 0,
    r: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    clockwise: true
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var r0 = Math.max(shape.r0 || 0, 0);
    var r = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r0 + x, unitY * r0 + y);
    ctx.lineTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
    ctx.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

    if (r0 !== 0) {
      ctx.arc(x, y, r0, endAngle, startAngle, clockwise);
    }

    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * n角星（n>3）
 * @module zrender/graphic/shape/Star
 */
var PI = Math.PI;
var cos = Math.cos;
var sin = Math.sin;

var _default = Path.extend({
  type: 'star',
  shape: {
    cx: 0,
    cy: 0,
    n: 3,
    r0: null,
    r: 0
  },
  buildPath: function (ctx, shape) {
    var n = shape.n;

    if (!n || n < 2) {
      return;
    }

    var x = shape.cx;
    var y = shape.cy;
    var r = shape.r;
    var r0 = shape.r0; // 如果未指定内部顶点外接圆半径，则自动计算

    if (r0 == null) {
      r0 = n > 4 // 相隔的外部顶点的连线的交点，
      // 被取为内部交点，以此计算r0
      ? r * cos(2 * PI / n) / cos(PI / n) // 二三四角星的特殊处理
      : r / 3;
    }

    var dStep = PI / n;
    var deg = -PI / 2;
    var xStart = x + r * cos(deg);
    var yStart = y + r * sin(deg);
    deg += dStep; // 记录边界点，用于判断inside

    ctx.moveTo(xStart, yStart);

    for (var i = 0, end = n * 2 - 1, ri; i < end; i++) {
      ri = i % 2 === 0 ? r0 : r;
      ctx.lineTo(x + ri * cos(deg), y + ri * sin(deg));
      deg += dStep;
    }

    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(9);

/**
 * 内外旋轮曲线
 * @module zrender/graphic/shape/Trochold
 */
var cos = Math.cos;
var sin = Math.sin;

var _default = Path.extend({
  type: 'trochoid',
  shape: {
    cx: 0,
    cy: 0,
    r: 0,
    r0: 0,
    d: 0,
    location: 'out'
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x1;
    var y1;
    var x2;
    var y2;
    var R = shape.r;
    var r = shape.r0;
    var d = shape.d;
    var offsetX = shape.cx;
    var offsetY = shape.cy;
    var delta = shape.location === 'out' ? 1 : -1;

    if (shape.location && R <= r) {
      return;
    }

    var num = 0;
    var i = 1;
    var theta;
    x1 = (R + delta * r) * cos(0) - delta * d * cos(0) + offsetX;
    y1 = (R + delta * r) * sin(0) - d * sin(0) + offsetY;
    ctx.moveTo(x1, y1); // 计算结束时的i

    do {
      num++;
    } while (r * num % (R + delta * r) !== 0);

    do {
      theta = Math.PI / 180 * i;
      x2 = (R + delta * r) * cos(theta) - delta * d * cos((R / r + delta) * theta) + offsetX;
      y2 = (R + delta * r) * sin(theta) - d * sin((R / r + delta) * theta) + offsetY;
      ctx.lineTo(x2, y2);
      i++;
    } while (i <= r * num / (R + delta * r) * 360);
  }
});

module.exports = _default;

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

var Animator = __webpack_require__(166);

var logError = __webpack_require__(63);

var _util = __webpack_require__(5);

var isString = _util.isString;
var isFunction = _util.isFunction;
var isObject = _util.isObject;
var isArrayLike = _util.isArrayLike;
var indexOf = _util.indexOf;

/**
 * @alias modue:zrender/mixin/Animatable
 * @constructor
 */
var Animatable = function () {
  /**
   * @type {Array.<module:zrender/animation/Animator>}
   * @readOnly
   */
  this.animators = [];
};

Animatable.prototype = {
  constructor: Animatable,

  /**
   * 动画
   *
   * @param {string} path The path to fetch value from object, like 'a.b.c'.
   * @param {boolean} [loop] Whether to loop animation.
   * @return {module:zrender/animation/Animator}
   * @example:
   *     el.animate('style', false)
   *         .when(1000, {x: 10} )
   *         .done(function(){ // Animation done })
   *         .start()
   */
  animate: function (path, loop) {
    var target;
    var animatingShape = false;
    var el = this;
    var zr = this.__zr;

    if (path) {
      var pathSplitted = path.split('.');
      var prop = el; // If animating shape

      animatingShape = pathSplitted[0] === 'shape';

      for (var i = 0, l = pathSplitted.length; i < l; i++) {
        if (!prop) {
          continue;
        }

        prop = prop[pathSplitted[i]];
      }

      if (prop) {
        target = prop;
      }
    } else {
      target = el;
    }

    if (!target) {
      logError('Property "' + path + '" is not existed in element ' + el.id);
      return;
    }

    var animators = el.animators;
    var animator = new Animator(target, loop);
    animator.during(function (target) {
      el.dirty(animatingShape);
    }).done(function () {
      // FIXME Animator will not be removed if use `Animator#stop` to stop animation
      animators.splice(indexOf(animators, animator), 1);
    });
    animators.push(animator); // If animate after added to the zrender

    if (zr) {
      zr.animation.addAnimator(animator);
    }

    return animator;
  },

  /**
   * 停止动画
   * @param {boolean} forwardToLast If move to last frame before stop
   */
  stopAnimation: function (forwardToLast) {
    var animators = this.animators;
    var len = animators.length;

    for (var i = 0; i < len; i++) {
      animators[i].stop(forwardToLast);
    }

    animators.length = 0;
    return this;
  },

  /**
   * Caution: this method will stop previous animation.
   * So do not use this method to one element twice before
   * animation starts, unless you know what you are doing.
   * @param {Object} target
   * @param {number} [time=500] Time in ms
   * @param {string} [easing='linear']
   * @param {number} [delay=0]
   * @param {Function} [callback]
   * @param {Function} [forceAnimate] Prevent stop animation and callback
   *        immediently when target values are the same as current values.
   *
   * @example
   *  // Animate position
   *  el.animateTo({
   *      position: [10, 10]
   *  }, function () { // done })
   *
   *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
   *  el.animateTo({
   *      shape: {
   *          width: 500
   *      },
   *      style: {
   *          fill: 'red'
   *      }
   *      position: [10, 10]
   *  }, 100, 100, 'cubicOut', function () { // done })
   */
  // TODO Return animation key
  animateTo: function (target, time, delay, easing, callback, forceAnimate) {
    animateTo(this, target, time, delay, easing, callback, forceAnimate);
  },

  /**
   * Animate from the target state to current state.
   * The params and the return value are the same as `this.animateTo`.
   */
  animateFrom: function (target, time, delay, easing, callback, forceAnimate) {
    animateTo(this, target, time, delay, easing, callback, forceAnimate, true);
  }
};

function animateTo(animatable, target, time, delay, easing, callback, forceAnimate, reverse) {
  // animateTo(target, time, easing, callback);
  if (isString(delay)) {
    callback = easing;
    easing = delay;
    delay = 0;
  } // animateTo(target, time, delay, callback);
  else if (isFunction(easing)) {
      callback = easing;
      easing = 'linear';
      delay = 0;
    } // animateTo(target, time, callback);
    else if (isFunction(delay)) {
        callback = delay;
        delay = 0;
      } // animateTo(target, callback)
      else if (isFunction(time)) {
          callback = time;
          time = 500;
        } // animateTo(target)
        else if (!time) {
            time = 500;
          } // Stop all previous animations


  animatable.stopAnimation();
  animateToShallow(animatable, '', animatable, target, time, delay, reverse); // Animators may be removed immediately after start
  // if there is nothing to animate

  var animators = animatable.animators.slice();
  var count = animators.length;

  function done() {
    count--;

    if (!count) {
      callback && callback();
    }
  } // No animators. This should be checked before animators[i].start(),
  // because 'done' may be executed immediately if no need to animate.


  if (!count) {
    callback && callback();
  } // Start after all animators created
  // Incase any animator is done immediately when all animation properties are not changed


  for (var i = 0; i < animators.length; i++) {
    animators[i].done(done).start(easing, forceAnimate);
  }
}
/**
 * @param {string} path=''
 * @param {Object} source=animatable
 * @param {Object} target
 * @param {number} [time=500]
 * @param {number} [delay=0]
 * @param {boolean} [reverse] If `true`, animate
 *        from the `target` to current state.
 *
 * @example
 *  // Animate position
 *  el._animateToShallow({
 *      position: [10, 10]
 *  })
 *
 *  // Animate shape, style and position in 100ms, delayed 100ms
 *  el._animateToShallow({
 *      shape: {
 *          width: 500
 *      },
 *      style: {
 *          fill: 'red'
 *      }
 *      position: [10, 10]
 *  }, 100, 100)
 */


function animateToShallow(animatable, path, source, target, time, delay, reverse) {
  var objShallow = {};
  var propertyCount = 0;

  for (var name in target) {
    if (!target.hasOwnProperty(name)) {
      continue;
    }

    if (source[name] != null) {
      if (isObject(target[name]) && !isArrayLike(target[name])) {
        animateToShallow(animatable, path ? path + '.' + name : name, source[name], target[name], time, delay, reverse);
      } else {
        if (reverse) {
          objShallow[name] = source[name];
          setAttrByPath(animatable, path, name, target[name]);
        } else {
          objShallow[name] = target[name];
        }

        propertyCount++;
      }
    } else if (target[name] != null && !reverse) {
      setAttrByPath(animatable, path, name, target[name]);
    }
  }

  if (propertyCount > 0) {
    animatable.animate(path, false).when(time == null ? 500 : time, objShallow).delay(delay || 0);
  }
}

function setAttrByPath(el, path, name, value) {
  // Attr directly if not has property
  // FIXME, if some property not needed for element ?
  if (!path) {
    el.attr(name, value);
  } else {
    // Only support set shape or style
    var props = {};
    props[path] = {};
    props[path][name] = value;
    el.attr(props);
  }
}

var _default = Animatable;
module.exports = _default;

/***/ }),
/* 430 */
/***/ (function(module, exports) {

// TODO Draggable for group
// FIXME Draggable on element which has parent rotation or scale
function Draggable() {
  this.on('mousedown', this._dragStart, this);
  this.on('mousemove', this._drag, this);
  this.on('mouseup', this._dragEnd, this); // `mosuemove` and `mouseup` can be continue to fire when dragging.
  // See [Drag outside] in `Handler.js`. So we do not need to trigger
  // `_dragEnd` when globalout. That would brings better user experience.
  // this.on('globalout', this._dragEnd, this);
  // this._dropTarget = null;
  // this._draggingTarget = null;
  // this._x = 0;
  // this._y = 0;
}

Draggable.prototype = {
  constructor: Draggable,
  _dragStart: function (e) {
    var draggingTarget = e.target;

    if (draggingTarget && draggingTarget.draggable) {
      this._draggingTarget = draggingTarget;
      draggingTarget.dragging = true;
      this._x = e.offsetX;
      this._y = e.offsetY;
      this.dispatchToElement(param(draggingTarget, e), 'dragstart', e.event);
    }
  },
  _drag: function (e) {
    var draggingTarget = this._draggingTarget;

    if (draggingTarget) {
      var x = e.offsetX;
      var y = e.offsetY;
      var dx = x - this._x;
      var dy = y - this._y;
      this._x = x;
      this._y = y;
      draggingTarget.drift(dx, dy, e);
      this.dispatchToElement(param(draggingTarget, e), 'drag', e.event);
      var dropTarget = this.findHover(x, y, draggingTarget).target;
      var lastDropTarget = this._dropTarget;
      this._dropTarget = dropTarget;

      if (draggingTarget !== dropTarget) {
        if (lastDropTarget && dropTarget !== lastDropTarget) {
          this.dispatchToElement(param(lastDropTarget, e), 'dragleave', e.event);
        }

        if (dropTarget && dropTarget !== lastDropTarget) {
          this.dispatchToElement(param(dropTarget, e), 'dragenter', e.event);
        }
      }
    }
  },
  _dragEnd: function (e) {
    var draggingTarget = this._draggingTarget;

    if (draggingTarget) {
      draggingTarget.dragging = false;
    }

    this.dispatchToElement(param(draggingTarget, e), 'dragend', e.event);

    if (this._dropTarget) {
      this.dispatchToElement(param(this._dropTarget, e), 'drop', e.event);
    }

    this._draggingTarget = null;
    this._dropTarget = null;
  }
};

function param(target, e) {
  return {
    target: target,
    topTarget: e && e.topTarget
  };
}

var _default = Draggable;
module.exports = _default;

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

var matrix = __webpack_require__(54);

var vector = __webpack_require__(20);

/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */
var mIdentity = matrix.identity;
var EPSILON = 5e-5;

function isNotAroundZero(val) {
  return val > EPSILON || val < -EPSILON;
}
/**
 * @alias module:zrender/mixin/Transformable
 * @constructor
 */


var Transformable = function (opts) {
  opts = opts || {}; // If there are no given position, rotation, scale

  if (!opts.position) {
    /**
     * 平移
     * @type {Array.<number>}
     * @default [0, 0]
     */
    this.position = [0, 0];
  }

  if (opts.rotation == null) {
    /**
     * 旋转
     * @type {Array.<number>}
     * @default 0
     */
    this.rotation = 0;
  }

  if (!opts.scale) {
    /**
     * 缩放
     * @type {Array.<number>}
     * @default [1, 1]
     */
    this.scale = [1, 1];
  }
  /**
   * 旋转和缩放的原点
   * @type {Array.<number>}
   * @default null
   */


  this.origin = this.origin || null;
};

var transformableProto = Transformable.prototype;
transformableProto.transform = null;
/**
 * 判断是否需要有坐标变换
 * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
 */

transformableProto.needLocalTransform = function () {
  return isNotAroundZero(this.rotation) || isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1]) || isNotAroundZero(this.scale[0] - 1) || isNotAroundZero(this.scale[1] - 1);
};

var scaleTmp = [];

transformableProto.updateTransform = function () {
  var parent = this.parent;
  var parentHasTransform = parent && parent.transform;
  var needLocalTransform = this.needLocalTransform();
  var m = this.transform;

  if (!(needLocalTransform || parentHasTransform)) {
    m && mIdentity(m);
    return;
  }

  m = m || matrix.create();

  if (needLocalTransform) {
    this.getLocalTransform(m);
  } else {
    mIdentity(m);
  } // 应用父节点变换


  if (parentHasTransform) {
    if (needLocalTransform) {
      matrix.mul(m, parent.transform, m);
    } else {
      matrix.copy(m, parent.transform);
    }
  } // 保存这个变换矩阵


  this.transform = m;
  var globalScaleRatio = this.globalScaleRatio;

  if (globalScaleRatio != null && globalScaleRatio !== 1) {
    this.getGlobalScale(scaleTmp);
    var relX = scaleTmp[0] < 0 ? -1 : 1;
    var relY = scaleTmp[1] < 0 ? -1 : 1;
    var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
    var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
    m[0] *= sx;
    m[1] *= sx;
    m[2] *= sy;
    m[3] *= sy;
  }

  this.invTransform = this.invTransform || matrix.create();
  matrix.invert(this.invTransform, m);
};

transformableProto.getLocalTransform = function (m) {
  return Transformable.getLocalTransform(this, m);
};
/**
 * 将自己的transform应用到context上
 * @param {CanvasRenderingContext2D} ctx
 */


transformableProto.setTransform = function (ctx) {
  var m = this.transform;
  var dpr = ctx.dpr || 1;

  if (m) {
    ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
  } else {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
};

transformableProto.restoreTransform = function (ctx) {
  var dpr = ctx.dpr || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

var tmpTransform = [];
var originTransform = matrix.create();

transformableProto.setLocalTransform = function (m) {
  if (!m) {
    // TODO return or set identity?
    return;
  }

  var sx = m[0] * m[0] + m[1] * m[1];
  var sy = m[2] * m[2] + m[3] * m[3];
  var position = this.position;
  var scale = this.scale;

  if (isNotAroundZero(sx - 1)) {
    sx = Math.sqrt(sx);
  }

  if (isNotAroundZero(sy - 1)) {
    sy = Math.sqrt(sy);
  }

  if (m[0] < 0) {
    sx = -sx;
  }

  if (m[3] < 0) {
    sy = -sy;
  }

  position[0] = m[4];
  position[1] = m[5];
  scale[0] = sx;
  scale[1] = sy;
  this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
};
/**
 * 分解`transform`矩阵到`position`, `rotation`, `scale`
 */


transformableProto.decomposeTransform = function () {
  if (!this.transform) {
    return;
  }

  var parent = this.parent;
  var m = this.transform;

  if (parent && parent.transform) {
    // Get local transform and decompose them to position, scale, rotation
    matrix.mul(tmpTransform, parent.invTransform, m);
    m = tmpTransform;
  }

  var origin = this.origin;

  if (origin && (origin[0] || origin[1])) {
    originTransform[4] = origin[0];
    originTransform[5] = origin[1];
    matrix.mul(tmpTransform, m, originTransform);
    tmpTransform[4] -= origin[0];
    tmpTransform[5] -= origin[1];
    m = tmpTransform;
  }

  this.setLocalTransform(m);
};
/**
 * Get global scale
 * @return {Array.<number>}
 */


transformableProto.getGlobalScale = function (out) {
  var m = this.transform;
  out = out || [];

  if (!m) {
    out[0] = 1;
    out[1] = 1;
    return out;
  }

  out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
  out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);

  if (m[0] < 0) {
    out[0] = -out[0];
  }

  if (m[3] < 0) {
    out[1] = -out[1];
  }

  return out;
};
/**
 * 变换坐标位置到 shape 的局部坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */


transformableProto.transformCoordToLocal = function (x, y) {
  var v2 = [x, y];
  var invTransform = this.invTransform;

  if (invTransform) {
    vector.applyTransform(v2, v2, invTransform);
  }

  return v2;
};
/**
 * 变换局部坐标位置到全局坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */


transformableProto.transformCoordToGlobal = function (x, y) {
  var v2 = [x, y];
  var transform = this.transform;

  if (transform) {
    vector.applyTransform(v2, v2, transform);
  }

  return v2;
};
/**
 * @static
 * @param {Object} target
 * @param {Array.<number>} target.origin
 * @param {number} target.rotation
 * @param {Array.<number>} target.position
 * @param {Array.<number>} [m]
 */


Transformable.getLocalTransform = function (target, m) {
  m = m || [];
  mIdentity(m);
  var origin = target.origin;
  var scale = target.scale || [1, 1];
  var rotation = target.rotation || 0;
  var position = target.position || [0, 0];

  if (origin) {
    // Translate to origin
    m[4] -= origin[0];
    m[5] -= origin[1];
  }

  matrix.scale(m, m, scale);

  if (rotation) {
    matrix.rotate(m, m, rotation);
  }

  if (origin) {
    // Translate back from origin
    m[4] += origin[0];
    m[5] += origin[1];
  }

  m[4] += position[0];
  m[5] += position[1];
  return m;
};

var _default = Transformable;
module.exports = _default;

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__(122);

var createElement = _core.createElement;

var util = __webpack_require__(5);

var logError = __webpack_require__(63);

var Path = __webpack_require__(9);

var ZImage = __webpack_require__(55);

var ZText = __webpack_require__(56);

var arrayDiff = __webpack_require__(408);

var GradientManager = __webpack_require__(434);

var ClippathManager = __webpack_require__(433);

var ShadowManager = __webpack_require__(435);

var _graphic = __webpack_require__(123);

var svgPath = _graphic.path;
var svgImage = _graphic.image;
var svgText = _graphic.text;

/**
 * SVG Painter
 * @module zrender/svg/Painter
 */
function parseInt10(val) {
  return parseInt(val, 10);
}

function getSvgProxy(el) {
  if (el instanceof Path) {
    return svgPath;
  } else if (el instanceof ZImage) {
    return svgImage;
  } else if (el instanceof ZText) {
    return svgText;
  } else {
    return svgPath;
  }
}

function checkParentAvailable(parent, child) {
  return child && parent && child.parentNode !== parent;
}

function insertAfter(parent, child, prevSibling) {
  if (checkParentAvailable(parent, child) && prevSibling) {
    var nextSibling = prevSibling.nextSibling;
    nextSibling ? parent.insertBefore(child, nextSibling) : parent.appendChild(child);
  }
}

function prepend(parent, child) {
  if (checkParentAvailable(parent, child)) {
    var firstChild = parent.firstChild;
    firstChild ? parent.insertBefore(child, firstChild) : parent.appendChild(child);
  }
} // function append(parent, child) {
//     if (checkParentAvailable(parent, child)) {
//         parent.appendChild(child);
//     }
// }


function remove(parent, child) {
  if (child && parent && child.parentNode === parent) {
    parent.removeChild(child);
  }
}

function getTextSvgElement(displayable) {
  return displayable.__textSvgEl;
}

function getSvgElement(displayable) {
  return displayable.__svgEl;
}
/**
 * @alias module:zrender/svg/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */


var SVGPainter = function (root, storage, opts, zrId) {
  this.root = root;
  this.storage = storage;
  this._opts = opts = util.extend({}, opts || {});
  var svgRoot = createElement('svg');
  svgRoot.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgRoot.setAttribute('version', '1.1');
  svgRoot.setAttribute('baseProfile', 'full');
  svgRoot.style.cssText = 'user-select:none;position:absolute;left:0;top:0;';
  this.gradientManager = new GradientManager(zrId, svgRoot);
  this.clipPathManager = new ClippathManager(zrId, svgRoot);
  this.shadowManager = new ShadowManager(zrId, svgRoot);
  var viewport = document.createElement('div');
  viewport.style.cssText = 'overflow:hidden;position:relative';
  this._svgRoot = svgRoot;
  this._viewport = viewport;
  root.appendChild(viewport);
  viewport.appendChild(svgRoot);
  this.resize(opts.width, opts.height);
  this._visibleList = [];
};

SVGPainter.prototype = {
  constructor: SVGPainter,
  getType: function () {
    return 'svg';
  },
  getViewportRoot: function () {
    return this._viewport;
  },
  getViewportRootOffset: function () {
    var viewportRoot = this.getViewportRoot();

    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  },
  refresh: function () {
    var list = this.storage.getDisplayList(true);

    this._paintList(list);
  },
  setBackgroundColor: function (backgroundColor) {
    // TODO gradient
    this._viewport.style.background = backgroundColor;
  },
  _paintList: function (list) {
    this.gradientManager.markAllUnused();
    this.clipPathManager.markAllUnused();
    this.shadowManager.markAllUnused();
    var svgRoot = this._svgRoot;
    var visibleList = this._visibleList;
    var listLen = list.length;
    var newVisibleList = [];
    var i;

    for (i = 0; i < listLen; i++) {
      var displayable = list[i];
      var svgProxy = getSvgProxy(displayable);
      var svgElement = getSvgElement(displayable) || getTextSvgElement(displayable);

      if (!displayable.invisible) {
        if (displayable.__dirty) {
          svgProxy && svgProxy.brush(displayable); // Update clipPath

          this.clipPathManager.update(displayable); // Update gradient and shadow

          if (displayable.style) {
            this.gradientManager.update(displayable.style.fill);
            this.gradientManager.update(displayable.style.stroke);
            this.shadowManager.update(svgElement, displayable);
          }

          displayable.__dirty = false;
        }

        newVisibleList.push(displayable);
      }
    }

    var diff = arrayDiff(visibleList, newVisibleList);
    var prevSvgElement; // First do remove, in case element moved to the head and do remove
    // after add

    for (i = 0; i < diff.length; i++) {
      var item = diff[i];

      if (item.removed) {
        for (var k = 0; k < item.count; k++) {
          var displayable = visibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          remove(svgRoot, svgElement);
          remove(svgRoot, textSvgElement);
        }
      }
    }

    for (i = 0; i < diff.length; i++) {
      var item = diff[i];

      if (item.added) {
        for (var k = 0; k < item.count; k++) {
          var displayable = newVisibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          prevSvgElement ? insertAfter(svgRoot, svgElement, prevSvgElement) : prepend(svgRoot, svgElement);

          if (svgElement) {
            insertAfter(svgRoot, textSvgElement, svgElement);
          } else if (prevSvgElement) {
            insertAfter(svgRoot, textSvgElement, prevSvgElement);
          } else {
            prepend(svgRoot, textSvgElement);
          } // Insert text


          insertAfter(svgRoot, textSvgElement, svgElement);
          prevSvgElement = textSvgElement || svgElement || prevSvgElement; // zrender.Text only create textSvgElement.

          this.gradientManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.shadowManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.clipPathManager.markUsed(displayable);
        }
      } else if (!item.removed) {
        for (var k = 0; k < item.count; k++) {
          var displayable = newVisibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          this.gradientManager.markUsed(displayable);
          this.gradientManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.shadowManager.markUsed(displayable);
          this.shadowManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.clipPathManager.markUsed(displayable);

          if (textSvgElement) {
            // Insert text.
            insertAfter(svgRoot, textSvgElement, svgElement);
          }

          prevSvgElement = svgElement || textSvgElement || prevSvgElement;
        }
      }
    }

    this.gradientManager.removeUnused();
    this.clipPathManager.removeUnused();
    this.shadowManager.removeUnused();
    this._visibleList = newVisibleList;
  },
  _getDefs: function (isForceCreating) {
    var svgRoot = this._svgRoot;

    var defs = this._svgRoot.getElementsByTagName('defs');

    if (defs.length === 0) {
      // Not exist
      if (isForceCreating) {
        var defs = svgRoot.insertBefore(createElement('defs'), // Create new tag
        svgRoot.firstChild // Insert in the front of svg
        );

        if (!defs.contains) {
          // IE doesn't support contains method
          defs.contains = function (el) {
            var children = defs.children;

            if (!children) {
              return false;
            }

            for (var i = children.length - 1; i >= 0; --i) {
              if (children[i] === el) {
                return true;
              }
            }

            return false;
          };
        }

        return defs;
      } else {
        return null;
      }
    } else {
      return defs[0];
    }
  },
  resize: function (width, height) {
    var viewport = this._viewport; // FIXME Why ?

    viewport.style.display = 'none'; // Save input w/h

    var opts = this._opts;
    width != null && (opts.width = width);
    height != null && (opts.height = height);
    width = this._getSize(0);
    height = this._getSize(1);
    viewport.style.display = '';

    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      var viewportStyle = viewport.style;
      viewportStyle.width = width + 'px';
      viewportStyle.height = height + 'px';
      var svgRoot = this._svgRoot; // Set width by 'svgRoot.width = width' is invalid

      svgRoot.setAttribute('width', width);
      svgRoot.setAttribute('height', height);
    }
  },

  /**
   * 获取绘图区域宽度
   */
  getWidth: function () {
    return this._width;
  },

  /**
   * 获取绘图区域高度
   */
  getHeight: function () {
    return this._height;
  },
  _getSize: function (whIdx) {
    var opts = this._opts;
    var wh = ['width', 'height'][whIdx];
    var cwh = ['clientWidth', 'clientHeight'][whIdx];
    var plt = ['paddingLeft', 'paddingTop'][whIdx];
    var prb = ['paddingRight', 'paddingBottom'][whIdx];

    if (opts[wh] != null && opts[wh] !== 'auto') {
      return parseFloat(opts[wh]);
    }

    var root = this.root; // IE8 does not support getComputedStyle, but it use VML.

    var stl = document.defaultView.getComputedStyle(root);
    return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
  },
  dispose: function () {
    this.root.innerHTML = '';
    this._svgRoot = this._viewport = this.storage = null;
  },
  clear: function () {
    if (this._viewport) {
      this.root.removeChild(this._viewport);
    }
  },
  pathToDataUrl: function () {
    this.refresh();
    var html = this._svgRoot.outerHTML;
    return 'data:image/svg+xml;charset=UTF-8,' + html;
  }
}; // Not supported methods

function createMethodNotSupport(method) {
  return function () {
    logError('In SVG mode painter not support method "' + method + '"');
  };
} // Unsuppoted methods


util.each(['getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer', 'eachOtherLayer', 'getLayers', 'modLayer', 'delLayer', 'clearLayer', 'toDataURL', 'pathToImage'], function (name) {
  SVGPainter.prototype[name] = createMethodNotSupport(name);
});
var _default = SVGPainter;
module.exports = _default;

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__(124);

var zrUtil = __webpack_require__(5);

var matrix = __webpack_require__(54);

/**
 * @file Manages SVG clipPath elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG clipPath elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ClippathManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, 'clipPath', '__clippath_in_use__');
}

zrUtil.inherits(ClippathManager, Definable);
/**
 * Update clipPath.
 *
 * @param {Displayable} displayable displayable element
 */

ClippathManager.prototype.update = function (displayable) {
  var svgEl = this.getSvgElement(displayable);

  if (svgEl) {
    this.updateDom(svgEl, displayable.__clipPaths, false);
  }

  var textEl = this.getTextSvgElement(displayable);

  if (textEl) {
    // Make another clipPath for text, since it's transform
    // matrix is not the same with svgElement
    this.updateDom(textEl, displayable.__clipPaths, true);
  }

  this.markUsed(displayable);
};
/**
 * Create an SVGElement of displayable and create a <clipPath> of its
 * clipPath
 *
 * @param {Displayable} parentEl  parent element
 * @param {ClipPath[]}  clipPaths clipPaths of parent element
 * @param {boolean}     isText    if parent element is Text
 */


ClippathManager.prototype.updateDom = function (parentEl, clipPaths, isText) {
  if (clipPaths && clipPaths.length > 0) {
    // Has clipPath, create <clipPath> with the first clipPath
    var defs = this.getDefs(true);
    var clipPath = clipPaths[0];
    var clipPathEl;
    var id;
    var dom = isText ? '_textDom' : '_dom';

    if (clipPath[dom]) {
      // Use a dom that is already in <defs>
      id = clipPath[dom].getAttribute('id');
      clipPathEl = clipPath[dom]; // Use a dom that is already in <defs>

      if (!defs.contains(clipPathEl)) {
        // This happens when set old clipPath that has
        // been previously removed
        defs.appendChild(clipPathEl);
      }
    } else {
      // New <clipPath>
      id = 'zr' + this._zrId + '-clip-' + this.nextId;
      ++this.nextId;
      clipPathEl = this.createElement('clipPath');
      clipPathEl.setAttribute('id', id);
      defs.appendChild(clipPathEl);
      clipPath[dom] = clipPathEl;
    } // Build path and add to <clipPath>


    var svgProxy = this.getSvgProxy(clipPath);

    if (clipPath.transform && clipPath.parent.invTransform && !isText) {
      /**
       * If a clipPath has a parent with transform, the transform
       * of parent should not be considered when setting transform
       * of clipPath. So we need to transform back from parent's
       * transform, which is done by multiplying parent's inverse
       * transform.
       */
      // Store old transform
      var transform = Array.prototype.slice.call(clipPath.transform); // Transform back from parent, and brush path

      matrix.mul(clipPath.transform, clipPath.parent.invTransform, clipPath.transform);
      svgProxy.brush(clipPath); // Set back transform of clipPath

      clipPath.transform = transform;
    } else {
      svgProxy.brush(clipPath);
    }

    var pathEl = this.getSvgElement(clipPath);
    clipPathEl.innerHTML = '';
    /**
     * Use `cloneNode()` here to appendChild to multiple parents,
     * which may happend when Text and other shapes are using the same
     * clipPath. Since Text will create an extra clipPath DOM due to
     * different transform rules.
     */

    clipPathEl.appendChild(pathEl.cloneNode());
    parentEl.setAttribute('clip-path', 'url(#' + id + ')');

    if (clipPaths.length > 1) {
      // Make the other clipPaths recursively
      this.updateDom(clipPathEl, clipPaths.slice(1), isText);
    }
  } else {
    // No clipPath
    if (parentEl) {
      parentEl.setAttribute('clip-path', 'none');
    }
  }
};
/**
 * Mark a single clipPath to be used
 *
 * @param {Displayable} displayable displayable element
 */


ClippathManager.prototype.markUsed = function (displayable) {
  var that = this; // displayable.__clipPaths can only be `null`/`undefined` or an non-empty array.

  if (displayable.__clipPaths) {
    zrUtil.each(displayable.__clipPaths, function (clipPath) {
      if (clipPath._dom) {
        Definable.prototype.markUsed.call(that, clipPath._dom);
      }

      if (clipPath._textDom) {
        Definable.prototype.markUsed.call(that, clipPath._textDom);
      }
    });
  }
};

var _default = ClippathManager;
module.exports = _default;

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__(124);

var zrUtil = __webpack_require__(5);

var logError = __webpack_require__(63);

var colorTool = __webpack_require__(86);

/**
 * @file Manages SVG gradient elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG gradient elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function GradientManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, ['linearGradient', 'radialGradient'], '__gradient_in_use__');
}

zrUtil.inherits(GradientManager, Definable);
/**
 * Create new gradient DOM for fill or stroke if not exist,
 * but will not update gradient if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */

GradientManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
  if (displayable && displayable.style) {
    var that = this;
    zrUtil.each(['fill', 'stroke'], function (fillOrStroke) {
      if (displayable.style[fillOrStroke] && (displayable.style[fillOrStroke].type === 'linear' || displayable.style[fillOrStroke].type === 'radial')) {
        var gradient = displayable.style[fillOrStroke];
        var defs = that.getDefs(true); // Create dom in <defs> if not exists

        var dom;

        if (gradient._dom) {
          // Gradient exists
          dom = gradient._dom;

          if (!defs.contains(gradient._dom)) {
            // _dom is no longer in defs, recreate
            that.addDom(dom);
          }
        } else {
          // New dom
          dom = that.add(gradient);
        }

        that.markUsed(displayable);
        var id = dom.getAttribute('id');
        svgElement.setAttribute(fillOrStroke, 'url(#' + id + ')');
      }
    });
  }
};
/**
 * Add a new gradient tag in <defs>
 *
 * @param   {Gradient} gradient zr gradient instance
 * @return {SVGLinearGradientElement | SVGRadialGradientElement}
 *                            created DOM
 */


GradientManager.prototype.add = function (gradient) {
  var dom;

  if (gradient.type === 'linear') {
    dom = this.createElement('linearGradient');
  } else if (gradient.type === 'radial') {
    dom = this.createElement('radialGradient');
  } else {
    logError('Illegal gradient type.');
    return null;
  } // Set dom id with gradient id, since each gradient instance
  // will have no more than one dom element.
  // id may exists before for those dirty elements, in which case
  // id should remain the same, and other attributes should be
  // updated.


  gradient.id = gradient.id || this.nextId++;
  dom.setAttribute('id', 'zr' + this._zrId + '-gradient-' + gradient.id);
  this.updateDom(gradient, dom);
  this.addDom(dom);
  return dom;
};
/**
 * Update gradient.
 *
 * @param {Gradient} gradient zr gradient instance
 */


GradientManager.prototype.update = function (gradient) {
  var that = this;
  Definable.prototype.update.call(this, gradient, function () {
    var type = gradient.type;
    var tagName = gradient._dom.tagName;

    if (type === 'linear' && tagName === 'linearGradient' || type === 'radial' && tagName === 'radialGradient') {
      // Gradient type is not changed, update gradient
      that.updateDom(gradient, gradient._dom);
    } else {
      // Remove and re-create if type is changed
      that.removeDom(gradient);
      that.add(gradient);
    }
  });
};
/**
 * Update gradient dom
 *
 * @param {Gradient} gradient zr gradient instance
 * @param {SVGLinearGradientElement | SVGRadialGradientElement} dom
 *                            DOM to update
 */


GradientManager.prototype.updateDom = function (gradient, dom) {
  if (gradient.type === 'linear') {
    dom.setAttribute('x1', gradient.x);
    dom.setAttribute('y1', gradient.y);
    dom.setAttribute('x2', gradient.x2);
    dom.setAttribute('y2', gradient.y2);
  } else if (gradient.type === 'radial') {
    dom.setAttribute('cx', gradient.x);
    dom.setAttribute('cy', gradient.y);
    dom.setAttribute('r', gradient.r);
  } else {
    logError('Illegal gradient type.');
    return;
  }

  if (gradient.global) {
    // x1, x2, y1, y2 in range of 0 to canvas width or height
    dom.setAttribute('gradientUnits', 'userSpaceOnUse');
  } else {
    // x1, x2, y1, y2 in range of 0 to 1
    dom.setAttribute('gradientUnits', 'objectBoundingBox');
  } // Remove color stops if exists


  dom.innerHTML = ''; // Add color stops

  var colors = gradient.colorStops;

  for (var i = 0, len = colors.length; i < len; ++i) {
    var stop = this.createElement('stop');
    stop.setAttribute('offset', colors[i].offset * 100 + '%');
    var color = colors[i].color;

    if (color.indexOf('rgba' > -1)) {
      // Fix Safari bug that stop-color not recognizing alpha #9014
      var opacity = colorTool.parse(color)[3];
      var hex = colorTool.toHex(color); // stop-color cannot be color, since:
      // The opacity value used for the gradient calculation is the
      // *product* of the value of stop-opacity and the opacity of the
      // value of stop-color.
      // See https://www.w3.org/TR/SVG2/pservers.html#StopOpacityProperty

      stop.setAttribute('stop-color', '#' + hex);
      stop.setAttribute('stop-opacity', opacity);
    } else {
      stop.setAttribute('stop-color', colors[i].color);
    }

    dom.appendChild(stop);
  } // Store dom element in gradient, to avoid creating multiple
  // dom instances for the same gradient element


  gradient._dom = dom;
};
/**
 * Mark a single gradient to be used
 *
 * @param {Displayable} displayable displayable element
 */


GradientManager.prototype.markUsed = function (displayable) {
  if (displayable.style) {
    var gradient = displayable.style.fill;

    if (gradient && gradient._dom) {
      Definable.prototype.markUsed.call(this, gradient._dom);
    }

    gradient = displayable.style.stroke;

    if (gradient && gradient._dom) {
      Definable.prototype.markUsed.call(this, gradient._dom);
    }
  }
};

var _default = GradientManager;
module.exports = _default;

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__(124);

var zrUtil = __webpack_require__(5);

/**
 * @file Manages SVG shadow elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG shadow elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ShadowManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, ['filter'], '__filter_in_use__', '_shadowDom');
}

zrUtil.inherits(ShadowManager, Definable);
/**
 * Create new shadow DOM for fill or stroke if not exist,
 * but will not update shadow if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */

ShadowManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
  if (displayable && hasShadow(displayable.style)) {
    // Create dom in <defs> if not exists
    var dom;

    if (displayable._shadowDom) {
      // Gradient exists
      dom = displayable._shadowDom;
      var defs = this.getDefs(true);

      if (!defs.contains(displayable._shadowDom)) {
        // _shadowDom is no longer in defs, recreate
        this.addDom(dom);
      }
    } else {
      // New dom
      dom = this.add(displayable);
    }

    this.markUsed(displayable);
    var id = dom.getAttribute('id');
    svgElement.style.filter = 'url(#' + id + ')';
  }
};
/**
 * Add a new shadow tag in <defs>
 *
 * @param {Displayable} displayable  zrender displayable element
 * @return {SVGFilterElement} created DOM
 */


ShadowManager.prototype.add = function (displayable) {
  var dom = this.createElement('filter'); // Set dom id with shadow id, since each shadow instance
  // will have no more than one dom element.
  // id may exists before for those dirty elements, in which case
  // id should remain the same, and other attributes should be
  // updated.

  displayable._shadowDomId = displayable._shadowDomId || this.nextId++;
  dom.setAttribute('id', 'zr' + this._zrId + '-shadow-' + displayable._shadowDomId);
  this.updateDom(displayable, dom);
  this.addDom(dom);
  return dom;
};
/**
 * Update shadow.
 *
 * @param {Displayable} displayable  zrender displayable element
 */


ShadowManager.prototype.update = function (svgElement, displayable) {
  var style = displayable.style;

  if (hasShadow(style)) {
    var that = this;
    Definable.prototype.update.call(this, displayable, function () {
      that.updateDom(displayable, displayable._shadowDom);
    });
  } else {
    // Remove shadow
    this.remove(svgElement, displayable);
  }
};
/**
 * Remove DOM and clear parent filter
 */


ShadowManager.prototype.remove = function (svgElement, displayable) {
  if (displayable._shadowDomId != null) {
    this.removeDom(svgElement);
    svgElement.style.filter = '';
  }
};
/**
 * Update shadow dom
 *
 * @param {Displayable} displayable  zrender displayable element
 * @param {SVGFilterElement} dom DOM to update
 */


ShadowManager.prototype.updateDom = function (displayable, dom) {
  var domChild = dom.getElementsByTagName('feDropShadow');

  if (domChild.length === 0) {
    domChild = this.createElement('feDropShadow');
  } else {
    domChild = domChild[0];
  }

  var style = displayable.style;
  var scaleX = displayable.scale ? displayable.scale[0] || 1 : 1;
  var scaleY = displayable.scale ? displayable.scale[1] || 1 : 1; // TODO: textBoxShadowBlur is not supported yet

  var offsetX;
  var offsetY;
  var blur;
  var color;

  if (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY) {
    offsetX = style.shadowOffsetX || 0;
    offsetY = style.shadowOffsetY || 0;
    blur = style.shadowBlur;
    color = style.shadowColor;
  } else if (style.textShadowBlur) {
    offsetX = style.textShadowOffsetX || 0;
    offsetY = style.textShadowOffsetY || 0;
    blur = style.textShadowBlur;
    color = style.textShadowColor;
  } else {
    // Remove shadow
    this.removeDom(dom, style);
    return;
  }

  domChild.setAttribute('dx', offsetX / scaleX);
  domChild.setAttribute('dy', offsetY / scaleY);
  domChild.setAttribute('flood-color', color); // Divide by two here so that it looks the same as in canvas
  // See: https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur

  var stdDx = blur / 2 / scaleX;
  var stdDy = blur / 2 / scaleY;
  var stdDeviation = stdDx + ' ' + stdDy;
  domChild.setAttribute('stdDeviation', stdDeviation); // Fix filter clipping problem

  dom.setAttribute('x', '-100%');
  dom.setAttribute('y', '-100%');
  dom.setAttribute('width', Math.ceil(blur / 2 * 200) + '%');
  dom.setAttribute('height', Math.ceil(blur / 2 * 200) + '%');
  dom.appendChild(domChild); // Store dom element in shadow, to avoid creating multiple
  // dom instances for the same shadow element

  displayable._shadowDom = dom;
};
/**
 * Mark a single shadow to be used
 *
 * @param {Displayable} displayable displayable element
 */


ShadowManager.prototype.markUsed = function (displayable) {
  if (displayable._shadowDom) {
    Definable.prototype.markUsed.call(this, displayable._shadowDom);
  }
};

function hasShadow(style) {
  // TODO: textBoxShadowBlur is not supported yet
  return style && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY || style.textShadowBlur || style.textShadowOffsetX || style.textShadowOffsetY);
}

var _default = ShadowManager;
module.exports = _default;

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);

var _zrender = __webpack_require__(125);

var registerPainter = _zrender.registerPainter;

var Painter = __webpack_require__(432);

registerPainter('svg', Painter);

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

var Group = __webpack_require__(117);

var ZImage = __webpack_require__(55);

var Text = __webpack_require__(56);

var Circle = __webpack_require__(178);

var Rect = __webpack_require__(183);

var Ellipse = __webpack_require__(179);

var Line = __webpack_require__(180);

var Path = __webpack_require__(9);

var Polygon = __webpack_require__(181);

var Polyline = __webpack_require__(182);

var LinearGradient = __webpack_require__(172);

var Style = __webpack_require__(120);

var matrix = __webpack_require__(54);

var _path = __webpack_require__(184);

var createFromString = _path.createFromString;

var _util = __webpack_require__(5);

var isString = _util.isString;
var extend = _util.extend;
var defaults = _util.defaults;
var trim = _util.trim;
var each = _util.each;
// import RadialGradient from '../graphic/RadialGradient';
// import Pattern from '../graphic/Pattern';
// import * as vector from '../core/vector';
// Most of the values can be separated by comma and/or white space.
var DILIMITER_REG = /[\s,]+/;
/**
 * For big svg string, this method might be time consuming.
 *
 * @param {string} svg xml string
 * @return {Object} xml root.
 */

function parseXML(svg) {
  if (isString(svg)) {
    var parser = new DOMParser();
    svg = parser.parseFromString(svg, 'text/xml');
  } // Document node. If using $.get, doc node may be input.


  if (svg.nodeType === 9) {
    svg = svg.firstChild;
  } // nodeName of <!DOCTYPE svg> is also 'svg'.


  while (svg.nodeName.toLowerCase() !== 'svg' || svg.nodeType !== 1) {
    svg = svg.nextSibling;
  }

  return svg;
}

function SVGParser() {
  this._defs = {};
  this._root = null;
  this._isDefine = false;
  this._isText = false;
}

SVGParser.prototype.parse = function (xml, opt) {
  opt = opt || {};
  var svg = parseXML(xml);

  if (!svg) {
    throw new Error('Illegal svg');
  }

  var root = new Group();
  this._root = root; // parse view port

  var viewBox = svg.getAttribute('viewBox') || ''; // If width/height not specified, means "100%" of `opt.width/height`.
  // TODO: Other percent value not supported yet.

  var width = parseFloat(svg.getAttribute('width') || opt.width);
  var height = parseFloat(svg.getAttribute('height') || opt.height); // If width/height not specified, set as null for output.

  isNaN(width) && (width = null);
  isNaN(height) && (height = null); // Apply inline style on svg element.

  parseAttributes(svg, root, null, true);
  var child = svg.firstChild;

  while (child) {
    this._parseNode(child, root);

    child = child.nextSibling;
  }

  var viewBoxRect;
  var viewBoxTransform;

  if (viewBox) {
    var viewBoxArr = trim(viewBox).split(DILIMITER_REG); // Some invalid case like viewBox: 'none'.

    if (viewBoxArr.length >= 4) {
      viewBoxRect = {
        x: parseFloat(viewBoxArr[0] || 0),
        y: parseFloat(viewBoxArr[1] || 0),
        width: parseFloat(viewBoxArr[2]),
        height: parseFloat(viewBoxArr[3])
      };
    }
  }

  if (viewBoxRect && width != null && height != null) {
    viewBoxTransform = makeViewBoxTransform(viewBoxRect, width, height);

    if (!opt.ignoreViewBox) {
      // If set transform on the output group, it probably bring trouble when
      // some users only intend to show the clipped content inside the viewBox,
      // but not intend to transform the output group. So we keep the output
      // group no transform. If the user intend to use the viewBox as a
      // camera, just set `opt.ignoreViewBox` as `true` and set transfrom
      // manually according to the viewBox info in the output of this method.
      var elRoot = root;
      root = new Group();
      root.add(elRoot);
      elRoot.scale = viewBoxTransform.scale.slice();
      elRoot.position = viewBoxTransform.position.slice();
    }
  } // Some shapes might be overflow the viewport, which should be
  // clipped despite whether the viewBox is used, as the SVG does.


  if (!opt.ignoreRootClip && width != null && height != null) {
    root.setClipPath(new Rect({
      shape: {
        x: 0,
        y: 0,
        width: width,
        height: height
      }
    }));
  } // Set width/height on group just for output the viewport size.


  return {
    root: root,
    width: width,
    height: height,
    viewBoxRect: viewBoxRect,
    viewBoxTransform: viewBoxTransform
  };
};

SVGParser.prototype._parseNode = function (xmlNode, parentGroup) {
  var nodeName = xmlNode.nodeName.toLowerCase(); // TODO
  // support <style>...</style> in svg, where nodeName is 'style',
  // CSS classes is defined globally wherever the style tags are declared.

  if (nodeName === 'defs') {
    // define flag
    this._isDefine = true;
  } else if (nodeName === 'text') {
    this._isText = true;
  }

  var el;

  if (this._isDefine) {
    var parser = defineParsers[nodeName];

    if (parser) {
      var def = parser.call(this, xmlNode);
      var id = xmlNode.getAttribute('id');

      if (id) {
        this._defs[id] = def;
      }
    }
  } else {
    var parser = nodeParsers[nodeName];

    if (parser) {
      el = parser.call(this, xmlNode, parentGroup);
      parentGroup.add(el);
    }
  }

  var child = xmlNode.firstChild;

  while (child) {
    if (child.nodeType === 1) {
      this._parseNode(child, el);
    } // Is text


    if (child.nodeType === 3 && this._isText) {
      this._parseText(child, el);
    }

    child = child.nextSibling;
  } // Quit define


  if (nodeName === 'defs') {
    this._isDefine = false;
  } else if (nodeName === 'text') {
    this._isText = false;
  }
};

SVGParser.prototype._parseText = function (xmlNode, parentGroup) {
  if (xmlNode.nodeType === 1) {
    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    this._textX += parseFloat(dx);
    this._textY += parseFloat(dy);
  }

  var text = new Text({
    style: {
      text: xmlNode.textContent,
      transformText: true
    },
    position: [this._textX || 0, this._textY || 0]
  });
  inheritStyle(parentGroup, text);
  parseAttributes(xmlNode, text, this._defs);
  var fontSize = text.style.fontSize;

  if (fontSize && fontSize < 9) {
    // PENDING
    text.style.fontSize = 9;
    text.scale = text.scale || [1, 1];
    text.scale[0] *= fontSize / 9;
    text.scale[1] *= fontSize / 9;
  }

  var rect = text.getBoundingRect();
  this._textX += rect.width;
  parentGroup.add(text);
  return text;
};

var nodeParsers = {
  'g': function (xmlNode, parentGroup) {
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    return g;
  },
  'rect': function (xmlNode, parentGroup) {
    var rect = new Rect();
    inheritStyle(parentGroup, rect);
    parseAttributes(xmlNode, rect, this._defs);
    rect.setShape({
      x: parseFloat(xmlNode.getAttribute('x') || 0),
      y: parseFloat(xmlNode.getAttribute('y') || 0),
      width: parseFloat(xmlNode.getAttribute('width') || 0),
      height: parseFloat(xmlNode.getAttribute('height') || 0)
    }); // console.log(xmlNode.getAttribute('transform'));
    // console.log(rect.transform);

    return rect;
  },
  'circle': function (xmlNode, parentGroup) {
    var circle = new Circle();
    inheritStyle(parentGroup, circle);
    parseAttributes(xmlNode, circle, this._defs);
    circle.setShape({
      cx: parseFloat(xmlNode.getAttribute('cx') || 0),
      cy: parseFloat(xmlNode.getAttribute('cy') || 0),
      r: parseFloat(xmlNode.getAttribute('r') || 0)
    });
    return circle;
  },
  'line': function (xmlNode, parentGroup) {
    var line = new Line();
    inheritStyle(parentGroup, line);
    parseAttributes(xmlNode, line, this._defs);
    line.setShape({
      x1: parseFloat(xmlNode.getAttribute('x1') || 0),
      y1: parseFloat(xmlNode.getAttribute('y1') || 0),
      x2: parseFloat(xmlNode.getAttribute('x2') || 0),
      y2: parseFloat(xmlNode.getAttribute('y2') || 0)
    });
    return line;
  },
  'ellipse': function (xmlNode, parentGroup) {
    var ellipse = new Ellipse();
    inheritStyle(parentGroup, ellipse);
    parseAttributes(xmlNode, ellipse, this._defs);
    ellipse.setShape({
      cx: parseFloat(xmlNode.getAttribute('cx') || 0),
      cy: parseFloat(xmlNode.getAttribute('cy') || 0),
      rx: parseFloat(xmlNode.getAttribute('rx') || 0),
      ry: parseFloat(xmlNode.getAttribute('ry') || 0)
    });
    return ellipse;
  },
  'polygon': function (xmlNode, parentGroup) {
    var points = xmlNode.getAttribute('points');

    if (points) {
      points = parsePoints(points);
    }

    var polygon = new Polygon({
      shape: {
        points: points || []
      }
    });
    inheritStyle(parentGroup, polygon);
    parseAttributes(xmlNode, polygon, this._defs);
    return polygon;
  },
  'polyline': function (xmlNode, parentGroup) {
    var path = new Path();
    inheritStyle(parentGroup, path);
    parseAttributes(xmlNode, path, this._defs);
    var points = xmlNode.getAttribute('points');

    if (points) {
      points = parsePoints(points);
    }

    var polyline = new Polyline({
      shape: {
        points: points || []
      }
    });
    return polyline;
  },
  'image': function (xmlNode, parentGroup) {
    var img = new ZImage();
    inheritStyle(parentGroup, img);
    parseAttributes(xmlNode, img, this._defs);
    img.setStyle({
      image: xmlNode.getAttribute('xlink:href'),
      x: xmlNode.getAttribute('x'),
      y: xmlNode.getAttribute('y'),
      width: xmlNode.getAttribute('width'),
      height: xmlNode.getAttribute('height')
    });
    return img;
  },
  'text': function (xmlNode, parentGroup) {
    var x = xmlNode.getAttribute('x') || 0;
    var y = xmlNode.getAttribute('y') || 0;
    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    this._textX = parseFloat(x) + parseFloat(dx);
    this._textY = parseFloat(y) + parseFloat(dy);
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    return g;
  },
  'tspan': function (xmlNode, parentGroup) {
    var x = xmlNode.getAttribute('x');
    var y = xmlNode.getAttribute('y');

    if (x != null) {
      // new offset x
      this._textX = parseFloat(x);
    }

    if (y != null) {
      // new offset y
      this._textY = parseFloat(y);
    }

    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    this._textX += dx;
    this._textY += dy;
    return g;
  },
  'path': function (xmlNode, parentGroup) {
    // TODO svg fill rule
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule
    // path.style.globalCompositeOperation = 'xor';
    var d = xmlNode.getAttribute('d') || ''; // Performance sensitive.

    var path = createFromString(d);
    inheritStyle(parentGroup, path);
    parseAttributes(xmlNode, path, this._defs);
    return path;
  }
};
var defineParsers = {
  'lineargradient': function (xmlNode) {
    var x1 = parseInt(xmlNode.getAttribute('x1') || 0, 10);
    var y1 = parseInt(xmlNode.getAttribute('y1') || 0, 10);
    var x2 = parseInt(xmlNode.getAttribute('x2') || 10, 10);
    var y2 = parseInt(xmlNode.getAttribute('y2') || 0, 10);
    var gradient = new LinearGradient(x1, y1, x2, y2);

    _parseGradientColorStops(xmlNode, gradient);

    return gradient;
  },
  'radialgradient': function (xmlNode) {}
};

function _parseGradientColorStops(xmlNode, gradient) {
  var stop = xmlNode.firstChild;

  while (stop) {
    if (stop.nodeType === 1) {
      var offset = stop.getAttribute('offset');

      if (offset.indexOf('%') > 0) {
        // percentage
        offset = parseInt(offset, 10) / 100;
      } else if (offset) {
        // number from 0 to 1
        offset = parseFloat(offset);
      } else {
        offset = 0;
      }

      var stopColor = stop.getAttribute('stop-color') || '#000000';
      gradient.addColorStop(offset, stopColor);
    }

    stop = stop.nextSibling;
  }
}

function inheritStyle(parent, child) {
  if (parent && parent.__inheritedStyle) {
    if (!child.__inheritedStyle) {
      child.__inheritedStyle = {};
    }

    defaults(child.__inheritedStyle, parent.__inheritedStyle);
  }
}

function parsePoints(pointsString) {
  var list = trim(pointsString).split(DILIMITER_REG);
  var points = [];

  for (var i = 0; i < list.length; i += 2) {
    var x = parseFloat(list[i]);
    var y = parseFloat(list[i + 1]);
    points.push([x, y]);
  }

  return points;
}

var attributesMap = {
  'fill': 'fill',
  'stroke': 'stroke',
  'stroke-width': 'lineWidth',
  'opacity': 'opacity',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stroke-dasharray': 'lineDash',
  'stroke-dashoffset': 'lineDashOffset',
  'stroke-linecap': 'lineCap',
  'stroke-linejoin': 'lineJoin',
  'stroke-miterlimit': 'miterLimit',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-style': 'fontStyle',
  'font-weight': 'fontWeight',
  'text-align': 'textAlign',
  'alignment-baseline': 'textBaseline'
};

function parseAttributes(xmlNode, el, defs, onlyInlineStyle) {
  var zrStyle = el.__inheritedStyle || {};
  var isTextEl = el.type === 'text'; // TODO Shadow

  if (xmlNode.nodeType === 1) {
    parseTransformAttribute(xmlNode, el);
    extend(zrStyle, parseStyleAttribute(xmlNode));

    if (!onlyInlineStyle) {
      for (var svgAttrName in attributesMap) {
        if (attributesMap.hasOwnProperty(svgAttrName)) {
          var attrValue = xmlNode.getAttribute(svgAttrName);

          if (attrValue != null) {
            zrStyle[attributesMap[svgAttrName]] = attrValue;
          }
        }
      }
    }
  }

  var elFillProp = isTextEl ? 'textFill' : 'fill';
  var elStrokeProp = isTextEl ? 'textStroke' : 'stroke';
  el.style = el.style || new Style();
  var elStyle = el.style;
  zrStyle.fill != null && elStyle.set(elFillProp, getPaint(zrStyle.fill, defs));
  zrStyle.stroke != null && elStyle.set(elStrokeProp, getPaint(zrStyle.stroke, defs));
  each(['lineWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'miterLimit', 'fontSize'], function (propName) {
    var elPropName = propName === 'lineWidth' && isTextEl ? 'textStrokeWidth' : propName;
    zrStyle[propName] != null && elStyle.set(elPropName, parseFloat(zrStyle[propName]));
  });

  if (!zrStyle.textBaseline || zrStyle.textBaseline === 'auto') {
    zrStyle.textBaseline = 'alphabetic';
  }

  if (zrStyle.textBaseline === 'alphabetic') {
    zrStyle.textBaseline = 'bottom';
  }

  if (zrStyle.textAlign === 'start') {
    zrStyle.textAlign = 'left';
  }

  if (zrStyle.textAlign === 'end') {
    zrStyle.textAlign = 'right';
  }

  each(['lineDashOffset', 'lineCap', 'lineJoin', 'fontWeight', 'fontFamily', 'fontStyle', 'textAlign', 'textBaseline'], function (propName) {
    zrStyle[propName] != null && elStyle.set(propName, zrStyle[propName]);
  });

  if (zrStyle.lineDash) {
    el.style.lineDash = trim(zrStyle.lineDash).split(DILIMITER_REG);
  }

  if (elStyle[elStrokeProp] && elStyle[elStrokeProp] !== 'none') {
    // enable stroke
    el[elStrokeProp] = true;
  }

  el.__inheritedStyle = zrStyle;
}

var urlRegex = /url\(\s*#(.*?)\)/;

function getPaint(str, defs) {
  // if (str === 'none') {
  //     return;
  // }
  var urlMatch = defs && str && str.match(urlRegex);

  if (urlMatch) {
    var url = trim(urlMatch[1]);
    var def = defs[url];
    return def;
  }

  return str;
}

var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;

function parseTransformAttribute(xmlNode, node) {
  var transform = xmlNode.getAttribute('transform');

  if (transform) {
    transform = transform.replace(/,/g, ' ');
    var m = null;
    var transformOps = [];
    transform.replace(transformRegex, function (str, type, value) {
      transformOps.push(type, value);
    });

    for (var i = transformOps.length - 1; i > 0; i -= 2) {
      var value = transformOps[i];
      var type = transformOps[i - 1];
      m = m || matrix.create();

      switch (type) {
        case 'translate':
          value = trim(value).split(DILIMITER_REG);
          matrix.translate(m, m, [parseFloat(value[0]), parseFloat(value[1] || 0)]);
          break;

        case 'scale':
          value = trim(value).split(DILIMITER_REG);
          matrix.scale(m, m, [parseFloat(value[0]), parseFloat(value[1] || value[0])]);
          break;

        case 'rotate':
          value = trim(value).split(DILIMITER_REG);
          matrix.rotate(m, m, parseFloat(value[0]));
          break;

        case 'skew':
          value = trim(value).split(DILIMITER_REG);
          console.warn('Skew transform is not supported yet');
          break;

        case 'matrix':
          var value = trim(value).split(DILIMITER_REG);
          m[0] = parseFloat(value[0]);
          m[1] = parseFloat(value[1]);
          m[2] = parseFloat(value[2]);
          m[3] = parseFloat(value[3]);
          m[4] = parseFloat(value[4]);
          m[5] = parseFloat(value[5]);
          break;
      }
    }

    node.setLocalTransform(m);
  }
} // Value may contain space.


var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;

function parseStyleAttribute(xmlNode) {
  var style = xmlNode.getAttribute('style');
  var result = {};

  if (!style) {
    return result;
  }

  var styleList = {};
  styleRegex.lastIndex = 0;
  var styleRegResult;

  while ((styleRegResult = styleRegex.exec(style)) != null) {
    styleList[styleRegResult[1]] = styleRegResult[2];
  }

  for (var svgAttrName in attributesMap) {
    if (attributesMap.hasOwnProperty(svgAttrName) && styleList[svgAttrName] != null) {
      result[attributesMap[svgAttrName]] = styleList[svgAttrName];
    }
  }

  return result;
}
/**
 * @param {Array.<number>} viewBoxRect
 * @param {number} width
 * @param {number} height
 * @return {Object} {scale, position}
 */


function makeViewBoxTransform(viewBoxRect, width, height) {
  var scaleX = width / viewBoxRect.width;
  var scaleY = height / viewBoxRect.height;
  var scale = Math.min(scaleX, scaleY); // preserveAspectRatio 'xMidYMid'

  var viewBoxScale = [scale, scale];
  var viewBoxPosition = [-(viewBoxRect.x + viewBoxRect.width / 2) * scale + width / 2, -(viewBoxRect.y + viewBoxRect.height / 2) * scale + height / 2];
  return {
    scale: viewBoxScale,
    position: viewBoxPosition
  };
}
/**
 * @param {string|XMLElement} xml
 * @param {Object} [opt]
 * @param {number} [opt.width] Default width if svg width not specified or is a percent value.
 * @param {number} [opt.height] Default height if svg height not specified or is a percent value.
 * @param {boolean} [opt.ignoreViewBox]
 * @param {boolean} [opt.ignoreRootClip]
 * @return {Object} result:
 * {
 *     root: Group, The root of the the result tree of zrender shapes,
 *     width: number, the viewport width of the SVG,
 *     height: number, the viewport height of the SVG,
 *     viewBoxRect: {x, y, width, height}, the declared viewBox rect of the SVG, if exists,
 *     viewBoxTransform: the {scale, position} calculated by viewBox and viewport, is exists.
 * }
 */


function parseSVG(xml, opt) {
  var parser = new SVGParser();
  return parser.parse(xml, opt);
}

exports.parseXML = parseXML;
exports.makeViewBoxTransform = makeViewBoxTransform;
exports.parseSVG = parseSVG;

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

var PathProxy = __webpack_require__(52);

var _vector = __webpack_require__(20);

var v2ApplyTransform = _vector.applyTransform;
var CMD = PathProxy.CMD;
var points = [[], [], []];
var mathSqrt = Math.sqrt;
var mathAtan2 = Math.atan2;

function _default(path, m) {
  var data = path.data;
  var cmd;
  var nPoint;
  var i;
  var j;
  var k;
  var p;
  var M = CMD.M;
  var C = CMD.C;
  var L = CMD.L;
  var R = CMD.R;
  var A = CMD.A;
  var Q = CMD.Q;

  for (i = 0, j = 0; i < data.length;) {
    cmd = data[i++];
    j = i;
    nPoint = 0;

    switch (cmd) {
      case M:
        nPoint = 1;
        break;

      case L:
        nPoint = 1;
        break;

      case C:
        nPoint = 3;
        break;

      case Q:
        nPoint = 2;
        break;

      case A:
        var x = m[4];
        var y = m[5];
        var sx = mathSqrt(m[0] * m[0] + m[1] * m[1]);
        var sy = mathSqrt(m[2] * m[2] + m[3] * m[3]);
        var angle = mathAtan2(-m[1] / sy, m[0] / sx); // cx

        data[i] *= sx;
        data[i++] += x; // cy

        data[i] *= sy;
        data[i++] += y; // Scale rx and ry
        // FIXME Assume psi is 0 here

        data[i++] *= sx;
        data[i++] *= sy; // Start angle

        data[i++] += angle; // end angle

        data[i++] += angle; // FIXME psi

        i += 2;
        j = i;
        break;

      case R:
        // x0, y0
        p[0] = data[i++];
        p[1] = data[i++];
        v2ApplyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1]; // x1, y1

        p[0] += data[i++];
        p[1] += data[i++];
        v2ApplyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1];
    }

    for (k = 0; k < nPoint; k++) {
      var p = points[k];
      p[0] = data[i++];
      p[1] = data[i++];
      v2ApplyTransform(p, p, m); // Write back

      data[j++] = p[0];
      data[j++] = p[1];
    }
  }
}

module.exports = _default;

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

var logError = __webpack_require__(63);

var vmlCore = __webpack_require__(185);

var _util = __webpack_require__(5);

var each = _util.each;

/**
 * VML Painter.
 *
 * @module zrender/vml/Painter
 */
function parseInt10(val) {
  return parseInt(val, 10);
}
/**
 * @alias module:zrender/vml/Painter
 */


function VMLPainter(root, storage) {
  vmlCore.initVML();
  this.root = root;
  this.storage = storage;
  var vmlViewport = document.createElement('div');
  var vmlRoot = document.createElement('div');
  vmlViewport.style.cssText = 'display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;';
  vmlRoot.style.cssText = 'position:absolute;left:0;top:0;';
  root.appendChild(vmlViewport);
  this._vmlRoot = vmlRoot;
  this._vmlViewport = vmlViewport;
  this.resize(); // Modify storage

  var oldDelFromStorage = storage.delFromStorage;
  var oldAddToStorage = storage.addToStorage;

  storage.delFromStorage = function (el) {
    oldDelFromStorage.call(storage, el);

    if (el) {
      el.onRemove && el.onRemove(vmlRoot);
    }
  };

  storage.addToStorage = function (el) {
    // Displayable already has a vml node
    el.onAdd && el.onAdd(vmlRoot);
    oldAddToStorage.call(storage, el);
  };

  this._firstPaint = true;
}

VMLPainter.prototype = {
  constructor: VMLPainter,
  getType: function () {
    return 'vml';
  },

  /**
   * @return {HTMLDivElement}
   */
  getViewportRoot: function () {
    return this._vmlViewport;
  },
  getViewportRootOffset: function () {
    var viewportRoot = this.getViewportRoot();

    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  },

  /**
   * 刷新
   */
  refresh: function () {
    var list = this.storage.getDisplayList(true, true);

    this._paintList(list);
  },
  _paintList: function (list) {
    var vmlRoot = this._vmlRoot;

    for (var i = 0; i < list.length; i++) {
      var el = list[i];

      if (el.invisible || el.ignore) {
        if (!el.__alreadyNotVisible) {
          el.onRemove(vmlRoot);
        } // Set as already invisible


        el.__alreadyNotVisible = true;
      } else {
        if (el.__alreadyNotVisible) {
          el.onAdd(vmlRoot);
        }

        el.__alreadyNotVisible = false;

        if (el.__dirty) {
          el.beforeBrush && el.beforeBrush();
          (el.brushVML || el.brush).call(el, vmlRoot);
          el.afterBrush && el.afterBrush();
        }
      }

      el.__dirty = false;
    }

    if (this._firstPaint) {
      // Detached from document at first time
      // to avoid page refreshing too many times
      // FIXME 如果每次都先 removeChild 可能会导致一些填充和描边的效果改变
      this._vmlViewport.appendChild(vmlRoot);

      this._firstPaint = false;
    }
  },
  resize: function (width, height) {
    var width = width == null ? this._getWidth() : width;
    var height = height == null ? this._getHeight() : height;

    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      var vmlViewportStyle = this._vmlViewport.style;
      vmlViewportStyle.width = width + 'px';
      vmlViewportStyle.height = height + 'px';
    }
  },
  dispose: function () {
    this.root.innerHTML = '';
    this._vmlRoot = this._vmlViewport = this.storage = null;
  },
  getWidth: function () {
    return this._width;
  },
  getHeight: function () {
    return this._height;
  },
  clear: function () {
    if (this._vmlViewport) {
      this.root.removeChild(this._vmlViewport);
    }
  },
  _getWidth: function () {
    var root = this.root;
    var stl = root.currentStyle;
    return (root.clientWidth || parseInt10(stl.width)) - parseInt10(stl.paddingLeft) - parseInt10(stl.paddingRight) | 0;
  },
  _getHeight: function () {
    var root = this.root;
    var stl = root.currentStyle;
    return (root.clientHeight || parseInt10(stl.height)) - parseInt10(stl.paddingTop) - parseInt10(stl.paddingBottom) | 0;
  }
}; // Not supported methods

function createMethodNotSupport(method) {
  return function () {
    logError('In IE8.0 VML mode painter not support method "' + method + '"');
  };
} // Unsupported methods


each(['getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer', 'eachOtherLayer', 'getLayers', 'modLayer', 'delLayer', 'clearLayer', 'toDataURL', 'pathToImage'], function (name) {
  VMLPainter.prototype[name] = createMethodNotSupport(name);
});
var _default = VMLPainter;
module.exports = _default;

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__(36);

var _vector = __webpack_require__(20);

var applyTransform = _vector.applyTransform;

var BoundingRect = __webpack_require__(30);

var colorTool = __webpack_require__(86);

var textContain = __webpack_require__(81);

var textHelper = __webpack_require__(84);

var RectText = __webpack_require__(177);

var Displayable = __webpack_require__(64);

var ZImage = __webpack_require__(55);

var Text = __webpack_require__(56);

var Path = __webpack_require__(9);

var PathProxy = __webpack_require__(52);

var Gradient = __webpack_require__(118);

var vmlCore = __webpack_require__(185);

// http://www.w3.org/TR/NOTE-VML
// TODO Use proxy like svg instead of overwrite brush methods
var CMD = PathProxy.CMD;
var round = Math.round;
var sqrt = Math.sqrt;
var abs = Math.abs;
var cos = Math.cos;
var sin = Math.sin;
var mathMax = Math.max;

if (!env.canvasSupported) {
  var comma = ',';
  var imageTransformPrefix = 'progid:DXImageTransform.Microsoft';
  var Z = 21600;
  var Z2 = Z / 2;
  var ZLEVEL_BASE = 100000;
  var Z_BASE = 1000;

  var initRootElStyle = function (el) {
    el.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;';
    el.coordsize = Z + ',' + Z;
    el.coordorigin = '0,0';
  };

  var encodeHtmlAttribute = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  };

  var rgb2Str = function (r, g, b) {
    return 'rgb(' + [r, g, b].join(',') + ')';
  };

  var append = function (parent, child) {
    if (child && parent && child.parentNode !== parent) {
      parent.appendChild(child);
    }
  };

  var remove = function (parent, child) {
    if (child && parent && child.parentNode === parent) {
      parent.removeChild(child);
    }
  };

  var getZIndex = function (zlevel, z, z2) {
    // z 的取值范围为 [0, 1000]
    return (parseFloat(zlevel) || 0) * ZLEVEL_BASE + (parseFloat(z) || 0) * Z_BASE + z2;
  };

  var parsePercent = textHelper.parsePercent;
  /***************************************************
   * PATH
   **************************************************/

  var setColorAndOpacity = function (el, color, opacity) {
    var colorArr = colorTool.parse(color);
    opacity = +opacity;

    if (isNaN(opacity)) {
      opacity = 1;
    }

    if (colorArr) {
      el.color = rgb2Str(colorArr[0], colorArr[1], colorArr[2]);
      el.opacity = opacity * colorArr[3];
    }
  };

  var getColorAndAlpha = function (color) {
    var colorArr = colorTool.parse(color);
    return [rgb2Str(colorArr[0], colorArr[1], colorArr[2]), colorArr[3]];
  };

  var updateFillNode = function (el, style, zrEl) {
    // TODO pattern
    var fill = style.fill;

    if (fill != null) {
      // Modified from excanvas
      if (fill instanceof Gradient) {
        var gradientType;
        var angle = 0;
        var focus = [0, 0]; // additional offset

        var shift = 0; // scale factor for offset

        var expansion = 1;
        var rect = zrEl.getBoundingRect();
        var rectWidth = rect.width;
        var rectHeight = rect.height;

        if (fill.type === 'linear') {
          gradientType = 'gradient';
          var transform = zrEl.transform;
          var p0 = [fill.x * rectWidth, fill.y * rectHeight];
          var p1 = [fill.x2 * rectWidth, fill.y2 * rectHeight];

          if (transform) {
            applyTransform(p0, p0, transform);
            applyTransform(p1, p1, transform);
          }

          var dx = p1[0] - p0[0];
          var dy = p1[1] - p0[1];
          angle = Math.atan2(dx, dy) * 180 / Math.PI; // The angle should be a non-negative number.

          if (angle < 0) {
            angle += 360;
          } // Very small angles produce an unexpected result because they are
          // converted to a scientific notation string.


          if (angle < 1e-6) {
            angle = 0;
          }
        } else {
          gradientType = 'gradientradial';
          var p0 = [fill.x * rectWidth, fill.y * rectHeight];
          var transform = zrEl.transform;
          var scale = zrEl.scale;
          var width = rectWidth;
          var height = rectHeight;
          focus = [// Percent in bounding rect
          (p0[0] - rect.x) / width, (p0[1] - rect.y) / height];

          if (transform) {
            applyTransform(p0, p0, transform);
          }

          width /= scale[0] * Z;
          height /= scale[1] * Z;
          var dimension = mathMax(width, height);
          shift = 2 * 0 / dimension;
          expansion = 2 * fill.r / dimension - shift;
        } // We need to sort the color stops in ascending order by offset,
        // otherwise IE won't interpret it correctly.


        var stops = fill.colorStops.slice();
        stops.sort(function (cs1, cs2) {
          return cs1.offset - cs2.offset;
        });
        var length = stops.length; // Color and alpha list of first and last stop

        var colorAndAlphaList = [];
        var colors = [];

        for (var i = 0; i < length; i++) {
          var stop = stops[i];
          var colorAndAlpha = getColorAndAlpha(stop.color);
          colors.push(stop.offset * expansion + shift + ' ' + colorAndAlpha[0]);

          if (i === 0 || i === length - 1) {
            colorAndAlphaList.push(colorAndAlpha);
          }
        }

        if (length >= 2) {
          var color1 = colorAndAlphaList[0][0];
          var color2 = colorAndAlphaList[1][0];
          var opacity1 = colorAndAlphaList[0][1] * style.opacity;
          var opacity2 = colorAndAlphaList[1][1] * style.opacity;
          el.type = gradientType;
          el.method = 'none';
          el.focus = '100%';
          el.angle = angle;
          el.color = color1;
          el.color2 = color2;
          el.colors = colors.join(','); // When colors attribute is used, the meanings of opacity and o:opacity2
          // are reversed.

          el.opacity = opacity2; // FIXME g_o_:opacity ?

          el.opacity2 = opacity1;
        }

        if (gradientType === 'radial') {
          el.focusposition = focus.join(',');
        }
      } else {
        // FIXME Change from Gradient fill to color fill
        setColorAndOpacity(el, fill, style.opacity);
      }
    }
  };

  var updateStrokeNode = function (el, style) {
    // if (style.lineJoin != null) {
    //     el.joinstyle = style.lineJoin;
    // }
    // if (style.miterLimit != null) {
    //     el.miterlimit = style.miterLimit * Z;
    // }
    // if (style.lineCap != null) {
    //     el.endcap = style.lineCap;
    // }
    if (style.lineDash) {
      el.dashstyle = style.lineDash.join(' ');
    }

    if (style.stroke != null && !(style.stroke instanceof Gradient)) {
      setColorAndOpacity(el, style.stroke, style.opacity);
    }
  };

  var updateFillAndStroke = function (vmlEl, type, style, zrEl) {
    var isFill = type === 'fill';
    var el = vmlEl.getElementsByTagName(type)[0]; // Stroke must have lineWidth

    if (style[type] != null && style[type] !== 'none' && (isFill || !isFill && style.lineWidth)) {
      vmlEl[isFill ? 'filled' : 'stroked'] = 'true'; // FIXME Remove before updating, or set `colors` will throw error

      if (style[type] instanceof Gradient) {
        remove(vmlEl, el);
      }

      if (!el) {
        el = vmlCore.createNode(type);
      }

      isFill ? updateFillNode(el, style, zrEl) : updateStrokeNode(el, style);
      append(vmlEl, el);
    } else {
      vmlEl[isFill ? 'filled' : 'stroked'] = 'false';
      remove(vmlEl, el);
    }
  };

  var points = [[], [], []];

  var pathDataToString = function (path, m) {
    var M = CMD.M;
    var C = CMD.C;
    var L = CMD.L;
    var A = CMD.A;
    var Q = CMD.Q;
    var str = [];
    var nPoint;
    var cmdStr;
    var cmd;
    var i;
    var xi;
    var yi;
    var data = path.data;
    var dataLength = path.len();

    for (i = 0; i < dataLength;) {
      cmd = data[i++];
      cmdStr = '';
      nPoint = 0;

      switch (cmd) {
        case M:
          cmdStr = ' m ';
          nPoint = 1;
          xi = data[i++];
          yi = data[i++];
          points[0][0] = xi;
          points[0][1] = yi;
          break;

        case L:
          cmdStr = ' l ';
          nPoint = 1;
          xi = data[i++];
          yi = data[i++];
          points[0][0] = xi;
          points[0][1] = yi;
          break;

        case Q:
        case C:
          cmdStr = ' c ';
          nPoint = 3;
          var x1 = data[i++];
          var y1 = data[i++];
          var x2 = data[i++];
          var y2 = data[i++];
          var x3;
          var y3;

          if (cmd === Q) {
            // Convert quadratic to cubic using degree elevation
            x3 = x2;
            y3 = y2;
            x2 = (x2 + 2 * x1) / 3;
            y2 = (y2 + 2 * y1) / 3;
            x1 = (xi + 2 * x1) / 3;
            y1 = (yi + 2 * y1) / 3;
          } else {
            x3 = data[i++];
            y3 = data[i++];
          }

          points[0][0] = x1;
          points[0][1] = y1;
          points[1][0] = x2;
          points[1][1] = y2;
          points[2][0] = x3;
          points[2][1] = y3;
          xi = x3;
          yi = y3;
          break;

        case A:
          var x = 0;
          var y = 0;
          var sx = 1;
          var sy = 1;
          var angle = 0;

          if (m) {
            // Extract SRT from matrix
            x = m[4];
            y = m[5];
            sx = sqrt(m[0] * m[0] + m[1] * m[1]);
            sy = sqrt(m[2] * m[2] + m[3] * m[3]);
            angle = Math.atan2(-m[1] / sy, m[0] / sx);
          }

          var cx = data[i++];
          var cy = data[i++];
          var rx = data[i++];
          var ry = data[i++];
          var startAngle = data[i++] + angle;
          var endAngle = data[i++] + startAngle + angle; // FIXME
          // var psi = data[i++];

          i++;
          var clockwise = data[i++];
          var x0 = cx + cos(startAngle) * rx;
          var y0 = cy + sin(startAngle) * ry;
          var x1 = cx + cos(endAngle) * rx;
          var y1 = cy + sin(endAngle) * ry;
          var type = clockwise ? ' wa ' : ' at ';

          if (Math.abs(x0 - x1) < 1e-4) {
            // IE won't render arches drawn counter clockwise if x0 == x1.
            if (Math.abs(endAngle - startAngle) > 1e-2) {
              // Offset x0 by 1/80 of a pixel. Use something
              // that can be represented in binary
              if (clockwise) {
                x0 += 270 / Z;
              }
            } else {
              // Avoid case draw full circle
              if (Math.abs(y0 - cy) < 1e-4) {
                if (clockwise && x0 < cx || !clockwise && x0 > cx) {
                  y1 -= 270 / Z;
                } else {
                  y1 += 270 / Z;
                }
              } else if (clockwise && y0 < cy || !clockwise && y0 > cy) {
                x1 += 270 / Z;
              } else {
                x1 -= 270 / Z;
              }
            }
          }

          str.push(type, round(((cx - rx) * sx + x) * Z - Z2), comma, round(((cy - ry) * sy + y) * Z - Z2), comma, round(((cx + rx) * sx + x) * Z - Z2), comma, round(((cy + ry) * sy + y) * Z - Z2), comma, round((x0 * sx + x) * Z - Z2), comma, round((y0 * sy + y) * Z - Z2), comma, round((x1 * sx + x) * Z - Z2), comma, round((y1 * sy + y) * Z - Z2));
          xi = x1;
          yi = y1;
          break;

        case CMD.R:
          var p0 = points[0];
          var p1 = points[1]; // x0, y0

          p0[0] = data[i++];
          p0[1] = data[i++]; // x1, y1

          p1[0] = p0[0] + data[i++];
          p1[1] = p0[1] + data[i++];

          if (m) {
            applyTransform(p0, p0, m);
            applyTransform(p1, p1, m);
          }

          p0[0] = round(p0[0] * Z - Z2);
          p1[0] = round(p1[0] * Z - Z2);
          p0[1] = round(p0[1] * Z - Z2);
          p1[1] = round(p1[1] * Z - Z2);
          str.push( // x0, y0
          ' m ', p0[0], comma, p0[1], // x1, y0
          ' l ', p1[0], comma, p0[1], // x1, y1
          ' l ', p1[0], comma, p1[1], // x0, y1
          ' l ', p0[0], comma, p1[1]);
          break;

        case CMD.Z:
          // FIXME Update xi, yi
          str.push(' x ');
      }

      if (nPoint > 0) {
        str.push(cmdStr);

        for (var k = 0; k < nPoint; k++) {
          var p = points[k];
          m && applyTransform(p, p, m); // 不 round 会非常慢

          str.push(round(p[0] * Z - Z2), comma, round(p[1] * Z - Z2), k < nPoint - 1 ? comma : '');
        }
      }
    }

    return str.join('');
  }; // Rewrite the original path method


  Path.prototype.brushVML = function (vmlRoot) {
    var style = this.style;
    var vmlEl = this._vmlEl;

    if (!vmlEl) {
      vmlEl = vmlCore.createNode('shape');
      initRootElStyle(vmlEl);
      this._vmlEl = vmlEl;
    }

    updateFillAndStroke(vmlEl, 'fill', style, this);
    updateFillAndStroke(vmlEl, 'stroke', style, this);
    var m = this.transform;
    var needTransform = m != null;
    var strokeEl = vmlEl.getElementsByTagName('stroke')[0];

    if (strokeEl) {
      var lineWidth = style.lineWidth; // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.

      if (needTransform && !style.strokeNoScale) {
        var det = m[0] * m[3] - m[1] * m[2];
        lineWidth *= sqrt(abs(det));
      }

      strokeEl.weight = lineWidth + 'px';
    }

    var path = this.path || (this.path = new PathProxy());

    if (this.__dirtyPath) {
      path.beginPath();
      path.subPixelOptimize = false;
      this.buildPath(path, this.shape);
      path.toStatic();
      this.__dirtyPath = false;
    }

    vmlEl.path = pathDataToString(path, this.transform);
    vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Append to root

    append(vmlRoot, vmlEl); // Text

    if (style.text != null) {
      this.drawRectText(vmlRoot, this.getBoundingRect());
    } else {
      this.removeRectText(vmlRoot);
    }
  };

  Path.prototype.onRemove = function (vmlRoot) {
    remove(vmlRoot, this._vmlEl);
    this.removeRectText(vmlRoot);
  };

  Path.prototype.onAdd = function (vmlRoot) {
    append(vmlRoot, this._vmlEl);
    this.appendRectText(vmlRoot);
  };
  /***************************************************
   * IMAGE
   **************************************************/


  var isImage = function (img) {
    // FIXME img instanceof Image 如果 img 是一个字符串的时候，IE8 下会报错
    return typeof img === 'object' && img.tagName && img.tagName.toUpperCase() === 'IMG'; // return img instanceof Image;
  }; // Rewrite the original path method


  ZImage.prototype.brushVML = function (vmlRoot) {
    var style = this.style;
    var image = style.image; // Image original width, height

    var ow;
    var oh;

    if (isImage(image)) {
      var src = image.src;

      if (src === this._imageSrc) {
        ow = this._imageWidth;
        oh = this._imageHeight;
      } else {
        var imageRuntimeStyle = image.runtimeStyle;
        var oldRuntimeWidth = imageRuntimeStyle.width;
        var oldRuntimeHeight = imageRuntimeStyle.height;
        imageRuntimeStyle.width = 'auto';
        imageRuntimeStyle.height = 'auto'; // get the original size

        ow = image.width;
        oh = image.height; // and remove overides

        imageRuntimeStyle.width = oldRuntimeWidth;
        imageRuntimeStyle.height = oldRuntimeHeight; // Caching image original width, height and src

        this._imageSrc = src;
        this._imageWidth = ow;
        this._imageHeight = oh;
      }

      image = src;
    } else {
      if (image === this._imageSrc) {
        ow = this._imageWidth;
        oh = this._imageHeight;
      }
    }

    if (!image) {
      return;
    }

    var x = style.x || 0;
    var y = style.y || 0;
    var dw = style.width;
    var dh = style.height;
    var sw = style.sWidth;
    var sh = style.sHeight;
    var sx = style.sx || 0;
    var sy = style.sy || 0;
    var hasCrop = sw && sh;
    var vmlEl = this._vmlEl;

    if (!vmlEl) {
      // FIXME 使用 group 在 left, top 都不是 0 的时候就无法显示了。
      // vmlEl = vmlCore.createNode('group');
      vmlEl = vmlCore.doc.createElement('div');
      initRootElStyle(vmlEl);
      this._vmlEl = vmlEl;
    }

    var vmlElStyle = vmlEl.style;
    var hasRotation = false;
    var m;
    var scaleX = 1;
    var scaleY = 1;

    if (this.transform) {
      m = this.transform;
      scaleX = sqrt(m[0] * m[0] + m[1] * m[1]);
      scaleY = sqrt(m[2] * m[2] + m[3] * m[3]);
      hasRotation = m[1] || m[2];
    }

    if (hasRotation) {
      // If filters are necessary (rotation exists), create them
      // filters are bog-slow, so only create them if abbsolutely necessary
      // The following check doesn't account for skews (which don't exist
      // in the canvas spec (yet) anyway.
      // From excanvas
      var p0 = [x, y];
      var p1 = [x + dw, y];
      var p2 = [x, y + dh];
      var p3 = [x + dw, y + dh];
      applyTransform(p0, p0, m);
      applyTransform(p1, p1, m);
      applyTransform(p2, p2, m);
      applyTransform(p3, p3, m);
      var maxX = mathMax(p0[0], p1[0], p2[0], p3[0]);
      var maxY = mathMax(p0[1], p1[1], p2[1], p3[1]);
      var transformFilter = [];
      transformFilter.push('M11=', m[0] / scaleX, comma, 'M12=', m[2] / scaleY, comma, 'M21=', m[1] / scaleX, comma, 'M22=', m[3] / scaleY, comma, 'Dx=', round(x * scaleX + m[4]), comma, 'Dy=', round(y * scaleY + m[5]));
      vmlElStyle.padding = '0 ' + round(maxX) + 'px ' + round(maxY) + 'px 0'; // FIXME DXImageTransform 在 IE11 的兼容模式下不起作用

      vmlElStyle.filter = imageTransformPrefix + '.Matrix(' + transformFilter.join('') + ', SizingMethod=clip)';
    } else {
      if (m) {
        x = x * scaleX + m[4];
        y = y * scaleY + m[5];
      }

      vmlElStyle.filter = '';
      vmlElStyle.left = round(x) + 'px';
      vmlElStyle.top = round(y) + 'px';
    }

    var imageEl = this._imageEl;
    var cropEl = this._cropEl;

    if (!imageEl) {
      imageEl = vmlCore.doc.createElement('div');
      this._imageEl = imageEl;
    }

    var imageELStyle = imageEl.style;

    if (hasCrop) {
      // Needs know image original width and height
      if (!(ow && oh)) {
        var tmpImage = new Image();
        var self = this;

        tmpImage.onload = function () {
          tmpImage.onload = null;
          ow = tmpImage.width;
          oh = tmpImage.height; // Adjust image width and height to fit the ratio destinationSize / sourceSize

          imageELStyle.width = round(scaleX * ow * dw / sw) + 'px';
          imageELStyle.height = round(scaleY * oh * dh / sh) + 'px'; // Caching image original width, height and src

          self._imageWidth = ow;
          self._imageHeight = oh;
          self._imageSrc = image;
        };

        tmpImage.src = image;
      } else {
        imageELStyle.width = round(scaleX * ow * dw / sw) + 'px';
        imageELStyle.height = round(scaleY * oh * dh / sh) + 'px';
      }

      if (!cropEl) {
        cropEl = vmlCore.doc.createElement('div');
        cropEl.style.overflow = 'hidden';
        this._cropEl = cropEl;
      }

      var cropElStyle = cropEl.style;
      cropElStyle.width = round((dw + sx * dw / sw) * scaleX);
      cropElStyle.height = round((dh + sy * dh / sh) * scaleY);
      cropElStyle.filter = imageTransformPrefix + '.Matrix(Dx=' + -sx * dw / sw * scaleX + ',Dy=' + -sy * dh / sh * scaleY + ')';

      if (!cropEl.parentNode) {
        vmlEl.appendChild(cropEl);
      }

      if (imageEl.parentNode !== cropEl) {
        cropEl.appendChild(imageEl);
      }
    } else {
      imageELStyle.width = round(scaleX * dw) + 'px';
      imageELStyle.height = round(scaleY * dh) + 'px';
      vmlEl.appendChild(imageEl);

      if (cropEl && cropEl.parentNode) {
        vmlEl.removeChild(cropEl);
        this._cropEl = null;
      }
    }

    var filterStr = '';
    var alpha = style.opacity;

    if (alpha < 1) {
      filterStr += '.Alpha(opacity=' + round(alpha * 100) + ') ';
    }

    filterStr += imageTransformPrefix + '.AlphaImageLoader(src=' + image + ', SizingMethod=scale)';
    imageELStyle.filter = filterStr;
    vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Append to root

    append(vmlRoot, vmlEl); // Text

    if (style.text != null) {
      this.drawRectText(vmlRoot, this.getBoundingRect());
    }
  };

  ZImage.prototype.onRemove = function (vmlRoot) {
    remove(vmlRoot, this._vmlEl);
    this._vmlEl = null;
    this._cropEl = null;
    this._imageEl = null;
    this.removeRectText(vmlRoot);
  };

  ZImage.prototype.onAdd = function (vmlRoot) {
    append(vmlRoot, this._vmlEl);
    this.appendRectText(vmlRoot);
  };
  /***************************************************
   * TEXT
   **************************************************/


  var DEFAULT_STYLE_NORMAL = 'normal';
  var fontStyleCache = {};
  var fontStyleCacheCount = 0;
  var MAX_FONT_CACHE_SIZE = 100;
  var fontEl = document.createElement('div');

  var getFontStyle = function (fontString) {
    var fontStyle = fontStyleCache[fontString];

    if (!fontStyle) {
      // Clear cache
      if (fontStyleCacheCount > MAX_FONT_CACHE_SIZE) {
        fontStyleCacheCount = 0;
        fontStyleCache = {};
      }

      var style = fontEl.style;
      var fontFamily;

      try {
        style.font = fontString;
        fontFamily = style.fontFamily.split(',')[0];
      } catch (e) {}

      fontStyle = {
        style: style.fontStyle || DEFAULT_STYLE_NORMAL,
        variant: style.fontVariant || DEFAULT_STYLE_NORMAL,
        weight: style.fontWeight || DEFAULT_STYLE_NORMAL,
        size: parseFloat(style.fontSize || 12) | 0,
        family: fontFamily || 'Microsoft YaHei'
      };
      fontStyleCache[fontString] = fontStyle;
      fontStyleCacheCount++;
    }

    return fontStyle;
  };

  var textMeasureEl; // Overwrite measure text method

  textContain.$override('measureText', function (text, textFont) {
    var doc = vmlCore.doc;

    if (!textMeasureEl) {
      textMeasureEl = doc.createElement('div');
      textMeasureEl.style.cssText = 'position:absolute;top:-20000px;left:0;' + 'padding:0;margin:0;border:none;white-space:pre;';
      vmlCore.doc.body.appendChild(textMeasureEl);
    }

    try {
      textMeasureEl.style.font = textFont;
    } catch (ex) {// Ignore failures to set to invalid font.
    }

    textMeasureEl.innerHTML = ''; // Don't use innerHTML or innerText because they allow markup/whitespace.

    textMeasureEl.appendChild(doc.createTextNode(text));
    return {
      width: textMeasureEl.offsetWidth
    };
  });
  var tmpRect = new BoundingRect();

  var drawRectText = function (vmlRoot, rect, textRect, fromTextEl) {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);
    var text = style.text; // Convert to string

    text != null && (text += '');

    if (!text) {
      return;
    } // Convert rich text to plain text. Rich text is not supported in
    // IE8-, but tags in rich text template will be removed.


    if (style.rich) {
      var contentBlock = textContain.parseRichText(text, style);
      text = [];

      for (var i = 0; i < contentBlock.lines.length; i++) {
        var tokens = contentBlock.lines[i].tokens;
        var textLine = [];

        for (var j = 0; j < tokens.length; j++) {
          textLine.push(tokens[j].text);
        }

        text.push(textLine.join(''));
      }

      text = text.join('\n');
    }

    var x;
    var y;
    var align = style.textAlign;
    var verticalAlign = style.textVerticalAlign;
    var fontStyle = getFontStyle(style.font); // FIXME encodeHtmlAttribute ?

    var font = fontStyle.style + ' ' + fontStyle.variant + ' ' + fontStyle.weight + ' ' + fontStyle.size + 'px "' + fontStyle.family + '"';
    textRect = textRect || textContain.getBoundingRect(text, font, align, verticalAlign, style.textPadding, style.textLineHeight); // Transform rect to view space

    var m = this.transform; // Ignore transform for text in other element

    if (m && !fromTextEl) {
      tmpRect.copy(rect);
      tmpRect.applyTransform(m);
      rect = tmpRect;
    }

    if (!fromTextEl) {
      var textPosition = style.textPosition; // Text position represented by coord

      if (textPosition instanceof Array) {
        x = rect.x + parsePercent(textPosition[0], rect.width);
        y = rect.y + parsePercent(textPosition[1], rect.height);
        align = align || 'left';
      } else {
        var res = this.calculateTextPosition ? this.calculateTextPosition({}, style, rect) : textContain.calculateTextPosition({}, style, rect);
        x = res.x;
        y = res.y; // Default align and baseline when has textPosition

        align = align || res.textAlign;
        verticalAlign = verticalAlign || res.textVerticalAlign;
      }
    } else {
      x = rect.x;
      y = rect.y;
    }

    x = textContain.adjustTextX(x, textRect.width, align);
    y = textContain.adjustTextY(y, textRect.height, verticalAlign); // Force baseline 'middle'

    y += textRect.height / 2; // var fontSize = fontStyle.size;
    // 1.75 is an arbitrary number, as there is no info about the text baseline
    // switch (baseline) {
    // case 'hanging':
    // case 'top':
    //     y += fontSize / 1.75;
    //     break;
    //     case 'middle':
    //         break;
    //     default:
    //     // case null:
    //     // case 'alphabetic':
    //     // case 'ideographic':
    //     // case 'bottom':
    //         y -= fontSize / 2.25;
    //         break;
    // }
    // switch (align) {
    //     case 'left':
    //         break;
    //     case 'center':
    //         x -= textRect.width / 2;
    //         break;
    //     case 'right':
    //         x -= textRect.width;
    //         break;
    // case 'end':
    // align = elementStyle.direction == 'ltr' ? 'right' : 'left';
    // break;
    // case 'start':
    // align = elementStyle.direction == 'rtl' ? 'right' : 'left';
    // break;
    // default:
    //     align = 'left';
    // }

    var createNode = vmlCore.createNode;
    var textVmlEl = this._textVmlEl;
    var pathEl;
    var textPathEl;
    var skewEl;

    if (!textVmlEl) {
      textVmlEl = createNode('line');
      pathEl = createNode('path');
      textPathEl = createNode('textpath');
      skewEl = createNode('skew'); // FIXME Why here is not cammel case
      // Align 'center' seems wrong

      textPathEl.style['v-text-align'] = 'left';
      initRootElStyle(textVmlEl);
      pathEl.textpathok = true;
      textPathEl.on = true;
      textVmlEl.from = '0 0';
      textVmlEl.to = '1000 0.05';
      append(textVmlEl, skewEl);
      append(textVmlEl, pathEl);
      append(textVmlEl, textPathEl);
      this._textVmlEl = textVmlEl;
    } else {
      // 这里是在前面 appendChild 保证顺序的前提下
      skewEl = textVmlEl.firstChild;
      pathEl = skewEl.nextSibling;
      textPathEl = pathEl.nextSibling;
    }

    var coords = [x, y];
    var textVmlElStyle = textVmlEl.style; // Ignore transform for text in other element

    if (m && fromTextEl) {
      applyTransform(coords, coords, m);
      skewEl.on = true;
      skewEl.matrix = m[0].toFixed(3) + comma + m[2].toFixed(3) + comma + m[1].toFixed(3) + comma + m[3].toFixed(3) + ',0,0'; // Text position

      skewEl.offset = (round(coords[0]) || 0) + ',' + (round(coords[1]) || 0); // Left top point as origin

      skewEl.origin = '0 0';
      textVmlElStyle.left = '0px';
      textVmlElStyle.top = '0px';
    } else {
      skewEl.on = false;
      textVmlElStyle.left = round(x) + 'px';
      textVmlElStyle.top = round(y) + 'px';
    }

    textPathEl.string = encodeHtmlAttribute(text); // TODO

    try {
      textPathEl.style.font = font;
    } // Error font format
    catch (e) {}

    updateFillAndStroke(textVmlEl, 'fill', {
      fill: style.textFill,
      opacity: style.opacity
    }, this);
    updateFillAndStroke(textVmlEl, 'stroke', {
      stroke: style.textStroke,
      opacity: style.opacity,
      lineDash: style.lineDash || null // style.lineDash can be `false`.

    }, this);
    textVmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Attached to root

    append(vmlRoot, textVmlEl);
  };

  var removeRectText = function (vmlRoot) {
    remove(vmlRoot, this._textVmlEl);
    this._textVmlEl = null;
  };

  var appendRectText = function (vmlRoot) {
    append(vmlRoot, this._textVmlEl);
  };

  var list = [RectText, Displayable, ZImage, Path, Text]; // In case Displayable has been mixed in RectText

  for (var i = 0; i < list.length; i++) {
    var proto = list[i].prototype;
    proto.drawRectText = drawRectText;
    proto.removeRectText = removeRectText;
    proto.appendRectText = appendRectText;
  }

  Text.prototype.brushVML = function (vmlRoot) {
    var style = this.style;

    if (style.text != null) {
      this.drawRectText(vmlRoot, {
        x: style.x || 0,
        y: style.y || 0,
        width: 0,
        height: 0
      }, this.getBoundingRect(), true);
    } else {
      this.removeRectText(vmlRoot);
    }
  };

  Text.prototype.onRemove = function (vmlRoot) {
    this.removeRectText(vmlRoot);
  };

  Text.prototype.onAdd = function (vmlRoot) {
    this.appendRectText(vmlRoot);
  };
}

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(440);

var _zrender = __webpack_require__(125);

var registerPainter = _zrender.registerPainter;

var Painter = __webpack_require__(439);

registerPainter('vml', Painter);

/***/ })
/******/ ]);
});
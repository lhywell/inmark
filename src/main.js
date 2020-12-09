// webpack编译入口
import './lib/require-babel-polyfill.js';

import Init from './overlay/Init.js';
import Image from './overlay/Image.js';
import Rect from './overlay/Rectangle.js';
import Polygon from './overlay/Polygon.js';

import * as utils from './common/utils';


let version = VERSION;
console.log(`inMark v${version}`);

const inMark = {
    version,
    utils,
    Init,
    Image,
    Rect,
    Polygon
};
export {
    version,
    utils,
    Init,
    Image,
    Rect,
    Polygon
};
export default inMark;
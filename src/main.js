import './lib/require-babel-polyfill.js';

import Init from './overlay/Init.js'
import Image from './overlay/Image.js'
import Rect from './overlay/Rectangle.js'

import * as utils from './common/utils';


let version = VERSION;
console.log(`inMark v${version}`);
const inMark = {
    version,
    utils,
    Init,
    Image,
    Rect
};
export {
    version,
    utils,
    Init,
    Image,
    Rect
};
export default inMark;
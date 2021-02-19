// webpack编译入口
import './lib/require-babel-polyfill.js';

import AbstractRender from './overlay/AbstractRender.js';
import Image from './overlay/Image.js';
import Rect from './overlay/Rectangle.js';
import Polygon from './overlay/Polygon.js';
import Text from './overlay/Text.js';

import * as utils from './common/utils';


let version = VERSION;
console.log(`inMark v${version}`);

const inMark = {
    version,
    utils,
    AbstractRender,
    Image,
    Rect,
    Polygon,
    Text
};
export {
    version,
    utils,
    AbstractRender,
    Image,
    Rect,
    Polygon,
    Text
};
export default inMark;
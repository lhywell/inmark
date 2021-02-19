// rollup编译入口
import '@babel/polyfill'

import AbstractRender from './overlay/AbstractRender.js';
import Image from './overlay/Image.js';
import Rect from './overlay/Rectangle.js';
import Polygon from './overlay/Polygon.js';
import Text from './overlay/Text.js';

import * as utils from './common/utils';

// https://www.npmjs.com/package/livereload
let env = ENV;
if (env !== 'production') {
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':35729/livereload.js?snipver=1"></script>')

}

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
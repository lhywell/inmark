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
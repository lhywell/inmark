/**
 * 默认矩形编辑配置
 */
export default {
    shape: {
        x: 0,
        y: 0,
        width: 4,
        height: 4,
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
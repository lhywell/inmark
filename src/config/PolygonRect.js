/**
 * 默认矩形配置
 */
export default {
    data: [],
    onlyShow: true,
    style: {
        //标注颜色
        default: {
            fill: 'rgba(24,151,117,0.05)',
            // fill: 'rgba(245,166,35,0.08)',
            stroke: '#189775',
            // stroke: '#FFA200',
            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true,
            zlevel: 2
        },
        //选中颜色
        selected: {
            fill: 'rgba(245,69,69,0.15)',
            stroke: '#CC3737',
            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true
        },
        // hover颜色
        hover: {
            fill: 'rgba(24,151,117,0.05)',
            stroke: '#189775',
            lineWidth: 1,
            lineDash: [0, 0],
            strokeNoScale: true
        },
    },
    edit: {
        dragBtnLimit: 10
    },
    event: {
        onMouseMove() {},
        onMouseOver() {},
        onMouseOut() {},
        onComplete() {},
        select() {},
        unSelect() {}
    },
};
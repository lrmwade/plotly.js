/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var calc = require('./calc');

module.exports = {
    moduleType: 'component',
    name: 'errorbars',

    attributes: require('./attributes'),
    supplyDefaults: require('./defaults'),

    calc: calc,
    calcFromTrace: calcFromTrace,

    plot: require('./plot'),
    style: require('./style'),
    hoverInfo: hoverInfo
};

function calcFromTrace(trace, layout) {
    var x = trace.x || [],
        y = trace.y || [],
        len = x.length || y.length;

    var calcdataMock = new Array(len);

    for(var i = 0; i < len; i++) {
        calcdataMock[i] = {
            x: x[i],
            y: y[i]
        };
    }

    calcdataMock[0].trace = trace;

    calc({
        calcdata: [calcdataMock],
        _fullLayout: layout
    });

    return calcdataMock;
}

function hoverInfo(calcPoint, trace, hoverPoint) {
    if((trace.error_y || {}).visible) {
        hoverPoint.yerr = calcPoint.yh - calcPoint.y;
        if(!trace.error_y.symmetric) hoverPoint.yerrneg = calcPoint.y - calcPoint.ys;
    }
    if((trace.error_x || {}).visible) {
        hoverPoint.xerr = calcPoint.xh - calcPoint.x;
        if(!trace.error_x.symmetric) hoverPoint.xerrneg = calcPoint.x - calcPoint.xs;
    }
}

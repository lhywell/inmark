/**
 * Created by lihuiyin on 2020/2/8.
 */
const merge = require('webpack-merge');
const config = require('./webpack.inmark');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(config, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name].webpack.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
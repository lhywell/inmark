/**
 * Created by lihuiyin on 2020/2/8.
 */
const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;
const option = {
  entry: {
    inmark: './src/main.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    libraryTarget: 'umd',
    library: 'inMark',
    umdNamedDefine: true,
    filename: '[name].js'
  },
  // devtool:'eval-source-map',
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ]
  },
  externals: {
    BMap: {}
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version)
    }),
  ]
};

module.exports = option;
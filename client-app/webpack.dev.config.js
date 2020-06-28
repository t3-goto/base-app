const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'app.js',
    path: dist,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dist,
    hot: true,
    port: 3000,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

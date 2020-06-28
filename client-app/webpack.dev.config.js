const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: dist,
  },
  module: {
    rules: [
      {
        // loaderの対象ファイルの拡張子を設定する
        test: /\.(js|jsx|ts|tsx)$/,
        // loaderの対象ディレクトリを設定する
        include: src,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
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

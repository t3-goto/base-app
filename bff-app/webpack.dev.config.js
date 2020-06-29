const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  // ________________________________________________
  // エントリーポイントの設定
  entry: [
    path.resolve(__dirname, 'src/app.ts'),
    'webpack-hot-middleware/client',
  ],
  // ________________________________________________
  // モード設定
  mode: 'development',
  // ________________________________________________
  // 出力バンドル設定
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // ________________________________________________
  // loaderの設定
  module: {
    rules: [
      // ______________________________________________
      // eslint-loaderの設定
      {
        test: /\.(js|ts)$/,
        // include: src,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
          failOnError: true,
        },
      },
    ],
  },
  // ________________________________________________
  // source mapの設定
  devtool: 'cheap-module-eval-source-map',
  // ________________________________________________
  // pluginの設定
  plugins: [
    // _______________________________________________
    // HotModuleReplacementPluginの有効化（ホットリロード）
    new webpack.HotModuleReplacementPlugin(),
  ],
});

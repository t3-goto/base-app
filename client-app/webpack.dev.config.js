const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base.config');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  // ________________________________________________
  // モード設定
  mode: 'development',
  // ________________________________________________
  // 出力バンドル設定
  output: {
    filename: '[name].js',
    path: dist,
  },
  // ________________________________________________
  // loaderの設定
  module: {
    rules: [
      // ______________________________________________
      // eslint-loaderの設定
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(src, 'ts'),
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
  // 開発用サーバーの設定
  devServer: {
    contentBase: dist,
    hot: true,
    port: 3000,
    open: true,
  },
  // ________________________________________________
  // pluginの設定
  plugins: [
    // _______________________________________________
    // HotModuleReplacementPluginの有効化（ホットリロード）
    new webpack.HotModuleReplacementPlugin(),
    // _______________________________________________
    // BundleAnalyzerPluginの有効化（バンドルサイズ確認時に有効化する）
    // new BundleAnalyzerPlugin(),
  ],
});

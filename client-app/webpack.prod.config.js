const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].min.js',
    path: dist,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 共通モジュールとしてバンドルする対象のファイルを設定する。
          test: /node_modules/,
          // 出力する共通モジュールのバンドルのファイル名を設定する。vendor.bundle.jsとなる。
          name: 'vendor',
          // 共通モジュールとして、バンドルする対象の設定
          chunks: 'initial',
          // オプションの設定
          enforce: true,
        },
      },
    },
  },
});

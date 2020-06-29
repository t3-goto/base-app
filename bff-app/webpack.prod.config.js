const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  // ________________________________________________
  // エントリーポイントの設定
  entry: {
    app: path.resolve(__dirname, 'src/app.ts'),
  },
  // ________________________________________________
  // モード設定
  mode: 'production',
  // ________________________________________________
  // 出力バンドル設定
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
});

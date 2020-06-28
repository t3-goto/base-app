const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  // ________________________________________________
  // モード設定
  mode: 'production',
  // ________________________________________________
  // 出力バンドル設定
  output: {
    filename: '[name].min.js',
    path: dist,
  },
  // ________________________________________________
  // 最適化設定
  optimization: {
    // _______________________________________________
    // splitChunksの設定（共通ファイル出力）
    splitChunks: {
      cacheGroups: {
        vendor: {
          // ____________________________________________
          // 共通モジュールの対象のファイルを設定する
          test: /node_modules/,
          // ____________________________________________
          // 共通モジュールの出力ファイル名を設定する
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
    // _______________________________________________
    // minimizerの設定（ファイル圧縮）
    minimizer: [
      // ______________________________________________
      // UglifyJSPluginのカスタマイズ（JSファイル圧縮）
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      // ______________________________________________
      // OptimizeCSSAssetsPluginの有効化（CSSファイル圧縮）
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});

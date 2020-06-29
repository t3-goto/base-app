const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const src = path.join(__dirname, 'src');

module.exports = {
  // ________________________________________________
  // モジュール解決に関する設定（インポートパス・拡張子の省略）
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.ts'],
  },
  // ________________________________________________
  // 処理対象の設定（Node.jsランタイム向けビルド設定）
  target: 'node',
  externals: [nodeExternals()],
  // ________________________________________________
  // loaderの設定
  module: {
    rules: [
      // ______________________________________________
      // ts-loaderの設定
      {
        test: /\.(ts)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  // ________________________________________________
  // pluginの設定
  plugins: [
    // _______________________________________________
    // CleanWebpackPluginの有効化（出力ファイル削除）
    new CleanWebpackPlugin(),
  ],
};

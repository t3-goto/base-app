const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');
// const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(src, 'ts/main.tsx'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // loaderの対象ファイルの拡張子を設定する
        test: /\.(ts|tsx)$/,
        // loaderの対象ディレクトリを設定する
        include: src,

        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'html/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};

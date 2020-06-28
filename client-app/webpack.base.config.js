const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.join(__dirname, 'src');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(src, 'ts/main.tsx'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'html/index.html'),
    }),
  ],
};

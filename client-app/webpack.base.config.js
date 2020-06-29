const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const src = path.join(__dirname, 'src');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  // ________________________________________________
  // エントリーポイントの設定
  entry: path.resolve(src, 'ts/main.tsx'),
  // ________________________________________________
  // モジュール解決に関する設定（インポートパス・拡張子の省略）
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  // ________________________________________________
  // 処理対象の設定（Webブラウザ向けビルド設定）
  target: 'web',
  // ________________________________________________
  // loaderの設定
  module: {
    rules: [
      // ______________________________________________
      // ts-loaderの設定
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(src, 'ts'),
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      // ______________________________________________
      // css-loaderの設定
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      // ______________________________________________
      // sass-loaderの設定
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // ______________________________________________
      // url-loaderの設定
      {
        test: /\.(gif|png|jpg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              name: './images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  // ________________________________________________
  // pluginの設定
  plugins: [
    // _______________________________________________
    // HtmlWebpackPluginの有効化（HTML自動生成）
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(src, 'html/index.html'),
    }),
    // _______________________________________________
    // CleanWebpackPluginの有効化（出力ファイル削除）
    new CleanWebpackPlugin(),
    // _______________________________________________
    // MiniCSSExtractPluginの有効化（CSSファイルの抽出設定）
    new MiniCSSExtractPlugin({
      filename: prodMode ? 'app.mini.css' : 'app.css',
    }),
    // _______________________________________________
    // StyleLintPluginの有効化（StyleLint連携）
    new StyleLintPlugin({}),
  ],
};

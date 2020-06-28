const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const dist = path.join(__dirname, 'dist');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'app.min.js',
    path: dist,
  },
});

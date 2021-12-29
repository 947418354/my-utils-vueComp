const path = require('path');

module.exports = {
  entry: './src/test/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.js'
  },
  optimization: {
    minimize: false,
  }
};
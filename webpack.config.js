var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    publicPath: '/docs/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    compress: true
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      include: path.resolve(__dirname, 'node_modules/pixi.js'),
      loader: 'transform-loader?brfs',
      enforce: 'post'
    }
    ]

  }
}

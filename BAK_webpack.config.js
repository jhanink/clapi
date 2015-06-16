var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: ['webpack/hot/dev-server', './app/app.jsx'],
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "react-hot!babel-loader?stage=1"
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};

module.exports = config;
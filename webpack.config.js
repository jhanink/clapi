/*
var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    }]
  }
};

module.exports = config;*/


var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
/*var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToJquery = path.resolve(node_modules, 'jquery/dist/jquery.min.js');*/

var config = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
  /*resolve: {
    alias: {
      'react': pathToReact
    }
  },*/
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {},
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    /*noParse: [pathToReact, pathToJquery],*/
    loaders: [
      { test: /\.jsx?$/, loader: 'babel'},
      { test: /\.css$/, loader: 'style-loader!css-loader' }, // use ! to chain loaders
      { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" }
      /*{ test: /\.jsx$/, loader: 'jsx-loader?harmony' }*/
      ]
  }
};

module.exports = config;
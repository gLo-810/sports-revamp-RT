<<<<<<< HEAD
const path = require('path');

module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    path: path.resolve(__dirname, './app/temp/scripts'),
    filename: 'App.js'
=======
var path = require('path');

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts" ),
    filename: "App.js"
>>>>>>> js-redo
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}

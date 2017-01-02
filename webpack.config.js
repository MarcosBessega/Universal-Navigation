const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    react: "./example/react.jsx",
    vue: "./example/vue.js",
    index: "./example/index.js"
  },
  output: { path: path.join(__dirname, 'example', 'dist'), filename: '[name].js' },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
}

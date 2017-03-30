const path = require('path');

module.exports = {
  entry: {
    'js/main': ['babel-polyfill', './src/js/main.js'],
    'sw': './src/js/sw.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: 'public'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      Pages: path.join(__dirname, 'src/js/Pages'),
      Components: path.join(__dirname, 'src/js/Components'),
      wavesurfer: path.resolve(__dirname, './node_modules/wavesurfer.js/dist/wavesurfer.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}

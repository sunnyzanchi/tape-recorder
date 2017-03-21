const path = require('path');

module.exports = {
  entry: {
    'js/main': './src/js/main.js',
    'sw': './src/js/sw.js'
  },
  output: {
    filename: '[name].bundle.js'
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  }
}

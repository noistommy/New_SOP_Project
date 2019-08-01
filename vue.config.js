// const path = require('path')
const webpack = require('webpack')

module.exports = {
  filenameHashing: false,
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery'
      })
    ]
  }
}

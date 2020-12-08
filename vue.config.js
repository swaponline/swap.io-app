module.exports = {
  lintOnSave: true,

  devServer: {
    open: true,
    watchOptions: {
      poll: true
    },
    // proxy: ''
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/vars";'
      }
    }
  },

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  }
}

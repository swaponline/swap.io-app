module.exports = {
  lintOnSave: true,

  devServer: {
    open: true,
    // https: true,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
    // proxy: ''
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/vars"; @import "~@/assets/scss/media";'
      }
    }
  },
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
    svgSprite: {
      dir: 'src/assets/icons',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg'
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
  }
}

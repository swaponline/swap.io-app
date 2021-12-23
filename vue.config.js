module.exports = {
  lintOnSave: true,

  devServer: {
    open: true,
    // https: true,
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000
    },
    proxy: 'https://networks.swap.io'
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/vars"; 
        @import "~@/assets/scss/media"; 
        @import "~@/assets/scss/functions";
        @import "~@/assets/scss/theme-variable";
        `
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

import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n, loadLanguageAsync } from './i18n'
import { getLanguage } from './utils/storage'
import '@/assets/scss/base.scss'

Vue.config.productionTip = false
Vue.component('SvgIcon', SvgIcon)

const lang = getLanguage()
loadLanguageAsync(lang).then(() => {
  /* eslint-disable vue/require-name-property */
  new Vue({
    i18n,
    router,
    vuetify,
    store,
    render: h => h(App)
  }).$mount('#app')
})

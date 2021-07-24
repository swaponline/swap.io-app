import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import UI from '@/components/UI'
import icons from 'vue-cryptoicon/src/icons'
import Cryptoicon from 'vue-cryptoicon'
import SwapKeysApi from '@/keys-api'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n, loadLanguageAsync } from './i18n'
import { getLanguage } from './utils/storage'
import '@/assets/scss/base.scss'

Vue.config.productionTip = false

Cryptoicon.add(icons)

Vue.use(Cryptoicon, { generic: true })
Vue.use(UI)

// @ts-ignore
window.keysApi = SwapKeysApi

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

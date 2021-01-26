import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import TransitionInner from '@/components/Transitions/TransitionInner.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'

Vue.config.productionTip = false
Vue.component('TransitionInner', TransitionInner)
Vue.component('SvgIcon', SvgIcon)

/* eslint-disable vue/require-name-property */
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

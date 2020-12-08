import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'

Vue.config.productionTip = false

/* eslint-disable vue/require-name-property */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

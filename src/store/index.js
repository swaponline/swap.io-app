import Vue from 'vue'
import Vuex from 'vuex'
import Wallets from './modules/Wallets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Wallets
  }
})

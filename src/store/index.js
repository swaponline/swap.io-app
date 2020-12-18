import Vue from 'vue'
import Vuex from 'vuex'
import Wallets from './modules/Wallets'
import Transaction from './modules/Transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Wallets,
    Transaction
  }
})

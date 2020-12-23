import Vue from 'vue'
import Vuex from 'vuex'
import Wallets from './modules/Wallets'
import Transactions from './modules/Transactions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Wallets,
    Transactions
  }
})

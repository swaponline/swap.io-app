import Vue from 'vue'
import Vuex from 'vuex'
import Wallets from './modules/Wallets'
import Transactions from './modules/Transactions'
import Modals from './modules/Modals'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Wallets,
    Transactions,
    Modals
  }
})

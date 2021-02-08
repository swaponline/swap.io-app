import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './common/mutations'
import Wallets from './modules/Wallets'
import Transactions from './modules/Transactions'
import SendTransaction from './modules/SendTransaction'
import Modals from './modules/Modals'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  modules: {
    Wallets,
    Transactions,
    SendTransaction,
    Modals
  }
})

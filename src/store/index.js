import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './common/mutations'
import Transactions from './modules/Transactions'
import Modals from './modules/Modals'
import Profile from './modules/Profile'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  modules: {
    Transactions,
    Modals,
    Profile
  }
})

import Transaction from '@/api/swap.json'
import { SET_LIST } from '@/store/common/mutations.types'
import { pickCommonMutations } from '@/store/common/mutations'

export const MODULE_NAME = 'Transaction'

export const GET_TRANSACTION = 'GET_TRANSACTION'

export default {
  state: {
    list: []
  },
  actions: {
    [GET_TRANSACTION]({ commit }) {
      commit(SET_LIST, { list: Transaction })
    }
  },
  mutations: {
    ...pickCommonMutations([SET_LIST])
  }
}

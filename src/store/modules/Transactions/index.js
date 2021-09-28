import Transaction from '@/api/swap'
import { SET_LIST, UPDATE_MODEL, LOADING, LOADED } from '@/store/common/mutations.types'
import { getDate } from '@/utils/date'

export const MODULE_NAME = 'Transactions'

export const GET_TRANSACTIONS = 'getTransactions'
export const EDIT_FEE = 'editFee'
export const TRANSACTIONS_SORTED_BY_DATE = 'transactionsSortedByDate'

export default {
  state: {
    list: [],
    model: {
      fee: 0
    },
    loading: false
  },
  getters: {
    /**
     * [{
     *  date: "Today || Yesterday || 'dd.mm.yyyy'",
     *  list: []
     * }]
     */
    [TRANSACTIONS_SORTED_BY_DATE]({ list }) {
      return wallet => {
        return list
          .filter(el => el.to === wallet || el.from === wallet)
          .reduce((newList, el) => {
            const nameDay = getDate(el.timestamp)
            const day = newList.find(item => item.date === nameDay)
            if (day) {
              day.list.push(el)
            } else {
              newList.push({
                date: nameDay,
                list: [el]
              })
            }
            return newList
          }, [])
      }
    }
  },
  actions: {
    [GET_TRANSACTIONS]({ commit }) {
      commit(LOADING, MODULE_NAME)
      setTimeout(() => {
        const list = [...Transaction].sort((a, b) => b.timestamp - a.timestamp)
        commit(SET_LIST, { name: MODULE_NAME, list })
        commit(LOADED, MODULE_NAME)
      }, 1000)
    },
    [EDIT_FEE]({ commit }, fee) {
      commit(UPDATE_MODEL, {
        name: MODULE_NAME,
        model: {
          fee
        }
      })
    }
  }
}

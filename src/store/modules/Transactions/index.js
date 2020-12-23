import Transaction from '@/api/swap.json'
import { SET_LIST } from '@/store/common/mutations.types'
import { pickCommonMutations } from '@/store/common/mutations'
import { getDate } from '@/utils/date'

export const MODULE_NAME = 'Transaction'

export const GET_TRANSACTION = 'GET_TRANSACTION'

export default {
  state: {
    list: []
  },
  getters: {
    /**
     * [{
     *  date: "Today || Yesterday || 'dd.mm.yyyy'",
     *  list: []
     * }]
     */
    listTransactionsSortByDate({ list }) {
      return list.reduce((newList, el) => {
        const nameDay = getDate(el.timestamp)
        if (newList.find(day => day.date === nameDay)) {
          const day = newList.find(item => item.date === nameDay)
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
  },
  actions: {
    [GET_TRANSACTION]({ commit }) {
      const list = Transaction.sort((a, b) => b.timestamp - a.timestamp)
      commit(SET_LIST, { list })
    }
  },
  mutations: {
    ...pickCommonMutations([SET_LIST])
  }
}

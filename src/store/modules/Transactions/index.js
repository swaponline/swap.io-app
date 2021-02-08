import Transaction from '@/api/swap.json'
import { SET_LIST } from '@/store/common/mutations.types'
import { getDate } from '@/utils/date'

export const MODULE_NAME = 'Transactions'

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

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
      const list = Transaction.sort((a, b) => b.timestamp - a.timestamp)
      commit(SET_LIST, { name: MODULE_NAME, list })
    }
  }
}

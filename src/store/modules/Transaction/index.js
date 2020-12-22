import Transaction from '@/api/swap.json'
import { SET_LIST } from '@/store/common/mutations.types'
import { pickCommonMutations } from '@/store/common/mutations'
import { isToday, isYesterdayDay, getDate } from '@/utils/date'

export const MODULE_NAME = 'Transaction'

export const GET_TRANSACTION = 'GET_TRANSACTION'

export default {
  state: {
    list: []
  },
  actions: {
    [GET_TRANSACTION]({ commit }) {
      const transaction = Transaction.sort((a, b) => b.timestamp - a.timestamp)
      const date = new Date()
      const list = transaction.reduce((newList, el) => {
        const elDate = new Date(el.timestamp)
        const nameDay = getDate(elDate)
        if (isToday(elDate, date) && !newList.find(item => item.nameDay === 'Today')) {
          newList.push({ nameDay: 'Today' })
        } else if (isYesterdayDay(elDate, date) && !newList.find(item => item.nameDay === 'Yesterday')) {
          newList.push({ nameDay: 'Yesterday' })
        } else if (!newList.find(item => item.nameDay === nameDay)) {
          newList.push({ nameDay })
        }
        newList.push(el)
        return newList
      }, [])
      commit(SET_LIST, { list })
    }
  },
  mutations: {
    ...pickCommonMutations([SET_LIST])
  }
}

import { SET_MODEL } from '@/store/common/mutations.types'
import { pickCommonMutations } from '@/store/common/mutations'

export const MODULE_NAME = 'Wallets'
export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID'
export const GET_ACCOUNT_ID = 'GET_ACCOUNT_ID'

export default {
  state: {
    model: {
      accountId: null
    },
    list: [
      {
        id: 'iasduah415fni1j832jh8rjnfimda0m',
        name: 'Vasilii',
        list: [
          {
            name: 'BTC',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            name: 'ETH',
            value: 43.0561,
            subWallets: [
              {
                name: 'Default',
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              },
              {
                name: 'Swaps',
                value: 3.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
              },
              {
                name: 'Expenses',
                value: 0.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F24882'
              }
            ]
          },
          {
            name: 'USDT',
            value: 100.1,
            subWallets: [
              {
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          }
        ]
      },
      {
        id: 'iasd123uahfni1j832jh8rjnfimda0m',
        name: 'Corporat',
        list: [
          {
            name: 'ETH',
            value: 43.0561,
            subWallets: [
              {
                name: 'Default',
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              }
            ]
          }
        ]
      }
    ]
  },
  getters: {
    currentAccount(state) {
      return state.list.find(el => el.id === state.model.accountId) || {}
    },
    currentListWallets(state, { currentAccount }) {
      return currentAccount.list
    },
    siblingList(state, { currentListWallets }) {
      return currentListWallets?.reduce((acc, el) => {
        acc.push(...el.subWallets)
        return acc
      }, [])
    },
    walletsSumm(state, { currentListWallets }) {
      return currentListWallets?.reduce((balance, el) => {
        return balance + el.value
      }, 0)
    }
  },
  actions: {
    [GET_ACCOUNT_ID]({ state, commit }) {
      const accountId = window.localStorage.getItem('accountId') || state.list[0].id
      commit(SET_MODEL, { model: { accountId } })
    },
    [SET_ACCOUNT_ID]({ commit }, accountId) {
      window.localStorage.setItem('accountId', accountId)
      commit(SET_MODEL, { model: { accountId } })
    }
  },
  mutations: {
    ...pickCommonMutations([SET_MODEL])
  }
}

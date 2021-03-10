import { SET_MODEL, SET_LIST, UPDATE_OBJECT_PROPERTY } from '@/store/common/mutations.types'

export const MODULE_NAME = 'Wallets'
export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID'
export const GET_ACCOUNT_ID = 'GET_ACCOUNT_ID'
export const CREATE_NEW_USER = 'CREATE_NEW_USER'
export const CREATE_NEW_WALLET = 'CREATE_NEW_WALLET'
export const UPDATE_WALLET_NAME = 'UPDATE_WALLET_NAME'

export default {
  state: {
    model: {
      accountId: null
    },
    list: JSON.parse(window.localStorage.getItem('list')) || [
      {
        id: 'iasduah415fni1j832jh8rjnfimda0m',
        name: 'Vasilii',
        list: [
          {
            nameCurrency: 'BTC',
            name: 'my Wallet',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                nameCurrency: 'BTC',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            nameCurrency: 'ETH',
            name: 'my multisig',
            value: 43.0561,
            subWallets: [
              {
                nameCurrency: 'ETH',
                name: 'Default',
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              },
              {
                nameCurrency: 'ETH',
                name: 'Swaps',
                value: 3.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
              },
              {
                nameCurrency: 'ETH',
                name: 'Expenses',
                value: 0.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F24882'
              }
            ]
          },
          {
            nameCurrency: 'USDT',
            value: 100.1,
            subWallets: [
              {
                nameCurrency: 'USDT',
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
            nameCurrency: 'ETH',
            value: 43.0561,
            subWallets: [
              {
                nameCurrency: 'ETH',
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
    [UPDATE_WALLET_NAME]({ state, getters, commit }, wallet) {
      const index = state.list.indexOf(getters.currentAccount)
      if (index > -1) {
        const indexWalletGroup = getters.currentAccount.list.findIndex(w => w.nameCurrency === wallet.nameCurrency)
        if (indexWalletGroup > -1) {
          const indexWallet = getters.currentAccount.list[indexWalletGroup].subWallets.findIndex(
            w => w.address === wallet.address
          )
          if (indexWallet > -1) {
            commit(UPDATE_OBJECT_PROPERTY, {
              path: [MODULE_NAME, 'list', index, 'list', indexWalletGroup, 'subWallets', indexWallet],
              key: 'name',
              value: wallet.name
            })
            window.localStorage.setItem('list', JSON.stringify(state.list))
          }
        }
      }
    },
    [GET_ACCOUNT_ID]({ state, commit }) {
      const accountId = window.localStorage.getItem('accountId') || state.list[0].id
      commit(SET_MODEL, { name: MODULE_NAME, model: { accountId } })
    },
    [SET_ACCOUNT_ID]({ commit }, accountId) {
      window.localStorage.setItem('accountId', accountId)
      commit(SET_MODEL, { name: MODULE_NAME, model: { accountId } })
    },
    [CREATE_NEW_WALLET]({ state, commit, getters }, wallet) {
      const user = getters.currentAccount
      let newWallet
      const userWallet = user.list.find(w => w.name === wallet.currency)
      if (userWallet) {
        newWallet = {
          name: wallet.name,
          value: 0,
          address: `0x${Date.now()}`
        }
        userWallet.subWallets.push(newWallet)
      } else {
        newWallet = {
          name: wallet.currency,
          value: 0,
          icon: wallet.currency.toLowerCase(),
          subWallets: [
            {
              name: wallet.name,
              value: 0,
              address: `0x${Date.now()}`
            }
          ]
        }
        user.list.push(newWallet)
      }

      commit(SET_LIST, { name: MODULE_NAME, list: [...state.list] })
      window.localStorage.setItem('list', JSON.stringify(state.list))
    },
    [CREATE_NEW_USER]({ state, commit }, user) {
      const newUser = {
        id: `${user.id}`,
        name: user.name,
        list: []
      }
      commit(SET_LIST, { name: MODULE_NAME, list: [...state.list, newUser] })
      window.localStorage.setItem('list', JSON.stringify(state.list))

      commit(SET_MODEL, { name: MODULE_NAME, model: { accountId: `${user.id}` } })
      window.localStorage.setItem('accountId', `${user.id}`)
    }
  }
}

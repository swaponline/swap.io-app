import { getStorage } from '@/utils/storage'

export const MODULE_PROFILE = 'Profile'
export const CREATING_OR_RECOVERING_PROFILE = 'creatingOrRecoveringProfile'
export const IS_CREATING_OR_RECOVERING = 'isCreatingOrRecovering'

export const SET_PROFILE = 'setProfile'
export const SET_TEMPORARY_PROFILE = 'setTemporaryProfile'
export const CREATE_PROFILE = 'createProfile'
export const GET_ACCOUNT_ID = 'getAccountId'
export const CREATE_NEW_USER = 'createNewUser'
export const CREATE_WALLET = 'createWallet'
export const UPDATE_WALLET = 'updateWallet'

export const USERS_THEMES_KEY = 'usersThemes'
const WALLETS_LIST_KEY = 'walletsList'

export default {
  state: {
    list: getStorage(WALLETS_LIST_KEY) || [
      {
        id: 'iasduah415fni1j832jh8rjnfimda0m',
        // name: 'Vasilii',
        wallets: [
          {
            currencyName: 'BTC',
            name: 'my Wallet',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'BTC',
                name: 'Main wallet',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'ETH',
            name: 'my multisig',
            value: 43.0561,
            subWallets: [
              {
                currencyName: 'ETH',
                name: 'Default',
                notifications: 3,
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              },
              {
                currencyName: 'ETH',
                name: 'Swaps',
                value: 3.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
              },
              {
                currencyName: 'ETH',
                name: 'Expenses',
                notifications: 1,
                value: 0.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F24882'
              }
            ]
          },
          {
            currencyName: 'USDT',
            network: 'ETH',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'USDT',
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
        // name: 'Corporat',
        wallets: []
      },
      {
        id: 'iasd123uahfni1j832jh8rj1fimda0m',
        // name: 'Millionaire',
        wallets: [
          {
            currencyName: 'BTC',
            name: 'my Wallet 1',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'BTC',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'ETH',
            name: 'my multisig 1',
            value: 43.0561,
            subWallets: [
              {
                currencyName: 'ETH',
                name: 'Default',
                notifications: 2,
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              },
              {
                currencyName: 'ETH',
                name: 'Swaps',
                value: 3.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
              },
              {
                currencyName: 'ETH',
                name: 'Expenses',
                notifications: 1,
                value: 0.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F24882'
              }
            ]
          },
          {
            currencyName: 'USDT',
            network: 'ETH',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'USDT',
                name: 'Default',
                notifications: 2,
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'BTCP',
            network: 'ETH',
            name: 'my Wallet 2',
            value: 0.056734,
            subWallets: [
              {
                currencyName: 'BTCP',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AdJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'CC',
            network: 'ETH',
            value: 120.1,
            subWallets: [
              {
                currencyName: 'CC',
                notifications: 5,
                name: 'Default',
                value: 120.1,
                address: 'GUzPzamRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ETN',
            name: 'my Wallet 3',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ETN',
                name: 'Default',
                notifications: 1,
                value: 0.056734,
                address: '1C9Uae6kyDtPos4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'DASH',
            name: 'my Wallet 4',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'DASH',
                name: 'Default',
                value: 0.056734,
                address: '1C9dUae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'DBC',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'DBC',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vfZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ENTRP',
            name: 'my Wallet 11',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ENTRP',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kvyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'EOS',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'EOS',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VcgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'CND',
            name: 'my Wallet 12',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'CND',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyxDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'CVC',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'CVC',
                name: 'Default',
                value: 100.1,
                address: 'GUzzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ICX',
            name: 'my Wallet 13',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ICX',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5sAJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'INK',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'INK',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzywHU'
              }
            ]
          },
          {
            currencyName: 'IGNIS',
            name: 'my Wallet 1ф',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'IGNIS',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZeSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'EQUA',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'EQUA',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyrHU'
              }
            ]
          },
          {
            currencyName: 'BTC',
            name: 'my Wallet 1sa',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'BTC',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'ETH',
            name: 'my multisig 1d',
            value: 43.0561,
            subWallets: [
              {
                currencyName: 'ETH',
                name: 'Default',
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              },
              {
                currencyName: 'ETH',
                name: 'Swaps',
                value: 3.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
              },
              {
                currencyName: 'ETH',
                name: 'Expenses',
                value: 0.0,
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F24882'
              }
            ]
          },
          {
            currencyName: 'USDT',
            network: 'ETH',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'USDT',
                name: 'USDT additional',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'BTCP',
            network: 'ETH',
            name: 'my Wallet 2d',
            value: 0.056734,
            subWallets: [
              {
                currencyName: 'BTCP',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AdJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'CC',
            network: 'ETH',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'CC',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzamRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ETN',
            name: 'my Wallet 3d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ETN',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPos4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'DASH',
            name: 'my Wallet 4d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'DASH',
                name: 'Default',
                value: 0.056734,
                address: '1C9dUae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'DBC',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'DBC',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vfZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ENTRP',
            name: 'my Wallet 11d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ENTRP',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kvyDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'EOS',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'EOS',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VcgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'CND',
            name: 'my Wallet 12d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'CND',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyxDtPo4ykzd5AJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'CVC',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'CVC',
                name: 'Default',
                value: 100.1,
                address: 'GUzzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'ICX',
            name: 'my Wallet 13d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'ICX',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5sAJaLzLEZSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'INK',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'INK',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzywHU'
              }
            ]
          },
          {
            currencyName: 'IGNIS',
            name: 'my Wallet 1d',
            value: 0.056734,
            icon: 'btc',
            subWallets: [
              {
                currencyName: 'IGNIS',
                name: 'Default',
                value: 0.056734,
                address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZeSpEbP3y'
              }
            ]
          },
          {
            currencyName: 'EQUA',
            value: 100.1,
            subWallets: [
              {
                currencyName: 'EQUA',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyrHU'
              }
            ]
          }
        ]
      }
    ]
  },
  getters: {
    currentWallets(state, { hasProfile }) {
      if (!hasProfile) return []
      const profileWallets = state.list.find(el => el.id === state.model.profile.accountId)
      return profileWallets ? profileWallets.wallets : []
    },
    currentSubWallets(state, { currentWallets }) {
      return currentWallets?.reduce((acc, el) => {
        acc.push(...el.subWallets)
        return acc
      }, [])
    },
    accountBalance(state, { currentWallets }) {
      return currentWallets?.reduce((balance, el) => {
        return balance + el.value
      }, 0)
    },
    accountNotifications(state, { currentSubWallets }) {
      return currentSubWallets?.reduce((acc, { notifications }) => (notifications ? acc + notifications : acc), 0)
    }
  }
}

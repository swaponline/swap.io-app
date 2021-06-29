import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import { SET_MODEL, UPDATE_OBJECT_PROPERTY } from '../../common/mutations.types'

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
const CURRENT_USER_KEY = 'currentAccount'
const WALLETS_LIST_KEY = 'walletsList'

export const DEFAULT_COLOR_THEME = {
  background: 'linear-gradient(0deg, rgba(189,189,189,1) 0%, rgba(255,255,255,1) 100%)',
  color: '#6144E5',
  selectionColor: ''
}

// TODO mock for prototype. To be sure that localStorage has correct data
function setupLocalStorage() {
  /* eslint-disable vue/max-len */
  const defaultProfiles = [
    {
      background:
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(-18)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="115.6%"\n          height="500%"\n          fill="#ebff00"\n        />\n        <rect\n          x="15.6%"\n          y="-200%"\n          width="18.44%"\n          height="500%"\n          fill="#ff00bc"\n        />\n        <rect\n          x="34.04%"\n          y="-200%"\n          width="22.7%"\n          height="500%"\n          fill="#ffc500"\n        />\n        <rect\n          x="56.739999999999995%"\n          y="-200%"\n          width="18.44%"\n          height="500%"\n          fill="#ff0093"\n        />\n        <rect\n          x="75.17999999999999%"\n          y="-200%"\n          width="124.82%"\n          height="500%"\n          fill="#5900ff"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="15.6%"\n          cy="61%"\n          rx="11%"\n          ry="33%"\n          fill="#ff4900"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="75.17999999999999%"\n          cy="64%"\n          rx="12%"\n          ry="36%"\n          fill="#00edff"\n        />\n            </g>\n         </svg>\n      ',
      color: '#320091',
      selectionColor: 'rgba(89,0,255,0.24)',
      accountId: 'iasduah415fni1j832jh8rjnfimda0m',
      username: 'Vasilii'
    },
    {
      background:
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(14)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="119.8%"\n          height="500%"\n          fill="#9bff00"\n        />\n        <rect\n          x="19.8%"\n          y="-200%"\n          width="25.74%"\n          height="500%"\n          fill="#00cfff"\n        />\n        <rect\n          x="45.54%"\n          y="-200%"\n          width="30.69%"\n          height="500%"\n          fill="#b800ff"\n        />\n        <rect\n          x="76.23%"\n          y="-200%"\n          width="123.76%"\n          height="500%"\n          fill="#ff000f"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="19.8%"\n          cy="51%"\n          rx="13%"\n          ry="39%"\n          fill="#9aff00"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="76.23%"\n          cy="43%"\n          rx="11%"\n          ry="33%"\n          fill="#1100ff"\n        />\n            </g>\n         </svg>\n      ',
      color: '#680091',
      selectionColor: 'rgba(184,0,255,0.24)',
      accountId: 'iasd123uahfni1j832jh8rjnfimda0m',
      username: 'Corporat'
    },
    {
      background:
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(31)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="121.82%"\n          height="500%"\n          fill="#fbff00"\n        />\n        <rect\n          x="21.82%"\n          y="-200%"\n          width="24.55%"\n          height="500%"\n          fill="#ff00b0"\n        />\n        <rect\n          x="46.370000000000005%"\n          y="-200%"\n          width="26.36%"\n          height="500%"\n          fill="#3400ff"\n        />\n        <rect\n          x="72.73%"\n          y="-200%"\n          width="127.27%"\n          height="500%"\n          fill="#00ff79"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="21.82%"\n          cy="66%"\n          rx="18%"\n          ry="54%"\n          fill="#ffed00"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="72.73%"\n          cy="65%"\n          rx="24%"\n          ry="72%"\n          fill="#fdff00"\n        />\n            </g>\n         </svg>\n      ',
      color: '#009144',
      selectionColor: 'rgba(0,255,121,0.24)',
      accountId: 'iasd123uahfni1j832jh8rj1fimda0m',
      username: 'Millionaire'
    }
  ]
  /* eslint-enable vue/max-len */
  const defaultAccount = 'iasduah415fni1j832jh8rjnfimda0m'

  const profiles = getStorage(USERS_THEMES_KEY)
  const account = getStorage(CURRENT_USER_KEY)

  if (!profiles) {
    setStorage(USERS_THEMES_KEY, defaultProfiles)
  }
  if (!account) {
    setStorage(CURRENT_USER_KEY, defaultAccount)
  }

  removeStorage('colorTheme')
  removeStorage('accountId')
  removeStorage('list')
}

setupLocalStorage()

export default {
  state: {
    profiles: getStorage(USERS_THEMES_KEY),
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
                name: 'Default',
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
        wallets: [
          {
            currencyName: 'ETH',
            value: 43.0561,
            subWallets: [
              {
                currencyName: 'ETH',
                name: 'Default',
                value: 40.0561,
                address: '0xd19615f2Eab2ABfBF7ca16618b5eD43386374DD0'
              }
            ]
          }
        ]
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
            value: 100.1,
            subWallets: [
              {
                currencyName: 'USDT',
                name: 'Default',
                value: 100.1,
                address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
              }
            ]
          },
          {
            currencyName: 'BTCP',
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
            name: 'my Wallet 3',
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
    ],
    model: {
      profile: getStorage(USERS_THEMES_KEY).find(user => user.accountId === getStorage(CURRENT_USER_KEY))
    },
    temporaryProfile: DEFAULT_COLOR_THEME,

    [IS_CREATING_OR_RECOVERING]: false
  },
  getters: {
    userColorTheme(state) {
      return state[IS_CREATING_OR_RECOVERING] ? state.temporaryProfile : state.model.profile
    },
    currentWallets(state) {
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
    }
  },
  actions: {
    [SET_PROFILE]({ state, commit }, accountId) {
      setStorage(CURRENT_USER_KEY, accountId)
      const profile = state.profiles.find(p => p.accountId === accountId)
      commit(SET_MODEL, { name: MODULE_PROFILE, model: { profile } })
    },
    [SET_TEMPORARY_PROFILE]({ commit }, colors) {
      commit(UPDATE_OBJECT_PROPERTY, { path: MODULE_PROFILE, key: 'temporaryProfile', value: colors })
    },
    [CREATE_PROFILE]({ state, commit, dispatch }, profile) {
      // TODO use publicKey for accountId and username
      const { color, background, selectionColor } = profile
      const accountId = Date.now()
      const newProfile = { accountId, color, background, selectionColor, username: 'New User' }
      const newProfiles = [...state.profiles]
      newProfiles.push(newProfile)

      setStorage(USERS_THEMES_KEY, newProfiles)
      commit(UPDATE_OBJECT_PROPERTY, { path: MODULE_PROFILE, key: 'profiles', value: newProfiles })
      dispatch(SET_PROFILE, accountId)
      dispatch(CREATING_OR_RECOVERING_PROFILE, false)
    },
    [CREATING_OR_RECOVERING_PROFILE]({ commit, dispatch }, value) {
      commit(UPDATE_OBJECT_PROPERTY, { path: MODULE_PROFILE, key: IS_CREATING_OR_RECOVERING, value })
      if (!value) {
        dispatch(SET_TEMPORARY_PROFILE, DEFAULT_COLOR_THEME)
      }
    },

    [UPDATE_WALLET]() {
      // TODO
      // arguments { state, commit }, wallet
      // const index = state.list.find(state.currentAccount)
      // console.log()
      // if (index > -1) {
      //   const indexWalletGroup = getters.currentAccount.list.findIndex(w => w.currencyName === wallet.currencyName)
      //   if (indexWalletGroup > -1) {
      //     const indexWallet = getters.currentAccount.list[indexWalletGroup].subWallets.findIndex(
      //       w => w.address === wallet.address
      //     )
      //     if (indexWallet > -1) {
      //       commit(UPDATE_OBJECT_PROPERTY, {
      //         path: [MODULE_PROFILE, 'list', index, 'list', indexWalletGroup, 'subWallets', indexWallet],
      //         key: 'name',
      //         value: wallet.name
      //       })
      //       setStorage(WALLETS_LIST_KEY, JSON.stringify(state.list))
      //     }
      //   }
      // }
    }
    // TODO not used
    // [CREATE_WALLET]({ state, commit, getters }, wallet) {
    //   const user = getters.currentAccount
    //   let newWallet
    //   const userWallet = user.list.find(w => w.name === wallet.currency)
    //   if (userWallet) {
    //     newWallet = {
    //       name: wallet.name,
    //       value: 0,
    //       address: `0x${Date.now()}`
    //     }
    //     userWallet.subWallets.push(newWallet)
    //   } else {
    //     newWallet = {
    //       name: wallet.currency,
    //       value: 0,
    //       icon: wallet.currency.toLowerCase(),
    //       subWallets: [
    //         {
    //           name: wallet.name,
    //           value: 0,
    //           address: `0x${Date.now()}`
    //         }
    //       ]
    //     }
    //     user.list.push(newWallet)
    //   }

    //   commit(SET_LIST, { name: MODULE_PROFILE, list: [...state.list] })
    //   setStorage(WALLETS_LIST_KEY, JSON.stringify(state.list))
    // },
    // [CREATE_NEW_USER]({ state, commit }, user) {
    //   const newUser = {
    //     id: `${user.id}`,
    //     name: user.name,
    //     list: []
    //   }
    //   commit(SET_LIST, { name: MODULE_PROFILE, list: [...state.list, newUser] })
    //   setStorage(WALLETS_LIST_KEY, JSON.stringify(state.list))

    //   commit(SET_MODEL, { name: MODULE_PROFILE, model: { accountId: `${user.id}` } })
    //   setStorage(CURRENT_USER_KEY, `${user.id}`)
    // },
  }
}

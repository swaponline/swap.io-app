import { getStorage, setStorage } from '@/utils/storage'
import { UPDATE_MODEL } from '../../common/mutations.types'

export const MODULE_NAME = 'Profile'
export const SET_USERS_COLORS = 'SET_USERS_COLORS'

const DEFAULT_COLOR_THEME = {
  background: 'linear-gradient(287deg, #033dff 0%, #ff7ac6 24%, #ffff00 100%)',
  color: '#6144E5'
}

export default {
  state: {
    list: [],
    model: getStorage('colorTheme') || DEFAULT_COLOR_THEME
  },
  actions: {
    [SET_USERS_COLORS]({ commit }, params) {
      commit(UPDATE_MODEL, { name: MODULE_NAME, model: { ...params } })
      setStorage('colorTheme', params)
    }
  }
}

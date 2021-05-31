import { getStorage, setStorage } from '@/utils/storage'
import { UPDATE_MODEL, UPDATE_OBJECT_PROPERTY } from '../../common/mutations.types'

export const MODULE_PROFILE = 'Profile'
export const SET_USERS_COLORS = 'SET_USERS_COLORS'
export const CREATING_OR_RECOVERING_PROFILE = 'CREATING_OR_RECOVERING_PROFILE'
export const IS_CREATING_OR_RECOVERING = 'IS_CREATING_OR_RECOVERING'

const DEFAULT_COLOR_THEME = {
  background: 'linear-gradient(287deg, #033dff 0%, #ff7ac6 24%, #ffff00 100%)',
  color: '#6144E5',
  colorSelection: ''
}

export default {
  state: {
    model: getStorage('colorTheme') || DEFAULT_COLOR_THEME,
    [IS_CREATING_OR_RECOVERING]: false
  },
  actions: {
    [SET_USERS_COLORS]({ commit }, params) {
      commit(UPDATE_MODEL, { name: MODULE_PROFILE, model: { ...params } })
      setStorage('colorTheme', params)
    },
    [CREATING_OR_RECOVERING_PROFILE]({ commit }, value) {
      commit(UPDATE_OBJECT_PROPERTY, { path: MODULE_PROFILE, key: IS_CREATING_OR_RECOVERING, value })
    }
  }
}

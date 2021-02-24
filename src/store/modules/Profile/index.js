import axios from 'axios'
import { SET_LIST, UPDATE_MODEL } from '../../common/mutations.types'

export const MODULE_NAME = 'Profile'
export const GET_RANDOM_WORDS = 'GET_RANDOM_WORDS'
export const SET_USERS_COLORS = 'SET_USERS_COLORS'

export default {
  state: {
    list: [],
    model: {
      background: '#B9B9B9',
      color: '#6144E5'
    }
  },
  actions: {
    [SET_USERS_COLORS]({ commit }, params) {
      commit(UPDATE_MODEL, { name: MODULE_NAME, model: { ...params } })
    },
    [GET_RANDOM_WORDS]({ commit }) {
      return axios.get('https://random-word-api.herokuapp.com/word?number=24').then(({ data }) => {
        commit(SET_LIST, { name: MODULE_NAME, list: data })
        return Promise.resolve()
      })
    }
  }
}

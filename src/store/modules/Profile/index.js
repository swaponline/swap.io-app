import axios from 'axios'
import { SET_LIST } from '../../common/mutations.types'

export const MODULE_NAME = 'Profile'
export const GET_RANDOM_WORDS = 'GET_RANDOM_WORDS'

export default {
  state: {
    list: []
  },
  actions: {
    [GET_RANDOM_WORDS]({ commit }) {
      return axios.get('https://random-word-api.herokuapp.com/word?number=24').then(({ data }) => {
        commit(SET_LIST, { name: MODULE_NAME, list: data })
        return Promise.resolve()
      })
    }
  }
}

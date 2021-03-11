import axios from 'axios'
import { randomInteger, generateColor, getGradient } from '@/utils/generators'
import { SET_LIST, UPDATE_MODEL } from '../../common/mutations.types'

export const MODULE_NAME = 'Profile'
export const SET_USERS_COLORS = 'SET_USERS_COLORS'
export const FILL_CARDS = 'FILLCARDS'

export default {
  state: {
    list: [],
    model: {
      background: '287deg, #033dff 0%, #ff7ac6 24%, #ffff00 100%',
      color: '#6144E5',
      wordList: []
    }
  },
  actions: {
    [SET_USERS_COLORS]({ commit }, params) {
      commit(UPDATE_MODEL, { name: MODULE_NAME, model: { ...params } })
    },
    [FILL_CARDS]({ commit }) {
      return axios
        .get('https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt')
        .then(({ data }) => {
          const words = data.split('\n').slice(0, -1)
          const list = []
          for (let i = 0; i < 4; i += 1) {
            const wordList = []
            for (let k = 0; k < 24; k += 1) {
              const word = words.splice(randomInteger(0, words.length - 1), 1)
              wordList.push(...word)
            }

            const color = generateColor()
            list.splice(i, 1, {
              background: getGradient(color),
              color,
              wordList
            })
          }
          commit(SET_LIST, { name: MODULE_NAME, list })
          return Promise.resolve()
        })
    }
  }
}

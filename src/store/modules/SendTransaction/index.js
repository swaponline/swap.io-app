import { UPDATE_MODEL } from '../../common/mutations.types'

export const MODULE_NAME = 'SendTransaction'
export const EDIT_FEE = 'EDIT_FEE'

export default {
  state: {
    model: {
      fee: 0
    }
  },
  actions: {
    [EDIT_FEE]({ commit }, fee) {
      commit(UPDATE_MODEL, {
        name: MODULE_NAME,
        model: {
          fee
        }
      })
    }
  }
}

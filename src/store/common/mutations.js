import * as type from '@/store/common/mutations.types'

const mutationsMap = {
  [type.LOADING]: state => {
    state.loading = true
  },
  [type.LOADED]: state => {
    state.loading = false
  },
  [type.SET_MODEL]: (state, { model }) => {
    state.model = model
  },
  [type.UPDATE_MODEL]: (state, { model }) => {
    state.model = { ...state.model, ...model }
  },
  [type.SET_ERROR]: (state, errors) => {
    state.error = errors
  },
  [type.SET_LIST]: (state, { list }) => {
    state.list = list
  },
  [type.SET_PARAMS]: (state, { params }) => {
    state.params = params
  },
  [type.UPDATE_PARAMS]: (state, { params }) => {
    state.params = { ...state.params, ...params }
  }
}

export function pickCommonMutations(mutationNames) {
  return mutationNames.reduce((mutations, mutationName) => {
    if (mutationsMap[mutationName]) {
      return {
        ...mutations,
        [mutationName]: mutationsMap[mutationName]
      }
    }
    return mutations
  }, {})
}

export default { pickCommonMutations }

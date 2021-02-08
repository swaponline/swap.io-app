import Vue from 'vue'
import { getStateProperty } from '@/utils/store'
import * as _ from './mutations.types'

export default {
  [_.SET_ERROR]: (state, error) => {
    state.error = error
  },
  [_.LOADING]: (state, name) => {
    const property = getStateProperty(state, name)
    property.loading = true
  },
  [_.LOADED]: (state, name) => {
    const property = getStateProperty(state, name)
    property.loading = false
  },
  [_.SET_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'model', model)
  },
  [_.UPDATE_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name)
    property.model = { ...property.model, ...model }
  },
  [_.SET_LIST]: (state, { name, list }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'list', list)
  },
  [_.ADD_LIST_ITEMS]: (state, { name, list }) => {
    const property = getStateProperty(state, name)
    property.list = property.list.concat(list)
  },
  [_.UPDATE_LIST_ITEM]: (state, { name, index, value }) => {
    const property = getStateProperty(state, name)
    Object.assign(property.list[index], value)
  },
  [_.SET_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'params', params)
  },
  [_.UPDATE_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name)
    property.params = { ...property.params, ...params }
  }
}

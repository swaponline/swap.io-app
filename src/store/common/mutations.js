import Vue from 'vue'
import { getStateProperty } from '@/utils/store'
import * as mutations from './mutations.types'

export default {
  [mutations.SET_ERROR]: (state, error) => {
    state.error = error
  },
  [mutations.LOADING]: (state, name) => {
    const property = getStateProperty(state, name)
    property.loading = true
  },
  [mutations.LOADED]: (state, name) => {
    const property = getStateProperty(state, name)
    property.loading = false
  },
  [mutations.SET_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'model', model)
  },
  [mutations.UPDATE_MODEL]: (state, { name, model }) => {
    const property = getStateProperty(state, name)
    property.model = { ...property.model, ...model }
  },
  [mutations.SET_LIST]: (state, { name, list }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'list', list)
  },
  [mutations.ADD_LIST_ITEMS]: (state, { name, list }) => {
    const property = getStateProperty(state, name)
    property.list = property.list.concat(list)
  },
  [mutations.UPDATE_LIST_ITEM]: (state, { name, index, value }) => {
    const property = getStateProperty(state, name)
    Object.assign(property.list[index], value)
  },
  [mutations.SET_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name)
    Vue.set(property, 'params', params)
  },
  [mutations.UPDATE_PARAMS]: (state, { name, params }) => {
    const property = getStateProperty(state, name)
    property.params = { ...property.params, ...params }
  },
  [mutations.UPDATE_OBJECT_PROPERTY](state, { path, key, value }) {
    const property = getStateProperty(state, path)
    property[key] = value
  },
  [mutations.ADD_OBJECT_PROPERTY](state, { path, key, value }) {
    const property = getStateProperty(state, path)
    Vue.set(property, key, value)
  }
}

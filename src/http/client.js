import { create, defaults } from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import clientConfig from './config'

const timeout = 600000
const axiosInstance = create({
  ...clientConfig,
  timeout,
  adapter: cacheAdapterEnhancer(defaults.adapter, { enabledByDefault: false })
})

const get = (url, config) => {
  return axiosInstance.get(url, config).then(response => response.data)
}

const client = {
  get,
  getRaw: axiosInstance.get,
  delete: axiosInstance.delete,
  post: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  request: axiosInstance.request
}

export default client

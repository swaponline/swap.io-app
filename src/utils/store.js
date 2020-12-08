import * as type from '@/store/common/mutations.types'

function throwError(commit, title, message) {
  return error => {
    const status = error && error.response ? error.response.status : 0
    const payload = {
      title,
      message,
      status,
      error
    }
    console.error('catchError', status, title, error ? error.response : '', error)
    commit(type.SET_ERROR, payload)
    throw error || new Error(message || title)
  }
}

export default throwError

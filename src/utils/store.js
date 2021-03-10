import * as type from '@/store/common/mutations.types'

export function throwError(commit, title, message) {
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

export function getStateProperty(state, ref) {
  if (!ref) {
    throw Error(`State ref empty: ${ref}`)
  }

  const path = Array.isArray(ref) ? ref : ref.split('.')
  let property = state

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const propKey = path.shift()
    if (!Object.hasOwnProperty.call(property, propKey)) break
    property = property[propKey]
  }

  if (property === state) {
    throw Error(`State property not found: ${ref}`)
  }

  return property
}

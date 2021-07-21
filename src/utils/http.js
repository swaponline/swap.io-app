export const encodeArrayToQueryParameters = (key, arr) => {
  const encodedKey = encodeURIComponent(key)
  const encodedArr = arr.map(encodeURIComponent)
  return `${encodedKey}[]=${encodedArr.join(`&${encodedKey}[]=`)}`
}

export const encodeObjectToQueryParameters = params => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return encodeArrayToQueryParameters(key, value)
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })
    .join('&')
}

export const encodeQueryParameters = params => {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
    })
    .join('&')

  return queryString ? `?${queryString}` : ''
}

export const decodeQueryParameters = queryString => {
  if (!queryString) {
    return {}
  }

  const params = queryString
    .split('&')
    .map(p => p.split('='))
    .map(([key, value]) => [key, JSON.parse(decodeURIComponent(value))])

  return Object.fromEntries(params)
}

export const getStorage = key => {
  return window.localStorage.getItem(key)
}

export const setStorage = (key, data) => {
  return window.localStorage.setItem(key, data)
}

export const setLanguage = lang => {
  setStorage('lang', lang)
}

export const getLanguage = () => {
  return getStorage('lang') || 'en'
}

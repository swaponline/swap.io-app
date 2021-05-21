const storage = localStorage
export const getStorage = key => {
  return JSON.parse(storage.getItem(key))
}

export const setStorage = (key, data) => {
  return storage.setItem(key, JSON.stringify(data))
}

export const setLanguage = lang => {
  setStorage('lang', JSON.stringify(lang))
}

export const getLanguage = () => {
  return getStorage('lang') || 'en'
}

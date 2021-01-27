export const setLanguage = lang => {
  window.localStorage.setItem('lang', lang)
}

export const getLanguage = () => {
  return window.localStorage.getItem('lang') || 'en'
}

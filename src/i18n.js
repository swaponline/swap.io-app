import Vue from 'vue'
import VueI18n from 'vue-i18n'
import apiLang from './api/languages'
import { setLanguage } from './utils/storage'

Vue.use(VueI18n)

export const i18n = new VueI18n({})

let languages = []
const loadedLanguages = []

function setI18nLanguage(lang) {
  i18n.locale = lang
  setLanguage(lang)
  return lang
}

export function loadLanguageAsync(param) {
  let lang = param
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  if (!languages.includes(lang)) {
    lang = 'en'
  }

  return apiLang(lang).then(data => {
    i18n.setLocaleMessage(lang, data.message.default)
    languages = data.languages
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}

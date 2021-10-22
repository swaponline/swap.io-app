import { createNanoEvents } from 'nanoevents'

import { getStorage, setStorage } from '@/utils/storage'
import {
  events,
  PREFERS_COLOR_SCHEME_LIGHT,
  PREFERS_COLOR_SCHEME_DARK,
  LIGHT_THEME_KEY,
  DARK_THEME_KEY,
  THEME_KEY,
  SYSTEM_THEME_KEY,
  THEMES
} from './constants'

export function createThemeService() {
  const emitter = createNanoEvents()
  let isDark = false
  let appTheme = getStorage(THEME_KEY) || LIGHT_THEME_KEY
  let isSystemTheme = false

  function getUserSystemTheme() {
    const isDarkSystemTheme = window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches
    if (isDarkSystemTheme) return DARK_THEME_KEY
    return LIGHT_THEME_KEY
  }

  function setDarkTheme() {
    isDark = true
  }

  function setLightTheme() {
    isDark = false
  }

  function trackingUserSystemTheme({ matches, media }) {
    if (matches && isSystemTheme) {
      if (media === PREFERS_COLOR_SCHEME_LIGHT) {
        setLightTheme()
        emitter.emit(events.UPDATE_SYSTEM_THEME, LIGHT_THEME_KEY)
        return
      }

      setDarkTheme()
      emitter.emit(events.UPDATE_SYSTEM_THEME, DARK_THEME_KEY)
    }
  }

  function startTrackingUserSystemTheme() {
    window.matchMedia(PREFERS_COLOR_SCHEME_LIGHT).addEventListener('change', trackingUserSystemTheme)
    window.matchMedia(PREFERS_COLOR_SCHEME_DARK).addEventListener('change', trackingUserSystemTheme)
  }

  function setAppTheme(theme) {
    appTheme = theme
    isSystemTheme = appTheme === SYSTEM_THEME_KEY
    setStorage(THEME_KEY, appTheme)

    let localTheme = appTheme
    if (isSystemTheme) {
      localTheme = getUserSystemTheme()
    }

    if (localTheme === LIGHT_THEME_KEY) {
      setLightTheme()
      return
    }

    if (localTheme === DARK_THEME_KEY) {
      setDarkTheme()
    }
  }

  function initCurrentTheme() {
    setAppTheme(appTheme)
  }

  return {
    initCurrentTheme,
    setAppTheme,

    getIsSystemTheme() {
      return isSystemTheme
    },
    getIsDark() {
      return isDark
    },
    getUserSystemTheme,
    getAppTheme() {
      if (isSystemTheme) {
        return getUserSystemTheme()
      }
      return appTheme
    },
    startTrackingUserSystemTheme,
    stopTrackingUserSystemTheme() {
      window.matchMedia(PREFERS_COLOR_SCHEME_LIGHT).removeEventListener('change', trackingUserSystemTheme)
      window.matchMedia(PREFERS_COLOR_SCHEME_DARK).removeEventListener('change', trackingUserSystemTheme)
    },
    subscribe(event, callback) {
      const unsubscribe = emitter.on(event, callback)
      return {
        unsubscribe
      }
    }
  }
}

const themeService = createThemeService()

export { themeService, events, LIGHT_THEME_KEY, DARK_THEME_KEY, THEME_KEY, SYSTEM_THEME_KEY, THEMES }

import { createNanoEvents } from 'nanoevents'

import { getStorage, setStorage } from '@/utils/storage'
import {
  events,
  PREFERS_COLOR_SCHEME_DARK,
  LIGHT_THEME_KEY,
  DARK_THEME_KEY,
  THEME_KEY,
  SYSTEM_THEME_KEY,
  THEMES
} from './constants'

export function createThemeService() {
  const emitter = createNanoEvents()
  let appTheme = getStorage(THEME_KEY) || LIGHT_THEME_KEY
  let currentTheme = null
  const mediaQueryListColorScheme = window.matchMedia(PREFERS_COLOR_SCHEME_DARK)

  function getUserSystemTheme() {
    const isDarkSystemTheme = mediaQueryListColorScheme.matches
    if (isDarkSystemTheme) return DARK_THEME_KEY
    return LIGHT_THEME_KEY
  }

  function updateCurrentTheme(theme) {
    currentTheme = theme
    emitter.emit(events.UPDATE_CURRENT_THEME, currentTheme)
  }

  function trackingUserSystemTheme({ matches }) {
    if (matches) {
      updateCurrentTheme(DARK_THEME_KEY)
    } else {
      updateCurrentTheme(LIGHT_THEME_KEY)
    }
  }

  function startTrackingUserSystemTheme() {
    mediaQueryListColorScheme.addEventListener('change', trackingUserSystemTheme)
  }

  function stopTrackingUserSystemTheme() {
    mediaQueryListColorScheme.removeEventListener('change', trackingUserSystemTheme)
  }

  function setAppTheme(theme) {
    if (appTheme === SYSTEM_THEME_KEY) {
      stopTrackingUserSystemTheme()
    }

    appTheme = theme
    setStorage(THEME_KEY, appTheme)

    let newCurrentTheme = appTheme

    if (appTheme === SYSTEM_THEME_KEY) {
      newCurrentTheme = getUserSystemTheme()
      startTrackingUserSystemTheme()
    }

    updateCurrentTheme(newCurrentTheme)
  }

  setAppTheme(appTheme)

  return {
    setAppTheme,
    getIsDark() {
      return currentTheme === DARK_THEME_KEY
    },
    getUserSystemTheme,
    getAppTheme() {
      return appTheme
    },
    getCurrentTheme() {
      return currentTheme
    },
    startTrackingUserSystemTheme,
    stopTrackingUserSystemTheme,
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

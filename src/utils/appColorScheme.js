import { DARK_THEME_KEY } from '@/services/theme'
import { setCSSCustomProperty } from './common'

export function setAppColorSchemeBasedOnTheme({ colorForDarkTheme, color }, appTheme) {
  if (appTheme === DARK_THEME_KEY) {
    setCSSCustomProperty('main-color', colorForDarkTheme)
  } else {
    setCSSCustomProperty('main-color', color)
  }
}

import { LIGHT_THEME_KEY, DARK_THEME_KEY } from '@/constants/theme'

export function getUserSystemTheme() {
  const isLightSystemTheme = window.matchMedia('(prefers-color-scheme: light)').matches
  const isDarkSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (isDarkSystemTheme) return DARK_THEME_KEY
  if (isLightSystemTheme) return LIGHT_THEME_KEY

  return LIGHT_THEME_KEY
}

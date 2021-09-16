import { LIGHT_THEME_KEY, DARK_THEME_KEY } from '@/constants/theme'

export function getUserSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return DARK_THEME_KEY
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return LIGHT_THEME_KEY

  return LIGHT_THEME_KEY
}

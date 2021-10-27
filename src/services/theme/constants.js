export const events = {
  UPDATE_CURRENT_THEME: 'updateAppTheme'
}

export const THEME_KEY = 'theme'

export const LIGHT_THEME_KEY = 'light'
export const DARK_THEME_KEY = 'dark'
export const SYSTEM_THEME_KEY = 'system'

export const THEMES = [
  { key: LIGHT_THEME_KEY, text: 'Light' },
  { key: DARK_THEME_KEY, text: 'Dark' },
  { key: SYSTEM_THEME_KEY, text: 'As in the system' }
]

export const PREFERS_COLOR_SCHEME_LIGHT = '(prefers-color-scheme: light)'
export const PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)'

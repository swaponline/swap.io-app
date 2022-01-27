import '../__mocks__/matchMedia.mock'
import { createThemeService } from '@/services/theme'
import * as storageService from '@/utils/storage'
import { LIGHT_THEME_KEY, DARK_THEME_KEY, SYSTEM_THEME_KEY, THEME_KEY, events } from '@/services/theme/constants'

describe('Theme service', () => {
  let themeService

  afterEach(() => {
    themeService = null
  })

  it('sets new app theme', () => {
    const setStorageMock = jest.fn()
    storageService.setStorage = setStorageMock
    themeService = createThemeService()
    themeService.setAppTheme(DARK_THEME_KEY)

    expect(setStorageMock).toBeCalledWith(THEME_KEY, DARK_THEME_KEY)
  })

  it('calls a callback when the theme is updated', () => {
    const callback = jest.fn()
    themeService = createThemeService()
    themeService.subscribe(events.UPDATE_CURRENT_THEME, callback)
    themeService.setAppTheme(SYSTEM_THEME_KEY)

    expect(callback).toBeCalled()
  })

  it.each`
    theme
    ${DARK_THEME_KEY}
    ${LIGHT_THEME_KEY}
    ${SYSTEM_THEME_KEY}
  `('returns appTheme $theme', ({ theme }) => {
    themeService = createThemeService()
    themeService.setAppTheme(theme)

    expect(themeService.getAppTheme()).toBe(theme)
  })

  it.each`
    theme              | isDark
    ${DARK_THEME_KEY}  | ${true}
    ${LIGHT_THEME_KEY} | ${false}
  `('returns $isDark if theme is $theme', ({ theme, isDark }) => {
    themeService = createThemeService()
    themeService.setAppTheme(theme)

    expect(themeService.getIsDark()).toBe(isDark)
  })

  it.each`
    prefersColorSchemeDark | currentTheme
    ${true}                | ${DARK_THEME_KEY}
    ${false}               | ${LIGHT_THEME_KEY}
  `(
    'returns $currentTheme if user prefers dark theme is $prefersColorSchemeDark',
    ({ prefersColorSchemeDark, currentTheme }) => {
      const initialMatchMedia = window.matchMedia
      window.matchMedia = jest.fn().mockImplementation(query => {
        return {
          ...initialMatchMedia(query),
          matches: prefersColorSchemeDark
        }
      })
      themeService = createThemeService()
      themeService.setAppTheme(SYSTEM_THEME_KEY)

      expect(themeService.getCurrentTheme()).toBe(currentTheme)
    }
  )
})

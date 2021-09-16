<template>
  <v-app id="app">
    <canvas v-show="!isDefaultTheme" ref="backgroundCanvas" class="app-background" />
    <media-query-provider :queries="queries">
      <router-view />
    </media-query-provider>
  </v-app>
</template>

<script>
import { MediaQueryProvider } from 'vue-component-media-queries'
import Canvg from 'canvg'
import { getFaviconInColorFTheme } from '@/utils/favicon'
import { NotificationInTabTitle } from '@/services/notificationInTabTitle'
import { pluralizeNumeral } from '@/utils/pluralization'
import { getUserSystemTheme } from '@/utils/theme'
import { setCSSCustomProperty } from '@/utils/common'
import messageHandler from './messageHandler'
import { getStorage } from './utils/storage'
import { DARK_THEME_KEY, LIGHT_THEME_KEY, SYSTEM_THEME_KEY, THEME_KEY } from './constants/theme'

const queries = {
  desktop: '(min-width: 1281px)',
  tablet: '(max-width: 1280px)',
  phone: '(max-width: 480px)',
  small: '(max-width: 320px)'
}
export default {
  name: 'App',
  components: {
    MediaQueryProvider
  },
  data() {
    return {
      queries
    }
  },
  computed: {
    userColorTheme() {
      return this.$store.getters.userColorTheme
    },
    isDefaultTheme() {
      return this.userColorTheme.background.includes('linear-gradient')
    },
    accountNotifications() {
      return this.$store.getters.accountNotifications
    }
  },
  watch: {
    userColorTheme: {
      immediate: true,
      deep: true,
      handler(theme) {
        if (!theme) return

        const { color } = theme
        this.setFavicon(color)
        this.setColorThemeOfAddressBar(color)
        this.setCustomColorCSSVariables(theme)
      }
    }
  },
  mounted() {
    // SET CURRENT THEME
    const theme = getStorage(THEME_KEY) || SYSTEM_THEME_KEY

    let appTheme = theme
    if (theme === SYSTEM_THEME_KEY) {
      appTheme = getUserSystemTheme()
    }

    if (appTheme === LIGHT_THEME_KEY) {
      this.$vuetify.theme.light = true
      this.$vuetify.theme.dark = false
    }
    if (appTheme === DARK_THEME_KEY) {
      this.$vuetify.theme.dark = true
      this.$vuetify.theme.light = false
    }

    window.addEventListener('resize', this.resize)
    this.resize()
    messageHandler()
    // ! Mock
    const { accountNotifications } = this
    const title = `
        ${accountNotifications}
        new
        ${pluralizeNumeral(accountNotifications, 'transaction', 'transactions', 'transactions')}
      `
    const notificationInTabTitle = new NotificationInTabTitle()
    setTimeout(() => {
      notificationInTabTitle.set(title)
    }, 4000)

    setTimeout(() => {
      notificationInTabTitle.reset()
    }, 30000)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      let vh
      if (window.innerWidth > 1920) {
        // Правим высоту, чтобы было на весь экран без скролла
        // По сути делим на то число, на которе зумим в css
        vh = (window.innerHeight * 0.01) / ((window.innerWidth * 0.01) / 18)
      } else {
        vh = window.innerHeight * 0.01
      }
      setCSSCustomProperty('vh', `${vh}px`)

      const vw = window.innerWidth * 0.01
      setCSSCustomProperty('vw', `${vw}`)

      this.setBackground()
    },
    setBackground(backgroundSvg) {
      if (!backgroundSvg) return

      const canvas = this.$refs.backgroundCanvas
      const ctx = canvas.getContext('2d')
      const options = {
        ignoreMouse: true
      }

      // hack for scaling svg to window size
      const widthStr = `width="${window.innerWidth}"\n`
      const heightStr = `height="${window.innerHeight}"\n`
      const index = backgroundSvg.indexOf('viewBox')
      const resSvg = backgroundSvg.substring(0, index) + widthStr + heightStr + backgroundSvg.substring(index)

      const canvg = Canvg.fromString(ctx, resSvg, options)

      canvas.style.display = 'block'
      canvg.start()
    },
    setFavicon(color) {
      const attributeFaviconSvg =
        'link[rel="icon"], link[type="image/svg+xml"], link[href="./favicons/defaultSvgFavicon.svg"]'

      const faviconBase64 = getFaviconInColorFTheme(color)
      const dynamicSvgFavicon = document.querySelector(attributeFaviconSvg)

      dynamicSvgFavicon.setAttribute('href', `${faviconBase64}`)
    },
    setCustomColorCSSVariables(theme) {
      const { colorForDarkTheme, color, selectionColor, background } = theme

      if (this.$vuetify.theme.dark) {
        setCSSCustomProperty('main-color', colorForDarkTheme)
      } else {
        setCSSCustomProperty('main-color', color)
      }

      setCSSCustomProperty('selection-color', selectionColor)

      if (background.includes('linear-gradient')) {
        setCSSCustomProperty('background-app', background)
      } else {
        setCSSCustomProperty('background-app', '')
        this.$nextTick(() => this.setBackground(background))
      }
    },
    setColorThemeOfAddressBar(color) {
      const colorThemeOfAddressBar = document.querySelector('meta[name="theme-color"]')
      colorThemeOfAddressBar.setAttribute('color', `${color}`)
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  z-index: 3;

  &::before {
    background-image: var(--background-app);
    background-size: 100% 100%;
    position: absolute;
    left: -5%;
    top: -5%;
    content: '';
    height: 110%;
    width: 110%;
    opacity: 0.85;
  }

  @include small-height {
    min-height: calc(var(--vh, 1vh) * 100);
    height: 100%;
  }
}

@media screen and (min-width: 1921px) {
  #app {
    zoom: calc(var(--vw) / 18);
  }
}

.app-background {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.85;
}
</style>

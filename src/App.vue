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
import { setCSSCustomProperty } from '@/utils/common'
import { setAppColorSchemeBasedOnTheme } from '@/utils/appColorScheme'
import { profilesService, events as profilesServiceEvents } from '@/services/profiles'
import { themeService, events as themeServiceEvents } from '@/services/theme'

const queries = {
  desktop: '(min-width: 1025px)',
  tablet: '(max-width: 1024px)',
  phone: '(max-width: 480px)',
  small: '(max-width: 320px)'
}

const MOCK_NOTIFICATION_COUNT = 6
let canvg = null

export default {
  name: 'App',
  components: {
    MediaQueryProvider
  },
  data() {
    return {
      queries,
      userColorScheme: profilesService.getCurrentProfileColorScheme(),
      subscriptions: []
    }
  },
  computed: {
    isDefaultTheme() {
      return this.userColorScheme.background.includes('linear-gradient')
    },
    accountNotifications() {
      return MOCK_NOTIFICATION_COUNT
    }
  },
  watch: {
    userColorScheme: {
      immediate: true,
      deep: true,
      handler(scheme) {
        if (!scheme) return
        const { color } = scheme
        // SET THE CURRENT APP THEME
        this.$vuetify.theme.dark = themeService.getIsDark()
        this.setFavicon(color)
        this.setThemeColorOfAddressBar(color)
        this.setCustomColorCSSVariables(scheme)
      }
    }
  },
  mounted() {
    this.subscribeToUpdates()

    window.addEventListener('resize', this.resize)
    this.resize()
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
    this.resetCanvg()
    this.subscriptions.forEach(callback => callback.unsubscribe())
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
    subscribeToUpdates() {
      this.subscriptions.push(
        profilesService.subscribe(profilesServiceEvents.UPDATE_TEMPORARY_PROFILE, this.updateUserColorScheme)
      )
      this.subscriptions.push(
        profilesService.subscribe(profilesServiceEvents.UPDATE_CURRENT_PROFILE, this.updateUserColorScheme)
      )

      this.subscriptions.push(themeService.subscribe(themeServiceEvents.UPDATE_CURRENT_THEME, this.updateAppTheme))
    },

    updateAppTheme(appTheme) {
      this.$vuetify.theme.dark = themeService.getIsDark()
      setAppColorSchemeBasedOnTheme(this.userColorScheme, appTheme)
    },

    updateUserColorScheme(profile) {
      if (profile) {
        const { colorScheme } = profile
        this.userColorScheme = colorScheme
      } else {
        this.userColorScheme = profilesService.getCurrentProfileColorScheme()
      }
    },
    setBackground() {
      const { background } = this.userColorScheme
      if (!background) return

      const canvas = this.$refs.backgroundCanvas
      const ctx = canvas.getContext('2d')
      const options = {
        ignoreMouse: true
      }

      // hack for scaling svg to window size
      const widthStr = `width="${window.innerWidth}"\n`
      const heightStr = `height="${window.innerHeight}"\n`

      const index = background.indexOf('viewBox')
      const resSvg = background.substring(0, index) + widthStr + heightStr + background.substring(index)
      if (canvg) this.resetCanvg()

      canvg = Canvg.fromString(ctx, resSvg, options)

      canvas.style.display = 'block'
      canvg.start()
    },
    resetCanvg() {
      canvg.stop()
      canvg = null
    },
    setFavicon(color) {
      const attributeFaviconSvg =
        'link[rel="icon"], link[type="image/svg+xml"], link[href="./favicons/defaultSvgFavicon.svg"]'

      const faviconBase64 = getFaviconInColorFTheme(color)
      const dynamicSvgFavicon = document.querySelector(attributeFaviconSvg)

      dynamicSvgFavicon.setAttribute('href', `${faviconBase64}`)
    },
    setCustomColorCSSVariables({ background, selectionColor, color, colorForDarkTheme }) {
      const appTheme = themeService.getCurrentTheme()
      setAppColorSchemeBasedOnTheme({ color, colorForDarkTheme }, appTheme)

      setCSSCustomProperty('selection-color', selectionColor)

      if (background.includes('linear-gradient')) {
        setCSSCustomProperty('background-app', background)
      } else {
        setCSSCustomProperty('background-app', '')
        this.$nextTick(() => this.setBackground())
      }
    },
    setThemeColorOfAddressBar(color) {
      const themeColorOfAddressBar = document.querySelector('meta[name="theme-color"]')
      themeColorOfAddressBar.setAttribute('color', `${color}`)
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

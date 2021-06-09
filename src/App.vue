<template>
  <v-app id="app">
    <canvas ref="backgroundCanvas" class="app-background" />
    <media-query-provider :queries="queries">
      <router-view />
    </media-query-provider>
  </v-app>
</template>

<script>
import { MediaQueryProvider } from 'vue-component-media-queries'
import { MODULE_PROFILE } from '@/store/modules/Profile'
import Canvg from 'canvg'
import messageHandler from './messageHandler'

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
      queries,
      backgroundSvg: null
    }
  },
  computed: {
    userColorTheme() {
      return this.$store.state[MODULE_PROFILE].model.profile
    }
  },
  watch: {
    userColorTheme: {
      immediate: true,
      deep: true,
      handler(newTheme) {
        document.documentElement.style.setProperty('--main-color', newTheme.color)
        document.documentElement.style.setProperty('--selection-color', newTheme.selectionColor)

        if (newTheme.background.includes('linear-gradient')) {
          document.documentElement.style.setProperty('--background-app', newTheme.background)
        } else {
          document.documentElement.style.setProperty('--background-app', '')
          this.backgroundSvg = newTheme.background
          this.$nextTick(() => this.setBackground())
        }
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
    messageHandler()
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
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      const vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty('--vw', `${vw}`)

      this.setBackground()
    },
    setBackground() {
      const { backgroundSvg } = this
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

      canvg.start()
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

<template>
  <v-app id="app">
    <media-query-provider :queries="queries">
      <router-view />
    </media-query-provider>
  </v-app>
</template>

<script>
import { MediaQueryProvider } from 'vue-component-media-queries'
import { MODULE_NAME as PROFILE_MODULE } from '@/store/modules/Profile'
import { Base64 } from 'js-base64'
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
      queries
    }
  },
  computed: {
    model() {
      return this.$store.state[PROFILE_MODULE].model
    },
    background() {
      const svgBase64 = Base64.encode(this.model.background)
      return `url("data:image/svg+xml;base64,${svgBase64}")`
    },
    color() {
      return this.model.color
    }
  },
  watch: {
    background: {
      immediate: true,
      handler(val) {
        document.documentElement.style.setProperty('--background-app', val)
      }
    },
    color: {
      immediate: true,
      handler(val) {
        document.documentElement.style.setProperty('--main-color', val)
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
</style>

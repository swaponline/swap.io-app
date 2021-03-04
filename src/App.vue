<template>
  <v-app id="app" :style="`--background-app: ${background}`">
    <media-query-provider :queries="queries">
      <router-view />
    </media-query-provider>
  </v-app>
</template>

<script>
import { MediaQueryProvider } from 'vue-component-media-queries'
import { MODULE_NAME as PROFILE_MODULE } from '@/store/modules/Profile'

const queries = {
  desktop: '(min-width: 1281px)',
  tablet: '(min-width: 481px) and (max-width: 1280px)',
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
    background() {
      return this.$store.state[PROFILE_MODULE].model.background
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
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
  filter: blur(0) !important;
  &::before {
    background: var(--background-app);
    position: absolute;
    left: -5%;
    top: -5%;
    content: '';
    height: 110%;
    width: 110%;
    filter: var(--blur-background-app);
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

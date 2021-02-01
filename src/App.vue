<template>
  <v-app id="app">
    <media-query-provider :queries="queries">
      <router-view />
    </media-query-provider>
  </v-app>
</template>

<script>
import { MediaQueryProvider } from 'vue-component-media-queries'

const queries = {
  desktop: '(min-width: 1281px)',
  tablet: '(min-width: 481px) and (max-width: 1280px)',
  phone: '(max-width: 480px)'
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
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  background: linear-gradient(287deg, #033dff 0%, #ff7ac6 24%, #ffff00 100%);
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

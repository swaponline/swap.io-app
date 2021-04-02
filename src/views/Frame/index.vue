<template>
  <div class="frame-page">
    <v-btn @click="openFrame">OpenFrame</v-btn>
    <v-btn @click="message">Message</v-btn>
    <iframe v-show="currentWindow" name="logic" class="frame-page__iframe" frameborder="0"></iframe>
  </div>
</template>

<script>
import windowsStorage from '@/windowsStorage'
import WindowHandler from '@/WindowHandler'

export default {
  name: 'FramePage',
  data() {
    return {
      currentWindow: null
    }
  },
  mounted() {
    window.addEventListener('message', event => {
      console.log(event.origin)
      if (event.origin !== 'http://keys.localhost') return
      console.log(event.data, windowsStorage)
    })
  },
  methods: {
    openFrame() {
      this.currentWindow = new WindowHandler('logic', '/choose-style')
    },
    async message() {
      await this.currentWindow.sendMessage({ key: 'hello', message: 'world' })
      console.log(123)
    }
  }
}
</script>

<style lang="scss">
.frame-page {
  height: 100%;

  &__iframe {
    width: 100%;
    height: calc(100% - 36px);
  }
}
</style>

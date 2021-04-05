<template>
  <div class="frame-page">
    <v-btn @click="openFrame">OpenFrame</v-btn>
    <v-btn @click="message">Message</v-btn>
    <iframe v-show="currentWindow" name="logic" class="frame-page__iframe" frameborder="0"></iframe>
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS } from '@/store/modules/Profile'

export default {
  name: 'FramePage',
  data() {
    return {
      currentWindow: null
    }
  },
  methods: {
    ...mapActions({
      actionSetUsersColors: SET_USERS_COLORS
    }),
    openFrame() {
      this.currentWindow = new WindowHandler('logic', '/choose-style', 'style', data => {
        this.actionSetUsersColors(data.selectGradient)
      })
    },
    async message() {
      await this.currentWindow.sendMessage({})
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

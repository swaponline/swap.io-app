<template>
  <div class="recover-profile">
    <iframe class="recover-profile__frame" name="recoverProfile" frameborder="0" />
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'
import { REDIRECT_TO_HOME, SET_BACKGROUND } from '@/constants/recoverProfile'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS } from '@/store/modules/Profile'
import { RECOVER_PROFILE } from '@/constants/windowKey'

export default {
  name: 'RecoverProfile',
  data() {
    return {
      frame: null
    }
  },
  mounted() {
    this.openFrame()
  },
  methods: {
    ...mapActions({
      actionSetBackground: SET_USERS_COLORS
    }),
    openFrame() {
      this.frame = new WindowHandler('recoverProfile', '/secret-phrase', RECOVER_PROFILE, event => {
        switch (event.data.type) {
          case REDIRECT_TO_HOME:
            this.$router.push({ name: 'Wallets' })
            break
          case SET_BACKGROUND:
            this.actionSetBackground({
              background: event.data.selectGradient.background,
              color: event.data.selectGradient.color
            })
            break
          default: {
            // ! implementation will appear in the future
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.recover-profile {
  width: 100%;
  height: 100%;
  margin: 20px auto;
  flex-grow: 1;
  border-radius: 12px;
  position: relative;

  &__frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

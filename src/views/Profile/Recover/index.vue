<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <iframe class="recover-profile" name="recoverProfile" frameborder="0" />
  </substrate>
</template>

<script>
import Substrate from '@/components/Profile/Substrate.vue'
import WindowHandler from '@/WindowHandler'
import { REDIRECT_TO_HOME, SET_BACKGROUND, INIT_IFRAME } from '@/constants/recoverProfile'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS, CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
import { RECOVER_PROFILE } from '@/constants/windowKey'
import VLoader from '@/components/Loaders/VLoader.vue'

export default {
  name: 'RecoverProfile',
  components: {
    Substrate,
    VLoader
  },
  data() {
    return {
      loading: false,
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
      this.loading = true
      this.frame = new WindowHandler('recoverProfile', '/secret-phrase', RECOVER_PROFILE, ({ message }) => {
        const { payload } = message
        switch (message.type) {
          case INIT_IFRAME:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
            this.loading = payload.loading
            break
          case REDIRECT_TO_HOME:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
            this.$router.push({ name: 'Wallets' })
            break
          case SET_BACKGROUND:
            this.actionSetBackground({
              background: payload.userColorTheme.background,
              color: payload.userColorTheme.color,
              selectionColor: payload.userColorTheme.selectionColor,
              isSelecting: payload.userColorTheme.isSelecting
            })
            break
          default: {
            // ! implementation will appear in the future
            this.loading = false
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
  min-width: 1065px;
  height: 100%;
  overflow: hidden;

  @include tablet {
    min-width: auto;
  }
}
</style>

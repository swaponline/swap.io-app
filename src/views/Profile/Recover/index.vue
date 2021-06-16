<template>
  <div class="recover-profile">
    <substrate v-if="loading">
      <v-loader :active="loading"></v-loader>
    </substrate>
    <iframe class="recover-profile__frame" name="recoverProfile" frameborder="0" />
  </div>
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
              background: payload.selectGradient.background,
              color: payload.selectGradient.color
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

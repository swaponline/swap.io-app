<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <iframe class="create-profile" name="createProfile" frameborder="0" />
  </substrate>
</template>

<script>
import Substrate from '@/components/Profile/Substrate.vue'
import VLoader from '@/components/Loaders/VLoader.vue'
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS, CREATING_OR_RECOVERING_PROFILE, USERS_THEMES_KEY } from '@/store/modules/Profile'
import { INIT_IFRAME, SET_BACKGROUND, REDIRECT_TO_HOME } from '@/constants/createProfile'
import { CREATE_PROFILE } from '@/constants/windowKey'
import { getStorage } from '@/utils/storage'

export default {
  name: 'CreateProfile',
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
      this.frame = new WindowHandler('createProfile', '/choose-style', CREATE_PROFILE, ({ message }) => {
        const { payload } = message
        switch (message.type) {
          case INIT_IFRAME:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
            this.loading = payload.loading
            break
          case SET_BACKGROUND:
            this.actionSetBackground({
              background: payload.userColorTheme.background,
              color: payload.userColorTheme.color,
              selectionColor: payload.userColorTheme.selectionColor,
              isSelecting: payload.userColorTheme.isSelecting
            })
            break
          case REDIRECT_TO_HOME:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
            this.actionSetBackground([...getStorage(USERS_THEMES_KEY)])
            this.$router.push({ name: 'Wallets' })
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
.create-profile {
  width: 100%;
  min-width: 1065px;
  height: 100%;
  overflow: hidden;

  @include tablet {
    min-width: auto;
  }
}
</style>

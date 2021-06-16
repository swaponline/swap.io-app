<template>
  <div class="create-profile">
    <substrate v-if="loading">
      <v-loader :active="loading"></v-loader>
    </substrate>
    <iframe class="create-profile__frame" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import Substrate from '@/views/Profile/Substrate.vue'
import VLoader from '@/components/Loaders/VLoader.vue'
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS, CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
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
              colorSelection: payload.userColorTheme.colorSelection,
              isSelecting: payload.userColorTheme.isSelecting
            })
            break
          case REDIRECT_TO_HOME:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
            this.actionSetBackground({ ...getStorage('colorTheme') })
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
  height: 100%;
  margin: 20px auto;
  flex-grow: 1;
  border-radius: 12px;
  position: relative;

  &__stub {
    min-height: 555px;
  }

  &__frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

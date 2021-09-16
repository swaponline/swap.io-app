<template>
  <div>
    <v-loader :active="loading"></v-loader>
    <iframe class="create-profile" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'
import WindowHandler from '@/WindowHandler'
import { SET_TEMPORARY_PROFILE, CREATING_OR_RECOVERING_PROFILE, CREATE_PROFILE } from '@/store/modules/Profile'
import { IFRAME_INITED, THEME_SELECTED, PROFILE_CREATED, CANCELED } from '@/constants/createProfile'
import { CREATE_PROFILE_WINDOW } from '@/constants/windowKey'

export default {
  name: 'CreateProfile',
  components: {
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
    openFrame() {
      this.loading = true
      this.frame = new WindowHandler('createProfile', '/choose-style', CREATE_PROFILE_WINDOW, ({ message }) => {
        const { payload } = message
        switch (message.type) {
          case IFRAME_INITED:
            this.loading = false
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
            break
          case THEME_SELECTED:
            this.$store.dispatch(SET_TEMPORARY_PROFILE, payload.theme)
            break
          case PROFILE_CREATED:
            this.$store.dispatch(CREATE_PROFILE, payload.profile)
            this.$router.push({ name: 'Wallets' })
            break
          case CANCELED:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
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

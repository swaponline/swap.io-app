<template>
  <div>
    <v-loader :active="loading"></v-loader>
    <iframe class="recover-profile" name="recoverProfile" frameborder="0" />
  </div>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'
import WindowHandler from '@/WindowHandler'
import { IFRAME_INITED, PROFILE_RECOVERED, CANCELED } from '@/constants/createProfile'
import { CREATING_OR_RECOVERING_PROFILE, CREATE_PROFILE } from '@/store/modules/Profile'

import { RECOVER_PROFILE_WINDOW } from '@/constants/windowKey'

export default {
  name: 'RecoverProfile',
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
      this.frame = new WindowHandler('recoverProfile', '/secret-phrase', RECOVER_PROFILE_WINDOW, ({ message }) => {
        const { payload } = message
        switch (message.type) {
          case IFRAME_INITED:
            this.loading = false
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
            break
          case CANCELED:
            this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
            this.$router.push({ name: 'Wallets' })
            break
          case PROFILE_RECOVERED:
            this.$store.dispatch(CREATE_PROFILE, payload.profile)
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
.recover-profile {
  width: 100%;
  min-width: 1065px;
  height: 100%;

  @include tablet {
    min-width: auto;
  }
}
</style>

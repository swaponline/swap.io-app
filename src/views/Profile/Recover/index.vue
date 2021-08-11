<template>
  <div>
    <v-loader :active="loading"></v-loader>
    <iframe class="recover-profile" name="recoverProfile" frameborder="0" />
  </div>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'

import { CREATING_OR_RECOVERING_PROFILE, CREATE_PROFILE } from '@/store/modules/Profile'

import SwapKeysApi from '@/keys-api'

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

      this.frame = SwapKeysApi.restoreProfile({
        callback: message => {
          const { payload } = message
          switch (message.type) {
            case SwapKeysApi.restoreProfileAnswers.IFRAME_INITED:
              this.loading = false
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
              break
            case SwapKeysApi.restoreProfileAnswers.RECOVER_CANCELED:
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
              this.$router.push({ name: 'Wallets' })
              break
            case SwapKeysApi.restoreProfileAnswers.PROFILE_RECOVERED:
              this.$store.dispatch(CREATE_PROFILE, payload.profile)
              this.$router.push({ name: 'Wallets' })
              break
            default: {
              // ! implementation will appear in the future
              this.loading = false
            }
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

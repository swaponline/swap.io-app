<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <iframe class="create-profile" name="createProfile" />
  </substrate>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'
import Substrate from '@/components/Profile/Substrate.vue'
import { SET_TEMPORARY_PROFILE, CREATING_OR_RECOVERING_PROFILE, CREATE_PROFILE } from '@/store/modules/Profile'

import SwapKeysApi from '@/keys-api'

import { SET_APP_THEME } from '@/constants/createProfile'
import { getStorage } from '@/utils/storage'
import { THEME_KEY } from '@/constants/theme'

export default {
  name: 'CreateProfile',
  components: {
    VLoader,
    Substrate
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
      this.frame = SwapKeysApi.createProfile({
        callback: message => {
          const { payload, type } = message
          switch (type) {
            case SwapKeysApi.createProfileAnswers.IFRAME_INITED:
              this.frame.sendMessage({
                message: {
                  type: SET_APP_THEME,
                  payload: {
                    theme: getStorage(THEME_KEY)
                  }
                }
              })
              this.loading = false
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
              break
            case SwapKeysApi.createProfileAnswers.THEME_SELECTED:
              this.$store.dispatch(SET_TEMPORARY_PROFILE, payload.theme)
              break
            case SwapKeysApi.createProfileAnswers.PROFILE_CREATED:
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
.create-profile {
  width: 100%;
  min-width: 1065px;
  height: 100%;
  overflow: hidden;
  border: 0;

  @include tablet {
    min-width: auto;
  }
}
</style>

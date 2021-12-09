<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <swap-iframe :name="$options.IFRAME_NAME" />
  </substrate>
</template>

<script>
import Substrate from '@/components/Profile/Substrate.vue'
import VLoader from '@/components/Loaders/VLoader.vue'
import SwapIframe from '@/components/UI/SwapIframe'
import { SET_DEFAULT_STATE_IFRAME } from '@/constants/createProfile'
import { themeService } from '@/services/theme'
import SwapKeysApi from '@/keys-api'
import { profilesService } from '@/services/profiles'

const IFRAME_NAME = 'recoverProfile'

export default {
  IFRAME_NAME,
  name: 'RecoverProfile',
  components: {
    Substrate,
    VLoader,
    SwapIframe
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
      profilesService.setCreatingOrRecovering(true)

      this.frame = SwapKeysApi.restoreProfile({
        callback: ({ message }) => {
          const {
            IFRAME_LOADED,
            IFRAME_RENDERED,
            RECOVER_CANCELED,
            PROFILE_RECOVERED
          } = SwapKeysApi.restoreProfileAnswers
          const { payload } = message
          switch (message.type) {
            case IFRAME_LOADED:
              this.frame.sendMessage({
                message: {
                  type: SET_DEFAULT_STATE_IFRAME,
                  payload: {
                    theme: themeService.getCurrentTheme()
                  }
                }
              })

              break
            case IFRAME_RENDERED:
              this.loading = false
              break
            case RECOVER_CANCELED:
              profilesService.setCreatingOrRecovering(false)
              this.$router.push({ name: 'Wallets' })
              break
            case PROFILE_RECOVERED: {
              const { id } = profilesService.addProfile(payload.profile)
              profilesService.setCurrentProfile(id)
              profilesService.setCreatingOrRecovering(false)
              this.$router.push({ name: 'Wallets' })
              break
            }
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

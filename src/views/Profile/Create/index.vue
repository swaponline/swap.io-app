<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <swap-iframe :name="$options.IFRAME_NAME" />
  </substrate>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'
import Substrate from '@/components/Profile/Substrate.vue'
import SwapIframe from '@/components/UI/SwapIframe'
import { SET_APP_THEME } from '@/constants/createProfile'
import { getStorage } from '@/utils/storage'
import { THEME_KEY } from '@/constants/theme'
import SwapKeysApi from '@/keys-api'
import { profileService } from '@/services/profile'

const IFRAME_NAME = 'createProfile'

export default {
  IFRAME_NAME,
  name: 'CreateProfile',
  components: {
    VLoader,
    Substrate,
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
      profileService.setCreatingOrRecovering(true)

      this.frame = SwapKeysApi.createProfile({
        callback: ({ message }) => {
          const {
            IFRAME_INITED,
            THEME_SELECTED,
            PROFILE_CREATED,
            CREATION_CANCELLED
          } = SwapKeysApi.createProfileAnswers
          const { payload, type } = message

          switch (type) {
            case IFRAME_INITED:
              this.frame.sendMessage({
                message: {
                  type: SET_APP_THEME,
                  payload: {
                    theme: getStorage(THEME_KEY)
                  }
                }
              })
              this.loading = false
              break
            case THEME_SELECTED:
              profileService.setTemporaryProfileColorScheme(payload.colorScheme)
              break
            case PROFILE_CREATED:
              profileService.setProfile(payload.profile)
              profileService.setCreatingOrRecovering(false)
              this.$router.push({ name: 'Wallets' })
              break
            case CREATION_CANCELLED:
              profileService.setCreatingOrRecovering(false)
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

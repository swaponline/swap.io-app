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
import { themeService } from '@/services/theme'
import SwapKeysApi from '@/keys-api'
import { profilesService } from '@/services/profiles'

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
      profilesService.setCreatingOrRecovering(true)

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
                    theme: themeService.getAppTheme()
                  }
                }
              })
              this.loading = false
              break
            case THEME_SELECTED:
              profilesService.setTemporaryProfileColorScheme(payload.colorScheme)
              break
            case PROFILE_CREATED: {
              const { id } = profilesService.addProfile(payload.profile)
              profilesService.setCurrentProfile(id)
              profilesService.setCreatingOrRecovering(false)
              this.$router.push({ name: 'Wallets' })
              break
            }
            case CREATION_CANCELLED:
              profilesService.setCreatingOrRecovering(false)
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

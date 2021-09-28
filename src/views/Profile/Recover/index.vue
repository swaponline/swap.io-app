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
import { SET_APP_THEME } from '@/constants/createProfile'
import { CREATE_PROFILE, CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
import { THEME_KEY } from '@/constants/theme'
import { getStorage } from '@/utils/storage'
import SwapKeysApi from '@/keys-api'

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

      this.frame = SwapKeysApi.restoreProfile({
        callback: ({ message }) => {
          const { IFRAME_INITED, RECOVER_CANCELED, PROFILE_RECOVERED } = SwapKeysApi.restoreProfileAnswers
          const { payload } = message
          switch (message.type) {
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
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
              break
            case RECOVER_CANCELED:
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
        }
      })
    }
  }
}
</script>

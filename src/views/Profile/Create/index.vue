<template>
  <substrate>
    <v-loader :active="loading"></v-loader>
    <swap-iframe :name="$options.IFRAME_NAME" />
  </substrate>
</template>

<script>
import VLoader from '@/components/Loaders/VLoader.vue'
import Substrate from '@/components/Profile/Substrate.vue'
import { CREATE_PROFILE, CREATING_OR_RECOVERING_PROFILE, SET_TEMPORARY_PROFILE } from '@/store/modules/Profile'
import SwapIframe from '@/components/UI/SwapIframe'
import { SET_APP_THEME } from '@/constants/createProfile'
import { getStorage } from '@/utils/storage'
import { THEME_KEY } from '@/constants/theme'
import SwapKeysApi from '@/keys-api'

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
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
              break
            case THEME_SELECTED:
              this.$store.dispatch(SET_TEMPORARY_PROFILE, payload.theme)
              break
            case PROFILE_CREATED:
              this.$store.dispatch(CREATE_PROFILE, payload.profile)
              this.$router.push({ name: 'Wallets' })
              break
            case CREATION_CANCELLED:
              this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
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

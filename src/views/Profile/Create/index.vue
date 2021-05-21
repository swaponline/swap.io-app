<template>
  <div class="create-profile">
    <iframe class="create-profile__frame" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS } from '@/store/modules/Profile'
import { LOADING, SET_BACKGROUND, REDIRECT_TO_HOME } from '@/constants/createProfile'
import { CREATE_PROFILE } from '@/constants/windowKey'

export default {
  name: 'CreateProfile',
  data() {
    return {
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
      this.frame = new WindowHandler('createProfile', '/choose-style', CREATE_PROFILE, event => {
        switch (event.data.type) {
          case LOADING:
            // ! implementation will appear in the future
            break
          case SET_BACKGROUND:
            this.actionSetBackground({
              background: event.data.selectGradient.background,
              color: event.data.selectGradient.color
            })
            break
          case REDIRECT_TO_HOME:
            this.$router.push({ name: 'Wallets' })
            break
          default: {
            // ! implementation will appear in the future
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

  &__frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="create-profile">
    <iframe class="create-profile__frame" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS } from '@/store/modules/Profile'

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
      this.frame = new WindowHandler('createProfile', '/choose-style', 'CreateProfile', event => {
        this.actionSetBackground({
          background: event.selectGradient.background,
          color: event.selectGradient.color
        })
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

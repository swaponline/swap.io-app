<template>
  <div class="create-profile">
    <iframe class="create-profile__frame" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'
import { mapActions } from 'vuex'
import { SET_USERS_COLORS } from '@/store/modules/Profile'
import { getStorage, setStorage } from '@/utils/storage'

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
    async openFrame() {
      const { newProfile } = await new Promise(resolve => {
        this.frame = new WindowHandler('createProfile', '/choose-style', 'CreateProfile', e => {
          resolve(e)
        })
      })
      this.actionSetBackground({
        background: newProfile.background,
        color: newProfile.color
      })
      console.log(newProfile)
      const profiles = JSON.parse(getStorage('profiles')) || {}
      profiles[newProfile.publicKey.slice(0, 10)] = newProfile
      setStorage('profiles', JSON.stringify(profiles))
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

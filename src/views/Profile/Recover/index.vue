<template>
  <div class="create-profile">
    <iframe class="create-profile__frame" name="createProfile" frameborder="0" />
  </div>
</template>

<script>
import WindowHandler from '@/WindowHandler'

export default {
  name: 'RecoverProfile',
  data() {
    return {
      frame: null
    }
  },
  mounted() {
    this.openFrame()
  },
  methods: {
    openFrame() {
      this.frame = new WindowHandler('createProfile', '/secret-phrase', 'CreateProfile')
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

<template>
  <substrate class="create-or-recover ">
    <div class="create-or-recover__wrapper">
      <div class="create-or-recover__header">
        <svg-icon class="create-or-recover__icon" name="profile" />
      </div>
      <div class="create-or-recover__text">
        Create profile
      </div>
      <div class="create-or-recover__subtext">
        or recover from mneminic phrase
      </div>
      <div class="create-or-recover__buttons">
        <v-btn depressed class="create-or-recover__button" block @click="create">Create</v-btn>
        <v-btn text class="create-or-recover__button create-or-recover__button--text" block @click="goToRecover"
          >Recover profile</v-btn
        >
      </div>
    </div>
  </substrate>
</template>

<script>
import Substrate from '@/views/Profile/Substrate.vue'

export default {
  name: 'CreateOrRecover',
  components: {
    Substrate
  },
  methods: {
    create() {
      return this.$router.push({ name: 'SecurityInfo' })
    },
    goToRecover() {
      return this.$router.push({ name: 'RecoverProfile' })
    }
  }
}
</script>

<style lang="scss">
.create-or-recover {
  &__wrapper {
    max-width: 256px;
    text-align: center;
  }

  &__icon {
    width: 121px;
    height: 121px;
    margin-bottom: 35px;
  }

  &__text {
    font-size: $--font-size-extra-title;
    color: $--black;
  }

  &__subtext {
    color: $--grey-3;
    font-size: 15px;
    margin-bottom: 45px;
  }

  &__button {
    min-height: 48px;
    margin-bottom: 15px;
    text-transform: none;
    font-weight: $--font-weight-semi-bold;
    color: $--black;
    font-size: $--font-size-button;
    border-radius: $--main-border-radius;

    &--text {
      color: $--dark-grey;
    }
  }
}
</style>

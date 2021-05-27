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
import { CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'

export default {
  name: 'CreateOrRecover',
  components: {
    Substrate
  },
  created() {
    this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, true)
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
    font-weight: $--font-weight-semi-bold;
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
    border-radius: $--main-border-radius;

    .v-btn__content {
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-button;
      text-transform: none;
      color: $--black;
    }

    &--text {
      .v-btn__content {
        color: $--dark-grey;
      }
    }
  }
}
</style>

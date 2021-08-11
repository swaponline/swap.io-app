<template>
  <match-media v-slot="{ desktop }" wrapper-tag="div">
    <div class="create-or-recover">
      <swap-button-go-back v-if="!desktop" class="create-or-recover__button-i-back" @click="cancel" />
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
          <div class="create-or-recover__buttons-controls">
            <v-btn v-if="desktop" depressed class="create-or-recover__button" block @click="cancel">Cancel</v-btn>
            <v-btn depressed class="create-or-recover__button" block @click="create">Create</v-btn>
          </div>
          <v-btn text class="create-or-recover__button create-or-recover__button--text" block @click="goToRecover"
            >Recover profile</v-btn
          >
        </div>
      </div>
    </div>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'

export default {
  name: 'CreateOrRecover',
  components: {
    MatchMedia
  },
  methods: {
    cancel() {
      return this.$router.push({ name: 'Wallets' })
    },
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
  &__button-i-back {
    position: absolute;
    left: 37px;
    top: 21px;
  }

  &__wrapper {
    max-width: 256px;
    text-align: center;
  }

  &__header {
    padding-top: 55px;

    @include tablet {
      padding-top: 140px;
    }

    @include phone {
      padding-top: 67px;
    }
  }

  &__icon {
    width: 121px;
    height: 121px;
    margin-bottom: 35px;
  }

  &__text {
    font-size: $--font-size-extra-title;
    font-weight: $--font-weight-semi-bold;
    color: var(--primary-text);
  }

  &__subtext {
    color: $--grey-3;
    font-size: 15px;
    margin-bottom: 45px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-controls {
      display: flex;

      @include phone {
        flex-direction: column;
      }
    }

    @include tablet {
      margin: auto auto 0;
      max-width: 400px;
    }

    @include phone {
      margin-top: 30px;
    }
  }

  &__button {
    margin: 0 5px;
    min-width: 174px !important;
    min-height: 48px;
    margin-bottom: 15px;
    border-radius: $--main-border-radius;

    .v-btn__content {
      font-weight: $--font-weight-semi-bold;
      font-size: $--font-size-button;
      text-transform: none;
      color: var(--primary-text);
    }

    &--text {
      .v-btn__content {
        color: $--dark-grey;
      }
    }
  }
}
</style>

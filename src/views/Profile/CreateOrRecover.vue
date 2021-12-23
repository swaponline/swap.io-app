<template>
  <match-media v-slot="{ desktop }" wrapper-tag="div">
    <substrate :hide-close-button="!$options.hasProfile" class="create-or-recover">
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
          <div class="create-or-recover__buttons-row">
            <swap-button
              v-if="desktop"
              :disabled="!$options.hasProfile"
              block
              class="create-or-recover__button"
              @click="cancel"
              >Cancel
            </swap-button>
            <swap-button block class="create-or-recover__button" @click="create">Create</swap-button>
          </div>
          <swap-button block class="create-or-recover__button create-or-recover__button--text" text @click="goToRecover"
            >Recover profile
          </swap-button>
        </div>
      </div>
    </substrate>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import Substrate from '@/components/Profile/Substrate.vue'
import { profilesService } from '@/services/profiles'

const hasProfile = profilesService.hasProfile()

export default {
  hasProfile,
  name: 'CreateOrRecover',
  components: {
    MatchMedia,
    Substrate
  },
  created() {
    if (!hasProfile) {
      profilesService.setCreatingOrRecovering(true)
    }
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
    color: get-theme-for($text, 'primary');
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

    &-row {
      display: flex;

      @include tablet {
        width: 100%;
      }

      @include phone {
        flex-direction: column;
      }
    }

    @include tablet {
      margin: auto auto 0;
      width: 228px;
    }

    @include phone {
      margin-top: 30px;
    }
  }

  &__button {
    margin: 0 5px 15px;
    min-width: 174px !important;
    min-height: 48px;
    border-radius: $--main-border-radius;

    @include tablet {
      margin: 0 0 15px;
      width: 100%;
    }

    &--text {
      background-color: transparent !important;

      .v-btn__content {
        color: $--dark-grey;
      }
    }
  }
}
</style>

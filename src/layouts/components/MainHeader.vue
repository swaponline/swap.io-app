<template>
  <match-media v-slot="{ desktop, phone }" wrapper-tag="div" class="main-header">
    <div v-if="isCreatingOrRecoveringProfile" class="main-header__logo">
      <swap-logo />
    </div>
    <router-link v-else :to="{ name: 'Wallet' }" class="main-header__logo">
      <swap-logo />
    </router-link>
    <v-button-cancel v-if="isCreatingOrRecoveringProfile && phone" class="main-header__button-cancel" @click="cancel" />
    <div v-if="desktop" class="main-header__content">
      <main-header-tabs class="main-header__tabs" />
      <div class="main-header__notifications">
        <v-menu offset-y left :disabled="isCreatingOrRecoveringProfile" content-class="main-header__notifications-menu">
          <template v-slot:activator="{ on, attrs }">
            <div class="main-header__notifications-wrapper" v-bind="attrs" v-on="on">
              <v-badge :content="notifications.length" :value="notificationCount" color="red" overlap>
                <svg-icon
                  :class="[
                    'main-header__notifications-icon',
                    isCreatingOrRecoveringProfile && 'main-header__notifications-icon--disabled'
                  ]"
                  name="bell"
                />
              </v-badge>
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in notifications" :key="index">
              <v-list-item-title class="main-header__notification">
                <div class="main-header__notification-icon">
                  <v-icon size="18">mdi-arrow-bottom-left</v-icon>
                </div>
                <div class="main-header__notification-text">
                  <span class="main-header__notification-title">
                    {{ item.type === $options.INCOMING_TRANSACTION ? 'Incoming transaction' : 'Incoming invoice' }}
                  </span>
                  <span class="main-header__notification-value main-header__notification-value--green">
                    {{ item.currency }}{{ item.type === $options.INCOMING_TRANSACTION ? ' + ' : '' }}{{ item.value }}
                  </span>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-if="hasProfile" class="main-header__profile">
        <profile-list :disabled="isCreatingOrRecoveringProfile" />
      </div>
    </div>
    <swap-button
      v-if="!desktop && showBurgerButton"
      class="main-header__burger-button"
      icon
      large
      @click="openWalletList"
    >
      <svg-icon class="main-header__burger-icon" name="icon-burger"></svg-icon
    ></swap-button>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import ProfileList from '@/components/Wallets/ProfileList.vue'
import { MODULE_PROFILE, IS_CREATING_OR_RECOVERING, CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
import VButtonCancel from '@/components/Profile/VButtonCancel.vue'
import SwapLogo from '@/components/UI/SwapLogo.vue'
import MainHeaderTabs from './Tabs.vue'

const INCOMING_TRANSACTION = 'incoming-transaction'
const INCOMING_INVOICE = 'incoming-invoice'

export default {
  name: 'MainHeader',
  INCOMING_TRANSACTION,
  INCOMING_INVOICE,
  components: { ProfileList, MainHeaderTabs, MatchMedia, VButtonCancel, SwapLogo },
  computed: {
    isCreatingOrRecoveringProfile() {
      return this.$store.state[MODULE_PROFILE][IS_CREATING_OR_RECOVERING]
    },
    hasProfile() {
      return this.$store.getters.hasProfile
    },
    notifications() {
      const list = [
        { type: INCOMING_TRANSACTION, currency: 'BTC', value: '0.123' },
        { type: INCOMING_INVOICE, currency: 'BTC', value: '0.123' },
        { type: INCOMING_TRANSACTION, currency: 'BTC', value: '0.123' },
        { type: INCOMING_TRANSACTION, currency: 'BTC', value: '0.123' },
        { type: INCOMING_INVOICE, currency: 'BTC', value: '0.123' },
        { type: INCOMING_TRANSACTION, currency: 'BTC', value: '0.123' }
      ]
      return list
    },
    notificationCount() {
      return !this.isCreatingOrRecoveringProfile ? this.notifications.length : null
    },
    showBurgerButton() {
      return !!this.$route.params.walletAddress
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
      return this.$router.push({ name: 'Wallets' })
    },

    sliderColor() {
      return this.isCreatingOrRecoveringProfile ? 'transparent' : 'var(--main-color)'
    },
    openWalletList() {
      return this.$router.push({ name: 'Wallets' })
    }
  }
}
</script>

<style lang="scss">
.main-header {
  width: 100%;
  min-height: $--header-height;
  display: flex;
  background-color: var(--primary-background);
  box-shadow: 0 0 20px rgba(17, 17, 17, 0.02);
  border-radius: 0 0 12px 12px;
  justify-content: space-between;
  align-items: center;
  transition: $--theme-transition;

  @include tablet {
    min-height: 80px;
    border-radius: 0;
  }

  @include small-phone {
    min-height: 50px;
  }

  &__logo {
    text-decoration: none;
    min-width: 305px;
    margin-right: 20px;
    margin-left: 28px;

    @include phone {
      margin-right: 0;
      min-width: 290px;
      margin-left: 22px;
      min-width: auto;
    }
  }

  &__button-cancel {
    position: relative;
    margin-right: 10px;
  }

  &__content {
    display: flex;
    flex-grow: 1;
  }

  &__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: $--font-size-medium;
    font-weight: $--font-weight-semi-bold;
    line-height: 25px;
    z-index: 100;
  }

  &__avatar {
    height: 45px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 20px;
  }

  &__tabs {
    @include only-desktop {
      border-radius: 0 0 12px 0;
    }

    @include tablet {
      display: none;
    }
  }

  &__notifications {
    flex: 0 0 60px;
    border: 1px solid var(--main-border-color);
    border-top: none;
    border-bottom: none;
    cursor: pointer;
    transition: all $--transition-duration;

    &:hover {
      background-color: var(--main-input-background);
    }

    &-icon {
      color: var(--primary-text);
      width: 19px;
      height: 19px;

      &--disabled {
        color: $--dark-grey;
      }
    }
  }

  &__notifications-wrapper {
    height: $--header-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__notifications-menu {
    width: 280px;
    border-radius: $--main-border-radius;

    .v-list {
      background-color: var(--primary-background);
    }

    .v-list-item {
      cursor: pointer;
      transition: all $--transition-duration;

      &:hover {
        background-color: var(--main-input-background);
      }
    }
  }

  &__notification {
    display: flex;
    align-items: center;
  }

  &__notification-icon {
    flex: 0 0 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--field-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }

  &__notification-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__notification-title {
    line-height: 19px;
    font-size: $--font-size-base;
  }

  &__notification-value {
    font-size: $--font-size-small;

    &--green {
      color: $--green;
    }
  }

  &__burger-button {
    margin-right: 40px;

    @include phone {
      margin-right: 10px;
    }
  }

  &__burger-icon {
    width: 31px;
    height: 31px;
  }
}
</style>

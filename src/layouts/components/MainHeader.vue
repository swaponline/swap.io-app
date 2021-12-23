<template>
  <match-media v-slot="{ desktop, phone }" class="main-header" wrapper-tag="header">
    <div v-if="disabled" class="main-header__logo">
      <swap-logo />
    </div>
    <router-link v-else :to="{ name: 'Wallets' }" class="main-header__logo">
      <swap-logo />
    </router-link>
    <v-button-cancel v-if="disabled && phone" class="main-header__button-cancel" @click="cancel" />
    <div v-if="desktop" class="main-header__content">
      <main-header-tabs :disabled="disabled" class="main-header__tabs" />
      <div v-if="hasProfile" class="main-header__notifications">
        <v-menu :disabled="disabled" content-class="main-header__notifications-menu" left offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="main-header__notifications-wrapper" v-bind="attrs" v-on="on">
              <v-badge :content="notifications.length" :value="notificationCount" color="red" overlap>
                <svg-icon
                  :class="['main-header__notifications-icon', disabled && 'main-header__notifications-icon--disabled']"
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
        <profile-list v-bind="{ disabled }" />
      </div>
    </div>
    <swap-button
      v-if="!desktop && showBurgerButton"
      class="main-header__burger-button"
      icon
      large
      @click="openWalletList"
    >
      <svg-icon class="main-header__burger-icon" name="icon-burger"></svg-icon>
    </swap-button>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import ProfileList from '@/components/Wallets/ProfileList.vue'
import VButtonCancel from '@/components/Profile/VButtonCancel.vue'
import SwapLogo from '@/components/UI/SwapLogo.vue'
import { events, profilesService } from '@/services/profiles'
import MainHeaderTabs from './Tabs.vue'

const INCOMING_TRANSACTION = 'incoming-transaction'
const INCOMING_INVOICE = 'incoming-invoice'

export default {
  name: 'MainHeader',
  INCOMING_TRANSACTION,
  INCOMING_INVOICE,
  components: { ProfileList, MainHeaderTabs, MatchMedia, VButtonCancel, SwapLogo },
  data() {
    return {
      hasProfile: profilesService.hasProfile(),
      disabled: profilesService.getIsCreatingOrRecovering(),
      subscriptions: []
    }
  },
  computed: {
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
      return !this.disabled ? this.notifications.length : null
    },
    showBurgerButton() {
      return !!this.$route.params.address
    }
  },
  created() {
    this.subscriptions.push(
      profilesService.subscribe(events.UPDATE_IS_CREATING_OR_RECOVERING, value => {
        this.disabled = value
      })
    )
  },
  beforeDestroy() {
    this.subscriptions.forEach(callback => callback.unsubscribe())
  },
  methods: {
    cancel() {
      profilesService.setCreatingOrRecovering(false)
      return this.$router.push({ name: 'Wallets' })
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
  background-color: get-theme-for($background, 'primary');
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
    margin-right: 20px;
    margin-left: 28px;

    @include tablet {
      margin-left: 40px;
    }

    @include phone {
      margin-right: 0;
      min-width: inherit;
      margin-left: 12px;
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
    border: 1px solid get-theme-for($border-color, 'primary');
    border-top: none;
    border-bottom: none;
    cursor: pointer;
    transition: all $--transition-duration;

    &:hover {
      background-color: get-theme-for($background, 'secondary');
    }

    &-icon {
      color: get-theme-for($text, 'primary');
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
      background-color: get-theme-for($background, 'primary');
    }

    .v-list-item {
      cursor: pointer;
      transition: all $--transition-duration;

      &:hover {
        background-color: get-theme-for($background, 'secondary');
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
    background-color: get-theme-for($button, 'primary', 'enabled');
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

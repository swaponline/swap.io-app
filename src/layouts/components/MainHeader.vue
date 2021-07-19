<template>
  <match-media v-slot="{ desktop, phone }" tag="div" class="main-header">
    <div v-if="isCreatingOrRecoveringProfile" class="main-header__logo">
      <swap-logo />
    </div>
    <router-link v-else :to="{ name: 'Wallet' }" class="main-header__logo">
      <swap-logo />
    </router-link>
    <v-button-cancel v-if="isCreatingOrRecoveringProfile && phone" class="main-header__button-cancel" @click="cancel" />
    <div v-if="desktop" class="main-header__content">
      <main-header-tabs class="main-header__tabs" />
      <div v-if="!isCreatingOrRecoveringProfile && hasProfile" class="main-header__profile">
        <profile-list />
      </div>
    </div>
  </match-media>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import ProfileList from '@/components/Wallets/ProfileList.vue'
import { MODULE_PROFILE, IS_CREATING_OR_RECOVERING, CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
import VButtonCancel from '@/components/Profile/VButtonCancel.vue'
import SwapLogo from '@/components/UI/SwapLogo.vue'
import MainHeaderTabs from './Tabs.vue'

export default {
  name: 'MainHeader',
  components: { ProfileList, MainHeaderTabs, MatchMedia, VButtonCancel, SwapLogo },
  computed: {
    isCreatingOrRecoveringProfile() {
      return this.$store.state[MODULE_PROFILE][IS_CREATING_OR_RECOVERING]
    },
    hasProfile() {
      return this.$store.getters.hasProfile
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
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
  background: $--white;
  box-shadow: 0 0 20px rgba(17, 17, 17, 0.02);
  border-radius: 0 0 12px 12px;
  justify-content: space-between;
  align-items: center;

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
    font-size: $--font-size-extra-small-subtitle;
    line-height: 25px;
    z-index: 150;
  }

  &__avatar {
    height: 45px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: white;
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
}
</style>

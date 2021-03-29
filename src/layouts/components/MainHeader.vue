<template>
  <div class="main-header">
    <router-link :to="{ name: 'Wallet' }" class="main-header__logo">
      <svg-icon class="main-header__logo-icon" name="logo" />
      <h2 class="main-header__logo-text">Swap</h2>
    </router-link>
    <match-media v-slot="{ desktop }" class="d-flex flex-grow-1">
      <main-header-tabs v-if="desktop" class="main-header__tabs"></main-header-tabs>
      <div v-if="desktop" class="main-header__profile">
        <profile-list></profile-list>
      </div>
    </match-media>
  </div>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import ProfileList from '@/components/Wallets/ProfileList.vue'
import MainHeaderTabs from './Tabs.vue'

export default {
  name: 'MainHeader',
  components: {
    ProfileList,
    MainHeaderTabs,
    MatchMedia
  },
  computed: {
    currentAccount() {
      return this.$store.getters.currentAccount
    },
    currentAccountName() {
      return this.currentAccount.name
    }
  },
  methods: {
    getSrcAvatar(name) {
      return `https://identicon-api.herokuapp.com/${name}/135?format=png`
    }
  }
}
</script>

<style lang="scss">
.main-header {
  width: 100%;
  min-height: 85px;
  display: flex;
  background: $--white;
  box-shadow: 0px 0px 20px rgba(17, 17, 17, 0.02);
  border-radius: 0px 0px 12px 12px;
  justify-content: space-between;

  @include tablet {
    min-height: 80px;
    border-radius: 0px;
  }
  @include small {
    min-height: 50px;
  }
  &__logo {
    text-decoration: none;
    min-width: 305px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    @include tablet {
      min-width: 0;
      flex-grow: 1;
    }
  }
  &__logo-icon {
    width: 48px;
    height: 45px;
    margin-right: 20px;
    margin-left: 30px;
    fill: var(--main-color);
    @include tablet {
      width: 45px;
      height: 42px;
    }
    @include small {
      margin-right: 15px;
      margin-left: 15px;
      width: 30px;
      height: 30px;
    }
  }
  &__logo-text {
    color: var(--main-color);
  }
  &__profile {
    min-width: 175px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    font-size: $--font-size-extra-small-subtitle;
    line-height: 25px;
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
    @include tablet {
      display: none;
    }
  }
}
</style>

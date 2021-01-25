<template>
  <div class="main-header">
    <div class="main-header__logo">Logo</div>
    <main-header-tabs class="main-header__tabs"></main-header-tabs>
    <div class="main-header__profile">
      <button class="main-header__profile">
        <div class="main-header__avatar">
          <img height="50" width="50" :src="getSrcAvatar(currentAccountName)" alt="avatar" />
        </div>
        {{ currentAccountName }}
      </button>
    </div>
  </div>
</template>

<script>
import MainHeaderTabs from './Tabs.vue'

export default {
  name: 'MainHeader',
  components: {
    MainHeaderTabs
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
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(17, 17, 17, 0.02);
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
  justify-content: space-between;
  @include tablet {
    min-height: 80px;
  }
  &__logo {
    min-width: 305px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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

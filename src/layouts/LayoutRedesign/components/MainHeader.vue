<template>
  <div class="main-header">
    <div class="main-header__logo">Logo</div>
    <v-tabs fixed-tabs height="85" color="#000000" slider-color="#000000" slider-size="4">
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.to" class="main-header__tab">
        {{ tab.label }}
      </v-tab>
    </v-tabs>
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
export default {
  name: 'MainHeader',
  data() {
    return {
      tabs: [
        {
          id: 1,
          label: 'Wallets',
          to: { name: 'Wallets' }
        },
        {
          id: 2,
          label: 'Swap',
          to: { name: 'Swap' }
        },
        {
          id: 3,
          label: 'History',
          to: { name: 'History' }
        },
        {
          id: 4,
          label: 'Settings',
          to: { name: 'Settings' }
        }
      ]
    }
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
  display: flex;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(17, 17, 17, 0.02);
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
  &__logo {
    min-width: 305px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__tab {
    max-width: 175px;
    margin: 0 0;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
    line-height: 27px;
    letter-spacing: 0.01em;
    text-transform: none;
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
}
</style>

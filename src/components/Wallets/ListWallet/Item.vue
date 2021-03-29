<template>
  <v-list-item
    link
    exact
    class="list-wallet-item"
    :to="{ name: 'Wallet', params: { walletAddress: subWallets[0].address } }"
  >
    <v-list-item-icon class="list-wallet-item__icon-wrapper">
      <svg-icon class="list-wallet-item__icon" :name="iconName" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="list-wallet-item__title">
        <span class="list-wallet-item__currency-name">{{ nameCurrency }}</span>
        <span>{{ value }}</span>
        <span class="list-wallet-item__name">{{ subWallets[0].name }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListWalletItem',
  props: {
    name: {
      type: String,
      default: ''
    },
    nameCurrency: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    subWallets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    iconName() {
      return `list/list-${this.nameCurrency.toLowerCase()}`
    }
  }
}
</script>

<style lang="scss">
.list-wallet-item {
  min-height: 40px;
  border-radius: 12px;
  margin: 5px 10px;
  padding: 0 15px;
  overflow: hidden;
  &:hover {
    background: #f7f7f7;
  }
  &:first-child {
    margin-top: 5px;
  }
  &::before {
    display: none;
    z-index: 0;
    background: $--black;
  }
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 45px;
    height: 45px;
    margin: 15px 14px 15px 0 !important;
  }
  &__icon {
    width: 45px;
    height: 45px;
    fill: $--white;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 25px !important;
    letter-spacing: 0.01em;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__currency-name {
    font-weight: $--font-weight-semi-bold;
    letter-spacing: 0.03em;
  }
  &__name {
    width: 100%;
    color: $--grey;
  }
}
</style>

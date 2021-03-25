<template>
  <v-list-item
    link
    exact
    class="swap-wallet-item"
    @click="$emit('selectWallet', { nameCurrency, wallet: subWallets[0].address })"
  >
    <v-list-item-icon class="swap-wallet-item__icon-wrapper">
      <svg-icon class="swap-wallet-item__icon" name="btc" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="swap-wallet-item__title">
        <span class="swap-wallet-item__currency">{{ nameCurrency }}</span>
        <span>{{ value }}</span>
        <span class="swap-wallet-item__name">{{ subWallets[0].name }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'SwapWalletItem',
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
  }
}
</script>

<style lang="scss">
.swap-wallet-item {
  min-height: 40px;
  border-radius: 12px;
  margin: 5px 10px;
  padding: 0 15px;
  overflow: hidden;
  @include tablet {
    margin: 5px 25px;
  }
  @include small {
    margin: 5px 0;
  }
  &:first-child {
    margin-top: 5px;
  }
  &:before {
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
  }
  &__currency {
    font-weight: $--font-weight-semi-bold;
  }
  &__name {
    width: 100%;
    font-size: $--font-size-extra-small-subtitle;
    color: $--grey;
  }
}
</style>

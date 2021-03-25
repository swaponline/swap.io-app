<template>
  <v-list-group class="swap-wallet-group" color="black" active-class="swap-wallet-group--active" append-icon="">
    <template #activator>
      <v-list-item-icon class="swap-wallet-group__icon-wrapper">
        <svg-icon class="swap-wallet-group__icon" name="btc" />
      </v-list-item-icon>
      <v-list-item-title class="swap-wallet-group__header">
        <span class="swap-wallet-group__currency">{{ nameCurrency }} </span>
        <span>{{ value }}</span>
        <span class="swap-wallet-group__name">{{ subWallets.length }} wallet</span>
      </v-list-item-title>
    </template>
    <v-list-item
      v-for="(subWallet, i) in subWallets"
      :key="i"
      link
      exact
      class="swap-wallet-group__item"
      @click="$emit('selectWallet', { nameCurrency, wallet: subWallet.address })"
    >
      <v-list-item-content class="swap-wallet-group__item-content">
        <v-list-item-title class="swap-wallet-group__item-info">
          <span>{{ subWallet.name }}</span>
          <span>{{ subWallet.value }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'SwapWalletGroup',
  props: {
    name: {
      type: String,
      default: 'my wallet'
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
      required: true
    }
  }
}
</script>

<style lang="scss">
.swap-wallet-group {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin: 5px 10px;
  padding: 0 0;
  @include tablet {
    margin: 5px 25px;
  }
  @include small {
    margin: 5px 0;
  }
  .v-list-item {
    padding: 0 15px;
  }
  .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 24px !important;
  }
  &--active {
    color: rgba($--black, 0.87);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 25px !important;
  }
  &__item {
    min-height: 40px;
    border-radius: 12px;
    margin: 5px 0;
    padding: 0 15px;
    overflow: hidden;
    &:first-child {
      margin-top: 5px;
    }
    &:before {
      z-index: 0;
      background: $--black;
    }
  }
  &__item-content {
    padding: 0 0;
  }
  &__item-info {
    display: flex;
    justify-content: space-between;
  }
  &__currnecy {
    font-weight: $--font-weight-semi-bold;
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
  &__name {
    width: 100%;
    font-size: $--font-size-extra-small-subtitle;
    color: $--grey;
  }
}
</style>

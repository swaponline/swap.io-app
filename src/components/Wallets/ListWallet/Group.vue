<template>
  <v-list-group class="list-wallet-group" color="black" active-class="list-wallet-group--active" append-icon="">
    <template #activator>
      <v-list-item-icon class="list-wallet-group__icon-wrapper">
        <svg-icon class="list-wallet-group__icon" :name="iconName" />
      </v-list-item-icon>
      <v-list-item-title class="list-wallet-group__header">
        <span class="list-wallet-group__currency">{{ nameCurrency }} </span>
        <span>{{ value }}</span>
        <span class="list-wallet-group__name">{{ subWallets.length }} wallet</span>
      </v-list-item-title>
    </template>
    <v-list-item
      v-for="(subWallet, i) in subWallets"
      :key="i"
      link
      exact
      class="list-wallet-group__item"
      :to="{ name: 'Wallet', params: { walletAddress: subWallet.address } }"
    >
      <v-list-item-content class="list-wallet-group__item-content">
        <v-list-item-title class="list-wallet-group__item-info">
          <span>{{ subWallet.name }}</span>
          <span>{{ subWallet.value }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'ListWalletGroup',
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
  },
  computed: {
    iconName() {
      return `list/list-${this.nameCurrency.toLowerCase()}`
    }
  }
}
</script>

<style lang="scss">
.list-wallet-group {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin: 5px 10px;
  padding: 0 0;
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
    letter-spacing: 0.03em;
    line-height: 25px;
    color: $--black;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__currency {
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

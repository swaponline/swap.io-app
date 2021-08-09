<template>
  <v-list-group
    v-model="isOpen"
    class="list-wallet-group"
    color="black"
    active-class="list-wallet-group--active"
    append-icon=""
  >
    <template #activator>
      <item-icon :currency-name="currencyName" :network="network" />

      <v-list-item-title class="list-wallet-group__header">
        <div class="list-wallet-group__text">
          <span class="list-wallet-group__currency">{{ currencyName }}</span>
          <span class="list-wallet-group__name">{{ subWallets.length }} wallet</span>
        </div>
        <span class="list-wallet-group__value">{{ value }}</span>
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
          <span>
            {{ subWallet.name || minifyAddress(subWallet.address) }}
          </span>
          <span>{{ subWallet.value }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'ListWalletGroup',
  components: { ItemIcon },
  props: {
    name: { type: String, default: 'my wallet' },
    currencyName: { type: String, default: '' },
    value: { type: Number, default: 0 },
    subWallets: { type: Array, required: true },
    network: { type: String, default: '' }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: { minifyAddress }
}
</script>

<style lang="scss">
.list-wallet-group {
  border-radius: 12px;
  overflow: hidden;
  margin: 0 10px;

  .v-list-item {
    padding: 0 5px 0 15px;

    &:hover {
      background: var(--wallets-item-background);
    }
  }
  .v-list-group__header {
    padding: 0 5px 0 15px !important;
  }
  .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 24px !important;
  }
  .v-list-item--active {
    background-color: var(--wallets-item-background);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 25px !important;
  }

  &__text {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__value {
    margin-left: auto;
    padding-right: 10px;
    font-size: 18px;
    color: var(--primary-text);
  }

  &__item {
    min-height: 40px;
    border-radius: 12px;
    margin: 5px 0;
    padding: 0 15px !important;
    overflow: hidden;

    &:first-child {
      margin-top: 5px;
    }

    &:before {
      z-index: 0;
      background-color: var(--wallets-item-background);
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
    color: var(--primary-text);
    font-size: $--font-size-extra-small-subtitle;
  }

  &__currency {
    font-weight: $--font-weight-semi-bold;
    color: var(--primary-text);
  }

  &__name {
    width: 100%;
    font-size: $--font-size-medium;
    color: var(--secondary-text);
  }
}
</style>

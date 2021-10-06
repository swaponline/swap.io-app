<template>
  <v-list-item
    link
    exact
    active-class="list-wallet-item--active"
    class="list-wallet-item"
    :to="{ name: 'Wallet', params: { walletAddress: address, coin: coin.toLowerCase() } }"
  >
    <item-icon :currency-name="coin.toLowerCase()" :network="network.toLowerCase()" />

    <v-list-item-content>
      <v-list-item-title class="list-wallet-item__title">
        <div class="list-wallet-item__text">
          <span class="list-wallet-item__currency-name">{{ coin.toUpperCase() }}</span>
          <span class="list-wallet-item__name">{{ name || minifyAddress(address) }}</span>
        </div>
        <span class="list-wallet-item__value">{{ value }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'ListWalletItem',
  components: { ItemIcon },
  props: {
    name: { type: String, default: '' },
    address: { type: String, required: true },
    value: { type: Number, default: 0 },
    coin: { type: String, default: '' },
    network: { type: String, default: '' }
  },
  methods: { minifyAddress }
}
</script>

<style lang="scss">
.v-list-item--link {
  &::before {
    background-color: transparent;
  }
}

.list-wallet-item {
  min-height: 40px;
  border-radius: 12px;
  margin: 0 10px;
  padding: 0 5px 0 15px;
  overflow: hidden;

  &:hover {
    background-color: var(--wallets-item-background);
  }

  &--active {
    background-color: var(--wallets-item-background);
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
    color: var(--secondary-text);
    font-size: $--font-size-medium;
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
  }
}
</style>

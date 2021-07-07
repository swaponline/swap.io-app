<template>
  <v-list-item
    link
    exact
    active-class="list-wallet-item--active"
    class="list-wallet-item"
    :to="{ name: 'Wallet', params: { walletAddress: subWallets[0].address } }"
  >
    <item-icon :currency-name="currencyName" :network="network" />

    <v-list-item-content>
      <v-list-item-title class="list-wallet-item__title">
        <div class="list-wallet-item__text">
          <span class="list-wallet-item__currency-name">{{ currencyName }}</span>
          <span class="list-wallet-item__name">{{ subWallets[0].name || minifyAddress(subWallets[0].address) }}</span>
        </div>
        <v-badge :content="notificationsCount" :value="notificationsCount" color="red" left offset-x="100%">
          <span class="list-wallet-item__value">{{ value }}</span>
        </v-badge>
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
    currencyName: { type: String, default: '' },
    value: { type: Number, default: 0 },
    subWallets: { type: Array, default: () => [] },
    network: { type: String, default: '' }
  },
  computed: {
    notificationsCount() {
      return this.subWallets.reduce((acc, { notifications }) => (notifications ? acc + notifications : acc), 0)
    }
  },
  methods: { minifyAddress }
}
</script>

<style lang="scss">
.list-wallet-item {
  min-height: 40px;
  border-radius: 12px;
  margin: 0 10px;
  padding: 0 5px 0 15px;
  overflow: hidden;

  &:hover {
    background: #f7f7f7;
  }
  &::before {
    background-color: rgba($--black, 0.75);
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

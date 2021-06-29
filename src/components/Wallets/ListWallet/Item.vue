<template>
  <v-badge
    class="flex-grow-1"
    bottom
    :content="notificationsCount"
    :value="notificationsCount"
    color="red"
    offset-x="40"
    offset-y="36"
  >
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
          <span class="list-wallet-item__currency-name">{{ currencyName }}</span>
          <span>{{ value }}</span>
          <span class="list-wallet-item__name">{{ subWallets[0].name || minifyAddress(subWallets[0].address) }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-badge>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'ListWalletItem',
  components: { ItemIcon },
  props: {
    name: {
      type: String,
      default: ''
    },
    currencyName: {
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
    },
    network: {
      type: String,
      default: ''
    }
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
}
</style>

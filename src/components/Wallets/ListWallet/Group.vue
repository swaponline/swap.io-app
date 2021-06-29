<template>
  <v-badge
    class="flex-grow-1"
    bottom
    :content="notificationsCount"
    :value="notificationsCount && !isOpen"
    color="red"
    offset-x="40"
    offset-y="36"
  >
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
          <span class="list-wallet-group__currency">{{ currencyName }} </span>
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
            <span>
              <v-badge color="red" :content="subWallet.notifications" :value="!!subWallet.notifications" inline>
                {{ subWallet.name || minifyAddress(subWallet.address) }}
              </v-badge>
            </span>
            <span>{{ subWallet.value }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-badge>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'ListWalletGroup',
  components: { ItemIcon },
  props: {
    name: {
      type: String,
      default: 'my wallet'
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
      required: true
    },
    network: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
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
.list-wallet-group {
  border-radius: 12px;
  overflow: hidden;
  margin: 5px 10px;
  padding: 0 0;
  .v-list-item {
    padding: 0 15px;

    &:hover:before {
      opacity: 0.1;
      background: $--black;
    }
  }
  .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 24px !important;
  }

  &--active {
    color: rgba($--black, 0.75);
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
  &__name {
    width: 100%;
    font-size: $--font-size-medium;
    color: $--grey;
  }
}
</style>

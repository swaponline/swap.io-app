<template>
  <v-list-group
    v-model="isOpen"
    class="list-wallet-group"
    :class="{ 'list-wallet-group--active': isOpen }"
    color="black"
    append-icon=""
    active-class="list-wallet-group__group"
  >
    <template #activator>
      <item-icon :currency-name="network.toLowerCase()" />

      <v-list-item-title class="list-wallet-group__header">
        <div class="list-wallet-group__text">
          <span class="list-wallet-group__currency">{{ network }}</span>
          <span class="list-wallet-group__name">
            <cryptoicon
              v-for="{ coin } in groupWalletsByCoin"
              :key="generateKey('icon', coin)"
              :symbol="coin.toLowerCase()"
              size="14"
              class="list-wallet-group__header-icon"
            />
          </span>
        </div>
        <span class="list-wallet-group__value">{{ value }}</span>
      </v-list-item-title>
    </template>

    <template v-for="{ coin, wallets: groupWallets, value: groupValue } in groupWalletsByCoin">
      <v-list-item :key="generateKey('coin-group', coin)" class="list-wallet-group__item" disabled>
        <v-list-item-content class="list-wallet-group__item-content">
          <div class="list-wallet-group__item-info list-wallet-group__item-info--disabled">
            <p class="list-wallet-group__coin-name">
              <cryptoicon class="list-wallet-group__coin-icon" size="20" :symbol="coin.toLowerCase()" />
              {{ coin }}
            </p>
            <span class="list-wallet-group__group-value">{{ groupValue }}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="{ address, name, value: walletValue } in groupWallets"
        :key="generateKey(coin, address)"
        link
        exact
        class="list-wallet-group__item"
        :to="{ name: 'Wallets', params: { walletAddress: address, coin: coin.toLowerCase() } }"
      >
        <v-list-item-content class="list-wallet-group__item-content">
          <v-list-item-title class="list-wallet-group__item-info">
            <span>{{ name || minifyAddress(address) }}</span>
            <span>{{ walletValue }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list-group>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'
import { groupWalletsBy } from '@/utils/wallets'

export default {
  name: 'ListWalletGroup',
  components: { ItemIcon },
  props: {
    network: { type: String, default: '' },
    wallets: { type: Array, required: true },
    value: { type: Number, default: 0 },
    activeWallet: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    groupWalletsByCoin() {
      return groupWalletsBy(this.wallets, 'coin')
    },

    hasActiveWallet() {
      return this.wallets.find(
        ({ address, coin }) => address === this.activeWallet.address && coin === this.activeWallet.coin
      )
    }
  },

  beforeMount() {
    if (this.hasActiveWallet) this.isOpen = true
  },
  methods: {
    minifyAddress,

    generateKey(key, value) {
      return `${key}-${value}`
    }
  }
}
</script>

<style lang="scss">
.list-wallet-group {
  border-radius: $--border-radius-large;
  overflow: hidden;

  &:hover {
    background-color: var(--wallets-item-background);
  }

  &--active {
    background-color: var(--wallets-item-background);
    padding-bottom: 15px;
  }

  &__group {
    border-bottom: 1px solid var(--wallets-item-border);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    line-height: 25px !important;
  }

  &__header-icon {
    margin-right: 8px;
  }

  &__text {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__value {
    margin-left: auto;
    font-size: $--font-size-extra-small-subtitle;
    color: var(--primary-text);
  }

  &__group-value {
    font-size: $--font-size-base;
  }

  &__item {
    margin: 0 5px;
    min-height: auto;
    overflow: initial !important;
    border-radius: $--border-radius-large;
    transition: all 0.3s;

    &:hover,
    &.v-list-item--active {
      background-color: var(--wallets-item-background-hover);
      box-shadow: var(--wallets-box-shadow);
    }
  }

  &__item-content {
    padding: 15px 10px;
    border-bottom: 1px solid var(--wallets-item-border);
  }

  &__item-info {
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.03em;
    line-height: 25px;
    color: var(--primary-text);
    font-size: $--font-size-extra-small-subtitle;

    &--disabled {
      color: $--grey-3 !important;
    }
  }

  &__coin-name {
    display: flex;
    align-items: center;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 0 !important;
    font-size: $--font-size-base;
    line-height: 19px;
  }

  &__coin-icon {
    margin-right: 6px;
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

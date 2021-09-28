<template>
  <v-list-group
    v-model="isOpen"
    class="list-wallet-group"
    :class="{ 'list-wallet-group--active': isOpen }"
    color="black"
    append-icon=""
  >
    <template #activator>
      <item-icon :currency-name="networkIcon" />

      <v-list-item-title class="list-wallet-group__header">
        <div class="list-wallet-group__text">
          <span class="list-wallet-group__currency">{{ network }}</span>
          <span class="list-wallet-group__name">
            <cryptoicon
              v-for="coinGroup in groupWalletsByCoin"
              :key="`icon-${coinGroup.coin}`"
              :symbol="coinGroup.icon.toLowerCase()"
              size="14"
              class="list-wallet-group__header-icon"
            />
          </span>
        </div>
        <span class="list-wallet-group__value">{{ value }}</span>
      </v-list-item-title>
    </template>

    <template v-for="coinGroup in groupWalletsByCoin">
      <v-list-item :key="`coin-group-${coinGroup.coin}`" class="list-wallet-group__item" disabled>
        <v-list-item-content class="list-wallet-group__item-content">
          <div class="list-wallet-group__item-info list-wallet-group__item-info--disabled">
            <p class="list-wallet-group__coin-name">
              <cryptoicon class="list-wallet-group__coin-icon" size="20" :symbol="coinGroup.icon.toLowerCase()" />
              {{ coinGroup.coin }}
            </p>
            <span>{{ coinGroup.value }}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="wallet in coinGroup.wallets"
        :key="`${coinGroup.coin}-${wallet.address}`"
        link
        exact
        class="list-wallet-group__item"
        :to="{ name: 'Wallet', params: { walletAddress: wallet.address, coin: coinGroup.coin.toLowerCase() } }"
      >
        <v-list-item-content class="list-wallet-group__item-content">
          <v-list-item-title class="list-wallet-group__item-info">
            <span>{{ wallet.name || minifyAddress(wallet.address) }}</span>
            <span>{{ wallet.value }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list-group>
</template>

<script>
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { minifyAddress } from '@/utils/common'

export default {
  name: 'ListWalletGroup',
  components: { ItemIcon },
  props: {
    network: { type: String, default: '' },
    networkIcon: { type: String, default: '' },
    wallets: { type: Array, required: true },
    value: { type: Number, default: 0 }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    groupWalletsByCoin() {
      return this.wallets.reduce((grouppedWallets, wallet) => {
        const coinIndex = grouppedWallets.findIndex(group => group.coin === wallet.coin)

        if (coinIndex < 0) {
          grouppedWallets.push({
            coin: wallet.coin,
            icon: wallet.coinIcon,
            value: wallet.value,
            wallets: [wallet]
          })
        } else {
          grouppedWallets[coinIndex].wallets.push(wallet)
          // eslint-disable-next-line no-param-reassign
          grouppedWallets[coinIndex].value += wallet.value
        }

        return grouppedWallets
      }, [])
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

  &:hover {
    background-color: var(--wallets-item-background);
  }

  &--active {
    background-color: var(--wallets-item-background);
    padding-bottom: 15px;
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
    font-size: 18px;
    color: var(--primary-text);
  }

  &__item {
    border-bottom: 1px solid rgba($--border-grey, 0.2);
    padding: 15px;
    min-height: auto;

    &:first-child {
      border-top: 1px solid rgba($--border-grey, 0.2);
    }

    &:hover {
      background: var(--wallets-item-background-hover);
    }

    &.v-list-item--active {
      font-weight: $--font-weight-semi-bold;
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

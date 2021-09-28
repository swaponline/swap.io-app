<template>
  <div class="list-wallet">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <div class="list-wallet__container">
      <div class="list-wallet__header">
        <total-wallet-sum />
        <component :is="isSearchVisible ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'">
          <wallet-search v-if="isSearchVisible" v-model="search" />
        </component>
      </div>
      <div class="list-wallet__wrapper" @scroll="scroll">
        <v-list class="list-wallet__body" :class="{ 'list-wallet__body--offset': isSearchVisible }">
          <div
            v-for="networkGroup in walletsGrouppedByNetwork"
            :key="networkGroup.network"
            class="list-wallet__item"
            @scroll="scroll"
          >
            <list-item v-if="networkGroup.wallets.length === 1" v-bind="networkGroup.wallets[0]" />
            <list-group v-else v-bind="networkGroup" />
          </div>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import WalletSearch from './Search.vue'
import ProfileList from '../ProfileList.vue'
import TotalWalletSum from './TotalWalletSum.vue'
import ListGroup from './Group.vue'
import ListItem from './Item.vue'

const NEW_WALLETS = [
  {
    network: 'ETH',
    coin: 'usdt',
    walletNumber: 0,
    address: '3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV',
    publicKey: '3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV',

    networkIcon: 'eth',
    coinIcon: 'usdt',
    value: 0.005
  },
  {
    network: 'BTC',
    coin: 'ETH',
    walletNumber: 0,
    address: '0x9ea68CDa5269E23c21e51EDc4eF2eDB7Ac87119e',
    publicKey: '0x9ea68CDa5269E23c21e51EDc4eF2eDB7Ac87119e',
    name: 'Default',

    networkIcon: 'BTC',
    coinIcon: 'eth',
    value: 0.0456
  },
  {
    network: 'BTC',
    coin: 'USDT',
    walletNumber: 0,
    address: '0x9ea68CDa5269E23c21e51EDc4eF2eDB7Ac87119e',
    publicKey: '0x9ea68CDa5269E23c21e51EDc4eF2eDB7Ac87119e',
    name: 'Main',

    networkIcon: 'BTC',
    coinIcon: 'usdt',
    value: 0.005
  },
  {
    network: 'BTC',
    coin: 'USDT',
    walletNumber: 1,
    address: '0xF2eDB7Ac87119e9ea68CDa5269E23c21e51EDc4e',
    publicKey: '0xF2eDB7Ac87119e9ea68CDa5269E23c21e51EDc4e',

    networkIcon: 'BTC',
    coinIcon: 'usdt',
    value: 0.0567
  }
]

export default {
  name: 'ListWallet',
  components: { ProfileList, WalletSearch, TotalWalletSum, MatchMedia, ListGroup, ListItem },
  data() {
    return {
      search: '',
      isSearchVisible: false
    }
  },
  computed: {
    wallets() {
      return NEW_WALLETS
    },
    walletsGrouppedByNetwork() {
      return this.filteredWallets.reduce((grouppedWallets, wallet) => {
        const networkIndex = grouppedWallets.findIndex(group => group.network === wallet.network)

        if (networkIndex < 0) {
          grouppedWallets.push({
            network: wallet.network,
            networkIcon: wallet.networkIcon,
            value: wallet.value,
            wallets: [wallet]
          })
        } else {
          grouppedWallets[networkIndex].wallets.push(wallet)
          // eslint-disable-next-line no-param-reassign
          grouppedWallets[networkIndex].value += wallet.value
        }

        return grouppedWallets
      }, [])
    },
    filteredWallets() {
      const { wallets } = this

      if (!this.search) return wallets

      return wallets.filter(({ network, coin, name, address }) => {
        return (
          this.checkIncludesInSearch(network) ||
          this.checkIncludesInSearch(coin) ||
          this.checkIncludesInSearch(address) ||
          (name && this.checkIncludesInSearch(name))
        )
      })
    }
  },
  methods: {
    scroll(e) {
      if (this.wallets.length > 6) this.isSearchVisible = e.target.scrollTop > 0 || this.search
    },
    checkIncludesInSearch(targetString) {
      return targetString.toLowerCase().includes(this.search.toLowerCase())
    }
  }
}
</script>

<style lang="scss">
.list-wallet {
  position: relative;
  background: var(--primary-background);
  max-width: 305px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow-y: hidden;

  .v-list {
    background: var(--primary-background);
  }

  @include tablet {
    max-width: none;
    background: transparent;
  }

  &__wrapper {
    height: 100%;
    overflow: auto;
    background: var(--primary-background);
    border-radius: 12px 12px 0 0 !important;
    padding-bottom: 100px;
    transition: all 0.5s;

    @include tablet {
      border-radius: 0 !important;
      padding-bottom: 75px;
    }

    @include phone {
      padding-bottom: 0;
    }
  }

  &__container {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  &__body {
    z-index: 50;
    padding-top: 42px;
    transition: all $--theme-transition;

    &--offset {
      padding-top: 100px;
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  &__item {
    position: relative;
    padding: 5px 0;

    &:first-child {
      margin-top: 5px;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 18px;
      width: calc(100% - 36px);
      min-height: 1px;
      background: var(--main-border-color);
    }
  }
}
</style>

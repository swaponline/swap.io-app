<template>
  <div class="list-wallet">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <div class="list-wallet__container">
      <div class="list-wallet__header">
        <total-wallet-sum :total-value="totalValue" />
        <component :is="isSearchVisible ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'">
          <wallet-search v-if="isSearchVisible" v-model="search" />
        </component>
      </div>
      <div class="list-wallet__wrapper" @scroll="scroll">
        <v-list class="list-wallet__body" :class="{ 'list-wallet__body--offset': isSearchVisible }">
          <div
            v-for="networkGroup in walletsGroupedByNetwork"
            :key="networkGroup.network"
            class="list-wallet__item"
            @scroll="scroll"
          >
            <list-item v-if="networkGroup.wallets.length === 1" v-bind="networkGroup.wallets[0]" />
            <list-group v-else v-bind="networkGroup" :active-wallet="activeWallet" />
          </div>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
import { groupWalletsBy } from '@/utils/wallets'
import WalletSearch from './Search.vue'
import ProfileList from '../ProfileList.vue'
import TotalWalletSum from './TotalWalletSum.vue'
import ListGroup from './Group.vue'
import ListItem from './Item.vue'

export default {
  name: 'ListWallet',
  components: { ProfileList, WalletSearch, TotalWalletSum, MatchMedia, ListGroup, ListItem },
  props: {
    wallets: { type: Array, default: () => [] },
    activeWallet: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      search: '',
      isSearchVisible: false
    }
  },
  computed: {
    walletsGroupedByNetwork() {
      return groupWalletsBy(this.wallets, 'network')
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
    },
    totalValue() {
      return this.wallets.reduce((value, wallet) => value + wallet.value, 0)
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
  background: get-theme-for($background, 'primary');
  max-width: 305px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow-y: hidden;

  .v-list {
    background: get-theme-for($background, 'primary');
  }

  @include tablet {
    max-width: none;
    background: transparent;
  }

  &__wrapper {
    height: 100%;
    overflow: auto;
    background: get-theme-for($background, 'primary');
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
    margin: 0 10px;
    border-bottom: 1px solid get-theme-for($border-color, 'primary');

    &:first-child {
      margin-top: 5px;
    }
  }
}
</style>

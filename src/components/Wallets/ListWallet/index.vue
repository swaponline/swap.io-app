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
          <div v-for="wallet in filteredWallets" :key="wallet.name" class="list-wallet__item" @scroll="scroll">
            <list-item v-if="wallet.subWallets.length === 1" v-bind="wallet" />
            <list-group v-else v-bind="wallet" />
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
      return this.$store.getters.currentWallets
    },
    filteredWallets() {
      const { wallets } = this
      const search = this.search.toLowerCase()

      if (!this.search) return wallets

      const filteredByCurrency = wallets.filter(w => w.currencyName.toLowerCase().includes(search))
      const filteredBySubname = wallets.filter(wallet => {
        const { subWallets } = wallet
        return !!subWallets.find(sw => sw.name.toLowerCase().includes(search))
      })
      const filteredByAddress = wallets.filter(wallet => {
        const { subWallets } = wallet
        return !!subWallets.find(sw => sw.address.toLowerCase().includes(search))
      })

      return new Set([...filteredByCurrency, ...filteredBySubname, ...filteredByAddress])
    }
  },
  methods: {
    scroll(e) {
      if (this.wallets.length > 6) this.isSearchVisible = e.target.scrollTop > 0 || this.search
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

<template>
  <div class="list-wallet">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <div class="list-wallet__wrapper">
      <div class="list-wallet__header">
        <total-wallet-sum />
      </div>
      <v-list class="list-wallet__body pt-0 ">
        <template v-for="wallet in filteredWallets">
          <list-item
            v-if="wallet.subWallets.length === 1"
            :key="wallet.name"
            v-bind="wallet"
            class="list-wallet__item"
          />
          <list-group v-else :key="wallet.name" v-bind="wallet" class="list-wallet__item" />
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import { MatchMedia } from 'vue-component-media-queries'
//  components
import ProfileList from '../ProfileList.vue'
import TotalWalletSum from './TotalWalletSum.vue'
import ListGroup from './Group.vue'
import ListItem from './Item.vue'

export default {
  name: 'ListWallet',
  components: { ProfileList, TotalWalletSum, MatchMedia, ListGroup, ListItem },
  computed: {
    wallets() {
      return this.$store.getters.currentWallets
    }
  }
}
</script>

<style lang="scss">
.list-wallet {
  position: relative;
  max-width: 305px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow-y: hidden;
  @include tablet {
    max-width: none;
  }
  &__wrapper {
    position: relative;
    height: 100%;
    overflow: auto;
    background: $--white;
    border-radius: 12px 12px 0 0 !important;
    padding-bottom: 100px;
    @include tablet {
      border-radius: 0 !important;
      padding-bottom: 75px;
    }
    @include phone {
      padding-bottom: 0;
    }
  }
  &__header {
    position: sticky;
    top: 0;
    background: $--white;
    z-index: 1;
  }
  &__item {
    &:first-child {
      margin-top: 5px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 18px;
      width: calc(100% - 36px);
      min-height: 1px;
      background: $--light-grey;
    }
  }
}
</style>

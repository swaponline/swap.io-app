<template>
  <div class="swap-wallet-list">
    <v-list class="swap-wallet-list__main-list py-0">
      <v-list-item v-for="wallet in wallets" :key="wallet.name" class="swap-wallet-list__wallet-item px-0">
        <swap-wallet-item v-if="wallet.subWallets.length === 1" v-bind="wallet"></swap-wallet-item>
        <swap-wallet-group v-else v-bind="wallet"></swap-wallet-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'
import SwapWalletGroup from './WalletGroup.vue'
import SwapWalletItem from './WalletItem.vue'

export default {
  name: 'SwapWalletList',
  components: {
    SwapWalletGroup,
    SwapWalletItem
  },
  computed: {
    wallets() {
      return this.$store.getters.currentListWallets
    }
  },
  mounted() {
    this.actionGetAccountId()
  },
  methods: {
    ...mapActions({
      actionGetAccountId: GET_ACCOUNT_ID
    })
  }
}
</script>

<style lang="scss">
.swap-wallet-list {
  position: absolute;
  background: $--white;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 305px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  @include tablet {
    max-width: none;
    transition: 0.5s;
    height: calc(100% - 36px);
  }
  &__wallet-item {
    justify-content: center;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      min-width: 320px;
      width: calc(100% - 30px);
      min-height: 1px;
      background: $--light-grey;
    }
  }
}
</style>

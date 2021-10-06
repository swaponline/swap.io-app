<template>
  <div class="wallet">
    <wallet-info
      class="wallet__main-info"
      v-bind="wallet"
      :compressed="compressed"
      @uncompress-wallet="compressed = false"
    ></wallet-info>
    <transaction-block
      class="wallet__transaction"
      :class="{ 'wallet__transaction--stretch': compressed }"
      :is-compressed-wallet="compressed"
      @compress-wallet="compressed = true"
      @uncompress-wallet="compressed = false"
    ></transaction-block>
  </div>
</template>

<script>
import WalletInfo from '@/components/Wallets/WalletInfo.vue'
import TransactionBlock from '@/components/Wallets/Transactions/index.vue'

export default {
  name: 'Wallet',
  components: { TransactionBlock, WalletInfo },
  props: {
    wallet: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      compressed: false,
      isCreatingWallet: false
    }
  },
  inject: ['mediaQueries'],
  computed: {
    currentWallets() {
      return this.$store.getters.currentWallets
    }
  }
}
</script>

<style lang="scss">
.wallet {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &__main-info {
    width: auto;
  }
  &__transaction {
    margin-top: 20px;
    flex-grow: 1;
    height: 50%;
    transition: 0.5s;

    @include tablet {
      margin-top: 0px;
    }
    @include phone {
      &:after {
        position: absolute;
        content: '';
        height: 324px;
        width: 100%;
        top: -80px;
        background: rgba($--black, 0.45);
        transition: 0.5s;
        z-index: 2;
        opacity: 0;
        pointer-events: none;
      }
      &--stretch {
        &:after {
          height: 152px;
          opacity: 1;
        }
      }
    }
  }
}
</style>

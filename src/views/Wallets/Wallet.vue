<template>
  <div class="wallet">
    <wallet-info class="wallet__main-info" :compressed="compressed" @stretchWallet="compressed = false"></wallet-info>
    <transaction-block
      class="wallet__transaction"
      :is-compressed-wallet="compressed"
      @compressedWallet="compressed = true"
    ></transaction-block>
  </div>
</template>

<script>
import WalletInfo from '@/components/Wallets/WalletInfo.vue'
import TransactionBlock from '@/components/Wallets/TransactionBlock.vue'

export default {
  name: 'Wallet',
  components: {
    TransactionBlock,
    WalletInfo
  },
  data() {
    return {
      compressed: false
    }
  }
}
</script>

<style lang="scss">
.wallet {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__main-info {
    width: 100%;
  }
  &__transaction {
    margin-top: 20px;
    flex-grow: 1;
    height: 50%;
    transition: 0.5s;
  }
}
</style>

<template>
  <div class="wallet">
    <div class="wallet__main-info"></div>
    <transaction-block class="wallet__transaction"></transaction-block>
  </div>
</template>

<script>
import TransactionBlock from '@/components/Wallets/TransactionBlock.vue'

export default {
  name: 'Wallet',
  components: {
    TransactionBlock
  }
}
</script>

<style lang="scss">
.wallet {
  width: 100%;
  display: flex;
  flex-direction: column;
  &__main-info {
    width: 100%;
    background: $--white;
    min-height: 250px;
    border-radius: 12px;
  }
  &__transaction {
    margin-top: 20px;
    flex-grow: 1;
    height: 50%;
  }
}
</style>

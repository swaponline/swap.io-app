<template>
  <div class="wallet">
    <wallet-info
      class="wallet__main-info"
      v-bind="wallet"
      :compressed="compressed"
      @uncompress-wallet="toggleCompressedWallet(false)"
    ></wallet-info>
    <transaction-block
      class="wallet__transaction"
      :class="{ 'wallet__transaction--stretch': compressed }"
      :is-compressed-wallet="compressed"
      @compress-wallet="toggleCompressedWallet(true)"
      @uncompress-wallet="toggleCompressedWallet(false)"
    ></transaction-block>
    <div v-if="compressed" class="wallet__overlay" @click="toggleCompressedWallet(false)"></div>
  </div>
</template>

<script>
import WalletInfo from '@/components/Wallets/WalletInfo.vue'
import TransactionBlock from '@/components/Wallets/Transactions/index.vue'

export default {
  name: 'WalletContent',
  components: { TransactionBlock, WalletInfo },
  props: {
    wallet: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      compressed: false
    }
  },
  methods: {
    toggleCompressedWallet(value) {
      this.compressed = value
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

  &__overlay {
    @include phone {
      &:before,
      &:after {
        content: '';
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($--black, 0.45);
      }

      &:before {
        top: 0;
      }
    }
  }

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

    &--stretch {
      @include phone {
        z-index: 1;
      }
    }
  }
}
</style>

<template>
  <div v-if="walletParam" class="wallet">
    <wallet-info
      class="wallet__main-info"
      :compressed="compressed"
      @uncompress-wallet="compressed = false"
    ></wallet-info>
    <transaction-block
      class="wallet__transaction"
      :class="compressed ? 'wallet__transaction--stretch' : ''"
      :is-compressed-wallet="compressed"
      @compress-wallet="compressed = true"
      @uncompress-wallet="compressed = false"
    ></transaction-block>
  </div>
  <div v-else class="wallet__info-block">
    <div>Logo</div>
    <div>Выберите кошелек</div>
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
  },
  beforeRouteUpdate(to, from, next) {
    Object.assign(to.meta, { back: false })
    next()
  },
  computed: {
    walletParam() {
      return this.$route.params.walletAddress
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

  &__info-block {
    height: 25%;
    min-height: 250px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: $--white;
    @include tablet {
      display: none;
    }
  }
}
</style>

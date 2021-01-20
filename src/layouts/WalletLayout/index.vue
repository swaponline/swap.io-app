<template>
  <div class="wallet-layout">
    <list-wallet class="wallet-layout__list-wallet"></list-wallet>
    <router-view v-if="currentRouter" :key="currentRouter"></router-view>
    <div v-else class="wallet-layout__info-block">
      <div>Logo</div>
      <div>Выберите кошелек</div>
    </div>
  </div>
</template>

<script>
import ListWallet from '@/components/Wallets/ListWallet.vue'

export default {
  name: 'WalletLayout',
  components: {
    ListWallet
  },
  computed: {
    currentRouter() {
      return this.$route.params.nameWallet
    }
  }
}
</script>

<style lang="scss">
.wallet-layout {
  height: 100%;
  display: flex;
  &__list-wallet {
    margin-right: 20px;
  }
  &__info-block {
    height: 25%;
    min-height: 250px;
    width: 50%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: $--white;
  }
}
</style>

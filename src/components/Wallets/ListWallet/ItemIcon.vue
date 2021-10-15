<template>
  <v-list-item-icon class="list-wallet-icon">
    <coin-logo class="list-wallet-icon__coin" :path="currencyName" :name="currencyName" />
    <coin-logo v-if="showNetwork" class="list-wallet-icon__network" :path="network" :name="network" />
  </v-list-item-icon>
</template>

<script>
import CoinLogo from '@/components/Wallets/CoinLogo.vue'

export default {
  name: 'ListWalletItemIcon',
  components: { CoinLogo },
  props: {
    currencyName: { type: String, default: '' },
    network: { type: String, default: '' }
  },
  computed: {
    showNetwork() {
      return this.network && this.network !== this.currencyName
    }
  }
}
</script>

<style lang="scss">
.list-wallet-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  min-width: 45px;
  height: 45px;
  margin: 15px 14px 15px 0 !important;

  &__coin {
    width: 45px;
    height: 45px;
  }

  &__network {
    position: absolute;
    right: -8px;
    bottom: -6px;
    border: 2px solid var(--primary-background);
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
}
</style>

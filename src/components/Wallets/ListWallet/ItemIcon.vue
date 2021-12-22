<template>
  <v-list-item-icon class="list-wallet-icon">
    <coin-logo class="list-wallet-icon__coin" :path="coinPath" :name="coin" />
    <coin-logo v-if="showNetwork" class="list-wallet-icon__network" :path="networkPath" :name="network" show-tooltip />
  </v-list-item-icon>
</template>

<script>
import CoinLogo from '@/components/Wallets/CoinLogo.vue'

export default {
  name: 'ListWalletItemIcon',
  components: { CoinLogo },
  props: {
    coinPath: { type: String, default: '' },
    networkPath: { type: String, default: '' },
    network: { type: String, default: '' },
    coin: { type: String, default: '' }
  },
  computed: {
    showNetwork() {
      return this.networkPath && this.networkPath !== this.coinPath
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
    border: 2px solid get-theme-for($background, 'primary');
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
}
</style>

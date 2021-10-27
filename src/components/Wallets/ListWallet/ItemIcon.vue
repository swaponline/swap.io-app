<template>
  <v-list-item-icon class="list-wallet-icon">
    <cryptoicon :symbol="currencyName.toLowerCase()" size="45" />
    <cryptoicon v-if="showNetwork" class="list-wallet-icon__network" :symbol="network.toLowerCase()" size="25" />
  </v-list-item-icon>
</template>

<script>
export default {
  name: 'ListWalletItemIcon',
  props: {
    currencyName: { type: String, default: '' },
    network: { type: String, default: '' }
  },
  computed: {
    showNetwork() {
      return this.network && this.network.toLowerCase() !== this.currencyName.toLowerCase()
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

  &__network {
    position: absolute;
    right: -8px;
    bottom: -6px;
    border: 2px solid get-theme-for($background, 'primary');
    border-radius: 50%;
  }
}
</style>

<template>
  <v-badge overlap left bottom :content="badge" :value="badge" color="red" offset-x="52" offset-y="30">
    <v-list-item-icon class="list-wallet-icon">
      <cryptoicon :symbol="currencyName.toLowerCase()" size="45" />
      <cryptoicon v-if="network" class="list-wallet-icon__network" :symbol="network.toLowerCase()" size="25" />
    </v-list-item-icon>
  </v-badge>
</template>

<script>
export default {
  name: 'ListWalletItemIcon',
  props: {
    currencyName: {
      type: String,
      default: ''
    },
    network: {
      type: String,
      default: ''
    },
    badge: {
      type: Number,
      default: 0
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
    top: -6px;
    border: 2px solid $--white;
    border-radius: 50%;
  }
}
</style>

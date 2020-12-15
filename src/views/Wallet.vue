<template>
  <div class="wallet">
    <header-wallet />
    <div class="wallet__info mt-3">
      <p class="wallet__value">{{ wallet.value }}</p>
      <p class="wallet__value-in-usd"><span>$</span> 3000.04</p>
      <p class="wallet__address">{{ wallet.address }}</p>
      <div class="wallet__buttons">
        <v-btn class="wallet__button" color="primary" outlined>
          <v-icon class="wallet__icon-copy">mdi-content-copy</v-icon>
          Copy
        </v-btn>
        <v-btn class="wallet__button" color="primary" outlined>
          <v-icon class="wallet__icon-invoice">mdi-arrow-down-bold-circle</v-icon>
          Invoice
        </v-btn>
      </div>
      <v-sheet elevation="4" class="mt-8 mb-2">
        <v-tabs v-model="tab" background-color="white">
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#all">All</v-tab>
          <v-tab href="#confirmed">Confirmed</v-tab>
          <v-tab href="#pending">Pending</v-tab>
          <v-tab href="#invoices">Invoices</v-tab>
        </v-tabs>
      </v-sheet>
      <v-tabs-items v-model="tab">
        <v-tab-item :value="tab">
          <list-transactions :filter-type="tab"></list-transactions>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import HeaderWallet from '@/components/Wallets/HeaderWallet.vue'
import ListTransactions from '@/components/Wallets/ListTransactions.vue'

export default {
  name: 'Wallet',
  components: {
    HeaderWallet,
    ListTransactions
  },
  data() {
    return {
      tab: 'all'
    }
  },
  computed: {
    nameWallet() {
      return this.$route.params.nameWallet
    },
    wallet() {
      if (this.nameWallet) {
        return this.$store.getters.siblingList.find(el => el.address === this.nameWallet)
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
.wallet {
  &__info {
    text-align: center;
    width: 100%;
    font-size: $--font-size-medium;
  }
  &__value {
    font-size: $--font-size-small-subtitle;
    font-weight: $--font-weight-bold;
  }
  &__value-in-usd {
    font-weight: $--font-weight-medium;
    span {
      opacity: 0.5;
    }
  }
  &__address {
    opacity: 0.5;
  }
  &__button {
    margin: 0 16px;
  }
}
</style>

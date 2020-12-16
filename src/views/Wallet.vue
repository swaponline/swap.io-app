<template>
  <div class="wallet">
    <header-wallet @openMenu="openMenu" />
    <div class="wallet__content">
      <div class="wallet__info" :class="{ 'wallet__info--open-menu': open !== null }">
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
            <v-tab href="#all">All</v-tab>
            <v-tab href="#confirmed">Confirmed</v-tab>
            <v-tab href="#pending">Pending</v-tab>
            <v-tab href="#invoices">Invoices</v-tab>
          </v-tabs>
        </v-sheet>
        <v-tabs-items v-model="tab">
          <v-slide-x-transition>
            <v-tab-item v-show="tab" :key="tab" :value="tab">
              <list-transactions :filter-type="tab"></list-transactions>
            </v-tab-item>
          </v-slide-x-transition>
        </v-tabs-items>
      </div>
      <div
        class="wallet__side"
        :class="{
          'wallet__side--open-menu': open !== null
        }"
      >
        <v-list
          class="wallet__side-menu purple"
          :class="{
            'wallet__side-menu--open-menu': open === 'menu',
            'wallet__side-menu--await': open === 'share'
          }"
        >
          <v-list-item v-for="i in 5" :key="i">item {{ i }}</v-list-item>
        </v-list>
        <v-list
          class="wallet__side-menu purple"
          :class="{
            'wallet__side-menu--open-menu': open === 'share',
            'wallet__side-menu--await': open === 'menu'
          }"
        >
          <v-list-item v-for="i in 5" :key="i">item share {{ i }}</v-list-item>
        </v-list>
      </div>
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
      tab: 'all',
      open: null
    }
  },
  computed: {
    route() {
      return this.$route
    },
    nameWallet() {
      return this.$route.params.nameWallet
    },
    wallet() {
      if (this.nameWallet) {
        return this.$store.getters.siblingList.find(el => el.address === this.nameWallet)
      }
      return {}
    }
  },
  watch: {
    route: {
      deep: true,
      immediate: true,
      handler() {
        this.open = null
      }
    }
  },
  methods: {
    openMenu(key) {
      if (this.open === key) {
        this.open = null
      } else {
        this.open = key
      }
    }
  }
}
</script>

<style lang="scss">
.wallet {
  background: $--white;
  &__content {
    width: 100%;
    display: flex;
    height: calc(100% - 64px);
  }
  &__info {
    padding-top: 16px;
    text-align: center;
    width: 100%;
    font-size: $--font-size-medium;
    border-right: 1px solid $--grey;
    transition: 0.5s;
    &--open-menu {
      width: 75%;
    }
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
  &__side {
    position: relative;
    width: 0%;
    transition: 0.5s;
    overflow: hidden;
    &--open-menu {
      width: 25%;
    }
  }
  &__side-menu {
    border-top: 1px solid $--grey;
    overflow: hidden;
    width: 100%;
    color: $--white;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.5s;
    white-space: nowrap;
    &--open-menu {
      opacity: 0.85;
      transform: translate(0, 0);
      z-index: 2;
    }
    &--await {
      transform: translate(100%, 0);
    }
  }
}
@include tablet {
  .wallet {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
  }
}
</style>

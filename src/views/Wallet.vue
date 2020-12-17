<template>
  <div class="wallet">
    <header-wallet @openMenu="openMenu" />
    <div class="wallet__content">
      <div class="wallet__info" :class="{ 'wallet__info--open-menu': open !== null }">
        <p class="wallet__value">{{ currentWallet.value }}</p>
        <p class="wallet__value-in-usd"><span>$</span> 3000.04</p>
        <p class="wallet__address">{{ currentWallet.address }}</p>
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
          <v-tabs v-model="tab" background-color="white" fixed-tabs>
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
        class="wallet__side-menu"
        :class="{
          'wallet__side-menu--open-menu': open !== null
        }"
      >
        <wallets-menu :visible="open === 'menu'" :await-status="open === 'share'" :list="[]">
          <template #default="{ info }"> item {{ info }} </template>
        </wallets-menu>
        <wallets-menu :visible="open === 'share'" :await-status="open === 'menu'" :list="[]">
          <template #default="{ info }"> item share {{ info }} </template>
        </wallets-menu>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderWallet from '@/components/Wallets/HeaderWallet.vue'
import WalletsMenu from '@/components/Wallets/WalletsMenu.vue'
import ListTransactions from '@/components/Wallets/ListTransactions.vue'

export default {
  name: 'Wallet',
  components: {
    HeaderWallet,
    WalletsMenu,
    ListTransactions
  },
  props: {
    wallet: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: 'all',
      open: null
    }
  },
  computed: {
    currentWallet() {
      if (this.wallet) {
        return this.$store.getters.siblingList.find(el => el.address === this.wallet)
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
  height: 100%;
  background: $--white;
  &__content {
    position: relative;
    width: 100%;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 128px);
  }
  &__info {
    background: $--white;
    padding-top: 16px;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: $--font-size-medium;
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
  &__side-menu {
    background: $--white;
    position: absolute;
    z-index: 2;
    right: 0;
    height: 100%;
    width: 25%;
    position: absolute;
    transition: 0.5s;
    overflow: hidden;
    border-left: 1px solid $--grey;
    transform: translateX(100%);
    &--open-menu {
      transform: translateX(0%);
    }
  }
}
@include tablet {
  .wallet {
    &__content {
      flex-direction: column;
      height: calc(100vh - 176px);
    }
    &__info {
      order: 2;
      &--open-menu {
        width: 100%;
      }
    }
    &__side-menu {
      order: 1;
      position: relative;
      width: 100%;
      min-height: 0;
      height: 0;
      overflow: hidden;
      left: 0;
      transform: translateX(0);
      border-left: none;
      &--open-menu {
        height: auto;
        min-height: 256px;
        max-height: 256px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
      }
    }
  }
  // Переопределим некоторые стили для vuetify
  // уберем левый отступ у вкладок на маленьких устройствах
  .v-slide-group__prev {
    &--disabled {
      display: none !important;
    }
  }
}
</style>

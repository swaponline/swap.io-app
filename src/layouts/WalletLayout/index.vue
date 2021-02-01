<template>
  <div class="wallet-layout">
    <list-wallet
      class="wallet-layout__list-wallet"
      :class="showListWallet ? 'wallet-layout__list-wallet--show' : ''"
    ></list-wallet>
    <div class="wallet-layout__router" :class="showListWallet ? 'wallet-layout__router--hide' : ''">
      <transition-translate :reverse="metaBack">
        <router-view :key="currentRoute"></router-view>
      </transition-translate>
    </div>
    <main-actions></main-actions>

    <all-modals></all-modals>
  </div>
</template>

<script>
import TransitionTranslate from '@/components/Transitions/Translate.vue'
import ListWallet from '@/components/Wallets/ListWallet.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import AllModals from '@/components/Wallets/AllModals.vue'

export default {
  name: 'WalletLayout',
  components: {
    TransitionTranslate,
    ListWallet,
    MainActions,
    AllModals
  },
  computed: {
    currentRoute() {
      return this.$route.name + JSON.stringify(this.$route.params) + JSON.stringify(this.$route.query)
    },
    walletParam() {
      return this.$route.params.walletAddress
    },
    metaBack() {
      return this.$route.meta.back
    },
    showListWallet() {
      return this.$route.name === 'Wallet' && this.$route.params.walletAddress === undefined
    }
  }
}
</script>

<style lang="scss">
.wallet-layout {
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 25px;
  max-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  @include tablet {
    margin-top: 0;
  }
  @include tablet {
    overflow: visible;
  }
  &__list-wallet {
    margin-right: 20px;
    @include tablet {
      margin-right: 0;
      position: absolute;
      max-width: none;
      transform: translateX(-100vw);
      transition: 0.5s;
      &--show {
        transform: translateX(0);
      }
    }
  }
  &__router {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    @include tablet {
      overflow: visible;
      position: absolute;
      transform: translateX(0);
      transition: 0.5s;
      &--hide {
        transform: translateX(100vw);
      }
    }
  }
}
</style>
